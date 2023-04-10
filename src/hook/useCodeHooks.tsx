import {useAuth} from "@clerk/nextjs";
import {array} from "yup";

interface ApiHook {
    api: CodehooksEndpoints
    deps: any
}

interface CodehooksEndpoints {
    makeUrl: (url: string) => string,
    fetchProps: (props: any) => any,

    fetch: (endpoint: string, callback: (res: Response) => Promise<void>, method?: string) => Promise<void>
}

export function useCodeHooks(): ApiHook {
    const [baseUrl, apiKey] = [process.env.NEXT_PUBLIC_API_ENDPOINT_BASE, process.env.NEXT_PUBLIC_API_KEY]
    const {isLoaded, userId, getToken} = useAuth();
    const fetchAuth = async () => userId ? {'Authorization': 'Bearer ' + await getToken({template: "codehooks"})} : {}
    const fullUrl = (url: string): string => `${baseUrl}${url}`
    const applyProps = async (props: any): Promise<any> => ({headers: {"x-apikey": apiKey}, ...props, ...(await fetchAuth())})
    return {
        api: {
            makeUrl(url: string): string {
                return fullUrl(url)
            }, fetchProps(props: any): any {
                return applyProps(props)
            }, fetch(endpoint: string, callback: (res: Response) => void, method: string = "GET"): Promise<void> {
                const fetchCallback = async () => {
                    const res = await fetch(fullUrl(endpoint), await applyProps({method: method}))
                    await callback(res)
                }

                return fetchCallback()
            }
        }, deps: [isLoaded]
    }
}