import {defineField} from 'sanity'

export default defineField({
  name: 'link',
  title: 'Link',
  type: 'object',
  fields: [
    defineField({
      name: "text",
      title: "Text",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "url",
      title: "URL",
      type: "url",
    }),
    defineField({
      title: 'Email',
      name: 'email',
      type: 'email',
      description: 'adding an email will override any url provided'
    }),
    defineField({
      title: 'Button Style',
      name: 'style',
      type: 'string',
      initialValue: 'default',
      options: {
        list: [
          { title: 'Default', value: 'default' },
          { title: 'Ghost', value: 'ghost' },
          { title: 'Text', value: 'text' },
        ],
      },
    }),
    
  ]
})
