'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
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
import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import { JobPlatform } from '@/components/my/job-platform';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';

const formSchema = z.object({
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

const platforms: { name: string; image: string; url: string }[] = [
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
		name: 'Karirhub Kemnaker',
		image: 'karirhub-kemnaker.svg',
		url: 'https://karirhub.kemnaker.go.id/',
	},
];
export default function Page() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			description: '',
			responsibility: '',
			requirement: '',
		},
	});

	// 2. Define a submit handler.
	function onSubmit(values: z.infer<typeof formSchema>) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		console.log(values);
	}
	return (
		<div className='container mx-auto flex flex-col md:flex-row w-4/5'>
			<div className='flex flex-col w-full md:w-7/12 m-4'>
				<h1 className='text-2xl font-bold tracking-tight lg:text-4xl'>Deskripsikan Pekerjaan</h1>
				<div>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
							<FormField
								control={form.control}
								name='description'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Deskripsi</FormLabel>
										<FormControl>
											<Textarea rows={3} placeholder='shadcn' {...field} />
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
											<Textarea rows={5} placeholder='shadcn' {...field} />
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
											<Textarea rows={5} placeholder='shadcn' {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<div className='flex justify-center'>
								<Button type='submit' className=''>
									Mulai Wawancara
								</Button>
							</div>
						</form>
					</Form>
				</div>
			</div>
			<div className='flex flex-col w-full md:w-5/12 m-4'>
				<h1 className='text-2xl font-bold tracking-tight lg:text-4xl'>Cari Lowongan</h1>
				<Alert className='my-4'>
					<Terminal className='h-4 w-4' />
					<AlertTitle>Tips!</AlertTitle>
					<AlertDescription className='leading-5 text-pretty'>
						Untuk mendapatkan hasil yang lebih baik, cari lowongan pekerjaan di platform-platform
						seperti berikut. Setelah itu, salin bagian deskripsi pekerjaan, tanggung jawab, dan
						persyaratan yang tertera di sana. Tempelkan salinan tersebut ke dalam form yang
						disediakan untuk menghasilkan pertanyaan yang lebih relevan.
					</AlertDescription>
				</Alert>
				<div className='flex flex-wrap gap-2'>
					{platforms.map((platform) => (
						<JobPlatform key={platform.name} {...platform} />
					))}
				</div>
			</div>
		</div>
	);
}
