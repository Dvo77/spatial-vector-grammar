
HL — Human Layer
A spatial grammar for making any physical environment machine-readable and human-navigable.
"Nothing is lost. Everything is logic."


What Is This?
HL is not an app. It is not a platform. It is a grammar — a set of rules for assigning addresses to physical spaces and the things inside them.

Once you speak the grammar, any human, any AI, any scanner, any automation system can understand your space without a manual, without onboarding, and without a proprietary database.

If you know a street address, you already understand HL.

The minimum deployment is a piece of tape and a marker. Everything else — QR codes, Home Assistant integration, AI agents, robotics rovers — is an upgrade layer built on top of that foundation.


The Problem
Every maker, collector, homesteader, and workshop owner has the same problem:

You don't know exactly where something is
Your smart home knows the state of your devices but not the physical location of your stuff
When you move something, your automation breaks
When someone else needs to find something, they can't

No existing system solves all three at once. HL does — because it starts with a grammar, not an app.


The Address Format
Every location gets one address. Six segments. Read left to right, broad to specific.

[STRUCT]-[ZONE]-[ANCHOR][COL]-[LEVEL][DEPTH]

Segment
What It Means
Example
Rule
STRUCT
Building or structure
SH = Shop, BM = Basement, GR = Garage
2 letters
ZONE
Room or sub-area
MM = Workshop, OF = Office, KTC = Kitchen Closet
2–3 letters
ANCHOR
Wall or reference point
N S E W M F C
1 letter
COL
Column, left to right
1 = far left
1–9
LEVEL
Vertical shelf tier
A = bottom, counts up
A–T
DEPTH
How deep inside
0 = visible surface
0–9

Example
SH-MM-S3-A1

Decoded: Shop → Workshop zone → South wall → Column 3 → Bottom shelf → Surface (visible)
Regex Validator
^([A-Z]{2})-([A-Z]{2,3})-([NSEWMFC][1-9])-([A-T])([0-9])$


The Three Rules That Never Break
The physical label is the source of truth. If the database disagrees with the label on the wall, the label wins until a human decides otherwise.
Friction is the enemy. Any rule that makes the system harder to use than no system is a bad rule.
You can only drop from the left. S3-A1 is valid shorthand. SH-S3-1 is not.


Counting Rules (Immutable)
Direction
Rule
Why
Horizontal
Left → Right. Column 1 is always far left.
Natural reading order
Vertical
Bottom → Top. Level A is always lowest.
You can always add a shelf on top. You can't add one at the bottom without renumbering.
Depth
Front → Back. Depth 0 is always visible surface.
Nearest = most accessible
Mobile carts
Position 1 is always the Northwest corner. Count clockwise.
Orientation-independent regardless of how the cart is rotated



The Three Identity Layers
Every physical item has three pieces of identity:

Layer
Answers
Format
Example
WHERE
Location
HL address
SH-MM-S3-A1
WHAT
Container
Vessel ID
MS-013
NAME
Item identity
Noun-First tag
FASTENER-SCREW-WOOD-PHILLIPS


All three together = full traceability. Any one alone = partial traceability. You don't need all three to start.


Item Naming: The Noun-First Rule
Every item name starts with its root category noun. This makes inventory searchable and AI-parsable without a thesaurus.

Format: ROOT-TYPE-DETAIL-SPEC

Valid
Invalid
FASTENER-SCREW-WOOD-PHILLIPS-2IN
Phillips Wood Screw 2 inch
TOOL-DRILL-BIT-1_4IN
1/4 inch drill bit
CONSUMABLE-TAPE-ELECTRICAL-BLACK
Black electrical tape

The Five Root Nouns
Root
What Belongs Here
TOOL
Hand tools, power tools, measuring instruments, jigs
FASTENER
Screws, bolts, nails, staples, anchors, rivets
MATERIAL
Lumber, metal stock, pipe, wire, sheet goods, raw stock
CONSUMABLE
Adhesives, lubricants, tape, spray paint, sandpaper, solder
COMPONENT
Electronics, fittings, switches, hardware, mechanical parts


If an item doesn't map to one of these five, the answer is not to add a sixth — it's to figure out which of the five it actually is.


Mobile Assets: The Three-State Model
Mobile containers (tool carts, portable cases, project totes) are not fixed to a location. They have a home address and a current state.

State
Meaning
How Detected
Home
Its designated "lives here" address
Default baseline
Active
Being used at a project location
Phone scan, BT beacon, Home Assistant
Missing
Not at home, not logged active
Rover sees empty slot, flags it


The system doesn't need perfect real-time tracking. It needs a known home and a last known state. Everything else is inference — the same logic warehouse management systems use at industrial scale.


Color Coding
Root
Color
Rationale
TOOL
Green
Operational / go
FASTENER
Gray / Silver
Neutral, metallic
MATERIAL
Brown
Raw / natural
CONSUMABLE
Yellow
Caution / depletes
COMPONENT
Blue
Information / data


Hard rule — not overridable: Red is reserved for POWER, ELECTRICAL, and DANGER across all deployments.


The Scan-Scan Workflow
1. Scan the location QR  →  "I am at SH-MM-S3-A1"

2. Scan the item QR      →  "This is MS-013"

3. Result: MS-013 is now logged at SH-MM-S3-A1

Two scans. No typing. No app navigation. Works in reverse for check-out.


Sub-Zone Rule
When a smaller space shares walls with a parent zone, add C to the parent code.

Space
Code
Back Bedroom
BB
Back Bedroom Closet
BBC
Kitchen
KT
Kitchen Pantry
KTC


Only for physically connected spaces. Independent rooms get their own 2-letter code.


Layers: What HL Connects To
HL is the grammar layer. These systems plug in on top:

Layer
What It Does
Examples
Physical
The labeled space itself
Tape labels, printed cards, engraved plaques
OCR / QR
Machine-readable anchors
QR codes, thermal labels, stencils
Human Interaction
How people query the space
Voice, phone scan, search prompt
AI Assistance
Inference and retrieval
Local LLM, Home Assistant, RAG pipeline
Functional Relationships
Kits, projects, dependencies
Tool kits, project workflows, shared tools


The grammar works at Layer 1 with zero technology. Every layer above it is optional.


Home Assistant Integration
Because HL codes are short and uniform they map directly to entity names:

switch.sh_mm_s3e_receptacle   →  Shop, Workshop zone, South wall pos 3, Electrical

binary_sensor.sh_mm_s5e_light →  Shop, Workshop zone, South wall pos 5, Light switch

If a smart device moves, you update one field. The address never changes.


The Context Card
Every zone should have a printed context card containing:

Zone identifier and human-readable name
Compass orientation diagram
Column and level reference grid
QR code linking to the zone's wiki or database page
List of vessels currently assigned to this zone

The context card works offline. Hand it to anyone — or photograph it — and any LLM with vision can parse the entire space from a single image.


Minimum Viable Deployment
You do not need a server, a scanner, or a QR printer to start.

1. Pick a zone

2. Assign it a code

3. Write the code on a piece of tape

4. Put the tape on the shelf

The system is running. Scale from there.


What Does Not Change
These rules are the constitution. They survive software changes, layout changes, AI changes, and ten years of use.

Six-segment address format
Left-to-right column counting
Bottom-to-top level counting
Front-to-back depth counting
Mobile cart Northwest-start orientation
Five root nouns
Red = power/danger only
Drop from the left only
Physical label wins over database in a conflict
What Can Change
Structure and zone codes (define your own)
Color assignments (except red)
Display tier on labels
Vessel prefix conventions
Context card visual design
Wiki / database tooling


Applications Beyond Home Inventory
The grammar is environment-agnostic. Any space with identity, location, and relationship fits the model:

Game engines / simulations — dungeon rooms are zones, inventory items are vessels
Workshop and makerspace management
Small warehouse and parts rooms
Home Assistant spatial automation
Estate planning and asset documentation
Emergency responder space orientation
RAG pipelines for local AI agents


Status
Grammar specification locked (v1.0)
Regex validator published
Real-world deployment documented (kitchen, workshop, fastener wall)
Home Assistant entity mapping defined
Mobile asset three-state model defined
Reference implementation (contributions welcome)
Home Assistant integration package
QR label generator
Wiki.js template set


Contributing
The grammar is open. If you implement HL in your space, your makerspace, your game engine, or your automation system — open an issue or discussion and share what you built.

The spec is the floor, not the ceiling.


Origin
HL began as a personal frustration. Daniel DeVoy, a systems thinker and maker in Elkhorn, Wisconsin, was trying to catalog his workshop. The existing tools were inadequate. So he built his own addressing system — a spatial coordinate protocol readable by both humans and machines.
<img width="1254" height="1254" alt="ChatGPT Image May 21, 2026, 08_26_35 AM" src="https://github.com/user-attachments/assets/0b603435-6bf2-4b6b-8d2a-fb4e77c6685b" />
https://claude.ai/public/artifacts/efaaf4d2-7a2f-4f6f-a4bc-92a713069494

"Hoarding is simply un-indexed potential."



HL System Grammar v1.0 — May 2026 Originated by Daniel Ray DeVoy / MSTS
