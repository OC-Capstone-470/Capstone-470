from google.oauth2 import service_account
from googleapiclient.discovery import build

SCOPES = ['https://www.googleapis.com/auth/calendar']
SERVICE_ACCOUNT_FILE = 'google-calendar-credentials.json'
CALENDAR_ID = 'tofuspark@gmail.com'

def sync_shifts():
    credentials = service_account.Credentials.from_service_account_file(
        SERVICE_ACCOUNT_FILE, scopes=SCOPES)
    service = build('calendar', 'v3', credentials=credentials)

    event = {
        'summary': 'Volunteer Needed - TEST NOW',
        'start': {'dateTime': '2025-12-01T09:00:00', 'timeZone': 'America/Vancouver'},
        'end': {'dateTime': '2025-12-01T12:00:00', 'timeZone': 'America/Vancouver'},
        'description': 'Created by Red Cross app',
    }

    created = service.events().insert(calendarId=CALENDAR_ID, body=event).execute()
    print("EVENT CREATED:", created.get('htmlLink'))

if __name__ == '__main__':
    sync_shifts()