import Image from 'next/image';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { AudioLines, CircleCheck, Mic, Pause, Play, Sparkle, Sparkles } from 'lucide-react';
import Navbar from '@/components/app/navbar';
import Footer from '@/components/app/footer';

export default function Home() {
	return (
		<div className='min-h-screen bg-background text-foreground'>
			<Navbar />
			<section className='py-20 lg:py-32'>
				<div className='container px-4 md:mx-auto'>
					<div className='grid lg:grid-cols-2 gap-12 items-center'>
						<div className='space-y-8'>
							<div className='space-y-4'>
								<Badge
									variant='secondary'
									className='bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800'
								>
									<Sparkle fill='currentColor' className='h-3 w-3 mr-1' />
									AI-Powered Practice
								</Badge>
								<h1 className='font-heading text-4xl lg:text-6xl font-bold tracking-tight text-foreground'>
									Practice Job Interviews with AI. <span className='text-highlight'>For Free.</span>
								</h1>
								<p className='text-xl text-muted-foreground max-w-lg'>
									Get realistic mock interviews, personalized feedback, and boost your confidence —
									all powered by AI.
								</p>
							</div>
							<div className='flex flex-col sm:flex-row gap-4'>
								<Button
									asChild
									size='lg'
									className='bg-primary hover:bg-primary/85 text-primary-foreground animate-grow flex items-center justify-center'
								>
									<Link href={'/guidelines'}>
										<Play className='h-4 w-4 mr-2 fill-current' />
										Start Practicing — It&apos;s Free
									</Link>
								</Button>
							</div>
							<div className='flex items-center space-x-6 text-sm text-muted-foreground'>
								<div className='flex items-center space-x-2'>
									<CircleCheck className='h-5 w-5 font-black text-background fill-highlight' />
									<span>No credit card required</span>
								</div>
								<div className='flex items-center space-x-2'>
									<CircleCheck className='h-5 w-5 font-black text-background fill-highlight' />
									<span>Start in 30 seconds</span>
								</div>
							</div>
						</div>
						<div className='relative'>
							<Card className='bg-gradient-to-br from-blue-50 to-indigo-100 border-0 dark:bg-gradient-to-br dark:from-slate-900 dark:to-purple-900 dark:border-gray-700 shadow-2xl animate-grow-up'>
								<CardContent className='p-8'>
									<div className='space-y-6'>
										<div className='flex items-center justify-between'>
											<div className='flex items-center space-x-3'>
												<div className='h-12 w-12 rounded-full bg-primary flex items-center justify-center'>
													<Sparkles
														fill='currentColor'
														className='h-6 w-6 text-primary-foreground'
													/>
												</div>
												<div>
													<p className='font-semibold text-foreground'>AI Interviewer</p>
													<p className='text-sm text-muted-foreground'>Online now</p>
												</div>
											</div>
											<div className='flex items-center space-x-2'>
												<div className='h-2 w-2 rounded-full bg-highlight animate-pulse' />
												<span className='text-sm text-highlight font-medium'>Recording</span>
											</div>
										</div>
										<div className='space-y-4'>
											<div className='bg-card rounded-lg p-4 shadow-sm dar:border border-gray-700'>
												<p className='text-sm font-medium text-primary mb-2'>AI Question:</p>
												<p className='text-sm text-card-foreground'>
													&ldquo;Tell me about a challenging project you worked on and how you
													overcame the obstacles.&rdquo;
												</p>
											</div>
											<div className='bg-primary text-primary-foreground rounded-lg p-4 ml-8'>
												<p className='text-sm'>
													Well, I recently worked on a full-stack application where I had to
													integrate multiple APIs...
												</p>
											</div>
										</div>
										<div className='flex items-center justify-center space-x-4 pt-4'>
											<Button
												size='sm'
												variant='outline'
												className='rounded-full border-gray-600 text-card-foreground hover:bg-gray-700'
											>
												<Mic className='h-4 w-4' />
											</Button>
											<Button
												size='sm'
												variant='outline'
												className='rounded-full border-gray-600 text-card-foreground hover:bg-gray-700'
											>
												<Pause className='h-4 w-4' />
											</Button>
											<Button
												size='sm'
												variant='outline'
												className='rounded-full border-gray-600 text-card-foreground hover:bg-gray-700'
											>
												<AudioLines className='h-4 w-4' />
											</Button>
										</div>
									</div>
								</CardContent>
							</Card>
						</div>
					</div>
				</div>
			</section>
			<section className='py-20 bg-background-secondary/50'>
				<div className='container px-4 md:mx-auto'>
					<div className='text-center space-y-4 mb-16'>
						<h2 className='font-heading text-3xl lg:text-4xl font-bold text-foreground'>
							Why Do Most Candidates Struggle in Interviews?
						</h2>
						<p className='text-xl text-muted-foreground max-w-2xl mx-auto'>
							Even talented developers fail interviews due to poor preparation and anxiety.
						</p>
					</div>
					<div className='grid md:grid-cols-3 gap-8'>
						<Card className='text-center bg-background-secondary border-gray-800 animate-grow-up'>
							<CardContent className='pt-8'>
								<div className='h-16 w-16 rounded-full bg-orange-950 flex items-center justify-center mx-auto mb-4'>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										width={256}
										height={256}
										viewBox='0 0 256 256'
										className='h-8 w-8 text-red-400'
									>
										<path
											fill='currentColor'
											d='M128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24m36 72a12 12 0 1 1-12 12a12 12 0 0 1 12-12m-72 0a12 12 0 1 1-12 12a12 12 0 0 1 12-12m84 80c-10 0-15.05-6.74-18.4-11.2c-3-4-3.92-4.8-5.6-4.8s-2.57.76-5.6 4.8c-3.35 4.46-8.4 11.2-18.4 11.2s-15-6.74-18.4-11.2c-3-4-3.92-4.8-5.6-4.8s-2.57.76-5.6 4.8C95.05 169.26 90 176 80 176a8 8 0 0 1 0-16c1.68 0 2.57-.76 5.6-4.8C89 150.74 94 144 104 144s15 6.74 18.4 11.2c3 4 3.92 4.8 5.6 4.8s2.57-.76 5.6-4.8C137 150.74 142 144 152 144s15.05 6.74 18.4 11.2c3 4 3.92 4.8 5.6 4.8a8 8 0 0 1 0 16'
										></path>
									</svg>
								</div>
								<h3 className='font-semibold text-lg mb-2 text-foreground'>Nervous & Unprepared</h3>
								<p className='text-muted-foreground'>
									Anxiety kicks in when facing tough questions without proper practice.
								</p>
							</CardContent>
						</Card>
						<Card className='text-center bg-background-secondary border-gray-800 animate-grow-up'>
							<CardContent className='pt-8'>
								<div className='h-16 w-16 rounded-full bg-orange-950 flex items-center justify-center mx-auto mb-4'>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										width={24}
										height={24}
										viewBox='0 0 24 24'
										className='h-8 w-8 text-red-400'
									>
										<g fill='none'>
											<path d='m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z'></path>
											<path
												fill='currentColor'
												d='M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2m0 14a1 1 0 1 0 0 2a1 1 0 0 0 0-2m0-9.5a3.625 3.625 0 0 0-3.625 3.625a1 1 0 1 0 2 0a1.625 1.625 0 1 1 2.23 1.51c-.676.27-1.605.962-1.605 2.115V14a1 1 0 1 0 2 0c0-.244.05-.366.261-.47l.087-.04A3.626 3.626 0 0 0 12 6.5'
											></path>
										</g>
									</svg>
								</div>
								<h3 className='font-semibold text-lg mb-2 text-foreground'>Unclear Answers</h3>
								<p className='text-muted-foreground'>
									Unsure how to structure responses to behavioral and technical questions.
								</p>
							</CardContent>
						</Card>
						<Card className='text-center bg-background-secondary border-gray-800 animate-grow-up'>
							<CardContent className='pt-8'>
								<div className='h-16 w-16 rounded-full bg-orange-950 flex items-center justify-center mx-auto mb-4'>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										width={24}
										height={24}
										viewBox='0 0 24 24'
										className='h-8 w-8 text-red-400'
									>
										<g fill='none'>
											<path d='m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z'></path>
											<path
												fill='currentColor'
												d='M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2m0 4a1 1 0 0 0-1 1v5a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V7a1 1 0 0 0-1-1'
											></path>
										</g>
									</svg>
								</div>
								<h3 className='font-semibold text-lg mb-2 text-foreground'>Lack of Practice</h3>
								<p className='text-muted-foreground'>
									No realistic practice before facing real recruiters and hiring managers.
								</p>
							</CardContent>
						</Card>
					</div>
				</div>
			</section>
			<section className='py-20'>
				<div className='container px-4 md:mx-auto'>
					<div className='grid lg:grid-cols-2 gap-12 items-center'>
						<div className='space-y-8'>
							<div className='space-y-4'>
								<h2 className='font-heading text-3xl lg:text-4xl font-bold text-foreground'>
									Meet Your AI Interview Coach
								</h2>
								<p className='text-xl text-muted-foreground'>
									Aiterview simulates real job interviews with AI. You&apos;ll practice answering,
									get instant feedback, and track your progress — all in one place. And yes,
									it&apos;s completely free.
								</p>
							</div>
							<div className='space-y-4'>
								<div className='flex items-start space-x-4'>
									<div className='h-8 w-8 rounded-full bg-green-100 dark:bg-green-950 flex items-center justify-center flex-shrink-0 mt-1'>
										<Icon icon='mingcute:check-fill' className='h-4 w-4 text-highlight' />
									</div>
									<div>
										<h4 className='font-semibold text-foreground'>
											Realistic Interview Simulation
										</h4>
										<p className='text-muted-foreground'>
											Experience interviews that feel just like the real thing.
										</p>
									</div>
								</div>
								<div className='flex items-start space-x-4'>
									<div className='h-8 w-8 rounded-full bg-green-100 dark:bg-green-950 flex items-center justify-center flex-shrink-0 mt-1'>
										<Icon icon='mingcute:check-fill' className='h-4 w-4 text-highlight' />
									</div>
									<div>
										<h4 className='font-semibold text-foreground'>Personalized Feedback</h4>
										<p className='text-muted-foreground'>
											Get detailed insights on your performance and areas to improve.
										</p>
									</div>
								</div>
								<div className='flex items-start space-x-4'>
									<div className='h-8 w-8 rounded-full bg-green-100 dark:bg-green-950 flex items-center justify-center flex-shrink-0 mt-1'>
										<Icon icon='mingcute:check-fill' className='h-4 w-4 text-highlight' />
									</div>
									<div>
										<h4 className='font-semibold text-foreground'>Progress Tracking</h4>
										<p className='text-muted-foreground'>
											Monitor your improvement over time with detailed analytics.
										</p>
									</div>
								</div>
							</div>
						</div>
						<div className='relative'>
							<Image
								alt='AI Interview Coach'
								src='/summary.webp'
								className='rounded-lg shadow-2xl'
								width={600}
								height={400}
								priority
							/>
							<div className='absolute -bottom-6 -left-6 bg-background-secondary border border-gray-700 rounded-lg shadow-lg p-4'>
								<div className='flex items-center space-x-3'>
									<div className='h-8 w-8 rounded-full bg-green-500 flex items-center justify-center'>
										<Icon icon='mingcute:ai-fill' className='h-4 w-4 text-primary-foreground' />
									</div>
									<div className='text-sm'>
										<p className='font-semibold text-foreground'>Know Your Weaknesses</p>
										<p className='text-muted-foreground'>Improve your skills</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			<section id='features' className='py-20 bg-background-secondary/50'>
				<div className='container px-4 md:mx-auto'>
					<div className='text-center space-y-4 mb-16'>
						<h2 className='font-heading text-3xl lg:text-4xl font-bold text-foreground'>
							Everything You Need to Succeed
						</h2>
						<p className='text-xl text-muted-foreground max-w-2xl mx-auto'>
							Comprehensive tools designed to make you interview-ready.
						</p>
					</div>
					<div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8'>
						<Card className='text-center bg-background-secondary border-gray-800 animate-grow-lift-up'>
							<CardContent className='pt-8'>
								<div className='h-16 w-16 rounded-full bg-blue-200 dark:bg-blue-950 flex items-center justify-center mx-auto mb-4'>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										width={24}
										height={24}
										viewBox='0 0 24 24'
										className='h-8 w-8 text-blue-400'
									>
										<g fill='none'>
											<path d='m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z'></path>
											<path
												fill='currentColor'
												d='M19.07 12.01a1 1 0 0 1 .85 1.132A8.004 8.004 0 0 1 13 19.938V21a1 1 0 1 1-2 0v-1.062a8.005 8.005 0 0 1-6.919-6.796a1 1 0 0 1 1.98-.284a6.001 6.001 0 0 0 11.878 0a1 1 0 0 1 1.132-.848ZM12 2a5 5 0 0 1 5 5v5a5 5 0 0 1-10 0V7a5 5 0 0 1 5-5'
											></path>
										</g>
									</svg>
								</div>
								<h3 className='font-semibold text-lg mb-2 text-foreground'>Voice-Based Practice</h3>
								<p className='text-muted-foreground'>
									Answer questions using your microphone, just like a real interview.
								</p>
							</CardContent>
						</Card>
						<Card className='text-center bg-background-secondary border-gray-800 animate-grow-lift-up'>
							<CardContent className='pt-8'>
								<div className='h-16 w-16 rounded-full bg-purple-200 dark:bg-purple-950 flex items-center justify-center mx-auto mb-4'>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										width={24}
										height={24}
										viewBox='0 0 24 24'
										className='h-8 w-8 text-purple-400'
									>
										<g fill='none'>
											<path d='m12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036q-.016-.004-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.016-.018m.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01z'></path>
											<path
												fill='currentColor'
												d='M9.107 5.448c.598-1.75 3.016-1.803 3.725-.159l.06.16l.807 2.36a4 4 0 0 0 2.276 2.411l.217.081l2.36.806c1.75.598 1.803 3.016.16 3.725l-.16.06l-2.36.807a4 4 0 0 0-2.412 2.276l-.081.216l-.806 2.361c-.598 1.75-3.016 1.803-3.724.16l-.062-.16l-.806-2.36a4 4 0 0 0-2.276-2.412l-.216-.081l-2.36-.806c-1.751-.598-1.804-3.016-.16-3.724l.16-.062l2.36-.806A4 4 0 0 0 8.22 8.025l.081-.216zM19 2a1 1 0 0 1 .898.56l.048.117l.35 1.026l1.027.35a1 1 0 0 1 .118 1.845l-.118.048l-1.026.35l-.35 1.027a1 1 0 0 1-1.845.117l-.048-.117l-.35-1.026l-1.027-.35a1 1 0 0 1-.118-1.845l.118-.048l1.026-.35l.35-1.027A1 1 0 0 1 19 2'
											></path>
										</g>
									</svg>
								</div>
								<h3 className='font-semibold text-lg mb-2 text-foreground'>
									AI-Generated Questions
								</h3>
								<p className='text-muted-foreground'>
									Tailored behavioral & technical questions based on your job description.
								</p>
							</CardContent>
						</Card>
						<Card className='text-center bg-background-secondary border-gray-800 animate-grow-lift-up'>
							<CardContent className='pt-8'>
								<div className='h-16 w-16 rounded-full bg-red-500 dark:bg-red-800 flex items-center justify-center mx-auto mb-4'>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										width={24}
										height={24}
										viewBox='0 0 24 24'
										className='h-8 w-8 text-gray-100'
									>
										<path
											fill='currentColor'
											d='M10 10.5h1q.425 0 .713-.288T12 9.5v-1q0-.425-.288-.712T11 7.5H9.5q-.2 0-.35.15T9 8v4q0 .2.15.35t.35.15t.35-.15T10 12zm0-1v-1h1v1zm5 3q.425 0 .713-.288T16 11.5v-3q0-.425-.288-.712T15 7.5h-1.5q-.2 0-.35.15T13 8v4q0 .2.15.35t.35.15zm-1-1v-3h1v3zm4-1h.5q.2 0 .35-.15T19 10t-.15-.35t-.35-.15H18v-1h.5q.2 0 .35-.15T19 8t-.15-.35t-.35-.15h-1q-.2 0-.35.15T17 8v4q0 .2.15.35t.35.15t.35-.15T18 12zM8 18q-.825 0-1.412-.587T6 16V4q0-.825.588-1.412T8 2h12q.825 0 1.413.588T22 4v12q0 .825-.587 1.413T20 18zm-4 4q-.825 0-1.412-.587T2 20V7q0-.425.288-.712T3 6t.713.288T4 7v13h13q.425 0 .713.288T18 21t-.288.713T17 22z'
										></path>
									</svg>
								</div>
								<h3 className='font-semibold text-lg mb-2 text-foreground'>Save Results as PDF</h3>
								<p className='text-muted-foreground'>
									Keep track of your answers and progress with downloadable reports.
								</p>
							</CardContent>
						</Card>
						<Card className='text-center bg-background-secondary border-gray-800 animate-grow-lift-up'>
							<CardContent className='pt-8'>
								<div className='h-16 w-16 rounded-full bg-green-100 dark:bg-green-950 flex items-center justify-center mx-auto mb-4'>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										width={24}
										height={24}
										viewBox='0 0 24 24'
										className='h-8 w-8 text-highlight'
									>
										<path
											fill='currentColor'
											d='M4.5 20.25a.76.76 0 0 1-.75-.75v-15a.75.75 0 0 1 1.5 0v15a.76.76 0 0 1-.75.75'
										></path>
										<path
											fill='currentColor'
											d='M19.5 20.25h-15a.75.75 0 0 1 0-1.5h15a.75.75 0 0 1 0 1.5m-5.5-5.5a.74.74 0 0 1-.53-.22L11 12.06l-2.47 2.47a.75.75 0 0 1-1.06-1.06l3-3a.75.75 0 0 1 1.06 0L14 12.94l3.47-3.47a.75.75 0 0 1 1.06 1.06l-4 4a.74.74 0 0 1-.53.22'
										></path>
										<path
											fill='currentColor'
											d='M18.5 13.84a.76.76 0 0 1-.75-.75v-2.84H15a.75.75 0 0 1 0-1.5h3.5a.76.76 0 0 1 .75.75v3.59a.76.76 0 0 1-.75.75'
										></path>
									</svg>
								</div>
								<h3 className='font-semibold text-lg mb-2 text-foreground'>Instant Feedback</h3>
								<p className='text-muted-foreground'>
									Get insights and suggestions for improvement immediately after each session.
								</p>
							</CardContent>
						</Card>
					</div>
				</div>
			</section>
			<section id='how-it-works' className='py-20'>
				<div className='container px-4 md:mx-auto'>
					<div className='text-center space-y-4 mb-16'>
						<h2 className='font-heading text-3xl lg:text-4xl font-bold text-foreground'>
							Four Simple Steps
						</h2>
						<p className='text-xl text-muted-foreground max-w-2xl mx-auto'>
							Get started with your AI interview practice in minutes.
						</p>
					</div>
					<div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8'>
						<div className='text-center space-y-4'>
							<div className='h-16 w-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto text-2xl font-bold'>
								1
							</div>
							<h3 className='font-semibold text-lg text-foreground'>Enter Job Details</h3>
							<p className='text-muted-foreground'>
								Input the job description & role you&apos;re preparing for.
							</p>
						</div>
						<div className='text-center space-y-4'>
							<div className='h-16 w-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto text-2xl font-bold'>
								2
							</div>
							<h3 className='font-semibold text-lg text-foreground'>Start Mock Interview</h3>
							<p className='text-muted-foreground'>Begin the AI-powered interview simulation.</p>
						</div>
						<div className='text-center space-y-4'>
							<div className='h-16 w-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto text-2xl font-bold'>
								3
							</div>
							<h3 className='font-semibold text-lg text-foreground'>Answer Questions</h3>
							<p className='text-muted-foreground'>
								Respond to questions out loud, just like a real interview.
							</p>
						</div>
						<div className='text-center space-y-4'>
							<div className='h-16 w-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto text-2xl font-bold'>
								4
							</div>
							<h3 className='font-semibold text-lg text-foreground'>Get Feedback</h3>
							<p className='text-muted-foreground'>
								Receive detailed feedback and download results as PDF.
							</p>
						</div>
					</div>
				</div>
			</section>
			<section className='py-20 bg-background-secondary/50'>
				<div className='container px-4 md:mx-auto'>
					<div className='text-center space-y-8'>
						<div className='space-y-4'>
							<h2 className='font-heading text-3xl lg:text-4xl font-bold text-foreground'>
								Designed for Students & Job Seekers
							</h2>
							<p className='text-xl text-muted-foreground max-w-2xl mx-auto'>
								Trusted by aspiring software engineers and graduates preparing for their first job.
							</p>
						</div>
						<div className='grid md:grid-cols-3 gap-8 max-w-4xl mx-auto'>
							<div className='flex items-center justify-center space-x-4 bg-background-secondary border border-gray-800 animate-grow rounded-lg p-6'>
								<Icon icon='mingcute:group-fill' className='h-8 w-8 text-blue-400' />
								<div className='text-left'>
									<p className='text-2xl font-bold text-foreground'>500+</p>
									<p className='text-sm text-muted-foreground'>Active Users</p>
								</div>
							</div>
							<div className='flex items-center justify-center space-x-4 bg-background-secondary border border-gray-800 animate-grow rounded-lg p-6'>
								<Icon icon='mingcute:chat-1-fill' className='h-8 w-8 text-highlight' />
								<div className='text-left'>
									<p className='text-2xl font-bold text-foreground'>10k+</p>
									<p className='text-sm text-muted-foreground'>Practice Sessions</p>
								</div>
							</div>
							<div className='flex items-center justify-center space-x-4 bg-background-secondary border border-gray-800 animate-grow rounded-lg p-6'>
								<Icon icon='mingcute:star-fill' className='h-8 w-8 text-yellow-400' />
								<div className='text-left'>
									<p className='text-2xl font-bold text-foreground'>4.9/5</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			<section className='py-20'>
				<div className='container px-4 md:mx-auto'>
					<div className='text-center space-y-8'>
						<div className='space-y-4'>
							<h2 className='font-heading text-3xl lg:text-4xl font-bold text-foreground'>
								Ready to Ace Your Next Interview?
							</h2>
							<p className='text-xl text-muted-foreground max-w-2xl mx-auto'>
								Join hundreds of candidates already practicing with Aiterview. It&apos;s 100% free
								to start.
							</p>
						</div>
						<div className='flex flex-col sm:flex-row gap-4 justify-center'>
							<Button
								asChild
								size='lg'
								className='bg-primary hover:bg-primary/80 text-primary-foreground animate-grow flex items-center justify-center'
							>
								<Link href={'/guidelines'}>
									<Icon icon='mingcute:play-fill' className='h-4 w-4 mr-2' />
									Start Practicing — It&apos;s Free
								</Link>
							</Button>
						</div>
						<div className='flex items-center justify-center space-x-6 text-sm text-muted-foreground'>
							<div className='flex items-center space-x-2'>
								<Icon icon='mingcute:check-circle-fill' className='h-4 w-4 text-highlight' />
								<span>No credit card required</span>
							</div>
							<div className='flex items-center space-x-2'>
								<Icon icon='mingcute:check-circle-fill' className='h-4 w-4 text-highlight' />
								<span>Adapt To You</span>
							</div>
							<div className='flex items-center space-x-2'>
								<Icon icon='mingcute:check-circle-fill' className='h-4 w-4 text-highlight' />
								<span>Start in 30 seconds</span>
							</div>
						</div>
					</div>
				</div>
			</section>
			<Footer />
		</div>
	);
}
