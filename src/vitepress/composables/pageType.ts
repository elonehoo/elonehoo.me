import { useRoute } from 'vitepress'
import { computed } from 'vue'

export function usePageType() {
  const route = useRoute()

  const isPost = computed(() => route.path.startsWith('/posts/'))
  const isNotes = computed(() => route.path.startsWith('/notes/'))

  return {
    isPost,
    isNotes,
  }
}
