import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

export default function StaticDatePickerLandscape() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker      
        format='DD/MM/YYYY'
        label="Fecha de la actividad"
        minDate={dayjs(new Date())}
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
