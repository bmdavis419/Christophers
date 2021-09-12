"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
var config_1 = require("./firebase/config");
var homepage_1 = require("./queries/homepage");
var menu_1 = require("./queries/menu");
var menu_2 = require("./mutations/menu");
var faq_1 = require("./queries/faq");
var about_1 = require("./queries/about");
var feature_1 = require("./mutations/feature");
var feature_2 = require("./queries/feature");
var catAndSubcat_1 = require("./mutations/catAndSubcat");
exports.resolvers = {
    Query: {
        cateringFAQ: faq_1.cateringFAQ,
        restaurantFAQ: faq_1.restaurantFAQ,
        about: about_1.about,
        homepageCards: homepage_1.homepageCards,
        homepageFeatures: homepage_1.homepageFeatures,
        homepageBanner: homepage_1.homepageBanner,
        restaurantInfo: homepage_1.restaurantInfo,
        categories: menu_1.categories,
        menuItems: menu_1.menuItems,
        subcategories: menu_1.subcategories,
        category: menu_1.category,
        menuItem: menu_1.menuItem,
        subcategory: menu_1.subcategory,
        featureCategories: feature_2.featureCategories,
    },
    Mutation: {
        updateMenuItem: menu_2.updateMenuItem,
        removeMenuItem: menu_2.removeMenuItem,
        createMenuItem: menu_2.createMenuItem,
        createFeatureCategory: feature_1.createFeatureCategory,
        createCategory: catAndSubcat_1.createCategory,
        deleteCategory: catAndSubcat_1.deleteCategory,
        updateCategory: catAndSubcat_1.updateCategory,
        createSubcategory: catAndSubcat_1.createSubcategory,
        updateSubcategory: catAndSubcat_1.updateSubcategory,
        deleteSubcategory: catAndSubcat_1.deleteSubcategory,
    },
    Category: {
        subcategories: function (parent) {
            return __awaiter(this, void 0, void 0, function () {
                var returnArr, subIDs, dataRefs, docs;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            returnArr = [];
                            subIDs = parent.subcategories.filter(function (item) {
                                return item !== "";
                            });
                            if (!(subIDs.length > 0)) return [3 /*break*/, 2];
                            dataRefs = subIDs.map(function (sub) {
                                var str = "Subcategory/" + sub;
                                return config_1.db.doc(str);
                            });
                            return [4 /*yield*/, config_1.db.getAll.apply(config_1.db, dataRefs)];
                        case 1:
                            docs = _a.sent();
                            docs.forEach(function (doc) {
                                var id = doc.id;
                                returnArr.push(__assign(__assign({}, doc.data()), { id: id }));
                            });
                            return [2 /*return*/, returnArr];
                        case 2: return [2 /*return*/, []];
                    }
                });
            });
        },
    },
    FeatureCategory: {
        menuItems: function (parent) {
            return __awaiter(this, void 0, void 0, function () {
                var returnArry, menuIDs, dataRefs, docs;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            returnArry = [];
                            menuIDs = parent.menuItems.filter(function (item) {
                                return item !== "";
                            });
                            if (!(menuIDs.length > 0)) return [3 /*break*/, 2];
                            dataRefs = menuIDs.map(function (sub) {
                                var str = "MenuItem/" + sub;
                                return config_1.db.doc(str);
                            });
                            return [4 /*yield*/, config_1.db.getAll.apply(config_1.db, dataRefs)];
                        case 1:
                            docs = _a.sent();
                            docs.forEach(function (doc) {
                                var id = doc.id;
                                returnArry.push(__assign(__assign({}, doc.data()), { id: id }));
                            });
                            return [2 /*return*/, returnArry];
                        case 2: return [2 /*return*/, []];
                    }
                });
            });
        },
    },
    Subcategory: {
        menuItems: function (parent) {
            return __awaiter(this, void 0, void 0, function () {
                var returnArr, menuIDs, dataRefs, docs;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            returnArr = [];
                            menuIDs = parent.menuItems.filter(function (item) {
                                return item !== "";
                            });
                            if (!(menuIDs.length > 0)) return [3 /*break*/, 2];
                            dataRefs = menuIDs.map(function (sub) {
                                var str = "MenuItem/" + sub;
                                return config_1.db.doc(str);
                            });
                            return [4 /*yield*/, config_1.db.getAll.apply(config_1.db, dataRefs)];
                        case 1:
                            docs = _a.sent();
                            docs.forEach(function (doc) {
                                var id = doc.id;
                                returnArr.push(__assign(__assign({}, doc.data()), { id: id }));
                            });
                            return [2 /*return*/, returnArr];
                        case 2: return [2 /*return*/, []];
                    }
                });
            });
        },
    },
    MenuItem: {
        subcategory: function (parent) {
            return __awaiter(this, void 0, void 0, function () {
                var subIDs, dataRefs, docs, returnArr_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            subIDs = parent.subcategory.filter(function (item) {
                                return item !== "";
                            });
                            if (!(subIDs.length > 0)) return [3 /*break*/, 2];
                            dataRefs = subIDs.map(function (id) {
                                return config_1.db.doc("Subcategory/" + id);
                            });
                            return [4 /*yield*/, config_1.db.getAll.apply(config_1.db, dataRefs)];
                        case 1:
                            docs = _a.sent();
                            returnArr_1 = [];
                            docs.forEach(function (doc) {
                                var id = doc.id;
                                returnArr_1.push(__assign(__assign({}, doc.data()), { id: id }));
                            });
                            // return
                            return [2 /*return*/, returnArr_1];
                        case 2: return [2 /*return*/, []];
                    }
                });
            });
        },
        category: function (parent) {
            return __awaiter(this, void 0, void 0, function () {
                var catIDs, dataRefs, docs, returnArr_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            catIDs = parent.category.filter(function (item) {
                                return item !== "";
                            });
                            if (!(catIDs.length > 0)) return [3 /*break*/, 2];
                            dataRefs = catIDs.map(function (id) {
                                return config_1.db.doc("Category/" + id);
                            });
                            return [4 /*yield*/, config_1.db.getAll.apply(config_1.db, dataRefs)];
                        case 1:
                            docs = _a.sent();
                            returnArr_2 = [];
                            docs.forEach(function (doc) {
                                var id = doc.id;
                                returnArr_2.push(__assign(__assign({}, doc.data()), { id: id }));
                            });
                            // return
                            return [2 /*return*/, returnArr_2];
                        case 2: return [2 /*return*/, []];
                    }
                });
            });
        },
    },
};
