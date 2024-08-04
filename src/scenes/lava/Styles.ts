export default {
	CAMERA_VIEW: {
		width: 1000,
		height: 600,
		'(orientation: portrait)': {
			width: 700,
			height: 1200,
		},
	},

	PIVOT_PRESENTS: {
		position: { x: 1300, y: 600 },
		'(orientation: portrait)': {
			position: { x: 1666, y: 600 },
		},
	},
	PIVOT_VOLCANO: {
		position: { x: 600, y: 512 },
		'(orientation: portrait)': {
			position: { x: 600, y: 720 },
		},
	},

	BRIDGE: {
		position: { x: 1315, y: 960 },	
		anchor: { x: 0.5, y: 0.5 },
	},

	MERGE_HINT: {
		alignment: { x: 0.85, y: 0.5 },
		'(orientation: portrait)': {
			alignment: {x: 0.5, y: 0.875},
		}
	},

	END_CARD: {
		dimensions: {
			x: 1920,
			y: 1080,
		},
		'(orientation: portrait)': {
			dimensions: {
				x: 1080,
				y: 1920,
			},
		}
	},
    END_CARD_LOGO: {
        alignment: { x: 0.5, y: 0.35 },
		'(orientation: portrait)': {
			alignment: { x: 0.5, y: 0.4 },
		}
    },
    END_CARD_BUTTON: {
        cursor: 'pointer',
        interactive: true,
        alignment: {x: 0.5, y: 0.75},
		'(orientation: portrait)': {
			alignment: {x: 0.5, y: 0.65},
		}
    },
}