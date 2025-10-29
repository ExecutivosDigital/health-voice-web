import { ApiContextProvider } from "@/context/ApiContext";
import { SessionProvider } from "@/context/auth";
import moment from "moment";
import "moment/locale/pt-br";
import { CookiesProvider } from "next-client-cookies/server";
import { Poppins } from "next/font/google";
import Script from "next/script";
import { Toaster } from "react-hot-toast";
import "swiper/css";
import "./globals.css";
moment.locale("pt-br");

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: {
    default: "Health Voice",
  },
  icons: {
    icon: "/icon.png",
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className="custom-scrollbar">
      <head>
        <meta name="viewport" />
        <Script id="ms_clarity" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "tucseh4wc5");`}
        </Script>
      </head>
      <body className={`${poppins.variable} bg-neutral-100 text-black`}>
        <Toaster
          containerStyle={{
            bottom: 40,
            left: 20,
            right: 20,
          }}
          position="top-center"
          gutter={10}
          toastOptions={{
            duration: 2000,
          }}
        />
        <CookiesProvider>
          <ApiContextProvider>
            <SessionProvider>{children}</SessionProvider>
          </ApiContextProvider>
        </CookiesProvider>
      </body>
    </html>
  );
}
