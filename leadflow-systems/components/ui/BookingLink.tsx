import type { MouseEventHandler, ReactNode } from "react";
import { bookingHref, bookingIsExternal } from "@/lib/site";

/** Links to the configured booking URL, or falls back to the on-page contact form. */
export function BookingLink({
  children,
  className,
  onClick,
}: {
  children: ReactNode;
  className?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}) {
  return (
    <a
      href={bookingHref}
      className={className}
      onClick={onClick}
      {...(bookingIsExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
      {bookingIsExternal && <span className="sr-only"> (opens in a new tab)</span>}
    </a>
  );
}
