import { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ShoppingCart, Star, ChevronLeft, ChevronRight, ArrowRight, BadgePercent, Truck } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  badge?: string;
  category: string;
}

const products: Product[] = [
  {
    id: "p1",
    name: "Multivitamin Complex",
    brand: "Centrum",
    price: 8.99,
    originalPrice: 11.99,
    image: "https://images.unsplash.com/photo-1763668177859-0ed5669a795e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aXRhbWluJTIwc3VwcGxlbWVudCUyMGJvdHRsZSUyMHBoYXJtYWN5fGVufDF8fHx8MTc3NDQzODA5Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    rating: 4.7,
    reviews: 312,
    badge: "Best Seller",
    category: "Vitamins",
  },
  {
    id: "p2",
    name: "Ibuprofen 400mg Tablets",
    brand: "Nurofen",
    price: 3.49,
    image: "https://images.unsplash.com/photo-1641561421178-db8542057811?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYWluJTIwcmVsaWVmJTIwbWVkaWNpbmUlMjB0YWJsZXQlMjBib3h8ZW58MXx8fHwxNzc0NDM4MDkzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    rating: 4.8,
    reviews: 587,
    category: "Pain Relief",
  },
  {
    id: "p3",
    name: "CeraVe Moisturising Cream",
    brand: "CeraVe",
    price: 12.50,
    originalPrice: 15.99,
    image: "https://images.unsplash.com/photo-1763503836825-97f5450d155a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxza2luY2FyZSUyMG1vaXN0dXJpemVyJTIwY3JlYW0lMjBwcm9kdWN0fGVufDF8fHx8MTc3NDQzODA5M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    rating: 4.9,
    reviews: 1024,
    badge: "Popular",
    category: "Skincare",
  },
  {
    id: "p4",
    name: "Antibacterial Hand Gel",
    brand: "Carex",
    price: 2.29,
    image: "https://images.unsplash.com/photo-1633158829607-291f6a0d2eff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5kJTIwc2FuaXRpemVyJTIwZ2VsJTIwYm90dGxlfGVufDF8fHx8MTc3NDQyNTM5OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    rating: 4.5,
    reviews: 198,
    category: "Hygiene",
  },
  {
    id: "p5",
    name: "First Aid Essentials Kit",
    brand: "Elastoplast",
    price: 9.99,
    image: "https://images.unsplash.com/photo-1563260324-5ebeedc8af7c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXJzdCUyMGFpZCUyMGtpdCUyMG1lZGljYWwlMjBzdXBwbGllc3xlbnwxfHx8fDE3NzQ0MzgwOTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    rating: 4.6,
    reviews: 145,
    category: "First Aid",
  },
  {
    id: "p6",
    name: "Sensodyne Repair & Protect",
    brand: "Sensodyne",
    price: 5.49,
    originalPrice: 6.99,
    image: "https://images.unsplash.com/photo-1759910548177-638d4e6ee0d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b290aHBhc3RlJTIwb3JhbCUyMGNhcmUlMjBkZW50YWx8ZW58MXx8fHwxNzc0NDM4MDk0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    rating: 4.7,
    reviews: 420,
    badge: "Save 21%",
    category: "Oral Care",
  },
  {
    id: "p7",
    name: "Optrex Soothing Eye Drops",
    brand: "Optrex",
    price: 6.29,
    image: "https://images.unsplash.com/photo-1614858819016-2d5e6006f29a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxleWUlMjBkcm9wcyUyMHBoYXJtYWN5JTIwcHJvZHVjdHxlbnwxfHx8fDE3NzQ0MzgwOTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    rating: 4.4,
    reviews: 89,
    category: "Eye Care",
  },
  {
    id: "p8",
    name: "Benylin Cough Syrup",
    brand: "Benylin",
    price: 5.99,
    image: "https://images.unsplash.com/photo-1638082187294-39d28e3c74a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3VnaCUyMHN5cnVwJTIwY29sZCUyMGZsdSUyMG1lZGljaW5lfGVufDF8fHx8MTc3NDQzODA5NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    rating: 4.3,
    reviews: 256,
    category: "Cold & Flu",
  },
  {
    id: "p9",
    name: "SPF 50+ Sun Cream",
    brand: "Nivea Sun",
    price: 7.99,
    originalPrice: 10.49,
    image: "https://images.unsplash.com/photo-1642155973299-75cb601667f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdW5zY3JlZW4lMjBTUEYlMjBsb3Rpb24lMjB0dWJlfGVufDF8fHx8MTc3NDQzODA5Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    rating: 4.8,
    reviews: 378,
    badge: "Summer Essential",
    category: "Sun Care",
  },
  {
    id: "p10",
    name: "Whey Protein Powder",
    brand: "MyProtein",
    price: 24.99,
    originalPrice: 34.99,
    image: "https://images.unsplash.com/photo-1763757933292-d8290692edde?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm90ZWluJTIwcG93ZGVyJTIwaGVhbHRoJTIwbnV0cml0aW9uJTIwc3VwcGxlbWVudHxlbnwxfHx8fDE3NzQ0MzgwOTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    rating: 4.6,
    reviews: 712,
    badge: "Save 29%",
    category: "Nutrition",
  },
];

function ProductCard({ product }: { product: Product }) {
  return (
    <div className="px-2">
      <div className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg hover:border-brand-accent/30 transition-all h-full flex flex-col">
        {/* Image */}
        <div className="relative aspect-square bg-gray-50 overflow-hidden">
          <ImageWithFallback
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {product.badge && (
            <span className="absolute top-3 left-3 bg-brand-secondary text-white text-[0.68rem] px-2.5 py-1 rounded-full" style={{ fontWeight: 600 }}>
              {product.badge}
            </span>
          )}
          <button className="absolute top-3 right-3 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-brand-primary hover:text-white text-gray-500 cursor-pointer">
            <ShoppingCart size={15} />
          </button>
        </div>

        {/* Details */}
        <div className="p-4 flex flex-col flex-1">
          <span className="text-[0.7rem] text-brand-secondary mb-1" style={{ fontWeight: 600 }}>{product.category}</span>
          <p className="text-[0.78rem] text-gray-400 mb-0.5">{product.brand}</p>
          <h4 className="text-[0.9rem] text-gray-900 mb-2 line-clamp-2 flex-1" style={{ fontWeight: 600 }}>{product.name}</h4>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mb-3">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={11} className={i < Math.round(product.rating) ? "fill-amber-400 text-amber-400" : "text-gray-200"} />
              ))}
            </div>
            <span className="text-[0.7rem] text-gray-400">({product.reviews})</span>
          </div>

          {/* Price + Add */}
          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-[1.05rem] text-brand-primary" style={{ fontWeight: 700 }}>£{product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <span className="text-[0.78rem] text-gray-400 line-through">£{product.originalPrice.toFixed(2)}</span>
              )}
            </div>
            <button className="w-9 h-9 rounded-full bg-brand-primary text-white flex items-center justify-center hover:shadow-md hover:shadow-emerald-900/20 transition-all cursor-pointer">
              <ShoppingCart size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function NextArrow({ onClick }: { onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="absolute -right-2 md:-right-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-brand-primary hover:text-white text-gray-600 transition-all cursor-pointer border border-gray-100"
    >
      <ChevronRight size={18} />
    </button>
  );
}

function PrevArrow({ onClick }: { onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="absolute -left-2 md:-left-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-brand-primary hover:text-white text-gray-600 transition-all cursor-pointer border border-gray-100"
    >
      <ChevronLeft size={18} />
    </button>
  );
}

export function ShopSection() {
  const sliderRef = useRef<Slider>(null);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 2,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 4, slidesToScroll: 2 } },
      { breakpoint: 1024, settings: { slidesToShow: 3, slidesToScroll: 1 } },
      { breakpoint: 768, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 480, settings: { slidesToShow: 1.2, slidesToScroll: 1, arrows: false } },
    ],
  };

  return (
    <section id="shop" className="py-16 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-brand-light-alt/30 to-white" />
      <div className="absolute top-10 right-0 w-[500px] h-[500px] bg-brand-accent/5 rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-0 w-[400px] h-[400px] bg-brand-primary/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10">
          <div>
            <span
              className="inline-block text-[0.8rem] px-3 py-1 rounded-full mb-3 bg-brand-primary/10 text-brand-primary"
              style={{ fontWeight: 600 }}
            >
              Online Shop
            </span>
            <h2 className="text-[1.7rem] md:text-[2rem] text-gray-900 mb-2" style={{ fontWeight: 700 }}>
              Popular Health Essentials
            </h2>
            <p className="text-gray-500 max-w-lg">
              Shop over-the-counter medicines, vitamins, skincare and everyday health products — delivered to your door or collect in-store.
            </p>
          </div>
          <button className="inline-flex items-center gap-2 bg-brand-primary text-white px-6 py-3 rounded-lg text-[0.9rem] hover:shadow-lg hover:shadow-emerald-900/20 transition-all cursor-pointer shrink-0" style={{ fontWeight: 600 }}>
            Shop All Products
            <ArrowRight size={16} />
          </button>
        </div>

        {/* Trust banners */}
        <div className="flex flex-wrap gap-4 mb-8">
          {[
            { icon: Truck, text: "Free delivery over £25" },
            { icon: BadgePercent, text: "Exclusive online deals" },
            { icon: ShoppingCart, text: "Click & Collect available" },
          ].map((item) => (
            <div key={item.text} className="flex items-center gap-2 bg-white/70 backdrop-blur-sm border border-emerald-100/50 rounded-full px-4 py-2">
              <item.icon size={14} className="text-brand-accent" />
              <span className="text-[0.78rem] text-gray-600" style={{ fontWeight: 500 }}>{item.text}</span>
            </div>
          ))}
        </div>

        {/* Product carousel */}
        <div className="relative px-2 md:px-6">
          <Slider ref={sliderRef} {...settings}>
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </Slider>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-10">
          <p className="text-gray-400 text-[0.85rem] mb-3">Can't find what you're looking for?</p>
          <button className="inline-flex items-center gap-2 border-2 border-brand-primary text-brand-primary px-6 py-2.5 rounded-full text-[0.9rem] hover:bg-brand-primary/5 transition-colors cursor-pointer" style={{ fontWeight: 600 }}>
            Browse Full Shop
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
