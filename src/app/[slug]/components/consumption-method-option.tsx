import { ConsumptionMethod } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

interface ConsumptionMethodOptionProps {
  slug: string;
  imageUrl: string;
  imageAlt: string;
  buttonText: string;
  option: ConsumptionMethod;
}

const ConsumptionMethodOption = ({
  slug,
  imageAlt,
  imageUrl,
  buttonText,
  option,
}: ConsumptionMethodOptionProps) => {
  return (
    <div className="h-full w-full font-Kodchasan">
      <div className="flex h-full flex-col items-center justify-between gap-4">
        <div className="relative flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-transparent border-none p-2 shadow-sm shadow-black">
          <Image
            src={imageUrl}
            fill
            alt={imageAlt}
            className="object-contain p-3"
          />
        </div>

        <h3 className="text-center text-base font-medium text-gray-600">
          {buttonText}
        </h3>

        <Button
          className="w-full rounded-lg bg-red-600 px-4 py-2 font-semibold italic text-white shadow-sm shadow-black transition-all  hover:bg-red-900 active:scale-90 border-none"
          asChild
        >
          <Link href={`/${slug}/menu?consumptionMethod=${option}`}>
            Selecionar
          </Link>
        </Button>

        {/* Visual indicator for selected method */}
        <div className="mt-1 flex gap-2">
          {["DINE_IN", "TAKEAWAY"].map((method) => (
            <div
              key={method}
              className={`h-2 w-2 rounded-full ${
                option === method ? "bg-red-600" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConsumptionMethodOption;
