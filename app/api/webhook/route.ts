import { stripe } from "@/lib/stripe";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import nodemailer from 'nodemailer'
import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";


const endpointSecret = process.env.ENDPOINT_SECRET!;

// stripe listen --forward-to localhost:3000/api/webhook

export async function POST(request: NextRequest) {
    const sig = request.headers.get('stripe-signature') || 'unknown';
    const data = await request.text()
    let event;
    try {
        event = stripe.webhooks.constructEvent(data, sig, endpointSecret);
    } catch (err: any) {
        return NextResponse.json({ message: `Webhook Error =======>>>>>>>>>> : ${err.message}` }, { status: 500 })
    }

    if (event.type === 'checkout.session.completed') {
        try {
            const data: any = event.data.object;
            const lineItems: any = await stripe.checkout.sessions.listLineItems(
                data.id,
                {
                    expand: ['data.price.product'],
                }
            )

            let rows = ''
            for (let i = 0; i < lineItems.data.length; i++) {
                rows += `
                <tr>
                    <td style="border: 1px solid #dddddd; padding: 8px;">${lineItems.data[i].description}</td>
                    <td style="border: 1px solid #dddddd; padding: 8px;">${lineItems.data[i].quantity}</td>
                    <td style="border: 1px solid #dddddd; padding: 8px;">${lineItems.data[i].price?.product?.metadata.size}</td>
                    <td style="border: 1px solid #dddddd; padding: 8px;">${lineItems.data[i].price?.product?.metadata.color}</td>
                    <td style="border: 1px solid #dddddd; padding: 8px;">${(lineItems.data[i].amount_total / 100) / lineItems.data[i].quantity!}</td>
                    <td style="border: 1px solid #dddddd; padding: 8px;">${lineItems.data[i].amount_total / 100}</td>
                </tr>
                `
                const product = await client.fetch(
                    groq`*[_type == "product" && _id == "${lineItems.data[i].price?.product?.metadata.id}"][0] {
                        ...,
                        i_inventory[],
                    }`
                )
                let updated_inventory = product.i_inventory.map((val: any) => {
                    if (val.color === lineItems.data[i].price?.product?.metadata.color && val.size === lineItems.data[i].price?.product?.metadata.size) {
                        val.quantity -= lineItems.data[i].quantity
                    }
                    return val
                })
                const result = client.patch(lineItems.data[i].price?.product?.metadata.id).set({i_inventory:updated_inventory}).commit()
                console.log("webhook ===>>> ", result);
            }

            let config = {
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL,
                    pass: process.env.PASS
                }
            }
            let transporter = nodemailer.createTransport(config);
            let from = `"E-Commerce" <${process.env.EMAIL}>`
            await transporter.sendMail({
                from: from, // sender address
                to: process.env.EMAIL, // ٖ list of receivers 
                subject: "New Order", // Subject line
                html: `
    <table style="border-collapse: collapse; width: 100%;">
        <thead>
            <tr>
                <th style="border: 1px solid #dddddd; background-color: #f2f2f2; text-align: left; padding: 8px;">Product Name</th>
                <th style="border: 1px solid #dddddd; background-color: #f2f2f2; text-align: left; padding: 8px;">Quantity</th>
                <th style="border: 1px solid #dddddd; background-color: #f2f2f2; text-align: left; padding: 8px;">Size</th>
                <th style="border: 1px solid #dddddd; background-color: #f2f2f2; text-align: left; padding: 8px;">Color</th>
                <th style="border: 1px solid #dddddd; background-color: #f2f2f2; text-align: left; padding: 8px;">Unit Price</th>
                <th style="border: 1px solid #dddddd; background-color: #f2f2f2; text-align: left; padding: 8px;">Total Price</th>
            </tr>
        </thead>
        <tbody>
          ${rows}
        </tbody>
    </table>
                `, // html body
            });

            // console.log("Line Items ===>>>>>", lineItems.data[0].price?.product);
        }
        catch (err) {
            console.log("error ========>>>>>>>>>", err)
        }
    }
    return NextResponse.json({ message: "done" })
}