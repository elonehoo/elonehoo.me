import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: 'page',
      source: '**/*.md',
      schema: z.object({
        date: z.string().optional(),
        lang: z.string().optional(),
        duration: z.string().optional(),
        layout: z.string().optional(),
        subtitle: z.string().optional(),
        upcoming: z.boolean().optional(),
        recording: z.boolean().optional(),
        img: z.string().optional(),
      }),
    })
  }
})
