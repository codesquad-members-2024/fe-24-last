/** @jsx h */

export function h(type, props, ...children) {
  return {
    type,
    props,
    key: Math.floor(Math.random() * 1000),
    children: children.flat()
  };
}
export const vm = h("div", {
  id: "app"
}, h("p", null, "\u2728\uCF58\uD150\uCE20 \uAC12\u2728"));
export const vm2 = h("div", {
  id: "app"
}, h("p", null, "\u2728\uC5C5\uB370\uC774\uD2B8 \uAC12\u2728"));
