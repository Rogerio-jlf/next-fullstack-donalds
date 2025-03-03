import { OrderStatus, Prisma } from "@prisma/client";
import { ChevronLeftIcon, ScrollTextIcon } from "lucide-react";
import Image from "next/image";

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
            name: true,
            avatarImageUrl: true,
          },
        },
        orderProducts: {
          include: {
            product: true,
          },
        },
      },
    }>
  >
}

const statusLabel = (status: OrderStatus) => {
  switch (status) {
    case "FINISHED":
      return "Finalizado";
    case "IN_PREPARATION":
      return "Em preparação";
    case "PENDING":
      return "Pendente";
    default:
      return "";
  }
}

const OrderList = ({orders}:OrderListProps) => {
  return (
    <>
    <div className="space-y-6 p-6">
      <Button size="icon" variant="secondary" className="rounded-full">
        <ChevronLeftIcon />
      </Button>
      <div className="flex items-center gap-3">
        <ScrollTextIcon />
        <h2 className="text-lg font-semibold">Meus Pedidos</h2>
      </div>
      {orders.map((order) => (
        <Card key={order.id}>
          <CardContent className="space-y-4 p-5">
            <div className={`w-fit rounded-full px-2 py-1 text-xs font-semibold text-white
                ${order.status === "FINISHED" ? "bg-green-400" : "bg-gray-200 text-gray-500"}
              `}>
              {statusLabel(order.status)}
            </div>
            <div className="flex items-center gap-2">
              <div className="relative h-5 w-5">
                <Image
                  src={order.restaurant.avatarImageUrl}
                  alt={order.restaurant.name}
                  fill
                  className="rounded-sm"
                />
              </div>
                <p className="text-sm font-semibold">{order.restaurant.name}</p>
              </div>

              <Separator/>
              <div className="space-y-2">
                {order.orderProducts.map(orderProduct => (
                  <div key={orderProduct.id} className="flex items-center gap-2">
                    <div className="h-5 w-5 flex items-center justify-center rounded-full bg-gray-400 text-white text-xs font-semibold">
                      {orderProduct.quantity}
                    </div>
                    <p className="text-sm">
                      {orderProduct.product.name}
                    </p>
                  </div>
                ))}

              </div>


              <Separator/>

              <p className="text-sm font-medium">{formatCurrency(order.total)}</p>

          </CardContent>
        </Card>
      ))}
    </div>
    </>
  );
}

export default OrderList;