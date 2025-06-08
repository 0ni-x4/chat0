import { SidebarProvider } from '@/frontend/components/ui/sidebar';
import ChatSidebar from '@/frontend/components/ChatSidebar';
import { Outlet } from 'react-router';
import AuthButton from './components/AuthButton';

export default function ChatLayout() {
  return (
    <SidebarProvider>
      <ChatSidebar />
      <AuthButton />
      <div className="flex-1 relative">
        <Outlet />
      </div>
    </SidebarProvider>
  );
}
