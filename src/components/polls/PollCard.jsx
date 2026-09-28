import Icon from "../common/Icon.jsx";
import PollResults from "./PollResults.jsx";
import "./PollCard.css";

export default function PollCard({ poll, friends, onVote, onClose, onRemove }) {
  const totalVotes = poll.options.reduce((sum, o) => sum + o.votes.length, 0);

  return (
    <li className="poll-card surface-card">
      <div className="poll-card__header">
        <h3 className="poll-card__question">{poll.question}</h3>
        <div className="poll-card__actions">
          {!poll.closed && (
            <button type="button" onClick={onClose} aria-label="Close poll">
              <Icon name="check" size={14} />
            </button>
          )}
          <button
            type="button"
            className="poll-card__danger"
            onClick={onRemove}
            aria-label="Delete poll"
          >
            <Icon name="trash" size={14} />
          </button>
        </div>
      </div>

      {poll.closed && <span className="poll-card__closed-badge">Closed</span>}

      <PollResults
        options={poll.options}
        friends={friends}
        totalVotes={totalVotes}
        closed={poll.closed}
        onVote={onVote}
      />
    </li>
  );
}
