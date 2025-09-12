import FetchGardenMuseums from '@/app/gardens/FetchGardenMuseums';

export default async function FilteredPrefecturePage({ searchParams }) {
    const params = await searchParams;
    const garden = params.garden ?? "";
    const page = params.page ?? 0;
    const size = 20;
    const sortKey = params.sort ?? "startDate";

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/museums/gardens/${encodeURIComponent(garden)}?page=${page}&size=${size}&sort=${sortKey},asc`, {
                    next: { revalidate: 60 },
                });
    if (!res.ok) {
        throw new Error('庭園を取得でません');
    }
    const filteredGardens = await res.json();

    return <FetchGardenMuseums filteredGardens={filteredGardens} garden={garden} />
}