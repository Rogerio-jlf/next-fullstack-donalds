import { ChevronLeftIcon, ChevronRightIcon, TrashIcon } from "lucide-react";
import Image from "next/image";
import { useContext } from "react";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { formatCurrency } from "@/helpers/format-currency";

import { CartContext, CartProduct } from "../contexts/cart";

interface CartItemProps {
  product: CartProduct;
}

// Component
const CartProductItem = ({ product }: CartItemProps) => {
  const { decreaseProductQuantity, increaseProductQuantity, removeProduct } =
    useContext(CartContext);

  // Rendering
  return (
    <div className="flex items-center justify-between rounded-lg p-3 font-Kodchasan transition-all hover:bg-gray-100">
      {/* Product Info + Controls */}
      <div className="flex items-center gap-6">
        {/* Product Image */}
        <div className="relative h-24 w-24 overflow-hidden rounded-lg bg-transparent">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>
        {/* ---------- */}

        {/* Product Details */}
        <div className="space-y-2">
          <p className="max-w-[200px] truncate text-sm font-semibold text-gray-600">
            {product.name}
          </p>

          <p className="text-xl font-bold italic text-gray-600">
            {formatCurrency(product.price)}
          </p>

          {/* Quantity Controls */}
          <div className="mt-2 flex items-center gap-2">
            <Button
              onClick={() => decreaseProductQuantity(product.id)}
              className="h-8 w-8 rounded-full border-none bg-transparent text-black shadow-sm shadow-black transition-all hover:bg-gray-300 active:scale-90"
            >
              <ChevronLeftIcon className="h-5 w-5" />
            </Button>

            <p className="w-8 text-center font-bold text-gray-600">{product.quantity}</p>

            <Button
              onClick={() => increaseProductQuantity(product.id)}
              className="h-8 w-8 rounded-full border-none bg-red-600 text-white shadow-sm shadow-black transition-all hover:bg-red-900 active:scale-90"
            >
              <ChevronRightIcon className="h-5 w-5" />
            </Button>
          </div>
        </div>
        {/* ---------- */}
      </div>

      {/* BUTTON DELETE */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger className="relative">
            <Button
              className="h-9 w-9 rounded-full border-none bg-transparent text-gray-600 shadow-sm shadow-black transition-all hover:bg-red-600 hover:text-white"
              variant="outline"
              onClick={() => removeProduct(product.id)}
            >
              <TrashIcon size={18} />
            </Button>
          </TooltipTrigger>
          <TooltipContent className="rounded-lg border-none bg-red-600 p-2 text-white transition-all">
            <p className="text-xs">Excluir item</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      {/* ---------- */}
    </div>
  );
};

export default CartProductItem;
