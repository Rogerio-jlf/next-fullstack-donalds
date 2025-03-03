import { ShoppingBagIcon } from "lucide-react";
import { useContext, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { formatCurrency } from "@/helpers/format-currency";

import { CartContext } from "../contexts/cart";
import CartProductItem from "./cart-product-item";
import FinishOrderDialog from "./finish-order-dialog";

const CartSheet = () => {
  const [finishOrderDialogIsOpen, setFinishOrderDialogIsOpen] = useState(false);
  const { isOpen, toggleCart, products, total } = useContext(CartContext);

  const itemCount = products.reduce(
    (acc, product) => acc + product.quantity,
    0,
  );

  return (
    <Sheet open={isOpen} onOpenChange={toggleCart}>
      <SheetContent className="w-[90%] max-w-full border-l border-gray-200 p-0 sm:w-[450px]">
        <div className="flex h-full flex-col">
          {/* Header */}
          <SheetHeader className="border-b border-gray-100 px-6 py-5">
            <div className="flex items-center justify-between">
              <SheetTitle className="flex items-center gap-2 text-xl font-bold">
                <ShoppingBagIcon size={20} />
                Sacola
                {itemCount > 0 && (
                  <span className="ml-2 rounded-full bg-gray-100 px-2 py-1 text-sm text-gray-700">
                    {itemCount} {itemCount === 1 ? "item" : "itens"}
                  </span>
                )}
              </SheetTitle>
            </div>
          </SheetHeader>

          {/* Cart Content */}
          <div className="flex h-full flex-col">
            {/* Cart Items */}
            <div className="flex-auto overflow-y-auto p-6">
              {products.length === 0 ? (
                <div className="flex h-64 flex-col items-center justify-center text-center">
                  <ShoppingBagIcon size={64} className="mb-4 text-gray-200" />
                  <p className="font-medium text-gray-500">
                    Sua sacola está vazia
                  </p>
                  <p className="mt-2 text-sm text-gray-400">
                    Adicione produtos para continuar
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {products.map((product) => (
                    <div key={product.id}>
                      <CartProductItem product={product} />
                      <Separator className="mt-4" />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Cart Footer */}
            <div className="space-y-4 border-t border-gray-100 bg-gray-50 p-6">
              <Card className="border border-gray-200 bg-white shadow-sm">
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <p className="text-gray-500">Subtotal</p>
                      <p className="font-medium">{formatCurrency(total)}</p>
                    </div>
                    <div className="flex justify-between text-sm">
                      <p className="text-gray-500">Entrega</p>
                      <p className="font-medium">Grátis</p>
                    </div>
                    <Separator />
                    <div className="flex justify-between pt-2">
                      <p className="font-medium">Total</p>
                      <p className="text-lg font-bold">
                        {formatCurrency(total)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Button
                className="h-12 w-full rounded-full text-base font-medium shadow-md"
                disabled={products.length === 0}
                onClick={() => setFinishOrderDialogIsOpen(true)}
              >
                Finalizar pedido
              </Button>

              <FinishOrderDialog
                open={finishOrderDialogIsOpen}
                onOpenChange={setFinishOrderDialogIsOpen}
              />
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CartSheet;
