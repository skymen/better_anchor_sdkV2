export const config = {
  listName: "Set Resize Mode",
  displayText: "{my}: Set Resize Mode [i]{0}[/i]",
  description: "Set how the object fills the space between its anchored edges",
  params: [
    {
      id: "mode",
      name: "Mode",
      desc: "The resize mode",
      type: "combo",
      initialValue: "stretch",
      items: [{ stretch: "Stretch" }, { contain: "Contain" }, { cover: "Cover" }],
    },
  ],
};

export const expose = true;

export default function (mode) {
  this._resizeMode = mode;
}
