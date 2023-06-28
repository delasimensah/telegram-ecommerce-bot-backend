import type { Context } from "grammy";
import {
  getCategoryProductNames,
  getProductInfo,
} from "@db-queries/product-queries";
import { getCategoryInfo } from "@db-queries/category-queries";
import millify from "millify";

const buttons = [{ text: "Cart" }, { text: "Categories" }];

export const showProducts = async (ctx: Context) => {
  const text = ctx.msg?.text;
  const cat = text?.slice(3);

  try {
    const category = await getCategoryInfo(cat as string);

    if (!category?.active) {
      return ctx.reply("This category is not active");
    }

    const products = await getCategoryProductNames(cat as string);

    if (!products.length) {
      return ctx.reply("There are no products available at the moment", {
        reply_markup: {
          keyboard: [[{ text: "Categories" }]],
          resize_keyboard: true,
        },
      });
    }

    const productButtons = products.map((product) => [{ text: product }]);

    return ctx.reply("Choose product", {
      reply_markup: {
        keyboard: [...productButtons, [...buttons]],
        resize_keyboard: true,
      },
    });
  } catch (error) {
    console.log(error);
    return ctx.reply("Something went wrong. Try again");
  }
};

export const showProductDetails = async (ctx: Context) => {
  const text = ctx.msg?.text;
  const prod = text?.slice(3);
  const chatId = ctx.msg?.chat.id;

  try {
    const product = await getProductInfo(prod as string);

    if (!product || !product?.inStock) {
      return ctx.reply("This product is not in stock");
    }

    const priceButtons = product.prices.map(
      (price: { quantity: number; amount: number }) => [
        {
          text: `Buy ${price.quantity} ${product.name} @ GH₵${millify(
            price.amount,
            {
              precision: 3,
            }
          )}`,
          callback_data: JSON.stringify({
            name: product.name,
            quantity: price.quantity,
            amount: price.amount,
          }),
        },
      ]
    );

    let photo = product.photo;

    if (product.photo.includes("http://127.0.0.1:9199")) {
      photo =
        "https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png";
    }

    await ctx.api.sendPhoto(chatId as number, photo);
    return await ctx.api.sendMessage(
      chatId as number,
      `
<b>${product.name}</b>
${product?.description}
    `,
      {
        parse_mode: "HTML",
        reply_markup: {
          inline_keyboard: [...priceButtons],
        },
      }
    );
  } catch (error: any) {
    console.log({ error: error.message });
    return ctx.reply("Something went wrong. Try again");
  }
};
