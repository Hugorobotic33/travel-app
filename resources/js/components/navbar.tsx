import { Head, Link, usePage } from '@inertiajs/react';
import { type SharedData } from '@/types';
import { NavUser } from './nav-user';
import { UserMenuContent } from './user-menu-content';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ParaglidingIcon from '@mui/icons-material/Paragliding';
import { useFilter } from '@/context/filter-context';

export default function Navbar() {
    const { setParams } = useFilter()
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            
            <ParaglidingIcon />
          </IconButton>
           <Link
               onClick={()=> {
                    setParams((prev: any) => ({
                        ...prev,
                        date: null,
                    }));          
               }}
                href={route('home')}
                className='text-lg font-bold flex-grow-1'
                // className="inline-block rounded-sm border border-transparent px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#19140035] dark:text-[#EDEDEC] dark:hover:border-[#3E3E3A]"
            >
                Inicio
            </Link>
          {/* <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography> */}
            <Link
                href={route('reservations')}
                className='text-lg font-bold'
                // className="inline-block rounded-sm border border-transparent px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#19140035] dark:text-[#EDEDEC] dark:hover:border-[#3E3E3A]"
            >
                Reservaciones
            </Link>
          {/* <Button color="inherit">Login</Button> */}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

 function Navbarjj(){
    const { auth } = usePage<SharedData>().props;
    return (
        <header className="mb-6 w-full max-w-[335px] text-sm not-has-[nav]:hidden lg:max-w-4xl">                
            <nav className="flex items-center justify-end gap-4">
                {auth.user ? (
                    <UserDropdown user={auth.user} />
                ) : (
                    <>
                        <Link
                            href={route('login')}
                            className="inline-block rounded-sm border border-transparent px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#19140035] dark:text-[#EDEDEC] dark:hover:border-[#3E3E3A]"
                        >
                            Log in
                        </Link>
                        <Link
                            href={route('register')}
                            className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                        >
                            Register
                        </Link>
                    </>
                )}
            </nav>
        </header>
    );
}

const UserDropdown = ({ user }: { user: any }) => {
    return (
          <DropdownMenu>
          <DropdownMenuTrigger>
          <span
            className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b] cursor-pointer"
            >
            Mi cuenta
            </span>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">            
            <UserMenuContent user={user} />                        
          </DropdownMenuContent>
        </DropdownMenu>

    );
}

