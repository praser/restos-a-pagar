interface IColumn {
  name: string;
  selector?: string;
  sortable?: boolean;
  center?: boolean;
  format?: (row: any) => any;
  cell?: (row: any) => any;
}

export default IColumn;
