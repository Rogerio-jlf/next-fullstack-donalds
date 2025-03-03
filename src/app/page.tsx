"use client";

import { Clock, Gift, Globe, ShoppingBag, User } from "lucide-react";
import { useRouter } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const HomePage = () => {
  const router = useRouter();
  const handleClick = () => {
    router.push("/fsw-donalds");
  };

  return (
    <div className="font-Poppins min-h-screen bg-gray-50">
      {/* Header with pattern */}
      <div className="relative h-48 overflow-hidden bg-red-700">
        <div className="absolute -bottom-6 left-0 right-0 h-12 rounded-t-3xl bg-gray-50"></div>
        <div className="absolute top-4 flex w-full items-center justify-between px-6">
          <h2 className="text-2xl font-bold text-white">FSW Donalds</h2>
          <div className="flex gap-2">
            <Button
              size="icon"
              variant="ghost"
              className="h-10 w-10 rounded-full bg-red-400 font-semibold text-black hover:bg-red-900 hover:text-white"
            >
              <ShoppingBag className="h-5 w-5" />
            </Button>

            <Button
              size="icon"
              variant="ghost"
              className="h-10 w-10 rounded-full bg-red-400 font-semibold text-black hover:bg-red-900 hover:text-white"
            >
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
        <div className="absolute bottom-12 px-6">
          <Badge
            variant="default"
            className="rounded-full px-3 py-1 text-sm font-semibold italic text-black"
          >
            Delivery Grátis
          </Badge>
        </div>
      </div>

      {/* Main content */}
      <div className="mx-auto max-w-3xl px-6 pb-20 pt-8">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-4xl font-extrabold text-gray-900">
            <span className="text-red-600">Sabor</span> na hora certa
          </h1>

          <div className="relative">
            <Button
              size="icon"
              className="h-12 w-12 rounded-full bg-red-400 font-semibold text-black hover:bg-red-900 hover:text-white"
            >
              <Gift className="h-6 w-6" />
            </Button>

            <Badge className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-700 p-0 text-white">
              2
            </Badge>
          </div>
        </div>

        <p className="mb-8 text-gray-600">
          Peça seu lanche favorito para entrega ou retirada e aproveite nossas
          promoções exclusivas.
        </p>

        <div className="mb-8 flex flex-col gap-6">
          <Card className="border-0 shadow-sm shadow-black">
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-600 font-bold text-white">
                1
              </div>
              <p className="text-gray-700">
                Escolha seus itens favoritos do cardápio
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm shadow-black">
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-600 font-bold text-white">
                2
              </div>
              <p className="text-gray-700">
                Faça seu pedido e acompanhe em tempo real
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm shadow-black">
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-600 font-bold text-white">
                3
              </div>
              <p className="text-gray-700">
                Receba rapidamente ou retire na loja
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Estimated time and methods */}
        <div className="mb-8 grid grid-cols-2 gap-4">
          <Card className="border-0 shadow-sm shadow-black">
            <CardContent className="p-4">
              <div className="mb-2 flex items-center gap-2">
                <Clock className="h-5 w-5 text-yellow-500" />
                <span className="text-sm text-gray-500">Tempo</span>
              </div>
              <p className="text-lg font-semibold text-gray-900">15-25 min</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm shadow-black">
            <CardContent className="p-4">
              <div className="mb-2 flex items-center gap-2">
                <Globe className="h-5 w-5 text-yellow-500" />
                <span className="text-sm text-gray-500">Métodos</span>
              </div>
              <p className="text-lg font-semibold text-gray-900">
                Delivery/Retirada
              </p>
            </CardContent>
          </Card>
        </div>

        <Button
          onClick={handleClick}
          className="w-full rounded-full bg-red-600 py-6 text-base font-bold text-white shadow-md transition-all hover:bg-red-900 hover:shadow-lg active:scale-90"
        >
          Fazer Pedido
        </Button>
      </div>

      {/* Decorative elements */}
      <div className="fixed -bottom-16 -right-16 h-48 w-48 rounded-full bg-red-600/10"></div>
      <div className="fixed -bottom-8 -left-8 h-24 w-24 rounded-full bg-primary/10"></div>
    </div>
  );
};

export default HomePage;
