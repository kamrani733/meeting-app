"use client";

import { useParams, useRouter } from "next/navigation";
import { MeetingForm } from "@/components/form/MeetingForm";
import { useMeeting, useUpdateMeeting } from "@/lib/queries";
import type { MeetingFormData } from "@/lib/validations";

export default function EditMeetingPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const { data: meeting, isLoading } = useMeeting(id);
  const updateMeeting = useUpdateMeeting(id);

  const handleSubmit = async (data: MeetingFormData) => {
    try {
      await updateMeeting.mutateAsync(data);
      router.push(`/meetings/${id}`);
    } catch (error) {
      console.error("Failed to update meeting:", error);
    }
  };

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
          <button
            onClick={() => router.push("/meetings/create")}
            className="px-6 py-3 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300"
          >
            Create New Meeting
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <MeetingForm
          onSubmit={handleSubmit}
          defaultValues={{
            firstName: meeting.firstName,
            lastName: meeting.lastName,
            email: meeting.email,
            contactMethod: meeting.contactMethod,
            contactValue: meeting.contactValue,
            scheduleDate: meeting.scheduleDate,
            scheduleTime: meeting.scheduleTime,
            purpose: meeting.purpose,
          }}
          isLoading={updateMeeting.isPending}
        />
      </div>
    </div>
  );
}

