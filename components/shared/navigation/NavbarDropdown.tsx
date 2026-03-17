import { NavbarLinkType } from "./NavbarLink";
import { NavbarLink } from "./NavbarLink";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu } from "lucide-react";

export const NavbarDropdown = ({ links }: { links: NavbarLinkType[] }) => {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Menu className="text-white" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-navbar border-border">
          {links.map((link) => (
            <DropdownMenuItem key={link.target}>
              <NavbarLink
                className="text-white text-lg hover:text-white"
                target={link.target}
                name={link.name}
              />
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
