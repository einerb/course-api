"use strict";

require("dotenv").config(); //instatiate environment variables

let config = {}; //Make this global to use all over the application

config.app = process.env.APP || "development";
config.port = process.env.PORT || "3000";

config.jwt_encryption = process.env.JWT_ENCRYPTION || "e4#ksWMKSLqR4UZx#uR4LX9RfuqI$s!XUP6UjF8R%4AxUfq1";
config.jwt_expiration = process.env.JWT_EXPIRATION || "10800";

module.exports = config;
