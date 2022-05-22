export interface Message {
  id: string
  type: number
  content: string
  channel_id: string
  author: Author
  attachments: Attachment[]
  embeds: Embed[]
  mentions: Mention[]
  mention_roles: any[]
  pinned: boolean
  mention_everyone: boolean
  tts: boolean
  timestamp: string
  edited_timestamp?: string
  flags: number
  components: any[]
  message_reference?: MessageReference
  referenced_message?: ReferencedMessage
  reactions?: Reaction[]
  sticker_items?: StickerItem[]
}

export interface Author {
  id: string
  username: string
  avatar: string
  avatar_decoration: any
  discriminator: string
  public_flags: number
}

export interface Attachment {
  id: string
  filename: string
  size: number
  url: string
  proxy_url: string
  width: number
  height: number
  content_type: string
}

export interface Embed {
  type: string
  url: string
  thumbnail: Thumbnail
}

export interface Thumbnail {
  url: string
  proxy_url: string
  width: number
  height: number
}

export interface Mention {
  id: string
  username: string
  avatar: string
  avatar_decoration: any
  discriminator: string
  public_flags: number
}

export interface MessageReference {
  channel_id: string
  guild_id: string
  message_id: string
}

export interface ReferencedMessage {
  id: string
  type: number
  content: string
  channel_id: string
  author: Author2
  attachments: any[]
  embeds: any[]
  mentions: Mention2[]
  mention_roles: any[]
  pinned: boolean
  mention_everyone: boolean
  tts: boolean
  timestamp: string
  edited_timestamp?: string
  flags: number
  components: any[]
  message_reference?: MessageReference2
}

export interface Author2 {
  id: string
  username: string
  avatar: string
  avatar_decoration: any
  discriminator: string
  public_flags: number
}

export interface Mention2 {
  id: string
  username: string
  avatar: string
  avatar_decoration: any
  discriminator: string
  public_flags: number
}

export interface MessageReference2 {
  channel_id: string
  guild_id: string
  message_id: string
}

export interface Reaction {
  emoji: Emoji
  count: number
  me: boolean
}

export interface Emoji {
  id?: string
  name: string
  animated?: boolean
}

export interface StickerItem {
  id: string
  format_type: number
  name: string
}
