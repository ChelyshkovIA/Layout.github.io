export class Model {
	/**
	 * Imports styles to the document.
	 * @param {string} href Value for "href" attribute.
	 * @returns {void}
	 */
	importStyles(href) {
		const link = document.createElement("link");
		link.rel = "stylesheet";
		link.href = href;
		document.head.append(link);
	}
}