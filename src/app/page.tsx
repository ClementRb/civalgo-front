'use client';

import { useSession } from 'next-auth/react';
import { Role } from '../../graphql/generated/operation';
import { WorkerDashboardPage } from '@/components/dashboard/worker/WorkerDashboard';
import { SupervisorDashboardPage } from '@/components/dashboard/supervisor/SupervisorDashboard';

export default function Home() {
  const { data: session } = useSession();

  if (!session) {
    return;
  }

  if (session.user.role === Role.Worker) {
    return <WorkerDashboardPage user={session.user} />;
  }

  if (session.user.role === Role.Supervisor) {
    return <SupervisorDashboardPage />;
  }
}
