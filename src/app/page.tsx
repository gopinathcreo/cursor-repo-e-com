'use client';
import Image from "next/image";
import Card from '@/components/Card';
import { useRef, useState } from 'react';

const fashionProducts = [
  { image: '/shoes.jpg', name: 'Stylish Shoes', mrp: 100, offerPrice: 80 , id:1},
  { image: '/shirts.jpg', name: 'Casual Shirt', mrp: 50, offerPrice: 35, id:2 },
  { image: '/shoes.jpg', name: 'Stylish Shoes', mrp: 100, offerPrice: 80 , id:3},
  { image: '/shirts.jpg', name: 'Casual Shirt', mrp: 50, offerPrice: 35 , id:4},
];

const electronicProducts = [
    { image: '/phones.jpg', name: 'Smartphone', mrp: 500, offerPrice: 450, id:1 },
    { image: '/laptops.jpg', name: 'Laptop', mrp: 1000, offerPrice: 850, id:2 },
    { image: '/phones.jpg', name: 'Smartphone', mrp: 500, offerPrice: 450, id:3 },
    { image: '/laptops.jpg', name: 'Laptop', mrp: 1000, offerPrice: 850, id:4 },
];

interface Product {
  id: number;
  image: string;
  name: string;
  mrp: number;
  offerPrice: number;
}

interface ScrollableSectionProps {
  title: string;
  products: Product[];
}

function ScrollableSection({ title, products }: ScrollableSectionProps) {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollPosition = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth);
    }
  };

  const scroll = (direction: number) => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      scrollRef.current.scrollBy({ left: direction * clientWidth, behavior: 'smooth' });
    }
  };

  return (
    <section className="mt-12 w-full max-w-4xl">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="relative">
        {canScrollLeft && (
          <button
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 shadow-md"
            onClick={() => scroll(-1)}
          >
            &lt;
          </button>
        )}
        <div
          className="flex overflow-x-auto scrollbar-hide"
          ref={scrollRef}
          onScroll={checkScrollPosition}
        >
          {products.map((product) => (
            <div key={product.id} className="flex-shrink-0 w-64">
              <Card {...product} />
            </div>
          ))}
        </div>
        {canScrollRight && (
          <button
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 shadow-md"
            onClick={() => scroll(1)}
          >
            &gt;
          </button>
        )}
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen p-8 pb-20 sm:p-20 font-sans">
      <header className="text-center py-4">
        <h1 className="text-4xl font-bold">E-Com</h1>
      </header>
      <nav className="bg-gray-100 py-2">
        <ul className="flex justify-center space-x-4">
          <li><a href="#" className="text-lg hover:underline">Shirts</a></li>
          <li><a href="#" className="text-lg hover:underline">Shoes</a></li>
          <li><a href="#" className="text-lg hover:underline">Laptops</a></li>
          <li><a href="#" className="text-lg hover:underline">Phones</a></li>
          <li><a href="#" className="text-lg hover:underline">Home Appliances</a></li>
        </ul>
      </nav>
      <main className="flex flex-col items-center mt-8">
        <div className="w-full max-w-4xl">
          <Image
            src="/banner.jpg"
            alt="Promotional Banner"
            width={1200}
            height={400}
            className="rounded-lg shadow-lg"
          />
        </div>
        <ScrollableSection title="Fashionable Products" products={fashionProducts} />
        <ScrollableSection title="Electronics" products={electronicProducts} />
      </main>
    </div>
  );
}
