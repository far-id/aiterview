import { EvaluationQuestion } from '@/interfaces/summarySchema';
import { ChevronUp } from 'lucide-react';
import React, { useEffect, useState } from 'react';

const QuestionEvaluation = ({
	questionEvaluation,
	index,
	open,
}: {
	questionEvaluation: EvaluationQuestion;
	index: number;
	open: boolean;
}) => {
	const [isOpen, setIsOpen] = useState(open);

	return (
		<details
			className='group overflow-hidden rounded-xl border border-[#e5e7eb] bg-white shadow-sm dark:border-[#2a3441] dark:bg-[#151f2b]'
			open={isOpen}
			onToggle={(e) => setIsOpen(e.currentTarget.open)}
		>
			<summary className='flex cursor-pointer items-start justify-between gap-4 p-5 hover:bg-gray-50 dark:hover:bg-[#1f2937] select-none'>
				<div className='flex flex-col gap-1'>
					<span className='text-xs font-semibold uppercase tracking-wide text-[#617289] dark:text-[#9ca3af]'>
						Question {index + 1}
					</span>
					<h4 className='text-lg font-semibold text-[#111418] dark:text-white'>
						{questionEvaluation.question}
					</h4>
				</div>
				<div className='flex items-center gap-4'>
					<span className='material-symbols-outlined group-open:rotate-180 transform text-[#617289] transition-transform'>
						<ChevronUp />
					</span>
				</div>
			</summary>
			<div className='border-t border-[#f0f2f4] bg-[#fcfcfc] p-5 dark:border-[#2a3441] dark:bg-[#1a2432]'>
				<div className='mb-4'>
					<p className='text-xs font-bold uppercase text-[#617289] dark:text-[#9ca3af]'>
						My Answer
					</p>
					<p className='mt-1 text-sm italic text-[#4b5563] dark:text-[#d1d5db]'>
						"{questionEvaluation.myAnswer}"
					</p>
				</div>
				<div className='grid gap-4 md:grid-cols-3'>
					<div className='rounded-lg bg-green-50 p-4 dark:bg-green-900/10'>
						<h5 className='flex items-center gap-2 font-bold text-sm text-green-700 dark:text-green-400'>
							Strengths
						</h5>
						<p className='mt-2 text-sm text-[#4b5563] dark:text-[#d1d5db]'>
							{questionEvaluation.strengths}
						</p>
					</div>
					<div className='rounded-lg bg-orange-50 p-4 dark:bg-orange-900/10'>
						<h5 className='flex items-center gap-2 font-bold text-sm text-orange-700 dark:text-orange-400'>
							Weaknesses
						</h5>
						<p className='mt-2 text-sm text-[#4b5563] dark:text-[#d1d5db]'>
							{questionEvaluation.weaknesses}
						</p>
					</div>
					<div className='rounded-lg bg-blue-50 p-4 dark:bg-blue-900/10'>
						<h5 className='flex items-center gap-2 font-bold text-sm text-blue-700 dark:text-blue-400'>
							Suggestion
						</h5>
						<p className='mt-2 text-sm text-[#4b5563] dark:text-[#d1d5db]'>
							{questionEvaluation.improvementSuggestion}
						</p>
					</div>
				</div>
			</div>
		</details>
	);
};

export default QuestionEvaluation;
