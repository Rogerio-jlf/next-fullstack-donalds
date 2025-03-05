"use client";

import { Prisma } from "@prisma/client";
import { ClockIcon, MapPinIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import { useContext, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { formatCurrency } from "@/helpers/format-currency";

import { CartContext } from "../contexts/cart";
import CartSheet from "./cart-sheet";
import Products from "./products";

interface RestaurantCategoriesProps {
  restaurant: Prisma.RestaurantGetPayload<{
    include: {
      menuCategory: {
        include: { products: true };
      };
    };
  }>;
}

type MenuCategoriesWithProducts = Prisma.MenuCategoryGetPayload<{
  include: { products: true };
}>;

// Component
const RestaurantCategories = ({ restaurant }: RestaurantCategoriesProps) => {
  const [selectedCategory, setSelectedCategory] =
    useState<MenuCategoriesWithProducts>(restaurant.menuCategory[0]);
  const { products, total, toggleCart, totalQuantity } =
    useContext(CartContext);

  const handleCategoryClick = (category: MenuCategoriesWithProducts) => {
    setSelectedCategory(category);
  };

  const getCategoryButtonVariant = (category: MenuCategoriesWithProducts) => {
    return selectedCategory.id === category.id ? "default" : "secondary";
  };

  // Rendering
  return (
    <div className="relative z-50 mt-[-1.5rem] rounded-t-3xl bg-white shadow-lg">
      {/* Restaurant Info Section */}
      <div className="border-b border-gray-300 p-5">
        <div className="flex items-center gap-3">
          {/* Image */}
          <div className="relative h-14 w-14 overflow-hidden rounded-full border-none">
            <Image
              src={restaurant.avatarImageUrl}
              alt={restaurant.name}
              fill
              className="object-cover"
            />
          </div>

          <div className="flex-1">
            <h2 className="text-lg font-bold">{restaurant.name}</h2>

            <p className="line-clamp-1 text-xs text-gray-600 font-medium">
              {restaurant.description}
            </p>

            <div className="mt-1 flex items-center gap-3">
              <div className="flex items-center gap-1 text-xs font-medium text-green-600">
                <ClockIcon size={12} className="fill-green-600" />

                <p>Aberto agora</p>
              </div>

              <div className="flex items-center gap-1 text-xs text-amber-500">
                <StarIcon size={12} className="fill-amber-500" />

                <p className="font-medium">4.8</p>
              </div>

              <div className="flex items-center gap-1 text-xs font-medium text-gray-600">
                <MapPinIcon size={12} />

                <p>1.2 km</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* ---------- */}

      {/* Categories Scroll Section */}
      <ScrollArea className="w-full border-b border-gray-300">
        <div className="flex w-max space-x-2 p-4">
          {restaurant.menuCategory.map((category) => (
            <Button
              onClick={() => handleCategoryClick(category)}
              key={category.id}
              variant={getCategoryButtonVariant(category)}
              size="sm"
              className={`rounded-full border-none shadow-sm shadow-black transition-all ${
                selectedCategory.id === category.id
                  ? "font-semibold text-black"
                  : "hover:bg-gray-300"
              }`}
            >
              {category.name}
              {category.products.length > 0 && (
                <Badge
                  variant="outline"
                  className="ml-2 bg-slate-100 text-xs font-semibold"
                >
                  {category.products.length}
                </Badge>
              )}
            </Button>
          ))}
        </div>
        <ScrollBar orientation="horizontal" className="h-2" />
      </ScrollArea>
      {/* ---------- */}

      {/* Category Title and Products */}
      <div>
        <div className="flex items-center justify-between border-b border-gray-300 px-5 py-3">
          <h3 className="font-bold text-black">{selectedCategory.name}</h3>
          <span className="text-xs text-black font-bold">
            {selectedCategory.products.length}{" "}
            {selectedCategory.products.length === 1 ? "item" : "itens"}
          </span>
        </div>
        <Products products={selectedCategory.products} />
      </div>
      {/* ---------- */}

      {/* Cart Summary Bar */}
      {products.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 flex w-full items-center justify-between bg-white px-5 py-4">
          <div>
            <p className="text-xs font-semibold text-black">
              Total dos pedidos
            </p>
            <p className="text-md font-bold text-black">
              {formatCurrency(total)}
              <span className="ml-1 text-xs font-bold text-black">
                - {totalQuantity} {totalQuantity > 1 ? "itens" : "item"}
              </span>
            </p>
          </div>

          <Button
            onClick={toggleCart}
            className="bg-red-600 px-6 font-semibold italic text-white border-none shadow-sm shadow-black transition-all hover:bg-red-900 active:scale-90"
          >
            Ver sacola
          </Button>
          <CartSheet />
        </div>
      )}
    </div>
  );
};

export default RestaurantCategories;
