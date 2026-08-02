export const config = {
  listName: "Set Top Edge",
  displayText: "{my}: Set Top Edge [i]{0}[/i]",
  description: "Set which edge of the parent the top edge anchors to",
  params: [
    {
      id: "edge",
      name: "Edge",
      desc: "The parent edge to anchor to",
      type: "combo",
      initialValue: "top",
      items: [{ top: "Top" }, { center: "Center" }, { bottom: "Bottom" }, { none: "None" }],
    },
  ],
};

export const expose = true;

export default function (edge) {
  this._anchorTop = edge;
}
