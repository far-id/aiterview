import React from 'react';

const AiterviewNavLogo = ({ className }: { className?: string }) => {
	return (
		<div className={`flex items-center space-x-2 ${className}`}>
			<img src='/aiterview-logo.svg' alt='aiterview-logo' className='w-12 h-12 ' />
			<span className='self-center text-2xl font-semibold whitespace-nowrap'>AIterview</span>
		</div>
	);
};

export default AiterviewNavLogo;
