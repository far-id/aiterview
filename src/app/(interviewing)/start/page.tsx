'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import React, { useEffect } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import Navbar from '@/components/my/navbar';
import Footer from '@/components/my/footer';
import JobPlatform from '@/components/my/job-platform';
import useConversation from '@/hooks/useConversation';

const formSchema = z.object({
	position: z.string().min(3, {
		message: 'Posisi minimal berisi 3 karakter.',
	}),
	description: z.string().min(20, {
		message: 'Deskripsi minimal berisi 20 karakter.',
	}),
	responsibility: z.string().min(20, {
		message: 'Tanggung jawab minimal berisi 20 karakter.',
	}),
	requirement: z.string().min(20, {
		message: 'Persyaratan minimal berisi 20 karakter.',
	}),
});

const platforms: { name: string; image: string; url: string; bg?: string }[] = [
	{
		name: 'LinkedIn',
		image: 'linkedin.png',
		url: 'https://www.linkedin.com/',
	},
	{
		name: 'Indeed',
		image: 'indeed.svg',
		url: 'https://www.indeed.com/',
	},
	{
		name: 'glints',
		image: 'glints.png',
		url: 'https://glints.com/',
	},
	{
		name: 'Jobstreet',
		image: 'jobstreet.png',
		url: 'https://www.jobstreet.co.id/',
	},
	{
		name: 'Karir.com',
		image: 'karir-com.png',
		url: 'https://www.karir.com/',
	},
	{
		name: 'Japan dev',
		image: 'japan-dev.svg',
		url: 'https://japan-dev.com/',
	},
	{
		name: 'Indeed JP',
		image: 'indeed-jp.png',
		url: 'https://jp.indeed.com/',
	},
	{
		name: 'TokyoDev',
		image: 'tokyodev.png',
		url: 'https://tokyodev.com/jobs',
		bg: 'bg-gray-700',
	},
];

export default function Page() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			position: '',
			description: '',
			responsibility: '',
			requirement: '',
		},
	});
	const { addMessage, clearConversation } = useConversation();
	const router = useRouter();

	const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = async (data) => {
		const { position, description, responsibility, requirement } = data;
		const body = JSON.stringify({
			position,
			description,
			responsibility,
			requirement,
		});

		try {
			const response = await fetch('/api/initialQuestion', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body,
			});
			console.log('Response:', response);
			if (!response.ok) {
				throw new Error('Something went wrong!');
			} else {
				response.json().then((data) => {
					if (data.error) {
						alert(data.error);
					} else {
						const { message, prompt } = data;
						console.log('AI response:', message);
						addMessage({
							role: 'user',
							message: prompt,
						});
						addMessage({
							role: 'model',
							message: message.pertanyaan,
							category: message.kategori,
							tips: message.tips,
						});
					}
				});
				router.push('interview');
			}
		} catch (error) {
			console.error('Error:', error);
		}
	};

	useEffect(() => {
		clearConversation();
		console.log('all clear');
	}, []);

	return (
		<>
			<Navbar />
			<div className='flex flex-col md:flex-row w-full px-4 justify-center mx-auto container md:w-4/5 mt-20'>
				<div className='flex flex-col w-full md:w-7/12 md:m-4'>
					<h1 className='text-2xl font-bold tracking-tight lg:text-4xl'>Deskripsikan Pekerjaan</h1>
					<div>
						<Form {...form}>
							<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
								<FormField
									control={form.control}
									name='position'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Nama Posisi</FormLabel>
											<FormControl>
												<Input placeholder='AI Engineer' {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name='description'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Deskripsi</FormLabel>
											<FormControl>
												<Textarea rows={3} placeholder='Sebagai AI Engineer di ....' {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name='responsibility'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Tanggung Jawab</FormLabel>
											<FormControl>
												<Textarea rows={5} placeholder='- Mengembangakan ....' {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name='requirement'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Persyaratan</FormLabel>
											<FormControl>
												<Textarea rows={5} placeholder='- Pengalaman +20 tahun' {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<div className='flex justify-center'>
									<Button type='submit' disabled={form.formState.isSubmitting}>
										{form.formState.isSubmitting ? 'Memulai...' : 'Mulai Wawancara'}
									</Button>
								</div>
							</form>
						</Form>
					</div>
				</div>
				<div className='flex flex-col w-full md:w-5/12 md:m-4'>
					<h1 className='text-2xl font-bold tracking-tight lg:text-4xl'>Cari Lowongan</h1>
					<Alert className='my-4'>
						<Terminal className='h-4 w-4' />
						<AlertTitle>Tips!</AlertTitle>
						<AlertDescription className='leading-5 text-balance'>
							Untuk mendapatkan simulasi wawancara yang lebih akurat, pastikan Anda mengisi form
							dengan spesifik dan jelas. Pilih nama pekerjaan yang sesuai, gunakan referensi dari
							situs pencari kerja, dan tuliskan tanggung jawab serta persyaratan secara rinci.
							Semakin detail informasi yang Anda berikan, semakin realistis pengalaman wawancara
							yang akan Anda dapatkan.
						</AlertDescription>
					</Alert>
					<div className='grid grid-cols-2 gap-2'>
						{platforms.map((platform) => (
							<JobPlatform key={platform.name} {...platform} />
						))}
					</div>
				</div>
			</div>
			<Footer />
		</>
	);
}
