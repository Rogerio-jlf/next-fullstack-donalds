import { Product } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";

import { formatCurrency } from "@/helpers/format-currency";

interface ProductsProps {
  products: Product[];
}

// Component
const Products = ({ products }: ProductsProps) => {
  const { slug } = useParams<{ slug: string }>();
  const searchParams = useSearchParams();
  const consumptionMethod = searchParams.get("consumptionMethod");

  // Rendering
  return (
    <div className="space-y-4 px-4 py-2 font-Kodchasan">
      {products.map((product) => (
        <Link
          key={product.id}
          href={`/${slug}/menu/${product.id}?consumptionMethod=${consumptionMethod}`}
          className="flex items-center gap-4 border-b border-gray-300 p-3 transition-all hover:bg-gray-100"
        >
          {/* Product Information */}
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-black">
                {product.name}
              </h3>
            </div>

            <p className="mt-1 line-clamp-2 max-w-md text-sm text-gray-600 font-medium">
              {product.description}
            </p>

            <div className="mt-2 flex items-center gap-2">
              <p className="font-bold text-black">
                {formatCurrency(product.price)}
              </p>
            </div>
          </div>
          {/* ---------- */}

          {/* Product Image */}
          <div className="relative h-24 w-24 overflow-hidden bg-transparent border-none">
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>
        </Link>
      ))}

      {products.length === 0 && (
        <div className="py-12 text-center">
          <p className="text-gray-600">Nenhum produto encontrado</p>
        </div>
      )}
    </div>
  );
};

export default Products;
