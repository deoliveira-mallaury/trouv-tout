import express from "express";
const app = express();

export async function date(req, res, next) {
  console.log("Time:", Date.now());
  next();
}
