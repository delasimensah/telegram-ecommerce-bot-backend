import type { Context } from "grammy";
import { createUser } from "@utils/db-queries/user-queries";

export const showHomeMenu = async (ctx: Context) => {
  const id = ctx.msg?.chat.id;
  const firstName = ctx.msg?.from?.first_name;
  const lastName = ctx.msg?.from?.last_name || null;
  const username = ctx.msg?.from?.username || null;

  const user = {
    id: `${id}`,
    firstName,
    lastName,
    username,
  };

  try {
    await createUser(user);

    return ctx.reply("Checkout our products", {
      reply_markup: {
        keyboard: [
          [{ text: "Products" }],
          [{ text: "Cart" }],
          [{ text: "Chat" }],
        ],
        resize_keyboard: true,
      },
    });
  } catch (error) {
    return ctx.reply("Something went wrong. Try again");
  }
};
