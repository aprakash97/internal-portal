import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { MenuItem } from '@base-ui/react';
import { Calendar, Home, Save, Search } from 'lucide-react';

const items = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: Home,
  },
  {
    title: 'Posts',
    url: '/posts',
    icon: Search,
  },
  {
    title: 'Categories',
    url: '/categories',
    icon: Calendar,
  },
  {
    title: 'Saved Posts',
    url: '/saved-posts',
    icon: Save,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup />
        <SidebarGroupLabel>Internal Portal</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {items.map((items) => (
              <SidebarMenuItem key={items.title}>
                <SidebarMenuButton render={<a href={items.url} />}>
                  <items.icon /> <span>{items.title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
