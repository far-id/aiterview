'use client';

import CompetencyAssessment from '@/components/app/competency-assessment';
import QuestionEvaluation from '@/components/app/question-evaluation';
import { Questionnaire } from '@/components/app/questionnaire';
import ThemeToggle from '@/components/app/theme-toggle';
import { useIsMobile } from '@/hooks/useIsMobile';
import useSummary from '@/hooks/useSummary';
import { Conversation } from '@/interfaces/conversations';
import { EvaluationQuestion, EvaluationSummary } from '@/interfaces/summarySchema';
import { Icon } from '@iconify/react';
import { RotateCcw, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export default function Summary() {
	const [evaluationQuestions, setEvaluationQuestions] = useState<EvaluationQuestion[]>([]);
	const [summary, setSummary] = useState<EvaluationSummary | null>(null);
	const [showQuestionnaire, setShowQuestionnaire] = useState(true);
	const isMobile = useIsMobile();
	const { storeSummary } = useSummary();
	const router = useRouter();

	const download = () => {
		setTimeout(() => {
			window.print();
		}, 800);
	};

	useEffect(() => {
		const sessionSummary = sessionStorage.getItem('summary');
		if (sessionSummary) {
			const parsedSummary = JSON.parse(sessionSummary);
			setSummary(JSON.parse(parsedSummary.data.summary));
			setEvaluationQuestions(JSON.parse(parsedSummary.data.evaluationQuestions));
			return;
		} // already fetched
		const sessionConversation = sessionStorage.getItem('conversation');
		const parsedConversations = JSON.parse(sessionConversation || '[]');
		if (!parsedConversations || parsedConversations.length === 0) {
			router.push('/start'); // no conversation, redirect to start
			return;
		}
		const fetchSummary = async () => {
			try {
				const language = sessionStorage.getItem('language') || 'english';
				const response = await fetch('/api/summary', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						conversations: parsedConversations.map((message: Conversation) => ({
							role: message.role,
							text: message.text,
							category: message.category,
						})),
						language: language,
					}),
				});

				const result = await response.json();

				if (!response.ok) {
					throw new Error(result?.error ?? 'Failed to fetch interview summary');
				}

				const { data } = result;

				if (!data?.summary || !data?.evaluationQuestions) {
					throw new Error('Invalid summary response from server');
				}

				storeSummary(result);

				const parsedSummary =
					typeof data.summary === 'string' ? JSON.parse(data.summary) : data.summary;

				const parsedEvaluationQuestions =
					typeof data.evaluationQuestions === 'string'
						? JSON.parse(data.evaluationQuestions)
						: data.evaluationQuestions;

				setSummary(parsedSummary);
				setEvaluationQuestions(parsedEvaluationQuestions);
			} catch (error: any) {
				console.error('Error fetching summary:', error);

				toast.error(error?.message ?? 'Error fetching summary, please refresh the page.', {
					duration: 10000,
				});
			}
		};

		fetchSummary();
	}, []);

	useEffect(() => {
		setTimeout(() => {
			setShowQuestionnaire(true);
		}, 3000);
	}, [summary]);

	return (
		<>
			<div className='min-h-screen bg-background flex-1 '>
				<div className='mx-auto max-w-6xl py-8 space-y-8'>
					<div className='flex flex-col justify-between gap-4 md:flex-row md:items-end'>
						<div className='space-y-2'>
							<div className='flex items-center gap-2 justify-between'>
								<span className='inline-flex items-center rounded-full bg-blue-100 dark:bg-blue-900/30 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:text-blue-300'>
									<span className='material-symbols-outlined mr-1 text-[14px]'>
										<Sparkles fill='currentColor' className='h-4 w-4 text-blue-400' />
									</span>{' '}
									AI Evaluation
								</span>
								<div className='md:hidden'>
									<ThemeToggle />
								</div>
							</div>
							<h1 className='text-3xl font-extrabold tracking-tight text-[#111418] dark:text-white md:text-4xl'>
								Interview Summary
							</h1>
							<p className='text-base text-[#617289] dark:text-[#9ca3af]'>
								Results of your interview simulation evaluation
							</p>
						</div>
						<div className='flex gap-3 flex-col'>
							<div className='md:flex hidden justify-end'>
								<ThemeToggle />
							</div>

							<button
								onClick={download}
								className='flex items-center gap-2 rounded-lg border border-[#d1d5db] bg-white px-4 py-2 text-sm font-medium text-[#374151] hover:bg-[#f9fafb] dark:border-[#4b5563] dark:bg-[#1f2937] dark:text-white dark:hover:bg-[#374151]'
							>
								<span className='material-symbols-outlined text-[18px]'>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										width={24}
										height={24}
										viewBox='0 0 24 24'
									>
										<path
											fill='currentColor'
											d='m12 16l-5-5l1.4-1.45l2.6 2.6V4h2v8.15l2.6-2.6L17 11zm-6 4q-.825 0-1.412-.587T4 18v-3h2v3h12v-3h2v3q0 .825-.587 1.413T18 20z'
										></path>
									</svg>
								</span>{' '}
								Download Summary
							</button>
						</div>
					</div>
					<div className='relative overflow-hidden rounded-xl bg-white shadow-card dark:bg-[#151f2b]'>
						<div className='absolute left-0 top-0 h-full w-1.5 bg-primary' />
						<div className='flex flex-col gap-6 p-6 md:flex-row md:items-start md:p-8'>
							<div className='flex-1 space-y-4'>
								<div className='flex items-center gap-2'>
									<div className='flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary'>
										<Icon icon='ooui:text-summary-ltr' />
									</div>
									<h3 className='text-lg font-bold text-[#111418] dark:text-white'>
										Overall Candidate Summary
									</h3>
								</div>
								<p className='text-base leading-relaxed text-[#4b5563] dark:text-[#d1d5db]'>
									{summary?.overall_candidate_summary}
								</p>
							</div>
						</div>
					</div>
					<div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5'>
						{summary && (
							<>
								<CompetencyAssessment
									competencyAssessment={summary.competency_assessment.communication}
								/>
								<CompetencyAssessment
									competencyAssessment={summary.competency_assessment.integrity}
								/>
								<CompetencyAssessment
									competencyAssessment={summary.competency_assessment.people_development}
								/>
								<CompetencyAssessment
									competencyAssessment={summary.competency_assessment.result_oriented}
								/>
								<CompetencyAssessment
									competencyAssessment={summary.competency_assessment.teamwork}
								/>
							</>
						)}
					</div>
					<div className='space-y-4'>
						<div className='flex items-center justify-between'>
							<h3 className='text-xl font-bold text-[#111418] dark:text-white'>
								Question Evaluation
							</h3>
						</div>
						{evaluationQuestions.length > 0 &&
							evaluationQuestions.map((questionEvaluation, index) => (
								<QuestionEvaluation
									key={questionEvaluation.question}
									questionEvaluation={questionEvaluation}
									index={index}
									open={isMobile || index === 0}
								/>
							))}
					</div>
					<div className='sticky bottom-4 z-40 mt-12 print:hidden'>
						{/* Mobile Practice Again Button */}
						<div className='flex md:hidden w-full flex-col gap-3 justify-end'>
							<Link
								href={'/start'}
								className='flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-bold text-white shadow-md hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'
							>
								<span className='material-symbols-outlined text-[20px]'>
									<RotateCcw />
								</span>{' '}
								Practice Again
							</Link>
						</div>
					</div>
					<div className='hidden print:hidden items-center justify-between gap-4 md:flex md:flex-row p-4 rounded-xl border border-[#e5e7eb] bg-white/90 shadow-lg backdrop-blur-md dark:border-[#2a3441] dark:bg-[#151f2b]/90 md:relative md:bottom-0 md:bg-transparent md:shadow-none md:backdrop-blur-none'>
						<div className='block'>
							<h4 className='text-base font-bold text-[#111418] dark:text-white'>
								Ready for the next step?
							</h4>
							<p className='text-sm text-[#617289] dark:text-[#9ca3af]'>
								Review your weak points and try again.
							</p>
						</div>
						<div className='flex w-full flex-col gap-3 sm:flex-row md:w-auto'>
							<Link
								href={'/start'}
								className='flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-bold text-white shadow-md hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'
							>
								<span className='material-symbols-outlined text-[20px]'>
									<RotateCcw />
								</span>{' '}
								Practice Again
							</Link>
						</div>
					</div>
				</div>
			</div>
			{showQuestionnaire && <Questionnaire onClose={() => setShowQuestionnaire(false)} />}
		</>
	);
}
