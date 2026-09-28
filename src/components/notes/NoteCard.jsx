import Icon from "../common/Icon.jsx";
import { formatShortDate } from "../../utils/formatters.js";
import "./NoteCard.css";

export default function NoteCard({ note, authorName, onRemove }) {
  return (
    <li className="note-card surface-card">
      <p className="note-card__text">{note.text}</p>
      <div className="note-card__footer">
        <span className="note-card__meta">
          {authorName && `${authorName} · `}
          {formatShortDate(note.createdAt)}
        </span>
        <button type="button" onClick={onRemove} aria-label="Delete note">
          <Icon name="trash" size={14} />
        </button>
      </div>
    </li>
  );
}
