"use strict";
const { Translate } = require("@google-cloud/translate").v2;
require("dotenv").config();

// Your credentials
const CREDENTIALS_GOOGLE = JSON.parse(process.env.CREDENTIALS_GOOGLE);

// Configuration for the client
const translate = new Translate({
  credentials: CREDENTIALS_GOOGLE,
  projectId: CREDENTIALS_GOOGLE.project_id,
});

module.exports.detectLanguage = async (text) => {
  try {
    let response = await translate.detect(text);
    return response[0].language;
  } catch (error) {
    console.log(`Error at detectLanguage --> ${error}`);
    return 0;
  }
};

module.exports.googleTranslator = async (query, targetLanguage) => {
  try {
    let [response] = await translate.translate(query, targetLanguage);
    console.log("response : ", response);
    return response;
  } catch (error) {
    console.log(`Error at translateText --> ${error}`);
    return 0;
  }
};

///////////////////////////////////////////////////////
require("dotenv").config();
const CREDENTIALS_PAPAGO = JSON.parse(process.env.CREDENTIALS_PAPAGO);

module.exports.papagoTranslator = async (query, source, targetLanguage) => {
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
};

const translate = async (options) => {
  const request = require("request");
  return new Promise((resolve, reject) => {
    request.post(options, (error, response, body) => {
      if (!error && response.statusCode == 200) {
        const result = JSON.parse(body).message.result;
        resolve(result.translatedText);
      } else {
        console.log("error = " + response.statusCode);
        reject(0);
      }
    });
  });
};

///////////////////////////////////////////////////////

require("dotenv").config();
const CREDENTIALS_KAKAO = JSON.parse(process.env.CREDENTIALS_KAKAO);
module.exports.kakaoTranslator = async (query, source, targetLanguage) => {
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
};

const translate = async (options) => {
  console.log("translate on");

  const request = require("request");
  return new Promise((resolve, reject) => {
    request.post(options, (error, response, body) => {
      console.log("post on");
      if (!error && response.statusCode == 200) {
        const result = JSON.parse(body).translated_text;
        console.log(result);
        resolve(result);
      } else {
        console.log("error = " + response.statusCode);
        console.log(body);
        reject(0);
      }
    });
  });
};
