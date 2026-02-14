'use client';

import { useState, useMemo } from 'react';
import { products, brands, categories } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import CataloguePDFBanner from '@/components/CataloguePDFBanner';

export default function CataloguePage() {
  const [selectedBrand, setSelectedBrand] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      if (selectedBrand && product.brand !== selectedBrand) return false;
      if (selectedCategory && product.category !== selectedCategory) return false;
      return true;
    });
  }, [selectedBrand, selectedCategory]);

  const clearFilters = () => {
    setSelectedBrand('');
    setSelectedCategory('');
  };

  const hasActiveFilters = selectedBrand || selectedCategory;

  return (
    <>
      {/* Hero Section */}
      <section
        className="bg-gray-50 border-b border-gray-200"
        style={{ paddingTop: '100px', paddingBottom: '48px' }}
      >
        <div className="container-custom">
          <div className="text-center" style={{ maxWidth: '700px', margin: '0 auto' }}>
            <h1
              className="font-bold text-[#111827] r-page-title"
              style={{ fontSize: '2.5rem', lineHeight: '1.2', marginBottom: '16px' }}
            >
              Notre catalogue
            </h1>
            <p style={{ fontSize: '1.125rem', color: '#6B7280', lineHeight: '1.7', marginBottom: '40px' }}>
              Découvrez notre gamme complète de camions et véhicules industriels HOWO et SHACMAN,
              disponibles neufs ou rénovés.
            </p>
          </div>
        </div>
      </section>

      {/* Filters & Products */}
      <section className="py-10 sm:py-14 lg:py-16 pb-16 sm:pb-20 lg:pb-24">
        <div className="container-custom">
          {/* Filters Container */}
          <div
            className="bg-white"
            style={{
              padding: '24px',
              borderRadius: '12px',
              border: '1px solid #E5E7EB',
              marginBottom: '32px'
            }}
          >
            <div
              className="flex flex-col md:flex-row md:items-center justify-between mb-4"
              style={{ gap: '16px' }}
            >
              <h2
                className="font-semibold text-[#111827]"
                style={{ fontSize: '1.125rem' }}
              >
                Filtres
              </h2>
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="text-[#0177ED] hover:underline font-medium"
                  style={{ fontSize: '0.875rem' }}
                >
                  Effacer les filtres
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: '16px' }}>
              {/* Brand Filter */}
              <div>
                <label
                  htmlFor="brand"
                  className="block font-semibold text-[#374151] mb-2"
                  style={{ fontSize: '0.875rem' }}
                >
                  Marque
                </label>
                <select
                  id="brand"
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                  className="w-full bg-white"
                  style={{
                    padding: '14px 16px',
                    border: '1px solid #E5E7EB',
                    borderRadius: '8px',
                    fontSize: '1rem'
                  }}
                >
                  <option value="">Toutes les marques</option>
                  {brands.map(brand => (
                    <option key={brand} value={brand}>{brand}</option>
                  ))}
                </select>
              </div>

              {/* Category Filter */}
              <div>
                <label
                  htmlFor="category"
                  className="block font-semibold text-[#374151] mb-2"
                  style={{ fontSize: '0.875rem' }}
                >
                  Type de véhicule
                </label>
                <select
                  id="category"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full bg-white"
                  style={{
                    padding: '14px 16px',
                    border: '1px solid #E5E7EB',
                    borderRadius: '8px',
                    fontSize: '1rem'
                  }}
                >
                  <option value="">Tous les types</option>
                  {categories.map(cat => (
                    <option key={cat.value} value={cat.value}>{cat.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div style={{ marginBottom: '24px' }}>
            <p style={{ color: '#6B7280' }}>
              <span className="font-semibold text-[#111827]">{filteredProducts.length}</span> véhicule{filteredProducts.length > 1 ? 's' : ''} trouvé{filteredProducts.length > 1 ? 's' : ''}
            </p>
          </div>

          {/* Products Grid - 3 columns on desktop, 2 on tablet, 1 on mobile */}
          {filteredProducts.length > 0 ? (
            <div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
              style={{ gap: '24px' }}
            >
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center" style={{ padding: '80px 0' }}>
              <div
                className="flex items-center justify-center mx-auto mb-4"
                style={{
                  width: '64px',
                  height: '64px',
                  backgroundColor: '#F3F4F6',
                  borderRadius: '50%'
                }}
              >
                <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3
                className="font-semibold text-[#111827] mb-2"
                style={{ fontSize: '1.25rem' }}
              >
                Aucun véhicule trouvé
              </h3>
              <p style={{ color: '#6B7280', marginBottom: '24px' }}>
                Modifiez vos critères de recherche pour trouver des véhicules.
              </p>
              <button
                onClick={clearFilters}
                className="btn-primary"
              >
                Voir tous les véhicules
              </button>
            </div>
          )}
        </div>
      </section>

      {/* PDF Banner - après les produits */}
      <section className="pb-12 sm:pb-16 lg:pb-20">
        <div className="container-custom">
          <CataloguePDFBanner />
        </div>
      </section>
    </>
  );
}
