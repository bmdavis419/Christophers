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
		phone: String
		location: String
		locationLink: String
	}
	type HomepageCard {
		id: ID
		title: String
		date: String
		content: String
	}

	# Catering Homepage
	type CateringHomepageBanner {
		topText: String
		midText: String
		bottomText: String
		leftLinkText: String
		leftLink: String
		rightLinkText: String
		rightLink: String
		images: [String]
	}
	type CateringHomepageCard {
		id: String
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

	# Catering About
	type CateringAbout {
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

	# Catering Menus
	type CateringCategory {
		id: ID
		name: String
		subcategories: [CateringSubcategory]
	}
	type CateringSubcategory {
		id: ID
		name: String
		menuItems: [CateringMenuItem]
	}
	type CateringMenuItem {
		id: ID
		name: String
		category: [CateringCategory]
		subcategory: [CateringSubcategory]
		description: String
		price: String
		image: String
	}

	# Gallery
	type Gallery {
		image: String
		description: String
		id: ID
	}

	# Venue
	type Venue {
		id: String
		name: String
		image: String
		description: String
	}

	# Partner
	type Partner {
		id: String
		name: String
		image: String
		description: String
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
		cateringHomepageBanner: CateringHomepageBanner
		cateringHomepageCards: [CateringHomepageCard]
		cateringAbout: CateringAbout
		cateringCategories: [CateringCategory]
		cateringSubcategories: [CateringSubcategory]
		cateringMenuItems: [CateringMenuItem]
		cateringCategory(id: ID): CateringCategory
		cateringSubcategory(id: ID): CateringSubcategory
		cateringMenuItem(id: ID): CateringMenuItem
		galleryImages: [Gallery]
		venues: [Venue]
		partners: [Partner]
	}
	type Mutation {
		# Menu
		updateMenuItem(
			id: ID!
			name: String
			category: [ID]
			subcategory: [ID]
			description: String
			price: String
			image: String
			type: Int
		): MenuItem
		removeMenuItem(id: ID!, featureID: String, subcatID: [ID]!): ID
		createMenuItem(
			name: String!
			category: [ID]!
			subcategory: [ID]!
			description: String!
			price: String!
			image: String!
			type: Int!
			isFeature: Boolean!
			featureID: String
		): MenuItem

		# Catering Menu Items
		updateCateringMenuItem(
			id: ID!
			name: String
			category: [ID]
			subcategory: [ID]
			description: String
			price: String
			image: String
			type: Int
		): MenuItem
		removeCateringMenuItem(id: ID!, featureID: String, subcatID: [ID]!): ID
		createCateringMenuItem(
			name: String!
			category: [ID]!
			subcategory: [ID]!
			description: String!
			price: String!
			image: String!
		): MenuItem

		# Menu Categories and Subcategories
		createCateringCategory(name: String!): Category
		updateCateringCategory(name: String!, id: ID!): Category
		deleteCateringCategory(id: ID!): ID
		createCateringSubcategory(name: String!, category: ID!): Subcategory
		updateCateringSubcategory(name: String!, id: ID!): Subcategory
		deleteCateringSubcategory(id: ID!, catID: ID!): ID

		# Feature Category
		createFeatureCategory(
			name: String!
			menuItems: [String]
			daysOfWeek: [Int]
		): FeatureCategory
		updateFeatureCategory(
			id: ID!
			name: String!
			daysOfWeek: [Int]!
		): FeatureCategory
		deleteFeatureCategory(id: ID!): ID
		makeItemFeature(featureCatId: ID!, menuItemId: ID!): MenuItem
		removeItemFeature(featureCatId: ID!, menuItemId: ID!): MenuItem

		# Menu Categories and Subcategories
		createCategory(name: String!): Category
		updateCategory(name: String!, id: ID!): Category
		deleteCategory(id: ID!): ID
		createSubcategory(name: String!, category: ID!): Subcategory
		updateSubcategory(name: String!, id: ID!): Subcategory
		deleteSubcategory(id: ID!, catID: ID!): ID

		# Catering Homepage Banner
		updateCateringHomepageBanner(
			topText: String
			midText: String
			bottomText: String
			leftLinkText: String
			leftLink: String
			rightLinkText: String
			rightLink: String
			images: [String]
		): CateringHomepageBanner

		# Catering Homepage Cards
		updateCateringHomepageCard(
			id: String!
			title: String
			date: String
			content: String
		): CateringHomepageCard
		removeCateringHomepageCard(id: ID!): ID
		createCateringHomepageCard(
			title: String!
			date: String!
			content: String!
		): CateringHomepageCard
		# Catering FAQs
		updateCateringFAQ(
			id: String!
			question: String
			answer: String
		): CateringFAQ
		removeCateringFAQ(id: ID!): ID
		createCateringFAQ(question: String!, answer: String!): CateringFAQ
		# Restaurant FAQs
		updateRestaurantFAQ(
			id: String!
			question: String
			answer: String
		): RestaurantFAQ
		removeRestaurantFAQ(id: ID!): ID
		createRestaurantFAQ(question: String!, answer: String!): RestaurantFAQ
		# Venue
		updateVenue(
			id: String!
			name: String
			image: String
			description: String
		): Venue
		removeVenue(id: ID!): ID
		createVenue(name: String!, image: String!, description: String!): Venue
		# Partner
		updatePartner(
			id: String!
			name: String
			image: String
			description: String
		): Partner
		removePartner(id: ID!): ID
		createPartner(name: String!, image: String!, description: String!): Partner

		# Homepage Banner
		updateHomepageBanner(
			topText: String
			midText: String
			bottomText: String
			leftLinkText: String
			leftLink: String
			rightLinkText: String
			rightLink: String
			images: [String]
		): HomepageBanner

		# Restaurant Info
		updateRestaurantInfo(
			monday: String
			tuesday: String
			wednesday: String
			thursday: String
			friday: String
			saturday: String
			sunday: String
			phone: String
			location: String
			locationLink: String
		): RestaurantInfo

		# Homepage Feature
		updateHomepageFeature(
			id: String!
			title: String
			description: String
			topLinkText: String
			topLink: String
			bottomLinkText: String
			bottomLink: String
			image: [String]
		): HomepageFeature
		removeHomepageFeature(id: ID!): ID
		createHomepageFeature(
			title: String!
			description: String!
			topLinkText: String!
			topLink: String!
			bottomLinkText: String!
			bottomLink: String!
			image: [String]!
		): HomepageFeature

		# Homepage Card
		updateHomepageCard(
			id: String!
			title: String
			date: String
			content: String
		): HomepageCard
		removeHomepageCard(id: ID!): ID
		createHomepageCard(
			title: String!
			date: String!
			content: String!
		): HomepageCard

		# Gallery
		createGalleryImage(image: String!, description: String): Gallery
		updateGalleryImage(image: String, description: String, id: ID!): Gallery
		deleteGalleryImage(id: ID!): ID
	}
`;
