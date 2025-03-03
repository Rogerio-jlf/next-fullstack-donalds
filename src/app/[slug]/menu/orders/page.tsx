import { dbPrisma } from "@/lib/prisma";

import { isValidCPF, removeCPFPunctuation } from "../helpers/cpf";
import CpfForm from "./components/cpf-form";
import OrderList from "./components/order-list";

interface OrdersPageProps {
  searchParams: Promise<{ cpf: string }>;
}

const OrdersPage = async ({ searchParams }: OrdersPageProps) => {
  const { cpf } = await searchParams;
  if (!cpf) {
    return <CpfForm />;
  }
  if (!isValidCPF(cpf)) {
    return <CpfForm />;
  }
  const orders = await dbPrisma.order.findMany({
    orderBy: {
      createdAt: "desc",
    },
    where: {
      customerCPF: removeCPFPunctuation(cpf),
    },
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
  });
  return <OrderList orders={orders} />;
};

export default OrdersPage;
