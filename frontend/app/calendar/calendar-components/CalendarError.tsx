// frontend/app/calendar/components/CalendarError.tsx
'use client';

interface Props {
  message: string;
}

export default function CalendarError({ message }: Props) {
  return (
    <div className="p-8 text-center">
      <h1 className="text-3xl font-bold text-red-600 mb-4">Volunteer Shifts</h1>
      <p className="text-red-600 text-lg mb-4">{message}</p>
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
