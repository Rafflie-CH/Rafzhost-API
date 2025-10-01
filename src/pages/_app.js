import { ThemeProvider } from "next-themes";
import "@/styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem={true}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
