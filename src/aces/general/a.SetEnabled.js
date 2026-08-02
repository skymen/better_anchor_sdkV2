export const config = {
  listName: "Set Enabled",
  displayText: "{my}: Set Enabled [i]{0}[/i]",
  description: "Enable or disable the behavior",
  params: [
    {
      id: "enabled",
      name: "Enabled",
      desc: "Whether the behavior is active",
      type: "boolean",
      initialValue: "true",
    },
  ],
};

export const expose = true;

export default function (enabled) {
  this._enabled = !!enabled;
  if (this._enabled) {
    // Re-measure rather than reuse offsets captured before it was turned off.
    this._needRemeasure = true;
    this._setTicking(true);
    this._setTicking2(true);
  } else {
    this._setTicking(false);
    this._setTicking2(false);
  }
}
