export const config = {
  listName: "Set Right Offset",
  displayText: "{my}: Set Right Offset [i]{0}[/i] (Constraint: {1})",
  description: "Set the right offset and how it is measured",
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
  this._right = offset;
  this._rightMode = constraint;
}
