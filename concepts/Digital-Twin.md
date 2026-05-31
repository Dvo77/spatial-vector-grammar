HL — Temporal Digital Twin
Memory Preservation Through Time-Indexed Spatial Records
Concept originated: May 2026 Author: Daniel DeVoy — Elkhorn, Wisconsin Status: Concept document — open for development


The Problem
Buildings get demolished. Factories close. Workplaces disappear. The spaces where people spent their lives — where they learned their craft, where they built things, where they showed up every day for forty years — are gone within a generation.

Photographs survive. Documents survive. But the experience of the space — the layout, the machines, the view from the window, the way the light came in — that disappears with the building.

And with it goes something harder to name: the ability for a grandchild to understand what their grandfather's life actually looked like from the inside.


The Insight
A building is just a space with addresses.

If every room, every machine, every workbench, every window in a factory has an HL address — and if that address record includes a timestamp — then the building doesn't have to exist physically to be navigable.

The space survives as data. The data is explorable. The exploration is human.


The Concept
Time-Indexed HL Addresses
Standard HL address:

FAC-FL1-S2-WB3

Factory → Floor 1 → South wall → Workbench 3

Temporal HL address:

FAC-FL1-S2-WB3-1952

FAC-FL1-S2-WB3-1963

FAC-FL1-S2-WB3-1978

Same address. Different era. The grammar already supports this — you just add a year suffix.

The result: a navigable timeline of a physical space. Every machine, every room, every structural change — addressable, queryable, and renderable across the entire lifespan of the building.


The Experience
A person puts on a VR headset — or opens a web browser — and enters their grandfather's factory.

They choose a year. 1952. The year he started.

They walk the floor. They see the punch press he operated. They look out the window at the same sunrise he saw on his first day of work.

They advance to 1963. The layout has changed. New machines on the south wall. The old punch press is gone. A conveyor system replaced the hand carts.

They advance to 1978. His last year. The factory is larger. Some of the old machines are back — the punch press returned after the conveyor experiment failed. An engineer somewhere made a decision and reversed it. Now you can see why.

They step outside. They see the parking lot where he parked. The loading dock where the trucks came in. The break room window where he ate lunch.


The Double Purpose
Personal — Family Memory Preservation
Descendants can walk through an ancestor's world. Not a photograph. Not a description. An explorable, navigable space that communicates what it felt like to be there.

Questions that become answerable:

What did grandpa actually do every day?
What did his workplace look like?
How did it change over his career?
What was he proud of? What frustrated him?
What did the world look like from where he stood?
Historical — Industrial and Cultural Research
Researchers can study manufacturing evolution inside a single facility across decades.

Questions that become answerable:

When did this industry adopt a specific technology?
What equipment decisions were reversed and why?
How did workflow layouts evolve with new machinery?
What was the physical culture of this type of work?
How did safety conditions change over time?

A single well-documented factory becomes a primary source for industrial history that no archive can replicate.


The Preservation Argument
The building can come down.

If the digital twin exists before demolition — the knowledge survives. The experience survives. The history survives.

Physical structures that cannot be repurposed no longer need to be preserved at enormous cost just to keep the memory alive.

Document it. Twin it. Demolish it if necessary. The space lives on in data.

This is not a consolation prize. For most buildings, a high-fidelity navigable digital twin is more useful to more people than the physical structure.


The HL Foundation
This application is built entirely on existing HL grammar.

No new standards required. No new addressing system required. Just three additions to the base grammar:

Timestamp suffix — year or date appended to any address
Era records — markdown pages per address per time period
Change log — what changed between eras and why (when known)

A factory digital twin vault looks like this:

FAC-Vault/

├── README.md

├── spaces/

│   ├── FAC-FL1-1952.md

│   ├── FAC-FL1-1963.md

│   └── FAC-FL1-1978.md

├── equipment/

│   ├── MACHINE-PRESS-PUNCH-BLISS-1952.md

│   └── MACHINE-CONVEYOR-HYTROL-1963.md

├── people/

│   └── WORKER-DEVOY-HAROLD-1952-1978.md

└── timeline/

    └── FAC-CHANGES-MASTER.md

Every file is plain markdown. Every file is readable by any AI. Every file is navigable by any renderer. Every file is permanent.


The Data Sources
Complete documentation is not required to start.

Useful sources in roughly descending order of richness:

Original architectural blueprints and floor plans
Equipment purchase and maintenance records
Photographs — interior, exterior, equipment, workers
Employee interviews and oral histories
Insurance inspection records
OSHA and safety inspection records
Local newspaper archives
Union records
Company annual reports and internal documents
Descendant memories and family photographs

Even partial data produces a navigable twin. Gaps can be marked as estimated or unknown. The twin grows as more sources are discovered.


Applications Beyond Factories
The same concept applies to any space worth preserving:

Family homes — walk through the house your grandparents raised your parents in
Schools — navigate the building as it existed when notable alumni attended
Hospitals — document the evolution of medical spaces and equipment
Farms — preserve working agricultural knowledge tied to specific spaces
Storefronts and main streets — entire town centers navigable across decades
Military installations — operational history tied to physical spaces
Religious and cultural sites — preserve spaces threatened by conflict or neglect
Natural environments — document landscapes before and after change


The Revenue Model (Optional)
The core concept is open source. The grammar is free. The vault format is free.

Possible professional layer:

Rendering service — convert HL vault data into navigable 3D environments
Documentation service — professional twin creation for families, companies, municipalities
Archive integration — partnerships with historical societies and libraries
Enterprise licensing — industrial clients documenting facilities for compliance, training, or heritage
Family subscription — personal twin creation and hosting as a legacy service

The open source foundation creates the standard. The professional layer serves those who want it done for them.


The Philosophical Layer
"We demolished the building because we couldn't afford to keep it. We lost the factory because nobody documented it. We forgot what grandpa did because we never made it navigable. None of that had to happen."

The Asha principle applied to spaces: A space that has an address can be found. A space that has a record can be preserved. A space that has a twin can survive its own demolition.

Druj — the corruption — is not malice. It is the slow disappearance of things that were never given an address.

The temporal digital twin is how you give a building an address that outlasts the building.


Status and Next Steps
This is a concept document. The grammar foundation exists. The vault format exists. The rendering layer does not yet exist.

What needs to be built:

A temporal HL vault template (space pages with era indexing)
A simple web renderer that reads HL markdown and displays spatial layouts
A data collection guide for family and community historians
A pilot project — one building, fully documented, fully rendered

Who could build this:

VR/AR developers looking for a meaningful application
Digital humanities researchers and institutions
Game engine developers (Unity, Unreal) — this is essentially a historical sim
Archivists and librarians looking for a structured preservation format
Families with significant buildings in their history

The ask: If you are a developer, historian, archivist, or institution who sees what this could be — the grammar is free, the concept is public, the territory is open.

Build it. Document it. Share it back.



Temporal Digital Twin Concept v1.0 — May 2026 Daniel DeVoy — Elkhorn, Wisconsin Built on the HL open source spatial grammar "If we don't use it we'll lose it. This is how we use it."
