import { dbPrisma } from "@/lib/prisma";

import { isValideCPF, removeCPFPunctuation } from "../helpers/cpf";
import CPFForm from "./components/cpf-form";
import OrderList from "./components/order-list";

interface OrdersPageProps {
  searchParams: Promise<{
    cpf: string
  }>
}

const Orders = async ({searchParams}: OrdersPageProps ) => {
  const { cpf } = await searchParams;

  if (!cpf) {
    return<CPFForm />
  }

  if (!isValideCPF(cpf)) {
    return <CPFForm />
  }

  const orders = await dbPrisma.order.findMany({
    orderBy: {
      createdAt: "desc",
    },
    where: {
      customerCPF: removeCPFPunctuation(cpf)
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
          product: true
        },
      },
    },
  });

  return (
    <>
      <OrderList orders={orders} />
    </>
  );
}

export default Orders;