import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import {
  Box,
  Button,
  Grid,
  InputAdornment,
  MenuItem,
  TextField,
  Typography
} from '@mui/material';
import { fetchExchangeRates } from '@/api/exchangeRates';
import { debounce } from 'lodash';
import { CurrencyCode } from '@/types';
import { calculateTotalAmount } from '@/helpers/convertBalance';
import { useAuth } from '@/components/AuthProvider';

interface IProps {
  priceUsd: number,
  symbol: string
}

const currencies = [
  {
    value: CurrencyCode.USD,
    label: '$'
  },
  {
    value: CurrencyCode.EUR,
    label: '€'
  },
  {
    value: CurrencyCode.PLN,
    label: 'zł'
  }
];

export const Buy = ({ priceUsd, symbol }: IProps) => {
	const [ currencyAmount, setCurrencyAmount ] = useState(0);
  const [ currency, setCurrency ] = useState(CurrencyCode.USD);
	const [ exchangeRates, setExchangeRates ] = useState(null);
	const [ cryptoAmount, setCryptoAmount ] = useState(currencyAmount / priceUsd);
  const [ estimatedPrice, setEstimatedPrice ] = useState(priceUsd);
  const [ totalBalanceInSelectedCurrency, setTotalBalanceInSelectedCurrency ] = useState(0);
  const { user} = useAuth();
  const exchangeRate = exchangeRates?.[currency] || 1;
  console.log('usd: 233, euro:214')
  useEffect(() => {
    const accounts = user?.accounts || [];

    if (accounts.length && exchangeRates) {
      setTotalBalanceInSelectedCurrency(calculateTotalAmount(accounts, exchangeRates));
    }
  }, [ user?.accounts, exchangeRates ]);
  console.log(user?.accounts, exchangeRate)

  const handleCurrencyAmountChange = useCallback(debounce(({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    setCurrencyAmount(+value);
    setCryptoAmount(+value / priceUsd * exchangeRate);
    setEstimatedPrice(priceUsd * exchangeRate);
  }, 300), [ priceUsd, exchangeRate ]);

  const handleCurrencyChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    console.log(value)
    setCurrency(value as CurrencyCode);
  };

  // useEffect(() => {
  //   fetchUser()
  //     .then(({ accounts }) => {
  //       setUserAccounts(accounts);
  //       console.log(accounts)
  //     });
  // }, []);

  useEffect(() => {
    console.log(user?.accounts, currency)
    fetchExchangeRates({
      params: {
        currencies: Object.values(CurrencyCode).toString(),
        base_currency: currency
      }
    }).then(({ data }) => {
      const newEstimatedPrice = priceUsd * (data[currency] || 1);

      setExchangeRates(data);
      setEstimatedPrice(newEstimatedPrice);
      setCryptoAmount(currencyAmount / newEstimatedPrice);
    });
  }, [ user?.accounts, currency ]);

  return (
		<Box mt={4}>
      <Typography textAlign="center" mt={2} variant='h5'>
        Total Balance in {currency}: {totalBalanceInSelectedCurrency.toFixed(2)}
      </Typography>

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
                <TextField
                  select
                  defaultValue="USD"
                  variant="standard"
                  InputProps={{ disableUnderline: true }}
                  onChange={handleCurrencyChange}
                >
                  {currencies.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
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
						Buy {symbol}
					</Button>
				</Grid>
		</Grid>

    <Typography textAlign="center" mt={2}>Estimated price: 1 {symbol} ≈ {estimatedPrice}  {currency}</Typography>
	</Box>
	);
};
