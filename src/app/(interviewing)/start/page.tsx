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
import Navbar from '@/components/app/navbar';
import Footer from '@/components/app/footer';
import JobPlatform from '@/components/app/job-platform';
import useSummary from '@/hooks/useSummary';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { toast } from 'sonner';
import { useConversationContext } from '@/context/conversationContext';

const formSchema = z.object({
	position: z.string().min(3, {
		message: 'Position must be at least 3 characters long',
	}),
	jobDescription: z.string().min(20, {
		message: 'Job description must be at least 20 characters long',
	}),
	language: z.enum(['indonesian', 'english']).default('indonesian'),
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
			jobDescription: '',
			language: 'indonesian',
		},
	});
	const { addConversation, clearConversation } = useConversationContext();
	const { clearSummary } = useSummary();
	const router = useRouter();

	const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = async (data) => {
		const { position, jobDescription, language } = data;
		const body = JSON.stringify({
			position,
			jobDescription,
			language,
		});

		try {
			const response = await fetch('/api/initialQuestion', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body,
			});
			if (!response.ok) {
				toast.error('Failed to start interview simulation. Please try again.', {
					duration: 10000,
				});
			} else {
				response.json().then((data) => {
					if (data.error) {
						alert(data.error);
					} else {
						const { message, prompt } = data;
						addConversation({
							role: 'user',
							text: prompt,
						});
						addConversation({
							role: 'model',
							text: message.question,
							category: message.category,
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
		clearSummary();
	}, []);

	return (
		<>
			<Navbar />
			<div className='flex flex-col md:flex-row w-full px-4 justify-center mx-auto container md:w-4/5 my-20'>
				<div className='flex flex-col w-full md:w-7/12 md:m-4'>
					<h1 className='text-2xl font-bold tracking-tight lg:text-4xl'>Job Descriptions</h1>
					<div>
						<Form {...form}>
							<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
								<FormField
									control={form.control}
									name='position'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Position</FormLabel>
											<FormControl>
												<Input placeholder='AI Engineer' {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name='jobDescription'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Deskripsi</FormLabel>
											<FormControl>
												<Textarea
													rows={18}
													placeholder={'Requirement: ...\n\n\nResponsibility: ...\n\n\n....'}
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name='language'
									render={({ field }) => (
										<FormItem>
											<FormLabel className='flex items-center gap-1'>
												Language
												<Popover>
													<PopoverTrigger>
														<svg
															xmlns='http://www.w3.org/2000/svg'
															width={15}
															height={15}
															viewBox='0 0 24 24'
														>
															<path
																fill='currentColor'
																d='M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10m0-2a8 8 0 1 0 0-16a8 8 0 0 0 0 16m-1-5h2v2h-2zm2-1.645V14h-2v-1.5a1 1 0 0 1 1-1a1.5 1.5 0 1 0-1.471-1.794l-1.962-.393A3.501 3.501 0 1 1 13 13.355'
															></path>
														</svg>
													</PopoverTrigger>
													<PopoverContent>
														Select the language for the interview questions and answers.
													</PopoverContent>
												</Popover>
											</FormLabel>
											<FormControl>
												<Select onValueChange={field.onChange} value={field.value}>
													<SelectTrigger className='w-full'>
														<SelectValue placeholder='Language' />
													</SelectTrigger>
													<SelectContent position='popper' className='z-50'>
														<SelectItem value='indonesian'>Indonesian</SelectItem>
														<SelectItem value='english'>English</SelectItem>
													</SelectContent>
												</Select>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<div className='flex justify-center w-full'>
									<Button className='w-full' type='submit' disabled={form.formState.isSubmitting}>
										{form.formState.isSubmitting ? 'Starting...' : 'Start Interview Simulation'}
									</Button>
								</div>
							</form>
						</Form>
					</div>
				</div>
				<div className='flex flex-col w-full md:w-5/12 md:m-4'>
					<h1 className='text-2xl font-bold tracking-tight lg:text-4xl'>Job Openings</h1>
					<Alert className='my-4'>
						<Terminal className='h-4 w-4' />
						<AlertTitle>Tips!</AlertTitle>
						<AlertDescription className='leading-5 text-balance'>
							To get a more accurate interview simulation, make sure you fill out the form clearly
							and specifically. Choose an appropriate job title, use references from job search
							sites, and describe responsibilities and requirements in detail. The more detailed the
							information you provide, the more realistic the interview experience will be.
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
