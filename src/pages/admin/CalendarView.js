import React, { useState, useEffect } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { getIncidents } from '../../utils/incidentStorage';
import { getPatients } from '../../utils/storage';

const locales = {
  'en-US': require('date-fns/locale/en-US'),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const CalendarView = () => {
  const [events, setEvents] = useState([]);
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const incidents = getIncidents();
    const patientsData = getPatients();

    const mappedEvents = incidents.map((incident) => {
      const patient = patientsData.find((p) => p.id === incident.patientId);
      return {
        title: `${incident.title} - ${patient?.name || 'Unknown'}`,
        start: new Date(incident.appointmentDate),
        end: new Date(incident.appointmentDate),
        allDay: false,
      };
    });

    setPatients(patientsData);
    setEvents(mappedEvents);
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen overflow-y-auto">
      <h2 className="text-2xl font-bold mb-4">Appointment Calendar</h2>

      <div className="bg-white p-4 shadow rounded">
        {events.length > 0 ? (
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500 }}
          />
        ) : (
          <p className="text-gray-500 text-sm">No appointments scheduled yet.</p>
        )}
      </div>
    </div>
  );
};

export default CalendarView;
