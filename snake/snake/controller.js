import { CONST } from "./const.js";

export class Controller {
	/**
	 * Controller constructor.
	 * @param {View} view View object.
	 * @param {Model} model Model object.
	 */
	constructor(view, model) {
		this.View  = view;
		this.Model = model;
	}

	PREV_SCORE = 0;
	CURRENT_SCORE = 0;
	CONTAINS_FOOD = false;
	MOVE_STATE = false;
	MAIN_DIRECTION = CONST.DIRECTIONS.TOP;
	MAIN_SPEED = CONST.SPEED_TYPES.FAST;
	SNAKE_HEAD_COORDS = Object.assign({}, CONST.DEFAULT_SNAKE_HEAD_COORDS);
	SNAKE_COORDS = Object.assign([], CONST.DEFAULT_SNAKE_COORDS);

	/**
	 * THIS IS THE MAIN GAME METHOD WHICH STARTS THE GAME.
	 * @param {string} gameContainerId Container ID for game.
	 * @returns {void}
	 */
	start(gameContainerId) {
		this.Model.importStyles("snake/styles/main.css");
		this.Model.importStyles("https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap");
		this.View.renderGameField(gameContainerId, 20, 20);
		this.View.setTotalScore(this.CURRENT_SCORE);
		this.View.setRecordScore(this.CURRENT_SCORE);

		this.drawSnake();

		document.addEventListener("keyup", event => this.handleArrowsPress(event));
		document.addEventListener("keyup", event => this.handleEnterPress(event));
	}

	/**
	 * Handles arrow key pressing.
	 * @param {Event} event Event object.
	 * @returns {Promise}
	 */
	async handleEnterPress(event) {
		if (event.code === "Enter" && !this.MOVE_STATE) {
			this.MAIN_DIRECTION = CONST.DIRECTIONS.RIGHT;
			this.MOVE_STATE = true;
			this.View.setTotalScore(this.CURRENT_SCORE);

			let isCorrectMove = true;
	
			while(isCorrectMove) {
				try {
					await this.move();
				} catch {
					isCorrectMove = false;
					this.updateRecordScore();
					this.CURRENT_SCORE = 0;
					this.MOVE_STATE = false;
					this.CONTAINS_FOOD = false;
					this.View.showDeathAnimation();
					this.View.clearGameField();
					this.updateSnakeCoords();
					this.drawSnake();
				}
			}
		}
	}
	
	/**
	 * Updates record score.
	 */
	updateRecordScore() {
		if (this.CURRENT_SCORE > this.PREV_SCORE) {
			this.PREV_SCORE = this.CURRENT_SCORE;
			this.View.setRecordScore(this.PREV_SCORE);
		}
	}

	/**
	 * Handles Enter key pressing.
	 * @param {Event} event Event object.
	 * @returns {void}
	 */
	handleArrowsPress(event) {
		switch (event.code) {
			case "ArrowUp":
				if (this.MAIN_DIRECTION != CONST.DIRECTIONS.BOTTOM)
					this.MAIN_DIRECTION = CONST.DIRECTIONS.TOP;
				break;
			case "ArrowDown":
				if (this.MAIN_DIRECTION != CONST.DIRECTIONS.TOP)
					this.MAIN_DIRECTION = CONST.DIRECTIONS.BOTTOM;
				break;
			case "ArrowLeft":
				if (this.MAIN_DIRECTION != CONST.DIRECTIONS.RIGHT)
					this.MAIN_DIRECTION = CONST.DIRECTIONS.LEFT;
				break;
			case "ArrowRight":
				if (this.MAIN_DIRECTION != CONST.DIRECTIONS.LEFT)
					this.MAIN_DIRECTION = CONST.DIRECTIONS.RIGHT;
				break;
			default:
				return;
		}
	}

	/**
	 * Draws snake on the game field using View methods.
	 * @returns {void}
	 */
	drawSnake() {
		Object.assign([], this.SNAKE_COORDS)
		.map(snakeCoord => this.View.getCellByCoords(snakeCoord))
		.forEach(snakeCell => this.View.drawSquare(snakeCell, CONST.CELL_TYPES.SNAKE));
	}

	/**
	 * Makes snake step in necessery direction.
	 * @returns {Promise}
	 */
	async move() {
		switch (this.MAIN_DIRECTION) {
			case CONST.DIRECTIONS.TOP:
				--this.SNAKE_HEAD_COORDS.y;
				break;
			case CONST.DIRECTIONS.BOTTOM:
				++this.SNAKE_HEAD_COORDS.y;
				break;
			case CONST.DIRECTIONS.LEFT:
				--this.SNAKE_HEAD_COORDS.x;
				break;
			case CONST.DIRECTIONS.RIGHT:
				++this.SNAKE_HEAD_COORDS.x;
				break;
			default: return;
		}
		
		if (this.checkSnakeKillHerself()) {
			return Promise.reject();
		}

		if (!this.CONTAINS_FOOD) {
			this.View.renderRandomFood();
			this.CONTAINS_FOOD = true;
		}

		await this.makeSnakeStep();
	}

	/**
	 * Makes one snake step.
	 * @returns {Promise} Promise will be resolved after finished snake step.
	 */
	makeSnakeStep() {
		this.SNAKE_COORDS.push(Object.assign({}, this.SNAKE_HEAD_COORDS));
		const snakeTailCoords = this.SNAKE_COORDS.shift();
		const snakeHeadCoords = Object.assign({}, this.SNAKE_HEAD_COORDS);

		const snakeTailCell = this.View.getCellByCoords(snakeTailCoords);
		const snakeHeadCell = this.View.getCellByCoords(snakeHeadCoords);
		const snakeHeadCellType = this.View.getCellType(snakeHeadCell);

		if (snakeHeadCellType === CONST.CELL_TYPES.EMPTY) {
			this.View.hideSquare(snakeTailCell);
			this.View.drawSquare(snakeHeadCell, CONST.CELL_TYPES.SNAKE);
		} else if (snakeHeadCellType === CONST.CELL_TYPES.FOOD) {
			this.SNAKE_COORDS.unshift(snakeTailCoords);
			this.View.drawSquare(snakeHeadCell, CONST.CELL_TYPES.SNAKE);
			this.CONTAINS_FOOD = false;
			this.View.setTotalScore(++this.CURRENT_SCORE);
		}

		return new Promise((r) => {
			setTimeout(() => r(), this.MAIN_SPEED);
		});
	}

	/**
	 * Checks if snake kill herself.
	 * In first case returns true, in other false.
	 * @returns {boolean}
	 */
	checkSnakeKillHerself() {
		const snakeCoords = Object.assign([], this.SNAKE_COORDS);
		const snakeHeadCoords = Object.assign({}, this.SNAKE_HEAD_COORDS);

		return snakeCoords.find((snakeCoord, idx) => {
			return snakeCoord.x === snakeHeadCoords.x 
			&& snakeCoord.y === snakeHeadCoords.y
			&& idx !== snakeCoords.length - 1;
		});
	}

	/**
	 * Updates snake coordinates array.
	 * @returns {void}
	 */
	updateSnakeCoords() {
		this.SNAKE_COORDS = Object.assign([], CONST.DEFAULT_SNAKE_COORDS);
		this.SNAKE_HEAD_COORDS = Object.assign({}, CONST.DEFAULT_SNAKE_HEAD_COORDS);
	}
}