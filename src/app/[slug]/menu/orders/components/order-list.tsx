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
  if (status === "FINISHED") return "bg-green-600";
  if (status === "IN_PREPARATION") return "bg-amber-500";
  if (status === "PENDING") return "bg-gray-400";
  if (status === "PAYMENT_CONFIRMED") return "bg-green-500";
  if (status === "PAYMENT_FAILED") return "bg-red-500";
  return "bg-gray-400";
};

const OrderList = ({ orders }: OrderListProps) => {
  const router = useRouter();
  const handleBackClick = () => router.back();

  return (
    <div className="mx-auto max-w-3xl space-y-6 bg-gray-50 p-6">
      <div className="flex items-center justify-between">
        <Button
          size="icon"
          variant="ghost"
          className="rounded-full hover:bg-gray-100"
          onClick={handleBackClick}
        >
          <ChevronLeftIcon className="h-5 w-5" />
        </Button>
        <div className="flex items-center gap-2">
          <ScrollTextIcon className="text-primary" />
          <h2 className="text-xl font-bold">Meus Pedidos</h2>
        </div>
        <div className="w-10"></div> {/* Spacer for balance */}
      </div>

      {orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <ScrollTextIcon className="mb-4 h-12 w-12 text-gray-300" />
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
              className="overflow-hidden border border-gray-200 shadow-sm transition-shadow duration-200 hover:shadow-md"
            >
              <CardContent className="p-0">
                <div className="bg-white p-4">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-gray-100">
                        <Image
                          src={order.restaurant.avatarImageUrl}
                          alt={order.restaurant.name}
                          className="object-cover"
                          fill
                        />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">
                          {order.restaurant.name}
                        </p>
                        <p className="text-xs text-gray-500">
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
                    <div
                      className={`rounded-full px-3 py-1 text-xs font-bold text-white ${getStatusColor(order.status)}`}
                    >
                      {getStatusLabel(order.status)}
                    </div>
                  </div>

                  <Separator className="my-3" />

                  <div className="space-y-3 py-2">
                    {order.orderProducts.map((orderProduct) => (
                      <div
                        key={orderProduct.id}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                            {orderProduct.quantity}
                          </div>
                          <p className="text-sm font-medium text-gray-800">
                            {orderProduct.product.name}
                          </p>
                        </div>
                        <p className="text-sm text-gray-600">
                          {formatCurrency(
                            orderProduct.product.price * orderProduct.quantity,
                          )}
                        </p>
                      </div>
                    ))}
                  </div>

                  <Separator className="my-3" />

                  <div className="flex items-center justify-between pt-2">
                    <p className="text-sm font-medium text-gray-500">Total</p>
                    <p className="text-lg font-bold text-primary">
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
