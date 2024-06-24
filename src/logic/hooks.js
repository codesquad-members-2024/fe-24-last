import { store } from "./Store.js";

// let componentIdCounter = 0; // 컴포넌트 ID 생성기
function useState(initialValue) {
	// const componentId = componentIdCounter++;
	// if (!(componentId in globalState)) {
	// globalState[componentId] = initialValue;
	// }
	const key = JSON.stringify(initialValue);
	if (!store[key]) store[key] = initialValue;
	//state가 없는경우 초기 state 등록

	const setState = (value) => {
		if (typeof value === "function")
			store[key] = value(store[key]);
		else store[key] = value;
	};

	return [store[key], setState];
}
export { useState };
