/* global window, global */
import { MyTileLayer } from "./my-tile-layer";

const _global = typeof window === 'undefined' ? global : window;
_global.MyTileLayerLibrary = {MyTileLayer};

export default MyTileLayer;

