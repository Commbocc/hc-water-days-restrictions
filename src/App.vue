<template>
  <div id="app">
    <HcEsriSearchForm ref="searchForm" @submit="reset" @result="handleResult" />

    <div v-if="searching">
      Searching...
    </div>

    <div v-if="searchComplete">
      <slot name="wellSeptic"></slot>

      <!-- south county restrictions apply -->
      <div v-if="southCounty">
        <slot name="restrictionsSouthCounty"></slot>
      </div>

      <!-- year-round restrictions apply -->
      <div v-else-if="area">
        <slot name="restrictionsYearRound"></slot>
      </div>

      <!-- incorporated restrictions apply -->
      <div v-else>
        <slot name="restrictionsIncorporated"></slot>
      </div>
    </div>
  </div>
</template>

<script>
import HcEsriSearchForm from '@hcflgov/vue-esri-search'

// import { findProviderByName } from './store/providers'

const southCountyAreaFeature = {
  url:
    // 'https://services.arcgis.com/apTfC6SUmnNfnxuF/arcgis/rest/services/South_Central_Conservation_Boundary_Nov_2020/FeatureServer/0',
    'https://services.arcgis.com/apTfC6SUmnNfnxuF/arcgis/rest/services/SouthCentral_Conservation_Boundary_April_2021/FeatureServer/0',
}

const allAreasFeature = {
  url:
    // 'https://services.arcgis.com/apTfC6SUmnNfnxuF/arcgis/rest/services/All_Boundaries/FeatureServer/0',
    'https://services.arcgis.com/apTfC6SUmnNfnxuF/ArcGIS/rest/services/CountyBoundary_Unincorporated/FeatureServer/0',
}

export default {
  install(Vue) {
    Vue.component('HcWaterDaysRestrictions', this)
  },

  mounted() {
    if (process.env.NODE_ENV === 'development') {
      this.$refs.searchForm.userInput = '601 e kennedy blvd, tampa'
    }
  },

  components: {
    HcEsriSearchForm,
  },

  data: () => ({
    searching: false,
    searchComplete: false,
    southCounty: null,
    area: null,
    // provider: null,
    // waterSystem: null,
  }),

  methods: {
    reset() {
      this.searchComplete = false
      this.southCounty = null
      this.area = null
      // this.provider = null
      // this.waterSystem = null
    },
    async handleResult({ queryFeatures }) {
      try {
        this.searching = true

        // test south county
        try {
          this.southCounty = await queryFeatures(southCountyAreaFeature)
        } catch (err) {
          this.southCounty = false
        }

        // test county/incorporated
        try {
          this.area = await queryFeatures(allAreasFeature)
          // this.provider = findProviderByName(this.area.attributes.AREA_NAME)
          // this.waterSystem = this.area.attributes.Potable_Wa
        } catch (err) {
          // no results, well/septic. Restrictions still apply
        }
      } catch (error) {
        // eslint-disable-next-line
        console.warn(error)
      } finally {
        this.searching = false
        this.searchComplete = true
      }
    },
  },
}
</script>
