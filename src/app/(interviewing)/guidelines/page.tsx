import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	Info,
	AlertTriangle,
	CheckCircle,
	Mic,
	Clock,
	BookOpen,
	MessageCircleQuestion,
	TimerReset,
	HelpCircle,
} from 'lucide-react';
import Link from 'next/link';

export default function Guidelines() {
	return (
		<div className='min-h-screen  dark:bg-background'>
			<div className='container mx-auto px-4 py-8 max-w-4xl'>
				<header className='mb-6 text-center'>
					<h1 className='text-3xl font-bold tracking-tight text-interview-dark mb-2'>
						Before Starting the Interview Simulation
					</h1>
					<p className='text-gray-600 dark:text-gray-200 text-balance'>
						Make sure you understand how this interview simulation works, and follow the guidelines
						below to get the most out of your experience.
					</p>
				</header>

				<Card className='mb-6 border-l-4 border-l-blue-500 bg-white dark:bg-gray-800'>
					<CardHeader className='pb-2'>
						<CardTitle className='flex items-center text-xl'>
							<Info className='h-5 w-5 mr-2 text-blue-500' />
							Interview Simulation Guidelines
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className='space-y-4'>
							<div>
								<h3 className='font-medium flex items-center'>
									<CheckCircle className='h-4 w-4 mr-2 text-green-500' />
									Prepare Yourself
								</h3>
								<p className='text-sm text-gray-600 dark:text-gray-200 ml-6'>
									Find a quiet and comfortable place for the interview. Make sure your device is in
									good condition and ready to use.
								</p>
							</div>
							<div>
								<h3 className='font-medium flex items-center'>
									<MessageCircleQuestion className='h-4 w-4 mr-2 text-green-500' />
									Interview Questions
								</h3>
								<p className='text-sm text-gray-600 dark:text-gray-200 ml-6'>
									You will be given a series of interview questions one at a time. Answer each
									question to the best of your ability.
								</p>
							</div>

							<div>
								<h3 className='font-medium flex items-center'>
									<Mic className='h-4 w-4 mr-2 text-green-500' />
									Answer with Voice
								</h3>
								<p className='text-sm text-gray-600 dark:text-gray-200 ml-6'>
									You can respond to each question by speaking. Use a microphone to record your
									answers. Make sure your voice is clear and audible. Click the microphone icon to
									start recording, and click it again to stop.
								</p>
							</div>

							<div>
								<h3 className='font-medium flex items-center'>
									<Clock className='h-4 w-4 mr-2 text-green-500' />
									Time Limit
								</h3>
								<p className='text-sm text-gray-600 dark:text-gray-200 ml-6'>
									Each question has a specific time limit. Be sure to answer before the time runs
									out. You can see the remaining time at the top of the screen. If time runs out,
									you won’t be able to continue your answer.
								</p>
							</div>

							<div>
								<h3 className='font-medium flex items-center'>
									<TimerReset className='h-4 w-4 mr-2 text-green-500' />
									Editing Your Answers
								</h3>
								<p className='text-sm text-gray-600 dark:text-gray-200 ml-6'>
									You will be provided with a form to review and edit your recorded answers. You may
									also re-record your answers if needed. This is your opportunity to refine or
									clarify your responses.
								</p>
							</div>

							<div>
								<h3 className='font-medium flex items-center'>
									<BookOpen className='h-4 w-4 mr-2 text-green-500' />
									Review Your Answers
								</h3>
								<p className='text-sm text-gray-600 dark:text-gray-200 ml-6'>
									After completing the interview, you can review your responses. This is a valuable
									opportunity to learn from the experience and improve your interview skills.
								</p>
							</div>
						</div>
					</CardContent>
				</Card>

				<Card className='mb-6 border-l-4 text-xl border-l-amber-500 bg-white dark:bg-gray-800'>
					<CardHeader className='pb-2'>
						<CardTitle className='flex items-center'>
							<AlertTriangle className='h-5 w-5 mr-2 text-amber-500' />
							Please Note
						</CardTitle>
					</CardHeader>
					<CardContent>
						<ul className='space-y-2 text-sm text-gray-600 dark:text-gray-200'>
							<li className='flex'>
								<span className='mr-2'>•</span>
								<span>
									This is a simulation tool designed solely for practice and does not guarantee
									success in an actual interview.
								</span>
							</li>
							<li className='flex'>
								<span className='mr-2'>•</span>
								<span>
									Your answers will be stored temporarily during the session but will not be saved
									permanently once you leave the review page. You can save by downloading the PDF.
								</span>
							</li>
							<li className='flex'>
								<span className='mr-2'>•</span>
								<span>
									The recording feature is not yet perfect and may not capture all your words
									accurately.
								</span>
							</li>
							<li className='flex'>
								<span className='mr-2'>•</span>
								<span>
									The questions provided are general examples and may differ from those you
									encounter in a real interview.
								</span>
							</li>
						</ul>
					</CardContent>
				</Card>

				<Card className='mb-8 border-l-4 text-xl border-l-green-500 bg-white dark:bg-gray-800'>
					<CardHeader className='pb-2'>
						<CardTitle className='flex items-center'>
							<CheckCircle className='h-5 w-5 mr-2 text-green-500' />
							Tips During the Interview Simulation
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className='grid md:grid-cols-2 gap-4'>
							<div className='bg-green-50 p-3 rounded-md'>
								<h3 className='text-sm font-medium text-green-800 mb-1'>Be Concise</h3>
								<p className='text-xs text-gray-600'>
									Give clear and focused answers that address the question directly without
									unnecessary elaboration.
								</p>
							</div>

							<div className='bg-green-50 p-3 rounded-md'>
								<h3 className='text-sm font-medium text-green-800 mb-1'>Use the STAR Method</h3>
								<p className='text-xs text-gray-600'>
									For behavioral questions: Situation, Task, Action, Result. Structure your answers
									to demonstrate your thought process.
								</p>
							</div>

							<div className='bg-green-50 p-3 rounded-md'>
								<h3 className='text-sm font-medium text-green-800 mb-1'>Watch the Time</h3>
								<p className='text-xs text-gray-600'>
									Keep an eye on the timer to ensure your responses are neither too long nor too
									short for each question.
								</p>
							</div>

							<div className='bg-green-50 p-3 rounded-md'>
								<h3 className='text-sm font-medium text-green-800 mb-1'>Utilize Tips</h3>
								<p className='text-xs text-gray-600'>
									Utilize the tips feature (<HelpCircle className='h-3 w-3 inline' />) available on
									each question to help you provide the best and most focused answers during the
									interview.
								</p>
							</div>
						</div>
					</CardContent>
				</Card>

				<div className='flex justify-center'>
					<Button
						asChild
						size='lg'
						className='bg-primary w-full hover:bg-primary/80 text-primary-foreground'
					>
						<Link href={'/start'}>Start Interview Simulation</Link>
					</Button>
				</div>
			</div>
		</div>
	);
}
