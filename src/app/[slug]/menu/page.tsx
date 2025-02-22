import { notFound } from "next/navigation";

import { dbPrisma } from "@/lib/prisma";

import RestaurantHeader from "./components/header";

interface MenuPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ consumptionMethod: string }>;
}

const isConsumptionMethodValid = (consumptionMethod: string) => {
  return ["DINE_IN", "TAKEAWAY"].includes(consumptionMethod.toUpperCase());
};

const MenuPage = async ({ params, searchParams }: MenuPageProps) => {
  const { slug } = await params;
  const { consumptionMethod } = await searchParams;
  const restaurant = await dbPrisma.restaurant.findUnique({
    where: {
      slug,
    },
  });

  if (!isConsumptionMethodValid(consumptionMethod) || !restaurant) {
    return notFound();
  }

  return (
    <>
      <div>
        <RestaurantHeader restaurant={restaurant} />
      </div>
    </>
  );
};

export default MenuPage;
