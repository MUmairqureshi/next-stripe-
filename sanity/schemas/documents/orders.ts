import { defineType } from "sanity";

export const orders = defineType({
  name: "orders",
  title: "Orders",
  type: "document",
  fields: [
    {
      name: "email",
      title: "Email",
      type: 'string',
    },
    {
      name: "name",
      title: "Name",
      type: 'string',
    },
    {
      name: "address_city",
      title: "Address City",
      type: 'string',
    },
    {
      name: "address_country",
      title: "Address Country",
      type: 'string',
    },
    {
      name: "address_line1",
      title: "Address Line1",
      type: 'string',
    },
    {
      name: "address_line2",
      title: "Address Line1",
      type: 'string',
    },
    {
      name: "address_postal_code",
      title: "Address Postal Code",
      type: 'string',
    },
    {
      name: "address_state",
      title: "Address State",
      type: 'string',
    },
    {
      name: "products",
      title: "Products",
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'product_name',
              title: 'Product Name',
              type: 'string',
            },
            {
              name: 'quantity',
              title: 'Quantity',
              type: 'number',
            },
            {
              name: 'size',
              title: 'Size',
              type: 'string'
            },
            {
              name: 'color',
              title: 'Color',
              type: 'string'
            },
            {
              name: 'unit_price',
              title: 'Unit Price',
              type: 'number'
            },
            {
              name: 'total_price',
              title: 'Total Price',
              type: 'number'
            },
          ],
        }
      ]
    },

  ]
})
