import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import ModalContainer from "./Modal";

const renderComponent = () =>
  render(
    <ModalContainer
      heading="Modal Heading"
      isOpen={true}
      onDismiss={() => jest.fn}
      buttonText="Close"
    >
      <p>modal data</p>
    </ModalContainer>
  );

describe("<Modal>", () => {
  it("should render", () => {
    renderComponent();
    expect(screen.getByText("modal data")).toBeInTheDocument();
  });

  it("should not be in document", () => {
    renderComponent();
    const modalText = screen.queryByText("modal text");
    expect(modalText).not.toBeInTheDocument();
  });
});
