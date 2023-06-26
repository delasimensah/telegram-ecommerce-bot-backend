import { Context } from "grammy";

export const startCheckout = async (ctx: Context) => {
  try {
    return ctx.reply("Add a contact phone number", {
      reply_markup: {
        keyboard: [
          [{ text: "Send Phone Number", request_contact: true }],
          [{ text: "Continue Shopping" }],
        ],
      },
    });
  } catch (error) {
    return ctx.reply("Something went wrong. Try again");
  }
};

export const addContactNumber = async (ctx: Context) => {
  const number = ctx.msg?.contact?.phone_number;
  const name = ctx.msg?.contact?.first_name;

  console.log({ name, number });
  try {
    return ctx.reply("Phone Number Added");
  } catch (error) {
    return ctx.reply("Something went wrong. Try again");
  }
};
