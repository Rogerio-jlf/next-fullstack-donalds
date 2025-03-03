import { dbPrisma } from "@/lib/prisma";

export const getRestaurantBySlug = async (slug: string) => {
  const restaurant = await dbPrisma.restaurant.findUnique({ where: { slug } });
  return restaurant;
};
