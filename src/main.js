import { Div, Todo } from "./buildComponents.js";
import { init } from "./logic/ReactLike.js";
import { h } from "./logic/helper.js";
/** @jsx h */

const $root = document.querySelector("#root");
init(App, $root);

function App() {
	return (
		<div id="app">
			<Todo />
			<Div />
		</div>
	);
}
