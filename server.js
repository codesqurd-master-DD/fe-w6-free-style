"use strict";
import {
  googleTranslator,
  papagoTranslator,
  kakaoTranslator,
} from "./back/translators.js";

import path from "path";
import express from "express";
const app = express();
const __dirname = path.resolve();

app.use(express.urlencoded({ extend: false }));
app.use(express.json());

const PORT = process.env.PORT || 8080;
const ROOT_DIR = path.join(__dirname);

app.use(express.static(ROOT_DIR));

app.get("/", (req, res) => {
  const index = path.join(__dirname, "front", "index.html");
  res.sendFile(index);
});

app.post("/translate", async (req, res) => {
  const response = {
    text: req.body.original,
    target: req.body.target,
    type: req.body.type,
    source: req.body.source,
  };
  let translation = "";
  switch (response.type) {
    case "google":
      translation = await googleTranslator(response.text, response.target);
      console.log("google");
      break;
    case "papago":
      translation = await papagoTranslator(
        response.text,
        response.source,
        response.target
      );
      console.log("papago");
      break;
    case "kakao":
      translation = await kakaoTranslator(
        response.text,
        response.source,
        response.target
      );
      console.log("kakao");
      break;
  }
  console.log("server.js - translation :", translation);
  res.send({ result: translation });
});

app.listen(PORT, () => {
  console.log("server is running");
});
