import type { GlobalProvider } from "@ladle/react";
import React from "react";
import { QueryClientProvider, useQuery, QueryClient } from "react-query";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
    
  },
});

export const Provider: GlobalProvider = ({
  children,
  globalState,
  storyMeta,
}) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);
