import { NavbarLinkType } from "./NavbarLink";
import { NavbarLinkList } from "./NavbarLinkList";
import { MapPin } from "lucide-react";
import { NavbarDropdown } from "./NavbarDropdown";

interface NavbarProps {
  links: NavbarLinkType[];
}

export const Navbar = ({ links }: NavbarProps) => {
  return (
    <div className="sticky top-0 z-50 w-full flex items-center justify-between px-6 py-2 bg-navbar border-b border-border shadow-sm">
      <div className="flex gap-3 items-center">
        <img
          src="/sitehaus-logo.png"
          alt="Sitehaus Logo"
          className="h-[3.75rem] w-auto rounded-lg"
        />
        <div className="flex flex-col">
          <span className="text-md lg:text-2xl text-background">
            ONE HEALTH CLINICS
          </span>
          <span className="flex text-xs items-center gap-2 text-secondary">
            <MapPin />
            ST. GEORGE, UT
          </span>
        </div>
      </div>
      <div className="hidden sm:block">
        <NavbarLinkList links={links} />
      </div>
      <div className="sm:hidden">
        <NavbarDropdown links={links} />
      </div>
    </div>
  );
};
