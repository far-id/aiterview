import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	Info,
	AlertTriangle,
	CheckCircle,
	Mic,
	Clock,
	BookOpen,
	MessageCircleQuestion,
	TimerReset,
	HelpCircle,
} from 'lucide-react';
import Link from 'next/link';

export default function Guidelines() {
	return (
		<div className='min-h-screen  dark:bg-background'>
			<div className='container mx-auto px-4 py-8 max-w-4xl'>
				<header className='mb-6 text-center'>
					<h1 className='text-3xl font-bold tracking-tight text-interview-dark mb-2'>
						Sebelum Memulai Simulasi Wawancara
					</h1>
					<p className='text-gray-600 dark:text-gray-200 text-balance'>
						Pastikan Anda memahami cara kerja simulasi wawancara ini dan ikuti panduan di bawah ini
						untuk memaksimalkan pengalaman Anda.
					</p>
				</header>

				<Card className='mb-6 border-l-4 border-l-blue-500 bg-white dark:bg-gray-800'>
					<CardHeader className='pb-2'>
						<CardTitle className='flex items-center text-xl'>
							<Info className='h-5 w-5 mr-2 text-blue-500' />
							Panduan Simulasi Wawancara
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className='space-y-4'>
							<div>
								<h3 className='font-medium flex items-center'>
									<CheckCircle className='h-4 w-4 mr-2 text-green-500' />
									Siapkan Diri Anda
								</h3>
								<p className='text-sm text-gray-600 dark:text-gray-200 ml-6'>
									Temukan tempat yang tenang dan nyaman untuk wawancara. Pastikan perangkat Anda
									dalam keadaan baik dan siap digunakan.
								</p>
							</div>
							<div>
								<h3 className='font-medium flex items-center'>
									<MessageCircleQuestion className='h-4 w-4 mr-2 text-green-500' />
									Pertanyaan yang dilontarkan
								</h3>
								<p className='text-sm text-gray-600 dark:text-gray-200 ml-6'>
									Anda akan diberikan serangkaian pertanyaan wawancara satu per satu. Setiap
									pertanyaan diatur waktunya untuk mensimulasikan lingkungan wawancara yang
									sebenarnya.
								</p>
							</div>

							<div>
								<h3 className='font-medium flex items-center'>
									<Mic className='h-4 w-4 mr-2 text-green-500' />
									Jawab dengan suara
								</h3>
								<p className='text-sm text-gray-600 dark:text-gray-200 ml-6'>
									Jawab setiap pertanyaan dengan berbicara. Anda dapat menggunakan mikrofon untuk
									merekam jawaban Anda. Pastikan suara Anda jelas dan terdengar baik. Klik ikon
									mikrofon untuk memulai perekaman, dan klik lagi untuk berhenti.
								</p>
							</div>

							<div>
								<h3 className='font-medium flex items-center'>
									<Clock className='h-4 w-4 mr-2 text-green-500' />
									Manajemen waktu
								</h3>
								<p className='text-sm text-gray-600 dark:text-gray-200 ml-6'>
									Setiap pertanyaan memiliki batas waktu tertentu. Pastikan untuk menjawab sebelum
									waktu habis. Anda dapat melihat waktu tersisa di bagian atas layar. Jika waktu
									habis, anda tidak akan bisa melanjutkan jawaban anda lagi.
								</p>
							</div>

							<div>
								<h3 className='font-medium flex items-center'>
									<TimerReset className='h-4 w-4 mr-2 text-green-500' />
									Mengkoreksi jawaban
								</h3>
								<p className='text-sm text-gray-600 dark:text-gray-200 ml-6'>
									Anda akan disediakan form untuk mengoreksi jawaban hasil rekaman Anda. Anda juga
									dapat mengulangi jawaban Anda jika perlu. Ini adalah kesempatan untuk memperbaiki
									atau memperjelas jawaban Anda.
								</p>
							</div>

							<div>
								<h3 className='font-medium flex items-center'>
									<BookOpen className='h-4 w-4 mr-2 text-green-500' />
									Tinjau Jawaban Anda
								</h3>
								<p className='text-sm text-gray-600 dark:text-gray-200 ml-6'>
									Setelah menyelesaikan wawancara, Anda dapat meninjau jawaban Anda. Ini adalah
									peluang untuk belajar dari pengalaman dan meningkatkan keterampilan wawancara
									Anda.
								</p>
							</div>
						</div>
					</CardContent>
				</Card>

				<Card className='mb-6 border-l-4 text-xl border-l-amber-500 bg-white dark:bg-gray-800'>
					<CardHeader className='pb-2'>
						<CardTitle className='flex items-center'>
							<AlertTriangle className='h-5 w-5 mr-2 text-amber-500' />
							Perlu diingat
						</CardTitle>
					</CardHeader>
					<CardContent>
						<ul className='space-y-2 text-sm text-gray-600 dark:text-gray-200'>
							<li className='flex'>
								<span className='mr-2'>•</span>
								<span>
									Ini adalah alat simulasi yang dirancang hanya untuk latihan dan tidak menjamin
									keberhasilan wawancara.
								</span>
							</li>
							<li className='flex'>
								<span className='mr-2'>•</span>
								<span>
									Jawaban Anda akan disimpan sementara selama sesi berlangsung, namun tidak akan
									tersimpan secara permanen setelah Anda keluar dari halaman ulasan.
								</span>
							</li>
							<li className='flex'>
								<span className='mr-2'>•</span>
								<span>
									Fitur perekaman mensimulasikan transkripsi dan mungkin tidak mencerminkan kualitas
									layanan transkripsi wawancara yang sebenarnya.
								</span>
							</li>
							<li className='flex'>
								<span className='mr-2'>•</span>
								<span>
									Pertanyaan-pertanyaan yang ada merupakan contoh umum dan mungkin tidak sama persis
									dengan apa yang akan Anda temui dalam wawancara yang sebenarnya.
								</span>
							</li>
						</ul>
					</CardContent>
				</Card>

				<Card className='mb-8 border-l-4 text-xl border-l-green-500 bg-white dark:bg-gray-800'>
					<CardHeader className='pb-2'>
						<CardTitle className='flex items-center'>
							<CheckCircle className='h-5 w-5 mr-2 text-green-500' />
							Tips selama Simulasi Wawancara
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className='grid md:grid-cols-2 gap-4'>
							<div className='bg-green-50 p-3 rounded-md'>
								<h3 className='text-sm font-medium text-green-800 mb-1'>Ringkas</h3>
								<p className='text-xs text-gray-600'>
									Tujukan jawaban yang jelas dan terfokus yang langsung menjawab pertanyaan tanpa
									bertele-tele.
								</p>
							</div>

							<div className='bg-green-50 p-3 rounded-md'>
								<h3 className='text-sm font-medium text-green-800 mb-1'>Gunakan Metode STAR</h3>
								<p className='text-xs text-gray-600'>
									Untuk pertanyaan-pertanyaan perilaku: Situasi, Tugas, Tindakan, Hasil. Susunlah
									jawaban Anda untuk menunjukkan proses Anda.
								</p>
							</div>

							<div className='bg-green-50 p-3 rounded-md'>
								<h3 className='text-sm font-medium text-green-800 mb-1'>Perhatikan waktu</h3>
								<p className='text-xs text-gray-600'>
									Perhatikan pengatur waktu untuk memastikan Anda tidak berbicara terlalu lama atau
									terlalu singkat untuk setiap pertanyaan.
								</p>
							</div>

							<div className='bg-green-50 p-3 rounded-md'>
								<h3 className='text-sm font-medium text-green-800 mb-1'>Manfaatkan Tips</h3>
								<p className='text-xs text-gray-600'>
									Gunakan fitur tips (<HelpCircle className='h-3 w-3 inline' />) yang tersedia pada
									setiap pertanyaan untuk membantu Anda memberikan jawaban terbaik dan lebih terarah
									selama wawancara.
								</p>
							</div>
						</div>
					</CardContent>
				</Card>

				<div className='flex justify-center'>
					<Link href='/start'>
						<Button className='bg-blue-500 text-white hover:bg-blue-600 border py-2 px-4 rounded font-medium text-sm'>
							Mulai Simulasi Wawancara
						</Button>
					</Link>
				</div>
			</div>
		</div>
	);
}
