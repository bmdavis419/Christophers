"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
var apollo_server_1 = require("apollo-server");
exports.typeDefs = apollo_server_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n\ttype Test {\n\t\temail: String\n\t\tname: String\n\t\tid: ID\n\t}\n\ttype Query {\n\t\ttests: [Test]\n\t}\n"], ["\n\ttype Test {\n\t\temail: String\n\t\tname: String\n\t\tid: ID\n\t}\n\ttype Query {\n\t\ttests: [Test]\n\t}\n"])));
var templateObject_1;
