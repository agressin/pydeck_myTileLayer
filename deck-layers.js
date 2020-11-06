// Assume that deck is in the global scope
const _global = typeof window === 'undefined' ? global : window;
const deck = _global.deck;

if (deck === undefined) {
  throw new Error('deck.gl is not in global scope');
}

const {CompositeLayer, GeoJsonLayer, TextLayer} = deck;

export {CompositeLayer, GeoJsonLayer, TextLayer};
