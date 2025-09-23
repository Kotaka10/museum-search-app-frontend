'use client';

import MuseumCommentSection from '@/app/comments/MuseumCommentSection';
import DetailRow from '@/app/components/common/DetailRow';
import MapWrapper from '@/app/wrapper/MapWrapper';
import { useAuth } from '@/app/context/AuthContext';
import ViewedMuseums from '@/app/components/ui/ViewedMuseums';
import LocalViewedMuseums from '@/app/components/ui/LocalViewedMuseums';
import Link from 'next/link';
import Image from 'next/image';

const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    if (isNaN(date)) return "";

    return date.toLocaleDateString("ja-JP", {
        year: "numeric",
        month: "long",
        day: "numeric",
        weekday: "short"
    });
};

export default function MuseumDetailCard({ museum }) {
	const { user } = useAuth();
	const value = `${formatDate(museum.startDate)} ~ ${formatDate(museum.endDate)}`;

	return (
		<main className="p-6">
			<div className="flex justify-center items-center mb-8">
				<div className="relative w-[400px] h-[300px] sm:h-[500px]">
					{museum.exhibitionImage && museum.exhibitionImage.trim() !== "" && (
						<Image
							src={museum.exhibitionImage}
							alt={museum.exhibition}
							fill
							className="object-contain"
						/>
					)}
				</div>
			</div>
			<DetailRow label="画像提供" value={museum.imageProvider} />
			<h3 className="text-xl font-bold mb-4">「{museum.exhibition}」</h3>
			<p className="text-lg font-medium mb-6">{museum.name}</p>
			<p className="mb-10">{museum.description}</p>
			<div className="border-t border-gray-300 rounded-md bg-white shadow-sm">
				<DetailRow label="スケジュール" value={value} />
				<DetailRow label="開館時間" value={museum.openingHours} />
				<DetailRow label="休日" value={museum.closingDays} />
				<DetailRow label="入館料" value={museum.admissionFee} />
				<DetailRow
					label="展覧会URL"
					value={
						museum.exhibitionUrl
						? <Link href={museum.exhibitionUrl}
							target="_blank" rel="noopener noreferrer"
							aria-label={museum.exhibition}
							className="text-blue-600"
						>
							{museum.exhibitionUrl}
						</Link>
						: null
					}
				/>
				<DetailRow label="会場" value={museum.name} museumUrl={museum.museumUrl} />
				<DetailRow label="住所" value={museum.address}>
					<MapWrapper
						latitude={museum.latitude}
						longitude={museum.longitude}
						name={museum.name}
					/>
				</DetailRow>
				<DetailRow label="アクセス" value={museum.access} />
				<DetailRow label="電話番号" value={museum.phoneNumber} />
			</div>

			<div className="mt-10">
				<MuseumCommentSection museumId={museum.id} />
			</div>

			<div className="mt-10">
				{user ? (
					<ViewedMuseums />
				) : (
					<LocalViewedMuseums />
				)}
			</div>
		</main>
	);
}