<template>
  <div class="mx-auto max-w-7xl">
    <u-card>
      <h1>{{ get('legalName') }}</h1>
      <p>Reactive Name: {{ name}}</p>
      <p>{{ get('description') }}</p>
      <p>{{ address }}</p>
      <p>{{ get('contact').telephone }}</p>
      <p>{{ activeSocials }}</p>

      <pre>{{ businessDetails }}</pre>
      
      <p>{{ founderImage }}</p>
      <p>{{ geoLocation }}</p>
      <p>{{ getSocial('instagram') }}</p>
      <p>{{ getSocialIcon('instagram') }}</p>
      <p>{{ organizationImages }}</p>
      <p>{{ organizationLogo }}</p>
      <p>{{ suffixLegalName(name, '-') }}</p>

      <p>Working Days: {{ workingDays }}</p>
      <p>Days: {{ days }}</p>
      <p>Get Day: {{ getDay('Monday') }}</p>
    </u-card>
  </div>
</template>

<script setup>
import { useBusinessDetails, useWorkingDaysComposable } from '../src/runtime/composables'
const { get, address, activeSocials, businessDetails, founderImage, geoLocation, getSocial, getSocialIcon, organizationImages, organizationLogo, reactiveGet, suffixLegalName } = useBusinessDetails()

const name = reactiveGet('name')

const { workingDays, days, getDay } = useWorkingDaysComposable()
</script>
