import AreaSearch from '@/app/components/explore/AreaSearch';
import ImageCarousel from '@/app/components/ui/ImageCarousel';
import SwipeOrExtendMuseumImage from '@/app/components/ui/SwipeOrExtendMuseumImage';
import GardenAndPhotoImageLayout from '@/app/components/ui/GardenAndPhotoImageLayout';
import ArtImageSwiper from '@/app/components/ui/ArtImageSwiper';

export default async function MuseumHomePage() {
  return (
    <main>
      <ArtImageSwiper />
      <AreaSearch />
      <ImageCarousel />
      <SwipeOrExtendMuseumImage />
      <GardenAndPhotoImageLayout />
    </main>
  );
}