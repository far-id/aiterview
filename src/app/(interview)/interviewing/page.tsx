'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useEffect, useRef, useState } from 'react';

export default function Page() {
	const [text, setText] = useState<string>('');
	const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);
	const [language, setLanguage] = useState<string>('id-ID');
	const [duration, setDuration] = useState<number>(120);
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
		setDuration(120);
		setText('');

		const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
		const newRecognition = new SpeechRecognition();
		newRecognition.continuous = true;
		newRecognition.lang = language;

		newRecognition.onresult = (e) => {
			const current = e.resultIndex;
			const transcript = e.results[current][0].transcript;
			setText((prevText) => prevText + '. ' + transcript);
		};

		newRecognition.start();
		setRecognition(newRecognition);

		setTimeout(() => stopRecording(newRecognition), duration * 1000); // in milliseconds
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

	function toggleLanguage() {
		setLanguage((prevLanguage) => (prevLanguage === 'id-ID' ? 'en-US' : 'id-ID'));
	}

	useEffect(() => {
		if (recognition) {
			timerRef.current = setInterval(() => {
				setDuration((prevTime) => {
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
		<div className='container flex items-center justify-center min-h-screen'>
			<Card className='p-3'>
				<CardHeader>
					<CardTitle>Voice Recorder</CardTitle>
					<Toggle onClick={toggleLanguage} disabled={recognition != null}>
						{language}
					</Toggle>
					<div className='text-6xl font-bold text-gray-800 dark:text-gray-200 mb-8 text-center'>
						{formatTime(duration)}
					</div>
				</CardHeader>
				<Button onClick={handleOnRecord}>{recognition ? 'Stop' : 'Record'}</Button>
				<CardContent>{text.slice(2)}</CardContent>
			</Card>
		</div>
	);
}
