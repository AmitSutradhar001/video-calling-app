// @ts-nocheck

"use client";

import { useToast } from "@/components/ui/use-toast";
import React, { useEffect, useState } from "react";
import MeetingCard from "@/components/MeetingCard";
import Loader from "@/components/Loader";
import { useGetCalls } from "@/hooks/useGetCalls";
import { useRouter } from "next/navigation";
import { CallRecording } from "@stream-io/video-react-sdk";

const Recodings = () => {
  const { callRecordings, isLoading } = useGetCalls();
  const toast = useToast();
  const [recordings, setRecordings] = useState<CallRecording[]>([]);
  const noCallsMessage = "No Recording calls!";
  console.log("line 16 ::", callRecordings);
  const router = useRouter();

  useEffect(() => {
    const fetchRecordings = async () => {
      try {
        const callData = await Promise.all(
          callRecordings?.map((meeting) => meeting.queryRecordings())
        );
        const recordings = callData
          .filter((call) => call.recordings.length > 0)
          .flatMap((call) => call.recordings);
        setRecordings(recordings);
      } catch (error) {
        toast({ title: "Try again later!" });
      }
    };
    fetchRecordings();
  }, [callRecordings]);
  console.log("line 31 ::", recordings);

  if (isLoading) return <Loader />;

  return (
    <section className="flex size-full flex-col gap-6 text-white">
      <h1 className="text-2xl font-bold">Recordings</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 xl:grid-cols-3">
        {recordings && recordings.length > 0 ? (
          recordings.map((meeting: CallRecording) => (
            <MeetingCard
              key={meeting.id}
              icon="/icons/recordings.svg"
              title={
                meeting.state?.custom.description.substring(0, 20) ||
                "No description!"
              }
              date={
                meeting.state?.startsAt.toLocaleString() ||
                meeting.start_time.toLocaleString()
              }
              buttonIcon1="/icons/play.svg"
              handleClick={() => router.push(`${meeting.url}`)}
              link={meeting.url}
              buttonText="Play"
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

export default Recodings;
