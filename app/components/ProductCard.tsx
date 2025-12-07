import Image from 'next/image';
import type { Product } from '@/lib/types';

interface ProductCardProps {
  product: Product;
}

/**
 * ProductCard component displays a single product with image, title, and price
 */
export default function ProductCard({ product }: ProductCardProps) {
  const { title, priceRange, images, availableForSale } = product;
  const price = parseFloat(priceRange.minVariantPrice.amount);
  const currencyCode = priceRange.minVariantPrice.currencyCode;
  const imageUrl = images.edges[0]?.node.url || '/placeholder.png';
  const imageAlt = images.edges[0]?.node.altText || title;

  // Format price based on currency
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
  }).format(price);

  return (
    <div
      className="group relative flex flex-col"
      data-testid="product-card"
    >
      {/* Product Image */}
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg bg-gray-100">
        <Image
          src={imageUrl}
          alt={imageAlt}
          fill
          className="object-cover object-center transition-opacity group-hover:opacity-75"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        {/* Out of stock overlay */}
        {!availableForSale && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <span className="text-sm font-medium text-white">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="mt-4 flex flex-col gap-1">
        {/* Product Title */}
        <h3 className="text-sm font-medium text-gray-900 line-clamp-2">
          {title}
        </h3>

        {/* Price */}
        <p
          className="text-sm font-medium text-gray-700"
          data-testid="product-price"
        >
          {formattedPrice}
        </p>
      </div>
    </div>
  );
}
