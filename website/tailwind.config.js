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
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
