import { NextResponse } from "next/server"
// @ts-ignore
import { validateCartItems } from "use-shopping-cart/utilities"

import { inventory } from "@/config/inventory"
import { stripe } from "@/lib/stripe"
import { urlForImage } from "@/sanity/lib/image"

export async function POST(request: Request) {
  const cartDetails = await request.json()
  // const lineItems = validateCartItems(inventory, cartDetails)
  const lineItems = Object.values(cartDetails).map((item: any) => {
    return {
      quantity: item.quantity,
      price_data: {
        unit_amount: item.price,
        currency: item.currency,
        product_data: {
          name: item.name,
          images: [urlForImage(item.images[0]).url()],
          metadata: {
            size: item.product_data.size,
            color: item.product_data.color,
            id:item._id
          }
        }
      }

    }
  })

  console.log("itemsssssssssssss ===>>>>> ", cartDetails);

  const origin = request.headers.get('origin')
  const session = await stripe.checkout.sessions.create({
    submit_type: "pay",
    mode: "payment",
    payment_method_types: ['card'],
    line_items: lineItems,
    shipping_address_collection: {
      allowed_countries: ['US']
    },
    // shipping_options: [
    //   {
    //     shipping_rate: "shr_1NtaaFG2NbtWWba3Bx996z28"
    //   }
    // ],
    billing_address_collection: "auto",
    success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/cart`
  })

  return NextResponse.json(session)
}
