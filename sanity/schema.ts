import { type SchemaTypeDefinition } from "sanity"
/*  documents */
import { product } from "./schemas/documents/product-schema"
import { events } from "./schemas/documents/events-schema"
import { blogs } from "./schemas/documents/blogs-schema"
import { faq } from "./schemas/documents/faq-schema"
import { pages } from "./schemas/documents/pages-schema"
import { orders } from "./schemas/documents/orders"

const documents = [
  product,
  events,
  blogs,
  faq,
  pages,
  orders
]

/*  singletons */
import { about } from "./schemas/singletons/about-schema"
import { settings } from "./schemas/singletons/settings-schema"

const singletons = [about, settings]

/*  global */
import { tags } from "./schemas/global/tags-schema"
import { productCategory } from "./schemas/global/categories-schema"
import { productSizes } from "./schemas/global/sizes-schema"
import { productColors } from "./schemas/global/colors-schema"

const global = [tags, productCategory, productSizes, productColors]

/*  modules */
import calloutModule from './schemas/modules/callout-module'
import cardsModule from './schemas/modules/cards-module'
import galleryModule from './schemas/modules/gallery-module'

const modules = [calloutModule, cardsModule, galleryModule]

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
  types: [...documents, ...singletons, ...global, ...utils, ...modules],
}
