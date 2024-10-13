export interface SocialLink {
  icon: SocialLinkIcon
  link: string
}

export type SocialLinkIcon =
  | 'GitHub'
  | 'Twitter'
  | 'Instagram'
  | 'Mastodon'
  | 'Email'

export type SocialLinkSize = 'small' | 'medium'
