// frontend/__mocks__/@fullcalendar/react.tsx
import React from 'react';

const MockFullCalendar = ({ events }: any) => {
  return (
    <div data-testid="mock-fullcalendar">
      {events?.map((event: any) => (
        <div key={event.id}>{event.title}</div>
      ))}
    </div>
  );
};

export default MockFullCalendar;
