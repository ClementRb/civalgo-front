'use client';

import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import { signIn, useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Role } from '../../../../graphql/generated/operation';

export function Header() {
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <div className="flex">
            <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
              FullStack CheckIn
            </Typography>
          </div>
          {session ? (
            <div className="flex flex-1 flex-row items-center">
              <div className="flex flex-1 flex-row px-4">
                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                  <Button
                    onClick={() => router.push('/')}
                    sx={{ my: 2, color: 'white', display: 'block' }}>
                    Accueil
                  </Button>
                  {session.user.role === Role.Supervisor && (
                    <Button
                      onClick={() => router.push('/events-history')}
                      sx={{ my: 2, color: 'white', display: 'block' }}>
                      Historique des événements
                    </Button>
                  )}
                </Box>
              </div>
              <div className="flex gap-6">
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  Bonjour {session.user.name}
                </Typography>
                <Button onClick={() => signOut()} variant="contained">
                  Se déconnecter
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex flex-1 justify-end">
              <Button onClick={() => signIn()} variant="contained">
                Se connecter
              </Button>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
