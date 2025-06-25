import "./globals.css";
import CallButtons from '@/components/elements/CallButtons';
import GoogleAnalytics from '@/components/GoogleAnalytics';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
      <meta name="google-site-verification" content="5mB612RvXjxvzSZraIsW7FZsHjri7WZQFaTj0KDm21c" />
        <GoogleAnalytics />
      </head>
      <body>
        {children}
        <CallButtons />
      </body>
    </html>
  );
}
