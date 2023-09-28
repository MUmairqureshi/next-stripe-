import { defineType, defineField } from "sanity";

export const pages = defineType({
  name: "pages",
  title: "Legal Pages",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "text",
      title: "Body",
      type: "blockContent",
      validation: (Rule) => Rule.required(),
    }),
  ]
})
