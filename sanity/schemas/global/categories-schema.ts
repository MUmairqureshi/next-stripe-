import { defineType, defineField } from "sanity";

export const productCategory = defineType({
  name: "productCategory",
  title: "Collections",
  type: "document",
  fields: [
    defineField({
      name: "category",
      title: "Collection",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "icon",
      title: "Icon",
      type: "image",
    }),
  ],
  preview: {
    select: {
      title: 'category',
    }
  }
})