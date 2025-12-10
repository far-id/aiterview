import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { HelpCircle } from 'lucide-react';
import clsx from 'clsx';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Conversation } from '@/interfaces/conversations';

const QuestionCard = (question: Conversation) => {
	return (
		<Card className='mb-6 border-l-4 border-l-blue-500 dark:border-l-blue-400 bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out'>
			<CardHeader className='flex flex-row items-center justify-between py-3'>
				<div className='flex items-center space-x-2'>
					<span
						className={clsx('inline-flex items-center px-2 py-1 rounded-full text-xs font-medium', {
							'bg-blue-100 text-blue-800': question?.category === 'technical',
							'bg-green-100 text-green-800': question?.category === 'behavioral',
							'bg-purple-100 text-purple-800': question?.category === 'situational',
						})}
					>
						{question?.category}
					</span>
				</div>
				{question?.tips && (
					<Popover>
						<PopoverTrigger>
							<HelpCircle className='h-5 w-5 text-gray-400 hover:text-gray-600' />
						</PopoverTrigger>
						<PopoverContent className='min-w-96'>{question.tips}</PopoverContent>
					</Popover>
				)}
			</CardHeader>
			<CardContent className='pt-0'>
				<h2 className='text-xl font-semibold mb-2'>{question?.message}</h2>
			</CardContent>
		</Card>
	);
};
export default QuestionCard;
