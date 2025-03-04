"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ConsumptionMethod } from "@prisma/client";
import { loadStripe } from "@stripe/stripe-js";
import { CheckIcon, Loader2Icon, ShoppingBagIcon } from "lucide-react";
import { useParams, useSearchParams } from "next/navigation";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { PatternFormat } from "react-number-format";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

import { createOrder } from "../actions/create-order";
import { createStripeCheckout } from "../actions/create-stripe-checkout";
import { CartContext } from "../contexts/cart";
import { isValidCPF } from "../helpers/cpf";

const formSchema = z.object({
  name: z.string().trim().min(1, {
    message: "O nome é obrigatório.",
  }),
  cpf: z
    .string()
    .trim()
    .min(1, {
      message: "O CPF é obrigatório.",
    })
    .refine((value) => isValidCPF(value), {
      message: "CPF inválido.",
    }),
});

type FormSchema = z.infer<typeof formSchema>;

interface FinishOrderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const FinishOrderDialog = ({ open, onOpenChange }: FinishOrderDialogProps) => {
  const { slug } = useParams<{ slug: string }>();
  const { products, total } = useContext(CartContext);
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      cpf: "",
    },
    shouldUnregister: true,
  });

  const onSubmit = async (data: FormSchema) => {
    try {
      setIsLoading(true);
      const consumptionMethod = searchParams.get(
        "consumptionMethod",
      ) as ConsumptionMethod;

      const order = await createOrder({
        consumptionMethod,
        customerCpf: data.cpf,
        customerName: data.name,
        products,
        slug,
      });
      const { sessionId } = await createStripeCheckout({
        products,
        orderId: order.id,
        slug,
        consumptionMethod,
        cpf: data.cpf,
      });
      if (!process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY) return;
      const stripe = await loadStripe(
        process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY,
      );
      stripe?.redirectToCheckout({
        sessionId: sessionId,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerTrigger asChild></DrawerTrigger>
      <DrawerContent className="max-h-[90vh] font-Poppins">
        <DrawerHeader className="border-b border-gray-300 bg-gray-50">
          <div className="flex items-center gap-2">
            <ShoppingBagIcon className="h-5 w-5 text-black" />
            <DrawerTitle className="text-xl font-bold text-black">
              Finalizar Pedido
            </DrawerTitle>
          </div>
          <DrawerDescription className="mt-2 text-gray-600 font-medium">
            Insira suas informações abaixo para finalizar o seu pedido.
          </DrawerDescription>
        </DrawerHeader>
        {/* ---------- */}

        <div className="overflow-y-auto p-6">
          {/* Resume */}
          <Card className="mb-6 border-gray-300 bg-gray-50 shadow-sm shadow-black">
            <CardContent className="p-4">
              <h3 className="mb-2 flex items-center gap-2 text-md font-semibold text-gray-600">
                <CheckIcon className="h-4 w-4 text-green-600" />
                Resumo do pedido
              </h3>

              <div className="space-y-2">
                <div className="text-sm text-gray-600 font-semibold">
                  {products.length} {products.length === 1 ? "item" : "itens"}{" "}
                  no carrinho
                </div>

                <div className="flex justify-between">
                  <span className="font-semibold italic text-lg text-gray-600">Total:</span>
                  <span className="font-semibold italic text-lg text-gray-600">
                    R$ {total.toFixed(2).replace(".", ",")}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
          {/* ---------- */}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold text-gray-600">
                      Seu nome
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Digite seu nome completo..."
                        className="rounded-lg placeholder:text-gray-400 border-gray-300 focus:border-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="cpf"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold text-gray-600">
                      Seu CPF
                    </FormLabel>
                    <FormControl>
                      <PatternFormat
                        placeholder="000.000.000-00"
                        format="###.###.###-##"
                        customInput={Input}
                        className="rounded-lg placeholder:text-gray-400 border-gray-300 focus:border-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              <Separator className="my-4 bg-gray-300" />

              <div className="rounded-lg border border-gray-300 bg-gray-50 p-4 text-sm text-gray-600 font-medium shadow-sm shadow-black">
                <p>
                  Ao finalizar, você será redirecionado para o Stripe para
                  realizar o pagamento com segurança.
                </p>
              </div>

              <DrawerFooter className="px-0 pt-2">

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="rounded-lg border-none font-semibold text-md italic shadow-sm shadow-black transition-all bg-red-500 text-white hover:bg-red-800 active:scale-90"
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <Loader2Icon className="h-4 w-4 animate-spin" />
                      Processando...
                    </span>
                  ) : (
                    "Finalizar e pagar"
                  )}
                </Button>

                <DrawerClose asChild>
                  <Button
                    className="rounded-lg border text-md font-semibold border-gray-300 text-black hover:bg-gray-300 hover:text-gray-900 bg-transparent transition-all active:scale-90 italic shadow-sm shadow-black hover:border-none"
                  >
                    Cancelar
                  </Button>
                </DrawerClose>
              </DrawerFooter>
            </form>
          </Form>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default FinishOrderDialog;
