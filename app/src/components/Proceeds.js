import {
  Typography,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@material-ui/core';
import { PieChart } from 'svg-charts-react';

const useStyles = makeStyles((theme) => ({
  title: theme.titleFont,
  question: {
    fontWeight: "bold",
    marginTop: theme.spacing(3)
  }
}));

export default function Proceeds() {
  const classes = useStyles();

  const expenseData = [
    { title: 'Taxes 💸', value: 32, color: '#ababab' },
    { title: 'Artist College Fund 🎓', value: 31, color: '#00FE39' },
    { title: 'Artist Expenses 🎨', value: 3, color: '#FF0000' },
    { title: 'Marketing Expenses 🚨', value: 17, color: '#1F06EB' },
    { title: 'Development Expenses 🛠', value: 17, color: '#FF0094' },
  ];

  return (
    <>
      <Typography className={classes.title} component="h2" variant="h3" align="center" gutterBottom>
        proceeds
      </Typography>
      <PieChart data={expenseData} strokeWidth={1} />
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell><strong>Target</strong></TableCell>
              <TableCell align="right"><strong>Amount</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {expenseData.map((row) => (
              <TableRow key={row.title}>
                <TableCell component="th" scope="row">
                  {row.title}
                </TableCell>
                <TableCell align="right">{row.value}%</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
