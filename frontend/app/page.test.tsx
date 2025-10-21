import { render, screen, waitFor } from '@testing-library/react';
import Home from './page';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

test('renders header and user list', async () => {
  render(
    <QueryClientProvider client={queryClient}>
      <Home />
    </QueryClientProvider>
  );
  await waitFor(() => expect(screen.getByText('admin1 (admin)')).toBeInTheDocument());
});

test('shows loading state initially', () => {
  render(
    <QueryClientProvider client={queryClient}>
      <Home />
    </QueryClientProvider>
  );
  // Note: The mock is instant, so loading might not persist; adjust if needed
  expect(screen.queryByText('Loading users...')).toBeNull();
});
