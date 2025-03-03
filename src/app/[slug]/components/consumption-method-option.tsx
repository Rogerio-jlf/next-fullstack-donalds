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
    <div className="h-full w-full">
      <div className="flex h-full flex-col items-center justify-between gap-4">
        <div className="relative flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-primary/10 p-2">
          <Image
            src={imageUrl}
            fill
            alt={imageAlt}
            className="object-contain p-3"
          />
        </div>

        <h3 className="text-center text-base font-medium text-gray-800">
          {buttonText}
        </h3>

        <Button
          className="w-full rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-primary/90 hover:shadow-md"
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
                option === method ? "bg-primary" : "bg-gray-200"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConsumptionMethodOption;
