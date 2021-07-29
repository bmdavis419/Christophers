"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
exports.resolvers = {
    Query: {
        tests: function () {
            return [
                {
                    name: "one",
                    email: "email",
                    id: "asdf",
                },
                {
                    name: "two",
                    email: "email2",
                    id: "fdsa",
                },
            ];
        },
    },
};
