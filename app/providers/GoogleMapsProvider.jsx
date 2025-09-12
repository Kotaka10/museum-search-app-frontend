'use client';

import { LoadScript } from "@react-google-maps/api";
import Image from "next/image";

export default function GoogleMapsProvider({ children }) {
  return (
    <LoadScript
      googleMapsApiKey={process.env.NEXT_PUBLIC_MAPS_API_KEY}
      loadingElement={
        <div className="relative w-full h-full">
          <Image  
              src="/images/placeholderImage/abstract-surface-textures-white-concrete-stone-wall.jpg"
              alt="placeholderWhiteImage"
              fill
              className="object-cover"
          />
        </div>
      }
    >
      {children}
    </LoadScript>
  );
}