import MeetingCalendar from '../components/MeetingCalendar/MeetingCalendar';
import { EventInput } from '@fullcalendar/core';

interface Props {
  events: EventInput[];
  setEvents: React.Dispatch<React.SetStateAction<EventInput[]>>;
}

const CalendarPage: React.FC<Props> = ({ events, setEvents }) => {
  return (
    <>
      <h2>Meeting Calendar</h2>
      <MeetingCalendar events={events} setEvents={setEvents} />
    </>
  );
};

export default CalendarPage;
