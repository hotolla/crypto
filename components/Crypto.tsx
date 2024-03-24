import { ChangeEvent, useState } from 'react';
import { Button, Grid, InputAdornment, MenuItem, Select, TextField, Typography } from '@mui/material';

interface IProps {
  priceUsd: number,
};

const currencies = [
  {
    value: 'USD',
    label: '$'
  },
  {
    value: 'EUR',
    label: '€'
  },
  {
    value: 'BTC',
    label: '฿'
  }
];

export const Crypto = ({ priceUsd }: IProps) => {
	const [ currencyAmount, setCurrencyAmount ] = useState(20);
	const [ cryptoAmount, setCryptoAmount ] = useState(currencyAmount / priceUsd);

  const handleCurrencyAmountChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    setCurrencyAmount(+value);
    setCryptoAmount(+value / priceUsd);
  };

  return (
		<>
      <Typography variant="h3">Buy crypto by fiat</Typography>
			<Grid
				noValidate
				container
				spacing={0}
				alignItems="center"
				direction="column"
				component="form"
			>
				<Grid item width={225}>
					<TextField
						margin="dense"
						name="Spend"
						label="Spend"
            onChange={handleCurrencyAmountChange}
            InputProps={{
              endAdornment: (
              <InputAdornment position="start">

                 <Select
                  defaultValue="USD"
                  variant="standard"
                  disableUnderline
                >
                  {currencies.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </InputAdornment>
              )
            }}
					>
					</TextField>
				</Grid>

				<Grid item >
					<TextField
						margin="dense"
						name="Reseive"
						label="Reseive"
						placeholder="0 - 10000Currency"
            value={cryptoAmount}
					/>
				</Grid>

				<Grid item>
					<Button
						type="submit"
						variant="contained"
						size="large"
					>
						Buy
					</Button>
				</Grid>
		</Grid>
	</>
	);
};