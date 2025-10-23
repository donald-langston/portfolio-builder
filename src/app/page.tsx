/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { SignIn, SignUp, useAuth } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

const menuItems = [
  {
    title: "Home",
    path: "/",
  },
  {
    title: "About",
    path: "/about",
  },
  {
    title: "Contact",
    path: "/contact",
  },
];

export default function Home() {
  const [openSheet, setOpenSheet] = useState(false);
  const searchParams: any = useSearchParams();
  const formType = searchParams.get("formType");
  const { isSignedIn } = useAuth();

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex justify-between items-center bg-gray-100 px-20 py-5">
        <h1 className="font-bold text-3xl text-primary">Portfolio Builder</h1>
        <div className="flex justify-end gap-5 items-center">
          {menuItems.map((item) => (
            <span key={item.title} className="text-sm font-bold text-gray-600">
              {item.title}
            </span>
          ))}
          {isSignedIn ? (
            <Button>
              <Link href="/account">Go to Account</Link>
            </Button>
          ) : (
            <Button onClick={() => setOpenSheet(true)}>Sign In</Button>
          )}
        </div>
      </div>
      <div className="grid grid-cols-2 mt-10 h-[70vh] px-20">
        <div className="flex flex-col justify-center">
          <div>
            <h1 className="text-4xl font-bold text-primary">
              <b className="text-[#FE4E59]">PORTFOLIO</b> BUILDER
            </h1>
            <p className="text-gray-600 mt-2 text-sm font-semibold">
              Portfolio Builder is a platform that allows you to create your own
              portfolio in minutes. It is easy to use and has a lot of features.
              You can create your own portfolio in minutes. You can add your own
              projects, skills, and experience.
            </p>
          </div>
        </div>
        <div>
          <img
            src="https://img.freepik.com/free-vector/portfolio-concept-illustration_114360-126.jpg"
            alt="hero"
          />
        </div>
      </div>

      {openSheet && (
        <Sheet open={openSheet} onOpenChange={setOpenSheet}>
          <SheetContent className="min-w-[500px] flex justify-center items-center">
            <SheetHeader>
              <SheetTitle></SheetTitle>
            </SheetHeader>
            {formType === "sign-in" ? (
              <SignIn
                routing="hash"
                signUpUrl="/?formType=sign-up"
                fallbackRedirectUrl="/account"
              />
            ) : (
              <SignUp
                routing="hash"
                signInUrl="/?formType=sign-in"
                fallbackRedirectUrl="/account"
              />
            )}
          </SheetContent>
        </Sheet>
      )}
    </div>
  );
}
