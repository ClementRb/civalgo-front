'use client';

import UserCheckInForm from '@/components/events/checkin/user-check-in-form';
import {
  CheckInType,
  EventsByWorkerIdDocument,
  Role,
  useCheckOutMutation,
  useEventsByWorkerIdQuery,
} from '../../../../graphql/generated/operation';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Button, Typography } from '@mui/material';

export function WorkerDashboardPage({
  user,
}: {
  user: { name: string; email: string; id: string; role: Role };
}) {
  const { data } = useEventsByWorkerIdQuery({ variables: { workerId: user.id } });

  const [mutate] = useCheckOutMutation();

  const checkout = (siteId: string) => {
    mutate({
      variables: { checkOutEventMutation: { userName: user.name, siteId: siteId } },
      refetchQueries: [EventsByWorkerIdDocument],
    });
  };

  const checkInReturn = <UserCheckInForm />;

  if (!data?.eventsByWorkerId.length) return checkInReturn;

  if (data.eventsByWorkerId[0].type === CheckInType.CheckIn) {
    const event = data.eventsByWorkerId[0];
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
  } else return checkInReturn;
}
