import { NavbarLinkType } from "./NavbarLink";
import { NavbarLink } from "./NavbarLink";

export const NavbarLinkList = ({ links }: { links: NavbarLinkType[] }) => {
  return (
    <div className="flex items-center gap-9 px-5">
      {links.map((link) => (
        <NavbarLink
          className="text-white text-lg hover:text-white"
          key={link.target}
          target={link.target}
          name={link.name}
        />
      ))}
    </div>
  );
};
