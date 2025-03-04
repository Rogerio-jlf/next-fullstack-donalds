"use client";

import { Clock, Gift, Globe, ShoppingBag, User } from "lucide-react";
import { useRouter } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

// Component
const HomePage = () => {
  const router = useRouter();
  const handleClick = () => {
    router.push("/fsw-donalds");
  };

  // Rendering
  return (
    <div className="min-h-screen bg-gray-50 font-Kodchasan">
      {/* Header */}
      <div className="relative h-48 overflow-hidden bg-red-700">
        <div className="absolute -bottom-6 left-0 right-0 h-12 rounded-t-3xl bg-gray-50"></div>

        <div className="absolute top-4 flex w-full items-center justify-between px-6">
          <h2 className="text-2xl font-bold text-white">FSW Donalds</h2>

          <div className="flex gap-4">
            <Button
              size="icon"
              className="h-10 w-10 rounded-full bg-transparent border-none shadow-sm shadow-black hover:bg-red-900 transition-all active:scale-90"
            >
              <ShoppingBag className="h-5 w-5 text-white" />
            </Button>

            <Button
              size="icon"
              className="h-10 w-10 rounded-full bg-transparent border-none shadow-sm shadow-black hover:bg-red-900 transition-all active:scale-90"
            >
              <User className="h-5 w-5 text-white" />
            </Button>
          </div>
        </div>

        <div className="absolute bottom-12 px-6">
          <Badge
            className="rounded-full bg-amber-400 border-none px-3 py-1 text-sm font-semibold italic text-black shadow-sm shadow-black"
          >
            Delivery Grátis
          </Badge>
        </div>
      </div>
      {/* ---------- */}

      {/* Main */}
      <div className="mx-auto max-w-3xl px-6 pb-20 pt-8">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-4xl font-extrabold text-gray-900">
            <span className="text-red-600">Sabor</span> na hora certa
          </h1>

          <div className="relative">
            <Button
              size="icon"
              className="h-12 w-12 rounded-full bg-red-600 shadow-sm shadow-black hover:bg-red-900 border-none tramsition-all active:scale-90"
            >
              <Gift className="h-6 w-6 text-white" />
            </Button>

            <Badge className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 p-0 text-white shadow-sm shadow-black border-none">
              2
            </Badge>
          </div>
        </div>
        {/* ---------- */}

        <p className="mb-8 text-gray-600 font-medium">
          Peça seu lanche favorito para entrega ou retirada e aproveite nossas
          promoções exclusivas.
        </p>

        <div className="mb-8 flex flex-col gap-6">
          <Card className="shadow-sm shadow-black border-none">
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex h-12 w-12 items-center border-none justify-center rounded-full bg-red-600 font-bold text-white shadow-sm shadow-black">
                1
              </div>
              <p className="text-gray-600 font-medium">
                Escolha seus itens favoritos do cardápio
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-sm shadow-black border-none">
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex h-12 w-12 items-center border-none justify-center rounded-full bg-red-600 font-bold text-white shadow-sm shadow-black">
            2
              </div>
              <p className="text-gray-600 font-medium">
                Faça seu pedido e acompanhe em tempo real
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-sm shadow-black border-none">
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex h-12 w-12 items-center border-none justify-center rounded-full bg-red-600 font-bold text-white shadow-sm shadow-black">
            3
              </div>
              <p className="text-gray-600 font-medium">
                Receba rapidamente ou retire na loja
              </p>
            </CardContent>
          </Card>
        </div>
        {/* ---------- */}

        {/* Estimated time, Methods */}
        <div className="mb-8 grid grid-cols-2 gap-4">
          <Card className="shadow-sm shadow-black border-none">
            <CardContent className="p-4">
              <div className="mb-2 flex items-center gap-2">
                <Clock className="h-5 w-5 text-amber-500" />

                <span className="text-sm text-gray-600 font-medium">Tempo</span>
              </div>

              <p className="text-lg font-semibold text-black italic">15-25 min</p>
            </CardContent>
          </Card>

          <Card className="shadow-sm shadow-black border-none">
            <CardContent className="p-4">
              <div className="mb-2 flex items-center gap-2">
                <Globe className="h-5 w-5 text-amber-500" />

                <span className="text-sm text-gray-600 font-medium">Métodos</span>
              </div>

              <p className="text-lg font-semibold text-black italic">
                Delivery/Retirada
              </p>
            </CardContent>
          </Card>
        </div>
        {/* ---------- */}

        <Button
          onClick={handleClick}
          className="w-full rounded-lg bg-red-600 py-6 text-md font-semibold italic text-white shadow-md shadow-black border-none transition-all hover:bg-red-900 active:scale-90"
        >
          Fazer Pedido
        </Button>
      </div>
      {/* ---------- */}
    </div>
  );
};

export default HomePage;
