import type { Context } from "grammy";
import {
  addProductToCart,
  getCartProducts,
  removeProductFromCart,
  clearAllProductFromCart,
} from "@db-queries/cart-queries";
import { removeDeliveryInfo } from "@db-queries/user-queries";
import { CartProduct } from "@utils/types";
import { calculateTotal } from "@utils/helpers/calculateTotal";
import millify from "millify";

const showReply = (items: CartProduct[]) => {
  const total = calculateTotal(items);

  let text = `
Note: Products in your cart maybe out of stock by the time you wish to checkout.

A product is out of stock if it is no longer listed.

You have ${items.length} ${items.length > 1 ? "items" : "item"} in your cart. 
  
Your total is GH₵ ${millify(total, {
    precision: 3,
  })}

Tap each product to remove it from cart
or 
Tap Clear Cart to remove all products from cart.
  `;

  const cartButtons = items.map((item) => {
    return [
      {
        text: `🗑 ${item.name}`,
        callback_data: JSON.stringify({
          id: item.id,
        }),
      },
    ];
  });

  if (!items.length) text = "Your cart is empty";

  return { text, cartButtons };
};

export const addToCart = async (ctx: Context, data: CartProduct) => {
  const id = ctx.msg?.chat.id;

  try {
    await addProductToCart(`${id}`, data);

    return ctx.answerCallbackQuery(`Added ${data.name} to cart`);
  } catch (error) {
    console.log(error);
    return ctx.answerCallbackQuery(`Something went wrong. Try again`);
  }
};

export const showCartOptions = async (ctx: Context) => {
  const id = ctx.msg?.chat.id;

  try {
    const cart = await getCartProducts(`${id}`);

    if (!cart.length) return ctx.reply("Your cart is empty");

    return ctx.reply("Select an option", {
      reply_markup: {
        keyboard: [
          [{ text: "View Products" }],
          [{ text: "Checkout" }],
          [{ text: "Continue Shopping" }],
          [{ text: "Clear Cart" }],
        ],
        resize_keyboard: true,
      },
    });
  } catch (error) {
    console.log(error);
    return ctx.reply("Something went wrong. Try again");
  }
};

export const showCartProducts = async (ctx: Context) => {
  const id = ctx.msg?.chat.id;

  try {
    const cart = await getCartProducts(`${id}`);
    const { text, cartButtons } = showReply(cart);

    return ctx.reply(text, {
      reply_markup: {
        inline_keyboard: cartButtons,
      },
    });
  } catch (error) {
    console.log(error);
    return ctx.reply("Something went wrong. Try again");
  }
};

export const removeFromCart = async (ctx: Context, itemId: string) => {
  const id = ctx.msg?.chat.id;

  try {
    await removeProductFromCart(`${id}`, itemId);
    const cart = await getCartProducts(`${id}`);
    const { text, cartButtons } = showReply(cart);

    return ctx.editMessageText(text, {
      reply_markup: {
        inline_keyboard: cartButtons,
      },
    });
  } catch (error) {
    console.log(error);
    return ctx.answerCallbackQuery("Something went wrong. Try again");
  }
};

export const clearCart = async (ctx: Context) => {
  const id = ctx.msg?.chat.id;

  try {
    await clearAllProductFromCart(`${id}`);
    await removeDeliveryInfo(`${id}`);
    return ctx.reply("Your cart has been cleared.");
  } catch (error) {
    console.log(error);
    return ctx.reply("Something went wrong. Try again");
  }
};
