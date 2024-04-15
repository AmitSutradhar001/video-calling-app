"use client";
import MeetingTypeList from "@/components/MeatingTypeList";
import React from "react";
import { useUser } from "@clerk/nextjs";

const Home = () => {
  const now = new Date();
  const time = now.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const date = new Intl.DateTimeFormat("en-IN", { dateStyle: "full" }).format(
    now
  );
  const { user } = useUser();

  return (
    <section className="flex size-full flex-col gap-6 text-white">
      <div className="h-[200px] w-full rounded-md bg-[url('/images/hero-background.png')]">
        <div className="flex h-full flex-col justify-between px-4 lg:p-11 py-7">
          <h2 className="bg-gray-400 max-w-fit rounded-md pl-2 pr-2">
            Enjoy Your Meeting 😉
          </h2>
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold lg:text-3xl">Now - {time}</h1>
            <p className="text-lg font-medium text-blue-500 lg:text-xl">
              {date}
            </p>
          </div>
        </div>
      </div>
      <MeetingTypeList />
    </section>
  );
};

export default Home;
