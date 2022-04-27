<script setup lang="ts">
import { SearchBootstrap } from '@hcflgov/vue-esri-search'
import { watchResults, restrictions } from './lib'
</script>

<template>
  <SearchBootstrap
    hc-sources
    hide-sources
    large
    @results="watchResults"
    class="mb-3"
  />

  <div v-if="restrictions.loading" class="d-flex justify-content-center">
    <div class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
</template>
