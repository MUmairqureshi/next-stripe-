import { defineType, defineField } from "sanity";

export const events = defineType({
  name: "events",
  title: "Events",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Event Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "date",
      title: "Date",
      type: "date",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "time",
      title: "Time",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tags",
      title: "Event Tags",
      type: "array",
      of: [{ type: 'tags' }]
    }),
    defineField({
      name: "url",
      title: "Link to RSVP",
      type: "url",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "icon",
      title: "Background Icon",
      type: "image",
      fields: [
        {
          name: "alt",
          title: "Alt",
          type: "string"
        }
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "color",
      title: "Background Color",
      type: "color",
      options: {disableAlpha: true},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
  ]
})
