import Observer from "./Observer.js";

class stateManager extends Observer {
	static state = {};

	static storeState(key, value) {
		// this.state[key] = value;
		this.state = { ...this.state, [key]: value };
	}

	static hasKey(key) {
		return key in this.state;
	}

	static getState(key) {
		return this.state[key];
	}
}

export default stateManager;
