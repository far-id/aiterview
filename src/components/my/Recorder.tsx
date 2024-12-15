'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useEffect, useRef, useState } from 'react';

const Recorder = ({
	answer,
	changeAnswer,
}: {
	answer: string;
	changeAnswer: (newAnswer: string | ((prevAnswer: string) => string)) => void;
}) => {
	const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);
	const [timeLeft, setTimeLeft] = useState<number>(120);
	const timerRef = useRef<NodeJS.Timeout | null>(null);

	function handleOnRecord() {
		if (timerRef.current) {
			clearInterval(timerRef.current);
		}
		if (recognition) {
			recognition.stop();
			setRecognition(null);
			return;
		}
		startRecording();
	}

	function startRecording() {
		const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
		const newRecognition = new SpeechRecognition();
		newRecognition.continuous = true;
		newRecognition.lang = 'id-ID';

		newRecognition.onresult = (e: SpeechRecognitionEvent) => {
			const current = e.resultIndex;
			const transcript = e.results[current][0].transcript;
			changeAnswer((prevAnswer: string) => prevAnswer + '. ' + transcript);
		};

		newRecognition.start();
		setRecognition(newRecognition);

		setTimeout(() => stopRecording(newRecognition), timeLeft * 1000); // in milliseconds
	}

	function stopRecording(newRecognition: SpeechRecognition) {
		if (newRecognition) {
			newRecognition.stop();
			setRecognition(null);
		}
	}

	function formatTime(time: number): string {
		const minutes = Math.floor(time / 60); // Calculate minutes
		const seconds = time % 60; // Calculate seconds
		// Return the formatted string
		return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
	}

	function handleOnReset() {
		changeAnswer('');
		setTimeLeft(120);
	}

	useEffect(() => {
		if (recognition) {
			timerRef.current = setInterval(() => {
				setTimeLeft((prevTime) => {
					if (prevTime <= 1) {
						clearInterval(timerRef.current!);
						return 0;
					}
					return prevTime - 1;
				});
			}, 1000); // Interval of 1 second
		}
		return () => {
			if (timerRef.current) {
				clearInterval(timerRef.current);
			}
		};
	}, [recognition]);
	return (
		<div className='container flex items-center justify-center min-h-screen w-full'>
			<Card className='p-3'>
				<CardHeader>
					<CardTitle>Voice Recorder</CardTitle>
					id-ID
					<div className='text-6xl font-bold text-gray-800 dark:text-gray-200 mb-8 text-center'>
						{formatTime(timeLeft)}
					</div>
				</CardHeader>
				<div className='flex justify-center gap-x-4'>
					<Button onClick={handleOnRecord}>{recognition ? 'Stop' : 'Record'}</Button>
					<Button onClick={handleOnReset} disabled={!!recognition}>
						Reset
					</Button>
				</div>
				<CardContent>{answer.slice(2)}</CardContent>
			</Card>
		</div>
	);
};

export default Recorder;
