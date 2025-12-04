// frontend/app/calendar/hooks/useGoogleCalendar.ts
'use client';

import { useState, useEffect } from 'react';

export interface CalendarEvent {
  id: string;
  title: string;
  start: string;
  end?: string;
}

export function useGoogleCalendar() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('google_access_token');
    if (!token) {
      setError('No access token – please log out and log in again');
      return;
    }

    fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async (res) => {
        const json = await res.json();
        if (!res.ok) throw json;
        return json;
      })
      .then((data) => {
        const formatted = (data.items || []).map((item: any) => ({
          id: item.id,
          title: item.summary || '(no title)',
          start: item.start.dateTime || item.start.date,
          end: item.end?.dateTime || item.end?.date,
        }));
        setEvents(formatted);
      })
      .catch((err) => {
        if (err.error?.code === 403) {
          setError('Calendar permission denied – re-login and approve calendar access');
        } else if (err.error?.code === 401) {
          setError('Invalid/expired token – please log out and log in again');
        } else {
          setError(`Calendar error: ${err.error?.message || JSON.stringify(err)}`);
        }
      });
  }, []);

  return { events, error };
}
