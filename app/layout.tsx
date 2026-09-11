import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './providers';
import { AnnouncementBar } from '@/components/layout/AnnouncementBar';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { MobileBottomBar } from '@/components/layout/MobileBottomBar';

export const metadata: Metadata = {
  metadataBase: new URL('https://jaipurpinkcityrugs.com'),
  title: {
    default: 'JAIPURPINKCITYRUGS | Handcrafted Indian Rugs & Home Décor',
    template: '%s | JAIPURPINKCITYRUGS',
  },
  description:
    'Authentic Indian handmade rugs, tribal kilims, hallway runners, and luxury home décor woven on traditional pit looms in Jaipur, Rajasthan. Worldwide express shipping.',
  keywords: [
    'Jaipur rugs',
    'Indian handmade rugs',
    'Kilim rugs India',
    'handwoven rugs',
    'Jaipur kilim runner',
    'stair runners',
    'custom rugs India',
    'organic jute rugs',
    'Indian wool rugs',
    'Rajasthan handicrafts',
    'Jaipur home decor',
  ],
  authors: [{ name: 'JaipurPinkCityRugs' }],
  creator: 'JaipurPinkCityRugs',
  publisher: 'JaipurPinkCityRugs',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://jaipurpinkcityrugs.com',
    siteName: 'JAIPURPINKCITYRUGS',
    title: 'JAIPURPINKCITYRUGS | Handcrafted Indian Rugs & Home Décor',
    description:
      'Authentic Indian handmade rugs, tribal kilims, and heirloom flatweaves crafted by master artisans in Jaipur, Rajasthan.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'JaipurPinkCityRugs Artisan Weaving Loom',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JAIPURPINKCITYRUGS | Handcrafted Indian Rugs',
    description: 'Timeless Indian craftsmanship woven for modern homes. Worldwide Express Delivery.',
    images: ['https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=1200&q=80'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLdOrg = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'JAIPURPINKCITYRUGS',
  image: 'https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=1200&q=80',
  description: 'Handmade Indian rugs, tribal kilims, and home décor crafted in Jaipur, Rajasthan, India.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Amber Fort Road, Heritage Weavers Enclave',
    addressLocality: 'Jaipur',
    addressRegion: 'Rajasthan',
    postalCode: '302002',
    addressCountry: 'IN',
  },
  priceRange: '$$',
  telephone: '+91-98290-12345',
  url: 'https://jaipurpinkcityrugs.com',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrg) }}
        />
      </head>
      <body className="antialiased flex flex-col min-h-screen bg-cream-50 text-warmbrown-900 pb-16 lg:pb-0">
        <Providers>
          <AnnouncementBar />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <CartDrawer />
          <MobileBottomBar />
        </Providers>
      </body>
    </html>
  );
}
