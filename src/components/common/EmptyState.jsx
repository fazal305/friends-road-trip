import Icon from "./Icon.jsx";
import "./EmptyState.css";

export default function EmptyState({
  icon = "route",
  title,
  description,
  action,
}) {
  return (
    <div className="empty-state">
      <div className="empty-state__icon">
        <Icon name={icon} size={26} />
      </div>
      <h3 className="empty-state__title">{title}</h3>
      {description && <p className="empty-state__description">{description}</p>}
      {action}
    </div>
  );
}
