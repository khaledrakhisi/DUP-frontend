import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { render, waitFor } from "@testing-library/react";

import App from "../App";
import store from "../store/store";

const MockApp = () => {
  window.scrollTo = jest.fn();
  return (
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  );
};

const renderComponent = () => render(<MockApp />);
test("if it renders without crashing", async () => {
  const { getByText } = renderComponent();
  await waitFor(() => getByText(/product view/i));

  expect(getByText(/product view/i)).toBeInTheDocument();
});
