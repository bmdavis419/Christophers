"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
var homepage_1 = require("./queries/homepage");
exports.resolvers = {
    Query: {
        homepageBanner: homepage_1.homepageBanner,
        restaurantInfo: homepage_1.restaurantInfo,
    },
};
