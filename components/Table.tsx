interface ITableProps {
  rows: object[];
}

const Table = ({ rows }: ITableProps) => {
  if (rows.length) {
    return (
      <table>
        <TableHeader cells={rows[0]} />
        <tbody>
          {rows.map((row, i) => (
            <TableRow key={i} cells={row} />
          ))}
        </tbody>
      </table>
    );
  }

  return null;
};

interface IRowProps {
  cells: object;
}

const TableRow = ({ cells }: IRowProps) => {
  return (
    <tr>
      {Object.entries(cells).map(([key, value], i) => (
        <TableCell key={i} data={value} />
      ))}
    </tr>
  );
};

const TableHeader = ({ cells }: IRowProps) => {
  return (
    <thead>
      <tr>
        {Object.keys(cells).map((cell, i) => (
          <th key={i}>{cell}</th>
        ))}
      </tr>
    </thead>
  );
};

interface ICellProps {
  data: any;
}

const TableCell = ({ data }: ICellProps) => {
  return <td>{data}</td>;
};

export default Table;
