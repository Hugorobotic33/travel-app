"use client"

import { useEffect, useState } from "react"
import {
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Stack,
  Divider,
  Box,
  Chip,
  Paper,
  Avatar,
} from "@mui/material"
import { LocationOn, CalendarToday, Schedule, Star, AttachMoney, Event, AccessTime } from "@mui/icons-material"
import axios from "axios"
import NavWrapper from "@/layouts/nav-wrapper"
import { usePage } from "@inertiajs/react"
import { useFilter } from "@/context/filter-context"
import ReservationModal from "@/components/ui/ReservationModal"
import { createReservation } from "@/actions/reservationAction"
import type { SharedData } from "@/types"
import dayjs from "dayjs"
import BuyButton from "@/components/ui/button-buy"
import showErrorAlert from "@/utils/error-alert"
import BtnBack from "@/components/ui/btn-back"

export default function ExperienceDetail() {
  const { url } = usePage()
  const { auth } = usePage<SharedData>().props
  const [experience, setExperience] = useState<any>(null)
  const [activities, setActivities] = useState<any[]>([])
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedExperience, setSelectedExperience] = useState<any>(null)
  const { date, peopleAmount } = useFilter()

  const handleConfirmReservation = async () => {
    if (!date) {
      showErrorAlert("Por favor, selecciona una fecha para la reserva.")
      return
    }
    // if (!auth.user) {
    //     localStorage.setItem('pendingReservation', JSON.stringify({
    //         experienceId: selectedExperience.id,
    //         date: date,
    //         peopleAmount: peopleAmount,
    //         reservation_price: selectedExperience.price * peopleAmount,
    //     }));
    //     router.visit('/login');
    //     return;
    // }
    // Crear reserva
    createReservation(
      {
        experience_id: selectedExperience.id,
        // user_id: auth.user.id,
        experience_date: date,
        people_amount: peopleAmount,
        reservation_price: selectedExperience.price * peopleAmount,
      },
      () => {
        setModalOpen(false)
        setSelectedExperience(null)
      },
    )
  }
  const handleBuy = (experience: any) => {
    setSelectedExperience(experience)
    setModalOpen(true)
  }

  useEffect(() => {
    const parts = url.split("/")
    const experienceId = parts[parts.length - 1] // última parte de la URL
    const fetchDetail = async () => {
      const res = await axios.get(`/api/experiences/${experienceId}`)
      setExperience(res.data.experience)
      setActivities(res.data.activities)
    }
    fetchDetail()
    // console.log(date, peopleAmount);
  }, [])

  if (!experience) return <div>Cargando...</div>

  return (
    <NavWrapper>
      <Container maxWidth="lg">
        {/* Header con botón de volver */}
        <Box sx={{ py: 3 }}>
          <BtnBack onClick={() => null} />
        </Box>

        <ReservationModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onConfirm={handleConfirmReservation}
          experience={selectedExperience}
          date={date}
          peopleAmount={peopleAmount}
        />

        {/* Card principal de la experiencia */}
        <Card
          elevation={3}
          sx={{
            mb: 4,
            borderRadius: 3,
            overflow: "hidden",
            position: "relative",
          }}
        >
          <CardMedia
            component="img"
            height="400"
            image={experience.image}
            alt={experience.title}
            sx={{ objectFit: "cover" }}
          />

          {/* Badge de rating flotante */}
          <Box
            sx={{
              position: "absolute",
              top: 16,
              right: 16,
              bgcolor: "rgba(255, 255, 255, 0.95)",
              borderRadius: 2,
              p: 1,
              display: "flex",
              alignItems: "center",
              gap: 0.5,
              backdropFilter: "blur(10px)",
            }}
          >
            <Star sx={{ color: "warning.main", fontSize: 20 }} />
            <Typography variant="body2" fontWeight={600}>
              {experience.rating}
            </Typography>
          </Box>

          <CardContent sx={{ p: 4 }}>
            {/* Título y ubicación */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="h3" fontWeight={700} sx={{ mb: 1, color: "text.primary" }}>
                {experience.title}
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <LocationOn sx={{ color: "text.secondary", fontSize: 20 }} />
                <Typography variant="h6" color="text.secondary">
                  {experience.place}
                </Typography>
              </Box>
            </Box>

            {/* Descripción */}
            <Typography
              variant="body1"
              sx={{
                mb: 3,
                lineHeight: 1.7,
                color: "text.secondary",
                fontSize: "1.1rem",
              }}
            >
              {experience.desc}
            </Typography>

            {/* Información en chips */}
            <Stack direction="row" spacing={2} sx={{ mb: 3, flexWrap: "wrap", gap: 1 }}>
              <Chip
                icon={<CalendarToday />}
                label={`Disponible: ${dayjs(experience.available_date).format("DD-MM-YYYY")}`}
                variant="outlined"
                color="primary"
              />
              <Chip
                icon={<Schedule />}
                label={`Expira: ${dayjs(experience.expiration_date).format("DD-MM-YYYY")}`}
                variant="outlined"
                color="secondary"
              />
              <Chip icon={<Star />} label={`Rating: ${experience.rating}`} variant="outlined" color="warning" />
            </Stack>

            {/* Precio y botón de compra */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mt: 4,
                p: 3,
                bgcolor: "grey.50",
                borderRadius: 2,
                flexDirection: { xs: "column", sm: "row" },
                gap: 2,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                {/* <AttachMoney sx={{ color: "success.main", fontSize: 28 }} /> */}
                <Typography variant="h4" fontWeight={700} color="success.main">
                  ${experience.price}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  por persona
                </Typography>
              </Box>

              <Box sx={{ width: { xs: "100%", sm: "auto" } }}>
                <BuyButton fullWidth text="Reservar Ahora" showIcon={false} onClick={() => handleBuy(experience)} />
              </Box>
            </Box>
          </CardContent>
        </Card>

        {/* Sección de actividades */}
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
            <Event sx={{ color: "primary.main", fontSize: 28 }} />
            <Typography variant="h4" fontWeight={600}>
              Actividades Incluidas
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {activities.length === 0 ? (
              <Grid item xs={12}>
                <Paper sx={{ p: 4, textAlign: "center", bgcolor: "grey.50" }}>
                  <Typography variant="body1" color="text.secondary">
                    No hay actividades registradas.
                  </Typography>
                </Paper>
              </Grid>
            ) : (
              activities.map((activity, idx) => (
                <Grid item xs={12} md={6} lg={4} key={activity.id || idx}>
                  <Card
                    elevation={2}
                    sx={{
                      height: "100%",
                      borderRadius: 2,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: 4,
                      },
                    }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2, mb: 2 }}>
                        <Avatar
                          sx={{
                            bgcolor: "primary.main",
                            width: 40,
                            height: 40,
                            fontSize: "1.2rem",
                            fontWeight: 600,
                          }}
                        >
                          {idx + 1}
                        </Avatar>
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="h6" fontWeight={600} sx={{ mb: 2, lineHeight: 1.3 }}>
                            {activity.desc}
                          </Typography>
                        </Box>
                      </Box>

                      <Divider sx={{ my: 2 }} />

                      <Stack spacing={1}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          <Schedule sx={{ color: "text.secondary", fontSize: 18 }} />
                          <Typography variant="body2" color="text.secondary">
                            <strong>Hora:</strong> {activity.hour}
                          </Typography>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          <AccessTime sx={{ color: "text.secondary", fontSize: 18 }} />
                          <Typography variant="body2" color="text.secondary">
                            <strong>Duración:</strong> {activity.duration_time}
                          </Typography>
                        </Box>
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            )}
          </Grid>
        </Box>
      </Container>
    </NavWrapper>
  )
}


// import { useEffect, useState } from 'react';
// import { Container, Grid, Typography, Card, CardContent, CardMedia, Stack, Divider } from '@mui/material';
// import Navbar from '@/components/navbar';
// import axios from 'axios';
// import NavWrapper from '@/layouts/nav-wrapper';
// import { router, usePage } from '@inertiajs/react';
// import { useFilter } from '@/context/filter-context';
// import ReservationModal from '@/components/ui/ReservationModal';
// import { createReservation } from '@/actions/reservationAction';
// import { SharedData } from '@/types';
// import dayjs from 'dayjs';
// import BuyButton from '@/components/ui/button-buy';
// import showErrorAlert from '@/utils/error-alert';
// import BtnBack from '@/components/ui/btn-back';

// export default function ExperienceDetail() {
//   const { url } = usePage();
//   const { auth } = usePage<SharedData>().props;
//   const [experience, setExperience] = useState<any>(null);
//   const [activities, setActivities] = useState<any[]>([]);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [selectedExperience, setSelectedExperience] = useState<any>(null);
//   const { date, peopleAmount }  = useFilter();

//     const handleConfirmReservation = async () => {
//         if(!date){
//             showErrorAlert('Por favor, selecciona una fecha para la reserva.');
//             return
//         }
//         // if (!auth.user) {            
//         //     localStorage.setItem('pendingReservation', JSON.stringify({
//         //         experienceId: selectedExperience.id,
//         //         date: date,
//         //         peopleAmount: peopleAmount,
//         //         reservation_price: selectedExperience.price * peopleAmount,
//         //     }));
//         //     router.visit('/login');
//         //     return;
//         // }
//         // Crear reserva
//         createReservation({
//             experience_id: selectedExperience.id, 
//             // user_id: auth.user.id,
//             experience_date: date,
//             people_amount: peopleAmount,
//             reservation_price: selectedExperience.price * peopleAmount,
//         }, () => {
//             setModalOpen(false);
//             setSelectedExperience(null);
//         })           
//     };
//      const handleBuy = (experience: any) => {
//         setSelectedExperience(experience);
//         setModalOpen(true);
//     };

//   useEffect(() => {
//     const parts = url.split('/');
//     const experienceId = parts[parts.length - 1]; // última parte de la URL
//     const fetchDetail = async () => {
//       const res = await axios.get(`/api/experiences/${experienceId}`);
//       setExperience(res.data.experience);
//       setActivities(res.data.activities);
//     };
//     fetchDetail();
//     // console.log(date, peopleAmount);
    
//   }, []);
   

//   if (!experience) return <div>Cargando...</div>;

//   return (
//     <NavWrapper>
//       <Container maxWidth="md">
//         <BtnBack onClick={()=>null} />
//         <ReservationModal
//             open={modalOpen}
//             onClose={() => setModalOpen(false)}
//             onConfirm={handleConfirmReservation}
//             experience={selectedExperience}
//             date={date}
//             peopleAmount={peopleAmount}
//         />
//         <Card sx={{ mt: 4, mb: 4 }}>
//           <CardMedia component="img" height="320" image={experience.image} alt={experience.title} />
//           <CardContent>
//             <Typography variant="h4" fontWeight={700}>{experience.title}</Typography>
//             <Typography variant="subtitle1" color="text.secondary">{experience.place}</Typography>
//             <Typography variant="body1" sx={{ mt: 2 }}>{experience.desc}</Typography>
//             <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
//               <Typography variant="body2">Disponible: {dayjs(experience.available_date).format("DD-MM-YYYY")}</Typography>
//               <Typography variant="body2">Expira: {dayjs(experience.expiration_date).format("DD-MM-YYYY")}</Typography>
//               <Typography variant="body2">Rating: {experience.rating}</Typography>
//             </Stack>
//             <Typography variant="h6" sx={{ mt: 2 }} color="primary">Precio: ${experience.price}</Typography>
//             <BuyButton fullWidth text="Comprar" showIcon={false} onClick={() => handleBuy(experience)} />  
//           </CardContent>
//         </Card>
//         <Divider sx={{ mb: 2 }}>Actividades</Divider>
//         <Grid container spacing={2}>
//           {activities.length === 0 && <Typography variant="body2">No hay actividades registradas.</Typography>}
//           {activities.map((activity, idx) => (
//             <Grid spacing={{ xs: 12, md: 6 }} key={activity.id || idx}>
//               <Card>
//                 <CardContent>
//                   <Typography variant="h6">{activity.desc}</Typography>
//                   <Typography variant="body2">Hora: {activity.hour}</Typography>
//                   <Typography variant="body2">Duración: {activity.duration_time}</Typography>
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//       </Container>
//     </NavWrapper>
//   );
// }
