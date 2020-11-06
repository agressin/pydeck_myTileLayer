/* global window, global */
import { LabeledGeoJsonLayer } from "./labeled-geojson-layer";

const _global = typeof window === 'undefined' ? global : window;
_global.LabeledGeoJsonLayerLibrary = {LabeledGeoJsonLayer};

export default LabeledGeoJsonLayerLibrary;

