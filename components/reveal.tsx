import type { ReactNode } from "react";

export function Reveal({ children }: { children: ReactNode; delay?: number }) {
  return <div>{children}</div>;
}
