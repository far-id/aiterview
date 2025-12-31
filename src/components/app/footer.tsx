'use client';
import React from 'react';

const Footer = () => {
	return (
		<section className='py-6 bg-background-secondary/50'>
			<div className='container px-4 md:mx-auto text-center text-sm text-gray-500'>
				&copy; {new Date().getFullYear()} Aiterview. All rights reserved.
			</div>
		</section>
	);
};

export default Footer;
