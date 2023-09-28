import {defineField} from 'sanity'

export default defineField({
  name: 'module.callout',
  title: 'Image + Text',
  type: 'object',
  groups: [
    {
      name: 'media',
      title: 'Media',
    },
    {
      default: true,
      name: 'editorial',
      title: 'Editorial',
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
      name: "imageBorder",
      title: "Add border around image?",
      type: "boolean",
      group: 'media',
    }),
    defineField({
      name: "textblockOne",
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
      name: "sectionDirection",
      title: "Desktop Direction",
      description: "On desktop, should the image appear first?",
      type: "boolean",
      group: 'settings',
    }),

  ],
  initialValue: {
    imageBorder: true,
    sectionDirection: true
  }
})
