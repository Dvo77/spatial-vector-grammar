# HL Label Engine

Generate physical labels for any HL-addressed location, shelf, or electrical port.

## What It Does

- **Zone Placards** — wall-mounted room and zone identification cards
- **Shelf/Bin Labels** — narrow horizontal labels for shelves, drawers, and bins
- **Electrical Port Tags** — circuit-traced labels for outlets, keystones, and power strips
- Generates QR codes that link to the HL address or your wiki URL
- Outputs visual labels (print or screenshot) or raw text for thermal printers

## How To Run

No install. No server. No account.

1. Download `label-engine.html`
2. Open it in any browser
3. Fill in the address fields
4. Hit Generate
5. Print or screenshot the label

Works completely offline.

## How It Connects to HL Grammar

Every label is built on a valid HL address:

```
[STRUCT]-[ZONE]-[ANCHOR][COL]-[LEVEL][DEPTH]
```

Example: `SH-MM-S3-A1`
Shop → MaxOMess zone → South wall → Column 3 → Bottom shelf → Surface

The electrical tab extends the grammar with circuit tracing:
outlet address → circuit → breaker → panel

## QR Code Options

- **HL Address mode** — QR encodes the address string directly
- **Wiki URL mode** — QR links to your local wiki page for that zone

## Thermal Printer Support

The Raw Text output is formatted for RawBT and Thermer.
Copy the output, paste into your thermal printer app, done.

---

*Part of the HL System — [Back to main repo](../../README.md)*
