import * as turf from "@turf/turf";

import {CompositeLayer, GeoJsonLayer, TextLayer} from './deck-layers';

const defaultProps = {
  // Inherit all of GeoJsonLayer's props
  ...GeoJsonLayer.defaultProps,
  // Label for each feature
  getLabel: { type: "accessor", value: x => x.text },
  // Label size for each feature
  getLabelSize: { type: "accessor", value: 32 },
  // Label color for each feature
  getLabelColor: { type: "accessor", value: [0, 0, 0, 255] },
  // Label always facing the camera
  billboard: true,
  // Label size units
  labelSizeUnits: "pixels",
  // Label background color
  labelBackground: { type: "color", value: null, optional: true },
  // Label font
  fontFamily: "Monaco, monospace"
};

function getLabelAnchors(feature) {
  const {type, coordinates} = feature.geometry;
  switch (type) {
    case 'Point':
      return [coordinates];
    case 'MultiPoint':
      return coordinates;
    case 'Polygon':
      return [turf.centerOfMass(feature).geometry.coordinates];
    case 'MultiPolygon':
      let polygons = coordinates.map(rings => turf.polygon(rings));
      const areas = polygons.map(turf.area);
      const maxArea = Math.max.apply(null, areas);
      // Filter out the areas that are too small
      return polygons.filter((f, index) => areas[index] > maxArea * 0.5)
        .map(f => turf.centerOfMass(f).geometry.coordinates);
    default:
      return [];
  }
}

class LabeledGeoJsonLayer extends CompositeLayer {
  updateState({ changeFlags }) {
    const { data } = this.props;
    if (changeFlags.dataChanged && data) {
      const labelData = (data.features || data).flatMap((feature, index) => {
        const labelAnchors = getLabelAnchors(feature);
        return labelAnchors.map(p =>
          this.getSubLayerRow({ position: p }, feature, index)
        );
      });

      this.setState({ labelData });
    }
  }
  renderLayers() {
    const {
      getLabel,
      getLabelSize,
      getLabelColor,
      labelSizeUnits,
      labelBackground,
      billboard,
      fontFamily
    } = this.props;
    return [
      new GeoJsonLayer(this.props, this.getSubLayerProps({ id: "geojson" }), {
        data: this.props.data
      }),
      new TextLayer(this.getSubLayerProps({ id: "text" }), {
        data: this.state.labelData,
        billboard,
        sizeUnits: labelSizeUnits,
        backgroundColor: labelBackground,
        getPosition: d => d.position,
        getText: this.getSubLayerAccessor(getLabel),
        getSize: this.getSubLayerAccessor(getLabelSize),
        getColor: this.getSubLayerAccessor(getLabelColor)
      })
    ];
  }
}

LabeledGeoJsonLayer.layerName = "LabeledGeoJsonLayer";
LabeledGeoJsonLayer.defaultProps = defaultProps;

export { LabeledGeoJsonLayer };
