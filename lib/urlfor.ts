import { client } from "@/sanity/lib/client"
import imageUrlBuilder from "@sanity/image-url"

const builder = imageUrlBuilder(client);

function urlFor(source: any){
  return builder.image(source)
}

export default urlFor;

// const builder = imageUrlBuilder(clientConfig).image(source);

// function urlFor(source: any){
//   return builder.image(source)
// }

// export default urlFor;



// const urlFor = (source) => urlBuilder(config).image(source);
// const components = {
//   types: {
//     image: (props) => {
//       const imageData = props.value;
//       return (
//         <img
//           src={urlFor(imageData)
//             .width(900)
//             .height(900)
//             .fit("crop")
//             .auto("format")
//             .url()}
//           alt={imageData.alt}
//         />
//       );
//     },
//   },
// };