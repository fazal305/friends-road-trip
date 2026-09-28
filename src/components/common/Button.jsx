import "./Button.css";

const VARIANT_CLASS = {
  primary: "btn btn--primary",
  secondary: "btn btn--secondary",
  ghost: "btn btn--ghost",
  danger: "btn btn--danger",
  icon: "btn btn--icon",
};

export default function Button({
  variant = "primary",
  as: Component = "button",
  className = "",
  children,
  ...rest
}) {
  const classes = [VARIANT_CLASS[variant] ?? VARIANT_CLASS.primary, className]
    .filter(Boolean)
    .join(" ");
  return (
    <Component className={classes} {...rest}>
      {children}
    </Component>
  );
}
