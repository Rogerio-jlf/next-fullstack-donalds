"use server";

import { ConsumptionMethod } from "@prisma/client";

import { dbPrisma } from "@/lib/prisma";

import { removeCPFPunctuation } from "../helpers/cpf";

interface CreateOrderInput {
  customerName: string;
  customerCPF: string;
  products: Array<{
    id: string;
    quantity: number;
  }>;
  consumptionMethod: ConsumptionMethod;
  slug: string;
}

export const createOrder = async (input: CreateOrderInput) => {
  const restaurant = await dbPrisma.restaurant.findUnique({
    where: {
      slug: input.slug,
    },
  });

  if (!restaurant) {
    throw new Error("Restaurant not found");
  }

  const productsWithPrices = await dbPrisma.product.findMany({
    where: {
      id: {
        in: input.products.map((product) => product.id),
      },
    },
  });

  const productsWithPreicesAndQuantities = input.products.map((product) => ({
    productId: product.id,
    quantity: product.quantity,
    price: productsWithPrices.find((p) => p.id === product.id)!.price,
  }));

  await dbPrisma.order.create({
    data: {
      customerName: input.customerName,
      customerCPF: removeCPFPunctuation(input.customerCPF),
      status: "PENDING",
      orderProducts: {
        createMany: {
          data: productsWithPreicesAndQuantities,
        },
      },
      total: productsWithPreicesAndQuantities.reduce(
        (acc, product) => acc + product.price * product.quantity,
        0,
      ),
      consumptionMethod: input.consumptionMethod,
      restaurantId: restaurant.id,
    },
  });
};
