'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Mousewheel } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { useEffect, useState } from 'react';

export default function ImageCarousel() {
  const [museums, setMuseums] = useState([]);
  
  useEffect(() => {
    const fetchMuseums = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/museums/all`, {
        credentials: 'include',
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
    <>
      <h2 className="text-center text-3xl sm:text-5xl mt-12">美術館</h2>
      <h3 className="text-center text-lg text-gray-600 mt-4">画像をクリックすると詳細ページに遷移します</h3>
      <div className="m-7 overflow-x-hidden">
        <Swiper
          modules={[FreeMode, Navigation, Mousewheel]}
          navigation
          spaceBetween={30}
          breakpoints={{
            0: {
              slidesPerView: 1.5,
            },
            550: {
              slidesPerView: 2.5,
            },
            1024: {
              slidesPerView: 3.5,
            },
          }}
          freeMode={true}
          mousewheel={{
            forceToAxis: true, 
            sensitivity: 0.7,
            releaseOnEdges: true,
          }}
        >
          {museums.map((museum) => {
            const exhibitionImage = museum.exhibitionImage !== "/images/exhibition-image/1560030.jpg" &&
                                    museum.exhibitionImage !== "/images/exhibition-image/55sen.jpg" &&
                                    museum.exhibitionImage !== "/images/exhibition-image/昆虫展.png" &&
                                    museum.exhibitionImage !== "/images/exhibition-image/船と人類.jpg" &&
                                    museum.exhibitionImage !== "/images/exhibition-image/写真と肖像.jpg" &&
                                    museum.exhibitionImage !== "/images/exhibition-image/クジラの化石.png" &&
                                    museum.exhibitionImage !== "" &&
                                    museum.exhibitionImage !== null;
            if (exhibitionImage) {
              return (
                <SwiperSlide key={museum.id}>
                  <Link
                    key={museum.id}
                    href={`museums/${museum.id}`}
                    className="
                      block border p-4 rounded shadow hover:shadow-lg transition-shadow duration-200 bg-white
                    hover:bg-gray-50 cursor-pointer
                    "
                  >
                    <div className="w-full aspect-[5/7] relative">
                      <Image
                        src={museum.exhibitionImage}
                        alt={museum.name}
                        fill
                        className="object-contain rounded-lg"
                      />
                    </div>
                  </Link>
                </SwiperSlide>
              );
            }
            return null;
          })}
        </Swiper>
      </div>
      <div className="text-right text-xl mt-8 lg:mt-16 mr-4">
        <Link
          href={{ pathname: "/museums", query: { keyword: "美術館" } }} 
          className="text-orange-500 hover:text-blue-500"
        >
          美術館を探す
        </Link>
      </div>
    </>
  );
}