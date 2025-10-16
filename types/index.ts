export interface EventInfo {
  name: string
  date: string
  time: string
  venue: {
    address: string
    map_link: string
  }
  registration: {
    link: string
    end_date: string
  }
  description: {
    short: string
    long: string
  }
  stats: Array<{
    name: string
    value: string
    color: string
    image: string
  }>
  whatToExpect: Array<{
    title: string
    description: string
  }>
  pastDevFest: {
    summary: string
    images: string[]
    stats: Array<{
      name: string
      value: string
    }>
  }
}

export interface CommunityLinks {
  page: string
  website: string
  instagram: string
  linkedin: string
  youtube: string
}

export interface MainData {
  communityName: string
  communityLocation: {
    country: string
    city: string
  }
  communityDescription: string
  communityLinks: CommunityLinks
  eventInfo: EventInfo
  seo: {
    keywords: string
    hostUrl: string
  }
}

export interface Speaker {
  id: string
  name: string
  designation: string
  company: string
  bio: string
  image: string
  social: {
    linkedin?: string
    twitter?: string
    github?: string
  }
}

export interface Session {
  id: string
  title: string
  description: string
  speaker: string[]
  startTime: string
  endTime: string
  track: string
  type: string
}

export interface FAQ {
  question: string
  answer: string
}

export interface NavbarItem {
  name: string
  path: string
  visible: boolean
}

export interface TeamMember {
  id: string
  name: string
  designation: string
  image: string
  social: {
    linkedin?: string
    twitter?: string
    github?: string
  }
}

export interface Sponsor {
  id: string
  name: string
  logo: string
  website: string
  tier: string
}

export interface Partner {
  id: string
  name: string
  logo: string
  website: string
  description: string
}

export interface Job {
  id: string
  company: string
  title: string
  location: string
  type: string
  description: string
  apply_link: string
}
