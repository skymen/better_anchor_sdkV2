export const config = {
  listName: "Set Bottom Edge",
  displayText: "{my}: Set Bottom Edge [i]{0}[/i]",
  description: "Set which edge of the parent the bottom edge anchors to",
  params: [
    {
      id: "edge",
      name: "Edge",
      desc: "The parent edge to anchor to",
      type: "combo",
      initialValue: "bottom",
      items: [{ top: "Top" }, { center: "Center" }, { bottom: "Bottom" }, { none: "None" }],
    },
  ],
};

export const expose = true;

export default function (edge) {
  this._anchorBottom = edge;
}
