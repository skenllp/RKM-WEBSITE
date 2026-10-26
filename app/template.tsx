/**
 * A template re-mounts on every navigation, so this gives each page a gentle
 * fade-and-rise transition. It is switched off for reduced-motion users.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
