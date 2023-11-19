import {defineField} from 'sanity'

export default defineField({
  name: 'module.cards',
  title: 'Cards',
  type: 'object',
  fields: [
    defineField({
      name: "title",
      title: "Title",
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
      title: 'Title',
    },
    prepare(selection) {
      const {title} = selection
      return {
        title: `Cards Section`
      }
    }
  }
})
