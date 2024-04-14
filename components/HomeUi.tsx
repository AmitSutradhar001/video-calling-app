"use client";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const HomeUi = () => {
  const router = useRouter();

  return (
    <>
      <nav className="flex border-2 border-white w-full min-w-fit text-white justify-between items-center p-4 bg-slate-700  ">
        <div className="bg-white text-white">image</div>
        <div className="flex justify-between items-center ml-3 mr-3 md:mr-12 gap-4 md:gap-6">
          <Button
            className="bg-pink-400 p-1 hover:bg-pink-600 md:px-6"
            onClick={() => router.push("/")}
          >
            Home
          </Button>
          <Button
            className="md:px-6 bg-pink-400 p-1 hover:bg-pink-600 "
            onClick={() => router.push("/sign-in")}
          >
            SignIn
          </Button>
          <Button
            className="md:px-6 bg-pink-400 p-1 hover:bg-pink-600 "
            onClick={() => router.push("/sign-up")}
          >
            SignUp
          </Button>
        </div>
      </nav>
      <div className="w-full h-screen ">
        <div className=" p-10 flex justify-center items-center ">
          <h1 className="text-4xl font-serif font-semibold text-sky-500">
            Enjoy Your Call !
          </h1>
        </div>
        <div className=" mt-10 text-white flex justify-center gap-14 items-center">
          <Image
            src="/homeImg/img.avif"
            alt="calling"
            width={500}
            height={500}
            className="hidden mt-8 ml-9 sm:block rounded-lg"
          />
          <div className="flex flex-col justify-center items-center font-medium">
            <header>
              <h1 className="text-2xl pb-7">Features</h1>
            </header>
            <div className="flex flex-col gap-3">
              <div>
                <h2 className="p-2">1. High-Quality Video Calls</h2>
                <p>
                  Experience crystal-clear video calls with high-definition
                  resolution.
                </p>
              </div>
              <div>
                <h2 className="p-2">2. Secure Encryption</h2>
                <p>
                  Your calls are encrypted end-to-end to ensure privacy and
                  security.
                </p>
              </div>
              <div>
                <h2 className="p-2">3. Cross-Platform Support</h2>
                <p>
                  Use the app on any device - desktop, tablet, or smartphone,
                  regardless of the operating system.
                </p>
              </div>
              <div>
                <h2 className="p-2">4. Group Video Calls</h2>
                <p>
                  Connect with multiple people simultaneously with group video
                  calling.
                </p>
              </div>
              <div>
                <h2 className="p-2">5. Screen Sharing</h2>
                <p>
                  Share your screen during calls for presentations,
                  collaboration, or troubleshooting.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeUi;
