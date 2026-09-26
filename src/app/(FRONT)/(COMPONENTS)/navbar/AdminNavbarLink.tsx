import React from 'react';
import Link from 'next/link';
import {Package2, PlusCircle, Citrus, Logs} from "lucide-react";
import {motion} from "motion/react";
import PanelLeftCloseDashedDuotoneIcon from '@iconify-react/keyline-icons/panel-left-close-dashed-duotone';


function AdminNavbarLink({isSidebarOpen, setIsSidebarOpen}: {isSidebarOpen: boolean, setIsSidebarOpen: (isOpen: boolean) => void}) {
    return (<>
        {/*Big screen*/}
            <div className="hidden md:flex items-center gap-2 w-full justify-center ">
                <Link href="/admin/add-meal" className="group flex items-center gap-2 rounded-full border border-border/50 bg-muted/40 px-4 py-2 text-foreground transition-all duration-200 hover:border-primary/50 hover:bg-primary/10 hover:shadow-sm">
                    <PlusCircle className="size-4 text-muted-foreground transition-colors group-hover:text-primary"/>
                    <span className="text-sm font-medium">Add Meals</span>
                </Link>
                <Link href="/" className="group flex items-center gap-2 rounded-full border border-border/50 bg-muted/40 px-4 py-2 text-foreground transition-all duration-200 hover:border-primary/50 hover:bg-primary/10 hover:shadow-sm">
                    <Citrus className="size-4 text-muted-foreground transition-colors group-hover:text-primary"/>
                    <span className="text-sm font-medium">View Meals</span>
                </Link>
                <Link href="/" className="group flex items-center gap-2 rounded-full border border-border/50 bg-muted/40 px-4 py-2 text-foreground transition-all duration-200 hover:border-primary/50 hover:bg-primary/10 hover:shadow-sm">
                    <Package2 className="size-4 text-muted-foreground transition-colors group-hover:text-primary"/>
                    <span className="text-sm font-medium">View Orders</span>
                </Link>
            </div>
        {/*Small screen*/}
            <motion.div className="absolute top-4 right-18 sm:top-4 sm:right-40 md:hidden  shadow-sm w-12 h-12 flex items-center justify-center z-100 hover:text-yellow-600/80 "
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                {isSidebarOpen ? <PanelLeftCloseDashedDuotoneIcon height="2.09em" className="text-muted-foreground pr-0.5 hover:text-yellow-600/80" /> : <Logs/>}

            </motion.div>
        </>

    );
}

export default AdminNavbarLink;