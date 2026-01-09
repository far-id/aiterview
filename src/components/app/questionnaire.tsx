import Link from 'next/link';

export const Questionnaire = ({ onClose }: { onClose: () => void }) => {
	return (
		<div className='fixed bottom-2 border dark:border-gray-700 border-gray-300 right-2 p-4 rounded-lg flex items-start gap-2 shadow-lg z-50 max-w-1/5'>
			<div className='flex flex-col gap-2'>
				<span className='text-balance'>Please Support My Study by Giving Feedback Bellow</span>
				<Link
					className='flex items-center justify-center rounded-lg bg-primary px-6 py-2.5 text-sm w-full font-bold text-white shadow-md hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'
					href='https://forms.gle/r8Vz1Cvv1RfF88jn7'
					target='_blank'
				>
					Questionnaire
				</Link>
			</div>
            <button
                onClick={onClose}
                className='text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
            >
                &times;
            </button>
		</div>
	);
};
