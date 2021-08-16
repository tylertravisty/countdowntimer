import React, { useEffect, useState } from "react";

export default function App() {
	const [seconds, setSeconds] = useState(10);
	const [minutes, setMinutes] = useState(10);
	const [count, setCount] = useState(0);
	const [started, setStarted] = useState(false);
	const [reset, setReset] = useState(true);

	useEffect(() => {
		if (started) {
			const timer = setInterval(() => {
				if (seconds === 0) {
					if (minutes > 0) {
						setMinutes(minutes - 1);
						setSeconds(59);
					} else {
						setStarted(false);
					}
				} else {
					setSeconds(seconds - 1);
				}
			}, 1000);
			// clearing interval
			return () => clearInterval(timer);
		}
	});

	const startStop = () => {
		setStarted(!started);
	};

	const startTimer = () => {
		if (!(minutes === 0 && seconds === 0)) {
			setStarted(true);
			setReset(false);
		}
	};

	const resetTimer = () => {
		setReset(true);
		setMinutes(10);
		setSeconds(10);
	};

	const verifyNumber = (number) => {
		if (isNaN(+number)) {
			return false;
		}

		return true;
	};

	const updateSeconds = (value) => {
		if (!verifyNumber(value)) {
			setSeconds(0);
			return;
		}

		if (+value > 59) {
			setSeconds(59);
			return;
		}

		if (+value < 0) {
			setSeconds(0);
			return;
		}

		setSeconds(+value);
	};

	const updateMinutes = (value) => {
		if (!verifyNumber(value)) {
			setMinutes(0);
			return;
		}

		if (+value > 59) {
			setMinutes(59);
			return;
		}

		if (+value < 0) {
			setMinutes(0);
			return;
		}

		setMinutes(+value);
	};

	if (reset) {
		return (
			<div className="App">
				Set Timer: <input type="text" name="minutes" value={minutes} onChange={event => updateMinutes(event.target.value)}/> <input type="text" name="seconds" value={seconds} onChange={event => updateSeconds(event.target.value)}/>

				<button onClick={() => startTimer()} type="button">Start</button>
			</div>
		);
	}

	return (
		<div className="App">
			<h1>Timer: {minutes}:{seconds}</h1>
			<button onClick={() => startStop()} type="button">{!started ? "Start" : "Stop"}</button>
			{!started ? <button onClick={() => resetTimer()} type="button">Reset</button> : ""}
		</div>
	);
}
