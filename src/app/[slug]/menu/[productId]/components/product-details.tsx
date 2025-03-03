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

  return (
    <>
      <div className="relative z-50 mt-[-1.5rem] flex flex-auto flex-col overflow-hidden rounded-t-3xl bg-white p-6 shadow-lg">
        <div className="flex-auto overflow-hidden">
          {/* Restaurant Info */}
          <div className="mb-3 flex items-center gap-2">
            <div className="relative h-6 w-6 overflow-hidden rounded-full border border-slate-200">
              <Image
                src={product.restaurant.avatarImageUrl}
                alt={product.restaurant.name}
                fill
                className="object-cover"
              />
            </div>
            <p className="text-xs font-medium text-slate-500">
              {product.restaurant.name}
            </p>
            <Badge
              variant="outline"
              className="ml-auto border-green-200 bg-green-50 px-2 py-0 text-xs text-green-600"
            >
              <ClockIcon size={12} className="mr-1" />
              15-25 min
            </Badge>
          </div>

          {/* Product Name & Highlights */}
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-slate-800">
              {product.name}
            </h2>
          </div>

          {/* Price & Quantity Selector */}
          <div className="mt-6 flex items-center justify-between rounded-xl bg-slate-50 p-4">
            <div>
              <p className="mb-1 text-xs text-slate-500">Preço</p>
              <h3 className="text-2xl font-bold text-slate-800">
                {formatCurrency(totalPrice)}
              </h3>
              {quantity > 1 && (
                <p className="text-xs text-slate-500">
                  {formatCurrency(product.price)} cada
                </p>
              )}
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="icon"
                className="h-10 w-10 rounded-full border-slate-300 text-slate-700"
                onClick={handleDecreaseQuantity}
              >
                <ChevronLeftIcon size={16} />
              </Button>
              <p className="w-6 text-center text-lg font-semibold">
                {quantity}
              </p>
              <Button
                variant="default"
                size="icon"
                className="h-10 w-10 rounded-full"
                onClick={handleIncreaseQuantity}
              >
                <ChevronRightIcon size={16} />
              </Button>
            </div>
          </div>

          <ScrollArea className="mt-6 max-h-64 pr-4">
            {/* Description */}
            <div className="space-y-3">
              <h4 className="flex items-center gap-2 font-semibold text-slate-800">
                <InfoIcon size={18} />
                Sobre
              </h4>
              <p className="text-sm leading-relaxed text-slate-600">
                {product.description}
              </p>
            </div>

            <Separator className="my-6" />

            {/* Ingredients */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <ChefHatIcon size={18} className="text-slate-700" />
                <h4 className="font-semibold text-slate-800">Ingredientes</h4>
              </div>
              <ul className="grid grid-cols-1 gap-2 pl-2">
                {product.ingredients.map((ingredient) => (
                  <li
                    key={ingredient}
                    className="flex items-center gap-2 text-sm text-slate-600"
                  >
                    <div className="h-1.5 w-1.5 rounded-full bg-slate-400" />
                    {ingredient}
                  </li>
                ))}
              </ul>
            </div>
          </ScrollArea>
        </div>

        <div className="mt-6 border-t pt-4">
          <Button
            className="h-12 w-full rounded-full text-base font-semibold shadow-md transition-all hover:shadow-lg"
            onClick={handleAddToCart}
          >
            Adicionar à sacola • {formatCurrency(totalPrice)}
          </Button>
        </div>
      </div>
      <CartSheet />
    </>
  );
};

export default ProductDetails;
