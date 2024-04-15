// @ts-nocheck

"use client";

import MeetingCard from "@/components/MeetingCard";
import Loader from "@/components/Loader";
import { useGetCalls } from "@/hooks/useGetCalls";
import React from "react";
import { useRouter } from "next/navigation";

const Upcoming = () => {
  const { upcomingCalls, isLoading } = useGetCalls();
  console.log("Page upcoming", upcomingCalls);
  const noCallsMessage = "No Upcoming calls!";
  const router = useRouter();

  if (isLoading) return <Loader />;

  return (
    <section className="flex size-full flex-col gap-6 text-white">
      <h1 className="text-2xl font-bold">Upcoming</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 xl:grid-cols-2">
        {upcomingCalls && upcomingCalls.length > 0 ? (
          upcomingCalls.map((meeting: Call) => (
            <MeetingCard
              key={meeting.id}
              icon="/icons/upcoming.svg"
              title={
                meeting.state?.custom.description.substring(0, 20) ||
                "No description!"
              }
              date={meeting.start_time?.toLocaleString()}
              handleClick={() => router.push(`meeting/${meeting.id}`)}
              link={`/meeting/${meeting.id}`} // ${process.env.NEXT_PUBLIC_BASE_URL} may be this will be added
              buttonText="Start"
            />
          ))
        ) : (
          <div className="text-center text-gray-500 text-xl">
            {noCallsMessage}
          </div>
        )}
      </div>
    </section>
  );
};

export default Upcoming;
