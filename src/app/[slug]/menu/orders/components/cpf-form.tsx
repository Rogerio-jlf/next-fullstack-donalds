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
      <DrawerContent className="max-h-[90vh]">
        <DrawerHeader className="border-b border-gray-100 bg-gray-50 pb-6">
          <div className="mb-4 flex items-center justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
              <UserIcon className="h-8 w-8 text-gray-600" />
            </div>
          </div>
          <DrawerTitle className="text-center text-xl font-bold">
            Visualizar Pedidos
          </DrawerTitle>
          <DrawerDescription className="mt-2 text-center text-gray-600">
            Insira seu CPF abaixo para visualizar seus pedidos.
          </DrawerDescription>
        </DrawerHeader>

        <div className="px-6 py-8">
          <Card className="mb-6 border-gray-200 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <LockIcon className="h-4 w-4" />
                <p>
                  Seus dados estão protegidos e são usados apenas para
                  identificar seus pedidos.
                </p>
              </div>
            </CardContent>
          </Card>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="cpf"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-medium text-gray-700">
                      Seu CPF
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <PatternFormat
                          placeholder="000.000.000-00"
                          format="###.###.###-##"
                          customInput={Input}
                          className="h-12 rounded-lg border-gray-300 pl-10 focus:border-gray-400 focus:ring-gray-400"
                          {...field}
                        />
                        <div className="absolute left-3 top-3 text-gray-400">
                          <UserIcon className="h-5 w-5" />
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage className="mt-2 text-red-500" />
                    <p className="mt-2 text-xs text-gray-500">
                      Utilize o mesmo CPF fornecido no momento da compra.
                    </p>
                  </FormItem>
                )}
              />

              <DrawerFooter className="px-0 pt-2">
                <Button
                  variant="destructive"
                  className="h-12 w-full rounded-full font-medium shadow-sm transition-all hover:shadow-md"
                  type="submit"
                >
                  Visualizar meus pedidos
                </Button>
                <DrawerClose asChild>
                  <Button
                    variant="outline"
                    className="w-full rounded-full border-gray-300 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    onClick={handleCancel}
                  >
                    Voltar
                  </Button>
                </DrawerClose>

                <p className="mt-4 text-center text-xs text-gray-500">
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
