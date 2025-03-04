"use client";

import { Product } from "@prisma/client";
import { ChevronLeftIcon, HeartIcon, ScrollTextIcon } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";

interface ProductHeaderProps {
  product: Pick<Product, "name" | "imageUrl">;
}

// Component
const ProductHeader = ({ product }: ProductHeaderProps) => {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();
  const [isFavorite, setIsFavorite] = useState(false);

  const handleBackClick = () => router.back();
  const handleOrdersClick = () => router.push(`/${slug}/orders`);
  const toggleFavorite = () => setIsFavorite(!isFavorite);

  // Rendering
  return (
    <div className="relative min-h-[300px] w-full font-Kodchasan bg-gray-300">
      {/* Back button */}
      <Button
        size="icon"
        onClick={handleBackClick}
        className="absolute left-4 top-4 z-50 rounded-full bg-transparent shadow-sm shadow-black transition-all hover:bg-gray-600 active:scale-90 border-none text-black hover:text-white"
      >
        <ChevronLeftIcon className="h-5 w-5" />
      </Button>
      {/* ---------- */}

      {/* Product image with container */}
      <div className="absolute inset-0 flex items-center justify-center p-6">
        <div className="relative h-full max-h-64 w-full max-w-md">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-contain drop-shadow-xl"
            priority
          />
        </div>
      </div>
      {/* ---------- */}

      {/* Actions container */}
      <div className="absolute right-4 top-4 z-50 flex gap-4">
        {/* Favorite button */}
        <Button
          size="icon"
          className={`border-none rounded-full shadow-sm shadow-black ${
            isFavorite
              ? "bg-red-300 text-red-600 hover:bg-red-300"
              : "bg-transparent hover:bg-gray-600"
          } transition-all active:scale-90 text-black hover:text-white`}
          onClick={toggleFavorite}
        >
          <HeartIcon
            className={`${isFavorite ? "fill-red-600 text-red-600" : "active:scale-90"} h-5 w-5`}
          />
        </Button>

        {/* Orders button */}
        <Button
          size="icon"
          onClick={handleOrdersClick}
          className="rounded-full bg-transparent shadow-sm shadow-black transition-all hover:bg-gray-600 border-none active:scale-90 text-black hover:text-white"
        >
          <ScrollTextIcon className="h-5 w-5" />
        </Button>
      </div>
      {/* ---------- */}
    </div>
  );
};

export default ProductHeader;
