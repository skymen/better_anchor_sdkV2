# Layers with an angle

`_getLayoutBBox` reconstructs the design viewport as an axis aligned rect. For a
layer with a non zero angle, `GetViewport()` returns a rect that has been
expanded to bound the rotated viewport, so the reconstruction is the unrotated
one and the first measurement will be off.

Not fixed because a rotated layer plus edge anchoring is a strange combination
and nobody has asked for it. If it ever comes up, the reconstruction needs the
same rotate then bound step the engine does, which needs the layer angle and is
public as `ILayer.angle`.
