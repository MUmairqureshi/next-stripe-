import {defineField} from 'sanity'

export default defineField({
  name: 'card',
  title: 'Card',
  type: 'object',
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "text",
      title: "Text",
      type: "string",
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      fields: [
        {
          name: "alt",
          title: "Alt",
          type: "string"
        },
        {
          name: "caption",
          title: "Caption",
          type: "string",
        }
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "cardBorder",
      title: "Add border around card?",
      type: "boolean",
    }),
  ],
  initialValue: {
    cardBorder: true
  }
})
