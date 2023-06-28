import type { Context } from "grammy";

export const showHomeMenu = async (ctx: Context) => {
  return ctx.reply("Checkout our products", {
    reply_markup: {
      keyboard: [
        [{ text: "Products" }],
        [{ text: "Cart" }],
        // [{ text: "Chat" }],
      ],
      resize_keyboard: true,
    },
  });
};
