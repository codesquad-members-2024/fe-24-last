const $app = document.querySelector('#App');

let state = {
	items: ['item1', 'item2', 'item3'],
};

const render = () => {
	const { items } = state;
	$app.innerHTML = `
    <ul>
      ${items.map(item => `<li>${item}</li>`).join('')}
    </ul>
    <button id="append">추가</button>
  `;

	document.querySelector('#append').addEventListener('click', () => {
		setState({ items: [...items, `${items.length + 1}`] });
	});
};

const setState = newState => {
	state = { ...state, ...newState };
	render();
};

render();
