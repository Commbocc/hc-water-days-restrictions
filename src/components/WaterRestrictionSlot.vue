<script setup lang="ts">
import { restrictions } from '../lib'

const props = defineProps<{ name: WaterRestrictionType }>()
</script>

<template>
  <div v-if="name === restrictions.data"><slot></slot></div>
</template>
