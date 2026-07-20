export default defineNuxtConfig({
  modules: [ 'nuxt-business-details', '@nuxt/ui' ],
  devtools: { enabled: true },
  compatibilityDate: 'latest',
  ui: {},
  css: [
    '~/assets/css/tailwind.css'
  ],
  businessDetails: {
    siteUrl: 'https://example.com',
    details: {
      name: 'My Business',
      description: 'We provide the best services in town.',
      logo: '/images/logo.png',
      legalName: 'My Business LLC',
      address: {
        street: '123 Main St',
        postalCode: '12345',
        city: 'Anytown',
        lat: 40.7128,
        lng: -74.0060
      },
      founderImage: '/images/founder.jpg'
    }
  }
})
