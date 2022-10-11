import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

const theme = createTheme();

export default function Home() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <h1>Trabalho 1 - Verificação e Validação de Software II</h1>
      <h3>Componentes do grupo: </h3>
      <h4>Arthur Sudbrack, Filipe Oliveira de Freitas, Mathias Fatur Kauffmann</h4>
    
    </ThemeProvider>
  );
}
