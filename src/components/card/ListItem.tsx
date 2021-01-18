import React from 'react';
import { ListMeetingModel } from '../../libs/api/model/list-meeting';
// import { ZoomMtg as ZoomMtgType } from '@zoomus/websdk';
import Button from '../common/Button';

// declare const ZoomMtg: typeof ZoomMtgType;

interface ListItemProps {
  meeting: ListMeetingModel;
}
const ListItem: React.FC<ListItemProps> = ({ meeting }) => {
  console.log(meeting);
  return (
    <div className="card col-span-1">
      <div className="card-body">
        <div className="flex justify-between items-center">
          <h5 className="uppercase text-xs tracking-wider font-extrabold">
            {meeting.topic}
          </h5>
          <div className="space-x-2">
            <Button>참여하기</Button>
            <Button>접속하기</Button>
          </div>
        </div>

        <p className="capitalize text-xs text-gray-500">
          <span className="num-2">{meeting.timezone}</span>
        </p>
      </div>
    </div>
  );
};

export default React.memo(ListItem);
