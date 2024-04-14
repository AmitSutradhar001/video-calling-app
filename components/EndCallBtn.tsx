"use client";

import { useCall, useCallStateHooks } from "@stream-io/video-react-sdk";
import React from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const EndCallBtn = () => {
  const router = useRouter();
  const call = useCall();
  const { useLocalParticipant } = useCallStateHooks();
  const localPerticipant = useLocalParticipant();

  const isMeetingOwner =
    localPerticipant &&
    call?.state.createdBy &&
    localPerticipant.userId == call.state.createdBy.id;

  if (!isMeetingOwner) return null;

  return (
    <Button
      onClick={async () => {
        await call.endCall();
        router.push("/");
      }}
      className="bg-red-500 hover:bg-red-300"
    >
      End Call
    </Button>
  );
};

export default EndCallBtn;
