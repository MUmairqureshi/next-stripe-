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
      description: "The flying title will trump this one, choose wisely.",
      type: "string",
    }),
    defineField({
      name: "isCarousel",
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
    isCarousel: true
  },
  preview: {
    select: {
      title: 'flyingTitle',
    },
    prepare(selection) {
      const {title} = selection
      return {
        title: `Cards Section`
      }
    }
  }
})
