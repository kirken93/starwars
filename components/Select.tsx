interface IProps {
  label: string;
  value: string;
  options: string[];
  onChange: (x: string) => void;
  id: string;
  disabled?: boolean;
}

const Select = ({ label, value, options, onChange, id, disabled }: IProps) => {
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <select
        id={id}
        onChange={(e) => onChange(e.target.value)}
        value={value}
        disabled={disabled}
      >
        <option value=""></option>
        {options.map((option, i) => {
          return (
            <option key={i} value={option}>
              {option}
            </option>
          );
        })}
      </select>
    </>
  );
};

export default Select;
