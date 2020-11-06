Custom layers for pydeck
========================

This repo is an example of how to create a custom deck.gl layer for use in pydeck.


```python
layer = pydeck.Layer(
    'LabeledGeoJsonLayer'
    data,
    filled=False,
    billboard=False,
    get_line_color=[180, 180, 180],
    get_label='f.properties.name',
    get_label_size=20,
    get_label_color=[0, 64, 128],
    label_size_units='"meters"',
    line_width_min_pixels=1
)
```
