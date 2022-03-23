import styles from "../styles/Select.module.css";

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
    <div className={styles.container}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <select
        id={id}
        className={styles.select}
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
    </div>
  );
};

export default Select;
