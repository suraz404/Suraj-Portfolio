/** Flips between light and dark, and remembers the choice. */
export function toggleTheme() {
  const root = document.documentElement;
  const next = !root.classList.contains("dark");
  root.classList.toggle("dark", next);
  try {
    localStorage.setItem("theme", next ? "dark" : "light");
  } catch {
    // Storage can be unavailable (private mode); the switch still works for this visit.
  }
}
