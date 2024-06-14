import { Inter } from "next/font/google";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });
import SideHeader from "./invoice/(components)/side-header";
import { ThemeProvider } from "./invoice/(components)/theme-provider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex  h-screen">
            <div className="bg-[#F2F2F2] dark:bg-[#020817]">
              <SideHeader />
            </div>
            <div className="w-full bg-[#F2F2F2] dark:bg-[#020817]">{children}</div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
