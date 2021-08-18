import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';

import './App.css';
import './bootstrap.min.css';

export default function App() {
	const [alarm, setAlarm] = useState(false);
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [seconds, setSeconds] = useState(null);
	const [startSeconds, setStartSeconds] = useState(null);
	const [minutes, setMinutes] = useState(null);
	const [startMinutes, setStartMinutes] = useState(null);
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
						setAlarm(true);
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
			setStartSeconds(seconds);
			setStartMinutes(minutes);
			setStarted(true);
			setReset(false);
		}
	};

	const resetTimer = () => {
		setAlarm(false);
		setReset(true);
		setSeconds(startSeconds);
		setMinutes(startMinutes);
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
			<div>
				<input className="SetTitle" type="text" name="title" placeholder="Add Title" value={title} onChange={event => setTitle(event.target.value)}/>
				<div className="SetTimer">
					<input className="SetTimerDescription" type="text" name="description" placeholder="Add Description" value={description} onChange={event => setDescription(event.target.value)}/>
					<div className="InputTime">
					<input className="InputMinutes" type="text" name="minutes" placeholder="00" value={minutes} onChange={event => updateMinutes(event.target.value)}/><span className="TimerUnit">m</span> <input className="InputSeconds" type="text" name="seconds" placeholder="00" value={seconds} onChange={event => updateSeconds(event.target.value)}/><span className="TimerUnit">s</span>
					</div>
					<Button className="Start" variant="primary" onClick={() => startTimer()}>Start</Button>
				</div>
			</div>
		);
	}

	return (
		<div>
			<span className="Title bg-primary text-white">{title}</span>
			<div className="Timer">
				<span className="TimerDescription">{description}</span>
				<div className="Countdown">{minutes < 10 ? "0" : ""}{minutes}<span className="TimerUnit">m</span> {seconds < 10 ? "0" : ""}{seconds}<span className="TimerUnit">s</span></div>
				<Button className="StartStop" variant="primary" onClick={() => startStop()}>{!started ? "Start" : "Stop"}</Button>{' '}
				{!started ? <Button variant="outline-primary" onClick={() => resetTimer()}>Reset</Button> : ""}
			</div>
		</div>
	);
}
