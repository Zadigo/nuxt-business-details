import { useRuntimeConfig } from '#app'
import type { Nullable, BusinessDetailsKeys, BusinessDetailsKeyValue, SocialPlatform, Social } from '../types'
import { isDefined, reactify } from '@vueuse/core'
import { computed } from 'vue'

const socialUrls = [
  'https://www.instagram.com/',
  'https://www.facebook.com/',
  'https://www.pinterest.com/',
  'https://twitter.com/',
  'https://www.linkedin.com/',
  'https://www.tiktok.com/',
  'https://www.youtube.com/',
  'https://www.tiktok.com/',
  'https://www.github.com/',
  'https://www.dribbble.com/',
  'https://www.behance.net/',
  'https://medium.com/',
  'https://www.reddit.com/',
  'https://www.snapchat.com/',
  'https://www.whatsapp.com/',
  'https://telegram.org/',
  'https://discord.com/'
]

function _buildPath(path: Nullable<string>): Nullable<string> {
  if (!isDefined(path)) return null
  const rootUrl = useRuntimeConfig().public.businessDetails.siteUrl || ''
  return new URL(path, rootUrl).toString()
}

/**
 * A utility function to generate a full social media link based on the provided platform and handle.
 * @param platform The social media platform for which to generate the link (e.g., 'instagram', 'facebook').
 * @param handle The social media handle of the user.
 */
export function getSocialLink(platform: SocialPlatform, handle?: string): Nullable<string> {
  if (!isDefined(handle)) return null
  const url = socialUrls.find(url => url.includes(platform))
  if (!isDefined(url)) return null
  return `${url}${handle}`
}

/**
 * A composable to access business details throughout the application. It provides a `get` function
 * to retrieve specific details by key, ensuring type safety and consistency across the app.
 */
export function useBusinessDetails() {
  const businessDetails = useRuntimeConfig().public.businessDetails.business

  function get<K extends BusinessDetailsKeys>(key: K): BusinessDetailsKeyValue[K] {
    return businessDetails[key]
  }

  const reactiveGet = reactify(get)
  const socials = computed(() => get('socials') || {})
  const activeSocials = computed(() => Object.keys(socials.value || {}) as SocialPlatform[])

  function getSocial(platform: SocialPlatform): Social | null {
    const socials = get('socials')
    if (!isDefined(socials)) return null
    return socials[platform] || null
  }

  function getSocialIcon(platform: SocialPlatform): string {
    const icons: Record<SocialPlatform, string> = {
      instagram: 'lucide:instagram',
      facebook: 'lucide:facebook',
      pinterest: 'fa7-brands:pinterest',
      twitter: 'lucide:twitter',
      linkedin: 'lucide:linkedin',
      tiktok: 'lucide:tiktok',
      youtube: 'lucide:youtube',
      behance: 'lucide:behance',
      dribbble: 'lucide:dribbble',
      github: 'lucide:github',
      medium: 'lucide:medium',
      reddit: 'lucide:reddit',
      snapchat: 'lucide:snapchat',
      whatsapp: 'lucide:whatsapp',
      telegram: 'lucide:telegram',
      discord: 'lucide:discord'
    }
    return icons[platform] || 'lucide:link'
  }

  const address = computed(() => {
    const address = get('address')
    if (!isDefined(address)) return ''
    return `${address.street}, ${address.postalCode} ${address.city}`
  })

  const geoLocation = computed(() => {
    const address = get('address')
    if (!isDefined(address)) return '0,0'
    if (isDefined(address.lat) && isDefined(address.lng)) {
      return `${address.lat.toString()},${address.lng.toString()}`
    } else {
      return '0,0'
    }
  })

  function suffixLegalName(name: Nullable<string>, separator: string = ' - '): string {
    const legalName = get('legalName')
    return `${name ?? ''}${separator}${legalName}`
  }

  const founderImage = computed(() => {
    const founderImagePath = get('founderImage')
    if (!isDefined(founderImagePath)) return null
    return _buildPath(founderImagePath)
  })

  const organizationLogo = computed(() => _buildPath(get('logo')))

  const organizationImages = computed(() => {
    const images = get('image')
    if (!isDefined(images)) return []
    return images.map((image: string) => _buildPath(image))
  })

  return {
    /**
     * The business details object containing all relevant information about the business,
     * including contact details, social media links, and more.
     */
    businessDetails,
    /**
     * A computed property that returns an array of active social media
     * platforms based on the provided socials in the business details.
     */
    activeSocials,
    /**
     * A computed property that returns the full address of the business
     * as a formatted string, combining the street, postal code, and city.
     */
    address,
    /**
     * A computed property that returns the geographical location of the business
     * in the format "latitude,longitude". If latitude or longitude is not defined.
     * @default
     * "0,0"
     */
    geoLocation,
    /**
     * A computed property that returns the full URL of the founder's 
     * image, constructed from the base site URL and the relative path provided in the business details.
     */
    founderImage,
    /**
     * A computed property that returns the full URL of the organization's logo,
     * constructed from the base site URL and the relative path provided in the business details.
     */
    organizationLogo,
    /**
     * A computed property that returns an array of full URLs for the organization's images,
     * constructed from the base site URL and the relative paths provided in the business details.
     */
    organizationImages,
    /**
     * A function that appends the legal name of the business to a given name,
     * separated by a specified separator (default is ' - ').
     */
    suffixLegalName,
    /**
     * A function to retrieve specific business details by key, ensuring type safety.
     * @param key - The key of the business detail to retrieve.
     */
    get,
    /**
     * A reactive version of the `get` function, useful for reactive contexts.
     * @param key - The key of the business detail to retrieve reactively.
     */
    reactiveGet,
    /**
     * A function to retrieve social media details for a specific platform.
     * @param platform - The social media platform to retrieve details for (e.g., 'instagram', 'facebook').
     */
    getSocial,
    /**
     * A function to retrieve the icon name for a specific social media platform.
     * @param platform - The social media platform to retrieve the icon for (e.g., 'instagram', 'facebook').
     */
    getSocialIcon
  }
}
