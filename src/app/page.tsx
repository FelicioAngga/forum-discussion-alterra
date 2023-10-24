"use client";
import Header from "./components/Header";
import AuthWrapper from "./components/AuthWrapper";
import Dashboard from "./dashboard/components/Dashboard";

export default function Home() {
  return (
    <AuthWrapper>
      <main className="min-h-screen bg-[#1E252B]">
        <Dashboard />
      </main>
    </AuthWrapper>
  )
}
