import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import LoginForm from './LoginForm';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

test('renders login form inputs', () => {
  render(
    <QueryClientProvider client={queryClient}>
      <LoginForm />
    </QueryClientProvider>
  );
  expect(screen.getByLabelText('Username:')).toBeInTheDocument();
  expect(screen.getByLabelText('Password:')).toBeInTheDocument();
});

test('handles login success', async () => {
  render(
    <QueryClientProvider client={queryClient}>
      <LoginForm />
    </QueryClientProvider>
  );
  await act(async () => {
    fireEvent.change(screen.getByLabelText('Username:'), { target: { value: 'test' } });
    fireEvent.change(screen.getByLabelText('Password:'), { target: { value: 'pass' } });
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));
  });
  // Use waitFor to ensure the state update is reflected
  await waitFor(() => {
    expect(screen.getByText('Logged in as admin')).toBeInTheDocument();
  }, { timeout: 1000 }); // Adjust timeout if needed
});
