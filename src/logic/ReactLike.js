import { updateElement } from "./helper.js";
import stateManager from "./stateManager.js";

const globalNodes = {
	// 전역 노드정보 저장
	oldNode: null,
	headComponent: null,
	headContainer: null,
};

function init(app, $root) {
	globalNodes.oldNode = app();
	globalNodes.headComponent = app;
	globalNodes.headContainer = $root;
	updateElement($root, globalNodes.oldNode);
}

function render() {
	const newNode = globalNodes.headComponent();
	updateElement(
		globalNodes.headContainer,
		newNode,
		globalNodes.oldNode
	); //diff(돔 비교) 후 실제돔에 반영
	globalNodes.oldNode = newNode;
}

// let componentIdCounter = 0; // 컴포넌트 ID 생성기
function useState(initialValue) {
	// const componentId = componentIdCounter++;
	// if (!(componentId in globalState)) {
	// globalState[componentId] = initialValue;
	// }
	const key = JSON.stringify(initialValue);
	if (!stateManager.hasKey(key))
		stateManager.storeState(key, initialValue); //state가 없는경우 초기 state 등록

	const setState = (value) => {
		if (typeof value === "function")
			stateManager.storeState(
				key,
				value(stateManager.getState(key))
			);
		else stateManager.storeState(key, value);

		console.log("render : ", stateManager.state);

		render(); //옵저버패턴으로 변경
	};

	return [stateManager.getState(key), setState];
}

export { init, render, useState };
