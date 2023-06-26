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
