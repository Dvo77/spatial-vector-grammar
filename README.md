# HL Exchange

A barter, trade, loan, and legacy marketplace built on HL addresses.

## What It Does

Every item in the Exchange has an HL address — a permanent, human-readable location in your physical space. The Exchange lets you:

- **Brag** — show off your prize possessions with provenance and story
- **Trade** — offer items for swap, matched against what others want
- **Borrow** — lend tools and kits to your trusted network
- **Kit Library** — circulate hobby kits, starter sets, and project gear
- **Sell** — list items with estimated value
- **Legacy Mode** — one button flips your entire inventory to estate auction

## The Legacy Mode

This is the feature that matters most.

When Legacy Mode is activated, every Brag and private item becomes available. The estate auction opens. The person managing your affairs doesn't have to figure out what you owned, what it's worth, or where it is — because everything already has an address, a condition note, a provenance, and an estimated value.

Your hoard becomes a catalogue. Your catalogue becomes an estate. Your estate settles cleanly.

## How To Run

```bash
# If you have a React environment
npm install
npm start

# Or drop into any React sandbox (CodeSandbox, StackBlitz)
# and paste the HIL-exchange.jsx file
```

## The Generosity Score

Each user has a Generosity Score (G:00–100) based on lending and trading history.
High scores unlock trust-based borrowing in the network.
This is social infrastructure, not a gamification gimmick.

## Item Data Structure

Each item carries:
- `hil` — HL address (where it lives right now)
- `provenance` — where it came from, its history
- `story` — the human context
- `status` — brag / trade / loan / sale / kit / legacy
- `estimatedValue` — for insurance, estate, and trade context
- `heirloom` — flag for items that carry family or personal significance

## What This Is Not

This is not eBay. It is not a marketplace platform.
It is a local-first, trust-network tool for people who own real things
and want those things to mean something — while they're alive and after.

---

*Part of the HL System — [Back to main repo](../../README.md)*
