# Why the first measurement uses a reconstructed viewport

The v1 behavior captured its offsets in the constructor, against
`layer.GetViewport()`. That is the live viewport, and it is already the real
window size by then: `canvasManager.CreateCanvas` calls `SetSize` during init,
and `runtime.Start` only builds the first layout's instances afterwards.

Measuring editor coordinates against the live viewport makes the offsets cancel
out. In absolute mode `_right = bbox.right - viewport.right`, and the update
then computes `viewport.right + _right`, which is `bbox.right` again. So the
object kept its editor position and anchoring did nothing until the window was
resized later. A HUD 20px from the right edge ended up 340px from it in a
2560 wide window, and 300px off screen in a 1280 wide one.

Only viewport anchoring was affected. Parent anchoring set `_needUpdateXY` in
the constructor, so it re-measured on the first tick.

The fix, in `_getLayoutBBox`: measure the first time against the rect the editor
actually showed. Same centre as the live viewport, since `_MaybeUpdateViewport`
always centres on the scroll position, but the project's viewport size:

    scale = (layer.scale * layer.layout.scale - 1) * layer.scaleRate + 1
    width = runtime.viewportWidth / scale

`runtime.viewportWidth` is `GetOriginalViewportWidth()` and is frozen at
construction, despite the name. The live size is not exposed by SDK v2 at all,
and `ILayer.renderScale` cannot recover it because it folds in display scale.

Only the **first** measurement works this way. Anything measured later reads
coordinates the running game wrote, which are in live viewport space, so
`Set enabled`, `Set anchor to` and runtime created instances all measure against
the live viewport. That distinction is what `_needFirstMeasure` and
`_needRemeasure` are for.
