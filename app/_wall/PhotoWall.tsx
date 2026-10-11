'use client';

/**
 * Photo wall (the signature, docs/TOKENS.md section 7).
 *
 * DATA SOURCE   Static module `./photos.ts` (club photos in /public/images + docs/COPY.md).
 *               No fetch, so there is no network source to go down except the image files.
 * UPDATE RULE   Edit `./photos.ts`. Unconfirmed caption fields are `null` and not shown.
 * SCROLL        Tiles below the fold at page load wipe in once (clip-path from the
 *               bottom edge, --dur-3, --ease, no travel). Columns are staggered in
 *               --dur-1 steps (3 steps maximum). Each tile is observed once, then unobserved.
 *
 * FAILURE STATES
 *   No JS            Server HTML holds every tile and caption. Nothing is hidden in CSS.
 *                    Only this component hides tiles, and only after it runs.
 *   Source down      A tile whose file fails shows its alt text in the same box.
 *   Slow             Every tile reserves its exact box (width, height, aspect-ratio),
 *                    so the page does not shift. A hairline frame shows until the file paints.
 *   Reduced motion   No observer, no hiding, no wipe. Everything is visible at once.
 *
 * Remove this component and its section header stays: the page works without it.
 */

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import styles from './PhotoWall.module.css';
import { CAPTION_LABELS, WALL_ROWS, type WallPhoto } from './photos';

/** Resolution rule (TOKENS section 7): tile width must not exceed source width / 1.5. */
const RESOLUTION_DIVISOR = 1.5;

/** Reveal settings from TOKENS section 6. */
const REVEAL_THRESHOLD = 0.15;
const REVEAL_ROOT_MARGIN = '0px 0px -10% 0px';
/** Stagger is at most three --dur-1 steps. */
const MAX_STAGGER_STEPS = 2;

type LoadState = 'loading' | 'loaded' | 'failed';

function captionFields(photo: WallPhoto) {
  const fields: { key: keyof typeof CAPTION_LABELS; value: string }[] = [];
  if (photo.event) fields.push({ key: 'event', value: photo.event });
  if (photo.date) fields.push({ key: 'date', value: photo.date });
  if (photo.aircraft) fields.push({ key: 'aircraft', value: photo.aircraft });
  return fields;
}

function WallTile({
  photo,
  column,
  sizes,
  eager,
}: {
  photo: WallPhoto;
  column: number;
  sizes: string;
  eager: boolean;
}) {
  const frameRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<LoadState>('loading');
  const fields = captionFields(photo);

  // The file may finish (or fail) before React attaches onLoad/onError.
  useEffect(() => {
    const img = frameRef.current?.querySelector('img');
    if (img && img.complete) {
      setState(img.naturalWidth > 0 ? 'loaded' : 'failed');
    }
  }, []);

  return (
    <figure
      className={styles.tile}
      data-tile=""
      style={
        {
          '--aspect': photo.width / photo.height,
          '--col': Math.min(column, MAX_STAGGER_STEPS),
          maxWidth: `${Math.floor(photo.width / RESOLUTION_DIVISOR)}px`,
        } as React.CSSProperties
      }
    >
      <div
        ref={frameRef}
        className={styles.frame}
        data-state={state}
        style={{ aspectRatio: `${photo.width} / ${photo.height}` }}
      >
        {state === 'failed' ? (
          <p className={styles.fallback}>{photo.alt}</p>
        ) : (
          <Image
            src={`/images/${photo.file}`}
            width={photo.width}
            height={photo.height}
            alt={photo.alt}
            sizes={sizes}
            loading={eager ? 'eager' : 'lazy'}
            className={styles.photo}
            onLoad={() => setState('loaded')}
            onError={() => setState('failed')}
          />
        )}
      </div>

      <figcaption className={styles.caption}>
        {fields.length > 0 ? (
          <dl className={styles.captionList}>
            {fields.map(({ key, value }) => (
              <div key={key} className={styles.captionRow}>
                <dt className={styles.captionLabel}>{CAPTION_LABELS[key]}</dt>
                <dd className={styles.captionValue}>{value}</dd>
              </div>
            ))}
          </dl>
        ) : (
          <dl className={styles.captionList}>
            <div className={styles.captionRow}>
              <dt className={styles.captionLabel}>{CAPTION_LABELS.event}</dt>
              <dd className={styles.captionValue}>[NEEDS FACT: event]</dd>
            </div>
          </dl>
        )}
      </figcaption>
    </figure>
  );
}

export default function PhotoWall() {
  const wallRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wall = wallRef.current;
    if (!wall) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!('IntersectionObserver' in window)) return;

    // Only tiles whose top edge is below the fold are gated. Anything already
    // in view stays visible, so nothing above the fold waits on the observer.
    const tiles = Array.from(wall.querySelectorAll<HTMLElement>('[data-tile]'));
    const gated = tiles.filter(
      (tile) => tile.getBoundingClientRect().top >= window.innerHeight,
    );
    if (gated.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const tile = entry.target as HTMLElement;
          tile.dataset.reveal = 'done';
          observer.unobserve(tile);
        }
      },
      { threshold: 0.1, rootMargin: REVEAL_ROOT_MARGIN },
    );

    for (const tile of gated) {
      tile.dataset.reveal = 'pending';
      observer.observe(tile);
    }

    return () => {
      observer.disconnect();
      for (const tile of gated) delete tile.dataset.reveal;
    };
  }, []);

  let tileIndex = 0;

  return (
    <div ref={wallRef} className={styles.wall} data-wall="">
      {WALL_ROWS.map((row) => {
        const rowAspect = row.reduce((sum, p) => sum + p.width / p.height, 0);
        return (
          <div key={row.map((p) => p.file).join('-')} className={styles.row}>
            {row.map((photo, column) => {
              const share = photo.width / photo.height / rowAspect;
              const sizes = `(min-width: 768px) ${Math.round(share * 100)}vw, 100vw`;
              const eager = tileIndex === 0;
              tileIndex += 1;
              return (
                <WallTile
                  key={photo.file}
                  photo={photo}
                  column={column}
                  sizes={sizes}
                  eager={eager}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
