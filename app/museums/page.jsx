import SearchResult from '@/app/museums/SearchResult';

export default async function SearchResultPage({ searchParams }) {
	const params = await searchParams;
	const keyword = params.keyword ?? "";
	const page = params.page ?? 0;
	const size = 20;
	const sortKey = params.sort ?? "startDate";

	const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/museums/results?keyword=${keyword}&page=${page}&size=${size}&sort=${sortKey},asc`, {
					next: { revalidate: 60 },
				});
	
	if (!res.ok) {
		throw new Error('美術館を取得でません');
	}
	const sortedMuseums = await res.json();

	return <SearchResult sortedMuseums={sortedMuseums} keyword={keyword} />
}