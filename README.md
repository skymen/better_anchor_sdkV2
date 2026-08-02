<img src="./examples/cover.png" width="150" /><br>
# Better Anchor
<i>Anchor each edge of an object to the viewport or to its parent, with pixel or percentage offsets</i> <br>
### Version 2.0.0.0

[<img src="https://placehold.co/200x50/4493f8/FFF?text=Download&font=montserrat" width="200"/>](https://github.com/skymen/better_anchor_sdkV2/releases/download/skymen_parent_anchor-2.0.0.0.c3addon/skymen_parent_anchor-2.0.0.0.c3addon)
<br>
<sub> [See all releases](https://github.com/skymen/better_anchor_sdkV2/releases) </sub> <br>

#### What's New in 2.0.0.0
- **Added:** SDK v2 port.
- **Fixed:** Anchoring to the viewport now works on the first layout. If the window was not the same size as the project viewport, the object used to stay where the editor put it and only start moving after a later resize. The official Anchor behavior has a similar problem.

<sub>[View full changelog](#changelog)</sub>

---
<b><u>Author:</u></b> skymen <br>
<sub>Made using [CAW](https://marketplace.visualstudio.com/items?itemName=skymen.caw) </sub><br>

## Table of Contents
- [Usage](#usage)
- [Examples Files](#examples-files)
- [Properties](#properties)
- [Actions](#actions)
- [Conditions](#conditions)
- [Expressions](#expressions)
---
## Usage
To build the addon, run the following commands:

```
npm i
npm run build
```

To run the dev server, run

```
npm i
npm run dev
```

## Examples Files
| Description | Download |
| --- | --- |

---
## Properties
| Property Name | Description | Type |
| --- | --- | --- |
| Resize Mode | How the object fills the space between its anchored edges | combo |
| Left Edge | Which edge of the parent the left edge anchors to | combo |
| Left Constraint | How the left offset is measured | combo |
| Top Edge | Which edge of the parent the top edge anchors to | combo |
| Top Constraint | How the top offset is measured | combo |
| Right Edge | Which edge of the parent the right edge anchors to | combo |
| Right Constraint | How the right offset is measured | combo |
| Bottom Edge | Which edge of the parent the bottom edge anchors to | combo |
| Bottom Constraint | How the bottom offset is measured | combo |
| Anchor To | Anchor to the object's hierarchy parent, or to the viewport | combo |
| Enable | Whether the behavior is active | check |


---
## Actions
| Action | Description | Params
| --- | --- | --- |
| Set Anchor To | Anchor to the object's hierarchy parent, or to the viewport | Anchor To             *(combo)* <br> |
| Set Bottom Edge | Set which edge of the parent the bottom edge anchors to | Edge             *(combo)* <br> |
| Set Bottom Offset | Set the bottom offset and how it is measured | Offset             *(number)* <br>Constraint             *(combo)* <br> |
| Set Enabled | Enable or disable the behavior | Enabled             *(boolean)* <br> |
| Set Left Edge | Set which edge of the parent the left edge anchors to | Edge             *(combo)* <br> |
| Set Left Offset | Set the left offset and how it is measured | Offset             *(number)* <br>Constraint             *(combo)* <br> |
| Set Resize Mode | Set how the object fills the space between its anchored edges | Mode             *(combo)* <br> |
| Set Right Edge | Set which edge of the parent the right edge anchors to | Edge             *(combo)* <br> |
| Set Right Offset | Set the right offset and how it is measured | Offset             *(number)* <br>Constraint             *(combo)* <br> |
| Set Top Edge | Set which edge of the parent the top edge anchors to | Edge             *(combo)* <br> |
| Set Top Offset | Set the top offset and how it is measured | Offset             *(number)* <br>Constraint             *(combo)* <br> |


---
## Conditions
| Condition | Description | Params
| --- | --- | --- |
| Is Enabled | True while the behavior is active |  |


---
## Expressions
| Expression | Description | Return Type | Params
| --- | --- | --- | --- |
| Bottom | The current bottom offset | number |  | 
| Left | The current left offset | number |  | 
| Right | The current right offset | number |  | 
| Top | The current top offset | number |  | 


---
## Changelog

**2.0.0.0**
- **Added:** SDK v2 port.
- **Fixed:** Anchoring to the viewport now works on the first layout. If the window was not the same size as the project viewport, the object used to stay where the editor put it and only start moving after a later resize. The official Anchor behavior has a similar problem.
