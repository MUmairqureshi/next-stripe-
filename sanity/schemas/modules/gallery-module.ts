import {defineField} from 'sanity'

export default defineField({
  name: 'module.gallery',
  title: 'Gallery',
  type: 'object',
  fields: [
    defineField({
      name: "images",
      title: "Images",
      type: 'array',
      of: [{ 
        type: 'image',
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
      }],
    }),
  ],
  preview: {
    select: {
      title: 'flyingTitle',
    },
    prepare(selection) {
      const {title} = selection
      return {
        title: `Gallery Section`
      }
    }
  }
})
