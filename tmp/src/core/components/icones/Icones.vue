<script setup lang="ts">
import EmailIcon from './Email.vue'
import FollowIcon from './Follow.vue'
import GitHubIcon from './GitHub.vue'
import InstagramIcon from './Instagram.vue'
import LeftIcon from './Left.vue'
import MastodonIcon from './Mastodon.vue'
import MoonIcon from './Moon.vue'
import RightIcon from './Right.vue'
import RSSIcon from './RSS.vue'
import SunIcon from './Sun.vue'
import XIcon from './X.vue'

const props = defineProps<{
  name: string
}>()

const icons: Record<string, any> = {
  GitHub: GitHubIcon,
  Email: EmailIcon,
  Twitter: XIcon,
  Instagram: InstagramIcon,
  Mastodon: MastodonIcon,
  Follow: FollowIcon,
  RSS: RSSIcon,
  Right: RightIcon,
  Left: LeftIcon,
  moon: MoonIcon,
  sun: SunIcon,
}
</script>

<template>
  <component :is="icons[props.name]" class="block align-middle" />
</template>
