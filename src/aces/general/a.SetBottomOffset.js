export const config = {
  listName: "Set Bottom Offset",
  displayText: "{my}: Set Bottom Offset [i]{0}[/i] (Constraint: {1})",
  description: "Set the bottom offset and how it is measured",
  params: [
    {
      id: "offset",
      name: "Offset",
      desc: "The offset from the anchor edge",
      type: "number",
      initialValue: "0",
    },
    {
      id: "constraint",
      name: "Constraint",
      desc: "How the offset is measured",
      type: "combo",
      initialValue: "absolute",
      items: [{ absolute: "Absolute" }, { percent: "Percent" }, { none: "None" }],
    },
  ],
};

export const expose = true;

export default function (offset, constraint) {
  this._bottom = offset;
  this._bottomMode = constraint;
}
