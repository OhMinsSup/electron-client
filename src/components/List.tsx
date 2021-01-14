import React from 'react';

interface ListProps {}
const List: React.FC<ListProps> = ({ children }) => (
  <ul className="divide-y divide-gray-100 space-y-5">{children}</ul>
);

export default List;
