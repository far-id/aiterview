import Navbar from '@/components/my/navbar';
import React from 'react';

export default function layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div>
			<Navbar />
			{children}
		</div>
	);
}
