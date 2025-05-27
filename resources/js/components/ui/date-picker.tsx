import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import 'dayjs/locale/es';

export default function StaticDatePickerLandscape({ value , handleChange, minDate = null, maxDate=null }: { value: any, handleChange: (date: any) => void, minDate?: any, maxDate?: any }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='es'>
      <DatePicker            
        value={value && dayjs(value)}
        onChange={(newValue) => {          
          const date = dayjs(newValue).format('YYYY/MM/DD');          
          handleChange(date)
        }}  
        format='DD/MM/YYYY'
        label="Fecha de la actividad"
        minDate={minDate ? dayjs(minDate) : dayjs(new Date())}
        maxDate={maxDate && dayjs(maxDate)}
        slotProps={{
          textField: {
            // fullWidth: true,
            InputProps: {
              sx: {
                borderRadius: 50, // Cambia a '100px' para hacerlo más circular
                // backgroundColor: 'white',
              },
            },
          },
        }}
       orientation="landscape"  />
    </LocalizationProvider>
  );
}
