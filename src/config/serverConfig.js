const express = require("express");
const morgan = require("morgan");
const removeHTTPHeader = require("../middleware/removeHeader");
const path = require("path");
const cors = require('cors');

const serverConfig = (app) => {
  app.use(cors({
    origin: [
      "https://digital-solutions-frontend-nmd4.vercel.app",
      "http://localhost:5173"
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    optionsSuccessStatus: 200
  }));
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(morgan("dev"));
  app.use(removeHTTPHeader);
  app.use("/static", express.static(path.resolve(__dirname, "..", "public")));
};

module.exports = serverConfig;