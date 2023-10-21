import { defineType, defineField } from "sanity";

export const productColors = defineType({
  name: "productColors",
  title: "Product Colors",
  type: "document",
  fields: [
    defineField({
      name: "color",
      title: "Color",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'color',
      subtitle: 'releaseDate'
    }
  }
})
