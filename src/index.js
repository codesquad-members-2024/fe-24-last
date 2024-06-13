/** @jsx h */

export function h(type, props, ...children) {
	return {
		type,
		props,
		key: Math.floor(Math.random() * 1000),
		children: children.flat(),
	};
}

const createNode = node => {
	if (typeof node === 'string') {
		return document.createTextNode(node);
	}
	const $obj = document.createElement(node.type);
	$obj.id = node.key;

	const children = node.children.map(createNode);
	children.forEach(child => $obj.appendChild(child));

	return $obj;
};

//newNode가 기준이기 때문에, oldNode와 비교해서 newNode내용으로 업데이트
const updateNode = (parent, newNode, oldNode, index = 0) => {
	// oldNode 있고 newNode 없는 경우 -> 즉 새로운 가상 DOM에서는 해당 노드가 삭제된 경우, parent의 index 위치에 있는 자식 노드를 실제 DOM에서 제거
	if (oldNode && !newNode) {
		return parent.removeChild(parent.childNodes[index]);
	}
	// oldNode 없고 newNode 있는 경우
	if (!oldNode && newNode) {
		return parent.appendChild(createNode(newNode));
	}
	// oldNode, newNode 모두 텍스트인 경우
	if (typeof oldNode === 'string' && typeof newNode === 'string') {
		if (oldNode === newNode) return;

		return parent.replaceChild(createNode(newNode), parent.childNodes[index]);
	}
	// oldNode, newNode type이 다른 경우
	if (oldNode.type !== newNode.type) {
		return parent.replaceChild(createNode(newNode), parent.childNodes[index]);
	}
	// 이후에는 children을 순회하면서 다시 위에 과정을 반복
	const maxLength = Math.max(oldNode.children.length, newNode.children.length);
	for (let i = 0; i < maxLength; i++) {
		updateNode(
			parent.childNodes[index],
			newNode.children[i],
			oldNode.children[i],
			i
		);
	}
};

const oldList = ['🐬', '🐑🐑', '🦥'];
const newList = ['🐬🐬🐬🐬🐬', '🐑🐑', '🦥'];
const state = [{}];
const render = array => (
	<div id='App'>
		<ul>
			{array.map((item, idx) => (
				<li key={idx}>{item}</li>
			))}
		</ul>
		<input type='text' />
	</div>
);

const oldNode = render(oldList);
const newNode = render(newList);

const $App = document.createElement('div');
document.body.appendChild($App);
//초기 렌더링
updateNode($App, oldNode, null);

const view = document.querySelector('#view');

view.textContent = $App.innerHTML;

const observer = new MutationObserver(() => {
	view.textContent = $App.innerHTML;
});

observer.observe($App, {
	attributes: true,
	childList: true,
	subtree: true,
});

setTimeout(() => {
	updateNode($App, newNode, oldNode);
}, 2000);
