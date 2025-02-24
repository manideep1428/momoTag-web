import './globals.css';
import { Inter } from 'next/font/google';
import { Toaster } from '@/components/ui/toaster';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import { ThemeProvider } from './themeProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Community Posts',
  description: 'A community posting platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`flex gap-2 ${inter.className}`}>
      <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
        <Navbar/>
        {children}
        <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}