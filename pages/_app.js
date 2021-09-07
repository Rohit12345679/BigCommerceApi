import "../styles/globals.css";
import { CommerceProvider } from "@bigcommerce/storefront-data-hooks";

import "bootstrap/dist/css/bootstrap.min.css";
function MyApp({ Component, pageProps }) {
  return (
    <CommerceProvider locale={"en-US"}>
      <Component {...pageProps} />
    </CommerceProvider>
  );
}

export default MyApp;