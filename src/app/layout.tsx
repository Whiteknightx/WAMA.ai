import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'WAMA — Where AI Meets Application',
  description:
    'Where AI Meets Application. Discover, evaluate, and track what AI can actually do for your work, profession, and workflow.',
  openGraph: {
    title: 'WAMA — Where AI Meets Application',
    description:
      'Where AI Meets Application. Discover, evaluate, and track what AI can actually do for your work, profession, and workflow.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
