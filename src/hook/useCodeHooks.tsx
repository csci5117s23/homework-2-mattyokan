interface CodehooksEndpoints {
    makeUrl: (url: String) => string,
    fetchProps: (props: any) => any,

    fetch: (endpoint: string, callback: (res: Response) => Promise<void>, method?: string) => Promise<void>
}

export function useCodeHooks(): [CodehooksEndpoints] {
    const baseUrl = process.env.NEXT_PUBLIC_API_ENDPOINT_BASE
    const apiKey = process.env.NEXT_PUBLIC_API_KEY

    const fullUrl = (url: string): string => `${baseUrl}${url}`
    const applyProps = (props: any): any => ({
        headers: {
            "x-apikey": apiKey
        },
        ...props
    })

    return [
        {
            makeUrl(url: string): string {
                return fullUrl(url)
            },
            fetchProps(props: any): any {
                return applyProps(props)
            },
            fetch(endpoint: string, callback: (res: Response) => void, method: string = "GET"): Promise<void> {
                const fetchCallback = async () => {
                    console.log("Calling endpoint ", fullUrl(endpoint))
                    const res = await fetch(fullUrl(endpoint), applyProps({
                        method: method
                    }))
                    await callback(res)
                }

                return fetchCallback()
            }
        }
    ]
}