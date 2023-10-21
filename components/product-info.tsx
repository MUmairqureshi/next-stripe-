"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { formatCurrencyString, useShoppingCart } from "use-shopping-cart"
// import { SanityProduct } from "@/config/inventory"
import { getSizeName } from "@/lib/utils"
import { Button } from "@/components/ui/buttons"
import { useToast } from "@/components/ui/use-toast"

interface Size {
  size: string;
}

interface Color {
  color: string;
}

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  sizes: Size[];
  colors: Color[];
}


interface Props {
  product: Product;
}

export function ProductInfo({ product }: Props) {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0])
  const { addItem, cartDetails, incrementItem } = useShoppingCart()
  const { toast } = useToast()
  const isInCart = !!cartDetails?.[product._id]

  function addToCart() {
  const item = {
    sku: product._id, // Use the _id as the sku
    ...product,
    currency: "USD",
    product_data: {
      size: selectedSize
    }
  }

  isInCart ? incrementItem(item._id) : addItem(item)
  toast({
    title: `${item.name} (${getSizeName(selectedSize.size)})`, // Adjusted this line
    description: "Product added to cart",
    action: (
      <Link href="/">
        <Button variant="link" className="gap-x-2 whitespace-nowrap">
          <span>Open cart</span>
          <ArrowRight className="h-5 w-5"/>
        </Button>
      </Link>
    )
  })
}


  return (
    <div className="product-info">
      <div className="name-description">
        <h3 className="sr-only">Product name and description</h3>
        <h3>{product.name}</h3>
        <div className="product-description">{product.description}</div>
      </div>

      <form>
        <div className="variables">
          <p>Size</p>
          <div className="label-wrapper">
            {product.sizes.map((size, i) => (
              <label key={`size-${product._id}`} className={i === 0 ? 'checked product-label' : 'product-label'}>
                {size.size}
                <input type="radio" name={size.size} checked={i === 0} />
              </label>
            ))}
          </div>
        </div>
        
        <div className="variables">
          <p>Color</p>
          <div className="label-wrapper">
            {product.colors.map((color, i) => (
              <label key={`color-${product._id}`} className={i === 0 ? 'checked product-label' : 'product-label'}>
                {color.color}
                <input type="radio" name={color.color} checked={i === 0} />
              </label>
            ))}
          </div>
        </div>
        
        <div className="variables quantity-btns">
          <p>-</p>
          <p>1 item</p>
          <p>+</p>
        </div>

        <button
          type="button"
          onClick={addToCart}
          className="submit-btn"
        >
          <span>Buy Now</span>
          <span>{formatCurrencyString({value: product.price, currency: "USD"})}</span>
        </button>
      </form>
    </div>
  )
}
