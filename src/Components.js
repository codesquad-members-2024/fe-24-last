import { useState } from "./logic/ReactLike.js";
import { h } from "./logic/helper.js";
/** @jsx h */

function Todo() {
	const [todos, setTodos] = useState([
		{
			id: 1,
			completed: false,
			content: "todo list item 1",
		},
		{ id: 2, completed: true, content: "todo list item 2" },
		{ id: 3, completed: true, content: "todo list item 3" },
		{ id: 4, completed: true, content: "todo list item 4" },
		{ id: 5, completed: true, content: "todo list item 5" },
	]);

	const handleDelete = (id) =>
		setTodos((prev) =>
			prev.filter((todo) => todo.id !== id)
		);

	// const handleCreateTodo =()=>setTodos

	console.log("투두스", todos);

	return (
		<div id="app">
			<ul>
				{todos.map(({ id, completed, content }) => (
					<li
						key={id}
						className={completed ? "completed" : null}
					>
						<input
							type="checkbox"
							className="toggle"
							checked={completed}
						/>
						{content}
						<button
							className="remove"
							onClick={() => handleDelete(id)}
						>
							삭제
						</button>
					</li>
				))}
			</ul>
			<form>
				<input type="text" />
				<button type="submit">추가</button>
			</form>
		</div>
	);
}

function Div() {
	return <div>아무것도 안하는 디브</div>;
}

export { Div, Todo };
