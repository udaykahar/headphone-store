import sanityClient from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = sanityClient({
    projectId: '7o7gb1pi',
    dataset: 'production',
    apiVersion: '2021-03-25',
    useCdn: true,
    token: process.env.SANITY_TOKEN,
})

const builder = imageUrlBuilder(client)

export function urlFor(source) {
  return builder.image(source)
}




