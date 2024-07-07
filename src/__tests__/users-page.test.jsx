import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import UsersPage from "@/app/users/page";

describe("UsersPage", () => {
  it("renders a heading", () => {
    render(<UsersPage />);

    const heading = screen.getByRole("heading", { level: 1 });

    expect(heading).toBeInTheDocument();
  });
});
