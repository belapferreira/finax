import '../globals.css';
import { Inter } from 'next/font/google';

import { Header } from '@/app/components/Header';
import { Footer } from '@/app/components/Footer';

import { Provider } from '@/redux/provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Finax',
  description: 'Maximize finances control and make the most of money',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <div className="flex min-h-screen w-full flex-col bg-gray-900">
            <Header />

            {children}

            <Footer />
          </div>
        </Provider>
      </body>
    </html>
  );
}
