import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';
import dayjs from 'dayjs';
import React from 'react';
import StaticDatePickerLandscape from './date-picker';
import { useFilter } from '@/context/filter-context';

interface ReservationModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  experience: any;
  date: string | null;
  peopleAmount: number;
}

export default function ReservationModal({ open, onClose, onConfirm, experience, date, peopleAmount }: ReservationModalProps) {
  const { setParams } = useFilter();
  if (!experience) return null;
  const [change, setChange] = React.useState(false);
  const handleDateChange = (newDate: string | null) => {
      setParams((prev: any) => ({
            ...prev,
            date: newDate,
        }));            
  }
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirmar reservación</DialogTitle>
      <DialogContent>
        <Typography variant="subtitle1" gutterBottom>
          <b>Experiencia:</b> {experience.title}
        </Typography>
        {
          !date || change ?
          <>
            <Typography variant="body2">
              <b>Selecciona una fecha en el rango de disponibilidad: </b>
            </Typography>
            <StaticDatePickerLandscape minDate={experience?.available_date} maxDate={experience?.expiration_date} value={date} handleChange={handleDateChange}/>
          </>
           :
        <Typography variant="body2">
          <b>Fecha:</b> {date ? dayjs(date).format('DD/MM/YYYY') : 'No seleccionada'}
        </Typography>
        }
        {
          !change && date &&
          <Button variant='text' size='small' onClick={() => setChange(true)} sx={{ mt: 1, mb: 1 }}>
            Cambiar fecha
          </Button>
        }
        
        <Typography variant="body2">
          <b>Número de personas:</b> {peopleAmount}
        </Typography>
        <Typography variant="body2">
          <b>Precio total:</b> ${Number(experience.price) * peopleAmount}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={onConfirm} variant="contained" color="primary">Confirmar compra</Button>
      </DialogActions>
    </Dialog>
  );
}
