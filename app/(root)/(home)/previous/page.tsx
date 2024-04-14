// @ts-nocheck

"use client";

import React from "react";
import Loader from "@/components/Loader";
import { useGetCalls } from "@/hooks/useGetCalls";
import MeetingCard from "@/components/MeetingCard";

const Previous = () => {
  const { endedCalls, isLoading } = useGetCalls();
  console.log("Page endedCalls", endedCalls);
  const noCallsMessage = "No Previous calls!";
  if (isLoading) return <Loader />;

  return (
    <section className="flex size-full flex-col gap-6 text-white">
      <h1 className="text-2xl font-bold">Previous</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 xl:grid-cols-2">
        {endedCalls && endedCalls.length > 0 ? (
          endedCalls.map((meeting: Call) => (
            <MeetingCard
              key={meeting.id}
              icon="/icons/previous.svg"
              title={
                meeting.state?.custom?.description?.substring(0, 20) ||
                "Personal Meeting!"
              }
              date={
                meeting.state?.startsAt.toLocaleString() ||
                meeting.start_time.toLocaleString()
              }
              isPreviousMeeting={true}
              handleClick={() => router.push(`meeting/${meeting.id}`)}
              link={`${process.env.NODE_ENV.NEXT_PUBLIC_BASE_URL}/meeting/${meeting.id}`}
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

export default Previous;
