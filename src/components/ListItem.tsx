import React from 'react';
import type { MeetingModel } from '../libs/api/client';

interface ListItemProps {
  meeting: MeetingModel;
}
const ListItem: React.FC<ListItemProps> = ({ meeting }) => {
  console.log(meeting);
  return (
    <div className="flex p-6" style={{ border: '1px solid black' }}>
      <form className="flex-auto pl-6">
        <div className="flex flex-wrap items-baseline mb-5">
          <h1 className="w-full flex-none font-semibold mb-2.5">
            {meeting.start_time}
          </h1>
          <div className="text-4xl leading-7 font-bold text-gray-600">
            {meeting.topic}
          </div>
          <div className="text-sm font-medium text-gray-400 ml-3">
            {meeting.timezone}
          </div>
        </div>
        <div className="flex space-x-3 mb-4 text-sm font-semibold">
          <div className="flex-auto flex space-x-3">
            <button
              className="w-1/2 cursor-pointer flex items-center h-9 justify-center rounded-full bg-gray-700 text-white"
              type="button"
            >
              참여하기
            </button>
            <button
              className="w-1/2 cursor-pointer flex items-center h-9 justify-center rounded-full border border-gray-800 border-solid text-gray-700"
              type="button"
            >
              공유하기
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ListItem;
