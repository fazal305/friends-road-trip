import { useState } from "react";
import Icon from "../components/common/Icon.jsx";
import Button from "../components/common/Button.jsx";
import EmptyState from "../components/common/EmptyState.jsx";
import NoteCard from "../components/notes/NoteCard.jsx";
import { useNotes } from "../hooks/useNotes.js";
import { useFriends } from "../hooks/useFriends.js";
import "./Notes.css";

export default function Notes() {
  const { notes, addNote, removeNote } = useNotes();
  const { friends, friendsById } = useFriends();
  const [text, setText] = useState("");
  const [author, setAuthor] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!text.trim()) {
      setError("Write something before saving.");
      return;
    }
    addNote({ text: text.trim(), author: author || null });
    setText("");
    setError("");
  };

  return (
    <div className="notes-page">
      <form className="notes-page__form surface-card" onSubmit={handleSubmit}>
        {error && <p className="notes-page__error">{error}</p>}
        <textarea
          rows={3}
          placeholder="Don't forget passports..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="notes-page__form-footer">
          <select value={author} onChange={(e) => setAuthor(e.target.value)}>
            <option value="">No author</option>
            {friends.map((f) => (
              <option key={f.id} value={f.id}>
                {f.name}
              </option>
            ))}
          </select>
          <Button type="submit" variant="primary">
            <Icon name="plus" size={15} />
            Add note
          </Button>
        </div>
      </form>

      {notes.length === 0 ? (
        <EmptyState
          icon="notes"
          title="No notes yet"
          description="Jot down anything the group should remember."
        />
      ) : (
        <ul className="notes-page__list">
          {notes.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              authorName={note.author ? friendsById[note.author]?.name : null}
              onRemove={() => removeNote(note.id)}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
