import "styles/globals.css";
import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import { client } from "lib/client";
import { Store, StoreContext } from "lib/store";

const store = new Store(client);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <StoreContext.Provider value={store}>
        <Component {...pageProps} />
      </StoreContext.Provider>
    </ApolloProvider>
  );
}

export default MyApp;
