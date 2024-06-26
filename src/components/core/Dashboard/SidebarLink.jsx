import React from "react";
import { NavLink, matchPath, useLocation } from "react-router-dom";
import * as Icons from "react-icons/vsc";

export default function SidebarLink({ link, iconName }) {
  const Icon = Icons[iconName];
  const location = useLocation();

  const matchRoute = (route) => {
    return matchPath({path:route}, location.pathname);
}

  return (
    <NavLink
      to={link.path}
      className={` relative  px-8 py-2 text-sm font-medium ${
        matchRoute(link.path) ? "bg-yellow-300" : "bg-opacity-0"
      }`}
    >
      <span
        className={`absolute left-0  top-0 h-full w-[0.rem] bg-yellow-300 ${
          matchRoute(link.path) ? "opacity-100" : "opacity-0"
        }`}
      ></span>

      <div className="flex items-center gap-x-2 ">
        <Icon className="text-lg"/>
        <span>{link.name}</span>
      </div>
      
    </NavLink>
  );
}
