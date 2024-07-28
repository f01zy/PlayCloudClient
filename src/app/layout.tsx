import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/base.scss";
import { Providers } from "@/components/Providers";
import Layout from "@/components/Layout";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import theme from "@/theme";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Home | PlayCloud",
  description: "Unique web application for listening to a huge amount of music in a unique format",
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <Providers>
              <Layout>
                {children}
              </Layout>
            </Providers>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  )
}