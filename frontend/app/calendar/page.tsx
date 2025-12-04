// frontend/app/calendar/page.tsx
'use client';

import CalendarView from './calendar-components/CalendarView';
import CalendarError from './calendar-components/CalendarError';
import { useGoogleCalendar } from './hooks/useGoogleCalendar';

export default function CalendarPage() {
  const { events, error } = useGoogleCalendar();

  if (error) return <CalendarError message={error} />;
  return <CalendarView events={events} />;
}