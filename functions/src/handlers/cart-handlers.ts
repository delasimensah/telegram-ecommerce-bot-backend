import type { Context } from "grammy";
import {
  addProductToCart,
  getCartProducts,
} from "@utils/db-queries/cart-queries";
import { CartProduct } from "@utils/types";

export const addToCart = async (ctx: Context, data: CartProduct) => {
  const id = ctx.msg?.chat.id;

  try {
    await addProductToCart(`${id}`, data);

    return ctx.answerCallbackQuery(`Added ${data.name} to cart`);
  } catch (error) {
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
          [{ text: "Clear Cart" }],
          [{ text: "Checkout" }],
          [{ text: "Continue Shopping" }],
        ],
      },
    });
  } catch (error) {
    return ctx.reply("Something went wrong. Try again");
  }
};
