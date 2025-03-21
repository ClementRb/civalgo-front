'use client';

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useListCheckInUsersQuery } from '../../../../graphql/generated/operation';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

export function SupervisorDashboardPage() {
  const { data } = useListCheckInUsersQuery({ pollInterval: 5000 });

  if (data) {
    return (
      <div className="flex flex-1 flex-col gap-4">
        <div className="flex flex-col gap-4 text-center">
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Liste des employées actuellement enregistré
          </Typography>

          <TableContainer component={Paper}>
            <Table aria-label="Workers table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Nom</TableCell>
                  <TableCell align="center">Email</TableCell>
                  <TableCell align="center">Site</TableCell>
                  <TableCell align="center">Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.listCheckInUsers.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell align="center">{row.name}</TableCell>
                    <TableCell align="center">{row.name}</TableCell>
                    <TableCell align="center">{row.events[0].site.name}</TableCell>
                    <TableCell align="center">
                      {format(row.events[0].timestamp, 'P', { locale: fr })} -
                      {format(row.events[0].timestamp, 'HH:mm', { locale: fr })}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    );
  }
}
