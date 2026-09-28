import Modal from "../common/Modal.jsx";
import { NAV_ITEMS } from "./navItems.js";
import { NAV_SHORTCUT_KEYS } from "../../utils/shortcuts.js";
import "./ShortcutsModal.css";

export default function ShortcutsModal({ open, onClose }) {
  return (
    <Modal open={open} onClose={onClose} title="Keyboard shortcuts">
      <ul className="shortcuts-modal__list">
        {NAV_ITEMS.map((item, index) => (
          <li key={item.to}>
            <kbd>{NAV_SHORTCUT_KEYS[index].toUpperCase()}</kbd>
            <span>Go to {item.label}</span>
          </li>
        ))}
        <li>
          <kbd>T</kbd>
          <span>Toggle theme</span>
        </li>
        <li>
          <kbd>?</kbd>
          <span>Show this menu</span>
        </li>
      </ul>
    </Modal>
  );
}
