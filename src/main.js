/** @jsx h */

const key = Math.floor(Math.random());
function h(type, props, ...children) {
  return {
    type,
    props,
    key: key,
    children: children.flat()
  };
}
export const vm = h("div", {
  id: "app"
}, h("ul", null, h("li", null, h("input", {
  type: "checkbox",
  class: "toggle"
}), "todo list item 1", h("button", {
  class: "remove"
}, "\uC0AD\uC81C")), h("li", {
  class: "completed"
}, h("input", {
  type: "checkbox",
  class: "toggle",
  checked: true
}), "todo list item 2", h("button", {
  class: "remove"
}, "\uC0AD\uC81C"))), h("form", null, h("input", {
  type: "text"
}), h("button", {
  type: "submit"
}, "\uCD94\uAC00")));
