import {defineField} from 'sanity'

export default defineField({
  name: 'module.cards',
  title: 'Cards',
  type: 'object',
  fields: [
    defineField({
      name: "flyingTitle",
      title: "Flying Title",
      description: "This text will be inside of the plane banner!",
      type: "string",
    }),
    defineField({
      name: "title",
      title: "Regular Title",
      description: "This text will not be inside of the plane banner :(",
      type: "string",
    }),
    defineField({
      name: "carousel",
      title: "Carousel",
      description: "Should this be a carousel?",
      type: "boolean",
    }),
    defineField({
      name: "cards",
      title: "Cards",
      type: 'array',
      of: [
        {
          name: "card",
          title: "Card",
          type: "card"
        }
      ],
    }),
  ],
  initialValue: {
    carousel: true
  }
})
