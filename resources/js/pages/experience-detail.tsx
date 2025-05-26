import { useEffect, useState } from 'react';
import { Container, Grid, Typography, Card, CardContent, CardMedia, Stack, Divider } from '@mui/material';
import Navbar from '@/components/navbar';
import axios from 'axios';
import NavWrapper from '@/layouts/nav-wrapper';
import { router, usePage } from '@inertiajs/react';
import { useFilter } from '@/context/filter-context';
import ReservationModal from '@/components/ui/ReservationModal';
import { createReservation } from '@/actions/reservationAction';
import { SharedData } from '@/types';
import dayjs from 'dayjs';
import BuyButton from '@/components/ui/button-buy';
import showErrorAlert from '@/utils/error-alert';

export default function ExperienceDetail() {
  const { url } = usePage();
  const { auth } = usePage<SharedData>().props;
  const [experience, setExperience] = useState<any>(null);
  const [activities, setActivities] = useState<any[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState<any>(null);
  const { date, peopleAmount }  = useFilter();

    const handleConfirmReservation = async () => {
        if(!date){
            showErrorAlert('Por favor, selecciona una fecha para la reserva.');
            return
        }
        if (!auth.user) {            
            localStorage.setItem('pendingReservation', JSON.stringify({
                experienceId: selectedExperience.id,
                date: date,
                peopleAmount: peopleAmount,
                reservation_price: selectedExperience.price * peopleAmount,
            }));
            router.visit('/login');
            return;
        }
        // Crear reserva
        createReservation({
            experience_id: selectedExperience.id, 
            user_id: auth.user.id,
            experience_date: date,
            people_amount: peopleAmount,
            reservation_price: selectedExperience.price * peopleAmount,
        }, () => {
            setModalOpen(false);
            setSelectedExperience(null);
        })           
    };
     const handleBuy = (experience: any) => {
        setSelectedExperience(experience);
        setModalOpen(true);
    };

  useEffect(() => {
    const parts = url.split('/');
    const experienceId = parts[parts.length - 1]; // última parte de la URL
    const fetchDetail = async () => {
      const res = await axios.get(`/api/experiences/${experienceId}`);
      setExperience(res.data.experience);
      setActivities(res.data.activities);
    };
    fetchDetail();
    // console.log(date, peopleAmount);
    
  }, []);
   

  if (!experience) return <div>Cargando...</div>;

  return (
    <NavWrapper>
      <Container maxWidth="md">
        <ReservationModal
            open={modalOpen}
            onClose={() => setModalOpen(false)}
            onConfirm={handleConfirmReservation}
            experience={selectedExperience}
            date={date}
            peopleAmount={peopleAmount}
        />
        <Card sx={{ mt: 4, mb: 4 }}>
          <CardMedia component="img" height="320" image={experience.image} alt={experience.title} />
          <CardContent>
            <Typography variant="h4" fontWeight={700}>{experience.title}</Typography>
            <Typography variant="subtitle1" color="text.secondary">{experience.place}</Typography>
            <Typography variant="body1" sx={{ mt: 2 }}>{experience.desc}</Typography>
            <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
              <Typography variant="body2">Disponible: {dayjs(experience.available_date).format("DD-MM-YYYY")}</Typography>
              <Typography variant="body2">Expira: {dayjs(experience.expiration_date).format("DD-MM-YYYY")}</Typography>
              <Typography variant="body2">Rating: {experience.rating}</Typography>
            </Stack>
            <Typography variant="h6" sx={{ mt: 2 }} color="primary">Precio: ${experience.price}</Typography>
            <BuyButton fullWidth text="Comprar" showIcon={false} onClick={() => handleBuy(experience)} />  
          </CardContent>
        </Card>
        <Divider sx={{ mb: 2 }}>Actividades</Divider>
        <Grid container spacing={2}>
          {activities.length === 0 && <Typography variant="body2">No hay actividades registradas.</Typography>}
          {activities.map((activity, idx) => (
            <Grid spacing={{ xs: 12, md: 6 }} key={activity.id || idx}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{activity.desc}</Typography>
                  <Typography variant="body2">Hora: {activity.hour}</Typography>
                  <Typography variant="body2">Duración: {activity.duration_time}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </NavWrapper>
  );
}
