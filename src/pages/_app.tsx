import 'normalize.css/normalize.css';
import '@/styles/globals.scss'
import type {AppProps} from 'next/app'
import {ClerkProvider} from "@clerk/nextjs";

export default function App({Component, pageProps}: AppProps) {
    // noinspection TypeScriptValidateTypes
    return (
        // @ts-ignore
        <ClerkProvider {...pageProps} >
            <Component {...pageProps} />
        </ClerkProvider>
    )
}
