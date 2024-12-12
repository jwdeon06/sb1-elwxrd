import React, { useState } from 'react';
import toast from 'react-hot-toast';

function Calendar() {
  const [events, setEvents] = useState([]);
  const [showEventForm, setShowEventForm] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: new Date().toISOString().split('T')[0],
    time: '12:00'
  });

  const handleAddEvent = (e) => {
    e.preventDefault();
    if (newEvent.title) {
      const dateTime = new Date(`${newEvent.date}T${newEvent.time}`);
      setEvents([...events, { ...newEvent, dateTime }]);
      setShowEventForm(false);
      setNewEvent({
        title: '',
        date: new Date().toISOString().split('T')[0],
        time: '12:00'
      });
      toast.success('Event added successfully');
    }
  };

  return (
    <div>
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-xl font-semibold">Calendar</h2>
        <button
          onClick={() => setShowEventForm(!showEventForm)}
          className="bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600"
        >
          Add Event
        </button>
      </div>

      {showEventForm && (
        <div className="mb-4 p-4 bg-gray-50 rounded-lg">
          <form onSubmit={handleAddEvent} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Event Title</label>
              <input
                type="text"
                value={newEvent.title}
                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Date</label>
                <input
                  type="date"
                  value={newEvent.date}
                  onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Time</label>
                <input
                  type="time"
                  value={newEvent.time}
                  onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                  required
                />
              </div>
            </div>
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => setShowEventForm(false)}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600"
              >
                Add Event
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="space-y-4">
        {events.map((event, index) => (
          <div key={index} className="p-4 bg-white rounded-lg shadow">
            <h3 className="font-semibold">{event.title}</h3>
            <p className="text-sm text-gray-500">
              {new Date(event.dateTime).toLocaleString()}
            </p>
          </div>
        ))}
        {events.length === 0 && (
          <p className="text-center text-gray-500 py-4">No events scheduled</p>
        )}
      </div>
    </div>
  );
}

export default Calendar;