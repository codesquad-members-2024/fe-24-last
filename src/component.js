class StateComponent {
	$target; // 외부로부터 받아올 타겟 (App)
	state;
	constructor($target) {
		this.$target = $target;
		this.setInitialState();
		this.render(); // 초기 렌더링
	}
	setInitialState() {} // 초기 상태값 정의하는 함수
	template() {
		// 상태값을 토대로 UI를 템플릿 리터럴로 반환하는 함수
		return '';
	}
	render() {
		// 템플릿을 렌더링하는 함수
		this.$target.innerHTML = this.template();
		this.setEvent(); // 이벤트를 등록하는 함수 호출
	}
	setEvent() {} // 이벤트를 등록하는 함수 (addEventListener)
	setState(newState) {
		// 상태값을 변경하고 render 함수를 호출하는 함수
		this.state = { ...this.state, ...newState };
		this.render(); // 상태값이 변경되면 리렌더링 하니까 render 함수 호출
	}
}

// 여기서 Components를 상속받아서 정의되지 않은 함수를 구체적으로 구현
export class App extends StateComponent {
	setInitialState() {
		this.state = { items: ['item1', 'item2'] };
	}
	template() {
		const { items } = this.state;
		return `
			<ul>
				${items.map(item => `<li>${item}</li>`).join('')}
			</ul>
			<button>추가</button>
		`;
	}
	setEvent() {
		this.$target.querySelector('button').addEventListener('click', () => {
			const { items } = this.state;
			this.setState({ items: [...items, `item${items.length + 1}`] });
		});
	}
}

export class Component {
	$target;
	constructor($target) {
		this.$target = $target;
		this.render();
	}
	template() {
		return `
			<ul>
				<li>아이템 1</li>
				<li>아이템 2</li>
			</ul>
			<button>추가</button>
		`;
	}

	render() {
		this.$target.innerHTML = this.template();
	}
}

export class Virtual extends Component {
	setEvent() {
		this.$target.querySelector('button').addEventListener('click', () => {
			const $ul = this.$target.querySelector('ul');
			const $li = document.createElement('li');
			$li.textContent = `아이템이다`;
			$ul.appendChild($li);
		});
	}
	render() {
		this.setEvent();
	}
}
