# Visual asset provenance — 2026-08-18 reference revision

All assets in this register are original synthetic portfolio assets. They contain no real children, staff records, operator photography, or copied production branding.

## Deterministic SVG brand mark

- Target: `components/brand/brand-mark.tsx` and `app/icon.tsx`
- Method: clean-room SVG trace authored in code from the owner-supplied visual reference.
- Design features: golden rising sun and rays, deep-green outer leaves, sage centre leaf, cream vein details, and two muted-coral dots.
- Rights and data boundary: project-local original implementation; no external logo file or operator asset was imported.

## Built-in image generation assets

Mode: Codex built-in image generation tool. The generated originals remain in the task's generated-image archive; selected copies are stored in `public/images/` for application use.

### `public/images/program-infant.png`

- Prompt: premium photorealistic Montessori-inspired infant classroom; round sage activity mat, low natural-oak shelving, pale-green reading chair, wooden infant toys, plants, cream walls, natural daylight; landscape card crop; no people, text, logos, watermark, or malformed furniture.
- Use: Infant Program card.

### `public/images/program-toddler.png`

- Prompt: premium photorealistic toddler classroom; low natural-oak shelves, small activity table, wooden push cart, learning baskets, muted-gold rug, plants, warm cream walls, and soft daylight; landscape card crop; no people, text, logos, watermark, clutter, or malformed furniture.
- Use: Toddler Program card.

### `public/images/program-preschool.png`

- Prompt: bright photorealistic Reggio/Montessori preschool classroom; two child-sized natural-wood work tables, organized shelving, botanical learning prints, art materials, blocks, plants, and diffused daylight; landscape card crop; no people, readable text, logos, watermark, clutter, or malformed furniture.
- Use: Preschool Program card and Daily Experience decorative crop.

### `public/images/about-classroom.png`

- Prompt: calm premium preschool classroom with a large corner window, low oak shelving, small tables and chairs, baskets, learning materials, a sage rug, and plants; horizontal 4:3 composition with warm afternoon light; no people, text, logos, watermark, clutter, or malformed furniture.
- Use: About page feature image.

### `public/images/staff-portraits.png`

- Prompt: exactly six distinct fictional adult childcare-professional headshots in a consistent three-column by two-row contact sheet; diverse ages, genders, skin tones, and hairstyles; warm cream backdrop, natural professional lighting, no resemblance to public figures, no children, text, logos, badges, or watermark.
- Use: cropped synthetic portraits in the protected Staff Directory and director profile UI.

## Review notes

- All imagery is demonstration-only and must not be presented as photographs of real Garderie Oasis rooms or staff.
- Images are served locally with responsive `next/image` sizing and no remote runtime dependency.
- The application footer retains the independent-portfolio disclaimer and official City of Ottawa registry separation.
