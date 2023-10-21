import {defineField} from 'sanity'

export default defineField({
  name: 'module.callout',
  title: 'Callout',
  type: 'object',
  groups: [
    {
      name: 'media',
      title: 'Media',
    },
    {
      default: true,
      name: 'editorial',
      title: 'Text',
    },
    {
      name: 'settings',
      title: 'Settings',
    },
  ],
  fields: [
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
      group: 'media',
    }),
    defineField({
      name: "textBlock",
      title: "Text Block",
      type: 'array',
      validation: (Rule) => Rule.max(2),
      group: 'editorial',
      of: [
        {
          name: "textBlock",
          title: "Text Block",
          type: "textBlock"
        }
      ],
    }),
    defineField({
      name: "imageFirst",
      title: "Content Direction",
      description: "Should the image appear first?",
      type: "boolean",
      group: 'settings',
    }),
    defineField({
      name: "tabletColumns",
      title: "Tablet Columns",
      description: "Should the content turn into columns on tablet? (Defaults to true)",
      type: "boolean",
      group: 'settings',
    }),
  ],
  initialValue: {
    imageFirst: true,
    columnView: true,
  },
  preview: {
    select: {
      title: 'textBlock.title',
    },
    prepare(selection) {
      const {title} = selection
      return {
        title: `Callout Section`
      }
    }
  }
})
