import { Context } from "grammy";
import millify from "millify";
import {
  updateContactNumber,
  updateDeliveryLocation,
  updatePaymentMethod,
  getUserInfo,
  removeDeliveryInfo,
} from "@db-queries/user-queries";
import { createOrder } from "@db-queries/order-queries";
import { getCartProducts } from "@db-queries/cart-queries";
import { Location, User, Order, Vendor } from "@utils/types";
import { calculateTotal } from "@utils/helpers/calculateTotal";
import { getVendorInfo } from "@db-queries/vendor-queries";

export const startCheckout = async (ctx: Context) => {
  const id = ctx.msg?.chat.id;

  try {
    const { contactNumber, deliveryLocation, paymentMethod } =
      (await getUserInfo(`${id}`)) as User;
    const cart = await getCartProducts(`${id}`);

    if (!cart.length) {
      return ctx.reply("Your cart is empty", {
        reply_markup: {
          keyboard: [[{ text: "Continue Shopping" }]],
        },
      });
    }

    if (contactNumber || deliveryLocation || paymentMethod) {
      await removeDeliveryInfo(`${id}`);
    }

    return ctx.reply("Add a contact phone number", {
      reply_markup: {
        keyboard: [
          [{ text: "Send Phone Number", request_contact: true }],
          [{ text: "Type Phone Number" }],
          [{ text: "Back To Cart" }],
        ],
        resize_keyboard: true,
      },
    });
  } catch (error) {
    console.log(error);
    return ctx.reply("Something went wrong. Try again");
  }
};

export const typePhoneNumber = async (ctx: Context) => {
  try {
    return ctx.reply("Please type a phone number in the format 233XXXXXXXXX", {
      reply_markup: {
        keyboard: [[{ text: "Back To Cart" }]],
        resize_keyboard: true,
      },
    });
  } catch (error) {
    console.log(error);
    return ctx.reply("Something went wrong. Try again");
  }
};

export const addContactNumber = async (ctx: Context) => {
  const id = ctx.msg?.chat.id;
  const number = ctx.msg?.contact?.phone_number;
  const typedPhoneNumber = ctx.msg?.text;

  const numberToAdd = (number ?? typedPhoneNumber) as string;

  try {
    if (numberToAdd.startsWith("233"))
      await updateContactNumber(`${id}`, numberToAdd);

    return ctx.reply("Add delivery location", {
      reply_markup: {
        keyboard: [
          [{ text: "Send Your Location", request_location: true }],
          [{ text: "Send Different Location" }],
          [{ text: "Back To Contact Number" }],
        ],
        resize_keyboard: true,
      },
    });
  } catch (error) {
    console.log(error);
    return ctx.reply("Something went wrong. Try again");
  }
};

// no location
export const addContactNumberNoLocation = async (ctx: Context) => {
  const id = ctx.msg?.chat.id;
  const number = ctx.msg?.contact?.phone_number;
  const typedPhoneNumber = ctx.msg?.text;

  const numberToAdd = (number ?? typedPhoneNumber) as string;

  try {
    if (numberToAdd.startsWith("233"))
      await updateContactNumber(`${id}`, numberToAdd);

    return ctx.reply("Please choose a payment method", {
      reply_markup: {
        keyboard: [
          [{ text: "Mobile Payment" }],
          [{ text: "Back To Contact Number" }],
        ],
        resize_keyboard: true,
      },
    });
  } catch (error) {
    console.log(error);
    return ctx.reply("Something went wrong. Try again");
  }
};

export const sendDifferentLocation = async (ctx: Context) => {
  try {
    return ctx.reply(
      "Press attachment icon to send your location or a different location",
      {
        reply_markup: {
          keyboard: [[{ text: "Back To Contact Number" }]],
          resize_keyboard: true,
        },
      }
    );
  } catch (error) {
    console.log(error);
    return ctx.reply("Something went wrong. Try again");
  }
};

export const addDeliveryLocation = async (ctx: Context) => {
  const id = ctx.msg?.chat.id;
  const location = ctx.msg?.location;

  try {
    location && (await updateDeliveryLocation(`${id}`, location as Location));

    return ctx.reply("Please choose a payment method", {
      reply_markup: {
        keyboard: [
          [{ text: "Mobile Payment" }],
          [{ text: "Back To Delivery Location" }],
        ],
        resize_keyboard: true,
      },
    });
  } catch (error) {
    console.log(error);
    return ctx.reply("Something went wrong. Try again");
  }
};

const showOrderSummary = async (id: string) => {
  const cart = await getCartProducts(id);
  const { contactNumber } = (await getUserInfo(id)) as User;
  const total = calculateTotal(cart);

  const text = `
<b>Your Order Summary</b>:
<pre>
Contact:${contactNumber}
Products:
  ${cart
    .map(
      (product, idx) => `
${idx + 1}. ${product.name}
  `
    )
    .join("")}
  </pre>
Total: <b>GH₵ ${millify(total, { precision: 3 })}</b>

<b>Are you ready to make your order?</b>
  `;

  return { text };
};

export const addPaymentMethod = async (ctx: Context) => {
  const id = ctx.msg?.chat.id;
  const text = ctx.msg?.text;
  try {
    await updatePaymentMethod(`${id}`, text as string);
    const { text: responeMsg } = await showOrderSummary(`${id}`);

    return ctx.reply(responeMsg, {
      parse_mode: "HTML",
      reply_markup: {
        keyboard: [
          [{ text: "Send Order" }],
          [{ text: "Back To Payment Method" }],
          [{ text: "Cancel Order" }],
        ],
        resize_keyboard: true,
      },
    });
  } catch (error) {
    console.log(error);
    return ctx.reply("Something went wrong. Try again");
  }
};

export const cancelCheckout = async (ctx: Context) => {
  const id = ctx.msg?.chat.id;

  try {
    return await removeDeliveryInfo(`${id}`);
  } catch (error) {
    console.log(error);
    return ctx.reply("Something went wrong. Try again");
  }
};

export const completeCheckout = async (ctx: Context) => {
  const id = ctx.msg?.chat.id;

  try {
    const user = (await getUserInfo(`${id}`)) as User;
    const cart = await getCartProducts(`${id}`);
    const vendorInfo = (await getVendorInfo()) as Vendor;

    const total = calculateTotal(cart);

    const orderInfo = {
      contactNumber: user.contactNumber,
      deliveryLocation: user.deliveryLocation || null,
      paymentMethod: user.paymentMethod,
      userId: user.id,
      username: user.username,
      products: cart,
      total,
    } as Order;

    const { orderID, orderNumber } = await createOrder(orderInfo);

    let text = `
Your order has been sent.
Your <b><i>Order ID</i></b> is <b><i>${orderID}</i></b>
Your <b><i>Order Number</i></b> is <b><i>${orderNumber}</i></b>

<b>PLEASE NOTE:</b>
1. A dispatch rider will call you to confirm your order, location and delivery charge.
2. Please send your payment to <b>${vendorInfo?.mobileMoneyNumber}</b> to confirm your order. Items will <b>NOT</b> be sent until payment is received
3. Use your <b>Order ID</b> or <b>Order Number</b>  as the <b>Reference</b>.
4. Any errors on your part may result in you not receiving your order.
5. For safety reasons, orders placed after 6pm may not be delivered until the next day.
`;

    if (user?.paymentMethod !== "Mobile Payment") {
      text = `
Your order has been sent.
Your <b><i>ORDER ID</i></b> is <b><i>${orderID}</i></b>

<b>PLEASE NOTE:</b>
1. A dispatch rider will call you to confirm your order, location and delivery charge.
2. Please pay for your items in cash to the delivery partner on arrival.
3. If the delivery partner cannot reach you on arrival, you will be required to pay a GH¢30 penalty or risk being permanently restricted from using our service.
4. For safety reasons, orders placed after 6pm may not be delivered until the next day.
`;
    }

    return ctx.reply(text, { parse_mode: "HTML" });
  } catch (error) {
    console.log(error);
    console.log(error);
    return ctx.reply("Something went wrong. Try again");
  }
};
