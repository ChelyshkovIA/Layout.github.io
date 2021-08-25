import { View } from "./view.js";
import { Model } from "./model.js";
import { Controller } from "./controller.js";

/**
 * THE MAIN GAME FUNCTION.
 * To start game just call this function and set game container ID as first parameter.
 * @param {string} containerId 
 * @returns {void}
 */

export function importGame(containerId) {
	new Controller(new View(), new Model()).start(containerId);
}