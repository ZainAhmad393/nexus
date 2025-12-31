import React, { useState } from 'react';
import { Trash2 } from 'lucide-react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';

type Availability = {
  date: string;
  time: string;
};

type MeetingRequest = {
  id: number;
  title: string;
  person: string;
  date: string;
  time: string;
  status: 'pending' | 'accepted' | 'declined';
};

const timeSlots = [
  '09:00 - 10:00',
  '10:00 - 11:00',
  '11:00 - 12:00',
  '14:00 - 15:00',
  '15:00 - 16:00'
];

const MeetingSchedulerPage: React.FC = () => {
  const [availability, setAvailability] = useState<Availability[]>([]);
  const [requests, setRequests] = useState<MeetingRequest[]>([
    {
      id: 1,
      title: 'Business Discussion',
      person: 'John Doe',
      date: '2026-01-02',
      time: '11:00 - 12:00',
      status: 'pending'
    },
    {
      id: 2,
      title: 'Project Review',
      person: 'Jane Smith',
      date: '2026-01-04',
      time: '15:00 - 16:00',
      status: 'accepted'
    }
  ]);

  const toggleSlot = (date: string, time: string) => {
    const exists = availability.find(
      s => s.date === date && s.time === time
    );

    if (exists) {
      setAvailability(prev =>
        prev.filter(s => !(s.date === date && s.time === time))
      );
    } else {
      setAvailability(prev => [...prev, { date, time }]);
    }
  };

  const confirmedMeetings = requests.filter(r => r.status === 'accepted');

  // Helper: get JS Date object from date string + time slot
  const getEventDate = (date: string, time: string) => {
    const [startStr, endStr] = time.split(' - ');
    const start = new Date(`${date}T${startStr}:00`);
    const end = new Date(`${date}T${endStr}:00`);
    return { start, end };
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      {/* LEFT: FULL CALENDAR */}
      <div className="lg:col-span-2 border rounded p-4">
        <h1 className="text-2xl font-bold mb-4">Meeting Scheduler</h1>

        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
          }}
          selectable={true}
          dateClick={(arg: DateClickArg) => {
            // Toggle first available time slot for simplicity
            const slot = timeSlots[0];
            toggleSlot(arg.dateStr, slot);
          }}
          events={[
            // Confirmed Meetings
            ...confirmedMeetings.map(m => {
              const { start, end } = getEventDate(m.date, m.time);
              return {
                title: m.title,
                start,
                end,
                backgroundColor: '#34d399',
                borderColor: '#059669'
              };
            }),
            // Availability
            ...availability.map(a => {
              const { start, end } = getEventDate(a.date, a.time);
              return {
                title: 'Available',
                start,
                end,
                backgroundColor: '#a7f3d0',
                borderColor: '#10b981'
              };
            })
          ]}
          height={500}
        />
      </div>

      {/* RIGHT PANEL */}
      <div className="space-y-6">

        {/* Availability */}
        <div className="border rounded p-4">
          <h3 className="font-semibold mb-3">Your Availability</h3>
          {availability.length === 0 && (
            <p className="text-sm text-gray-500">No slots added</p>
          )}
          {availability.map((a, i) => (
            <div
              key={i}
              className="flex justify-between items-center p-2 border rounded mb-2"
            >
              <div>
                <p className="text-sm font-medium">Available</p>
                <p className="text-xs text-gray-500">
                  {a.date} • {a.time}
                </p>
              </div>
              <button
                onClick={() =>
                  setAvailability(prev =>
                    prev.filter((_, index) => index !== i)
                  )
                }
              >
                <Trash2 size={16} className="text-red-500" />
              </button>
            </div>
          ))}
        </div>

        {/* Meeting Requests */}
        <div className="border rounded p-4">
          <h3 className="font-semibold mb-3">Meeting Requests</h3>
          {requests.map(req => (
            <div key={req.id} className="border rounded p-3 mb-3">
              <p className="font-medium">{req.title}</p>
              <p className="text-xs text-gray-500">
                {req.person} • {req.date} • {req.time}
              </p>

              {req.status === 'pending' && (
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() =>
                      setRequests(prev =>
                        prev.map(r =>
                          r.id === req.id
                            ? { ...r, status: 'accepted' }
                            : r
                        )
                      )
                    }
                    className="bg-green-500 text-white px-3 py-1 rounded text-sm"
                  >
                    Accept
                  </button>

                  <button
                    onClick={() =>
                      setRequests(prev =>
                        prev.map(r =>
                          r.id === req.id
                            ? { ...r, status: 'declined' }
                            : r
                        )
                      )
                    }
                    className="bg-red-500 text-white px-3 py-1 rounded text-sm"
                  >
                    Decline
                  </button>
                </div>
              )}

              {req.status !== 'pending' && (
                <span
                  className={`text-xs px-2 py-1 rounded mt-2 inline-block
                    ${
                      req.status === 'accepted'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                >
                  {req.status}
                </span>
              )}
            </div>
          ))}
        </div>
        
        {/* Confirmed Meetings */}
        <div className="border rounded p-4">
          <h3 className="font-semibold mb-2">Confirmed Meetings</h3>
          {confirmedMeetings.length === 0 && (
            <p className="text-sm text-gray-500">No confirmed meetings</p>
          )}
          {confirmedMeetings.map(m => (
            <p key={m.id} className="text-sm">
              📅 {m.title} • {m.date}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MeetingSchedulerPage;
