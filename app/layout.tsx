import type { Metadata } from 'next';
import { Archivo, IBM_Plex_Sans, IBM_Plex_Mono } from 'next/font/google';
import '../styles/tokens.css';

const archivo = Archivo({
  subsets: ['latin'],
  variable: '--font-archivo',
  display: 'swap',
  axes: ['wdth'],
});

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-ibm-plex-sans',
  display: 'swap',
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-ibm-plex-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.GITHUB_ACTIONS === 'true'
      ? 'https://zameernagaral.github.io/AeroBMSCE_TASK_REPO'
      : 'https://aerobmsce.bmsce.ac.in'
  ),
  title: 'AeroBMSCE: aircraft and drone team at BMSCE, Bengaluru',
  description:
    'AeroBMSCE builds and flies aircraft and drones at BMS College of Engineering, Bengaluru. 2nd at SAE Aerothon 2025. Partner with us.',
  icons: {
    icon: './icon.svg',
    shortcut: './favicon.ico',
    apple: './icon.svg',
  },
  openGraph: {
    title: 'AeroBMSCE: aircraft and drone team at BMSCE, Bengaluru',
    description:
      'AeroBMSCE builds and flies aircraft and drones at BMS College of Engineering, Bengaluru. 2nd at SAE Aerothon 2025. Partner with us.',
    url: 'https://aerobmsce.bmsce.ac.in',
    siteName: 'AeroBMSCE',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: '/images/og-share.png',
        width: 1200,
        height: 630,
        alt: 'AeroBMSCE: aircraft and drone team at BMS College of Engineering',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AeroBMSCE: aircraft and drone team at BMSCE, Bengaluru',
    description:
      'AeroBMSCE builds and flies aircraft and drones at BMS College of Engineering, Bengaluru. 2nd at SAE Aerothon 2025. Partner with us.',
    images: ['/images/og-share.png'],
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${ibmPlexSans.variable} ${ibmPlexMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
