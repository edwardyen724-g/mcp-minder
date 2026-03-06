import React from 'react';
import { Auth0Provider } from '@auth0/auth0-react';
import './globals.css';

const domain = process.env.NEXT_PUBLIC_AUTH0_DOMAIN!;
const clientId = process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID!;

export const metadata = {
  title: 'MCP Minder',
  description: 'Simplify MCP server management and debugging for developers.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Auth0Provider
          domain={domain}
          clientId={clientId}
          redirectUri={window.location.origin}
        >
          {children}
        </Auth0Provider>
      </body>
    </html>
  );
}