import { initials } from "../../utils/formatters.js";
import "./FriendAvatar.css";

export default function FriendAvatar({ name, color, size = 44 }) {
  return (
    <div
      className="friend-avatar"
      style={{
        width: size,
        height: size,
        fontSize: size * 0.36,
        background: `${color}26`,
        color,
      }}
      aria-hidden="true"
    >
      {initials(name)}
    </div>
  );
}
