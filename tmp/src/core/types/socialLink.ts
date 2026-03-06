export interface SocialLink {
  icon: SocialLinkIcon
  link: string
}

export type SocialLinkIcon
  = | 'GitHub'
    | 'Twitter'
    | 'Instagram'
    | 'Mastodon'
    | 'Email'
    | 'Follow'
    | 'RSS'

export type SocialLinkSize = 'small' | 'medium'
