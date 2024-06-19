function h(type, props, ...children) {
	if (typeof type === "function") {
		return addComponentKey(type(), type.name);
	}
	return { type, props, children: children.flat() };
}

function addComponentKey(component, componentKey) {
	if (typeof component === "string") return;

	if (component.props)
		component.props.componentKey = componentKey;
	else component.props = { componentKey };

	if (component.children.length > 0)
		for (const child of component.children) {
			addComponentKey(child, componentKey);
		}
	return component;
}

export { h };
