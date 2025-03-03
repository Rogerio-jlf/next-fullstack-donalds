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

const RestaurantPage = async ({ params }: RestaurantPageProps) => {
  const { slug } = await params;
  const restaurant = await dbPrisma.restaurant.findUnique({ where: { slug } });

  if (!restaurant) {
    return notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with curve */}
      <div className="relative h-48 overflow-hidden bg-primary">
        <div className="absolute -bottom-6 left-0 right-0 h-12 rounded-t-3xl bg-gray-50"></div>
        <Button
          size="icon"
          variant="ghost"
          className="absolute left-4 top-4 rounded-full bg-white/20 text-white hover:bg-white/30"
          asChild
        >
          <Link href="/">
            <ChevronLeft className="h-5 w-5" />
          </Link>
        </Button>
      </div>

      <div className="mx-auto max-w-3xl px-6">
        {/* LOGO AND TITLE */}
        <div className="relative -mt-16 flex flex-col items-center gap-3">
          <Card className="h-32 w-32 overflow-hidden p-0">
            <CardContent className="flex h-full w-full items-center justify-center p-2">
              <div className="relative h-full w-full overflow-hidden rounded-md">
                <Image
                  src={restaurant.avatarImageUrl}
                  alt={restaurant.name}
                  fill
                  className="object-cover"
                />
              </div>
            </CardContent>
          </Card>

          <h2 className="text-2xl font-bold text-primary">{restaurant.name}</h2>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              <span className="text-sm font-medium text-gray-700">4.8</span>
            </div>
            <span className="text-xs text-gray-400">•</span>
            <span className="text-sm text-gray-700">1.2 km</span>
          </div>
        </div>

        {/* WELCOME SECTION */}
        <div className="mt-10 space-y-3 text-center">
          <h3 className="text-2xl font-bold text-gray-900">Seja bem-vindo!</h3>
          <p className="text-gray-600">
            Escolha como prefere aproveitar sua refeição. Estamos aqui para
            oferecer praticidade e sabor em cada detalhe!
          </p>
        </div>

        {/* BUSINESS HOURS */}
        <Card className="mx-auto my-6 w-fit border-0 shadow-sm">
          <CardContent className="flex items-center gap-2 px-4 py-2 text-sm">
            <Clock className="h-4 w-4 text-primary" />
            <span className="text-gray-700">Aberto agora • Fecha às 23:00</span>
          </CardContent>
        </Card>

        {/* OPTIONS SECTION */}
        <div className="w-full pb-16 pt-4">
          <h4 className="mb-4 text-lg font-medium text-gray-800">
            Como deseja aproveitar?
          </h4>
          <div className="grid grid-cols-2 gap-4">
            <Card className="border-2 border-transparent transition-all duration-200 hover:border-primary">
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

            <Card className="border-2 border-transparent transition-all duration-200 hover:border-primary">
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
      </div>

      {/* Decorative elements */}
      <div className="fixed -bottom-16 -right-16 h-48 w-48 rounded-full bg-red-600/10"></div>
      <div className="fixed -bottom-8 -left-8 h-24 w-24 rounded-full bg-primary/10"></div>
    </div>
  );
};

export default RestaurantPage;
