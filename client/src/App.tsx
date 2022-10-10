import PhoneBook from "./components/PhoneBook";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
});

function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <PhoneBook />
      </QueryClientProvider>
    </div>
  );
}

export default App;
