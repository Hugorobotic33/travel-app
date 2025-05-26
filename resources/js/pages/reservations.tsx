import { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, Card, CardContent, Grid, Stack, Divider } from '@mui/material';
import Navbar from '@/components/navbar';
import BtnBack from '@/components/ui/btn-back';
import NavWrapper from '@/layouts/nav-wrapper';

export default function MyReservations() {
  const [reservations, setReservations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReservations = async () => {
      try{        
        const res = await axios.get('/api/my-reservations');
        setReservations(res.data);
      }catch(error){
        console.log("error is: ", error);        
      }finally{
        setLoading(false);
      }
    };
    fetchReservations();
  }, []);

  return (
      <NavWrapper>
      <Container maxWidth="md">
        <Typography variant="h4" fontWeight={700} sx={{ mt: 4, mb: 2 }}>Mis Reservaciones</Typography>
        {loading ? (
          <Typography>Cargando...</Typography>
        ) : reservations.length === 0 ? (
          <Typography>No tienes reservaciones.</Typography>
        ) : (
          <Grid container spacing={2}>
            {reservations.map((reservation, idx) => (
              <Grid item xs={12} key={reservation.id || idx}>
                <Card>
                  <CardContent>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <img src={reservation.experience?.image} alt={reservation.experience?.title} style={{ width: 100, height: 80, objectFit: 'cover', borderRadius: 8 }} />
                      <div>
                        <Typography variant="h6">{reservation.experience?.title}</Typography>
                        <Typography variant="body2">Lugar: {reservation.experience?.place}</Typography>
                        <Typography variant="body2">Fecha: {reservation.experience_date}</Typography>
                        <Typography variant="body2">Personas: {reservation.people_amount}</Typography>
                        <Typography variant="body2">Precio total: ${reservation.reservation_price}</Typography>
                      </div>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </NavWrapper>
  );
}
