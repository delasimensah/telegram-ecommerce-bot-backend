import { Bot } from "grammy";
import * as dotenv from "dotenv";

import { showHomeMenu } from "@handlers/home-handlers";
import { showCategories } from "@handlers/category-handlers";
import { showProducts, showProductDetails } from "@handlers/product-handlers";
import { addToCart, showCartOptions } from "@handlers/cart-handlers";

import { categoryEmoji, productEmoji } from "@utils/helpers/emojis";

dotenv.config();

export const bot = new Bot(process.env.BOT_TOKEN || "");

bot.command("start", showHomeMenu);

bot.hears("Home", showHomeMenu);

bot.hears(["Products", "Categories", "Continue Shopping"], showCategories);

bot.hears("Cart", showCartOptions);

bot.on("message:text", (ctx) => {
  const message = ctx.msg.text;

  if (message.includes(categoryEmoji)) {
    return showProducts(ctx);
  }

  if (message.includes(productEmoji)) {
    return showProductDetails(ctx);
  }

  return ctx.reply("Use the options to communicate with me");
});

bot.on("callback_query:data", (ctx) => {
  const callbackData = ctx.callbackQuery.data;
  const parseData = JSON.parse(callbackData);

  if (parseData.name) {
    addToCart(ctx, parseData);
  }

  // if (parseData.id) {
  //   removeFromCart(ctx, parseData.id);
  // }

  // if (parseData.customerId) {
  //   addToCart(ctx, parseData.customerId);
  // }

  // if (parseData.status) {
  //   addToCart(ctx, parseData.status);
  // }
});
