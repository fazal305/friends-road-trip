import { useState } from "react";
import Icon from "../components/common/Icon.jsx";
import Button from "../components/common/Button.jsx";
import EmptyState from "../components/common/EmptyState.jsx";
import PollCard from "../components/polls/PollCard.jsx";
import { usePolls } from "../hooks/usePolls.js";
import { useFriends } from "../hooks/useFriends.js";
import { useConfirm } from "../hooks/useConfirm.jsx";
import { uid } from "../data/initialTrip.js";
import "./Polls.css";

export default function Polls() {
  const { polls, addPoll, votePoll, closePoll, removePoll } = usePolls();
  const { friends } = useFriends();
  const { requestConfirm, confirmDialog } = useConfirm();
  const [showForm, setShowForm] = useState(false);
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [error, setError] = useState("");

  const updateOption = (index, value) => {
    setOptions((prev) => prev.map((o, i) => (i === index ? value : o)));
  };

  const addOptionField = () => setOptions((prev) => [...prev, ""]);
  const removeOptionField = (index) =>
    setOptions((prev) => prev.filter((_, i) => i !== index));

  const handleSubmit = (event) => {
    event.preventDefault();
    const cleanOptions = options.map((o) => o.trim()).filter(Boolean);
    if (!question.trim()) return setError("Give the poll a question.");
    if (cleanOptions.length < 2) return setError("Add at least two options.");

    addPoll({
      question: question.trim(),
      options: cleanOptions.map((text) => ({
        id: uid("opt"),
        text,
        votes: [],
      })),
    });
    setQuestion("");
    setOptions(["", ""]);
    setError("");
    setShowForm(false);
  };

  if (friends.length === 0) {
    return (
      <EmptyState
        icon="polls"
        title="Add friends first"
        description="Polls need travelers to vote — add friends on the Friends page."
      />
    );
  }

  return (
    <div className="polls-page">
      {polls.length === 0 && !showForm ? (
        <EmptyState
          icon="polls"
          title="No polls yet"
          description="Ask the group a question and let everyone vote."
          action={
            <Button variant="secondary" onClick={() => setShowForm(true)}>
              <Icon name="plus" size={16} />
              New poll
            </Button>
          }
        />
      ) : (
        <>
          <ul className="polls-page__list">
            {polls.map((poll) => (
              <PollCard
                key={poll.id}
                poll={poll}
                friends={friends}
                onVote={(optionId, friendId) =>
                  votePoll(poll.id, optionId, friendId)
                }
                onClose={() => closePoll(poll.id)}
                onRemove={() =>
                  requestConfirm({
                    title: "Delete this poll?",
                    description: `"${poll.question}" and all its votes will be removed.`,
                    confirmLabel: "Delete poll",
                    onConfirm: () => removePoll(poll.id),
                  })
                }
              />
            ))}
          </ul>

          {showForm ? (
            <form
              className="polls-page__add-form surface-card"
              onSubmit={handleSubmit}
            >
              {error && <p className="polls-page__error">{error}</p>}
              <input
                autoFocus
                placeholder="Poll question, e.g. Where should we stop for lunch?"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
              {options.map((option, index) => (
                <div className="polls-page__option-row" key={index}>
                  <input
                    placeholder={`Option ${index + 1}`}
                    value={option}
                    onChange={(e) => updateOption(index, e.target.value)}
                  />
                  {options.length > 2 && (
                    <button
                      type="button"
                      onClick={() => removeOptionField(index)}
                      aria-label="Remove option"
                    >
                      <Icon name="close" size={14} />
                    </button>
                  )}
                </div>
              ))}
              <Button type="button" variant="ghost" onClick={addOptionField}>
                <Icon name="plus" size={14} />
                Add option
              </Button>
              <div className="polls-page__add-actions">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" variant="primary">
                  Create poll
                </Button>
              </div>
            </form>
          ) : (
            <Button variant="secondary" onClick={() => setShowForm(true)}>
              <Icon name="plus" size={16} />
              New poll
            </Button>
          )}
        </>
      )}
      {confirmDialog}
    </div>
  );
}
