'use client';
import QuestionCard from '@/components/my/question-card';
import { SummaryPDF } from '@/components/my/summaryPdf';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { SummarySchema } from '@/interfaces/summarySchema';
import dynamic from 'next/dynamic';
import { ChevronLeft, ChevronRight, Redo, Home, Download } from 'lucide-react';

// Dynamically import PDFDownloadLink to avoid SSR issues
const PDFDownloadLink = dynamic(
	() => import('@react-pdf/renderer').then((mod) => mod.PDFDownloadLink),
	{ ssr: false }
);
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';

const dummySummary: SummarySchema = {
	technical: [
		{
			question: 'What is your greatest strength?',
			myAnswer: 'I am a quick learner and adapt well to new technologies.',
			feedback: 'Your answer was clear and concise.',
			example: 'Try to provide a specific example.',
		},
		{
			question: 'What is your greatest weakness?',
			myAnswer: 'I am a quick learner and adapt well to new technologies.',
			feedback: 'You acknowledged a real weakness.',
			example: 'Discuss how you are working to improve it.',
		},
		{
			question: 'Why do you want to work here?',
			myAnswer: 'I am a quick learner and adapt well to new technologies.',
			feedback: 'Your answer showed good research about the company.',
			example: 'Add more personal motivation.',
		},
		{
			question: 'Where do you see yourself in 5 years?',
			myAnswer: 'I am a quick learner and adapt well to new technologies.',
			feedback: 'Your answer was realistic and ambitious.',
			example: "Align it more with the company's goals.",
		},
	],
	behavioral: [
		{
			question: 'Describe a time you faced a challenge at work.',
			myAnswer: 'I am a quick learner and adapt well to new technologies.',
			feedback: 'You provided a good example.',
			example: 'Add more details about the outcome.',
		},
	],
	situational: [
		{
			question: 'How would you handle a difficult coworker?',
			myAnswer: 'I am a quick learner and adapt well to new technologies.',
			feedback: 'Your approach was reasonable.',
			example: 'Consider discussing it with your manager.',
		},
	],
};

export default function Summary() {
	const [currentCategory, setCurrentCategory] = useState<keyof SummarySchema>('technical');
	const [currentIndex, setCurrentIndex] = useState(0);
	const [summary, setSummary] = useState<SummarySchema>(dummySummary); // Initialize with dummy data
	useEffect(() => {
		const storedSummary = window.sessionStorage.getItem('summary');
		if (storedSummary) {
			setSummary(JSON.parse(storedSummary));
		} else {
			setSummary(dummySummary); // Use dummy data if no summary is found
		}
	}, []);

	const navigateToNext = () => {
		if (currentIndex < summary[currentCategory].length - 1) {
			setCurrentIndex(currentIndex + 1);
		} else {
			//move to the next category
			const categories = Object.keys(summary) as Array<keyof SummarySchema>;
			const currentCategoryIndex = categories.indexOf(currentCategory);
			if (currentCategoryIndex < categories.length - 1) {
				setCurrentCategory(categories[currentCategoryIndex + 1]);
				setCurrentIndex(0);
			}
		}
	};

	const navigateToPrevious = () => {
		if (currentIndex > 0) {
			setCurrentIndex(currentIndex - 1);
		} else {
			//move to the previous category
			const categories = Object.keys(summary) as Array<keyof SummarySchema>;
			const currentCategoryIndex = categories.indexOf(currentCategory);
			if (currentCategoryIndex > 0) {
				setCurrentCategory(categories[currentCategoryIndex - 1]);
				setCurrentIndex(summary[categories[currentCategoryIndex - 1]].length - 1);
			}
		}
	};

	return (
		<div className='min-h-screen bg-backgorund'>
			<div className='container max-w-4xl mx-auto px-4 py-8'>
				<div className='flex items-center justify-between mb-6'>
					<h1 className='text-2xl font-bold'>Interview Summary</h1>
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

				<div className='bg-background rounded-lg shadow-sm border overflow-hidden mb-6'>
					<div className='p-4 border-b bg-background'>
						<div className='flex justify-between items-center'>
							<div className='flex items-center space-x-2'>
								<Button
									variant={currentCategory === 'technical' ? 'default' : 'outline'}
									onClick={() => setCurrentCategory('technical')}
								>
									Technical ({summary.technical.length})
								</Button>
								<Button
									variant={currentCategory === 'behavioral' ? 'default' : 'outline'}
									onClick={() => setCurrentCategory('behavioral')}
								>
									Behavioral ({summary.behavioral.length})
								</Button>
								<Button
									variant={currentCategory === 'situational' ? 'default' : 'outline'}
									onClick={() => setCurrentCategory('situational')}
								>
									Situational ({summary.situational.length})
								</Button>
							</div>
							<PDFDownloadLink
								title='Download Interview Summary'
								className='border rounded-sm p-2'
								document={<SummaryPDF {...summary} />}
								fileName='interview-feedback.pdf'
							>
								<Download className='w-5 h-5' />
							</PDFDownloadLink>
						</div>
						<Separator className='my-3' />
						<div className='flex items-center justify-between gap-y-2'>
							<h3 className='font-medium'>
								Question {currentIndex + 1} of {summary[currentCategory].length} in{' '}
								{currentCategory} category
							</h3>
							<div className='flex items-center space-x-2'>
								<Button
									variant='outline'
									size='sm'
									onClick={navigateToPrevious}
									disabled={currentIndex === 0 && currentCategory === 'technical'}
								>
									<ChevronLeft className='h-4 w-4' />
								</Button>
								<Button
									variant='outline'
									size='sm'
									onClick={navigateToNext}
									disabled={
										currentIndex === summary[currentCategory].length - 1 &&
										currentCategory === 'situational'
									}
								>
									<ChevronRight className='h-4 w-4' />
								</Button>
							</div>
						</div>
					</div>

					<div className='p-6'>
						{summary[currentCategory][currentIndex] && (
							<>
								<QuestionCard
									role='model'
									message={summary[currentCategory][currentIndex].question}
								/>

								<Card className='mb-6 bg-gray-50 dark:bg-gray-800 '>
									<CardHeader className='flex flex-row items-center justify-between py-3'>
										<h3 className='text-lg font-medium'>Your Answer</h3>
									</CardHeader>
									<CardContent className='pt-0'>
										<p className='text-md font-medium mb-2'>
											{summary[currentCategory][currentIndex].myAnswer}
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
													{summary[currentCategory][currentIndex].feedback}
												</p>
											</CardContent>
										</Card>
										<Card className=' shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out'>
											<CardHeader className='flex flex-row items-center justify-between py-3'>
												<h3 className='text-lg font-medium'>Example Answer</h3>
											</CardHeader>
											<CardContent className='pt-0'>
												<p className='text-md font-medium mb-2'>
													{summary[currentCategory][currentIndex].example}
												</p>
											</CardContent>
										</Card>
									</CardContent>
								</Card>
							</>
						)}
					</div>
				</div>

				<div className='flex justify-between'>
					<Button
						onClick={navigateToPrevious}
						disabled={currentIndex === 0 && currentCategory === 'technical'}
					>
						<ChevronLeft className='h-4 w-4 mr-1' />
						Previous
					</Button>
					<div className='flex items-center space-x-2'>
						{currentIndex === summary[currentCategory].length - 1 &&
						currentCategory === 'situational' ? (
							<Button onClick={() => redirect('/start')}>
								<Redo className='h-4 w-4 mr-1' />
								New Interview
							</Button>
						) : (
							<Button onClick={navigateToNext}>
								Next
								<ChevronRight className='h-4 w-4 ml-1' />
							</Button>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
