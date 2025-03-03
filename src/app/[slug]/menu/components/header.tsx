"use client";

import { Restaurant } from "@prisma/client";
import { ChevronLeftIcon, ScrollTextIcon } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

interface RestaurantHeaderProps {
  restaurant: Pick<Restaurant, "name" | "coverImageUrl">;
}

const RestaurantHeader = ({ restaurant }: RestaurantHeaderProps) => {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();
  const handleBackClick = () => router.back();
  const handleOrdersClick = () => router.push(`/${slug}/orders`);

  return (
    <div className="group relative h-[250px] w-full">
      {/* Gradient overlay for better text visibility */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/70 to-transparent" />

      {/* Back button with hover effect */}
      <Button
        variant="secondary"
        size="icon"
        className="absolute left-4 top-4 z-50 rounded-full bg-white/20 shadow-md backdrop-blur-sm transition-all duration-200 hover:bg-white/40"
        onClick={handleBackClick}
      >
        <ChevronLeftIcon className="text-white" />
      </Button>

      {/* Restaurant cover image with subtle zoom effect on hover */}
      <div className="h-full w-full overflow-hidden">
        <Image
          src={restaurant.coverImageUrl}
          alt={restaurant.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          priority
        />
      </div>

      {/* Orders button with hover effect */}
      <Button
        variant="secondary"
        size="icon"
        className="absolute right-4 top-4 z-50 rounded-full bg-white/20 shadow-md backdrop-blur-sm transition-all duration-200 hover:bg-white/40"
        onClick={handleOrdersClick}
      >
        <ScrollTextIcon className="text-white" />
      </Button>

      {/* Restaurant name */}
      <div className="absolute bottom-4 left-4 z-20">
        <h1 className="text-2xl font-bold text-white drop-shadow-md">
          {restaurant.name}
        </h1>
      </div>
    </div>
  );
};

export default RestaurantHeader;
