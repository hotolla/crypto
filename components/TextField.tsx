import { Controller, useFormContext } from 'react-hook-form';
import MuiTextField, { TextFieldProps } from '@mui/material/TextField';

type Props = TextFieldProps & {
  name: string;
};

export const TextField = ({ name, ...props }: Props) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <MuiTextField
          fullWidth
          error={!!error}
          helperText={error?.message}
          value={value || ''}
          onChange={onChange}

          {...props}
        />
      )}
    />
  );
};
