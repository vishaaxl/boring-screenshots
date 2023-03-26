import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import { Poppins } from "next/font/google";
import { Toaster } from "react-hot-toast";

// local
import { defaultTheme } from "@/data/theme";
import { EditorContextProvider } from "@/context/Editor";
import { AuthContextProvider } from "@/context/User";

const defaultFont = Poppins({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <EditorContextProvider>
      <AuthContextProvider>
        <ThemeProvider theme={defaultTheme}>
          <style jsx global>{`
            html {
              font-family: ${defaultFont.style.fontFamily};
            }
          `}</style>
          <Component {...pageProps} />
          <Toaster
            toastOptions={{
              style: {
                fontSize: ".9rem",
                boxShadow: "none",
                background: "#F26520",
                color: "#fdfdfd",
              },
              icon: "👏",
            }}
          />
        </ThemeProvider>
      </AuthContextProvider>
    </EditorContextProvider>
  );
}
