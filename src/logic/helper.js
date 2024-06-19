function h(type, props, ...children) {
	if (typeof type === "function") {
		return type(props);
	}
	return { type, props, children: children.flat() };
}

export { h };
