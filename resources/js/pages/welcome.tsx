import SearchButtonC from '@/components/ui/btn-search';
import ExperienceCard from '@/components/ui/card-place';
import StaticDatePickerLandscape from '@/components/ui/date-picker';
import TextFieldNumber from '@/components/ui/text-field';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Button, Container, Grid, Stack } from '@mui/material';
import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import axios from 'axios';


export default function Welcome() {
    const { auth } = usePage<SharedData>().props;
    const [experiences, setExperiences] = useState<any[]>([]);
    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState({
        current_page: 1,
        last_page: 1,
        total: 0,
    });
    useEffect(() => {
        const fetchExperiences = async () => {
            try{
                const res = await axios.get(`/api/experiences?page=${page}`);
                console.log(res);
                
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
        fetchExperiences();
    }, [page]);
    
    
    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="flex min-h-screen flex-col items-center bg-[#FDFDFC] p-6 text-[#1b1b18] lg:justify-center lg:p-8 ">
                <header className="mb-6 w-full max-w-[335px] text-sm not-has-[nav]:hidden lg:max-w-4xl">
                    <nav className="flex items-center justify-end gap-4">
                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    // className="inline-block rounded-sm border border-transparent px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#19140035] dark:text-[#EDEDEC] dark:hover:border-[#3E3E3A]"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href={route('register')}
                                    // className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </nav>
                </header>
                <Container maxWidth="lg">
                    <Grid container display={"flex"} justifyContent={"center"} className="mb-4">
                        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                            <StaticDatePickerLandscape />
                            <TextFieldNumber value="1" onChange={() => {}} />
                            <SearchButtonC handleClick={() => {}} />
                        </Stack>
                    </Grid>
                    <Grid container>
                        {experiences.map((experience, index) => (
                            <Grid size={{xs: 12, sm: 6, md: 4  }} key={experience.id || index} className="mb-4">
                                <ExperienceCard activity={experience} />
                            </Grid>
                        ))}
                    </Grid>
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
