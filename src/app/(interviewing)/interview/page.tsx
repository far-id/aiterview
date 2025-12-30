'use client';
import QuestionCard from '@/components/app/question-card';
import Recorder from '@/components/app/Recorder';
import ThemeToggle from '@/components/app/theme-toggle';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useConversationContext } from '@/context/conversationContext';
import { Conversation } from '@/interfaces/conversations';
import { cn, formatSecondsToMMSS } from '@/lib/utils';
import { aswerSchema } from '@/validator/questionsShcema';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronRight, Home, Hourglass, TimerReset } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

export default function Page() {
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(1);
	const [onRecording, setOnRecording] = useState<boolean>(false);
	const [timeLeft, setTimeLeft] = useState<number>(120); // in seconds
	const [progressPercentage, setprogressPercentage] = useState<number>(100);
	const { conversations, addConversation, lastConversation, removeLastConversation } =
		useConversationContext();
	const [interviewQuestion, setInterviewQuestion] = useState<Conversation>();
	const [submitting, setSubmitting] = useState<boolean>(false);
	const router = useRouter();

	const form = useForm<z.infer<typeof aswerSchema>>({
		resolver: zodResolver(aswerSchema),
		defaultValues: {
			answer: '',
		},
	});

	function changeAnswer(newAnswer: string | ((prevAnswer: string) => string)) {
		const resolvedAnswer =
			typeof newAnswer === 'function' ? newAnswer(form.getValues('answer')) : newAnswer;
		form.setValue('answer', resolvedAnswer);
	}

	function resetHandler() {
		setOnRecording(false);
		setTimeLeft(120);
		setprogressPercentage(100);
		form.reset();
	}

	async function nextQuestionHandler() {
		setSubmitting(true);
		setOnRecording(false);
		if (form.getValues('answer').length < 2) {
			toast.error('We need your answer', {
				duration: 10000,
			});
			return;
		}
		if (currentQuestionIndex < 8) {
			// go to next question
			try {
				const response = await fetch('/api/questions', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						conversations: conversations.map((message: Conversation) => ({
							role: message.role,
							text: message.text,
							category: message.category,
						})),
						answer: form.getValues('answer'),
					}),
				});

				const result = await response.json();

				if (!response.ok) {
					throw new Error(result.error ?? 'Failed to fetch next question');
				}

				const { message } = result;

				addConversation({
					role: 'user',
					text: form.getValues('answer'),
				});

				addConversation({
					role: 'model',
					text: message.question,
					category: message.category,
					tips: message.tips,
				});

				setInterviewQuestion({
					role: 'model',
					text: message.question,
					category: message.category,
					tips: message.tips,
				});

				setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
				setTimeLeft(120);
				setprogressPercentage(100);
				form.reset();
			} catch (error: any) {
				removeLastConversation();
				const errorMessage = error?.message ?? 'An unexpected error occurred. Please try again.';
				console.error('Error:', errorMessage);
				toast.error(errorMessage, {
					duration: 10000,
				});
			}
		} else {
			// go to summary page
			addConversation({
				role: 'user',
				text: form.getValues('answer'),
			});

			router.push('/summary');
		}
		setSubmitting(false);
	}

	// Timer logic
	useEffect(() => {
		if (timeLeft <= 0) {
			setOnRecording(false);
			toast.error('Time is up', {
				duration: 10000,
			});
			return;
		}

		if (timeLeft == 30) {
			toast.info('Your time is running out', {
				duration: 10000,
			});
		}

		const interval = setInterval(() => {
			setTimeLeft((prev) => prev - 1);
			setprogressPercentage((prev) => {
				if (prev <= 0) return 0;
				return prev - 100 / 120; // Assuming the total time is 120 seconds
			});
		}, 1000);

		return () => clearInterval(interval);
	}, [timeLeft]);

	useEffect(() => {
		setInterviewQuestion(lastConversation);
		setCurrentQuestionIndex(Math.ceil(conversations.length / 2));
	}, [conversations, lastConversation]);

	return (
		<div className='min-h-screen bg-background flex flex-col'>
			<div className='flex items-center justify-between px-4 py-3 border-b'>
				<Link href='/'>
					<Button variant='ghost' size='icon'>
						<Home className='h-5 w-5' />
					</Button>
				</Link>
				<div className='text-sm font-medium'>Question {currentQuestionIndex} of 8</div>
				<ThemeToggle />
			</div>

			<div className='container max-w-4xl mx-auto px-4 py-6 flex-grow'>
				<div className='mb-6'>
					<h1 className='text-2xl mb-4 font-bold'>Interview Simulation</h1>
					<div className=''>
						<div className='flex items-center justify-start mb-2'>
							<Hourglass className='w-4 h-4' />
							{formatSecondsToMMSS(timeLeft)}
						</div>
						<Progress value={progressPercentage} className='h-2 bg-gray-900' />
					</div>
				</div>
				{interviewQuestion && <QuestionCard {...interviewQuestion} />}
				<Card className='mb-6 border-l-4 border-l-blue-500 dark:border-l-blue-400 bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out'>
					<CardHeader>
						<CardTitle className='flex items-center justify-between'>
							<span className='font-normal'>Your Answer</span>

							<TooltipProvider>
								<Tooltip>
									<TooltipTrigger onClick={resetHandler}>
										<TimerReset
											className={cn(
												'h-5 w-5 text-gray-400 hover:text-gray-600',
												timeLeft === 0 && 'text-foreground animate-pulse'
											)}
										/>
									</TooltipTrigger>
									<TooltipContent>
										<p className='max-w-xs text-sm'>Reset</p>
									</TooltipContent>
								</Tooltip>
							</TooltipProvider>
						</CardTitle>
					</CardHeader>
					<CardContent>
						<Form {...form}>
							<form className='flex flex-col gap-4'>
								<FormField
									control={form.control}
									name='answer'
									render={({ field }) => (
										<FormItem className='flex flex-col'>
											<FormControl>
												<Textarea
													rows={4}
													disabled={onRecording || timeLeft <= 0}
													placeholder='...'
													{...field}
												/>
											</FormControl>
										</FormItem>
									)}
								/>
							</form>
						</Form>
					</CardContent>
					<CardFooter className='flex justify-center items-center'>
						<Recorder {...{ changeAnswer, timeLeft, setOnRecording }} />
					</CardFooter>
				</Card>

				<div className='flex justify-end'>
					<Button
						onClick={nextQuestionHandler}
						className='cursor-pointer'
						disabled={onRecording || form.getValues('answer').length < 2 || submitting}
					>
						{currentQuestionIndex < 8 ? (
							<>
								Next
								<ChevronRight className='h-4 w-4 ml-1' />
							</>
						) : (
							'Finish Interview'
						)}
					</Button>
				</div>
			</div>
		</div>
	);
}
