import {
  CallControls,
  CallParticipantsList,
  CallStatsButton,
  CallingState,
  PaginatedGridLayout,
  SpeakerLayout,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LayoutList, User } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import EndCallBtn from "./EndCallBtn";
import Loader from "./Loader";

type CallLayoutType = "grid" | "speaker-left" | "speaker-right";

const MeetingRoom = () => {
  const [layout, setlayout] = useState<CallLayoutType>("speaker-left");
  const [showParticipents, setPerticipents] = useState(false);
  const router = useRouter();
  //------------------------------
  const serchParams = useSearchParams();
  // 'personal' => !'personal' => false => !false => true
  // undefine => !undefine => !true => false
  const isPersonalRoom = !!serchParams.get("personal");

  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();

  if (callingState !== CallingState.JOINED) return <Loader />;
  //-----------------------------

  const CallLayout = () => {
    switch (layout) {
      case "grid":
        return <PaginatedGridLayout />;
      case "speaker-right":
        return <SpeakerLayout participantsBarPosition="left" />;
      default:
        return <SpeakerLayout participantsBarPosition="right" />;
    }
  };
  return (
    <section className="relative h-screen w-full overflow-hidden pt-4 text-white">
      <div className="relative flex size-full items-center justify-center">
        <div className="flex size-full max-w-[900px] items-center">
          <CallLayout />
        </div>
        <div
          className={`bg-slate-800 border-2 h-screen border-white p-2 rounded-md  ml-2 ${
            showParticipents ? ` block` : ` hidden`
          }`}
        >
          <CallParticipantsList
            onClose={() => setPerticipents((pre) => !pre)}
          />
        </div>
      </div>
      <div className="fixed bottom-0 flex w-full items-center justify-center gap-3 flex-wrap">
        <CallControls onLeave={() => router.push("/")} />
        <DropdownMenu>
          <div className="flex items-center">
            <DropdownMenuTrigger className="cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]">
              <LayoutList size={20} className="text-white" />
            </DropdownMenuTrigger>
          </div>

          <DropdownMenuContent className="border-dark-1 bg-dark-1 text-white">
            {["grid", "speaker-left", "speaker-right"].map((item, index) => (
              <div key={index}>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() =>
                    setlayout(item.toLocaleLowerCase() as CallLayoutType)
                  }
                >
                  {item}
                </DropdownMenuItem>
              </div>
            ))}
            <DropdownMenuSeparator />
          </DropdownMenuContent>
        </DropdownMenu>
        <CallStatsButton />
        <button onClick={() => setPerticipents((pev) => !pev)}>
          <div className="bg-[#19232d] px-4 py-2 hover:bg-[#4c535b] cursor-pointer rounded-sm">
            <User size={20} className="text-white" />
          </div>
        </button>
        {!isPersonalRoom && <EndCallBtn />}
      </div>
    </section>
  );
};

export default MeetingRoom;
