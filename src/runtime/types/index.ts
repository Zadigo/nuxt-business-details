export type Undefineable<T> = T | undefined

export type Nullable<T> = T | null

export type Emptyable<T> = T | '' | null | undefined

export type Arrayable<T> = T[]

export type InternetProvider = 'Vercel' | 'OVH' | 'DigitalOcean' | 'Heroku' | 'Netlify' | 'Cloudflare' | 'AWS' | 'GCP' | 'Azure' | 'Other' | (string & {})

export interface WebsiteProvider {
  /**
   * The legal name of the website provider. This is the name that is registered with the government and used for legal purposes.
   * @example "Amazon Web Services, Inc."
   */
  legalName: InternetProvider
  /**
   * The URL of the website provider. This should be a publicly accessible URL to the website provider's homepage.
   * @example "https://aws.amazon.com/"
   */
  url: string
}

export interface CloudProvider extends WebsiteProvider {
  /**
   * A brief description of the cloud provider. This should be a short summary of what the cloud provider does and what services it offers.
   * @example "Amazon Web Services (AWS) is a comprehensive cloud computing platform that provides a wide range of services, including computing power, storage, and databases."
   */
  description: string
  /**
   * The physical address of the cloud provider's headquarters. This should be a string representing the full address, including street, city, postal code, and country.
   */
  address: string
  /**
   * The RCS number of the cloud provider. This is a unique identifier assigned to businesses in France, and is used for legal purposes.
   */
  rcs?: string
}

export interface ContactPoint {
  /**
   * The telephone number of the business or organization. This should be a string representing the phone number, including the country code and area code.
   * @example "+1-800-555-5555"
   */
  telephone: string
  /**
   * The email address of the business or organization. This should be a string representing the email address, and should be a valid email format.
   * @example "info@example.com"
   */
  email: string
  /**
   * The physical address of the business or organization. This should be a string representing the full address, including street, city, postal code, and country.
   */
  address: string
}

export type SocialPlatform = 'instagram' | 'facebook' | 'pinterest' | 'twitter' | 'linkedin' | 'tiktok' | 'youtube' | 'github' | 'dribbble' | 'behance' | 'medium' | 'reddit' | 'snapchat' | 'whatsapp' | 'telegram' | 'discord' | (string & {})

export type Social = {
  /**
   * The URL of the social media profile. This should be a publicly accessible URL to the social media profile.
   * @example "https://www.instagram.com/fentybeauty"
   */
  url: string
  /**
   * The handle of the social media profile. This should be the username or handle of the social media profile.
   * @example "@fentybeauty"
   */
  handle?: string
}

export type Address = {
  /**
   * The street address of the business or organization headquarters. This should be 
   * the full street address, including the street number and name.
   */
  street: string
  /**
   * The postal code of the business or organization headquarters. This should be the postal code for the city where the business is located.
   */
  postalCode: string
  /**
   * The city of the business or organization headquarters. This should be the name of the city where the business is located.
   */
  city: string
  /**
   * The latitude of the business or organization headquarters. This should be a decimal number representing the latitude coordinate.
   */
  lat: Nullable<number>
  /**
   * The longitude of the business or organization headquarters. This should be a decimal number representing the longitude coordinate.
   */
  lng: Nullable<number>
}

/**
 * The AmericanBusinessDetails type represents the specific details of a business or organization in the United States. It includes properties such as the Employer Identification Number (EIN), North American Industry Classification System (NAICS) code, Standard Industrial Classification (SIC) code, D-U-N-S number, state of incorporation, and country of incorporation. These properties are used for tax purposes, industry classification, credit reporting, and legal identification of businesses in the United States.
 * @link https://aspireapp.com/us/blog/usa-registration-number
 */
export type AmericanBusinessDetails = {
  /**
   * The Employer Identification Number (EIN) of the business or organization. This is a unique identifier assigned to businesses in the United States for tax purposes.
   * @example "12-3456789"
   */
  tin?: string
  /**
   * The North American Industry Classification System (NAICS) code of the business or organization. This is a unique identifier assigned to businesses in the United States for industry classification purposes.
   * @example "541511" for Custom Computer Programming Services
   */
  naics?: string
  /**
   * The Standard Industrial Classification (SIC) code of the business or organization. This is a unique identifier assigned to businesses in the United States for industry classification purposes.
   * @example "7371" for Computer Programming Services
   */
  sic?: string
  /**
   * The D-U-N-S number of the business or organization. This is a unique identifier assigned to businesses by Dun & Bradstreet for credit reporting purposes.
   * @example "12-345-6789"
   */
  duns?: string
  /**
   * The state of incorporation of the business or organization. This should be a two-letter state code representing the state where the business is incorporated.
   * @example "CA" for California, "NY" for New York.
   */
  stateOfIncorporation?: string
  /**
   * The country of incorporation of the business or organization. This should be a two-letter country code representing the country where the business is incorporated.
   * @example "US" for United States, "CA" for Canada.
   */
  countryOfIncorporation?: 'FR' | 'US' | 'GB' | 'ES' | 'DE' | 'IT' | 'CH' | (string & {})
}

export type EuropeanBusinessDetails = {
  /**
   * The VAT number of the business or organization. This is a unique identifier
   * assigned to businesses in the European Union, and is used for tax purposes.
   */
  vatNumber?: Nullable<string>
}

export type FrenchBusinessDetails = EuropeanBusinessDetails & {
  /**
   * The SIREN number of the business or organization. This is a unique identifier assigned to businesses in France.
   */
  siren?: string
  /**
   * The SIRET number of the business or organization. This is a unique identifier assigned to businesses in France, and is used for tax purposes.
   */
  siret?: string
  /**
   * The RCS number of the business or organization. This is a unique 
   * identifier assigned to businesses in France, and is used for legal purposes.
   */
  rcs?: string
}

export type BusinessDetails = EuropeanBusinessDetails & FrenchBusinessDetails & {
  /**
   * The name of the business or organization. This is the name that will 
   * be displayed on the website and in search results.
   */
  name: string
  /**
   * The legal name of the business or organization. This is the name that 
   * is registered with the government and used for legal purposes.
   */
  legalName: string
  /**
   * The alternate names of the business or organization. This can be a single string or an array of strings.
   * @example ["Fenty Beauty", "Fenty"]
   */
  alternateName?: string | string[]
  /**
   * The date the business or organization was created. This should be in the format YYYY-MM-DD.
   */
  creationDate?: string
  /**
   * A description of the business or organization. This should be a brief summary of what the business does and what it offers.
   * @example "Fenty Beauty is a cosmetics brand founded by Rihanna that offers a wide range of makeup products for all skin tones."
   */
  description: string
  /**
   * The URL of the logo of the business or organization. This should be a publicly accessible URL to an image file.
   * @example "https://www.fentybeauty.com/logo.png"
   */
  logo: string
  /**
   * The social media profiles of the business or organization. This should be an array of URLs to the social media profiles.
   * @example ["https://www.instagram.com/fentybeauty", "https://www.facebook.com/fentybeauty"]
   */
  sameAs?: string[]
  /**
   * The images of the business or organization. This should be an array of URLs to the images.
   */
  image?: string[]
  /**
   * The address of the business or organization. This should be an object containing the street, postal code, city, latitude, and longitude of the business headquarters.
   */
  address?: {
    /**
     * The street address of the business or organization headquarters. This should be the full street address, including the street number and name.
     */
    street: string
    /**
     * The postal code of the business or organization headquarters. This should be the postal code for the city where the business is located.
     */
    postalCode: string
    /**
     * The city of the business or organization headquarters. This should be the name of the city where the business is located.
     */
    city: string
    /**
     *  The latitude of the business or organization headquarters. This should be a decimal number representing the latitude coordinate.
     */
    lat: Nullable<number>
    /**
     * The longitude of the business or organization headquarters. This should be a decimal number representing the longitude coordinate.
     */
    lng: Nullable<number>
  }
  /**
   * The price range of the business or organization. This should be a string representing the price range, using dollar signs to indicate the level of expense.
   * @example "$" for inexpensive, "$$" for moderate, "$$$" for expensive.
   */
  priceRange?: '$' | '$$' | '$$$'
  /**
   * The date the business or organization was founded. This should be in the format YYYY-MM-DD.
   */
  foundingDate?: string
  /**
   * The location where the business or organization was founded. This should be a string representing the city and country where the business was founded.
   * @example "Los Angeles, California, USA"
   */
  foundingLocation?: string | Address
  /**
   * The URL of the founder's image. This should be a publicly accessible URL to an image file.
   * @example "https://www.fentybeauty.com/founder.jpg"
   */
  founderImage?: Nullable<string>
  /**
   * The share capital of the business or organization. This should be a string representing the amount of share capital, in the currency of the country where the business is registered.
   * @example "1,000,000 EUR"
   */
  shareCapital?: Nullable<string>
  /**
   * The name of the founder of the business or organization. This should be a string representing the full name of the founder.
   * @example "Rihanna"
   */
  founder?: string
  /**
   * A description of the founder of the business or organization. This should be a brief summary of the founder's background and achievements.
   */
  founderDescription?: string
  /**
   * An array of topics that the founder of the business or organization is knowledgeable about. This should be an array of strings representing the topics.
   * @example ["Cosmetics", "Fashion", "Entrepreneurship"]
   */
  founderKnowsAbout?: string[]
  /**
   * The name of the web content manager of the business or organization. This should be a string representing the full name of the web content manager.
   */
  webContentManager?: string
  /**
   * The name of the publishing director of the business or organization. This should be a string representing the full name of the publishing director.
   */
  publishingDirector?: string
  /**
   * The name of the editor-in-chief of the business or organization. This should be a string representing the full name of the editor-in-chief.
   */
  editorInChief?: string
  /**
   * The website provider of the business or organization. This should be an object containing the legal name and URL of the website provider.
   */
  websiteProvider?: WebsiteProvider
  /**
   * The cloud provider of the business or organization. This should be an object containing the legal name, description, address, RCS number, and URL of the cloud provider.
   */
  cloudProvider?: CloudProvider
  /**
   * The contact points of the business or organization. This should be an object containing the telephone number, email address, and physical address of the business.
   */
  contact?: ContactPoint
  /**
   * The social media profiles of the business or organization. This should be an object containing the social media platforms and their corresponding URLs and handles.
   * @example { instagram: { url: "https://www.instagram.com/fentybeauty", handle: "@fentybeauty" }, facebook: { url: "https://www.facebook.com/fentybeauty" } }
   */
  socials?: Partial<Record<SocialPlatform, Social>>
}

export type BusinessDetailsKeys = keyof BusinessDetails

export type BusinessDetailsKeyValue = {
  [K in keyof BusinessDetails]: BusinessDetails[K]
}

export type Days = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday'

export type WorkingDay = {
  /**
   * The day of the week. This should be one of the following strings: 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', or 'Sunday'.
   * @example "Monday"
   */
  day: Days
  /**
   * The start time of the working day. This should be a string representing the time in 24-hour format (HH:mm).
   * @example "09:00"
   */
  startTime?: string
  /**
   * The end time of the working day. This should be a string representing the time in 24-hour format (HH:mm).
   * @example "17:00"
   */
  endTime?: string
}

export type WorkingDaysOptions = {
  /**
   * Apply the same working hours to all days.
   */
  startTime?: string
  /**
   * Apply the same working hours to all days.
   */
  endTime?: string
  /**
   * Apply working hours only to specific days.
   *  If 'Custom' is selected, the customDays property will be
   * used to determine which days are working days.
   */
  only: 'Weekdays' | 'Weekends' | 'Custom'
  /**
   * If 'Custom' is selected in the only property, this property
   * will be used to determine which days are working days and
   * their respective working hours.
   */
  customDays?: WorkingDay[]
}
