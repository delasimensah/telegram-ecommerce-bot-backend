import type { Context } from "grammy";

import { getActiveCategoryNames } from "@utils/db-queries/category-queries";

const buttons = [{ text: "Cart" }, { text: "Home" }];

export const showCategories = async (ctx: Context) => {
  try {
    const categories = await getActiveCategoryNames();

    const categoryButtons = categories.map((category) => [{ text: category }]);

    if (categories.length) {
      return ctx.reply("Choose from our categories", {
        reply_markup: {
          keyboard: [...categoryButtons, [...buttons]],
          resize_keyboard: true,
        },
      });
    }

    return ctx.reply("There are no products available at the moment", {
      reply_markup: {
        keyboard: [[{ text: "Home" }]],
        resize_keyboard: true,
      },
    });
  } catch (error) {
    return ctx.reply("Something went wrong. Try again");
  }
};
