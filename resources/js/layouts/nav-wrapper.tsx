import Navbar from "@/components/navbar";
import BtnBack from "@/components/ui/btn-back";
import { router } from "@inertiajs/react";

export default function NavWrapper({children}: {children: React.ReactNode}) {
    function handleNavigate(){
        router.visit('/');
    }
    return (
        <>
            <Navbar />
        {/* <div className="flex min-h-screen flex-col items-center bg-[#FDFDFC] p-6 text-[#1b1b18] lg:justify-center lg:p-8"> */}            
            {children}
        {/* </div> */}
        </>
    );
}