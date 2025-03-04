import { ChevronLeft, Clock, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { dbPrisma } from "@/lib/prisma";

import ConsumptionMethodOption from "./components/consumption-method-option";

interface RestaurantPageProps {
  params: Promise<{ slug: string }>;
}

// Component
const RestaurantPage = async ({ params }: RestaurantPageProps) => {
  const { slug } = await params;
  const restaurant = await dbPrisma.restaurant.findUnique({ where: { slug } });

  if (!restaurant) {
    return notFound();
  }

  // Rendering
  return (
    <div className="min-h-screen bg-gray-50 font-Kodchasan">
      {/* Header */}
      <div className="relative h-48 overflow-hidden bg-red-700">
        <div className="absolute -bottom-6 left-0 right-0 h-12 rounded-t-3xl bg-gray-50"></div>

        <Button
          size="icon"
          asChild
          className="absolute left-4 top-4 rounded-full bg-transparent shadow-sm shadow-black hover:bg-red-900 transition-all active:scale-90 border-none"
        >
          <Link href="/">
            <ChevronLeft className="h-5 w-5 text-white" />
          </Link>
        </Button>
      </div>
      {/* ---------- */}

      <div className="mx-auto max-w-3xl px-6">
        {/* Logo, Title */}
        <div className="relative -mt-16 flex flex-col items-center gap-3">
          <Card className="h-32 w-32 overflow-hidden p-0 shadow-sm shadow-black">
            <CardContent className="flex h-full w-full items-center justify-center p-2">
              {/* Image */}
              <div className="relative h-full w-full overflow-hidden rounded-xl border-none">
                <Image
                  src={restaurant.avatarImageUrl}
                  alt={restaurant.name}
                  fill
                  className="object-cover"
                />
              </div>
            </CardContent>
          </Card>

          <h2 className="text-2xl font-bold text-red-600">
            {restaurant.name}
          </h2>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-amber-500 text-amber-500" />

              <span className="text-md font-medium text-gray-600">4.8</span>
            </div>

            <span className="text-md text-gray-600 font-medium">-</span>

            <span className="text-md text-gray-600 font-medium">1.2 km</span>
          </div>
        </div>
        {/* ---------- */}

        {/* Welcome */}
        <div className="mt-10 space-y-3 text-center">
          <h3 className="text-2xl font-bold text-black">
            Seja bem-vindo!
          </h3>

          <p className="text-gray-600">
            Escolha como prefere aproveitar sua refeição. Estamos aqui para
            oferecer praticidade e sabor em cada detalhe!
          </p>
        </div>
        {/* ---------- */}

        {/* Opening Hours */}
        <Card className="mx-auto my-6 w-fit border-none shadow-sm shadow-black">
          <CardContent className="flex items-center gap-2 px-4 py-2">
            <Clock className="h-5 w-5 text-amber-500" />
            <span className="font-semibold italic text-gray-600">
              Aberto agora - Fecha às 23:00
            </span>
          </CardContent>
        </Card>
        {/* ---------- */}

        {/* options */}
        <div className="w-full pb-16 pt-4">
          <h4 className="mb-4 text-lg font-semibold text-gray-600">
            Como deseja aproveitar?
          </h4>
          <div className="grid grid-cols-2 gap-4">
            <Card className="shadow-sm shadow-black transition-all hover:border-red-600 border-none">
              <CardContent className="p-4">
                <ConsumptionMethodOption
                  slug={slug}
                  option="DINE_IN"
                  buttonText="Para comer aqui"
                  imageAlt="Comer aqui"
                  imageUrl="/dine_in.png"
                />
              </CardContent>
            </Card>

            <Card className="shadow-sm shadow-black transition-all hover:border-red-600 border-none">
              <CardContent className="p-4">
                <ConsumptionMethodOption
                  slug={slug}
                  option="TAKEAWAY"
                  buttonText="Para levar"
                  imageAlt="Para levar"
                  imageUrl="/takeaway.png"
                />
              </CardContent>
            </Card>
          </div>
        </div>
        {/* ---------- */}
      </div>
    </div>
  );
};

export default RestaurantPage;
