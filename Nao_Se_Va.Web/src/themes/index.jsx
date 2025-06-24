import { createTheme } from '@mui/material/styles';
import { ptBR as corePtBR } from '@mui/material/locale';
import { ptBR as dataGridPtBR } from '@mui/x-data-grid/locales';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
  corePtBR,
  dataGridPtBR
});

export default theme;