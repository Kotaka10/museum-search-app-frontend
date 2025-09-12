import FetchPhotoMuseums from '@/app/photos/FetchPhotoMuseums';

export default async function FilteredPrefecturePage({ searchParams }) {
    const params = await searchParams;
    const photo = params.photo ?? "";
    const page = params.page ?? 0;
    const size = 20;
    const sortKey = params.sort ?? "startDate";

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/museums/gardens/${encodeURIComponent(photo)}?page=${page}&size=${size}&sort=${sortKey},asc`, {
                    next: { revalidate: 60 },
                });
    if (!res.ok) {
        throw new Error('写真館を取得でません');
    }
    const filteredPhotos = await res.json();

    return <FetchPhotoMuseums filteredPhotos={filteredPhotos} photo={photo} />
}