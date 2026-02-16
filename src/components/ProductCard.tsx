'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/catalogue/${product.slug}`}
      className="block bg-white"
      style={{
        borderRadius: '12px',
        border: '1px solid #E5E7EB',
        overflow: 'hidden',
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
      <div className="r-product-img" style={{ position: 'relative', overflow: 'hidden', height: '250px', backgroundColor: '#ffffff', borderBottom: '1px solid #F3F4F6' }}>
        <Image
          src={product.image}
          alt={product.name}
          fill
          style={{ objectFit: 'contain', padding: '12px' }}
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Badges */}
        <div
          className="r-card-badges"
          style={{ position: 'absolute', top: '10px', left: '10px', display: 'flex', flexWrap: 'wrap', gap: '4px', zIndex: 10 }}
        >
          <span
            className="r-card-badge font-semibold"
            style={{
              padding: '3px 10px',
              borderRadius: '20px',
              backgroundColor: '#F3F4F6',
              color: '#374151',
              fontSize: '0.7rem'
            }}
          >
            {product.brand}
          </span>
          <span
            className="r-card-badge font-semibold text-white"
            style={{
              padding: '3px 10px',
              borderRadius: '20px',
              backgroundColor: '#10B981',
              fontSize: '0.7rem'
            }}
          >
            Neuf
          </span>
          <span
            className="r-card-badge font-semibold text-white"
            style={{
              padding: '3px 10px',
              borderRadius: '20px',
              backgroundColor: '#0177ED',
              fontSize: '0.7rem'
            }}
          >
            Rénové
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="r-card-content" style={{ padding: '20px' }}>
        {/* Category */}
        <p
          className="r-card-category uppercase font-semibold text-[#0177ED] mb-2"
          style={{ fontSize: '0.75rem', letterSpacing: '0.5px' }}
        >
          {product.category} • {product.driveType}
        </p>

        {/* Title */}
        <h3
          className="r-card-title font-semibold text-[#111827] mb-4 line-clamp-2"
          style={{ fontSize: '1.125rem', lineHeight: '1.4' }}
        >
          {product.name}
        </h3>

        {/* Specs - hidden on small mobile */}
        <div className="r-card-specs flex flex-wrap" style={{ gap: '8px', marginBottom: '24px' }}>
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

        {/* Button */}
        <span
          className="r-card-buttons inline-flex items-center justify-center text-sm font-semibold text-white"
          style={{
            width: '100%',
            padding: '12px 16px',
            borderRadius: '8px',
            backgroundColor: '#0177ED',
          }}
        >
          Voir détails
        </span>
      </div>
    </Link>
  );
}
