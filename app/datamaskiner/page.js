import { redirect } from 'next/navigation';
import { auth0 } from "../../lib/auth0";
import ComputerManagement from './ComputerManagement';

export default async function Page() {
  const session = await auth0.getSession();
  
  if (!session) {
    redirect('/auth/login'); // Server-side redirect to login
  }
  
  // Authenticated content - render the computer management system
  return <ComputerManagement />;
}