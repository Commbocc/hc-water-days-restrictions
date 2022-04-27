import { featureLayerProps, queryFeatures } from '@hcflgov/vue-esri-search'
import { reactive } from 'vue'

export const restrictions = reactive<IReactiveRestrictions>({
  loading: false,
})

export const watchResults = async (results: __esri.SearchResult[]) => {
  restrictions.loading = true
  restrictions.data = undefined

  try {
    if (!results.length) throw 'No Search Results'
    const [firstResult] = results

    // south county
    featureLayerProps.url =
      'https://services.arcgis.com/apTfC6SUmnNfnxuF/arcgis/rest/services/SouthCentral_Conservation_Boundary_April_2021/FeatureServer/0'
    const [firstFeature] = await queryFeatures(firstResult?.extent)

    if (firstFeature) {
      restrictions.data = 'southCounty'
    } else {
      featureLayerProps.url =
        'https://services.arcgis.com/apTfC6SUmnNfnxuF/ArcGIS/rest/services/CountyBoundary_Unincorporated/FeatureServer/0'
      const [firstFeature] = await queryFeatures(firstResult?.extent)

      if (firstFeature) restrictions.data = 'yearRound'
    }

    if (!restrictions.data) restrictions.data = 'incorporated'
  } catch (error) {
    console.warn(error)
  } finally {
    restrictions.loading = false
  }
}
