import { gql } from "apollo-server";
export const typeDefs = gql`
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
	type About {
		id: ID
		topHeading: String
		subHeading: String
		content: String
	}
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
	type MenuItem {
		id: ID
		name: String
		description: String
		price: Float
		image: String
		type: Int
	}
	type Feature {
		id: ID
		menuItem: MenuItem
		type: String
	}
	type Query {
		homepageBanner: HomepageBanner
		homepageFeatures: [HomepageFeature]
		restaurantInfo: RestaurantInfo
	}
`;
