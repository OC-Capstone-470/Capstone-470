// frontend/tests/CalendarAuth.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import CalendarPage from '../app/calendar/page';

global.fetch = jest.fn();

const mockCalendarSuccess = () => {
  (global.fetch as jest.Mock).mockResolvedValueOnce({
    ok: true,
    json: async () => ({
      items: [
        {
          id: 'event123',
          summary: 'Test Volunteer Shift',
          start: { dateTime: '2025-12-10T09:00:00-08:00' },
          end: { dateTime: '2025-12-10T13:00:00-08:00' },
        },
      ],
    }),
  });
};

beforeEach(() => {
  localStorage.clear();
  jest.clearAllMocks();
});

describe('Calendar Page - Auth & Google Calendar Integration', () => {
  test('with valid access_token + calendar scope → loads events', async () => {
    mockCalendarSuccess();
    localStorage.setItem('google_access_token', 'valid-token-with-scope');

    render(
      <GoogleOAuthProvider clientId="fake">
        <CalendarPage />
      </GoogleOAuthProvider>
    );

    await waitFor(
      () => {
        const elements = screen.queryAllByText((_, element) => {
          return element?.textContent?.includes('Test Volunteer Shift') ?? false;
        });
        expect(elements.length).toBeGreaterThan(0);
      },
      { timeout: 10000 }  // ← This is the only fix you need
    );
  }, 10000);

  test('missing calendar scope → shows clear error', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 403,
      json: async () => ({
        error: { code: 403, message: 'Request had insufficient authentication scopes.' },
      }),
    });

    localStorage.setItem('google_access_token', 'bad-token');

    render(
      <GoogleOAuthProvider clientId="fake">
        <CalendarPage />
      </GoogleOAuthProvider>
    );

    await waitFor(() => {
      expect(
        screen.getByText('Calendar permission denied – re-login and approve calendar access')
      ).toBeInTheDocument();
    });
  });

  test('no access token → shows login prompt', () => {
    render(
      <GoogleOAuthProvider clientId="fake">
        <CalendarPage />
      </GoogleOAuthProvider>
    );

    expect(screen.getByText(/no access token|please log in again/i)).toBeInTheDocument();
  });
});