'use client';

import { useEffect, useState } from "react";
import Image from "next/image";
import MuseumListCard from "@/app/components/common/MuseumListCard";

export default function SearchResult({ sortedMuseums, keyword }) {
	const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(sortedMuseums.totalPages || 0);
    const [museums, setMuseums] = useState(sortedMuseums.content || []);
	const [loading, setLoading] = useState(true);
	const [sortKey, setSortKey] = useState("startDate");

	useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [page, sortKey]);
	
	useEffect(() => {
		const fetchMuseums = async () => {
            setLoading(true);
			try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/museums/results?keyword=${keyword}&page=${page}&size=20&sort=${sortKey},asc`
                );
                const data = await res.json();
				setMuseums(data.content || []);
				setTotalPages(data.totalPages || 0);
			} catch (err) {
				console.error('美術館の取得に失敗しました:', err);
			} finally {
				setLoading(false);
			}
		};

		fetchMuseums();
	}, [page, sortKey, keyword]);

	if (loading) {
        return (
            <div className="relative w-full h-full">
                <Image  
                    src="/images/placeholderImage/abstract-surface-textures-white-concrete-stone-wall.jpg"
                    alt="placeholderWhiteImage"
                    fill
                    className="object-cover"
                />
            </div>
        );
    }

    return <MuseumListCard
		museums={museums}
		page={page}
		totalPages={totalPages}
		onPageChange={setPage}
		sortKey={sortKey}
		setSortKey={setSortKey}
	/>;
}