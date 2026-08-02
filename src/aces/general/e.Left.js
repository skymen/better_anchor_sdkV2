export const config = {
  returnType: "number",
  description: "The current left offset",
  params: [],
};

export const expose = false;

export default function () {
  return this._left;
}
