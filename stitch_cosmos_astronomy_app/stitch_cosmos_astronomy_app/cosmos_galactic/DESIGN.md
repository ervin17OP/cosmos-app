# Design System Specification: The Celestial Canvas

## 1. Overview & Creative North Star
**Creative North Star: "The Observational Infinite"**

This design system is not a utility; it is a lens. To move beyond the "template" feel of standard educational apps, we adopt an **Editorial Astrophotography** approach. We treat the screen as a high-end telescope viewfinder where information doesn't sit *on* the interface, but floats *within* the cosmic vacuum.

We break the rigid, boxy nature of mobile apps through **Intentional Asymmetry**. Large-scale celestial bodies should bleed off the edges of the frame, and typography should overlap glass containers to create a sense of three-dimensional space. We are designing an immersive experience that prioritizes the wonder of discovery over the mundanity of a data table.

---

## 2. Colors & Atmospheric Depth

The palette is rooted in the "Deep Field." We utilize a complex hierarchy of dark tones to simulate the varying densities of space.

### The Palette (Material Mapping)
*   **Background / Surface:** `#0f0d18` (The primary void)
*   **Primary (Nebula Purple):** `#c799ff` (Active states, key actions)
*   **Secondary (Pulsar Cyan):** `#26fedc` (Progress, success, interactive accents)
*   **Tertiary (Stellar Gold):** `#ffdb8f` (Warnings, milestones, rare discoveries)
*   **Neutral Text:** `#e9e3f5` (High emphasis), `#aea8b9` (Medium emphasis)

### The "No-Line" Rule
Standard 1px solid borders are strictly prohibited for sectioning. Structural definition must be achieved through **Surface Transitions**. For example, a `surface-container-low` section sitting directly on a `surface` background creates a soft, sophisticated "zone" without the visual clutter of lines.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers of gas and dust. 
*   **Base Layer:** `surface` (The infinite background).
*   **Secondary Layer:** `surface-container-low` (Content cards).
*   **Interaction Layer:** `surface-bright` (Hover states or active cards).
By nesting a `surface-container-highest` element inside a `surface-container-low` container, we create a "recessed" or "elevated" feel that feels natural to the eye.

### The "Glass & Gradient" Rule
To elevate the experience, use **Glassmorphism** for all floating UI (Modals, Overlays, Navigation). 
*   **Background:** `rgba(255, 255, 255, 0.04)`
*   **Backdrop Blur:** 12px to 20px.
*   **Signature Textures:** Use subtle linear gradients from `primary` to `primary-container` (at 45 degrees) for CTAs to give them a "plasma" glow that flat colors cannot replicate.

---

## 3. Typography: The Editorial Voice

We use a tri-font system to balance classical scientific authority with modern legibility.

*   **Display & Headlines (Space Grotesk):** This is our "Modern Scientific" voice. Use `display-lg` (3.5rem) with tight letter-spacing for astronomical names (e.g., "ANDROMEDA") to create high-impact, editorial moments.
*   **Titles & Body (Manrope):** Our "Human" voice. Manrope provides a clean, neutral balance to the aggressive headlines. `title-lg` (1.375rem) should be used for lesson headers.
*   **System UI & Labels (Space Grotesk):** Used at `label-md` (0.75rem) for data points (Distance, Magnitude, Mass) to maintain a technical, "instrument" aesthetic.

**Hierarchy Strategy:** 
Create tension by pairing a very large `display-md` headline with a very small, widely-spaced `label-sm` subtitle. This contrast mimics the scale of the universe itself.

---

## 4. Elevation & Depth: Tonal Layering

Traditional drop shadows are too "earthly." We use light and transparency to define depth.

*   **The Layering Principle:** Depth is achieved by "stacking" surface tiers. Place `surface-container-lowest` cards on a `surface-container-low` section to create a soft "black hole" effect—a natural lift without a border.
*   **Ambient Glows:** Instead of black shadows, use **Purple Glows**. When a card is active, apply a drop shadow: `0px 10px 40px rgba(155, 93, 229, 0.15)`. This simulates the light emission of a nearby star.
*   **The "Ghost Border" Fallback:** If a border is required for accessibility, use the `outline-variant` token at **15% opacity**. It should be felt, not seen.
*   **Glassmorphism Depth:** All `xl` radius cards (1.5rem) should utilize a `surface-variant` background at 40% opacity with a heavy backdrop-blur (20px). This allows the star-field background to bleed through, ensuring the UI never feels "pasted on."

---

## 5. Components

### Buttons (The "Plasma" Core)
*   **Primary:** A gradient from `primary` (#c799ff) to `primary-dim` (#bb83ff). Radius: `1.125rem` (18px). No border.
*   **Secondary:** Ghost style. Transparent background, 1px "Ghost Border" (outline-variant at 20%), text in `primary`.
*   **Interaction:** On press, apply a `secondary` (Cyan) outer glow to simulate an energy surge.

### Chips (Spectral Markers)
*   **Style:** `surface-container-high` background. Radius: `0.75rem` (12px).
*   **Usage:** Use for categories like "Nebula," "Black Hole," or "Exoplanet." Use a 4px dot of the `secondary` or `tertiary` color next to the label to indicate status.

### Progress Bars (Event Horizons)
*   **Track:** `surface-container-highest`.
*   **Indicator:** A horizontal gradient from `primary` to `secondary`. 
*   **Detail:** Add a small "glow head" (a 4px blurred circle) at the tip of the progress bar to make it look like a moving light source.

### Input Fields (Scientific Entry)
*   **Style:** Minimalist. No background. Bottom border only (Ghost Border). 
*   **Focus State:** The bottom border transitions to a `primary` to `secondary` gradient, and the label floats upward using `label-sm` in `primary`.

### Cards & Lists (Celestial Collections)
*   **The "No-Divider" Rule:** Never use lines to separate list items. Use **Vertical White Space** (24px - 32px) or alternating subtle background shifts (`surface` to `surface-container-low`).
*   **Visual Interest:** In lesson cards, the subject (e.g., a planet) should overlap the top-left edge of the card, breaking the container's boundary.

---

## 6. Do's and Don'ts

### Do:
*   **Do** use "Breathing Room." Astronomical scales require vast negative space.
*   **Do** use `secondary` (Cyan) for interactive data points to make them feel like "live" instruments.
*   **Do** animate transitions with a "Stellar Expansion" feel (scaling up slightly from center with a soft fade).

### Don't:
*   **Don't** use pure white (#FFFFFF) for text. It is too harsh against the deep space theme. Use `on-surface` (#e9e3f5).
*   **Don't** use sharp 90-degree corners. Everything in the cosmos is curved; stick to the `xl` and `lg` radius scales.
*   **Don't** over-saturate. Let the deep black of the `background` do the heavy lifting. Accents should be surgical and intentional.

---

## 7. Signature Interaction: The "Star-field Parallax"
As the user scrolls, the background `surface` stars should move at 10% the speed of the foreground UI. This subtle parallax effect reinforces the "Observational Infinite" North Star, making the app feel like a window into a vast, physical space.