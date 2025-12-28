import { CompetencyDetail } from '@/interfaces/summarySchema';
import { cn } from '@/lib/utils';

const CompetencyAssessment = ({
	competencyAssessment,
}: {
	competencyAssessment: CompetencyDetail;
}) => {
	return (
		<div className='flex flex-col justify-between rounded-xl print:border-t print:border-b bg-white p-5 shadow-card transition-shadow hover:shadow-card-hover dark:bg-[#151f2b]'>
			<div className='mb-4 flex items-start justify-between'>
				<h4 className='text-sm font-bold text-[#111418] dark:text-white'>Communication</h4>
				<span
					className={cn(
						'inline-flex items-center rounded px-2 py-1 text-[10px] font-bold uppercase tracking-wide',
						competencyAssessment.evidence_quality === 'Strong' &&
							'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
						competencyAssessment.evidence_quality === 'Insufficient' &&
							'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
						competencyAssessment.evidence_quality === 'Limited' &&
							'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
					)}
				>
					{competencyAssessment.evidence_quality}
				</span>
			</div>
			<div className='flex-1'>
				<p className='text-xs text-[#617289] dark:text-[#9ca3af] mb-3'>
					{competencyAssessment.assessment}
				</p>
			</div>
			<div className='mt-4 pt-3 border-t print:border-0 border-gray-100 dark:border-gray-800 space-y-3'>
				<div>
					<span className='block text-[10px] font-semibold text-gray-500 uppercase'>
						Strengths Observed
					</span>
					<p className='text-xs text-[#111418] dark:text-gray-300 mt-1'>
						{competencyAssessment.strengths_observed}
					</p>
				</div>
				<div>
					<span className='block text-[10px] font-semibold text-gray-500 uppercase'>Notes</span>
					<p className='text-xs text-[#111418] dark:text-gray-300 mt-1'>
						{competencyAssessment.notes}
					</p>
				</div>
			</div>
		</div>
	);
};
export default CompetencyAssessment;
