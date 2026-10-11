'use client';

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  ReactNode,
} from 'react';
import styles from './animated-background.module.css';

export interface TransitionConfig {
  type?: 'spring' | 'tween';
  bounce?: number;
  duration?: number;
  ease?: string;
}

export interface AnimatedBackgroundProps {
  children: ReactNode;
  defaultValue?: string | null;
  value?: string | null;
  onValueChange?: (id: string | null) => void;
  className?: string;
  containerClassName?: string;
  transition?: TransitionConfig;
  enableHover?: boolean;
}

export function AnimatedBackground({
  children,
  defaultValue = null,
  value,
  onValueChange,
  className = '',
  containerClassName = '',
  transition = {},
  enableHover = false,
}: AnimatedBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Controlled or uncontrolled active state
  const isControlled = value !== undefined;
  const [internalActiveId, setInternalActiveId] = useState<string | null>(
    defaultValue
  );
  const activeId = isControlled ? value : internalActiveId;

  // Hover state for interactive preview
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Layout coordinates of the indicator
  const [indicatorRect, setIndicatorRect] = useState<{
    left: number;
    top: number;
    width: number;
    height: number;
    visible: boolean;
  }>({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
    visible: false,
  });

  const [hasRenderedInitial, setHasRenderedInitial] = useState(false);

  // Target ID to highlight: hover takes precedence if hover is enabled
  const targetId = enableHover && hoveredId !== null ? hoveredId : activeId;

  // Measure and align indicator to the target [data-id] child
  const updatePosition = useCallback(() => {
    if (!containerRef.current || !targetId) {
      setIndicatorRect((prev) => ({ ...prev, visible: false }));
      return;
    }

    const container = containerRef.current;
    // Escape selector characters safely
    const escapedId = CSS.escape(targetId);
    const targetElement = container.querySelector<HTMLElement>(
      `[data-id="${escapedId}"]`
    );

    if (!targetElement) {
      setIndicatorRect((prev) => ({ ...prev, visible: false }));
      return;
    }

    const containerRect = container.getBoundingClientRect();
    const elementRect = targetElement.getBoundingClientRect();

    setIndicatorRect({
      left: elementRect.left - containerRect.left,
      top: elementRect.top - containerRect.top,
      width: elementRect.width,
      height: elementRect.height,
      visible: true,
    });
  }, [targetId]);

  // Recalculate on targetId change or mount
  useEffect(() => {
    updatePosition();
    // Enable transitions after initial position measurement
    const raf = requestAnimationFrame(() => {
      setHasRenderedInitial(true);
    });
    return () => cancelAnimationFrame(raf);
  }, [targetId, updatePosition]);

  // Keep aligned across resize and content changes
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const resizeObserver = new ResizeObserver(() => {
      updatePosition();
    });

    resizeObserver.observe(container);
    window.addEventListener('resize', updatePosition);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', updatePosition);
    };
  }, [updatePosition]);

  // Event handlers via delegation
  const handlePointerOver = (e: React.PointerEvent) => {
    if (!enableHover) return;
    const target = (e.target as HTMLElement).closest<HTMLElement>('[data-id]');
    if (target && containerRef.current?.contains(target)) {
      const id = target.getAttribute('data-id');
      if (id) setHoveredId(id);
    }
  };

  const handlePointerLeave = () => {
    if (!enableHover) return;
    setHoveredId(null);
  };

  const handleFocusCapture = (e: React.FocusEvent) => {
    if (!enableHover) return;
    const target = (e.target as HTMLElement).closest<HTMLElement>('[data-id]');
    if (target && containerRef.current?.contains(target)) {
      const id = target.getAttribute('data-id');
      if (id) setHoveredId(id);
    }
  };

  const handleBlurCapture = (e: React.FocusEvent) => {
    if (!enableHover) return;
    if (!containerRef.current?.contains(e.relatedTarget as Node)) {
      setHoveredId(null);
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    const target = (e.target as HTMLElement).closest<HTMLElement>('[data-id]');
    if (target && containerRef.current?.contains(target)) {
      const id = target.getAttribute('data-id');
      if (id) {
        if (!isControlled) {
          setInternalActiveId(id);
        }
        onValueChange?.(id);
      }
    }
  };

  // Build spring / ease transition properties
  const duration = transition.duration ?? 0.25;
  let easing = 'cubic-bezier(0.16, 1, 0.3, 1)'; // smooth spring deceleration
  if (transition.type === 'spring') {
    const bounce = transition.bounce ?? 0.2;
    if (bounce > 0) {
      // Subtle spring bounce overshoot curve
      easing = 'cubic-bezier(0.34, 1.35, 0.64, 1)';
    }
  } else if (transition.ease === 'easeInOut') {
    easing = 'cubic-bezier(0.4, 0, 0.2, 1)';
  }

  const transitionStyle = hasRenderedInitial
    ? `transform ${duration}s ${easing}, width ${duration}s ${easing}, height ${duration}s ${easing}, opacity 0.18s ease`
    : 'none';

  return (
    <div
      ref={containerRef}
      className={`${styles.container} ${containerClassName}`.trim()}
      onPointerOver={handlePointerOver}
      onPointerLeave={handlePointerLeave}
      onFocusCapture={handleFocusCapture}
      onBlurCapture={handleBlurCapture}
      onClick={handleClick}
    >
      <span
        className={`${styles.indicator} ${className}`.trim()}
        style={{
          transform: `translate3d(${indicatorRect.left}px, ${indicatorRect.top}px, 0)`,
          width: `${indicatorRect.width}px`,
          height: `${indicatorRect.height}px`,
          opacity: indicatorRect.visible ? 1 : 0,
          transition: transitionStyle,
        }}
        aria-hidden="true"
      />
      <div className={styles.childWrapper}>{children}</div>
    </div>
  );
}
