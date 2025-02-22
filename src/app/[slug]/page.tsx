import Image from "next/image";
import { notFound } from "next/navigation";

import { dbPrisma } from "@/lib/prisma";

import ConsumptionMethodOption from "./components/consumption-method-option";

interface RestaurantProps {
  params: Promise<{ slug: string }>;
}

const RestaurantPage = async ({ params }: RestaurantProps) => {
  const { slug } = await params;

  const restaurant = await dbPrisma.restaurant.findUnique({
    where: {
      slug,
    },
  });

  if (!restaurant) {
    return notFound();
  }

  return (
    <>
      <div className="flex h-screen flex-col items-center justify-center px-6 pt-24">
        {/* LOGO E TÍTULO */}
        <div className="flex flex-col items-center gap-2">
          <Image
            src={restaurant.avatarImageUrl}
            alt={restaurant.name}
            width={82}
            height={82}
          />
          <h2 className="font-semibold">{restaurant.name}</h2>
        </div>
        {/* SEJA BEM-VINDO */}
        <div className="space-y-2 pt-24 text-center">
          <h3 className="text-2xl font-semibold">Seja bem-vindo!</h3>
          <p className="opacity-55">
            Escolha como prefere aproveitar sua refeição. Estamos oferecendo
            praticidade e sabor em cada detalhe!
          </p>
        </div>
        {/* OPÇÕES DE CONSUMO */}
        <div className="grid grid-cols-2 gap-4 pt-14">
          <ConsumptionMethodOption
            slug={slug}
            option="DINE_IN"
            imageUrl="/dine_in.png"
            imageAlt="Para comer aqui"
            buttonText="Para comer aqui"
          />
          <ConsumptionMethodOption
            slug={slug}
            option="TAKEAWAY"
            imageUrl="/takeaway.png"
            imageAlt="Para levar"
            buttonText="Para levar"
          />
        </div>
      </div>
    </>
  );
};

export default RestaurantPage;
