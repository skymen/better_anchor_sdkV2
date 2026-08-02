export const config = {
  listName: "Set Left Edge",
  displayText: "{my}: Set Left Edge [i]{0}[/i]",
  description: "Set which edge of the parent the left edge anchors to",
  params: [
    {
      id: "edge",
      name: "Edge",
      desc: "The parent edge to anchor to",
      type: "combo",
      initialValue: "left",
      items: [{ left: "Left" }, { center: "Center" }, { right: "Right" }, { none: "None" }],
    },
  ],
};

export const expose = true;

export default function (edge) {
  this._anchorLeft = edge;
}
