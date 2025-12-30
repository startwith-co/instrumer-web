import './globals.css';
import CoreProvider from '@/contexts/core-provider';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import type { Metadata } from 'next';
import localFont from 'next/font/local';

dayjs.locale('ko');

const pretendardFont = localFont({
  src: [
    {
      path: './assets/fonts/PretendardVariable.woff2',
    },
  ],
  variable: '--font-pretendard',
  weight: '100 900',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'SME B2B SaaS 마켓플레이스,SOLU',
  description: '기업 고객에게는 더 나은 의사 결정을 지원하며, 밴더에게는 더 나은 기회를 제공합니다.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${pretendardFont.className}`}>
        <CoreProvider>{children}</CoreProvider>
      </body>
    </html>
  );
}
