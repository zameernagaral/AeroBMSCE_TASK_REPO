/**
 * Photo wall: data source.
 *
 * Source of truth: the club's own photographs in /public/images (photo1 to photo8)
 * and the strings in docs/COPY.md section 2 (alt text, event, date, aircraft).
 * There is no network source. Nothing is fetched at runtime.
 *
 * Update rule: edit this file. To add a fact, replace `null` with the exact string
 * from docs/COPY.md once the club confirms it. A `null` field is not shown.
 * Nothing is guessed or filled in.
 *
 * Still unconfirmed (docs/COPY.md [NEEDS FACT] item 1), so left as `null`:
 *   event: photo8, photo5, photo3, photo4, photo6
 *   date: photo8, photo2, photo5, photo3, photo4, photo6
 *   aircraft: every photo
 *
 * Pixel sizes are the real file sizes (checked with `sips`), so width and height
 * reserve the exact box before the file arrives (no layout shift).
 */

export type WallPhoto = {
  /** File name in /public/images */
  file: string;
  width: number;
  height: number;
  /** Describes only what is visible (docs/COPY.md section 2) */
  alt: string;
  event: string | null;
  date: string | null;
  aircraft: string | null;
};

/** Reading order from docs/WIREFRAMES.md section 2. Same order on mobile. */
const photo8: WallPhoto = {
  file: 'photo8.jpg',
  width: 3000,
  height: 2000,
  alt: 'A quadcopter carrying a small box flies against a clear sky.',
  event: null,
  date: null,
  aircraft: null,
};

const photo2: WallPhoto = {
  file: 'photo2.jpg',
  width: 1248,
  height: 936,
  alt: 'Members hold two model aircraft in front of an SAEINDIA Southern Section and Prathyusha Engineering College banner.',
  event: 'SAEINDIA flying ground, Prathyusha Engineering College',
  date: null,
  aircraft: null,
};

const photo5: WallPhoto = {
  file: 'photo5.jpg',
  width: 1178,
  height: 833,
  alt: 'More than twenty members pose in a hall, standing and seated in rows.',
  event: null,
  date: null,
  aircraft: null,
};

const photo1: WallPhoto = {
  file: 'photo1.jpg',
  width: 768,
  height: 432,
  alt: 'Team Flying Phantoms and officials on stage at Aerothon 2025 with a ₹1,25,000 second-prize cheque; a member holds a drone.',
  event: 'SAE Aerothon 2025, 2nd place',
  date: 'Nov 2025',
  aircraft: null,
};

const photo3: WallPhoto = {
  file: 'photo3.jpg',
  width: 648,
  height: 407,
  alt: 'Members stand in front of an SAE International banner at a competition field.',
  event: null,
  date: null,
  aircraft: null,
};

const photo4: WallPhoto = {
  file: 'photo4.jpg',
  width: 768,
  height: 492,
  alt: 'Members stand in front of the Prathyusha Engineering College entrance sign.',
  event: null,
  date: null,
  aircraft: null,
};

const photo6: WallPhoto = {
  file: 'photo6.jpg',
  width: 1556,
  height: 1037,
  alt: 'Four members stand holding a quadcopter in front of a statue of a hand holding the Moon.',
  event: null,
  date: null,
  aircraft: null,
};

const photo7: WallPhoto = {
  file: 'photo7.jpg',
  width: 900,
  height: 1200,
  alt: 'A quadcopter on a stone ledge in front of the Aerothon 2025 second-prize cheque of ₹1,25,000, written for Flying Phantoms.',
  event: 'SAE Aerothon 2025, 2nd place',
  date: 'Nov 2025',
  aircraft: null,
};

/**
 * Desktop rows from docs/WIREFRAMES.md section 2. Inside a row each tile's width
 * follows its aspect ratio, so every row has one equal height and nothing is cropped.
 */
export const WALL_ROWS: WallPhoto[][] = [
  [photo8],
  [photo2, photo5],
  [photo1, photo3, photo4],
  [photo6, photo7],
];

/** Caption labels from docs/COPY.md: wall.caption.label.* */
export const CAPTION_LABELS = {
  event: 'Event',
  date: 'Date',
  aircraft: 'Aircraft',
} as const;
