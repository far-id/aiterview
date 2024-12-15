'use client';
import Recorder from '@/components/my/Recorder';
import { useState } from 'react';

export default function Page() {
	const [answer, setAnswer] = useState<string>('');
	function changeAnswer(newAnswer: string | ((prevAnswer: string) => string)) {
		setAnswer(newAnswer);
	}
	return (
		<div className=''>
			<Recorder {...{ answer, changeAnswer }} />
		</div>
	);
}
