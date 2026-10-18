"use client"
import React from 'react';
import {SessionProvider,} from "next-auth/react";
import {Provider} from "react-redux";
import {store} from "@/app/(FRONT)/REDUX/store";



function ProviderClient({children}: { children: React.ReactNode }) {

    return (

        <SessionProvider>
            <Provider store={store}>
                {children}
            </Provider>
        </SessionProvider>


    );
}

export default ProviderClient;