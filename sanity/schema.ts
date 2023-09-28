import { type SchemaTypeDefinition } from "sanity"
/*  documents */
import { product } from "./schemas/documents/product-schema"
import { events } from "./schemas/documents/events-schema"
import { blogs } from "./schemas/documents/blogs-schema"
import { faq } from "./schemas/documents/faq-schema"
import { pages } from "./schemas/documents/pages-schema"

const documents = [
  product,
  events,
  blogs,
  faq,
  pages
]

/*  singletons */
import { about } from "./schemas/singletons/about-schema"
import { settings } from "./schemas/singletons/settings-schema"

const singletons = [ about, settings ]

/*  global */
import { tags } from "./schemas/global/tags-schema"

const global = [ tags ]

/*  modules */
import calloutModule from './schemas/modules/callout-module'
import cardsModule from './schemas/modules/cards-module'

const modules = [ calloutModule, cardsModule ]

/*  utils */
import blockContent from './schemas/utils/blockContent'
import textBlock from './schemas/utils/textBlock'
import card from './schemas/utils/card'
import linkList from './schemas/utils/linkList'
import link from './schemas/utils/link'

const utils = [ 
  blockContent,
  textBlock,
  card,
  linkList,
  link
]

/*  schema type definitions */
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [ ...documents, ...singletons, ...global, ...utils, ...modules],
}
