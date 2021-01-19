import React, { HTMLProps, CSSProperties } from 'react';
import { NavLink } from 'react-router-dom';

type PlainNavLinkProps = HTMLProps<HTMLAnchorElement> & {
  to: string;
  activeClassName?: string;
  activeStyle?: CSSProperties;
  exact?: boolean;
};

const PlainNavLink: React.FC<PlainNavLinkProps> = ({
  to,
  activeClassName,
  activeStyle,
  className,
  children,
  onClick,
  exact,
}) => (
  <NavLink
    to={to}
    className={className}
    onClick={onClick}
    activeClassName={activeClassName}
    activeStyle={activeStyle}
    exact={exact}
  >
    {children}
  </NavLink>
);

export default PlainNavLink;