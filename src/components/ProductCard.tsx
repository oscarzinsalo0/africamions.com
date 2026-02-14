'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Product } from '@/types';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const router = useRouter();

  const handleDevisClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    router.push(`/devis?model=${encodeURIComponent(product.name)}`);
  };

  return (
    <Link
      href={`/catalogue/${product.slug}`}
      className="block bg-white overflow-hidden"
      style={{
        borderRadius: '12px',
        border: '1px solid #E5E7EB',
        cursor: 'pointer',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.1)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {/* Image Container */}
      <div className="relative r-product-img" style={{ height: '250px' }}>
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Badges - Marque + Neuf + Rénové */}
        <div
          className="absolute flex flex-wrap"
          style={{ top: '12px', left: '12px', gap: '6px', zIndex: 10 }}
        >
          {/* Badge Marque */}
          <span
            className="text-xs font-semibold"
            style={{
              padding: '4px 12px',
              borderRadius: '20px',
              backgroundColor: '#F3F4F6',
              color: '#374151'
            }}
          >
            {product.brand}
          </span>
          {/* Badge Neuf */}
          <span
            className="text-xs font-semibold text-white"
            style={{
              padding: '4px 12px',
              borderRadius: '20px',
              backgroundColor: '#10B981'
            }}
          >
            Neuf
          </span>
          {/* Badge Rénové */}
          <span
            className="text-xs font-semibold text-white"
            style={{
              padding: '4px 12px',
              borderRadius: '20px',
              backgroundColor: '#0177ED'
            }}
          >
            Rénové
          </span>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '20px' }}>
        {/* Category */}
        <p
          className="uppercase font-semibold text-[#0177ED] mb-2"
          style={{ fontSize: '0.75rem', letterSpacing: '0.5px' }}
        >
          {product.category} • {product.driveType}
        </p>

        {/* Title */}
        <h3
          className="font-semibold text-[#111827] mb-4 line-clamp-2"
          style={{ fontSize: '1.125rem', lineHeight: '1.4' }}
        >
          {product.name}
        </h3>

        {/* Specs */}
        <div className="flex flex-wrap" style={{ gap: '8px', marginBottom: '24px' }}>
          <span
            className="text-xs font-medium text-[#6B7280] bg-gray-100"
            style={{ padding: '6px 12px', borderRadius: '6px' }}
          >
            {product.driveType}
          </span>
          <span
            className="text-xs font-medium text-[#6B7280] bg-gray-100"
            style={{ padding: '6px 12px', borderRadius: '6px' }}
          >
            {product.cabin}
          </span>
        </div>

        {/* Buttons - flex: 1, same width */}
        <div className="flex" style={{ gap: '8px' }}>
          <span
            className="flex-1 inline-flex items-center justify-center text-sm font-semibold text-[#111827] bg-gray-100"
            style={{ padding: '12px 16px', borderRadius: '8px' }}
          >
            Voir détails
          </span>
          <button
            onClick={handleDevisClick}
            className="flex-1 inline-flex items-center justify-center text-sm font-semibold text-white bg-[#0177ED] hover:bg-[#0165CC] transition-colors"
            style={{ padding: '12px 16px', borderRadius: '8px', border: 'none', cursor: 'pointer' }}
          >
            Devis
          </button>
        </div>
      </div>
    </Link>
  );
}
