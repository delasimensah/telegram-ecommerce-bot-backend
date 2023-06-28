import { Bot } from "grammy";
import * as dotenv from "dotenv";

import { showHomeMenu } from "@handlers/home-handlers";
import { showCategories } from "@handlers/category-handlers";
import { showProducts, showProductDetails } from "@handlers/product-handlers";
import {
  addToCart,
  showCartOptions,
  showCartProducts,
  removeFromCart,
  clearCart,
} from "@handlers/cart-handlers";
import {
  startCheckout,
  addContactNumber,
  addDeliveryLocation,
  typePhoneNumber,
  addPaymentMethod,
  completeCheckout,
  sendDifferentLocation,
  cancelCheckout,
  addContactNumberNoLocation,
} from "@handlers/checkout-handlers";

import { categoryEmoji, productEmoji } from "@utils/helpers/emojis";

import { checkBlocked, createOrUpdateUser, checkStoreStatus } from "middleware";

dotenv.config();

export const bot = new Bot(process.env.BOT_TOKEN || "");

bot.use(checkStoreStatus);
bot.use(createOrUpdateUser);
bot.use(checkBlocked);

bot.command("start", showHomeMenu);

bot.hears("Home", showHomeMenu);

bot.hears(
  ["Products", "Categories", "Continue Shopping", "Start Again"],
  showCategories
);

bot.hears(["Cart", "Back To Cart"], showCartOptions);

bot.hears("View Products", showCartProducts);

bot.hears("Clear Cart", clearCart);

bot.hears(["Checkout", "Back To Contact Number"], startCheckout);

bot.hears("Type Phone Number", typePhoneNumber);

bot.hears("Back To Delivery Location", addContactNumber);

bot.hears("Send Different Location", sendDifferentLocation);

bot.hears("Back To Payment Method", addContactNumberNoLocation);

bot.hears(["Mobile Payment", "Cash Payment"], addPaymentMethod);

bot.hears("Send Order", async (ctx) => {
  await completeCheckout(ctx);
  await clearCart(ctx);
  await showHomeMenu(ctx);
});

bot.hears("Cancel Order", async (ctx) => {
  await cancelCheckout(ctx);
  await showCartOptions(ctx);
});

bot.on("message:contact", addContactNumberNoLocation);

bot.on("message:location", addDeliveryLocation);

bot.on("message:voice", (ctx) => ctx.reply("Please do not send voice notes"));

bot.on("message:photo", (ctx) => ctx.reply("Please do not send photos"));

bot.on("message:text", (ctx) => {
  const message = ctx.msg.text;

  if (message.includes(categoryEmoji)) {
    return showProducts(ctx);
  }

  if (message.includes(productEmoji)) {
    return showProductDetails(ctx);
  }

  if (message.startsWith("233")) {
    return addContactNumberNoLocation(ctx);
  }

  return ctx.reply("Use the options to communicate with me");
});

bot.on("callback_query:data", (ctx) => {
  const callbackData = ctx.callbackQuery.data;
  const parseData = JSON.parse(callbackData);

  if (parseData.name) {
    addToCart(ctx, parseData);
  }

  if (parseData.id) {
    removeFromCart(ctx, parseData.id);
  }

  // if (parseData.customerId) {
  //   addToCart(ctx, parseData.customerId);
  // }

  // if (parseData.status) {
  //   addToCart(ctx, parseData.status);
  // }
});
