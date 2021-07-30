module.exports = {
	purge: [],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			colors: {
				primary: "#D12130",
				secondary: "#F54A58",
			},
			minHeight: {
				'0': '0',
				'1/4': '25%',
				'1/2': '50%',
				'3/4': '75%',
				'full': '100%',
			},
			margin: {
				'80%': '10vw',
			   },
			borderRadius: {
				'50px' : '50px',
			},
			height: {
				"96":"24rem",
				"144":"36rem",
				"192":"48rem",
				"1/2vw":"50vw",
				"1/3vw":"33vw",
				".4vw":"40vw",
				"1/4vw":"25vw",
				"1/2vh":"50vh",
			   }
		 
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
