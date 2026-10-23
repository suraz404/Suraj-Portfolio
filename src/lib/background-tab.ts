/** Which tab of the Education / Experience block is open. Shared with the sidebar index. */
export type BackgroundTab = "education" | "experience";

let tab: BackgroundTab = "experience";
const listeners = new Set<() => void>();

export const backgroundTab = {
  get: () => tab,
  set(next: BackgroundTab) {
    if (next === tab) return;
    tab = next;
    listeners.forEach((l) => l());
  },
  subscribe(listener: () => void) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
};
