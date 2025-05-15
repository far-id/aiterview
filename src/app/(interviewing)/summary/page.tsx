'use client';
import QuestionCard from '@/components/my/question-card';
// import { Question } from '@/lib/questions';
// import QuestionCard from '@/components/QuestionCard';
// import FeedbackSection from '@/components/FeedbackSection';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, Redo, Home } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { useState } from 'react';
// import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
// import { useToast } from '@/hooks/use-toast';


const dummyQuestion = {
	text: 'What is your greatest strength?',
	category: 'behavioral',
	difficulty: 'easy',
	tips: 'Be honest and specific.',
};

export default function Summary() {
	return (
		<div className='min-h-screen bg-gray-50'>
			<div className='container max-w-4xl mx-auto px-4 py-8'>
				<div className='flex items-center justify-between mb-6'>
					<h1 className='text-2xl font-bold'>Interview Review</h1>
					<div className='flex items-center space-x-2'>
						<Button variant='outline' asChild>
							<Link href='/'>
								<Home className='h-4 w-4 mr-1' />
								Home
							</Link>
						</Button>
						<Button onClick={() => redirect('/start')}>
							<Redo className='h-4 w-4 mr-1' />
							New Interview
						</Button>
					</div>
				</div>

				<div className='bg-white rounded-lg shadow-sm border overflow-hidden mb-6'>
					<div className='p-4 border-b bg-gray-50'>
						<div className='flex items-center justify-between'>
							<h3 className='font-medium'>Question 1 of 8</h3>
							<div className='flex items-center space-x-2'>
								<Button
									variant='outline'
									size='sm'
									// onClick={navigateToPrevious}
									// disabled={currentIndex === 0}
								>
									<ChevronLeft className='h-4 w-4' />
								</Button>
								<Button
									variant='outline'
									size='sm'
									// onClick={navigateToNext}
									// disabled={currentIndex === questions.length - 1}
								>
									<ChevronRight className='h-4 w-4' />
								</Button>
							</div>
						</div>
					</div>

					<div className='p-6'>
						{/* {currentQuestion && <QuestionCard question={currentQuestion} />} */}
						{/* <QuestionCard question={dummyQuestion} /> */}

						<Card className='mb-6 bg-gray-50 dark:bg-gray-800 '>
							<CardHeader className='flex flex-row items-center justify-between py-3'>
								<h3 className='text-lg font-medium'>Your Answer</h3>
							</CardHeader>
							<CardContent className='pt-0'>
								<p className='text-md font-medium mb-2'>
									Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic minima provident
									officiis quis ad, accusamus eum! Minima error voluptates ipsam.
								</p>
							</CardContent>
						</Card>

						<Card className='mb-6 bg-gray-50 dark:bg-gray-800'>
							<CardHeader className='flex flex-row items-center justify-between py-3'>
								<h3 className='text-lg font-medium'>AI Feedback</h3>
							</CardHeader>
							<CardContent className='pt-0 gap-4 flex flex-col'>
								<Card className=' shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out'>
									<CardHeader className='flex flex-row items-center justify-between py-3'>
										<h3 className='text-lg font-medium'>Feedback</h3>
									</CardHeader>
									<CardContent className='pt-0'>
										<p className='text-md font-medium mb-2'>
											Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic minima provident
											officiis quis ad, accusamus eum! Minima error voluptates ipsam.
										</p>
									</CardContent>
								</Card>
								<Card className=' shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out'>
									<CardHeader className='flex flex-row items-center justify-between py-3'>
										<h3 className='text-lg font-medium'>Example Answer</h3>
									</CardHeader>
									<CardContent className='pt-0'>
										<p className='text-md font-medium mb-2'>
											Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic minima provident
											officiis quis ad, accusamus eum! Minima error voluptates ipsam.
										</p>
									</CardContent>
								</Card>
							</CardContent>
						</Card>

						{/* <Tabs defaultValue='answer' className='mt-4'>
							<TabsList className='mb-4'>
								<TabsTrigger value='answer'>Your Answer</TabsTrigger>
								<TabsTrigger value='feedback'>Feedback</TabsTrigger>
							</TabsList>

							<TabsContent value='answer'>
								<div className='bg-gray-50 p-4 rounded-lg border'>
									{currentAnswer ? (
										<p className='whitespace-pre-wrap'>{currentAnswer}</p>
									) : (
										<p className='text-gray-500 italic'>No answer provided</p>
									)}
								</div>
							</TabsContent>

							<TabsContent value='feedback'>
								<FeedbackSection feedback={currentFeedback || []} score={currentScore} />
							</TabsContent>
						</Tabs> */}
					</div>
				</div>

				<div className='flex justify-between'>
					<Button
						variant='outline'
						// disabled={currentIndex === 0}
					>
						<ChevronLeft className='h-4 w-4 mr-1' />
						Previous
					</Button>
					<div className='flex items-center space-x-2'>
						<Button>
							Next
							<ChevronRight className='h-4 w-4 ml-1' />
						</Button>
						<Button>
							<Redo className='h-4 w-4 mr-1' />
							New Interview
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
