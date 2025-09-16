'use client';

import Link from "next/link";

export default function PrefectureCard() {

    const hokkaidouTouhoku = ['北海道', '青森', '秋田', '山形', '岩手', '宮城', '福島'];
    const kantou = ['東京', '神奈川', '埼玉', '千葉', '栃木', '茨城', '群馬'];
    const tyubu = ['愛知', '岐阜', '静岡', '新潟', '山梨', '長野', '石川', '富山', '福井'];
    const kansai = ['大阪', '京都', '兵庫', '滋賀', '和歌山', '三重'];
    const tyugokuSikoku = ['岡山', '広島', '鳥取', '島根', '山口', '香川', '徳島', '愛媛', '高知'];
    const kyusyuOkinawa = ['福岡', '佐賀', '長崎', '熊本', '大分', '長崎', '鹿児島', '沖縄'];
    
    const pageLeftRegionToPrefectures = {
        "北海道・東北": hokkaidouTouhoku,
        "関東": kantou,
        "中部": tyubu
    };

    const pageRightRegionToPrefectures = {
        "関西": kansai,
        "中国・四国": tyugokuSikoku,
        "九州・沖縄": kyusyuOkinawa
    };

    return (
        <>
            <h2 className="text-center text-3xl sm:text-5xl mt-12 mb-7">エリアから探す</h2>
            <div className="md:flex justify-center md:gap-20 mx-3">
                <div>
                    {Object.entries(pageLeftRegionToPrefectures).map(([region, prefectures]) => (
                        <div key={region} className="md:flex md:flex-col text-left">
                            <h3 className="text-start font-medium mb-2">{region}</h3>
                            <ul className="flex flex-wrap gap-x-6 list-none mb-2">
                                {prefectures.map((prefecture, index) => (
                                    <li
                                        key={index}
                                        className="text-orange-400 hover:text-blue-500 cursor-pointer mb-2"
                                    >
                                        <Link
                                            href={`/prefecture?prefecture=${encodeURIComponent(prefecture)}`}
                                            className="text-orange-400 hover:text-blue-500"
                                        >
                                            {prefecture}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                <div>
                    {Object.entries(pageRightRegionToPrefectures).map(([region, prefectures]) => (
                        <div key={region} className="md:flex md:flex-col text-left">
                            <h3 className="text-start font-medium mb-2">{region}</h3>
                            <ul className="flex flex-wrap gap-x-6 list-none mb-2">
                                {prefectures.map((prefecture, index) => (
                                    <li
                                        key={index}
                                        className="text-orange-400 hover:text-blue-500 cursor-pointer mb-2"
                                    >
                                        <Link
                                            href={`/prefecture?prefecture=${encodeURIComponent(prefecture)}`}
                                            className="text-orange-400 hover:text-blue-500"
                                        >
                                            {prefecture}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}