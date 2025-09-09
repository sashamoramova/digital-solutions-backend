// const express = require("express");
// const morgan = require("morgan");
// const cors = require("cors");
// const removeHTTPHeader = require("../middleware/removeHeader");
// const path = require("path");

// const serverConfig = (app) => {
//   app.use(cors({
//     origin: ["https://digital-solutions-frontend-dydjh75s1-sashamoramovas-projects.vercel.app", "https://digital-solutions-frontend-orcin.vercel.app", "http://localhost:5173", "https://digital-solutions-production.up.railway.app"],
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//     allowedHeaders: ['Content-Type', 'Authorization'],
//     credentials: true,
//     optionsSuccessStatus: 200
//   }));
//   app.use(express.urlencoded({ extended: true }));
//   app.use(express.json());
//   app.use(morgan("dev"));
//   app.use(removeHTTPHeader);
//   app.use("/static", express.static(path.resolve(__dirname, "..", "public")));
// };

// module.exports = serverConfig;


// //обновление переменных окружения



const express = require("express");
const morgan = require("morgan");
const removeHTTPHeader = require("../middleware/removeHeader");
const path = require("path");
const cors = require('cors');

const serverConfig = (app) => {
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(morgan("dev"));
  app.use(removeHTTPHeader);
  app.use("/static", express.static(path.resolve(__dirname, "..", "public")));
  app.use(cors());
};

module.exports = serverConfig;