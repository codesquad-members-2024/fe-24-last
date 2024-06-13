/** @jsx h */

export function h(type, props, ...children) {
	return {
		type,
		props,
		key: Math.floor(Math.random() * 1000),
		children: children.flat(),
	};
}

export const vm = (
	<div id='app'>
		<p>✨콘텐츠 값✨</p>
	</div>
);

export const vm2 = (
	<div id='app'>
		<p>✨업데이트 값✨</p>
	</div>
);
