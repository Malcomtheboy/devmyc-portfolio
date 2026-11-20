"use client";

/*
  Day/night switch. The current theme lives on <html data-theme="...">,
  set before first paint by the inline script in layout.js, so this
  button needs no React state: both icons are rendered and CSS shows
  the right one. The choice is remembered in localStorage.
*/
export default function ThemeToggle({ label = "Switch between light and dark theme", title = "Switch theme" }) {
  function toggle() {
    const root = document.documentElement;
    const next = root.dataset.theme === "light" ? "dark" : "light";
    root.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Private mode or blocked storage: the switch still works for this visit
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={title}
      className="grid size-9 shrink-0 place-items-center rounded-full border border-line text-ink-300 transition-colors duration-200 hover:border-ink-300 hover:text-ink-100"
    >
      {/* Sun: shown in dark mode (click for day) */}
      <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4 light:hidden" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2.5v2M12 19.5v2M4.6 4.6l1.4 1.4M18 18l1.4 1.4M2.5 12h2M19.5 12h2M4.6 19.4 6 18M18 6l1.4-1.4" />
      </svg>
      {/* Moon: shown in light mode (click for night) */}
      <svg aria-hidden="true" viewBox="0 0 24 24" className="hidden size-4 light:block" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" />
      </svg>
    </button>
  );
}
