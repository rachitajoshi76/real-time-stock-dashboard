import "../styles/globals.css";
import "../styles/navbar.css";
import "../styles/footer.css";
import "../styles/stockTable.css";
import "../styles/stockChart.css";

import { Provider } from "react-redux";
import store from "../redux/store";

export default function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
