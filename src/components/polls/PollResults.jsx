import FriendAvatar from '../friends/FriendAvatar.jsx'
import './PollResults.css'

export default function PollResults({ options, friends, totalVotes, closed, onVote }) {
  return (
    <div className="poll-results">
      {options.map((option) => {
        const pct = totalVotes > 0 ? Math.round((option.votes.length / totalVotes) * 100) : 0
        return (
          <div className="poll-results__option" key={option.id}>
            <div className="poll-results__option-top">
              <span className="poll-results__option-text">{option.text}</span>
              <span className="poll-results__option-pct">{pct}%</span>
            </div>
            <div className="poll-results__bar-track">
              <div className="poll-results__bar-fill" style={{ width: `${pct}%` }} />
            </div>
            <div className="poll-results__voters">
              {friends.map((friend) => {
                const voted = option.votes.includes(friend.id)
                return (
                  <button
                    key={friend.id}
                    type="button"
                    disabled={closed}
                    className={`poll-results__voter${voted ? ' poll-results__voter--active' : ''}`}
                    onClick={() => onVote(option.id, friend.id)}
                    aria-pressed={voted}
                    title={`${voted ? 'Remove' : 'Cast'} ${friend.name}'s vote`}
                  >
                    <FriendAvatar name={friend.name} color={friend.avatarColor} size={24} />
                  </button>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}
