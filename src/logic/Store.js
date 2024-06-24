import { renderAndCommit } from "./ReactLike.js";

const targetStore = {};

const handler = {
	get() {
		return Reflect.get(...arguments);
	},
	set(target, prop) {
		if (prop in target) renderAndCommit();
		return Reflect.set(...arguments);
	},
};
const store = new Proxy(targetStore, handler);

export { store };
