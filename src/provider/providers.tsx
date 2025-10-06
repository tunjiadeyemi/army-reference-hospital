import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

let queryClientSingleton: QueryClient | null = null;

function getQueryClient(): QueryClient {
    if (queryClientSingleton) return queryClientSingleton;
    queryClientSingleton = new QueryClient();
    return queryClientSingleton;
}

export default function Providers({ children }: { children: React.ReactNode }) {
    const client = getQueryClient();
    return <QueryClientProvider client={client}>
        {children}
    
        </QueryClientProvider>;
}
