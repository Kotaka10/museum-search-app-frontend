'use client';

import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';

export default function SwipeOrFocusMuseumImage() {
  const [museums, setMuseums] = useState([]);
  const [images, setImages] = useState([]);
  const [swipeDirection, setSwipeDirection] = useState(0);
  const [showHint, setShowHint] = useState(true);
  const targetRef = useRef(null);

  const handleSwipe = (direction) => {
    setSwipeDirection(direction);
    setImages((prev) => {
      if (prev.length === 0) return prev;
      if (direction > 0) {
        const [first, ...rest] = prev;
        return [...rest, first];
      } else {
        const last = prev[prev.length - 1];
        const rest = prev.slice(0, prev.length - 1);
        return [last, ...rest];
      }
    });
    setShowHint(false);
  };

  useEffect(() => {
    const fetchMuseums = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/museums/all?t=${Date.now()}`, {
        credentials: 'include',
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error('美術館の取得に失敗しました');
      }
      const data = await res.json();
      const filtered = data.filter(museum =>
        [
          "/images/exhibition-image/クジラの化石.png",
          "/images/exhibition-image/船と人類.jpg",
          "/images/exhibition-image/昆虫展.png"
        ].includes(museum.exhibitionImage)
      );
      setMuseums(filtered);
      setImages(filtered);
    }

    fetchMuseums();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowHint(true);
          observer.disconnect();
        }
      },
      {threshold: 0.5}
    );

    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!showHint) return;
    const timer = setTimeout(() => setShowHint(false), 3000);
    return () => clearTimeout(timer);
  }, [showHint]);

  return (
    <div className="mb-8">
      <h2 className="text-center text-3xl sm:text-5xl mt-12">博物館</h2>
      <h3 className="text-center text-lg text-gray-600 mt-4 mb-12">画像をクリックすると詳細ページに遷移します</h3>
      <div className="xl:hidden relative w-full h-[300px] sm:h-[500px] flex justify-center items-center mb-8">
        <Swiper
          modules={[Pagination, Navigation]}
          spaceBetween={20}
          slidesPerView={1}
          pagination={{ clickable: true }}
          navigation
          className="rounded-lg shadow-lg"
        >
          {images.map((museum) => (
              <SwiperSlide key={museum.id}>
                <Link
                  href={`/museums/${museum.id}`}
                  className="block rounded shadow hover:shadow-lg transition-shadow duration-200"
                >
                  <Image
                    src={museum.exhibitionImage}
                    alt={museum.name}
                    width={400}
                    height={300}
                    sizes="100vw"
                    className="rounded-lg w-full h-auto object-cover"
                  />
                </Link>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
      <div className="hidden xl:flex p-4 relative overflow-visible mb-8">
        {museums.map((museum, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.1, zIndex: 10 }}
              transition={{ duration: 0.3 }}
              className="relative z-0 origin-center"
              style={{ marginLeft: i === 0 ? 0 : -50 }}
            >
              <Link
                key={museum.id}
                href={`museums/${museum.id}`}
                className="
                  block border p-4 rounded shadow hover:shadow-lg transition-shadow duration-200 bg-gray-100 cursor-pointer
                "
              >
                <Image
                  src={museum.exhibitionImage}
                  width={300}
                  height={400}
                  alt={museum.name}
                  className="rounded-lg"
                />
              </Link>
            </motion.div>
          ))}
      </div>
      <div className="text-right text-xl mt-12 sm:mt-16 mr-4">
        <Link
          href={{ pathname: "/museums", query: { keyword: "博物館" } }} 
          className="text-orange-500 hover:text-blue-500 hover:cursor-pointer"
        >
          博物館を探す
        </Link>
      </div>
    </div>
  );
}