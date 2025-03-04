"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { LockIcon, UserIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
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

import { isValidCPF, removeCPFPunctuation } from "../../helpers/cpf";

const formSchema = z.object({
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

const CpfForm = () => {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  });
  const router = useRouter();
  const pathname = usePathname();

  const onSubmit = (data: FormSchema) => {
    router.replace(`${pathname}?cpf=${removeCPFPunctuation(data.cpf)}`);
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <Drawer open>
      <DrawerContent className="max-h-[90vh] font-Poppins">
        <DrawerHeader className="border-b border-gray-300 bg-gray-100 pb-6">
          <div className="mb-4 flex items-center justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-transparent shadow-sm shadow-black border-none">
              <UserIcon className="h-8 w-8 text-gray-600" />
            </div>
          </div>
          <DrawerTitle className="text-center text-xl font-bold text-black">
            Visualizar Pedidos
          </DrawerTitle>
          <DrawerDescription className="mt-2 text-center text-gray-600 font-medium">
            Insira seu CPF abaixo para visualizar seus pedidos.
          </DrawerDescription>
        </DrawerHeader>
        {/* ---------- */}

        <div className="px-6 py-8">
          <Card className="mb-6 border-gray-200 shadow-sm shadow-black">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <LockIcon className="h-5 w-5" />
                <p className="font-medium text-gray-600 text-md">
                  Seus dados estão protegidos e são usados apenas para
                  identificar seus pedidos.
                </p>
              </div>
            </CardContent>
          </Card>
          {/* ---------- */}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="cpf"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold text-gray-600">
                      Seu CPF
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <PatternFormat
                          placeholder="000.000.000-00"
                          format="###.###.###-##"
                          customInput={Input}
                          className="h-12 rounded-lg border-gray-300 pl-10 focus:border-none placeholder:text-gray-400"
                          {...field}
                        />
                        <div className="absolute left-3 top-3 text-gray-400">
                          <UserIcon className="h-5 w-5" />
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage className="mt-2 text-red-500" />
                    <p className="mt-2 text-xs text-gray-600 font-medium">
                      Utilize o mesmo CPF fornecido no momento da compra.
                    </p>
                  </FormItem>
                )}
              />

              <DrawerFooter className="px-0 pt-2">
                <Button
                  type="submit"
                  className="w-full text-md border-none rounded-lg italic font-semibold shadow-sm shadow-black transition-all hover:bg-red-800 bg-red-500 active:scale-90 text-white"
                >
                  Visualizar meus pedidos
                </Button>
                <DrawerClose asChild>
                  <Button
                    onClick={handleCancel}
                    className="w-full rounded-lg border border-gray-300 text-black hover:bg-gray-300 bg-transparent transition-all active:scale-90 text-md font-semibold italic shadow-sm shadow-black hover:border-none"
                  >
                    Voltar
                  </Button>
                </DrawerClose>

                <p className="mt-4 text-center text-xs text-gray-600 font-medium">
                  Você será redirecionado para a página de seus pedidos após a
                  confirmação.
                </p>
              </DrawerFooter>
            </form>
          </Form>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default CpfForm;
