/**
 * Pages swap instantly. A whole-page fade made the screen blink on every
 * navigation (especially on phones, with the menu closing at the same time).
 * Content still fades in gently as it scrolls into view (see Reveal).
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
