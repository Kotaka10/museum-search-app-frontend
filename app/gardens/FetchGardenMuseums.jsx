'use client';

import { useEffect, useState } from "react";
import Image from "next/image";
import MuseumListCard from "@/app/components/common/MuseumListCard";

export default function FetchGardenMuseums({ filteredGardens, garden }) {
    const size = 20;
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(filteredGardens.totalPages || 0);
    const [museums, setMuseums] = useState(filteredGardens.content || []);
    const [loading, setLoading] = useState(true);
    const [sortKey, setSortKey] = useState("startDate");

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [page, sortKey]);

    useEffect(() => {
        const fetchMuseums = async () => {
            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/museums/${encodeURIComponent(garden)}?page=${page}&size=${size}&sort=${sortKey},asc`,
                {
                    next: { revalidate: 60 },
                });
                const data = await res.json();
                setMuseums(data.content);
                setTotalPages(data.totalPages);
            } catch (err) {
                console.log('データ取得に失敗しました' + err.message);
            } finally {
                setLoading(false);
            }
        }

        if (garden) fetchMuseums();
    }, [garden, page, sortKey]);

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