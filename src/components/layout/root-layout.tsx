"use client";
import { ReactNode } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { FloatingActions } from "@/components/layout/floating-actions";
import { PageTransition } from "@/components/page-transition";
export const RootLayoutClient = ({ children }: { children: ReactNode }) => {
  return (
    <>
      {" "}
      <Navbar /> <div className="pt-32" />{" "}
      <main className="relative z-10 mx-auto max-w-6xl px-4 pb-16 lg:px-0">
        {" "}
        <PageTransition>{children}</PageTransition>{" "}
      </main>{" "}
      <Footer /> <FloatingActions />{" "}
    </>
  );
};
