export const config = {
  returnType: "number",
  description: "The current bottom offset",
  params: [],
};

export const expose = false;

export default function () {
  return this._bottom;
}
