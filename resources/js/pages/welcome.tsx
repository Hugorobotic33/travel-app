import SearchButtonC from '@/components/ui/btn-search';
import ExperienceCard from '@/components/ui/card-place';
import StaticDatePickerLandscape from '@/components/ui/date-picker';
import TextFieldNumber from '@/components/ui/text-field';
import { type SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { Button, Container, Grid, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '@/components/navbar';
import ReservationModal from '@/components/ui/ReservationModal';
import { router } from '@inertiajs/react';
import showAlert from '@/utils/alert';
import Title from '@/components/ui/title';
import Subtitle from '@/components/ui/subtitle';
import { createReservation } from '@/actions/reservationAction';
import { useFilter } from '@/context/filter-context';
import showErrorAlert from '@/utils/error-alert';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;
    const [experiences, setExperiences] = useState<any[]>([]);
    const { peopleAmount, date, setParams} = useFilter()
    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState({
        current_page: 1,
        last_page: 1,
        total: 0,
    });
   
     const [modalOpen, setModalOpen] = useState(false);
     const [selectedExperience, setSelectedExperience] = useState<any>(null);

     const handlePeopleAmountChange = (e: any) => {
        const value = +e.target.value;
        if (value < 1 || value > 20) {
            return;
        }        
        setParams((prev: any) => ({
            ...prev,
            peopleAmount: value,
        }));        
    };
    const handleDateChange = (date: any) => {        
        setParams((prev: any) => ({
            ...prev,
            date: date,
        }));                
    };

    const fetchExperiences = async () => {        
        try{
            const queryParams = new URLSearchParams();
            const dateFilter = date ? date : null;
            queryParams.append("page", page.toString());
            if (dateFilter) {
                queryParams.append("dateFilter", dateFilter); // e.g. 2025-05-23
            }
            const res = await axios.get(`/api/experiences?${queryParams.toString()}`);
            setExperiences(res.data.data);
            setPagination({
                current_page: res.data.current_page,
                last_page: res.data.last_page,
                total: res.data.total,
            });
        }catch(error){
            console.error("Error fetching experiences:", error);
        }
    };

    const handleBuy = (experience: any) => {
        setSelectedExperience(experience);
        setModalOpen(true);
    };

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

    // Al loguearse, si hay reserva pendiente, crearla
    useEffect(() => {
        if (auth.user) {
            const pending = localStorage.getItem('pendingReservation');
            if (pending) {
                const data = JSON.parse(pending);
                createReservation({
                    experience_id: data.experienceId,
                    user_id: auth.user.id,
                    experience_date: data.date,
                    people_amount: data.peopleAmount,
                    reservation_price: data.reservation_price,
                }, ()=>{
                    showAlert("Reservacion creada con éxito");   
                    localStorage.removeItem('pendingReservation');
                })
              
            }
        }
    }, [auth.user]);
    
    useEffect(() => {
        fetchExperiences();
    }, [page]);

    useEffect(()=>{
        const theme = localStorage.getItem('appearance');
        if(!theme){
            localStorage.setItem('appearance', 'light');
        }      
    },[])
    
    
    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="flex min-h-screen flex-col items-center bg-[#FDFDFC] p-6 text-[#1b1b18] lg:justify-center lg:p-8 dark:bg-[#0a0a0a]">
                <Navbar />                
                <Title text='Encuentra tu experiencia perfecta'/>
                <Subtitle />       
                <br></br> 
                <Container maxWidth="lg">
                    <Grid container display={"flex"} justifyContent={"center"} className="mb-4">
                        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                            <StaticDatePickerLandscape value={date} handleChange={handleDateChange}/>
                            <TextFieldNumber value={peopleAmount.toString()} onChange={handlePeopleAmountChange} />
                            <SearchButtonC handleClick={() => fetchExperiences()} />
                        </Stack>
                    </Grid>
                    
                    <Grid container>
                        {experiences.map((experience, index) => (
                            <Grid size={{xs: 12, sm: 6, md: 4  }} key={experience.id || index} className="mb-4">
                                <ExperienceCard experience={experience} onBuy={handleBuy} />
                            </Grid>
                        ))}
                    </Grid>
                    <ReservationModal
                        open={modalOpen}
                        onClose={() => setModalOpen(false)}
                        onConfirm={handleConfirmReservation}
                        experience={selectedExperience}
                        date={date}
                        peopleAmount={peopleAmount}
                    />

                    {/* Paginación simple */}
                    <div className="flex justify-center gap-2 mt-4">
                        <Button disabled={pagination.current_page === 1} onClick={() => setPage(page - 1)}>
                            Anterior
                        </Button>
                        <span>Página {pagination.current_page} de {pagination.last_page}</span>
                        <Button disabled={pagination.current_page === pagination.last_page} onClick={() => setPage(page + 1)}>
                            Siguiente
                        </Button>
                    </div>
                </Container>                
                <div className="hidden h-14.5 lg:block"></div>
            </div>
        </>
    );
}
