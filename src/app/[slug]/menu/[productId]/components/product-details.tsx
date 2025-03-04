"use client";

import { Prisma } from "@prisma/client";
import {
  ChefHatIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ClockIcon,
  InfoIcon,
} from "lucide-react";
import Image from "next/image";
import { useContext, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/helpers/format-currency";

import CartSheet from "../../components/cart-sheet";
import { CartContext } from "../../contexts/cart";

interface ProductDetailsProps {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: {
          name: true;
          avatarImageUrl: true;
        };
      };
    };
  }>;
}

// Component
const ProductDetails = ({ product }: ProductDetailsProps) => {
  const { toggleCart, addProduct } = useContext(CartContext);
  const [quantity, setQuantity] = useState<number>(1);

  const handleDecreaseQuantity = () => {
    setQuantity((prev) => {
      if (prev === 1) {
        return 1;
      }
      return prev - 1;
    });
  };

  const handleIncreaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleAddToCart = () => {
    addProduct({
      ...product,
      quantity,
    });
    toggleCart();
  };

  const totalPrice = product.price * quantity;

  // Rendering
  return (
    <>
      <div className="relative z-50 flex flex-auto flex-col overflow-hidden p-6 font-Kodchasan rounded-t-3xl bg-white shadow-lg">
        <div className="flex-auto overflow-hidden">
          {/* Restaurant Info */}
          <div className="mb-6 flex items-center gap-2">
            {/* Image */}
            <div className="relative h-6 w-6 overflow-hidden rounded-full border-none">
              <Image
                src={product.restaurant.avatarImageUrl}
                alt={product.restaurant.name}
                fill
                className="object-cover"
              />
            </div>

            <p className="text-xs font-bold text-gray-600">
              {product.restaurant.name}
            </p>

            <Badge
              className="ml-auto bg-green-600 px-2 py-1 text-xs text-black font-bold shadow-sm shadow-black"
            >
              <ClockIcon size={12} className="mr-1" />
              15 - 25 min
            </Badge>
          </div>
          {/* ---------- */}

          {/* Product Name & Highlights */}
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-gray-600">
              {product.name}
            </h2>
          </div>
          {/* ---------- */}

          {/* Price & Quantity Selector */}
          <div className="mt-2 flex items-center justify-between p-4 border-b border-gray-300">
            <div>
              <p className="mb-1 text-sm text-gray-600 font-semibold">Preço</p>

              <h3 className="text-2xl font-bold text-gray-600">
                {formatCurrency(totalPrice)}
              </h3>

              {quantity > 1 && (
                <p className="text-xs text-gray-600 font-medium">
                  {formatCurrency(product.price)} cada
                </p>
              )}
            </div>

            <div className="flex items-center gap-3">
              <Button
                size="icon"
                onClick={handleDecreaseQuantity}
                className="h-10 w-10 rounded-full bg-transparent shadow-sm shadow-black transition-all hover:bg-gray-300 active:scale-90 border-none"
              >
                <ChevronLeftIcon className="text-black h-5 w-5"/>
              </Button>

              <p className="w-6 text-center text-lg font-bold text-gray-600">
                {quantity}
              </p>

              <Button
                size="icon"
                onClick={handleIncreaseQuantity}
                className="h-10 w-10 rounded-full bg-red-600 shadow-sm shadow-black transition-all hover:bg-red-900 active:scale-90 border-none"
              >
                <ChevronRightIcon className="text-white h-5 w-5"/>
              </Button>
            </div>
          </div>
          {/* ---------- */}
          
          {/* Description & Ingredients */}
          <ScrollArea className="mt-6 pr-4">
            {/* Description */}
            <div className="space-y-3">
              <h4 className="flex items-center gap-2 font-semibold text-gray-600 text-md">
                <InfoIcon className="h-4 w-4" />
                Sobre
              </h4>

              <p className="text-sm leading-relaxed text-slate-600 font-medium">
                {product.description}
              </p>
            </div>

            <Separator className="my-6 bg-gray-300" />

            {/* Ingredients */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <ChefHatIcon className="text-gray-600 h-4 w-4" />

                <h4 className="font-semibold text-gray-600 text-md">Ingredientes</h4>
              </div>

              <ul className="grid grid-cols-1 gap-2 pl-2">
                {product.ingredients.map((ingredient, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-2 text-sm text-gray-600 font-medium"
                  >
                    <div className="h-1.5 w-1.5 rounded-full bg-gray-600" />
                    {ingredient}
                  </li>
                ))}
              </ul>
            </div>
          </ScrollArea>
          {/* ---------- */}
        </div>
        
        {/* Add to Cart Button */}
        <div className="mt-6 border-t border-gray-300 pt-4">
          <Button
            onClick={handleAddToCart}
            className="h-12 w-full rounded-lg bg-red-600 text-md font-semibold italic text-white shadow-sm shadow-black transition-all hover:bg-red-900 active:scale-90 border-none"
          >
            Adicionar à sacola - {formatCurrency(totalPrice)}
          </Button>
        </div>
        {/* ---------- */}
      </div>
      <CartSheet />
    </>
  );
};

export default ProductDetails;
