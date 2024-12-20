import React from 'react';

const ScheduleCard = ({ time, text }) => (
  <div className="bg-red-50 p-3 rounded-lg mb-2">
    <span className="text-sm text-red-500 font-semibold">{time}</span>
    <p className="text-sm text-gray-600">{text}</p>
  </div>
);

function Goal() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md min-h-[200px]">
      <h3 className="text-lg font-semibold">Goals</h3>
      <p className="text-sm text-gray-500 mb-4">Start date - End date</p>
      <ScheduleCard time="01:00" text="Task 1" />
      <ScheduleCard time="10:30" text="Task 2" />
      <ScheduleCard time="10:30" text="Task 3" />
    </div>
  );
}

export default Goal;
