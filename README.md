# SpendWise — Figma UI/UX Design Handoff

This package is a **Figma-importable design handoff**, not a native `.fig` file. Import the SVG artboards into Figma to get editable vector layers, then refine typography, spacing, and component structure as desired.

## Design brief
Design a student-first personal expense tracker that helps students understand monthly spending, manage a simple budget, and make confident day-to-day decisions.

## Artboards (1440 × 1000)
- `screens/01-overview.svg` — dashboard and budget snapshot
- `screens/02-transactions.svg` — searchable transaction screen
- `screens/03-add-expense.svg` — add-expense form with validation error state
- `screens/04-insights.svg` — spending insights and category breakdown

## Figma import
1. Open Figma and create a new Design file.
2. Create a page named `SpendWise — UI/UX`.
3. Drag each SVG from the `screens` folder onto the canvas, or use File → Place image.
4. Each SVG imports as vector artwork. Ungroup if needed to edit individual elements.
5. Create reusable components for sidebar navigation, buttons, cards, form fields, category bars, and transaction rows.
6. Add prototype connections: Overview → Transactions → Insights; Add expense opens the form; Save expense returns to Overview with a success toast.
7. Use Figma's Share button to create a viewable public link for HackIndia if the task accepts a design link.

## Design system
- Primary green: `#287653`
- Deep green: `#174D37`
- Main ink: `#18251F`
- Muted text: `#78827B`
- Canvas: `#F6F8F5`
- Surface: `#FFFFFF`
- Soft green: `#EAF4ED`
- Error: `#B33D36`
- Typography: Manrope for display headings; DM Sans or Inter for UI text.
- Spacing scale: 4, 8, 12, 16, 24, 32, 48.
- Corner radius: 8 for controls, 12 for cards, 16 for hero panels.

## Prototype and accessibility checklist
- Give every interactive control a clear label.
- Keep text contrast strong against its background.
- Show hover, focus, empty, validation-error, and success states.
- Use Auto Layout for cards, lists, navigation, and forms.
- Test the prototype at desktop and mobile widths.

## Important
The SVGs are starter artboards for importing and editing in Figma. They are not a replacement for a fully refined Figma design file or a live interactive prototype. Finish the components and prototype in Figma, then submit the public Figma file link and/or repository according to the exact HackIndia task instructions.
