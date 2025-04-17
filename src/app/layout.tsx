import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from 'next-themes';
import HomeNav from './(home)/home/_components/nav';
import { Footer } from './(home)/home/_components/footer';

const geistSans = Geist({
      variable: '--font-geist-sans',
      subsets: ['latin'],
});

const geistMono = Geist_Mono({
      variable: '--font-geist-mono',
      subsets: ['latin'],
});

export const metadata: Metadata = {
      title: 'IC Studio Official Website',
      description: 'IC Studio Official Website',
};

export default function RootLayout({
      children,
}: Readonly<{
      children: React.ReactNode;
}>) {
      return (
            <html lang="zh" suppressHydrationWarning>
                  <body className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden`}>
                        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                              <HomeNav />
                              {children}
                              <Footer />
                        </ThemeProvider>
                  </body>
            </html>
      );
}
