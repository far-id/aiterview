'use client';
import QuestionCard from '@/components/my/question-card';
import Recorder from '@/components/my/Recorder';
import ThemeToggle from '@/components/my/theme-toggle';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import useConversation from '@/hooks/useConversation';
import useSummary from '@/hooks/useSummary';
import { Conversation } from '@/interfaces/conversations';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronRight, Home, Hourglass, TimerReset } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const aswerSchema = z.object({
	answer: z.string().min(2, { message: 'Answer is required' }),
});

export default function Page() {
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(1);
	const [onRecording, setOnRecording] = useState(false);
	const [timeLeft, setTimeLeft] = useState(120); // in seconds
	const [progressPercentage, setprogressPercentage] = useState(100);
	const { conversation, addMessage, lastConversation } = useConversation();
	const { storeSummary } = useSummary();

	const [interviewQuestion, setInterviewQuestion] = useState<Conversation>();

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

	function handleSubmitAnswer(data: z.infer<typeof aswerSchema>) {
		console.log(data.answer);
	}

	async function nextQuestionHandler() {
		if (form.getValues('answer').length < 2) {
			toast.error('Jawaban tidak boleh kosong', {
				position: 'top-right',
				duration: 10000,
			});
			return;
		}
		if (currentQuestionIndex < 8) {
			// go to next question
			addMessage({
				role: 'user',
				message: form.getValues('answer'),
				timeLeft: timeLeft,
			});

			try {
				const response = await fetch('/api/questions', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						conversations: [
							...conversation.map((message) => ({
								role: message.role,
								text: message.message,
								category: message.category,
							})),
						],
						answer: form.getValues('answer'),
					}),
				});
				if (!response.ok) {
					throw new Error('Something went wrong!');
				} else {
					response.json().then((data) => {
						if (data.error) {
							alert(data.error);
						} else {
							const { message } = data;

							addMessage({
								role: 'model',
								message: message.pertanyaan,
								category: message.kategori,
								tips: message.tips,
							});
							setInterviewQuestion({
								role: 'model',
								message: message.pertanyaan,
								category: message.kategori,
								tips: message.tips,
							});
						}
					});
				}
			} catch (error) {
				console.error('Error:', error);
			}

			setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
			setTimeLeft(120);
			setprogressPercentage(100);
			form.reset();
		} else {
			// go to summary page
			try {
				addMessage({
					role: 'user',
					message: form.getValues('answer'),
					timeLeft: timeLeft,
				});
				const response = await fetch('/api/summary', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						conversations: [
							...conversation.map((message) => ({
								role: message.role,
								text: message.message,
								category: message.category,
							})),
						],
						answer: form.getValues('answer'),
					}),
				});
				if (!response.ok) {
					throw new Error('Something went wrong!');
				} else {
					response.json().then((data) => {
						if (data.error) {
							alert(data.error);
						} else {
							const { message } = data;
							console.log('Summary data:', message);
							storeSummary({
								technical: message.technical,
								behavioral: message.behavioral,
								situational: message.situational,
							});
							redirect('/summary');
						}
					});
				}
			} catch (error) {
				console.error('Error:', error);
			}
		}
	}

	function formatSecondsToMMSS(seconds: number): string {
		const mins = Math.floor(seconds / 60);
		const secs = seconds % 60;

		return String(mins).padStart(2, '0') + ':' + String(secs).padStart(2, '0');
	}

	useEffect(() => {
		setInterviewQuestion(lastConversation);
		setCurrentQuestionIndex(Math.ceil(conversation.length / 2));
	}, [interviewQuestion, lastConversation]);

	useEffect(() => {
		if (timeLeft <= 0) {
			setOnRecording(false);
			toast.error('Waktu habis', {
				position: 'top-right',
				duration: 10000,
			});
			return;
		}

		if (timeLeft == 30) {
			toast.info('Waktumu semakin tipis', {
				position: 'top-right',
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

	return (
		<div className='min-h-screen bg-background flex flex-col'>
			<div className='flex items-center justify-between px-4 py-3 border-b'>
				<Link href='/'>
					<Button variant='ghost' size='icon'>
						<Home className='h-5 w-5' />
					</Button>
				</Link>
				<div className='text-sm font-medium'>Pertanyaan {currentQuestionIndex} dari 8</div>
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
							<span className='font-normal'>Jawaban</span>

							<TooltipProvider>
								<Tooltip>
									<TooltipTrigger onClick={resetHandler}>
										<TimerReset className='h-5 w-5 text-gray-400 hover:text-gray-600' />
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
							<form
								onSubmit={form.handleSubmit(handleSubmitAnswer)}
								className='flex flex-col gap-4'
							>
								<FormField
									control={form.control}
									name='answer'
									render={({ field }) => (
										<FormItem className='flex flex-col border border-gray-600 rounded gap-2'>
											<FormControl>
												<Textarea
													rows={4}
													disabled={onRecording || timeLeft <= 0}
													placeholder='Pengalaman saya ...'
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
					<Button onClick={nextQuestionHandler}>
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
