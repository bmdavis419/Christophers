import { gql } from "apollo-server";
export const typeDefs = gql`
	# Homepage
	type HomepageBanner {
		topText: String
		midText: String
		bottomText: String
		leftLinkText: String
		leftLink: String
		rightLinkText: String
		rightLink: String
		images: [String]
	}
	type HomepageFeature {
		id: ID
		title: String
		description: String
		topLinkText: String
		topLink: String
		bottomLinkText: String
		bottomLink: String
		image: String
	}
	type RestaurantInfo {
		monday: String
		tuesday: String
		wednesday: String
		thursday: String
		friday: String
		saturday: String
		sunday: String
		phone: Float
		location: String
		locationLink: String
	}
	type HomepageCard {
		id: ID
		title: String
		date: String
		content: String
	}

	# About
	type About {
		id: ID
		topHeading: String
		subHeading: String
		content: String
	}

	# FAQ
	type RestaurantFAQ {
		id: ID
		question: String
		answer: String
	}
	type CateringFAQ {
		id: ID
		question: String
		answer: String
	}

	# Menus
	type Category {
		id: ID
		name: String
		subcategories: [Subcategory]
	}
	type Subcategory {
		id: ID
		name: String
		menuItems: [MenuItem]
	}
	type FeatureCategory {
		id: ID
		name: String
		daysOfWeek: [Int]
		menuItems: [MenuItem]
	}
	type MenuItem {
		id: ID
		name: String
		description: String
		price: String
		image: String
		type: Int
		isOldImage: Boolean
		category: [Category]
		subcategory: [Subcategory]
		isFeature: Boolean
		featureID: ID
	}
	type Query {
		homepageBanner: HomepageBanner
		homepageFeatures: [HomepageFeature]
		homepageCards: [HomepageCard]
		restaurantInfo: RestaurantInfo
		restaurantFAQ: [RestaurantFAQ]
		cateringFAQ: [CateringFAQ]
		about: About
		categories: [Category]
		subcategories: [Subcategory]
		menuItems: [MenuItem]
		category(id: ID): Category
		subcategory(id: ID): Subcategory
		menuItem(id: ID): MenuItem
		featureCategories: [FeatureCategory]
	}
	type Mutation {
		# Menu
		updateMenuItem(
			id: ID!
			name: String
			category: ID
			subcategory: ID
			description: String
			price: String
			image: String
			type: Int
		): MenuItem
		removeMenuItem(id: ID!, featureID: String): ID
		createMenuItem(
			name: String!
			category: ID!
			subcategory: ID!
			description: String!
			price: String!
			image: String!
			type: Int!
			isFeature: Boolean!
			featureID: String
		): MenuItem

		# Feature Category
		createFeatureCategory(
			name: String!
			menuItems: [String]
			daysOfWeek: [Int]
		): FeatureCategory

		# Menu Categories and Subcategories
		createCategory(name: String!): Category
		updateCategory(name: String!, id: ID!): Category
		deleteCategory(id: ID!): ID
		createSubcategory(name: String!, category: ID!): Subcategory
		updateSubcategory(name: String!, id: ID!): Subcategory
		deleteSubcategory(id: ID!, catID: ID!): ID
	}
`;
