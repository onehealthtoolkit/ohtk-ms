import "styles/globals.css";
import type { AppProps } from "next/app";
import { observer } from "mobx-react";

import { ApolloProvider } from "@apollo/client";
import { client } from "lib/client";
import { Store, StoreContext } from "lib/store";
import { ServicesContext, ServicesProvider } from "lib/services/provider";

const servicesProvider = new ServicesProvider(client);
const store = new Store(servicesProvider);

function MyApp({ Component, pageProps }: AppProps) {
  if (store.initTokenPending) {
    return <div>Loading...</div>;
  }
  return (
    <ApolloProvider client={client}>
      <ServicesContext.Provider value={servicesProvider}>
        <StoreContext.Provider value={store}>
          <Component {...pageProps} />
        </StoreContext.Provider>
      </ServicesContext.Provider>
    </ApolloProvider>
  );
}

export default observer(MyApp);
