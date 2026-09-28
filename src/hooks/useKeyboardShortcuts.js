import { useEffect } from "react";

const EDITABLE_TAGS = new Set(["INPUT", "TEXTAREA", "SELECT"]);

/**
 * Global single-key shortcuts. Ignored while typing in a form field or a
 * modal/dialog is open (checked via document body having an open dialog),
 * and while any modifier key is held (so browser/OS shortcuts stay untouched).
 */
export function useKeyboardShortcuts(shortcutsMap) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.metaKey || event.ctrlKey || event.altKey) return;

      const target = event.target;
      if (
        target instanceof HTMLElement &&
        (EDITABLE_TAGS.has(target.tagName) || target.isContentEditable)
      )
        return;
      if (document.querySelector('[role="dialog"]')) return;

      const handler = shortcutsMap[event.key.toLowerCase()];
      if (handler) {
        event.preventDefault();
        handler();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [shortcutsMap]);
}
