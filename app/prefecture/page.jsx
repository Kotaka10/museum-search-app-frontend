import FilteredPrefecture from '@/app/prefecture/FilteredPrefecture';

export default async function FilteredPrefecturePage({ searchParams }) {
    const params = await searchParams;
	const prefecture = params.prefecture ?? "";
	const page = params.page ?? 0;
	const size = 20;
	const sortKey = params.sort ?? "startDate";

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/museums/prefecture/${encodeURIComponent(prefecture)}?page=${page}&size=${size}&sort=${sortKey},asc`, {
                    next: { revalidate: 60 },
                });
    if (!res.ok) {
        throw new Error('美術館を取得でません');
    }
    const filteredMuseums = await res.json();

    return <FilteredPrefecture filteredMuseums={filteredMuseums} prefecture={prefecture} />
}