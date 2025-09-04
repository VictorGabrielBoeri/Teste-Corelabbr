interface ISearch {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}

const Search = (props: ISearch) => {
  return (
    <input
      type="text"
      placeholder={props.placeholder}
      value={props.value}
      onChange={(e) => props.onChange(e.target.value)}
      style={{
        background: "var(--panel)",
        color: "var(--text)",
        border: "1px solid var(--border)",
        borderRadius: 10,
        padding: "10px 12px",
        width: "100%",
      }}
    />
  );
};

export default Search;
