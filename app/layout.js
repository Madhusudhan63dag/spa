import "./globals.css";
import CallButtons from '@/components/elements/CallButtons';
import GoogleAnalytics from '@/components/GoogleAnalytics';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <GoogleAnalytics />
      </head>
      <body>
        {children}
        <CallButtons />
      </body>
    </html>
  );
}
