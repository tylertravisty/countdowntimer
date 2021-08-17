import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';

import './App.css';
import './bootstrap.min.css';

export default function App() {
	const [seconds, setSeconds] = useState(null);
	const [minutes, setMinutes] = useState(null);
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
		if (seconds === null) {
			setSeconds(0);
		}

		if (minutes === null) {
			setMinutes(0);
		}

		if (!(minutes === 0 && seconds === 0)) {
			setStarted(true);
			setReset(false);
		}
	};

	const resetTimer = () => {
		setReset(true);
		setMinutes(1);
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
			<div className="SetTimer">
				<div className="InputTime">
				<input className="InputMinutes" type="text" name="minutes" placeholder="M" value={minutes} onChange={event => updateMinutes(event.target.value)}/><span className="TimerUnit">m</span> <input className="InputSeconds" type="text" name="seconds" placeholder="S" value={seconds} onChange={event => updateSeconds(event.target.value)}/><span className="TimerUnit">s</span>
				</div>
				<Button variant="primary" onClick={() => startTimer()}>Start</Button>
			</div>
		);
	}

	return (
		<div className="Timer">
			<span className="TimerText">Stream starting in...</span>
			<div className="Countdown">{minutes < 10 ? "0" : ""}{minutes}<span className="TimerUnit">m</span> {seconds < 10 ? "0" : ""}{seconds}<span className="TimerUnit">s</span></div>
			<Button variant="primary" onClick={() => startStop()}>{!started ? "Start" : "Stop"}</Button>{' '}
			{!started ? <Button variant="outline-primary" onClick={() => resetTimer()}>Reset</Button> : ""}
		</div>
	);
}
