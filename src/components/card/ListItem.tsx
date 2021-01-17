import React from 'react';
import type { MeetingModel } from '../../libs/api/client';

interface ListItemProps {
  meeting: MeetingModel;
}
const ListItem: React.FC<ListItemProps> = ({ meeting }) => {
  console.log(meeting);
  return (
    <div className="card col-span-1">
      <div className="card-body">
        <h5 className="uppercase text-xs tracking-wider font-extrabold">
          today
        </h5>
        <h1 className="capitalize text-lg mt-1 mb-1">
          $<span className="num-3">1083</span>{' '}
          <span className="text-xs tracking-widest font-extrabold">
            {' '}
            / <span className="num-2">40</span> orders
          </span>
        </h1>
        <p className="capitalize text-xs text-gray-500">
          ( $<span className="num-2">23</span> in the last year )
        </p>
      </div>
    </div>
  );
};

export default React.memo(ListItem);
