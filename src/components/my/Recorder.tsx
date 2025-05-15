'use client';

import { Button } from '@/components/ui/button';
import { Mic, MicOff, StopCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import clsx from 'clsx';

const OffMicButton: React.FC<{ isHovering: boolean }> = ({ isHovering }) => {
	if (isHovering) {
		return <StopCircle className='h-6 w-6' />;
	}
	return <MicOff className='h-6 w-6' />;
};

const Recorder: React.FC<{
	changeAnswer: (newAnswer: string | ((prevAnswer: string) => string)) => void;
	timeLeft: number;
	setOnRecording: (onRecording: boolean) => void;
}> = ({ changeAnswer, timeLeft, setOnRecording }) => {
	const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);
	const [isHovering, setIsHovering] = useState<boolean>(false);

	function handleOnRecord() {
		if (recognition) {
			stopRecording(recognition);
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
			changeAnswer((prevAnswer: string) => {
				if (!prevAnswer.includes(transcript)) {
					return prevAnswer + ' ' + transcript;
				}
				return prevAnswer;
			});
		};

		newRecognition.start();
		setRecognition(newRecognition);
		setOnRecording(true);
	}

	function stopRecording(newRecognition: SpeechRecognition) {
		if (newRecognition) {
			newRecognition.stop();
			setRecognition(null);
			setOnRecording(false);
		}
	}

	useEffect(() => {
		if (timeLeft <= 0 && recognition) {
			stopRecording(recognition as SpeechRecognition);
		}
	}, [timeLeft]);

	return (
		<div className='flex flex-col items-center justify-center'>
			<Button
				variant={recognition ? 'destructive' : 'default'}
				size='lg'
				disabled={timeLeft <= 0}
				className={clsx(
					'rounded-full disabled:pointer-events-auto w-16 h-16 flex items-center justify-center transition-all',
					{
						'animate-pulse': recognition,
						'cursor-not-allowed': timeLeft <= 0,
					}
				)}
				onClick={handleOnRecord}
				onMouseEnter={() => setIsHovering(true)}
				onMouseLeave={() => setIsHovering(false)}
			>
				{recognition ? <OffMicButton isHovering={isHovering} /> : <Mic className='h-6 w-6' />}
			</Button>
			<span className='mt-2 text-sm text-gray-600'>
				{recognition ? 'Merekam... Klik untuk menghentikan' : 'Klik untuk merekam'}
			</span>
		</div>
	);
};

export default Recorder;
