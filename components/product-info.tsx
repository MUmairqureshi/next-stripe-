"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import {  formatCurrencyString, useShoppingCart } from "use-shopping-cart"

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
  const [quantity, setQuantity] = useState<number>(1);


  const { addItem, cartDetails   } = useShoppingCart()
  
  const { toast } = useToast()


  function checkInventory(item_name: string, color: string, size: string) {

    if (!product.i_inventory) {
      setInventoryError(true)
      return
    }
    let inventory = product.i_inventory.find((val: any) => val.color === color && val.size === size)

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

  let _inventory = product.i_inventory && product.i_inventory[0].quantity
  const handleIncrement = ( event: React.MouseEvent<HTMLButtonElement, MouseEvent>)  => {
    event.preventDefault();


    if (quantity < _inventory) {
      setQuantity(quantity + 1);

    }

  };

  const handleDecrement = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();


    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
    
  };

  useEffect(() => {
    checkInventory(product.name, selectedColor, selectedSize)


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
      },

    }

    let err = checkInventory(product.name, selectedColor, selectedSize)
    if (err) {
      return
    }
    addItem(item , {count: quantity})

    

    toast({
      title: `${item.name} (${selectedSize})`, // Adjusted this line
      description: "Product added to cart",
      action: (
        <Link href="/cart">
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
              
                <div key={i} onClick={() => setSelectedColor(color)} className={`border-blue ${selectedColor === color && 'bg-[rgba(46,98,112,0.20)]'} cursor-pointer rounded-md border-2 px-3 py-2 text-sm uppercase text-blue`}>
                  {color}
                </div>
              ))}
            </div>
          </div>
        }

        <div className="variables quantity-btns">
          <button  onClick={handleDecrement} disabled={quantity  <=  1 }>-</button>
          <p>{quantity} item</p>
          <button  onClick={handleIncrement}   disabled={inventoryError} >+</button>
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
