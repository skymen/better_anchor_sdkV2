const ANCHOR_NONE = 3;
const MODE_ABSOLUTE = 0;
const MODE_PERCENT = 1;
const MODE_NONE = 2;
const ANCHOR_TO_PARENT = 0;
const RESIZE_CONTAIN = 1;
const RESIZE_COVER = 2;

export default function (parentClass) {
  return class extends parentClass {
    constructor() {
      super();
      this._enabled = true;
      this._anchorTop = 0;
      this._anchorLeft = 0;
      this._anchorRight = ANCHOR_NONE;
      this._anchorBottom = ANCHOR_NONE;
      this._anchorParent = 0;
      this._resizeMode = 0;

      this._left = 0;
      this._top = 0;
      this._right = 0;
      this._bottom = 0;
      this._minWidth = 0;
      this._minHeight = 0;

      this._leftMode = 0;
      this._topMode = 0;
      this._rightMode = 0;
      this._bottomMode = 0;

      // Two different measurements. The first one reads coordinates the editor
      // wrote, so it measures against the design viewport. Every later one
      // reads coordinates the running game wrote, so it measures against the
      // live viewport.
      this._needFirstMeasure = true;
      this._needRemeasure = false;
      this.parentAngle = 0;

      const properties = this._getInitProperties();
      if (properties) {
        this._resizeMode = properties[0];
        this._anchorLeft = properties[1];
        this._leftMode = properties[2];
        this._anchorTop = properties[3];
        this._topMode = properties[4];
        this._anchorRight = properties[5];
        this._rightMode = properties[6];
        this._anchorBottom = properties[7];
        this._bottomMode = properties[8];
        this._anchorParent = properties[9];
        this._enabled = properties[10];
      }

      this._onLayoutStart = () => {
        if (this._needFirstMeasure) {
          this._setXYOffsets(true);
          this._needFirstMeasure = false;
          this._needRemeasure = false;
        }
      };
      this.runtime.addEventListener("afteranylayoutstart", this._onLayoutStart);

      if (this._enabled) {
        this._setTicking(true);
        this._setTicking2(true);
      }
    }

    _postCreate() {
      super._postCreate();
      const bbox = this.instance.getBoundingBox();
      this._minWidth = bbox.width;
      this._minHeight = bbox.height;
    }

    _release() {
      this.runtime.removeEventListener(
        "afteranylayoutstart",
        this._onLayoutStart,
      );
      super._release();
    }

    _isParentViewport() {
      return (
        this._anchorParent !== ANCHOR_TO_PARENT || !this.instance.getParent()
      );
    }

    _getParentBBox() {
      if (this._isParentViewport()) {
        this.parentAngle = 0;
        return this.instance.layer.getViewport();
      }
      const parent = this.instance.getParent();
      this.parentAngle = parent.angle;
      return parent.getBoundingBox();
    }

    _getLayoutBBox() {
      const live = this._getParentBBox();
      if (!live || !this._isParentViewport()) return live;

      const layer = this.instance.layer;
      const scale =
        (layer.scale * layer.layout.scale - 1) * layer.scaleRate + 1;
      const width = this.runtime.viewportWidth / scale;
      const height = this.runtime.viewportHeight / scale;
      const midX = (live.left + live.right) / 2;
      const midY = (live.top + live.bottom) / 2;

      return {
        left: midX - width / 2,
        right: midX + width / 2,
        top: midY - height / 2,
        bottom: midY + height / 2,
      };
    }

    _calculateAnchorValue(selfPos, parentPos, parentSize, mode) {
      switch (mode) {
        case MODE_ABSOLUTE:
          return selfPos - parentPos;
        case MODE_PERCENT:
          return (selfPos - parentPos) / parentSize;
        case MODE_NONE:
          return 0;
      }
    }

    _calculateChildPosition(offset, constraint, parentPos, parentSize) {
      switch (constraint) {
        case MODE_ABSOLUTE:
          return parentPos + offset;
        case MODE_PERCENT:
          return parentPos + offset * parentSize;
        case MODE_NONE:
          return parentPos;
      }
    }

    _getParentAnchorValue(anchor, parentBbox, isHorizontal) {
      const start = isHorizontal ? parentBbox.left : parentBbox.top;
      const end = isHorizontal ? parentBbox.right : parentBbox.bottom;
      return {
        val: [start, (start + end) / 2, end, 0][anchor],
        size: end - start,
      };
    }

    _setXYOffsets(fromLayout) {
      const parentBbox = fromLayout
        ? this._getLayoutBBox()
        : this._getParentBBox();
      if (!parentBbox) return;

      const bbox = this.instance.getBoundingBox();

      const l = this._getParentAnchorValue(this._anchorLeft, parentBbox, true);
      this._left = this._calculateAnchorValue(
        bbox.left,
        l.val,
        l.size,
        this._leftMode,
      );

      const t = this._getParentAnchorValue(this._anchorTop, parentBbox, false);
      this._top = this._calculateAnchorValue(
        bbox.top,
        t.val,
        t.size,
        this._topMode,
      );

      const r = this._getParentAnchorValue(this._anchorRight, parentBbox, true);
      this._right = this._calculateAnchorValue(
        bbox.right,
        r.val,
        r.size,
        this._rightMode,
      );

      const b = this._getParentAnchorValue(
        this._anchorBottom,
        parentBbox,
        false,
      );
      this._bottom = this._calculateAnchorValue(
        bbox.bottom,
        b.val,
        b.size,
        this._bottomMode,
      );
    }

    _updatePosition() {
      if (!this._enabled) return;
      if (this._needFirstMeasure || this._needRemeasure) {
        this._setXYOffsets(false);
        this._needFirstMeasure = false;
        this._needRemeasure = false;
      }
      const parentBbox = this._getParentBBox();
      if (!parentBbox) return;

      const inst = this.instance;
      const bbox = inst.getBoundingBox();

      let leftEdge;
      if (this._anchorLeft !== ANCHOR_NONE) {
        const a = this._getParentAnchorValue(
          this._anchorLeft,
          parentBbox,
          true,
        );
        leftEdge = this._calculateChildPosition(
          this._left,
          this._leftMode,
          a.val,
          a.size,
        );
      } else {
        leftEdge = bbox.left;
      }

      let topEdge;
      if (this._anchorTop !== ANCHOR_NONE) {
        const a = this._getParentAnchorValue(
          this._anchorTop,
          parentBbox,
          false,
        );
        topEdge = this._calculateChildPosition(
          this._top,
          this._topMode,
          a.val,
          a.size,
        );
      } else {
        topEdge = bbox.top;
      }

      let rightEdge;
      if (this._anchorRight !== ANCHOR_NONE) {
        const a = this._getParentAnchorValue(
          this._anchorRight,
          parentBbox,
          true,
        );
        rightEdge = this._calculateChildPosition(
          this._right,
          this._rightMode,
          a.val,
          a.size,
        );
      } else {
        rightEdge = leftEdge + this._minWidth;
      }

      let bottomEdge;
      if (this._anchorBottom !== ANCHOR_NONE) {
        const a = this._getParentAnchorValue(
          this._anchorBottom,
          parentBbox,
          false,
        );
        bottomEdge = this._calculateChildPosition(
          this._bottom,
          this._bottomMode,
          a.val,
          a.size,
        );
      } else {
        bottomEdge = topEdge + this._minHeight;
      }

      let newWidth = rightEdge - leftEdge;
      let newHeight = bottomEdge - topEdge;

      if (this._resizeMode === RESIZE_CONTAIN) {
        const ratio = Math.max(
          this._minWidth / newWidth,
          this._minHeight / newHeight,
        );
        leftEdge += (newWidth - this._minWidth / ratio) / 2;
        topEdge += (newHeight - this._minHeight / ratio) / 2;
        newWidth = this._minWidth / ratio;
        newHeight = this._minHeight / ratio;
      } else if (this._resizeMode === RESIZE_COVER) {
        const ratio = Math.min(
          this._minWidth / newWidth,
          this._minHeight / newHeight,
        );
        leftEdge += (newWidth - this._minWidth / ratio) / 2;
        topEdge += (newHeight - this._minHeight / ratio) / 2;
        newWidth = this._minWidth / ratio;
        newHeight = this._minHeight / ratio;
      }

      inst.setSize(newWidth, newHeight);
      inst.setPosition(
        leftEdge + newWidth * inst.originX,
        topEdge + newHeight * inst.originY,
      );
    }

    _tick() {
      this._updatePosition();
    }

    _tick2() {
      this._updatePosition();
    }

    _saveToJson() {
      return {
        enabled: this._enabled,
        anchorTop: this._anchorTop,
        anchorLeft: this._anchorLeft,
        anchorRight: this._anchorRight,
        anchorBottom: this._anchorBottom,
        anchorParent: this._anchorParent,
        resizeMode: this._resizeMode,
        left: this._left,
        top: this._top,
        right: this._right,
        bottom: this._bottom,
        leftMode: this._leftMode,
        topMode: this._topMode,
        rightMode: this._rightMode,
        bottomMode: this._bottomMode,
        minWidth: this._minWidth,
        minHeight: this._minHeight,
        needFirstMeasure: this._needFirstMeasure,
        needRemeasure: this._needRemeasure,
      };
    }

    _loadFromJson(o) {
      this._enabled = o.enabled;
      this._anchorTop = o.anchorTop;
      this._anchorLeft = o.anchorLeft;
      this._anchorRight = o.anchorRight;
      this._anchorBottom = o.anchorBottom;
      this._anchorParent = o.anchorParent;
      this._resizeMode = o.resizeMode;
      this._left = o.left;
      this._top = o.top;
      this._right = o.right;
      this._bottom = o.bottom;
      this._leftMode = o.leftMode;
      this._topMode = o.topMode;
      this._rightMode = o.rightMode;
      this._bottomMode = o.bottomMode;
      this._minWidth = o.minWidth;
      this._minHeight = o.minHeight;
      this._needFirstMeasure = !!o.needFirstMeasure;
      this._needRemeasure = !!o.needRemeasure;
    }

    _getDebuggerProperties() {
      return [
        {
          title: "Better Anchor",
          properties: [
            { name: "Enabled", value: this._enabled },
            { name: "Left", value: this._left },
            { name: "Top", value: this._top },
            { name: "Right", value: this._right },
            { name: "Bottom", value: this._bottom },
          ],
        },
      ];
    }
  };
}
