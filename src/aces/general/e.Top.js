export const config = {
  returnType: "number",
  description: "The current top offset",
  params: [],
};

export const expose = false;

export default function () {
  return this._top;
}
