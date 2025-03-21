'use client';

import {
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

import {
  CheckInType,
  useListEventsQuery,
  useListSitesQuery,
  useListWorkersQuery,
} from '../../../graphql/generated/operation';
import { useMemo, useState } from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

export default function EventHistoryPage() {
  const [site, setSite] = useState<string>();
  const [worker, setWorker] = useState<string>();

  const { data: sitesData } = useListSitesQuery();
  const { data: workersData } = useListWorkersQuery();
  const { data: eventsData, refetch: refetchEvents } = useListEventsQuery({
    variables: { filterEventsInput: { siteId: site, workerId: worker } },
    pollInterval: 5000,
  });

  const selectSite = (event: SelectChangeEvent) => {
    setSite(event.target.value);
  };

  const selectWorker = (event: SelectChangeEvent) => {
    setWorker(event.target.value);
  };

  useMemo(() => {
    refetchEvents();
  }, [site, worker]);

  return (
    <div className="flex flex-1 flex-col gap-4">
      <div className="flex flex-1 flex-row gap-4">
        <div className="flex flex-1 flex-col">
          <FormControl size="small">
            <InputLabel id="select-site-label">Site</InputLabel>
            <Select
              labelId="select-site-label"
              id="select-site"
              value={site}
              label="Site"
              onChange={selectSite}>
              {sitesData?.sites.map((site) => (
                <MenuItem key={site.id} value={site.id}>
                  {site.name}
                </MenuItem>
              ))}
              <MenuItem value={undefined}>Aucun</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="flex flex-1 flex-col">
          <FormControl size="small">
            <InputLabel id="select-worker-label">Worker</InputLabel>
            <Select
              labelId="select-worker-label"
              id="select-worker"
              value={worker}
              label="Site"
              onChange={selectWorker}>
              {workersData?.workers.map((worker) => (
                <MenuItem key={worker.id} value={worker.id}>
                  {worker.name}
                </MenuItem>
              ))}
              <MenuItem value={undefined}>Aucun</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
      <TableContainer sx={{ maxHeight: 600 }} component={Paper}>
        <Table stickyHeader aria-label="Events table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Site</TableCell>
              <TableCell align="center">Date</TableCell>
              <TableCell align="center">Type</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {eventsData?.listEvents.map((row) => (
              <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell align="center">{row.worker.name}</TableCell>
                <TableCell align="center">{row.worker.email}</TableCell>
                <TableCell align="center">{row.site.name}</TableCell>
                <TableCell align="center">
                  {format(row.timestamp, 'P', { locale: fr })} -
                  {format(row.timestamp, 'HH:mm', { locale: fr })}
                </TableCell>
                <TableCell align="center">
                  {row.type === CheckInType.CheckIn ? (
                    <Chip label="Check In" color="success" />
                  ) : (
                    <Chip label="Check Out" color="error" />
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
