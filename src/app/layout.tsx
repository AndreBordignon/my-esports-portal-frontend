import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import { useRouter, useSearchParams } from 'next/navigation';

const inter = Inter({ subsets: ['latin'] });
export const metadata: Metadata = {
  title: 'My e-sports portal',
  description: 'Your data paradise',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-bg`}>
        <Header />
        <div className="pt-16">{children}</div>
      </body>
    </html>
  );
}
