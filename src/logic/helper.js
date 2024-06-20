function h(type, props, ...children) {
	if (typeof type === "function") {
		return addComponentKeyAndParent(type(), type.name);
	}
	return { type, props, children: children.flat() };
}

function addComponentKeyAndParent(
	node,
	componentKey,
	parent = null
) {
	if (typeof node === "string") return;

	if (node.props) node.props.componentKey = componentKey;
	else node.props = { componentKey };

	node.parent = parent;

	if (node.children.length > 0)
		for (const child of node.children) {
			addComponentKeyAndParent(child, componentKey, node);
		}
	return node;
}

export { h };
