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

const ProductHeader = ({ product }: ProductHeaderProps) => {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();
  const [isFavorite, setIsFavorite] = useState(false);

  const handleBackClick = () => router.back();
  const handleOrdersClick = () => router.push(`/${slug}/orders`);
  const toggleFavorite = () => setIsFavorite(!isFavorite);

  return (
    <div className="relative min-h-[300px] w-full bg-slate-50">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-slate-100 to-white" />

      {/* Back button */}
      <Button
        variant="secondary"
        size="icon"
        className="absolute left-4 top-4 z-50 rounded-full bg-white/90 shadow-md backdrop-blur-sm transition-all duration-200 hover:bg-white"
        onClick={handleBackClick}
      >
        <ChevronLeftIcon className="text-slate-600" />
      </Button>

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

      {/* Actions container */}
      <div className="absolute right-4 top-4 z-50 flex gap-2">
        {/* Favorite button */}
        <Button
          variant="secondary"
          size="icon"
          className={`rounded-full ${
            isFavorite
              ? "bg-rose-50 text-rose-500 hover:bg-rose-100"
              : "bg-white/90 backdrop-blur-sm hover:bg-white"
          } shadow-md transition-all duration-200`}
          onClick={toggleFavorite}
        >
          <HeartIcon
            className={`${isFavorite ? "fill-rose-500 text-rose-500" : "text-slate-600"}`}
            size={18}
          />
        </Button>

        {/* Orders button */}
        <Button
          variant="secondary"
          size="icon"
          className="rounded-full bg-white/90 shadow-md backdrop-blur-sm transition-all duration-200 hover:bg-white"
          onClick={handleOrdersClick}
        >
          <ScrollTextIcon className="text-slate-600" size={18} />
        </Button>
      </div>

      {/* Product name tag */}
      <div className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-white via-white to-transparent px-4 pb-3 pt-16 text-center">
        <h1 className="text-xl font-bold text-slate-800">{product.name}</h1>
      </div>
    </div>
  );
};

export default ProductHeader;
