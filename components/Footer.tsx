import { Divider, Typography, Paper } from '@mui/material';

export const Footer = () => {
  return (
    <Paper sx={{ backgroundColor: 'primary.main' }}>
      <Divider/>
      <Typography variant="h6" align="center" color="primary.contrastText"> Crypto-exchange © {new Date().getFullYear()}</Typography>
    </Paper>
  );
};