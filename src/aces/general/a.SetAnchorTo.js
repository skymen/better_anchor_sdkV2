export const config = {
  listName: "Set Anchor To",
  displayText: "{my}: Set Anchor To [i]{0}[/i]",
  description: "Anchor to the object's hierarchy parent, or to the viewport",
  params: [
    {
      id: "anchor",
      name: "Anchor To",
      desc: "What to anchor to",
      type: "combo",
      initialValue: "parent",
      items: [{ parent: "Parent" }, { screen: "Viewport" }],
    },
  ],
};

export const expose = true;

export default function (anchor) {
  if (this._anchorParent === anchor) return;
  this._anchorParent = anchor;
  this._needRemeasure = true;
}
