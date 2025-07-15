import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import UsersPage from "../page";

describe("UsersPage", () => {
  it("renders a heading", () => {
    render(<UsersPage />);

    const heading = screen.getByRole("heading", { level: 1 });

    expect(heading).toBeInTheDocument();
  });
});

describe("Users page text check", () => {
  it("renders 'Users page' text", () => {
    render(<UsersPage />);

    const text = screen.getByText("Users page");

    expect(text).toBeInTheDocument();
  });
});
