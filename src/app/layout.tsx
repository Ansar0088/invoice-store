import { League_Spartan } from "next/font/google";
import "./globals.css";
import SideHeader from "./invoice/(components)/side-header";
import { ThemeProvider } from "./invoice/(components)/theme-provider";
import Head from "next/head";
const Spartan = League_Spartan({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </Head>
      <body className={Spartan.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex h-screen">
            <div className="bg-[#F2F2F2] dark:bg-[#020817]">
              <SideHeader />
            </div>
            <div className="w-full bg-[#F2F2F2] dark:bg-[#020817]">
              {children}
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
