<template>
  <div>
    <slot :details="get(key)" />
  </div>
</template>

<script lang="ts" setup>
import type { BusinessDetailsKeys } from '../../../src/runtime/types'
import { useBusinessDetails } from '../../../src/runtime/composables'

defineProps<{
  key: BusinessDetailsKeys
}>()

const { get } = useBusinessDetails()
</script>
