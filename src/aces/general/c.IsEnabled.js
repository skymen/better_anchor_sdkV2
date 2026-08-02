export const config = {
  listName: "Is Enabled",
  displayText: "{my}: Is enabled",
  description: "True while the behavior is active",
  params: [],
};

export const expose = true;

export default function () {
  return this._enabled;
}
