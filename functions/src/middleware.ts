import { Context, NextFunction } from "grammy";
import { createUser, getUserInfo } from "@db-queries/user-queries";
import { getVendorInfo } from "@db-queries/vendor-queries";
import { User, Vendor } from "@utils/types";

export const checkBlocked = async (ctx: Context, next: NextFunction) => {
  const id = ctx.msg?.chat.id;

  try {
    const { blocked } = (await getUserInfo(`${id}`)) as User;

    if (blocked)
      return ctx.reply("You have been blocked from accessing the store");

    return await next();
  } catch (error) {
    console.log({ error });
  }
};

export const createOrUpdateUser = async (ctx: Context, next: NextFunction) => {
  const id = ctx.msg?.chat.id;
  const username = ctx.msg?.from?.first_name;

  const user = {
    id: `${id}`,
    username,
  };

  try {
    await createUser(user);

    await next();
  } catch (error) {
    console.log({ error });
  }
};

export const checkStoreStatus = async (ctx: Context, next: NextFunction) => {
  try {
    const vendorInfo = (await getVendorInfo()) as Vendor;

    if (vendorInfo?.active) {
      return await next();
    }

    return ctx.reply("The store is down for maintenance", {
      reply_markup: {
        keyboard: [[{ text: "Start Again" }]],
      },
    });
  } catch (error) {
    console.log({ error });
  }
};
