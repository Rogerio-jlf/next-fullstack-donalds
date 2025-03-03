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

  return (
    <div className="relative z-50 mt-[-1.5rem] rounded-t-3xl bg-white shadow-lg">
      {/* Restaurant Info Section */}
      <div className="border-b p-5">
        <div className="flex items-center gap-3">
          <div className="relative h-14 w-14 overflow-hidden rounded-full border-2 border-primary shadow-sm">
            <Image
              src={restaurant.avatarImageUrl}
              alt={restaurant.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-bold">{restaurant.name}</h2>
            <p className="line-clamp-1 text-xs text-muted-foreground">
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

              <div className="flex items-center gap-1 text-xs text-slate-500">
                <MapPinIcon size={12} />
                <p>1.2 km</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Scroll Section */}
      <ScrollArea className="w-full border-b">
        <div className="flex w-max space-x-2 p-4">
          {restaurant.menuCategory.map((category) => (
            <Button
              onClick={() => handleCategoryClick(category)}
              key={category.id}
              variant={getCategoryButtonVariant(category)}
              size="sm"
              className={`rounded-full transition-all ${
                selectedCategory.id === category.id
                  ? "shadow-md"
                  : "hover:bg-slate-100"
              }`}
            >
              {category.name}
              {category.products.length > 0 && (
                <Badge
                  variant="outline"
                  className="ml-2 bg-slate-100 text-xs font-normal"
                >
                  {category.products.length}
                </Badge>
              )}
            </Button>
          ))}
        </div>
        <ScrollBar orientation="horizontal" className="h-2" />
      </ScrollArea>

      {/* Category Title and Products */}
      <div className="bg-slate-50">
        <div className="flex items-center justify-between border-b px-5 py-3">
          <h3 className="font-bold text-slate-800">{selectedCategory.name}</h3>
          <span className="text-xs text-muted-foreground">
            {selectedCategory.products.length}{" "}
            {selectedCategory.products.length === 1 ? "item" : "itens"}
          </span>
        </div>
        <Products products={selectedCategory.products} />
      </div>

      {/* Cart Summary Bar */}
      {products.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 flex w-full items-center justify-between border-t bg-white px-5 py-4 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
          <div>
            <p className="text-xs font-medium text-muted-foreground">
              Total dos pedidos
            </p>
            <p className="text-base font-semibold text-slate-900">
              {formatCurrency(total)}
              <span className="ml-1 text-xs font-normal text-muted-foreground">
                • {totalQuantity} {totalQuantity > 1 ? "itens" : "item"}
              </span>
            </p>
          </div>
          <Button
            onClick={toggleCart}
            className="px-6 shadow-md transition-all hover:shadow-lg"
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
