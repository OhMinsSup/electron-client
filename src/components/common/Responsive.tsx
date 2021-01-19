import React from 'react';

interface ResponsiveProps {}
const Responsive: React.FC<ResponsiveProps> = ({ children }) => (
  <div className="px-4 mx-auto lg:w-1024 md:w-768 w-full">{children}</div>
);

export default Responsive;
