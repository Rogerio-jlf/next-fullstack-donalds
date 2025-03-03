import { Product } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";

import { formatCurrency } from "@/helpers/format-currency";

interface ProductsProps {
  products: Product[];
}

const Products = ({ products }: ProductsProps) => {
  const { slug } = useParams<{ slug: string }>();
  const seacrchParams = useSearchParams();
  const consumptionMethod = seacrchParams.get("consumptionMethod");
  return (
    <>
      <div className="space-y-3 px-5 py-1">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/${slug}/menu/${product.id}?consumptionMethod=${consumptionMethod}`}
            className="flex items-center justify-between gap-3 border-b py-3"
          >
            {/* PARTE DA ESQUERDA */}
            <div>
              <h3 className="text-sm font-medium">{product.name}</h3>
              <p className="line-clamp-2 text-sm text-muted-foreground">
                {product.description}
              </p>
              <p className="pt-3 text-sm font-semibold">
                {formatCurrency(product.price)}
              </p>
            </div>

            {/* PARTE DA DEIREITA */}
            <div className="relative min-h-[82px] min-w-[120px]">
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                className="rounded-lg object-contain"
              />
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default Products;
