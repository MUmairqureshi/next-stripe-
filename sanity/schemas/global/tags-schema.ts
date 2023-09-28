import { defineType, defineField } from "sanity";

export const tags = defineType({
  name: "tags",
  title: "Global Tags",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "icon",
      title: "Icon",
      type: "image",
    }),
  ]
})
