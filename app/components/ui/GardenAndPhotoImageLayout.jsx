'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useAuth } from '@/app/context/AuthContext';

export default function GardenImageLayout() {
	const [museums, setMuseums] = useState([]);
	const { token } = useAuth();

	useEffect(() => {
		const fetchMuseums = async () => {
		    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/museums/all`, {
			  headers: {
                "Authorization": `Bearer ${token}`
            },
		    });
		    if (!res.ok) {
			  throw new Error('美術館の取得に失敗しました');
		    }
		    const data = await res.json();
		    setMuseums(data);
		}
	
		fetchMuseums();
	}, []);

	return (
		<div className="mb-2">
			<h2 className="text-center text-3xl sm:text-5xl mt-12">庭園・写真館</h2>
      		<h3 className="text-center text-lg text-gray-600 mt-4 mx-2">画像をクリックすると詳細ページに遷移します</h3>
			<div
				className="
					w-full aspect-[5/7] sm:h-screen mb-8 sm:mb-0 gap-2 items-center justify-center mx-auto
					grid grid-cols-2 grid-rows-2 p-4 xl:flex
				"
			>
				{museums
					.filter(museum =>
						[
						'/images/exhibition-image/写真と肖像.jpg',
						'/images/exhibition-image/55sen.jpg',
						'https://museum-search-app-theta.vercel.app/images/exhibition-image/rikugien.JPG',
						'https://museum-search-app-theta.vercel.app/images/exhibition-image/koishikawa.JPG'
						].includes(museum.exhibitionImage)
					)
					.map((museum, i) => (
						<div 
							key={i}
							className="
								relative w-full h-full sm:w-full sm:h-[90%] xl:w-[23%] xl:h-[70%] rounded-xl
							"
						>
							<Link
								key={museum.id}
								href={`museums/${museum.id}`}
								className="cursor-pointer"
							>
								<Image
									src={museum.exhibitionImage}
									alt={museum.name}
									fill
									className="object-contain"
									sizes="100vw"	
								/>
							</Link>
						</div>
				))}
			</div>
			<div className="flex flex-col gap-1 text-right text-xl mr-4 mb-6">
				<Link
					href={`/gardens?garden=${encodeURIComponent("庭園")}`} 
					className="text-orange-500 hover:text-blue-500 hover:cursor-pointer"
				>
					庭園を探す
				</Link>
				<Link
					href={`/photos?photo=${encodeURIComponent("写真館")}`} 
					className="text-orange-500 hover:text-blue-500 hover:cursor-pointer"
				>
					写真館を探す
				</Link>
			</div> 
		</div>
	)
}