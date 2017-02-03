'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Clock = function (_React$Component) {
	_inherits(Clock, _React$Component);

	function Clock() {
		_classCallCheck(this, Clock);

		var _this = _possibleConstructorReturn(this, _React$Component.call(this));

		_this.state = {
			session: 40,
			break: 20,
			time: null,
			timeF: 'Start',
			started: false,
			issession: 'Session'
		};
		return _this;
	}

	Clock.prototype.renderButton = function renderButton(i, which) {
		var _this2 = this;

		return React.createElement(Button, { value: i, onClick: function onClick() {
				return _this2.handleClick(i, which);
			} });
	};

	Clock.prototype.renderSession = function renderSession() {
		return React.createElement(Session, { value: this.state.session });
	};

	Clock.prototype.renderBreak = function renderBreak() {
		return React.createElement(Break, { value: this.state.break });
	};

	Clock.prototype.renderTimer = function renderTimer() {
		var _this3 = this;

		return React.createElement(Timer, { value: this.state.timeF, onClick: function onClick() {
				return _this3.handleStart();
			} });
	};

	Clock.prototype.handleClick = function handleClick(i, which) {
		if (i == '-') {
			if (which == 'session') {
				if (this.state.session > 1) {
					this.setState({ session: this.state.session - 1 });
				}
			} else {
				if (this.state.break > 1) {
					this.setState({ break: this.state.break - 1 });
				}
			}
		} else if (i == '+') {
			if (which == 'session') {
				this.setState({ session: this.state.session + 1 });
			} else {
				this.setState({ break: this.state.break + 1 });
			}
		}
	};

	Clock.prototype.handleStart = function handleStart() {
		var _this4 = this;

		if (this.state.started == false) {
			this.setState({
				time: this.state.session * 60,
				started: true,
				timeF: this.formatTime(this.state.session * 60),
				issession: 'Session'
			});
			this.timerID = setInterval(function () {
				return _this4.tick();
			}, 1000);
		}
	};

	Clock.prototype.tick = function tick() {
		var _this5 = this;

		if (this.state.time == 0) {
			this.setState(function (prevState) {
				return {
					time: prevState.break * 60,
					timeF: _this5.formatTime(prevState.break * 60),
					issession: 'Break'
				};
			});
		} else {
			this.setState(function (prevState) {
				return {
					time: prevState.time - 1,
					timeF: _this5.formatTime(prevState.time - 1)
				};
			});
		}
	};

	Clock.prototype.formatTime = function formatTime(time) {
		var hours = parseInt(time / (60 * 60) % 24);
		var minutes = parseInt(time / 60 % 60);
		var seconds = parseInt(time % 60);
		hours = hours < 10 ? "0" + hours : hours;
		hours = hours < 1 ? '' : hours;
		minutes = minutes < 10 ? "0" + minutes : minutes;
		seconds = seconds < 10 ? "0" + seconds : seconds;
		return this.state.issession + "\n" + hours + minutes + ":" + seconds;
	};

	Clock.prototype.render = function render() {
		return React.createElement(
			'div',
			null,
			React.createElement(
				'div',
				null,
				this.renderButton('-', 'session'),
				this.renderSession(),
				this.renderButton('+', 'session')
			),
			React.createElement(
				'div',
				null,
				this.renderButton('-', 'break'),
				this.renderBreak(),
				this.renderButton('+', 'break')
			),
			this.renderTimer()
		);
	};

	return Clock;
}(React.Component);

function Session(props) {
	return React.createElement(
		'div',
		{ className: 'session' },
		'Session: ',
		props.value
	);
}

function Break(props) {
	return React.createElement(
		'div',
		{ className: 'break' },
		'Break: ',
		props.value
	);
}

function Button(props) {
	return React.createElement(
		'button',
		{ className: 'btn btn-secondary', onClick: function onClick() {
				return props.onClick();
			} },
		props.value
	);
}

function Timer(props) {
	return React.createElement(
		'div',
		{ className: 'timer', onClick: function onClick() {
				return props.onClick();
			} },
		React.createElement(
			'div',
			{ className: 'timerText' },
			props.value
		)
	);
}

function tick(init) {}

ReactDOM.render(React.createElement(Clock, null), document.getElementById('clock-container'));
