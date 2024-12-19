
import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

const Calendar = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('/api/scheduling');
        if (response.ok) {
          const data = await response.json();
          const formattedEvents = data.map(event => ({
            title: event.title,
            start: event.startDate,
            end: event.endDate,
          }));
          setEvents(formattedEvents);
        } else {
          console.error('Failed to fetch events');
        }
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="absolute bottom-5 right-4 transform scale-70 z-10" style={{ width: '33.33vw', height: '33.33vh', overflow: 'hidden' }}>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay',
        }}
        events={events}
        selectable={true}
        eventColor="#6366F1"
        eventBackgroundColor="#E0E7FF"
        dayHeaderFormat={{ weekday: 'short' }}
        contentHeight="5"
        editable={true} // Enable calendar events to be editable
        resizable={true} // Enable calendar events to be resizable
        dragScroll={true} // Allow the calendar to be scrolled while dragging an event
        droppable={true} // Enable external draggable elements to be dropped onto the calendar
      />
    </div>
  );
};

export default Calendar;
