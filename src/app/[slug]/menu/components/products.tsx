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
  const searchParams = useSearchParams();
  const consumptionMethod = searchParams.get("consumptionMethod");

  return (
    <div className="space-y-4 px-4 py-2">
      {products.map((product) => (
        <Link
          key={product.id}
          href={`/${slug}/menu/${product.id}?consumptionMethod=${consumptionMethod}`}
          className="flex items-center gap-4 rounded-lg border-b border-gray-100 p-3 transition-colors duration-200 hover:bg-gray-50"
        >
          {/* Product Information */}
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="text-base font-medium text-gray-800">
                {product.name}
              </h3>
            </div>

            <p className="mt-1 line-clamp-2 max-w-md text-sm text-gray-500">
              {product.description}
            </p>

            <div className="mt-2 flex items-center gap-2">
              <p className="text-sm font-bold text-gray-900">
                {formatCurrency(product.price)}
              </p>
            </div>
          </div>

          {/* Product Image */}
          <div className="relative h-24 w-24 overflow-hidden rounded-lg bg-gray-50 shadow-sm">
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-300 hover:scale-110"
            />
          </div>
        </Link>
      ))}

      {products.length === 0 && (
        <div className="py-12 text-center">
          <p className="text-gray-500">Nenhum produto encontrado</p>
        </div>
      )}
    </div>
  );
};

export default Products;
