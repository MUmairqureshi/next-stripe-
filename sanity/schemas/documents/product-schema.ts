import { defineType, defineField } from "sanity";

export const product = defineType({
  name: "product",
  title: "Products",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string"
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name"
      }
    }),
    {
      name: 'description',
      title: "Description",
      type: 'text'
    },
    {
      name: 'sku',
      title: "SKU",
      type: 'string'
    },
    {
      name: 'price',
      title: "Price (USD)",
      type: 'number'
    },
    {
      name: 'inventory',
      title: "Available Inventory",
      type: 'number'
    },
    defineField({
      name: "images",
      title: "Images",
      type: "array",
      of: [{ type: 'image' }]
    }),
    defineField({
      name: "categories",
      title: "Collections",
      type: "array",
      of: [{type: 'reference', to: {type: 'productCategory'}}],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tags",
      title: "Product Tags",
      type: "array",
      of: [{type: 'reference', to: {type: 'tags'}}],
    }),
    defineField({
      name: "sizes",
      title: "Available Sizes",
      type: "array",
       of: [{type: 'reference', to: {type: 'productSizes'}}],
    }),
    defineField({
      name: "colors",
      title: "Available Colors",
      type: "array",
       of: [{type: 'reference', to: {type: 'productColors'}}],
    }),
  ],
  preview: {
    select: {
      title: 'name',
    },
  }
})
