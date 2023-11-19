"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { formatCurrencyString, useShoppingCart } from "use-shopping-cart"
// import { SanityProduct } from "@/config/inventory"
import { getSizeName } from "@/lib/utils"
import { Button } from "@/components/ui/buttons"
import { useToast } from "@/components/ui/use-toast"
import { client } from "@/sanity/lib/client"
import { groq } from "next-sanity"

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
  inventory: number;
  i_inventory: {
    color: string;
    size: string;
    quantity: number
  }[]
}


interface Props {
  product: Product;
}

export function ProductInfo({ product }: Props) {
  const [selectedSize, setSelectedSize] = useState(product.i_inventory && product.i_inventory[0].size)
  const [selectedColor, setSelectedColor] = useState(product.i_inventory && product.i_inventory[0].color)
  const [inventoryError, setInventoryError] = useState(false)
  // const [cartInventoryError, setCartInventoryError] = useState(false)
  const { addItem, cartDetails, incrementItem } = useShoppingCart()
  const { toast } = useToast()
  const isInCart = !!cartDetails?.[product._id]

  function checkInventory(item_name: string, color: string, size: string) {
    // const product = await client.fetch(
    //   groq`*[_type == "product" && name == "${item_name}"][0] {
    //     i_inventory[]{quantity,color->{color},size->{size}},
    //   }`
    // )
    if (!product.i_inventory) {
      setInventoryError(true)
      return
    }
    let inventory = product.i_inventory.find((val: any) => val.color === color && val.size === size)
    console.log(inventory);
    if (!inventory) {
      setInventoryError(true)
    }
    else if (inventory.quantity < 1) {
      setInventoryError(true)
    }
    else {
      setInventoryError(false)
      let currentItem = cartDetails?.[`${product._id}-${selectedSize}-${selectedColor}`]
      if (currentItem && currentItem.quantity >= inventory.quantity) {
        setInventoryError(true)
        return true
      }
    }

  }

  useEffect(() => {
    checkInventory(product.name, selectedColor, selectedSize)
    // console.log("cartDetails ===>>", cartDetails);

  }, [product.name, selectedColor, selectedSize])

  function addToCart() {
    const item = {
      sku: `${product._id}-${selectedSize}-${selectedColor}`, // Use the _id as the sku
      ...product,
      id: `${product._id}-${selectedSize}-${selectedColor}`,
      currency: "USD",
      product_data: {
        size: selectedSize,
        color: selectedColor
      }
    }

    let err = checkInventory(product.name, selectedColor, selectedSize)
    if (err) {
      return
    }
    addItem(item)
    console.log(cartDetails);

    // isInCart ? incrementItem(item._id) : addItem(item)
    toast({
      title: `${item.name} (${getSizeName(selectedSize)})`, // Adjusted this line
      description: "Product added to cart",
      action: (
        <Link href="/">
          <Button variant="link" className="gap-x-2 whitespace-nowrap">
            <span>Open cart</span>
            <ArrowRight className="h-5 w-5" />
          </Button>
        </Link>
      )
    })
  }


  return (
    <div className="product-info">
      <div className="name-description">
        {
          inventoryError && <p className="font-bold text-red-600">Out of stock in {selectedColor} color and {selectedSize} size</p>
        }
        <h3 className="sr-only">Product name and description</h3>
        <h3>{product.name}</h3>
        <div className="product-description">{product.description}</div>
      </div>

      <form>
        {
          product.i_inventory &&
          <div className="variables">
            <p>Size</p>
            <div className="label-wrapper">
              {[... new Set(product.i_inventory.map((inventory) => inventory.size))].map((size, i) => (
                // <label key={`size-${product._id}`} className={i === 0 ? 'checked product-label' : 'product-label'}>
                //   {size}
                //   <input type="radio" name={size} checked={i === 0} />
                // </label>
                <div key={i} onClick={() => setSelectedSize(size)} className={`border-blue ${selectedSize === size && 'bg-[rgba(46,98,112,0.20)]'} cursor-pointer rounded-md border-2 px-3 py-2 text-sm uppercase text-blue`}>
                  {size}
                </div>
              ))}
            </div>
          </div>
        }

        {
          product.i_inventory &&
          <div className="variables">
            <p>Color</p>
            <div className="label-wrapper">
              {[...new Set(product.i_inventory.map((inventory) => inventory.color))].map((color, i) => (
                // <label key={`color-${product._id}`} className={i === 0 ? 'checked product-label' : 'product-label'}>
                //   {color}
                //   <input type="radio" name={color} checked={i === 0} />
                // </label>
                <div key={i} onClick={() => setSelectedColor(color)} className={`border-blue ${selectedColor === color && 'bg-[rgba(46,98,112,0.20)]'} cursor-pointer rounded-md border-2 px-3 py-2 text-sm uppercase text-blue`}>
                  {color}
                </div>
              ))}
            </div>
          </div>
        }

        <div className="variables quantity-btns">
          <p>-</p>
          <p>1 item</p>
          <p>+</p>
        </div>

        <button
          type="button"
          onClick={() => !inventoryError ? addToCart() : false}
          className={`submit-btn ${inventoryError && 'cursor-not-allowed'}`}
          disabled={inventoryError}
        >
          <span>Buy Now</span>
          <span>{formatCurrencyString({ value: product.price, currency: "USD" })}</span>
        </button>
      </form>
    </div>
  )
}
