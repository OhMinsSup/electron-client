import React from 'react';

interface ListItemProps {
  meeting: any;
}
const ListItem: React.FC<ListItemProps> = ({ meeting }) => {
  console.log(meeting);
  return (
    <div className="flex p-6" style={{ border: '1px solid black' }}>
      <form className="flex-auto pl-6">
        <div className="flex flex-wrap items-baseline">
          <h1 className="w-full flex-none font-semibold mb-2.5">
            Kids Jumpsuit
          </h1>
          <div className="text-4xl leading-7 font-bold text-gray-600">
            $39.00
          </div>
          <div className="text-sm font-medium text-gray-400 ml-3">In stock</div>
        </div>
        <div className="flex items-baseline my-8">
          <div className="space-x-2 flex text-sm font-medium">????</div>
        </div>
        <div className="flex space-x-3 mb-4 text-sm font-semibold">
          <div className="flex-auto flex space-x-3">
            <button
              className="w-1/2 flex items-center h-9 justify-center rounded-full bg-gray-700 text-white"
              type="submit"
            >
              Buy now
            </button>
            <button
              className="w-1/2 flex items-center h-9 justify-center rounded-full bg-purple-50 text-gray-700"
              type="button"
            >
              Add to bag
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ListItem;
