/** @jsx h */

export function h(type, props, ...children) {
	return {
		type,
		props,
		key: Math.floor(Math.random() * 1000),
		children: children.flat(),
	};
}

function diffByBfs(current, next) {
	const queue = [{ current, next }];
	const change = [];
	while (queue.length > 0) {
		const { current, next } = queue.shift();

		if (current.children) {
			for (let i = 0; i < current.children.length; i++) {
				queue.push({
					current: current.children[i],
					next: next.children[i],
				});
			}
			if (current.length !== next.length) {
				console.log(current, next);
			}
			if (current.type !== next.type) {
				change.push({
					target: 'type',
					key: current.key,
					type: next.type,
				});
			}
			if (current.props.id !== 'app' && current.props !== next.props) {
				change.push({
					target: 'props',
					key: current.key,
					props: next.props,
				});
			}
			if (current.children !== next.children) {
				change.push({
					target: 'children',
					key: current.key,
					children: next.children,
				});
			}
		}
	}
	return change;
}

function trackByKey(node, changes) {
	const queue = [{ node, parent: null, index: null }];
	while (queue.length > 0) {
		const { node: current, parent, index } = queue.shift();
		const apply = changes.find(item => item.key === current.key);

		if (apply) {
			switch (apply.target) {
				case 'type':
					current.type = apply.type;
					break;
				case 'props':
					current.props = apply.props;
					break;
				case 'children':
					current.children = apply.children;
					break;
			}
			// 부모 노드의 children을 갱신
			if (parent && index !== null) {
				parent.children[index] = current;
			}
		}

		if (current.children) {
			for (let i = 0; i < current.children.length; i++) {
				queue.push({ node: current.children[i], parent: current, index: i });
			}
		}
	}
	return node;
}

function updateElement($parent, newNode, oldNode, index = 0) {
	if (!oldNode) {
		$parent.appendChild(createElement(newNode));
	} else if (!newNode) {
		$parent.removeChild($parent.childNodes[index]);
	} else if (isNodeChanged(newNode, oldNode)) {
		$parent.replaceChild(createElement(newNode), $parent.childNodes[index]);
	} else if (newNode.type) {
		const newLength = newNode.children.length;
		const oldLength = oldNode.children.length;
		for (let i = 0; i < newLength || i < oldLength; i++) {
			updateElement(
				$parent.childNodes[index],
				newNode.children[i],
				oldNode.children[i],
				i
			);
		}
	}
}

function isNodeChanged(node1, node2) {
	return (
		typeof node1 !== typeof node2 ||
		(typeof node1 === 'string' && node1 !== node2) ||
		node1.type !== node2.type
	);
}

function createElement(node) {
	if (typeof node === 'string') {
		return document.createTextNode(node);
	}
	const $el = document.createElement(node.type);
	if (node.props) {
		Object.keys(node.props).forEach(key => {
			$el.setAttribute(key, node.props[key]);
		});
	}
	if (node.children) {
		node.children.forEach(child => {
			const $child = createElement(child);
			$el.appendChild($child);
		});
	}
	return $el;
}

const view = () => (
	<div id='app'>
		<ul>
			<li>item</li>
			<li>item</li>
		</ul>
		<button>추가</button>
	</div>
);
