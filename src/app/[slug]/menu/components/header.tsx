"use client";

import { Restaurant } from "@prisma/client";
import { ChevronLeftIcon, ScrollTextIcon } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

interface RestaurantHeaderProps {
  restaurant: Pick<Restaurant, "name" | "coverImageUrl">;
}

// Component
const RestaurantHeader = ({ restaurant }: RestaurantHeaderProps) => {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();
  const handleBackClick = () => router.back();
  const handleOrdersClick = () => router.push(`/${slug}/orders`);

  // Rendering
  return (
    <div className="group relative h-[250px] w-full font-Kodchasan">
      {/* Gradient overlay for better text visibility */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/70 to-transparent" />

      {/* Back button with hover effect */}
      <Button
        size="icon"
        onClick={handleBackClick}
        className="absolute left-4 top-4 z-50 rounded-full bg-transparent shadow-sm shadow-black transition-all hover:bg-gray-300 active:scale-90 border-none"
      >
        <ChevronLeftIcon className="text-black h-5 w-5" />
      </Button>

      {/* Restaurant cover image with subtle zoom effect on hover */}
      <div className="h-full w-full overflow-hidden">
        <Image
          src={restaurant.coverImageUrl}
          alt={restaurant.name}
          fill
          className="object-cover transition-all group-hover:scale-110"
          priority
        />
      </div>

      {/* Orders button with hover effect */}
      <Button
        size="icon"
        onClick={handleOrdersClick}
        className="absolute right-4 top-4 z-50 rounded-full bg-transparent shadow-sm shadow-black transition-all hover:bg-gray-300 active:scale-90 border-none"
      >
        <ScrollTextIcon className="text-black h-5 w-5" />
      </Button>
    </div>
  );
};

export default RestaurantHeader;
