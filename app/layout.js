import "./globals.css";
import { Auth0Provider } from "@auth0/nextjs-auth0";

export const metadata = {
  title: "Dashboard",
  description: "Dashboard that lets you customize your widgets with stuff like weather, new and a todo list with more features coming",
  icons: {
    // Keep your icon definitions here
  }
}


export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <body>
        <Auth0Provider> {children}</Auth0Provider>
      </body>
    </html>
  );
}