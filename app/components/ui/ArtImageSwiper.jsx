'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const smallImages = [
  '/images/carousel/san-3178909_640.jpg',
  '/images/carousel/amsterdam-3158853_640.jpg',
  '/images/carousel/tower-bridge-4811424_640.jpg',
  '/images/carousel/windmill-3901896_640.jpg',
  '/images/carousel/hotel-1640201_640.jpg',
];

const largeImages = [
  '/images/museums/24969443_m.jpg',
  '/images/museums/32290008_m.jpg',
  '/images/museums/25044639_m.jpg',
  '/images/museums/32648975_m.jpg',
  '/images/museums/26696210_m.jpg',
];

export default function ImageSwiper() {
  const [index, setIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(true);
  const images = isMobile ? smallImages : largeImages;

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [images]);

  return (
    <>
      <div className="w-full h-[60vh] xl:h-[85vh] relative overflow-hidden">
        <AnimatePresence mode='wait'>
          <motion.div
            key={images[index]}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Image
              src={images[index]}
              alt={`BackgroundImage-${index}`}
              fill
              className="object-top"
              sizes="100vw"
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
}