'use client';

import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Mousewheel } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const images = [
  '/images/artworks/0000855965_OG.JPG',
  '/images/artworks/0000405625_OG.JPG',
  '/images/artworks/0000625031_OG.JPG',
  '/images/artworks/0000868046_OG.JPG',
  '/images/artworks/NG.M.00939 GP.jpg',
  '/images/artworks/publicdomainq-0009760slwiej.jpg',
  '/images/artworks/SK-A-2344- Het melkmeisje, Johannes Vermeer, ca. 1660.jpg',
  '/images/artworks/vangoghmuseum-s0031V1962-800.jpg',
];

export default function KansaiImageCarousel() {
  return (
    <div>
      <h2 className="text-center text-3xl sm:text-5xl my-12">関西の展覧会</h2>
      <div className="m-7 overflow-x-hidden">
        <Swiper
          modules={[FreeMode, Navigation, Mousewheel]}
          navigation
          spaceBetween={30}
          breakpoints={{
            0: {
              slidesPerView: 1.5,
            },
            500: {
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
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <div className="w-full aspect-[5/7]">
                <Image
                  src={image}
                  alt={`KansaiMuseumImage-${index}`}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="text-right text-xl mt-8 lg:mt-16 mr-4">
        <p className="text-orange-500 hover:text-blue-500">関西の展覧会を探す</p>
      </div>
    </div>
  );
}