"use client";

import { useRouter } from "next/navigation";
import { MeetingForm } from "@/components/form/MeetingForm";
import { useCreateMeeting } from "@/lib/queries";
import type { MeetingFormData } from "@/lib/validations";

export default function CreateMeetingPage() {
  const router = useRouter();
  const createMeeting = useCreateMeeting();

  const handleSubmit = async (data: MeetingFormData) => {
    try {
      const result = await createMeeting.mutateAsync(data);
      router.push(`/meetings/${result.id}`);
    } catch (error) {
      console.error("Failed to create meeting:", error);
    }
  };

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <MeetingForm
          onSubmit={handleSubmit}
          isLoading={createMeeting.isPending}
        />
      </div>
    </div>
  );
}

