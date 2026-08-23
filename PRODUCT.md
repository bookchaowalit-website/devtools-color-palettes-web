# Color Palettes — Product brief

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Repository evidence suggests designers and developers who need to inspect a
small palette and move its values into a codebase.

## Product Purpose

Let users browse curated demo palettes, inspect swatches, and export the
selected colors as CSS variables, Tailwind values, or JSON.

## Positioning

The mechanism is a fast, browser-only bridge between visual swatches and the
token formats a frontend project can consume.

## Operating Context

The user chooses a preset, studies the full strip, copies individual HEX
values or the whole palette, and exports the same selection in a code-friendly
format.

## Capabilities and Constraints

- Six static preset palettes are present in `app/page.tsx`.
- Individual HEX, CSS, Tailwind, and JSON copy actions are supported.
- Presets are demo data; image extraction and image export are out of scope.

## Brand Commitments

The product is part of the Bookchaowalit developer-tools portfolio and must
not imply that the static presets are a live collaborative color database.

## Evidence on Hand

- `README.md` documents presets and export formats.
- `app/page.tsx` contains the swatch selection and token serializers.
- No external palette catalog or customer research is claimed.

## Product Principles

- Keep visual choice and code output connected.
- Make copied values unambiguous.
- Preserve the selected palette while moving between export formats.

## Accessibility & Inclusion

Never rely on color alone for selection state or feedback; provide names,
HEX values, keyboard access, focus, and sufficient contrast around swatches.
