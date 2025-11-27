// frontend/app/calendar/page.tsx
'use client';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useEffect, useState } from 'react';

interface Event {
  id: string;
  title: string;
  start: string;
  end?: string;
}

export default function CalendarPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const token = localStorage.getItem('google_access_token');
    if (!token) {
      setError('No access token – please log out and log in again');
      return;
    }

    console.log('Fetching calendar with token (first 50 chars):', token.substring(0, 50) + '...');

    fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then(async (res) => {
        console.log('HTTP Status:', res.status, res.statusText);

        const json = await res.json();  // ← Just use .json() always

        if (!res.ok) {
          console.error('Google Calendar API error response:', json);
          throw json;
        }
        return json;
      })
      .then((data) => {
        console.log('Success! Calendar events received:', data);
        const formatted = (data.items || []).map((item: any) => ({
          id: item.id,
          title: item.summary || '(no title)',
          start: item.start.dateTime || item.start.date,
          end: item.end?.dateTime || item.end?.date,
        }));
        setEvents(formatted);
      })
      .catch((err) => {
        console.error('Final calendar error:', err);

        if (err.error?.code === 403) {
          setError('Calendar permission denied – re-login and approve calendar access');
        } else if (err.error?.code === 401) {
          setError('Invalid/expired token – please log out and log in again');
        } else {
          setError(`Calendar error ${err.error?.code || ''}: ${err.error?.message || JSON.stringify(err)}`);
        }
      });
  }, []);

  if (error) {
    return (
      <div className="p-8 text-center">
        <h1 className="text-3xl font-bold text-red-600 mb-4">Volunteer Shifts</h1>
        <p className="text-red-600 text-lg mb-4">{error}</p>
        <button
          onClick={() => {
            localStorage.clear();
            window.location.href = '/';
          }}
          className="px-6 py-3 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Log out and try again
        </button>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-red-600 mb-6">Volunteer Shifts</h1>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay',
        }}
        events={events}
        height="auto"
      />
    </div>
  );
}

