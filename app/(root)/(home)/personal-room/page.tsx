"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useGetCallById } from "@/hooks/useGetCallById";

import { useUser } from "@clerk/nextjs";
import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import React from "react";

const Table = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div className="flex flex-col items-start gap-2 lg:flex-row">
      <h1 className="text-base font-medium text-sky-400 md:text-xl lg:min-w-24">
        {title}
      </h1>
      <h1 className="truncate text-sm font-bold max-sm:max-w-[280px] lg:text-xl">
        {description}
      </h1>
    </div>
  );
};

const PersonalRoom = () => {
  const { user } = useUser();
  const { toast } = useToast();
  console.log(user);
  const meetingId = user?.id;
  const meetingLink = `meeting/${meetingId}?personal=true`;
  const client = useStreamVideoClient();
  const router = useRouter();
  const { call } = useGetCallById(meetingId!);
  const startMeeting = async () => {
    if (!client || !user) return;

    if (!call) {
      const newCall = client.call("default", meetingId!);
      await newCall?.getOrCreate({
        data: { starts_at: new Date().toISOString() },
      });
    }
    router.push(`/meeting/${meetingId}?personal=true`); ////
  };

  return (
    <section className="flex size-full flex-col gap-6 text-white">
      <h1 className="text-2xl font-bold">Personal Room</h1>
      <div className="flex flex-col w-full gap-6 lg:max-w-[800px]">
        <Table
          title="Topic"
          description={`${user?.firstName}'s Meeting Room`}
        />
        <Table title="Meeting ID" description={meetingId!} />
        <Table title="Invite Link" description={meetingLink} />
      </div>
      <div className="flex gap-5">
        <Button className="bg-blue-500" onClick={startMeeting}>
          Start Meeting
        </Button>
        <Button
          className="bg-blue-950"
          onClick={() => {
            navigator.clipboard.writeText(meetingLink);
            toast({ title: "Link Copy" });
          }}
        >
          Copy Link
        </Button>
      </div>
    </section>
  );
};

export default PersonalRoom;
