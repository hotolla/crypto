import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { Yup } from '@/validation';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, FormProvider } from 'react-hook-form';
import {
  Stack,
  Paper,
  Box,
  Button,
  IconButton,
  Container,
  Typography,
  Grid,
  MenuItem,
  TextField
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { chargeAccount } from '@/api/accounts/accounts';
// import { TextField } from '@/components/TextField';
import { debounce } from 'lodash';
import { fetchUser } from '@/api/user';
import { Account } from '@/types';
import { fetchExchangeRates } from '@/api/exchangeRates';
import { calculateTotalAmount } from '@/helpers/convertBalance';

enum CurrencyCode {
  USD = 'USD',
  EUR = 'EUR',
  PLN = 'PLN',
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

interface FormValues {
  amount: number | null,
  currency: string | null
}
export interface IBalance {
  amount: number,
  currency: string
}

const defaultValues = {
  amount: 0,
  currency: ''
};

const validationSchema = Yup.object({
  amount: Yup.number().nullable().required(),
  currency: Yup.string().nullable().required()
});

export const Wallet = () => {
  const [ balance, setBalance,  ] = useState<IBalance | null>(null);
  const [showBalance, setShowBalance] = useState<boolean>(false);
  const [ amount, setAmount ] = useState(0);
  const [ currency, setCurrency ] = useState(CurrencyCode.USD);
  const [ userAccounts, setUserAccounts] = useState<Account[]>([]);
  const [ totalBalanceInSelectedCurrency, setTotalBalanceInSelectedCurrency] = useState(0);

  useEffect(() => {
    fetchUser()
      .then(({ accounts }) => {
        setUserAccounts(accounts);
        updateTotalBalance(accounts, CurrencyCode.USD);
      });
  }, []);

  const updateTotalBalance = (accounts: Account[], selectedCurrency: CurrencyCode) => {
    fetchExchangeRates()
      .then(({ data }) => {
        const total = calculateTotalAmount(accounts, selectedCurrency, data)
        setTotalBalanceInSelectedCurrency(total);
      });
  };
  const form = useForm({
    defaultValues,
    resolver: yupResolver(validationSchema)
  });

  const toggleBalanceVisibility = () => {
    setShowBalance(!showBalance);
  };

  const handleCurrencyAmountChange = useCallback(debounce((event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const amount = event.target.value;
    setAmount(+amount);
  }, 300), []);

  const handleCurrencyChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    setCurrency(value as CurrencyCode);
  };

  const handleSubmit = (values: FormValues) => {
    console.log(values)
    chargeAccount(values)
      .then((data) => {
        setBalance(data);
        console.log(data)
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Paper elevation={1} sx={{maxWidth: 500}}>
      <Container>

        <Stack spacing={1}>
          <Stack spacing={3} direction="row" alignItems="center">
            <Typography variant="h6">Estimated Balance:</Typography>

            <IconButton onClick={toggleBalanceVisibility}>
              <VisibilityIcon />
            </IconButton>
          </Stack>
          <Stack>
            {showBalance ?
              <Box>{balance?.amount} {balance?.currency} {totalBalanceInSelectedCurrency}</Box>
              : <Box>********</Box>
            }
          </Stack>
        </Stack>
        {/*<FormProvider {...form}>*/}
        {/*  <form onSubmit={(form.handleSubmit(handleSubmit))}>*/}
        {/*    <TextField*/}
        {/*      type="number"*/}
        {/*      name="amount"*/}
        {/*      label="amount"*/}
        {/*      placeholder="Enter amount ..."*/}
        {/*      sx={{mb: 1 }}*/}
        {/*    />*/}

        {/*    <TextField*/}
        {/*      name="currency"*/}
        {/*      label="currency"*/}
        {/*      placeholder="Enter curency ..."*/}
        {/*      sx={{mb: 1}}*/}
        {/*    />*/}
        {/*    <Button variant="contained" type="submit">Deposit</Button>*/}
        {/*  </form>*/}
        {/*</FormProvider>*/}

        <Grid
          noValidate
          container
          spacing={0}
          alignItems="center"
          direction="column"
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: 250 },
          }}
        >
          <Grid item width={225}>
            <TextField
              margin="dense"
              name="Amount"
              label="Amount"
              type="number"
              onChange={handleCurrencyAmountChange}
            />

            <TextField
              select
              label="Currency"
              defaultValue="USD"
              InputProps={{ disableUnderline: true }}
              onChange={handleCurrencyChange}
            >
              {currencies.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item>
            <Button
              variant="contained"
              size="large"
              sx={{ mb: 2 }}
              onClick={() => handleSubmit({ amount, currency })}
            >
              Deposit
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Paper>
  );
};
