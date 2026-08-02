export const config = {
  returnType: "number",
  description: "The current right offset",
  params: [],
};

export const expose = false;

export default function () {
  return this._right;
}
