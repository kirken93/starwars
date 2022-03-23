import styles from "../styles/Table.module.css";

interface ITableProps {
  rows: object[];
  total: number;
}

const Table = ({ rows, total }: ITableProps) => {
  if (rows.length) {
    return (
      <div className={styles.container}>
        <div
          className={styles.counter}
        >{`Displaying ${rows.length} of ${total}`}</div>
        <table className={styles.table}>
          <TableHeader cells={rows[0]} />
          <tbody>
            {rows.map((row, i) => (
              <TableRow key={i} cells={row} />
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return null;
};

interface IRowProps {
  cells: object;
}

const TableRow = ({ cells }: IRowProps) => {
  return (
    <tr className={styles.row}>
      {Object.entries(cells).map(([key, value], i) => (
        <TableCell key={i} data={value} />
      ))}
    </tr>
  );
};

const TableHeader = ({ cells }: IRowProps) => {
  return (
    <thead>
      <tr className={styles.row}>
        {Object.keys(cells).map((cell, i) => (
          <th key={i} className={styles.headerData}>
            {cell}
          </th>
        ))}
      </tr>
    </thead>
  );
};

interface ICellProps {
  data: any;
}

const TableCell = ({ data }: ICellProps) => {
  let display = data;
  if (Array.isArray(data)) {
    display = data.join(", ");
  }
  return <td className={styles.data}>{display}</td>;
};

export default Table;
