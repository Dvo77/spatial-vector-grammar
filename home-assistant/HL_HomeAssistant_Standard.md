
HL Naming Standard for Home Assistant
A free, open-source spatial grammar for consistent entity naming, tagging, and organization
MaxSpace Tool Solutions — MSTS HL System — Human Layer Documented: May 2026 | Open Source | No rights reserved


The Problem
Home Assistant is powerful. But every installation names things differently.

sensor.motion_1 ... light.bedroom ... switch.thing_by_door ...

No two installs look the same. Automations break when entities get renamed. Dashboards are personal and non-transferable. Sharing configs with the community requires so much explanation that it's barely worth it.

There is no standard. So every user reinvents it alone.

This document proposes one.


The HL Naming Standard
The HL System (Human Layer) is a free, open-source spatial grammar that gives physical spaces and objects a universal address, a name, and a record — readable by humans, machines, and AI simultaneously.

It was designed for tool shops and homes. It works just as well for Home Assistant.

The core idea: everything has a location, a name, a relationship, and a purpose.


The Address Format
[STRUCTURE]-[ZONE]-[ANCHOR][COLUMN]-[LEVEL][DEPTH]

Segment
Meaning
Example
STRUCTURE
Building or area
GR = Garage, HM = Main House, YD = Yard
ZONE
Room or functional area
LR = Living Room, KT = Kitchen, WS = Workshop
ANCHOR+COLUMN
Wall or position reference
N1 = North wall col 1, C2 = Center col 2
LEVEL
Vertical position
T = Top, M = Middle, B = Bottom, F = Floor
DEPTH
Surface or inside
0 = Surface, 1 = Inside/behind


Examples:

HM-LR-N2-M0    → Main House, Living Room, North wall col 2, Middle shelf, Surface

HM-KT-C1-F0    → Main House, Kitchen, Center col 1, Floor level, Surface

GR-WS-S1-B0    → Garage, Workshop, South wall col 1, Bottom shelf, Surface


HL in Home Assistant
Entity ID Convention
Entity IDs use the HL address in lowercase with underscores:

# Format: domain.hl_address_descriptor

light.hm_lr_n2_m0_lamp

sensor.hm_kt_c1_f0_motion

switch.gr_ws_s1_b0_outlet

lock.hm_fr_door_main

climate.hm_lr_thermostat
Friendly Name Convention
The friendly name is the human-readable version — what shows on your dashboard:

friendly_name: "Living Room | North Wall | Lamp"

friendly_name: "Kitchen | Floor Sensor | Motion"

friendly_name: "Workshop | South Shelf | Outlet"

Format: Zone | Position | Device Type

Simple. Scannable. Consistent across every install.


Tagging Standard
HL uses four core tag categories. Apply them consistently and your dashboards, automations, and scripts become shareable.
Structure Tags
tag: hl_structure_house

tag: hl_structure_garage

tag: hl_structure_yard

tag: hl_structure_outbuilding
Zone Tags
tag: hl_zone_living_room

tag: hl_zone_kitchen

tag: hl_zone_bedroom

tag: hl_zone_workshop

tag: hl_zone_bathroom

tag: hl_zone_utility
Device Type Tags
tag: hl_type_light

tag: hl_type_sensor

tag: hl_type_switch

tag: hl_type_lock

tag: hl_type_climate

tag: hl_type_media

tag: hl_type_camera

tag: hl_type_cover
Function Tags
tag: hl_fn_security

tag: hl_fn_comfort

tag: hl_fn_utility

tag: hl_fn_monitoring

tag: hl_fn_automation_trigger


Category Standard
In Home Assistant's Label system (2023.4+), use HL categories to group entities across domains:

HL-ZONE-KITCHEN

HL-ZONE-LIVING-ROOM

HL-ZONE-WORKSHOP

HL-STRUCTURE-GARAGE

HL-KIT-SECURITY

HL-KIT-MORNING-ROUTINE

HL-KIT-GUEST-MODE

Kits are groups of entities that work together for a purpose — regardless of location. A HL-KIT-SECURITY label might include door locks, motion sensors, and cameras across multiple rooms and structures. All managed together. All consistently named.


Example: Full Entity Configuration
# Bedroom ceiling light

light:

  - platform: your_platform

    name: hm_bd_c1_t0_ceiling

    friendly_name: "Bedroom | Center | Ceiling Light"

    labels:

      - HL-ZONE-BEDROOM

      - HL-KIT-SLEEP-ROUTINE

    tags:

      - hl_structure_house

      - hl_zone_bedroom

      - hl_type_light

      - hl_fn_comfort

# Kitchen motion sensor

binary_sensor:

  - platform: your_platform

    name: hm_kt_c1_f0_motion

    friendly_name: "Kitchen | Center | Motion Sensor"

    labels:

      - HL-ZONE-KITCHEN

      - HL-KIT-SECURITY

    tags:

      - hl_structure_house

      - hl_zone_kitchen

      - hl_type_sensor

      - hl_fn_security

      - hl_fn_automation_trigger


Why This Works
Human readable — anyone can look at hm_lr_n2_m0_lamp and know where it is
Machine readable — automations reference predictable, stable entity IDs
AI ready — paste your entity list into any AI and it immediately understands your layout
Shareable — configs become portable because the naming logic is public
Scalable — works for a 2-device apartment or a 200-device homestead
Database friendly — works with SQLite (default HA), PostgreSQL, MariaDB, or any recorder backend
Wiki friendly — paste into BookStack, WikiJS, Notion, or Obsidian as-is


The Iron Rule
No rule can make the system more complicated than no system at all.

If an HL address is getting unwieldy, simplify it. The grammar serves you. You don't serve the grammar.

A light labeled hm_lr_lamp is infinitely better than light.thing3.


Community Invitation
This standard is open. No license. No rights reserved. No attribution required.

If you improve it — improve it. If you build a Home Assistant integration, a HACS component, a Lovelace card, or a Blueprint around it — build it. If you find a flaw in the address format — fix it and share it.

The goal is a standard the community owns. Not a product anyone sells.

Post your implementations. Share your configs. Build the tooling.

The /concepts folder at the MSTS GitHub repo is where new ideas get timestamped and documented. PRs welcome.


The Embedded Prompt
Copy everything below this line. Paste it into any AI. Describe your home. Push go.



You are an HL System configuration assistant for Home Assistant.

The HL System is a free, open-source spatial grammar that gives 

physical spaces and devices a universal address, a friendly name, 

and consistent tags — readable by humans, machines, and AI.

ADDRESS FORMAT:

[STRUCTURE]-[ZONE]-[ANCHOR][COL]-[LEVEL][DEPTH]

Examples:

HM-LR-N2-M0 = Main House, Living Room, North wall col 2, Middle, Surface

HM-KT-C1-F0 = Main House, Kitchen, Center col 1, Floor, Surface

GR-WS-S1-B0 = Garage, Workshop, South wall col 1, Bottom, Surface

STRUCTURE CODES: HM=House, GR=Garage, YD=Yard, SH=Shed, OB=Outbuilding

ZONE CODES: LR=Living Room, KT=Kitchen, BD=Bedroom, BT=Bathroom, 

            WS=Workshop, UT=Utility, OF=Office, DN=Dining, HW=Hallway

ANCHOR CODES: N=North, S=South, E=East, W=West, C=Center

LEVEL CODES: T=Top, M=Middle, B=Bottom, F=Floor, C=Ceiling

DEPTH CODES: 0=Surface, 1=Inside/Behind

YOUR JOB:

When the user describes their home and devices, generate:

1. ENTITY IDs (lowercase, underscores):

   Format: domain.hl_address_descriptor

   Example: light.hm_lr_n2_m0_lamp

2. FRIENDLY NAMES (human readable for dashboards):

   Format: "Zone | Position | Device Type"

   Example: "Living Room | North Wall | Lamp"

3. LABELS (HA Label system):

   - HL-ZONE-[ZONE NAME]

   - HL-KIT-[PURPOSE GROUP] if applicable

4. TAGS (4 categories):

   - hl_structure_[structure]

   - hl_zone_[zone]

   - hl_type_[device type]

   - hl_fn_[function]

5. YAML CONFIGURATION BLOCK ready to paste into Home Assistant

OUTPUT FORMAT:

For each device, produce:

- Entity ID

- Friendly Name  

- Labels

- Tags

- YAML block

After all devices are configured, produce:

- A summary table of all entities

- A list of all Labels used

- Suggested automations based on the HL kit groupings

IRON RULE: No rule can make the system more complicated than no system at all.

If an address is getting unwieldy, simplify it. The grammar serves the user.

Begin by asking the user: 

"Tell me about your home — how many structures, which rooms, 

and what devices or sensors do you want to configure first?"


Visual Reference
(See companion image: HL_HomeAssistant_Visual.png)

The visual shows:

A simple floor plan with HL zone labels overlaid
An entity card showing the naming convention
A tag hierarchy diagram
A before/after comparison: old random naming vs HL standard



HL System — Human Layer Free. Open source. No rights reserved. MaxSpace Tool Solutions — MSTS github.com/[your-repo-here]
