import { defineType, defineField } from "sanity";

export const productSizes = defineType({
  name: "productSizes",
  title: "Product Sizes",
  type: "document",
  fields: [
    defineField({
      name: "size",
      title: "Size",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'size',
    }
  }
})
