import { Button, ButtonTwo } from "@/components/ui/buttons";
import Image from "next/image";
import { urlForImage } from "@/sanity/lib/image";
import { shimmer, toBase64 } from "@/lib/image";

interface Category {
  icon: {
    asset: any; // This should ideally be further typed based on the structure of 'asset'
  };
  category: string;
}

interface ProductCategoriesProps {
  categories: Category[];
  products: any[]; // This is a placeholder. You should define a type or interface for 'products' if possible.
}

export default function ProductCategories({ categories, products }: ProductCategoriesProps) {
  // const router = useRouter()
  // const searchParams = useSearchParams()
  // const searchValues = Array.from(searchParams.entries())

  if (categories.length === 0) { return null }

  return (
    <div className='product-categories'>
      {categories.map((category: Category) => (
        <button className="category-btn">
          <Image
            placeholder="blur"
            blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(20, 20))}`}
            src={urlForImage(category.icon.asset).url()}
            alt={category.category}
            width={20}
            height={20}
          />

          {category.category}
        </button>
      ))}
    </div>
  );
}
