Custom layers for pydeck
========================

This repo is an example of how to create a custom deck.gl layer for use in pydeck.


```python

import pydeck

pydeck.settings.custom_libraries = [
    {
        "libraryName": "MyTileLayerLibrary",
        "resourceUri": "http://localhost:8888/files/bundle.js",
    }
]

DATA_URL = 'https://c.tile.openstreetmap.org/{z}/{x}/{y}.png'

custom_layer = pydeck.Layer(
    "MyTileLayer",
    DATA_URL
)
```
