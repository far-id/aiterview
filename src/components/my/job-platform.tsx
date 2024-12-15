import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@radix-ui/react-tooltip';
import React from 'react';

export const JobPlatform = ({ name, image, url }: { name: string; image: string; url: string }) => {
	return (
		<TooltipProvider delayDuration={0}>
			<Tooltip>
				<TooltipTrigger className='bg-white border rounded-lg p-2 flex items-center justify-center'>
					<a href={url} target='_blank' rel='noopener noreferrer'>
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
