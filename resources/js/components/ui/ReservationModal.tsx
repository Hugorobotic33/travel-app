import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';
import dayjs from 'dayjs';

interface ReservationModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  experience: any;
  date: string | null;
  peopleAmount: number;
}

export default function ReservationModal({ open, onClose, onConfirm, experience, date, peopleAmount }: ReservationModalProps) {
  if (!experience) return null;
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirmar reservación</DialogTitle>
      <DialogContent>
        <Typography variant="subtitle1" gutterBottom>
          <b>Experiencia:</b> {experience.title}
        </Typography>
        <Typography variant="body2">
          <b>Fecha:</b> {date ? dayjs(date).format('DD/MM/YYYY') : 'No seleccionada'}
        </Typography>
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
