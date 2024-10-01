"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image1 from "@/assets/Login/carousel1.jpg";
import Image2 from "@/assets/Login/carousel2.jpg";
import Image3 from "@/assets/Login/carousel3.jpg";
import Image from "next/image";

const cells = [
  {
    image: Image1,
    alt: "image1",
    caption: "",
  },
  {
    image: Image2,
    alt: "image2",
    caption: "",
  },
  {
    image: Image3,
    alt: "image3",
    caption: "",
  },
];

export function CarouselPlugin() {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnMouseEnter: true }),
  );

  return (
    <Carousel
      plugins={[plugin.current]}
      className="h-full w-full"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {cells.map((value, index) => (
          <CarouselItem key={index}>
            <div className="h-screen w-full p-3">
              <div className="relative h-full w-full">
                <Image
                  src={value.image}
                  alt={value.alt}
                  priority
                  fill
                  className="rounded-lg"
                />
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
