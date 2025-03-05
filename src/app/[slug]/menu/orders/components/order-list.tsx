"use client";

import { OrderStatus, Prisma } from "@prisma/client";
import { ChevronLeftIcon, ScrollTextIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/helpers/format-currency";

interface OrderListProps {
  orders: Array<
    Prisma.OrderGetPayload<{
      include: {
        restaurant: {
          select: {
            name: true;
            avatarImageUrl: true;
          };
        };
        orderProducts: {
          include: {
            product: true;
          };
        };
      };
    }>
  >;
}

const getStatusLabel = (status: OrderStatus) => {
  if (status === "FINISHED") return "Finalizado";
  if (status === "IN_PREPARATION") return "Em preparo";
  if (status === "PENDING") return "Pendente";
  if (status === "PAYMENT_CONFIRMED") return "Pagamento confirmado";
  if (status === "PAYMENT_FAILED") return "Pagamento falhou";
  return "";
};

const getStatusColor = (status: OrderStatus) => {
  if (status === "FINISHED") return "bg-green-500";
  if (status === "IN_PREPARATION") return "bg-amber-500";
  if (status === "PENDING") return "bg-gray-500";
  if (status === "PAYMENT_CONFIRMED") return "bg-green-500";
  if (status === "PAYMENT_FAILED") return "bg-red-500";
  return "bg-gray-400";
};

const OrderList = ({ orders }: OrderListProps) => {
  const router = useRouter();
  const handleBackClick = () => router.back();

  // Rendering
  return (
    <div className="mx-auto max-w-3xl space-y-6 p-6 font-Kodchasan">
      <div className="flex items-center justify-between">
        <Button
          size="icon"
          onClick={handleBackClick}
          className="rounded-full bg-transparent hover:bg-gray-300 text-black shadow-sm shadow-black border-none transition-all active:scale-90"
        >
          <ChevronLeftIcon className="h-5 w-5" />
        </Button>

        <div className="flex items-center gap-2">
          <ScrollTextIcon className="text-black" />

          <h2 className="text-xl font-bold text-black">Meus Pedidos</h2>
        </div>
        <div className="w-10"></div> {/* Spacer for balance */}
      </div>
      {/* ---------- */}

      {/*  */}
      {orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <ScrollTextIcon className="mb-4 h-12 w-12 text-gray-600" />

          <h3 className="text-lg font-medium text-gray-900">
            Nenhum pedido encontrado
          </h3>

          <p className="mt-2 text-sm text-gray-500">
            Seus pedidos aparecerão aqui quando você fizer seu primeiro pedido.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <Card
              key={order.id}
              className="overflow-hidden border border-gray-300 shadow-sm shadow-black transition-all"
            >
              <CardContent className="p-0">
                <div className="bg-white p-4">
                  {/* First Part  */}
                  <div className="mb-4 flex items-center justify-between">

                    <div className="flex items-center gap-3">
                      {/* Image */}
                      <div className="relative h-10 w-10 overflow-hidden rounded-full">
                        <Image
                          src={order.restaurant.avatarImageUrl}
                          alt={order.restaurant.name}
                          className="object-cover"
                          fill
                        />
                      </div>

                      {/* Restaurante, Date */}
                      <div>
                        <p className="font-bold text-black text-md">
                          {order.restaurant.name}
                        </p>

                        <p className="text-xs text-gray-600 font-semibold">
                          {new Date(order.createdAt).toLocaleDateString(
                            "pt-BR",
                            {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                            },
                          )}
                        </p>
                      </div>
                    </div>
                    
                    {/* Status */}
                    <div
                      className={`rounded-full px-3 py-1 text-xs font-semibold italic text-white shadow-sm shadow-black border-none ${getStatusColor(order.status)}`}
                    >
                      {getStatusLabel(order.status)}
                    </div>
                  </div>

                  <Separator className="my-3 bg-gray-300" />
                
                  {/* Second Part */}
                  <div className="space-y-3 py-2">
                    {order.orderProducts.map((orderProduct) => (
                      <div
                        key={orderProduct.id}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-500 text-xs font-bold text-black shadow-sm shadow-black border-none">
                            {orderProduct.quantity}
                          </div>

                          <p className="text-sm font-semibold text-gray-600">
                            {orderProduct.product.name}
                          </p>
                        </div>

                        <p className="text-sm text-gray-600 font-semibold">
                          {formatCurrency(
                            orderProduct.product.price * orderProduct.quantity,
                          )}
                        </p>
                      </div>
                    ))}
                  </div>

                  <Separator className="my-3 bg-gray-300" />
                  
                  {/* Third Part */}
                  <div className="flex items-center justify-between pt-2">
                    <p className="text-xl italic font-bold text-red-600">Total</p>

                    <p className="text-xl font-bold text-red-600 italic">
                      {formatCurrency(order.total)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderList;
