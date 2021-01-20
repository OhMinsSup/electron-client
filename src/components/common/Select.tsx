/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { Transition } from '@headlessui/react';
import { CheckIcon, SelectIcon } from '../../styles/svg';

const items = [
  {
    index: 0,
    type: 'live',
    title: 'Lives',
  },
  {
    index: 1,
    type: 'scheduled',
    title: 'Schdules',
  },
  {
    index: 2,
    type: 'upcoming',
    title: 'Upcomings',
  },
];

interface SelectItemProps {
  currentType: string;
  index: number;
  title: string;
  type: string;
  // eslint-disable-next-line no-unused-vars
  onClick: (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => void;
}
const SelectItem: React.FC<SelectItemProps> = ({
  title,
  index,
  currentType,
  type,
  onClick,
}) => (
  <li
    onClick={onClick}
    id={`listbox-item-${index}`}
    data-type={type}
    role="option"
    tabIndex={-1}
    aria-selected="false"
    className="text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9"
  >
    <div className="flex items-center">
      <span className="ml-3 block font-normal truncate">{title}</span>
    </div>

    <span className="absolute inset-y-0 right-0 flex items-center pr-4">
      {currentType === type ? (
        <CheckIcon className="h-5 w-5 text-teal-500" />
      ) : (
        <CheckIcon className="h-5 w-5" />
      )}
    </span>
  </li>
);

interface SelectProps {
  listType: string;
  // eslint-disable-next-line no-unused-vars
  onClick: (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => void;
}
const Select: React.FC<SelectProps> = ({ listType, onClick }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    setIsOpen(false);
  }, [listType]);

  return (
    <div className="mt-5 relative">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded="true"
        aria-labelledby="listbox-label"
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-full bg-white border border-gray-600 shadow-md pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
      >
        <span className="flex items-center">
          <span className="ml-3 block truncate">
            {items.find((item) => item.type === listType)?.title}
          </span>
        </span>
        <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <SelectIcon className="h-5 w-5 text-gray-400" />
        </span>
      </button>
      <Transition
        show={isOpen}
        enter="transition ease-out duration-100 transform"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in duration-75 transform"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        {(ref) => (
          <div ref={ref} className="absolute mt-1 w-full bg-white shadow-lg">
            <ul
              role="listbox"
              aria-labelledby="listbox-label"
              className="max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
            >
              {items.map((data) => (
                <SelectItem
                  key={`${data.type}-${data.index}`}
                  currentType={listType}
                  index={data.index}
                  title={data.title}
                  type={data.type}
                  onClick={onClick}
                />
              ))}
            </ul>
          </div>
        )}
      </Transition>
    </div>
  );
};

export default Select;
