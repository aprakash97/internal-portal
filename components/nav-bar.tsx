'use client';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { authClient } from '@/lib/auth.client';
import { LayoutDashboard, LogOut, Search } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { getNameInitials } from '@/lib/utils';
import { useState } from 'react';
import GlobalSearchModal from './global-search-modal';

export default function NavBar({
  name,
  userImage,
}: {
  name?: string;
  userImage?: string;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <NavigationMenu className="mx-auto my-1 flex w-full max-w-full">
      <div className="container flex w-full justify-center">
        <NavigationMenuList className="flex-wrap">
          <NavigationMenuItem>
            <NavigationMenuLink href="/">Home</NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>

        <NavigationMenuList className="flex-wrap">
          <NavigationMenuItem className="hidden md:block">
            <div
              className="mr-6 cursor-pointer"
              onClick={() => setIsOpen(true)}
            >
              <Search />
            </div>

            <GlobalSearchModal isOpen={isOpen} setIsOpen={setIsOpen}/>
          </NavigationMenuItem>

          <NavigationMenuItem className="hidden md:block">
            <NavigationMenuTrigger>
              <Avatar className="2-8 h-8 rounded-full">
                <AvatarImage
                  src={userImage || '/defaultImage.svg'}
                  className="rounded-full"
                />
                <AvatarFallback>{getNameInitials(name || '')}</AvatarFallback>
              </Avatar>
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <NavigationMenuLink href="/dashboard">
                <LayoutDashboard />
                Dashboard
              </NavigationMenuLink>
              <NavigationMenuLink
                className="cursor-pointer"
                onClick={() => authClient.signOut()}
              >
                <LogOut />
                Signout
              </NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </div>
    </NavigationMenu>
  );
}
