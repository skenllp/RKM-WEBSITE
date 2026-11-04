"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { APPOINTMENT_HREF, cta, navigation, site, telHref, type NavItem } from "@/content/site";
import { Logo } from "./Logo";
import {
  ArrowRight,
  CalendarIcon,
  CloseIcon,
  InstagramIcon,
  MenuIcon,
  PhoneIcon,
} from "./Icons";
import { cn } from "@/lib/utils";

function isActive(pathname: string, item: NavItem) {
  if (item.href === "/") return pathname === "/";
  return [item.href, ...(item.also ?? [])].some((h) => pathname === h || pathname.startsWith(`${h}/`));
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const openBtnRef = useRef<HTMLButtonElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(false);

  const close = useCallback(() => setOpen(false), []);

  // Close whenever the route changes.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Scroll lock, focus management and Escape key.
  useEffect(() => {
    if (open) {
      wasOpen.current = true;
      document.documentElement.style.overflow = "hidden";
      const t = window.setTimeout(() => closeBtnRef.current?.focus(), 50);
      const onKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") setOpen(false);
      };
      window.addEventListener("keydown", onKey);
      return () => {
        window.clearTimeout(t);
        window.removeEventListener("keydown", onKey);
        document.documentElement.style.overflow = "";
      };
    }
    if (wasOpen.current) {
      wasOpen.current = false;
      openBtnRef.current?.focus();
    }
  }, [open]);

  // Close the menu if the viewport grows to desktop size.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const handler = () => mq.matches && setOpen(false);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Keep keyboard focus inside the open menu.
  function trapFocus(e: React.KeyboardEvent) {
    if (e.key !== "Tab" || !menuRef.current) return;
    const focusable = menuRef.current.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    );
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  const phone = site.contact.phone;

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-line bg-white/95 backdrop-blur-md">
        <div className="container-x grid h-[4.5rem] grid-cols-[3rem_1fr_3rem] items-center gap-2 md:grid-cols-[3rem_1fr_auto] lg:flex lg:h-20 lg:justify-between lg:gap-4">
          {/* Hamburger: top left on mobile */}
          <button
            ref={openBtnRef}
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open main menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="-ml-2 flex size-12 items-center justify-center rounded-full text-navy transition hover:bg-ivory lg:hidden"
          >
            <MenuIcon width={28} height={28} />
          </button>

          {/* Logo: centred on mobile, left on desktop */}
          <div className="flex shrink-0 justify-center lg:justify-start">
            <Logo priority height={42} />
          </div>

          {/* Desktop navigation (the logo links home, so "Home" is not repeated here) */}
          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {navigation.slice(1).map((item) => {
                const active = isActive(pathname, item);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "relative whitespace-nowrap px-2.5 py-2 text-sm font-medium transition-colors xl:px-3.5",
                        active ? "text-navy" : "text-slate-600 hover:text-navy",
                        "after:absolute after:inset-x-2.5 after:bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-teal-700 after:transition-transform xl:after:inset-x-3.5",
                        active ? "after:scale-x-100" : "hover:after:scale-x-100",
                      )}
                    >
                      {item.short}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Appointment access. Phones get this from the bottom bar instead. */}
          <div className="hidden justify-end md:flex">
            <Link
              href={APPOINTMENT_HREF}
              className="btn btn-primary !min-h-11 whitespace-nowrap !px-5 text-sm"
            >
              {cta.medium}
            </Link>
          </div>
        </div>
      </header>

      {/* Full-screen white mobile menu */}
      <div
        id="mobile-menu"
        ref={menuRef}
        role="dialog"
        aria-modal="true"
        aria-label="Main menu"
        inert={!open}
        onKeyDown={trapFocus}
        className={cn(
          "fixed inset-0 z-50 flex flex-col overflow-y-auto bg-white lg:hidden",
          "transition-[opacity,transform,visibility] duration-300 ease-[var(--ease-out-soft)]",
          open
            ? "visible translate-y-0 opacity-100"
            : "invisible pointer-events-none -translate-y-3 opacity-0",
        )}
      >
        <div className="container-x grid h-[4.5rem] shrink-0 grid-cols-[3rem_1fr_3rem] items-center gap-2 border-b border-line">
          <button
            ref={closeBtnRef}
            type="button"
            onClick={close}
            aria-label="Close main menu"
            className="-ml-2 flex size-12 items-center justify-center rounded-full text-navy transition hover:bg-ivory"
          >
            <CloseIcon width={28} height={28} />
          </button>
          <div className="flex justify-center">
            <Logo priority height={44} />
          </div>
          <span aria-hidden="true" />
        </div>

        <nav aria-label="Mobile" className="container-x flex-1 py-6">
          <ul className="mx-auto flex max-w-md flex-col">
            {navigation.map((item, i) => {
              const active = isActive(pathname, item);
              return (
                <li
                  key={item.href}
                  className={cn(
                    "border-b border-line transition-[opacity,transform] duration-500 ease-[var(--ease-out-soft)]",
                    open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
                  )}
                  style={{ transitionDelay: open ? `${80 + i * 45}ms` : "0ms" }}
                >
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    onClick={close}
                    className={cn(
                      "flex items-center justify-between py-[1.05rem] font-display text-[1.65rem] leading-tight",
                      active ? "text-teal-700" : "text-navy",
                    )}
                  >
                    {item.label}
                    <ArrowRight
                      width={20}
                      height={20}
                      className={active ? "text-teal" : "text-navy/30"}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Persistent appointment + contact access */}
        <div className="shrink-0 border-t border-line bg-ivory px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-5">
          <div className="mx-auto flex max-w-md flex-col gap-3">
            <Link href={APPOINTMENT_HREF} onClick={close} className="btn btn-primary w-full">
              <CalendarIcon width={20} height={20} />
              {cta.label}
            </Link>
            <div className="grid grid-cols-2 gap-3">
              {phone ? (
                <a href={telHref(phone)} className="btn btn-outline !px-3">
                  <PhoneIcon width={18} height={18} />
                  Call us
                </a>
              ) : (
                <Link href="/contact" onClick={close} className="btn btn-outline !px-3">
                  <PhoneIcon width={18} height={18} />
                  Contact us
                </Link>
              )}
              <a
                href={site.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline !px-3"
              >
                <InstagramIcon width={18} height={18} />
                Instagram
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
