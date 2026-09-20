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
import { LayoutDashboard, LogIn, LogOut, Search } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { getNameInitials } from '@/lib/utils';
import { useState } from 'react';
import GlobalSearchModal from './global-search-modal';
import { useRouter } from 'next/navigation';

export default function NavBar({
  name,
  userImage,
}: {
  name?: string;
  userImage?: string;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const router = useRouter();
  return (
    <NavigationMenu className="mx-auto my-1 flex w-full max-w-full">
      <div className="container flex w-full justify-center">
        <NavigationMenuList className="flex-wrap">
          <NavigationMenuItem>
            <NavigationMenuLink href="/">Home</NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>

        <NavigationMenuList className="flex-wrap">
          {/* <NavigationMenuItem className="hidden md:block"> */}
          <NavigationMenuItem>
            <div
              className="mr-6 cursor-pointer"
              onClick={() => setIsOpen(true)}
            >
              <Search />
            </div>

            <GlobalSearchModal isOpen={isOpen} setIsOpen={setIsOpen} />
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger>
              <Avatar className="2-8 h-8 rounded-full">
                <AvatarImage
                  src={userImage || '/defaultUser.svg'}
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
              {name ? (
                <NavigationMenuLink
                  className="cursor-pointer"
                  onClick={() => authClient.signOut()}
                >
                  <LogOut />
                  Signout
                </NavigationMenuLink>
              ) : (
                <NavigationMenuLink
                  className="cursor-pointer"
                  onClick={() => router.push('/sign-in')}
                >
                  <LogIn />
                  Sign-in
                </NavigationMenuLink>
              )}
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </div>
    </NavigationMenu>
  );
}
