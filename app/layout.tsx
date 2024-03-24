'use client';

import { PropsWithChildren } from 'react';
import Head from 'next/head';
import { MainLayout } from '@/components/MainLayout';
import { AuthProvider } from '@/components/AuthProvider';

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <Head>
        <title>Crypto exchange</title>
        <meta name="description" content="The Crypto exchange built with App Router." />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </Head>

      <body>
        <AuthProvider>
          <MainLayout>{children}</MainLayout>
        </AuthProvider>
      </body>
    </html>
  )
}
