import { GridValueFormatterParams } from '@mui/x-data-grid';

export const changePercent = ( params : GridValueFormatterParams) => {
  if (params.value == null) {
    return '';
  }

  const valueFormatted = Number(params.value * 1).toLocaleString();
  return `${valueFormatted} %`;
};
