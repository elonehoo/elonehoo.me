export interface SocialLink {
  icon: SocialLinkIcon
  link: string
}

export type SocialLinkIcon =
  | 'GitHub'
  | 'Twitter'
  | 'Instagram'
  | 'Mastodon'

export type SocialLinkSize = 'small' | 'medium'
