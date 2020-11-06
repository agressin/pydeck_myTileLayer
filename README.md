Tile layer for pydeck
========================

Using custom layer in pydeck to handle Tile layer ( based on [pydeck_custom_layer](https://github.com/ajduberstein/pydeck_custom_layer) )

```python

import pydeck

pydeck.settings.custom_libraries = [
    {
        "libraryName": "MyTileLayerLibrary",
        "resourceUri": "https://cdn.jsdelivr.net/gh/agressin/pydeck_myTileLayer@master/dist/bundle.js",
    }
]

DATA_URL = 'https://c.tile.openstreetmap.org/{z}/{x}/{y}.png'

custom_layer = pydeck.Layer(
    "MyTileLayer",
    DATA_URL
)
```
