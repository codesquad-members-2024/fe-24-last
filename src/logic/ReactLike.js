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

function renderAndCommit() {
	const newNode = globalNodes.headComponent();
	updateElement(
		globalNodes.headContainer,
		newNode,
		globalNodes.oldNode
	); //diff(돔 비교) 후 실제돔에 반영
	globalNodes.oldNode = newNode;
}

function createElement(node) {
	// 커밋
	if (typeof node === "string") {
		return document.createTextNode(node); // text node를 만들어서 반환한다.
	}

	// tag에 대한 element를 만든다.
	const $el = document.createElement(node.type);
	// 정의한 속성을 삽입한다.
	Object.entries(node.props || {})
		.filter(([, value]) => value)
		.forEach(([attr, value]) =>
			setEventOrAttribute($el, attr, value)
		);

	// node의 children virtual dom을 dom으로 변환한다.
	// 즉, 모든 VirtualDOM을 순회한다.
	const children = node.children.map(createElement);

	// $el에 변환된 children dom을 추가한다.
	children.forEach((child) => $el.appendChild(child));

	// 변환된 dom을 반환한다.
	return $el;
}

//diff
function updateElement(
	parent,
	newNode,
	oldNode,
	index = 0
) {
	//이거 실제돔이다 일단 이해하고 vdom으로 바꿔야함
	// 1. oldNode만 있는 경우
	if (!newNode && oldNode) {
		return parent.removeChild(parent.childNodes[index]);
	}

	// 2. newNode만 있는 경우
	if (newNode && !oldNode) {
		return parent.appendChild(createElement(newNode));
	}

	// 3. oldNode와 newNode 모두 text 타입일 경우
	if (
		typeof newNode === "string" &&
		typeof oldNode === "string"
	) {
		if (newNode === oldNode) return;
		return parent.replaceChild(
			createElement(newNode),
			parent.childNodes[index]
		);
	}

	// 4. oldNode와 newNode의 태그 이름(type)이 다를 경우
	if (newNode.type !== oldNode.type) {
		return parent.replaceChild(
			createElement(newNode),
			parent.childNodes[index]
		);
	}

	// 5. oldNode와 newNode의 태그 이름(type)이 같을 경우
	updateAttributes(
		parent.childNodes[index],
		newNode.props || {},
		oldNode.props || {}
	);

	// 6. newNode와 oldNode의 모든 자식 태그를 순회하며 1 ~ 5의 내용을 반복한다.
	const maxLength = Math.max(
		newNode.children.length,
		oldNode.children.length
	);
	for (let i = 0; i < maxLength; i++) {
		updateElement(
			parent.childNodes[index],
			newNode.children[i],
			oldNode.children[i],
			i
		);
	}
}

// 5 - newNode와 oldNode의 attribute를 비교하여 변경된 부분만 반영한다.
function updateAttributes(target, newProps, oldProps) {
	// 달라지거나 추가된 Props를 반영
	for (const [attr, value] of Object.entries(newProps)) {
		if (oldProps[attr] === newProps[attr]) continue;
		setEventOrAttribute(target, attr, value);
	}

	// 없어진 props를 attribute에서 제거
	for (const attr of Object.keys(oldProps)) {
		if (newProps[attr] !== undefined) continue;
		target.removeAttribute(attr);
	}
}

function setEventOrAttribute(target, attr, value) {
	if (
		attr.startsWith("on") &&
		typeof value === "function"
	) {
		target[attr.toLowerCase()] = value;
		return;
	}
	target.setAttribute(attr, value);
}

export { init, renderAndCommit };
