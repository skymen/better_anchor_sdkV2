export const config = {
  listName: "Set Right Edge",
  displayText: "{my}: Set Right Edge [i]{0}[/i]",
  description: "Set which edge of the parent the right edge anchors to",
  params: [
    {
      id: "edge",
      name: "Edge",
      desc: "The parent edge to anchor to",
      type: "combo",
      initialValue: "right",
      items: [{ left: "Left" }, { center: "Center" }, { right: "Right" }, { none: "None" }],
    },
  ],
};

export const expose = true;

export default function (edge) {
  this._anchorRight = edge;
}
