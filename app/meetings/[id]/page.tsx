"use client";

import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { useMeeting } from "@/lib/queries";
import { Button } from "@/components/ui/Button";

export default function MeetingSuccessPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const { data: meeting, isLoading } = useMeeting(id);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  if (!meeting) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Meeting not found</p>
          <Button onClick={() => router.push("/meetings/create")}>
            Create New Meeting
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-8">
        <div className="relative flex items-center justify-center py-12">
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `
                linear-gradient(to right, #9ca3af 1px, transparent 1px),
                linear-gradient(to bottom, #9ca3af 1px, transparent 1px)
              `,
              backgroundSize: "20px 20px",
            }}
          />
          
          <div className="relative w-24 h-24 rounded-full flex items-center justify-center" style={{ backgroundColor: "#F4F0FF" }}>
            <Image
              src="/Tick.png"
              alt="Success checkmark"
              width={48}
              height={48}
              className="object-contain"
            />
          </div>
        </div>

        <h2 className="text-2xl font-semibold text-gray-900">Meeting Created</h2>

        <div className="flex gap-4 pt-4">
          <Button
            variant="secondary"
            onClick={() => router.push("/meetings/create")}
            className="flex-1"
          >
            Add New One
          </Button>
          <Button
            variant="purple"
            onClick={() => router.push(`/meetings/${id}/edit`)}
            className="flex-1"
          >
            Edit Meeting
          </Button>
        </div>
      </div>
    </div>
  );
}

