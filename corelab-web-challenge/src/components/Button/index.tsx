interface IButton {
  onClick: () => void;
  text: string;
  style?: React.CSSProperties;
  className?: string;
}

const Button = (props: IButton) => {
  return (
    <button
      onClick={props.onClick}
      className={props.className}
      style={{
        background: "var(--primary)",
        color: "white",
        border: "none",
        padding: "10px 16px",
        borderRadius: 10,
        cursor: "pointer",
        fontWeight: 600,
        width: "100%",
        ...props.style,
      }}
    >
      {props.text}
    </button>
  );
};

export default Button;
