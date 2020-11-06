import * as turf from "@turf/turf";

import {TileLayer, BitmapLayer} from './deck-layers';


class MyTileLayer extends TileLayer {
  renderSubLayers(props){
      const {
        bbox: {west, south, east, north}
      } = props.tile;

      return new BitmapLayer(props, {
        data: null,
        image: props.data,
        bounds: [west, south, east, north]
      });
    }
}

MyTileLayer.layerName = "MyTileLayer";

export { MyTileLayer };
