import React from 'react';
import {
	Info,
	AlertTriangle,
	CheckCircle,
	Mic,
	Clock,
	BookOpen,
	MessageCircleQuestion,
	HelpCircle,
	Edit2,
	Lightbulb,
	ArrowRight,
} from 'lucide-react';
import Link from 'next/link';
import ThemeToggle from '@/components/app/theme-toggle';

export default function Guidelines() {
	return (
		<div className='flex-grow container mx-auto px-4 py-12 max-w-5xl bg-background'>
			<div className='fixed top-4 right-4 z-50'>
				<ThemeToggle />
			</div>
			<header className='text-center mb-12 space-y-4'>
				<h1 className='text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white'>
					Before Starting the Interview Simulation
				</h1>
				<p className='text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed'>
					Make sure you understand how this interview simulation works, and follow the guidelines
					below to get the most out of your experience.
				</p>
			</header>
			<div className='space-y-8'>
				<section className='bg-surface-light dark:bg-surface-dark rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden'>
					<div className='p-6 md:p-8 border-b border-slate-100 dark:border-slate-700/50 flex items-center gap-3'>
						<div className='p-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg'>
							<Info className='text-blue-600 dark:text-blue-400' />
						</div>
						<h2 className='text-xl font-semibold text-slate-800 dark:text-slate-100'>
							Interview Simulation Guidelines
						</h2>
					</div>
					<div className='p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12'>
						<div className='flex gap-4 items-start'>
							<CheckCircle className='text-teal-500 mt-1 shrink-0' />
							<div>
								<h3 className='font-semibold text-slate-900 dark:text-white mb-1'>
									Prepare Yourself
								</h3>
								<p className='text-sm text-slate-600 dark:text-slate-400 leading-relaxed'>
									Find a quiet and comfortable place for the interview. Make sure your device is in
									good condition and ready to use.
								</p>
							</div>
						</div>
						<div className='flex gap-4 items-start'>
							<MessageCircleQuestion className='text-teal-500 mt-1 shrink-0' />
							<div>
								<h3 className='font-semibold text-slate-900 dark:text-white mb-1'>
									Interview Questions
								</h3>
								<p className='text-sm text-slate-600 dark:text-slate-400 leading-relaxed'>
									You will be given a series of interview questions one at a time. Answer each
									question to the best of your ability.
								</p>
							</div>
						</div>
						<div className='flex gap-4 items-start'>
							<Mic className='text-teal-500 mt-1 shrink-0' />
							<div>
								<h3 className='font-semibold text-slate-900 dark:text-white mb-1'>
									Answer with Voice
								</h3>
								<p className='text-sm text-slate-600 dark:text-slate-400 leading-relaxed'>
									You can respond by speaking. Use a microphone to record your answers. Click the
									microphone icon to start/stop recording.
								</p>
							</div>
						</div>
						<div className='flex gap-4 items-start'>
							<Clock className='text-teal-500 mt-1 shrink-0' />
							<div>
								<h3 className='font-semibold text-slate-900 dark:text-white mb-1'>Time Limit</h3>
								<p className='text-sm text-slate-600 dark:text-slate-400 leading-relaxed'>
									Each question has a time limit. Ensure you answer before time runs out. Remaining
									time is visible at the top of the screen.
								</p>
							</div>
						</div>
						<div className='flex gap-4 items-start'>
							<Edit2 className='text-teal-500 mt-1 shrink-0' />
							<div>
								<h3 className='font-semibold text-slate-900 dark:text-white mb-1'>
									Editing Your Answers
								</h3>
								<p className='text-sm text-slate-600 dark:text-slate-400 leading-relaxed'>
									You will be provided with a form to review and edit your recorded answers. You may
									also re-record your answers if needed.
								</p>
							</div>
						</div>
						<div className='flex gap-4 items-start'>
							<BookOpen className='text-teal-500 mt-1 shrink-0' />
							<div>
								<h3 className='font-semibold text-slate-900 dark:text-white mb-1'>
									Review Your Answers
								</h3>
								<p className='text-sm text-slate-600 dark:text-slate-400 leading-relaxed'>
									After completing the interview, you can review your responses. This is a valuable
									opportunity to learn and improve.
								</p>
							</div>
						</div>
					</div>
				</section>
				<section className='bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-700/50 rounded-xl p-6 md:p-8'>
					<div className='flex items-center gap-3 mb-4'>
						<AlertTriangle className='text-amber-600 dark:text-amber-400' />
						<h2 className='text-lg font-semibold text-amber-900 dark:text-amber-100'>
							Please Note
						</h2>
					</div>
					<ul className='space-y-2 ml-1'>
						<li className='flex items-start gap-2 text-sm text-amber-900/80 dark:text-amber-100/70'>
							<span className='text-amber-500 mt-1'>•</span>
							<span>
								This is a simulation tool designed solely for practice and does not guarantee
								success in an actual interview.
							</span>
						</li>
						<li className='flex items-start gap-2 text-sm text-amber-900/80 dark:text-amber-100/70'>
							<span className='text-amber-500 mt-1'>•</span>
							<span>
								Your answers are stored temporarily. To keep them permanently, you must download the
								PDF before leaving the review page.
							</span>
						</li>
						<li className='flex items-start gap-2 text-sm text-amber-900/80 dark:text-amber-100/70'>
							<span className='text-amber-500 mt-1'>•</span>
							<span>
								The recording feature is automated and may not capture every word with 100%
								accuracy.
							</span>
						</li>
						<li className='flex items-start gap-2 text-sm text-amber-900/80 dark:text-amber-100/70'>
							<span className='text-amber-500 mt-1'>•</span>
							<span>
								The questions provided are general examples and may differ from those you encounter
								in a specific real-world interview.
							</span>
						</li>
					</ul>
				</section>
				<section className='bg-surface-light dark:bg-surface-dark rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden'>
					<div className='p-6 md:p-8 border-b border-slate-100 dark:border-slate-700/50 flex items-center gap-3'>
						<div className='p-2 bg-emerald-50 dark:bg-emerald-900/30 rounded-lg'>
							<Lightbulb />
						</div>
						<h2 className='text-xl font-semibold text-slate-800 dark:text-slate-100'>
							Tips During the Interview Simulation
						</h2>
					</div>
					<div className='p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-6'>
						<div className='bg-emerald-50/50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-800 rounded-xl p-5 hover:shadow-md transition-shadow'>
							<h3 className='font-semibold text-emerald-800 dark:text-emerald-300 mb-2'>
								Be Concise
							</h3>
							<p className='text-sm text-slate-600 dark:text-slate-400'>
								Give clear and focused answers that address the question directly without
								unnecessary elaboration.
							</p>
						</div>
						<div className='bg-emerald-50/50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-800 rounded-xl p-5 hover:shadow-md transition-shadow'>
							<h3 className='font-semibold text-emerald-800 dark:text-emerald-300 mb-2'>
								Use the STAR Method
							</h3>
							<p className='text-sm text-slate-600 dark:text-slate-400'>
								For behavioral questions: Situation, Task, Action, Result. Structure your answers to
								demonstrate your thought process.
							</p>
						</div>
						<div className='bg-emerald-50/50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-800 rounded-xl p-5 hover:shadow-md transition-shadow'>
							<h3 className='font-semibold text-emerald-800 dark:text-emerald-300 mb-2'>
								Watch the Time
							</h3>
							<p className='text-sm text-slate-600 dark:text-slate-400'>
								Keep an eye on the timer to ensure your responses are neither too long nor too short
								for each question.
							</p>
						</div>
						<div className='bg-emerald-50/50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-800 rounded-xl p-5 hover:shadow-md transition-shadow'>
							<h3 className='font-semibold text-emerald-800 dark:text-emerald-300 mb-2'>
								Utilize Tips
							</h3>
							<p className='text-sm text-slate-600 dark:text-slate-400'>
								Utilize the tips feature (
								<HelpCircle className='inline-block h-4 w-4 mb-0.5' />) available on each question
								to help you provide the best and most focused answers.
							</p>
						</div>
					</div>
				</section>
				<div className='pt-6 pb-12'>
					<Link
						href={'/start'}
						className='w-full bg-primary hover:bg-blue-700 text-white font-semibold text-lg py-4 px-8 rounded-xl shadow-lg hover:shadow-blue-500/30 transition-all transform hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-blue-500/30 flex items-center justify-center gap-2'
					>
						<span>Start Interview Simulation</span>
						<ArrowRight className='h-5 w-5' />
					</Link>
				</div>
			</div>
		</div>
	);
}
