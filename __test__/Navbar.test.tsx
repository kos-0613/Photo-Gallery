/**
 * @jest-environment jsdom
 */
import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import Navbar from "../components/Navbar";

describe("入力のテスト", () => {
  it("検索フォームにテキストが入力できるか", () => {
    render(<Navbar />);
    // HTMLElementに型推論されているのでasで型アサーション
    const inputValue = screen.getByTestId("search-input") as HTMLInputElement;
    // ユーザーが入力フォームに"test"と入力する動作をテスト
    userEvent.type(inputValue, "interior");
  });
  it("ボタンクリック", () => {
    render(<Navbar />);
  });
});

describe("表示のテスト", () => {
  it("検索フォームが存在するか", () => {
    render(<Navbar />);
    expect(screen.getByTestId("search-input")).toBeTruthy();
    expect(screen.getByTestId("search-button")).toBeTruthy();
  });
  it("テーマ切り替えボタンが存在するか", () => {
    render(<Navbar />);
    expect(screen.getByTestId("toggle-button")).toBeTruthy();
  });
  it("タイトルが存在するか", () => {
    render(<Navbar />);
    expect(screen.getByText("Kosugelion")).toBeInTheDocument();
  });
});
