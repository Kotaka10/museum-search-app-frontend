'use client';

import { motion, AnimatePresence } from 'framer-motion';
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
        const [first, ...rest] = prev;
        return [...rest, first];
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
          "/images/exhibition-image/昆虫展.png",
          "https://museum-search-app-theta.vercel.app/images/exhibition-image/kawa.PNG"
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
      {threshold: 0.8}
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
      <h3 className="text-center text-lg text-gray-600 mt-4 mx-2 mb-12">画像をクリックすると詳細ページに遷移します</h3>
      <div className="lg:hidden relative w-full h-[300px] sm:h-[500px] flex justify-center items-center mb-8">
        <AnimatePresence initial={false}>
          {images.slice(0, 4).map((museum, index) => {
              const front = index === 0;
              const offsetX = index * 20;
              const scale = 1 - index * 0.03;

              if (museum.exhibitionImage !== null) {
                return (
                    <motion.div
                      key={museum.id}
                      className="absolute"
                      drag={front ? "x" : false}
                      dragConstraints={{ left: 0, right: 0}}
                      dragElastic={0.5}
                      style={{ zIndex: images.length - index, touchAction: "pan-y"}}
                      onDragEnd={
                        front
                          ? (_, info) => {
                              const offsetX = info.offset?.x ?? 0;
                              const velocityX = info.velocity?.x ?? 0;

                              if (offsetX > 200 || velocityX > 500) {
                                handleSwipe(1);
                              } else if (offsetX < -200 || velocityX < -500) {
                                handleSwipe(-1);
                              }
                            }
                          : undefined
                      }
                      initial={{ scale: 0.95, opacity: 0, x: offsetX }}
                      animate={{ scale, opacity: 1, x: offsetX }}
                      exit={
                        front
                          ? {
                              x: swipeDirection > 0 ? 150 : -150,
                              opacity: 0,
                            }
                          : undefined
                      }
                      transition={{ duration: 0.5 }}
                    >
                      <motion.div
                        ref={front ? targetRef : null}
                        animate={showHint && front ? { x: [0, -10, 0, 10, 0]} : {}}
                        transition={showHint ? { duration: 4 } : {}}
                      >
                        <Link
                          href={`museums/${museum.id}`}
                          className="
                            rounded shadow hover:shadow-lg transition-shadow duration-200 cursor-pointer
                          "
                        >
                          <Image
                            src={museum.exhibitionImage}
                            alt={museum.name}
                            width={0}
                            height={0}
                            sizes="100vw"
                            className="rounded-lg shadow-lg w-[250px] sm:w-[350px] md:w-[400px] h-auto"
                          />
                        </Link>
                      </motion.div>

                      {front && showHint && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="absolute bottom-3 left-1/2 -translate-x-1/2 text-white bg-black/60 px-3 py-1 text-sm rounded"
                        >
                          左か右にスワイプ
                        </motion.div>
                      )}
                    </motion.div>
                )
              }
          })}
        </AnimatePresence>
      </div>
      <div className="hidden lg:flex lg:justify-center p-4 relative overflow-visible mb-8">
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