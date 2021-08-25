export const CONST = {
	CSS_CLASSES: {
		ROW: "row",
		CELL: "cell",
		CELL_SNAKE: "cell--snake",
		CELL_FOOD: "cell--food",
		DIED_HEADER_TEXT: "header-text--died"
	},

	DOM_IDs: {
		HEADER_TEXT: "header_text",
		TOTAL_SCORE: "total_score",
		RECORD: "record"
	},

	CELL_TYPES: {
		SNAKE: "snake",
		FOOD: "food",
		EMPTY: "empty"
	},

	DIRECTIONS: {
		TOP: "TOP",
		BOTTOM: "BOTTOM",
		LEFT: "LEFT",
		RIGHT: "RIGHT"
	},

	SPEED_TYPES: {
		VERY_SLOW: 1000,
		SLOW: 500,
		MEDIUM: 200,
		FAST: 150,
		SUPER_FAST: 100,
		NIGHTMARE: 50
	},

	DEFAULT_SNAKE_COORDS: [{x: 4, y: 4}, {x: 5, y: 4}, {x:6, y: 4}, {x:7, y: 4}, {x:8, y: 4}, {x:9, y: 4}],

	DEFAULT_SNAKE_HEAD_COORDS: {x: 9, y: 4}
}