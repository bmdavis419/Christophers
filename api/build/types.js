"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
var apollo_server_1 = require("apollo-server");
exports.typeDefs = apollo_server_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n\t# Site Controls\n\ttype SiteControls {\n\t\tshowVenues: Boolean\n\t\tshowPartners: Boolean\n\t\tsiteAlert: String\n\t}\n\n\t# Homepage\n\ttype HomepageBanner {\n\t\ttopText: String\n\t\tmidText: String\n\t\tbottomText: String\n\t\tleftLinkText: String\n\t\tleftLink: String\n\t\trightLinkText: String\n\t\trightLink: String\n\t\timages: [String]\n\t}\n\ttype HomepageFeature {\n\t\tid: ID\n\t\ttitle: String\n\t\tdescription: String\n\t\ttopLinkText: String\n\t\ttopLink: String\n\t\tbottomLinkText: String\n\t\tbottomLink: String\n\t\timage: String\n\t}\n\ttype RestaurantInfo {\n\t\tmonday: String\n\t\ttuesday: String\n\t\twednesday: String\n\t\tthursday: String\n\t\tfriday: String\n\t\tsaturday: String\n\t\tsunday: String\n\t\tphone: String\n\t\tlocation: String\n\t\tlocationLink: String\n\t}\n\ttype HomepageCard {\n\t\tid: ID\n\t\ttitle: String\n\t\tdate: String\n\t\tcontent: String\n\t}\n\n\t# Catering Homepage\n\ttype CateringHomepageBanner {\n\t\ttopText: String\n\t\tmidText: String\n\t\tbottomText: String\n\t\tleftLinkText: String\n\t\tleftLink: String\n\t\trightLinkText: String\n\t\trightLink: String\n\t\timages: [String]\n\t}\n\ttype CateringHomepageCard {\n\t\tid: String\n\t\ttitle: String\n\t\tdate: String\n\t\tcontent: String\n\t}\n\n\t# About\n\ttype About {\n\t\tid: ID\n\t\ttopHeading: String\n\t\tsubHeading: String\n\t\tcontent: String\n\t}\n\n\t# Catering About\n\ttype CateringAbout {\n\t\ttopHeading: String\n\t\tsubHeading: String\n\t\tcontent: String\n\t}\n\n\t# FAQ\n\ttype RestaurantFAQ {\n\t\tid: ID\n\t\tquestion: String\n\t\tanswer: String\n\t}\n\ttype CateringFAQ {\n\t\tid: ID\n\t\tquestion: String\n\t\tanswer: String\n\t}\n\n\t# Menus\n\ttype Category {\n\t\tid: ID\n\t\tname: String\n\t\tsubcategories: [Subcategory]\n\t}\n\ttype Subcategory {\n\t\tid: ID\n\t\tname: String\n\t\tmenuItems: [MenuItem]\n\t}\n\ttype FeatureCategory {\n\t\tid: ID\n\t\tname: String\n\t\tdaysOfWeek: [Int]\n\t\tmenuItems: [MenuItem]\n\t}\n\ttype MenuItem {\n\t\tid: ID\n\t\tname: String\n\t\tdescription: String\n\t\tprice: String\n\t\timage: String\n\t\ttype: Int\n\t\tisOldImage: Boolean\n\t\tcategory: [Category]\n\t\tsubcategory: [Subcategory]\n\t\tisFeature: Boolean\n\t\tfeatureID: ID\n\t}\n\n\t# Catering Menus\n\ttype CateringCategory {\n\t\tid: ID\n\t\tname: String\n\t\tsubcategories: [CateringSubcategory]\n\t}\n\ttype CateringSubcategory {\n\t\tid: ID\n\t\tname: String\n\t\tmenuItems: [CateringMenuItem]\n\t}\n\ttype CateringMenuItem {\n\t\tid: ID\n\t\tname: String\n\t\tcategory: [CateringCategory]\n\t\tsubcategory: [CateringSubcategory]\n\t\tdescription: String\n\t\tprice: String\n\t\timage: String\n\t}\n\n\t# Gallery\n\ttype Gallery {\n\t\timage: String\n\t\tdescription: String\n\t\tid: ID\n\t}\n\n\t# Venue\n\ttype Venue {\n\t\tid: String\n\t\tname: String\n\t\timage: String\n\t\tdescription: String\n\t\tbannerImage: String\n\t}\n\n\t# Partner\n\ttype Partner {\n\t\tid: String\n\t\tname: String\n\t\timage: String\n\t\tdescription: String\n\t\tbannerImage: String\n\t}\n\n\ttype Query {\n\t\tsiteControls: SiteControls\n\t\thomepageBanner: HomepageBanner\n\t\thomepageFeatures: [HomepageFeature]\n\t\thomepageCards: [HomepageCard]\n\t\trestaurantInfo: RestaurantInfo\n\t\trestaurantFAQ: [RestaurantFAQ]\n\t\tcateringFAQ: [CateringFAQ]\n\t\tabout: About\n\t\tcategories: [Category]\n\t\tsubcategories: [Subcategory]\n\t\tmenuItems: [MenuItem]\n\t\tcategory(id: ID): Category\n\t\tsubcategory(id: ID): Subcategory\n\t\tmenuItem(id: ID): MenuItem\n\t\tfeatureCategories: [FeatureCategory]\n\t\tcateringHomepageBanner: CateringHomepageBanner\n\t\tcateringHomepageCards: [CateringHomepageCard]\n\t\tcateringAbout: CateringAbout\n\t\tcateringCategories: [CateringCategory]\n\t\tcateringSubcategories: [CateringSubcategory]\n\t\tcateringMenuItems: [CateringMenuItem]\n\t\tcateringCategory(id: ID): CateringCategory\n\t\tcateringSubcategory(id: ID): CateringSubcategory\n\t\tcateringMenuItem(id: ID): CateringMenuItem\n\t\tgalleryImages: [Gallery]\n\t\tvenues: [Venue]\n\t\tpartners: [Partner]\n\t}\n\ttype Mutation {\n\t\t# Site Controls\n\t\tupdateSiteControls(\n\t\t\tshowVenues: Boolean\n\t\t\tshowPartners: Boolean\n\t\t\tsiteAlert: String\n\t\t): SiteControls\n\n\t\t# Menu\n\t\tupdateMenuItem(\n\t\t\tid: ID!\n\t\t\tname: String\n\t\t\tcategory: [ID]\n\t\t\tsubcategory: [ID]\n\t\t\tdescription: String\n\t\t\tprice: String\n\t\t\timage: String\n\t\t\ttype: Int\n\t\t): MenuItem\n\t\tremoveMenuItem(id: ID!, featureID: String, subcatID: [ID]!): ID\n\t\tcreateMenuItem(\n\t\t\tname: String!\n\t\t\tcategory: [ID]!\n\t\t\tsubcategory: [ID]!\n\t\t\tdescription: String!\n\t\t\tprice: String!\n\t\t\timage: String!\n\t\t\ttype: Int!\n\t\t\tisFeature: Boolean!\n\t\t\tfeatureID: String\n\t\t): MenuItem\n\n\t\t# About\n\t\tupdateAbout(\n\t\t\ttopHeading: String!\n\t\t\tsubHeading: String!\n\t\t\tcontent: String!\n\t\t): About\n\n\t\t# Catering Menu Items\n\t\tupdateCateringMenuItem(\n\t\t\tid: ID!\n\t\t\tname: String\n\t\t\tcategory: [ID]\n\t\t\tsubcategory: [ID]\n\t\t\tdescription: String\n\t\t\tprice: String\n\t\t\timage: String\n\t\t\ttype: Int\n\t\t): MenuItem\n\t\tremoveCateringMenuItem(id: ID!, featureID: String, subcatID: [ID]!): ID\n\t\tcreateCateringMenuItem(\n\t\t\tname: String!\n\t\t\tcategory: [ID]!\n\t\t\tsubcategory: [ID]!\n\t\t\tdescription: String!\n\t\t\tprice: String!\n\t\t\timage: String!\n\t\t): MenuItem\n\n\t\t# Menu Categories and Subcategories\n\t\tcreateCateringCategory(name: String!): Category\n\t\tupdateCateringCategory(name: String!, id: ID!): Category\n\t\tdeleteCateringCategory(id: ID!): ID\n\t\tcreateCateringSubcategory(name: String!, category: ID!): Subcategory\n\t\tupdateCateringSubcategory(name: String!, id: ID!): Subcategory\n\t\tdeleteCateringSubcategory(id: ID!, catID: ID!): ID\n\n\t\t# Feature Category\n\t\tcreateFeatureCategory(\n\t\t\tname: String!\n\t\t\tmenuItems: [String]\n\t\t\tdaysOfWeek: [Int]\n\t\t): FeatureCategory\n\t\tupdateFeatureCategory(\n\t\t\tid: ID!\n\t\t\tname: String!\n\t\t\tdaysOfWeek: [Int]!\n\t\t): FeatureCategory\n\t\tdeleteFeatureCategory(id: ID!): ID\n\t\tmakeItemFeature(featureCatId: ID!, menuItemId: ID!): MenuItem\n\t\tremoveItemFeature(featureCatId: ID!, menuItemId: ID!): MenuItem\n\n\t\t# Menu Categories and Subcategories\n\t\tcreateCategory(name: String!): Category\n\t\tupdateCategory(name: String!, id: ID!): Category\n\t\tdeleteCategory(id: ID!): ID\n\t\tcreateSubcategory(name: String!, category: ID!): Subcategory\n\t\tupdateSubcategory(name: String!, id: ID!): Subcategory\n\t\tdeleteSubcategory(id: ID!, catID: ID!): ID\n\n\t\t# Catering Homepage Banner\n\t\tupdateCateringHomepageBanner(\n\t\t\ttopText: String\n\t\t\tmidText: String\n\t\t\tbottomText: String\n\t\t\tleftLinkText: String\n\t\t\tleftLink: String\n\t\t\trightLinkText: String\n\t\t\trightLink: String\n\t\t\timages: [String]\n\t\t): CateringHomepageBanner\n\n\t\t# Catering Homepage Cards\n\t\tupdateCateringHomepageCard(\n\t\t\tid: String!\n\t\t\ttitle: String\n\t\t\tdate: String\n\t\t\tcontent: String\n\t\t): CateringHomepageCard\n\t\tremoveCateringHomepageCard(id: ID!): ID\n\t\tcreateCateringHomepageCard(\n\t\t\ttitle: String!\n\t\t\tdate: String!\n\t\t\tcontent: String!\n\t\t): CateringHomepageCard\n\t\t# Catering FAQs\n\t\tupdateCateringFAQ(\n\t\t\tid: String!\n\t\t\tquestion: String\n\t\t\tanswer: String\n\t\t): CateringFAQ\n\t\tremoveCateringFAQ(id: ID!): ID\n\t\tcreateCateringFAQ(question: String!, answer: String!): CateringFAQ\n\t\t# Restaurant FAQs\n\t\tupdateRestaurantFAQ(\n\t\t\tid: String!\n\t\t\tquestion: String\n\t\t\tanswer: String\n\t\t): RestaurantFAQ\n\t\tremoveRestaurantFAQ(id: ID!): ID\n\t\tcreateRestaurantFAQ(question: String!, answer: String!): RestaurantFAQ\n\t\t# Venue\n\t\tupdateVenue(\n\t\t\tid: String!\n\t\t\tname: String\n\t\t\timage: String\n\t\t\tdescription: String\n\t\t\tbannerImage: String\n\t\t): Venue\n\t\tremoveVenue(id: ID!): ID\n\t\tcreateVenue(\n\t\t\tname: String!\n\t\t\timage: String!\n\t\t\tdescription: String!\n\t\t\tbannerImage: String\n\t\t): Venue\n\t\t# Partner\n\t\tupdatePartner(\n\t\t\tid: String!\n\t\t\tname: String\n\t\t\timage: String\n\t\t\tdescription: String\n\t\t\tbannerImage: String\n\t\t): Partner\n\t\tremovePartner(id: ID!): ID\n\t\tcreatePartner(\n\t\t\tname: String!\n\t\t\timage: String!\n\t\t\tdescription: String!\n\t\t\tbannerImage: String\n\t\t): Partner\n\n\t\t# Homepage Banner\n\t\tupdateHomepageBanner(\n\t\t\ttopText: String\n\t\t\tmidText: String\n\t\t\tbottomText: String\n\t\t\tleftLinkText: String\n\t\t\tleftLink: String\n\t\t\trightLinkText: String\n\t\t\trightLink: String\n\t\t\timages: [String]\n\t\t): HomepageBanner\n\n\t\t# Restaurant Info\n\t\tupdateRestaurantInfo(\n\t\t\tmonday: String\n\t\t\ttuesday: String\n\t\t\twednesday: String\n\t\t\tthursday: String\n\t\t\tfriday: String\n\t\t\tsaturday: String\n\t\t\tsunday: String\n\t\t\tphone: String\n\t\t\tlocation: String\n\t\t\tlocationLink: String\n\t\t): RestaurantInfo\n\n\t\t# Homepage Feature\n\t\tupdateHomepageFeature(\n\t\t\tid: String!\n\t\t\ttitle: String\n\t\t\tdescription: String\n\t\t\ttopLinkText: String\n\t\t\ttopLink: String\n\t\t\tbottomLinkText: String\n\t\t\tbottomLink: String\n\t\t\timage: String\n\t\t): HomepageFeature\n\t\tremoveHomepageFeature(id: ID!): ID\n\t\tcreateHomepageFeature(\n\t\t\ttitle: String!\n\t\t\tdescription: String!\n\t\t\ttopLinkText: String!\n\t\t\ttopLink: String!\n\t\t\tbottomLinkText: String!\n\t\t\tbottomLink: String!\n\t\t\timage: String!\n\t\t): HomepageFeature\n\n\t\t# Homepage Card\n\t\tupdateHomepageCard(\n\t\t\tid: String!\n\t\t\ttitle: String\n\t\t\tdate: String\n\t\t\tcontent: String\n\t\t): HomepageCard\n\t\tremoveHomepageCard(id: ID!): ID\n\t\tcreateHomepageCard(\n\t\t\ttitle: String!\n\t\t\tdate: String!\n\t\t\tcontent: String!\n\t\t): HomepageCard\n\n\t\t# Gallery\n\t\tcreateGalleryImage(image: String!, description: String): Gallery\n\t\tupdateGalleryImage(image: String, description: String, id: ID!): Gallery\n\t\tdeleteGalleryImage(id: ID!): ID\n\t}\n"], ["\n\t# Site Controls\n\ttype SiteControls {\n\t\tshowVenues: Boolean\n\t\tshowPartners: Boolean\n\t\tsiteAlert: String\n\t}\n\n\t# Homepage\n\ttype HomepageBanner {\n\t\ttopText: String\n\t\tmidText: String\n\t\tbottomText: String\n\t\tleftLinkText: String\n\t\tleftLink: String\n\t\trightLinkText: String\n\t\trightLink: String\n\t\timages: [String]\n\t}\n\ttype HomepageFeature {\n\t\tid: ID\n\t\ttitle: String\n\t\tdescription: String\n\t\ttopLinkText: String\n\t\ttopLink: String\n\t\tbottomLinkText: String\n\t\tbottomLink: String\n\t\timage: String\n\t}\n\ttype RestaurantInfo {\n\t\tmonday: String\n\t\ttuesday: String\n\t\twednesday: String\n\t\tthursday: String\n\t\tfriday: String\n\t\tsaturday: String\n\t\tsunday: String\n\t\tphone: String\n\t\tlocation: String\n\t\tlocationLink: String\n\t}\n\ttype HomepageCard {\n\t\tid: ID\n\t\ttitle: String\n\t\tdate: String\n\t\tcontent: String\n\t}\n\n\t# Catering Homepage\n\ttype CateringHomepageBanner {\n\t\ttopText: String\n\t\tmidText: String\n\t\tbottomText: String\n\t\tleftLinkText: String\n\t\tleftLink: String\n\t\trightLinkText: String\n\t\trightLink: String\n\t\timages: [String]\n\t}\n\ttype CateringHomepageCard {\n\t\tid: String\n\t\ttitle: String\n\t\tdate: String\n\t\tcontent: String\n\t}\n\n\t# About\n\ttype About {\n\t\tid: ID\n\t\ttopHeading: String\n\t\tsubHeading: String\n\t\tcontent: String\n\t}\n\n\t# Catering About\n\ttype CateringAbout {\n\t\ttopHeading: String\n\t\tsubHeading: String\n\t\tcontent: String\n\t}\n\n\t# FAQ\n\ttype RestaurantFAQ {\n\t\tid: ID\n\t\tquestion: String\n\t\tanswer: String\n\t}\n\ttype CateringFAQ {\n\t\tid: ID\n\t\tquestion: String\n\t\tanswer: String\n\t}\n\n\t# Menus\n\ttype Category {\n\t\tid: ID\n\t\tname: String\n\t\tsubcategories: [Subcategory]\n\t}\n\ttype Subcategory {\n\t\tid: ID\n\t\tname: String\n\t\tmenuItems: [MenuItem]\n\t}\n\ttype FeatureCategory {\n\t\tid: ID\n\t\tname: String\n\t\tdaysOfWeek: [Int]\n\t\tmenuItems: [MenuItem]\n\t}\n\ttype MenuItem {\n\t\tid: ID\n\t\tname: String\n\t\tdescription: String\n\t\tprice: String\n\t\timage: String\n\t\ttype: Int\n\t\tisOldImage: Boolean\n\t\tcategory: [Category]\n\t\tsubcategory: [Subcategory]\n\t\tisFeature: Boolean\n\t\tfeatureID: ID\n\t}\n\n\t# Catering Menus\n\ttype CateringCategory {\n\t\tid: ID\n\t\tname: String\n\t\tsubcategories: [CateringSubcategory]\n\t}\n\ttype CateringSubcategory {\n\t\tid: ID\n\t\tname: String\n\t\tmenuItems: [CateringMenuItem]\n\t}\n\ttype CateringMenuItem {\n\t\tid: ID\n\t\tname: String\n\t\tcategory: [CateringCategory]\n\t\tsubcategory: [CateringSubcategory]\n\t\tdescription: String\n\t\tprice: String\n\t\timage: String\n\t}\n\n\t# Gallery\n\ttype Gallery {\n\t\timage: String\n\t\tdescription: String\n\t\tid: ID\n\t}\n\n\t# Venue\n\ttype Venue {\n\t\tid: String\n\t\tname: String\n\t\timage: String\n\t\tdescription: String\n\t\tbannerImage: String\n\t}\n\n\t# Partner\n\ttype Partner {\n\t\tid: String\n\t\tname: String\n\t\timage: String\n\t\tdescription: String\n\t\tbannerImage: String\n\t}\n\n\ttype Query {\n\t\tsiteControls: SiteControls\n\t\thomepageBanner: HomepageBanner\n\t\thomepageFeatures: [HomepageFeature]\n\t\thomepageCards: [HomepageCard]\n\t\trestaurantInfo: RestaurantInfo\n\t\trestaurantFAQ: [RestaurantFAQ]\n\t\tcateringFAQ: [CateringFAQ]\n\t\tabout: About\n\t\tcategories: [Category]\n\t\tsubcategories: [Subcategory]\n\t\tmenuItems: [MenuItem]\n\t\tcategory(id: ID): Category\n\t\tsubcategory(id: ID): Subcategory\n\t\tmenuItem(id: ID): MenuItem\n\t\tfeatureCategories: [FeatureCategory]\n\t\tcateringHomepageBanner: CateringHomepageBanner\n\t\tcateringHomepageCards: [CateringHomepageCard]\n\t\tcateringAbout: CateringAbout\n\t\tcateringCategories: [CateringCategory]\n\t\tcateringSubcategories: [CateringSubcategory]\n\t\tcateringMenuItems: [CateringMenuItem]\n\t\tcateringCategory(id: ID): CateringCategory\n\t\tcateringSubcategory(id: ID): CateringSubcategory\n\t\tcateringMenuItem(id: ID): CateringMenuItem\n\t\tgalleryImages: [Gallery]\n\t\tvenues: [Venue]\n\t\tpartners: [Partner]\n\t}\n\ttype Mutation {\n\t\t# Site Controls\n\t\tupdateSiteControls(\n\t\t\tshowVenues: Boolean\n\t\t\tshowPartners: Boolean\n\t\t\tsiteAlert: String\n\t\t): SiteControls\n\n\t\t# Menu\n\t\tupdateMenuItem(\n\t\t\tid: ID!\n\t\t\tname: String\n\t\t\tcategory: [ID]\n\t\t\tsubcategory: [ID]\n\t\t\tdescription: String\n\t\t\tprice: String\n\t\t\timage: String\n\t\t\ttype: Int\n\t\t): MenuItem\n\t\tremoveMenuItem(id: ID!, featureID: String, subcatID: [ID]!): ID\n\t\tcreateMenuItem(\n\t\t\tname: String!\n\t\t\tcategory: [ID]!\n\t\t\tsubcategory: [ID]!\n\t\t\tdescription: String!\n\t\t\tprice: String!\n\t\t\timage: String!\n\t\t\ttype: Int!\n\t\t\tisFeature: Boolean!\n\t\t\tfeatureID: String\n\t\t): MenuItem\n\n\t\t# About\n\t\tupdateAbout(\n\t\t\ttopHeading: String!\n\t\t\tsubHeading: String!\n\t\t\tcontent: String!\n\t\t): About\n\n\t\t# Catering Menu Items\n\t\tupdateCateringMenuItem(\n\t\t\tid: ID!\n\t\t\tname: String\n\t\t\tcategory: [ID]\n\t\t\tsubcategory: [ID]\n\t\t\tdescription: String\n\t\t\tprice: String\n\t\t\timage: String\n\t\t\ttype: Int\n\t\t): MenuItem\n\t\tremoveCateringMenuItem(id: ID!, featureID: String, subcatID: [ID]!): ID\n\t\tcreateCateringMenuItem(\n\t\t\tname: String!\n\t\t\tcategory: [ID]!\n\t\t\tsubcategory: [ID]!\n\t\t\tdescription: String!\n\t\t\tprice: String!\n\t\t\timage: String!\n\t\t): MenuItem\n\n\t\t# Menu Categories and Subcategories\n\t\tcreateCateringCategory(name: String!): Category\n\t\tupdateCateringCategory(name: String!, id: ID!): Category\n\t\tdeleteCateringCategory(id: ID!): ID\n\t\tcreateCateringSubcategory(name: String!, category: ID!): Subcategory\n\t\tupdateCateringSubcategory(name: String!, id: ID!): Subcategory\n\t\tdeleteCateringSubcategory(id: ID!, catID: ID!): ID\n\n\t\t# Feature Category\n\t\tcreateFeatureCategory(\n\t\t\tname: String!\n\t\t\tmenuItems: [String]\n\t\t\tdaysOfWeek: [Int]\n\t\t): FeatureCategory\n\t\tupdateFeatureCategory(\n\t\t\tid: ID!\n\t\t\tname: String!\n\t\t\tdaysOfWeek: [Int]!\n\t\t): FeatureCategory\n\t\tdeleteFeatureCategory(id: ID!): ID\n\t\tmakeItemFeature(featureCatId: ID!, menuItemId: ID!): MenuItem\n\t\tremoveItemFeature(featureCatId: ID!, menuItemId: ID!): MenuItem\n\n\t\t# Menu Categories and Subcategories\n\t\tcreateCategory(name: String!): Category\n\t\tupdateCategory(name: String!, id: ID!): Category\n\t\tdeleteCategory(id: ID!): ID\n\t\tcreateSubcategory(name: String!, category: ID!): Subcategory\n\t\tupdateSubcategory(name: String!, id: ID!): Subcategory\n\t\tdeleteSubcategory(id: ID!, catID: ID!): ID\n\n\t\t# Catering Homepage Banner\n\t\tupdateCateringHomepageBanner(\n\t\t\ttopText: String\n\t\t\tmidText: String\n\t\t\tbottomText: String\n\t\t\tleftLinkText: String\n\t\t\tleftLink: String\n\t\t\trightLinkText: String\n\t\t\trightLink: String\n\t\t\timages: [String]\n\t\t): CateringHomepageBanner\n\n\t\t# Catering Homepage Cards\n\t\tupdateCateringHomepageCard(\n\t\t\tid: String!\n\t\t\ttitle: String\n\t\t\tdate: String\n\t\t\tcontent: String\n\t\t): CateringHomepageCard\n\t\tremoveCateringHomepageCard(id: ID!): ID\n\t\tcreateCateringHomepageCard(\n\t\t\ttitle: String!\n\t\t\tdate: String!\n\t\t\tcontent: String!\n\t\t): CateringHomepageCard\n\t\t# Catering FAQs\n\t\tupdateCateringFAQ(\n\t\t\tid: String!\n\t\t\tquestion: String\n\t\t\tanswer: String\n\t\t): CateringFAQ\n\t\tremoveCateringFAQ(id: ID!): ID\n\t\tcreateCateringFAQ(question: String!, answer: String!): CateringFAQ\n\t\t# Restaurant FAQs\n\t\tupdateRestaurantFAQ(\n\t\t\tid: String!\n\t\t\tquestion: String\n\t\t\tanswer: String\n\t\t): RestaurantFAQ\n\t\tremoveRestaurantFAQ(id: ID!): ID\n\t\tcreateRestaurantFAQ(question: String!, answer: String!): RestaurantFAQ\n\t\t# Venue\n\t\tupdateVenue(\n\t\t\tid: String!\n\t\t\tname: String\n\t\t\timage: String\n\t\t\tdescription: String\n\t\t\tbannerImage: String\n\t\t): Venue\n\t\tremoveVenue(id: ID!): ID\n\t\tcreateVenue(\n\t\t\tname: String!\n\t\t\timage: String!\n\t\t\tdescription: String!\n\t\t\tbannerImage: String\n\t\t): Venue\n\t\t# Partner\n\t\tupdatePartner(\n\t\t\tid: String!\n\t\t\tname: String\n\t\t\timage: String\n\t\t\tdescription: String\n\t\t\tbannerImage: String\n\t\t): Partner\n\t\tremovePartner(id: ID!): ID\n\t\tcreatePartner(\n\t\t\tname: String!\n\t\t\timage: String!\n\t\t\tdescription: String!\n\t\t\tbannerImage: String\n\t\t): Partner\n\n\t\t# Homepage Banner\n\t\tupdateHomepageBanner(\n\t\t\ttopText: String\n\t\t\tmidText: String\n\t\t\tbottomText: String\n\t\t\tleftLinkText: String\n\t\t\tleftLink: String\n\t\t\trightLinkText: String\n\t\t\trightLink: String\n\t\t\timages: [String]\n\t\t): HomepageBanner\n\n\t\t# Restaurant Info\n\t\tupdateRestaurantInfo(\n\t\t\tmonday: String\n\t\t\ttuesday: String\n\t\t\twednesday: String\n\t\t\tthursday: String\n\t\t\tfriday: String\n\t\t\tsaturday: String\n\t\t\tsunday: String\n\t\t\tphone: String\n\t\t\tlocation: String\n\t\t\tlocationLink: String\n\t\t): RestaurantInfo\n\n\t\t# Homepage Feature\n\t\tupdateHomepageFeature(\n\t\t\tid: String!\n\t\t\ttitle: String\n\t\t\tdescription: String\n\t\t\ttopLinkText: String\n\t\t\ttopLink: String\n\t\t\tbottomLinkText: String\n\t\t\tbottomLink: String\n\t\t\timage: String\n\t\t): HomepageFeature\n\t\tremoveHomepageFeature(id: ID!): ID\n\t\tcreateHomepageFeature(\n\t\t\ttitle: String!\n\t\t\tdescription: String!\n\t\t\ttopLinkText: String!\n\t\t\ttopLink: String!\n\t\t\tbottomLinkText: String!\n\t\t\tbottomLink: String!\n\t\t\timage: String!\n\t\t): HomepageFeature\n\n\t\t# Homepage Card\n\t\tupdateHomepageCard(\n\t\t\tid: String!\n\t\t\ttitle: String\n\t\t\tdate: String\n\t\t\tcontent: String\n\t\t): HomepageCard\n\t\tremoveHomepageCard(id: ID!): ID\n\t\tcreateHomepageCard(\n\t\t\ttitle: String!\n\t\t\tdate: String!\n\t\t\tcontent: String!\n\t\t): HomepageCard\n\n\t\t# Gallery\n\t\tcreateGalleryImage(image: String!, description: String): Gallery\n\t\tupdateGalleryImage(image: String, description: String, id: ID!): Gallery\n\t\tdeleteGalleryImage(id: ID!): ID\n\t}\n"])));
var templateObject_1;
