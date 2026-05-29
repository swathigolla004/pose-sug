import type { Metadata } from 'next';
import { ThemeProvider } from '@/components/ThemeProvider';
import Header from '@/components/Header';
import './globals.css';

export const metadata: Metadata = {
  title: 'InspoSwipe',
  description: 'Discover aesthetic pose ideas with swipeable TikTok-style cards.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <Header />
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
