'use client';

import UserCheckInForm from '@/components/events/checkin/UserCheckInForm';
import {
  CheckInType,
  EventsByWorkerIdDocument,
  Role,
  useCheckOutMutation,
  useEventsByWorkerIdQuery,
} from '../../../../graphql/generated/operation';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Button, CircularProgress, Typography } from '@mui/material';
import { useMemo } from 'react';

export function WorkerDashboardPage({
  user,
}: {
  user: { name: string; email: string; id: string; role: Role };
}) {
  const { data, loading } = useEventsByWorkerIdQuery({ variables: { workerId: user.id } });

  const [mutate] = useCheckOutMutation();

  const checkout = (siteId: string) => {
    mutate({
      variables: { checkOutEventMutation: { userName: user.name, siteId: siteId } },
      refetchQueries: [EventsByWorkerIdDocument],
    });
  };

  const event = useMemo(() => {
    if (data && data.eventsByWorkerId.length) {
      return data.eventsByWorkerId[0];
    }
    return undefined;
  }, [data]);

  if (loading) {
    return <CircularProgress />;
  }

  if (!event || event.type === CheckInType.CheckOut) {
    return <UserCheckInForm />;
  }

  return (
    <div className="flex flex-1 flex-col gap-4">
      <div className="flex flex-col gap-4 text-center">
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Vous êtes actuellement enregistré sur : {event.site.name}
        </Typography>
        <Typography variant="body1" component="div" sx={{ flexGrow: 1 }}>
          Enregistrement affectué : {format(event.timestamp, 'PPP', { locale: fr })}{' '}
          {format(event.timestamp, 'HH:mm', { locale: fr })}
        </Typography>
      </div>
      <div className="flex justify-center">
        <Button onClick={() => checkout(event.site.id)} variant="contained">
          Check out
        </Button>
      </div>
    </div>
  );
}
