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
import { LayoutDashboard, LogOut } from 'lucide-react';

export default function NavBar() {
  return (
    <NavigationMenu className="mx-auto my-1 flex w-full max-w-full">
      <div className="container flex w-full justify-between">
        <NavigationMenuList className="flex-wrap">
          <NavigationMenuItem>
            <NavigationMenuLink href="/">Home</NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>

        <NavigationMenuList className="flex-wrap">
          <NavigationMenuItem className="hidden md:block">
            <NavigationMenuTrigger>User</NavigationMenuTrigger>
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
