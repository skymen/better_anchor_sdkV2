import {
  ADDON_CATEGORY,
  ADDON_TYPE,
  PLUGIN_TYPE,
  PROPERTY_TYPE,
} from "./template/enums.js";
import _version from "./version.js";
export const addonType = ADDON_TYPE.BEHAVIOR;
export const type = PLUGIN_TYPE.OBJECT;
export const id = "skymen_parent_anchor";
export const name = "Better Anchor";
export const version = _version;
export const minConstructVersion = undefined;
export const author = "skymen";
export const website = "https://www.construct.net";
export const documentation = "https://www.construct.net";
export const description =
  "Anchor each edge of an object to the viewport or to its parent, with pixel or percentage offsets";
export const category = ADDON_CATEGORY.GENERAL;

export const hasDomside = false;
export const files = {
  extensionScript: {
    enabled: false,
    watch: false,
    targets: ["x86", "x64"],
    name: "MyExtension",
  },
  fileDependencies: [],
  remoteFileDependencies: [],
  cordovaPluginReferences: [],
  cordovaResourceFiles: [],
};

export const aceCategories = {
  general: "General",
};

export const info = {
  Set: {
    CanBeBundled: true,
    IsDeprecated: false,
    IsOnlyOneAllowed: true,
  },
  AddCommonACEs: {
    Position: false,
    SceneGraph: false,
    Size: false,
    Angle: false,
    Appearance: false,
    ZOrder: false,
  },
};

const EDGE_X = [
  { left: "Left" },
  { center: "Center" },
  { right: "Right" },
  { none: "None" },
];
const EDGE_Y = [
  { top: "Top" },
  { center: "Center" },
  { bottom: "Bottom" },
  { none: "None" },
];
const CONSTRAINT = [
  { absolute: "Absolute" },
  { percent: "Percent" },
  { none: "None" },
];

// Order is frozen for compatibility with v1 projects. Append only.
export const properties = [
  {
    type: PROPERTY_TYPE.COMBO,
    id: "resize_mode",
    options: {
      initialValue: "stretch",
      items: [
        { stretch: "Stretch" },
        { contain: "Contain" },
        { cover: "Cover" },
      ],
    },
    name: "Resize Mode",
    desc: "How the object fills the space between its anchored edges",
  },
  {
    type: PROPERTY_TYPE.COMBO,
    id: "anchor_left",
    options: { initialValue: "left", items: EDGE_X },
    name: "Left Edge",
    desc: "Which edge of the parent the left edge anchors to",
  },
  {
    type: PROPERTY_TYPE.COMBO,
    id: "constraint_left",
    options: { initialValue: "absolute", items: CONSTRAINT },
    name: "Left Constraint",
    desc: "How the left offset is measured",
  },
  {
    type: PROPERTY_TYPE.COMBO,
    id: "anchor_top",
    options: { initialValue: "top", items: EDGE_Y },
    name: "Top Edge",
    desc: "Which edge of the parent the top edge anchors to",
  },
  {
    type: PROPERTY_TYPE.COMBO,
    id: "constraint_top",
    options: { initialValue: "absolute", items: CONSTRAINT },
    name: "Top Constraint",
    desc: "How the top offset is measured",
  },
  {
    type: PROPERTY_TYPE.COMBO,
    id: "anchor_right",
    options: { initialValue: "none", items: EDGE_X },
    name: "Right Edge",
    desc: "Which edge of the parent the right edge anchors to",
  },
  {
    type: PROPERTY_TYPE.COMBO,
    id: "constraint_right",
    options: { initialValue: "absolute", items: CONSTRAINT },
    name: "Right Constraint",
    desc: "How the right offset is measured",
  },
  {
    type: PROPERTY_TYPE.COMBO,
    id: "anchor_bottom",
    options: { initialValue: "none", items: EDGE_Y },
    name: "Bottom Edge",
    desc: "Which edge of the parent the bottom edge anchors to",
  },
  {
    type: PROPERTY_TYPE.COMBO,
    id: "constraint_bottom",
    options: { initialValue: "absolute", items: CONSTRAINT },
    name: "Bottom Constraint",
    desc: "How the bottom offset is measured",
  },
  {
    type: PROPERTY_TYPE.COMBO,
    id: "anchor_to",
    options: {
      initialValue: "parent",
      items: [{ parent: "Parent" }, { screen: "Viewport" }],
    },
    name: "Anchor To",
    desc: "Anchor to the object's hierarchy parent, or to the viewport",
  },
  {
    type: PROPERTY_TYPE.CHECK,
    id: "enable",
    options: { initialValue: true },
    name: "Enable",
    desc: "Whether the behavior is active",
  },
];
