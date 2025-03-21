'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { Box, Button, Card, CardContent, CardMedia, TextField, Typography } from '@mui/material';
import {
  EventsByWorkerIdDocument,
  useCheckInMutation,
} from '../../../../graphql/generated/operation';

interface CheckInFields {
  userName: string;
  siteId: string;
}

export default function UserCheckInForm() {
  const { register, handleSubmit } = useForm<CheckInFields>();

  const onSubmit: SubmitHandler<CheckInFields> = (data) => {
    mutate({
      variables: { checkInEventMutation: { userName: data.userName, siteId: data.siteId } },
      refetchQueries: [EventsByWorkerIdDocument],
    });
  };

  const [mutate, { error }] = useCheckInMutation();

  if (error) console.log(error);

  return (
    <Card sx={{ display: 'flex' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography variant="subtitle1" component="div" sx={{ color: 'text.secondary' }}>
            Check In
          </Typography>
          <div className="mt-4 flex flex-1 flex-col items-center gap-4">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-1 flex-col gap-4">
                <TextField
                  id="outlined-basic"
                  {...register('userName')}
                  placeholder="Name"
                  label="Name"
                  variant="outlined"
                />
                <TextField
                  id="outlined-basic"
                  {...register('siteId')}
                  label="Site ID"
                  variant="outlined"
                  placeholder="Site ID"
                />
                <Button type="submit" variant="contained">
                  Check in
                </Button>
              </div>
            </form>
          </div>
        </CardContent>
      </Box>
      <div className="flex flex-1 items-center justify-center">
        <CardMedia
          component="img"
          sx={{ width: 150, height: 150 }}
          image="./images/avatar-icon.png"
          alt="Avatar"
        />
      </div>
    </Card>
  );
}
