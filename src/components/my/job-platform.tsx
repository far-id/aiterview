import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@radix-ui/react-tooltip';
import clsx from 'clsx';
import React from 'react';

const JobPlatform = ({
	name,
	image,
	url,
	bg = 'bg-white',
}: {
	name: string;
	image: string;
	url: string;
	bg?: string;
}) => {
	return (
		<TooltipProvider delayDuration={0}>
			<Tooltip>
				<TooltipTrigger className={clsx('border rounded-lg flex items-center justify-center', bg)}>
					<a href={url} target='_blank' rel='noopener noreferrer' className='p-2'>
						<img src={`job-platform/` + image} alt='job-platform' className='h-12' />
					</a>
				</TooltipTrigger>
				<TooltipContent>
					<span className='bg-black text-white p-3 rounded-lg'>{name}</span>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
};

export default JobPlatform;
