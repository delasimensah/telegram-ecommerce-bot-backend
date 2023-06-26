import { onRequest } from "firebase-functions/v2/https";
import { webhookCallback } from "grammy";
import * as express from "express";
import * as cors from "cors";

import { bot } from "./bot";
import { api } from "@routes/api";

const app = express();

app.use(cors());

app.post("/", webhookCallback(bot, "express"));
app.use("/", api);

export const gBot = onRequest(app);

// dev
// https://api.telegram.org/bot6126798626:AAE4sV0Zsey7C6F-ei_gGwu-uXlch9gV-gA/setWebhook?url=https://6551-102-176-65-62.ngrok-free.app/telegram-bot-playground-a7d14/us-central1/gBot

// prod
// https://api.telegram.org/bot6126798626:AAE4sV0Zsey7C6F-ei_gGwu-uXlch9gV-gA/setWebhook?url=https://gbot-62gyamj63a-uc.a.run.app

// https://api.telegram.org/bot6126798626:AAE4sV0Zsey7C6F-ei_gGwu-uXlch9gV-gA/deleteWebhook
