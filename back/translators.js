"use strict";
import { v2 } from "@google-cloud/translate";
const { Translate } = v2;
import dotenv from "dotenv";
dotenv.config();

const CREDENTIALS_GOOGLE = JSON.parse(process.env.CREDENTIALS_GOOGLE);
const CREDENTIALS_PAPAGO = JSON.parse(process.env.CREDENTIALS_PAPAGO);
const CREDENTIALS_KAKAO = JSON.parse(process.env.CREDENTIALS_KAKAO);

export async function googleTranslator(query, targetLanguage) {
  const translate = new Translate({
    credentials: CREDENTIALS_GOOGLE,
    projectId: CREDENTIALS_GOOGLE.project_id,
  });
  try {
    let [response] = await translate.translate(query, targetLanguage);
    console.log("response : ", response);
    return response;
  } catch (error) {
    console.log(`Error at translateText --> ${error}`);
    return 0;
  }
}

export async function papagoTranslator(query, source, targetLanguage) {
  const api_url = "https://openapi.naver.com/v1/papago/n2mt";
  const options = {
    url: api_url,
    form: { text: query, source: source, target: targetLanguage },
    headers: {
      "X-Naver-Client-Id": CREDENTIALS_PAPAGO.client_id,
      "X-Naver-Client-Secret": CREDENTIALS_PAPAGO.client_secret,
    },
  };
  try {
    let response = await translate(options);
    return response;
  } catch (error) {
    console.log(`Error at translateText --> ${error}`);
    return "error";
  }
}

export async function kakaoTranslator(query, source, targetLanguage) {
  const api_url = "https://dapi.kakao.com/v2/translation/translate";
  const options = {
    url: api_url,
    form: { query: query, src_lang: source, target_lang: targetLanguage },
    headers: {
      Authorization: `KakaoAK ${CREDENTIALS_KAKAO.rest_api_key}`,
    },
  };
  try {
    let response = await translate(options);
    return response;
  } catch (error) {
    console.log(`Error at translateText --> ${error}`);
    return "error";
  }
}

async function translate(options) {
  const request = require("request");
  return new Promise((resolve, reject) => {
    request.post(options, (error, response, body) => {
      if (!error && response.statusCode == 200) {
        const result = JSON.parse(body).translated_text;
        resolve(result);
      } else {
        console.log("error = " + response.statusCode);
        reject(0);
      }
    });
  });
}
