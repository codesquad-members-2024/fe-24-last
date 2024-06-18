import Observer from "./Observer.js";

class stateManager {
	static state = {};
	static observer = new Observer();

	static storeState(key, value, renderAndCommit) {
		this.state = { ...this.state, [key]: value };
		if (renderAndCommit)
			this.observer.subscribe(renderAndCommit);
	}

	static hasKey(key) {
		return key in this.state;
	}

	static getState(key) {
		return this.state[key];
	}

	static render() {
		this.observer.notify();
	}
}

export default stateManager;
