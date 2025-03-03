import { ChevronLeftIcon, ChevronRightIcon, TrashIcon } from "lucide-react";
import Image from "next/image";
import { useContext } from "react";

import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/helpers/format-currency";

import { CartContext, CartProduct } from "../contexts/cart";

interface CartItemProps {
  product: CartProduct;
}

const CartProductItem = ({ product }: CartItemProps) => {
  const { decreaseProductQuantity, increaseProductQuantity, removeProduct } =
    useContext(CartContext);

  return (
    <div className="flex items-center justify-between rounded-xl p-3 transition-colors duration-200 hover:bg-gray-50">
      {/* Product Info + Controls */}
      <div className="flex items-center gap-4">
        {/* Product Image */}
        <div className="relative h-24 w-24 overflow-hidden rounded-lg bg-gray-100 shadow-sm">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 hover:scale-110"
          />
        </div>

        {/* Product Details */}
        <div className="space-y-2">
          <p className="max-w-[200px] truncate text-sm font-medium text-gray-800">
            {product.name}
          </p>

          <p className="text-base font-bold text-gray-900">
            {formatCurrency(product.price)}
          </p>

          {/* Quantity Controls */}
          <div className="mt-2 flex items-center gap-2">
            <Button
              className="h-8 w-8 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200"
              variant="outline"
              onClick={() => decreaseProductQuantity(product.id)}
            >
              <ChevronLeftIcon size={16} />
            </Button>

            <p className="w-8 text-center font-medium">{product.quantity}</p>

            <Button
              className="h-8 w-8 rounded-full bg-gray-800 text-white hover:bg-gray-900"
              variant="destructive"
              onClick={() => increaseProductQuantity(product.id)}
            >
              <ChevronRightIcon size={16} />
            </Button>
          </div>
        </div>
      </div>

      {/* Delete Button */}
      <Button
        className="h-9 w-9 rounded-full text-gray-500 transition-colors hover:bg-red-50 hover:text-red-500"
        variant="outline"
        onClick={() => removeProduct(product.id)}
      >
        <TrashIcon size={18} />
      </Button>
    </div>
  );
};

export default CartProductItem;
