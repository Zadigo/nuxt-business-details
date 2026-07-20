import { defineNuxtModule, addPlugin, createResolver, addImports, addComponent } from '@nuxt/kit'
import { defu } from 'defu'
import type { BusinessDetails, WorkingDaysOptions } from './runtime/types'

export type ModuleOptions = {
  /**
   * The URL of the business or organization website. This should be a valid URL that points to the homepage of the business or organization.
   */
  siteUrl?: string
  /**
   * The business or organization details. This should be an object containing the name, description, address, and other relevant information about the business or organization.
   */
  business: BusinessDetails
  /**
   * The working days and hours of the business or organization. This should be an object containing the days of the week and their respective working hours.
   */
  workingDays?: WorkingDaysOptions
}

declare module '@nuxt/schema' {
  interface PublicRuntimeConfig {
    businessDetails: ModuleOptions
  }

  interface NuxtConfig {
    businessDetails?: ModuleOptions
  }

  interface NuxtOptions {
    businessDetails: ModuleOptions
  }
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-business-details',
    configKey: 'businessDetails',
  },
  // Default configuration options of the Nuxt module
  defaults: {
    siteUrl: undefined,
    business: {
      name: '-',
      legalName: '-',
      description: '-',
      address: {
        street: '-',
        postalCode: '-',
        city: '-',
        lat: 0,
        lng: 0
      },
      contact: {
        telephone: '-',
        email: '-',
        address: '-'
      },
      socials: {},
      founderImage: undefined,
      logo: '-',
      image: [],
      alternateName: [],
      cloudProvider: {
        address: '-',
        description: '-',
        legalName: '-',
        url: '-',
        rcs: '-'
      },
      creationDate: undefined,
      founder: undefined,
      foundingDate: undefined,
      foundingLocation: undefined,
      editorInChief: undefined,
      founderDescription: undefined,
      founderKnowsAbout: [],
      priceRange: '$',
      publishingDirector: undefined,
      sameAs: [],
      rcs: undefined,
      siret: undefined,
      shareCapital: undefined,
      siren: undefined,
      vatNumber: undefined,
      webContentManager: undefined,
      websiteProvider: {
        legalName: '-',
        url: '-'
      },
    },
    workingDays: {
      only: 'Weekdays'
    }
  },
  setup(options, nuxt) {
    const resolver = createResolver(import.meta.url)

    // Deep-merge nuxt module options + user custom nuxt-authentication options filling missing fields
    const moduleOptions = defu(nuxt.options.runtimeConfig.public.businessDetails, options)

    // Transpile and alias runtime
    const runtimeDir = resolver.resolve('./runtime')
    nuxt.options.alias[ '#nuxt-business-details' ] = runtimeDir
    nuxt.options.build.transpile.push(runtimeDir)

    nuxt.options.runtimeConfig.public.businessDetails = moduleOptions

    // Add composables
    const composablesPath = resolver.resolve('./runtime/composables')
    addImports([
      { name: 'useBusinessDetails', from: composablesPath },
      { name: 'useWorkingDays', from: composablesPath },
    ])

    // Add components
    addComponent({
      name: 'BusinessDetails',
      filePath: resolver.resolve('./runtime/components/BusinessDetails.vue'),
      global: true
    })

    // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
    // addPlugin(resolver.resolve('./runtime/plugin'))
  },
})
