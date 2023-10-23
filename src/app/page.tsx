"use client";
import { Provider } from "react-redux";
import Header from "./components/Header";
import { store } from '../redux/store';
import AuthWrapper from "./components/AuthWrapper";

export default function Home() {
  return (
    <Provider store={store}>
      <AuthWrapper>
        <main className="min-h-screen bg-[#1E252B]">
          <Header />
        </main>
      </AuthWrapper>
    </Provider>
  )
}
