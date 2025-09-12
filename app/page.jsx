import AreaSearch from '@/app/components/explore/AreaSearch';
import ImageCarousel from '@/app/components/ui/ImageCarousel';
import SwipeOrExtendMuseumImage from '@/app/components/ui/SwipeOrExtendMuseumImage';
import GardenAndPhotoImageLayout from '@/app/components/ui/GardenAndPhotoImageLayout';
import ImageSwiper from '@/app/components/ui/ImageSwiper';

export default async function MuseumHomePage() {
  return (
    <main>
      <ImageSwiper />
      <AreaSearch />
      <ImageCarousel />
      <SwipeOrExtendMuseumImage />
      <GardenAndPhotoImageLayout />
    </main>
  );
}