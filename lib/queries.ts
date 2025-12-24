"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "./api";
import {
  mapFormDataToApi,
  mapApiToFormData,
  mapApiToMeeting,
  apiIdToContactMethod,
} from "./api-mappers";
import type { Meeting, MeetingFormData } from "@/types/meeting";

export const useContactMethods = () =>
  useQuery({
    queryKey: ["contact-methods"],
    queryFn: async () => {
      const response = await api.get("/contact-methods");
      const methods = response.data.data || response.data;
      return methods.map((method: { id: number; label: string; icon: string }) => ({
        value: apiIdToContactMethod[method.id] || "phone",
        label: method.label,
        icon: method.icon,
      }));
    },
  });

export const useScheduleTimes = () =>
  useQuery({
    queryKey: ["schedule-times"],
    queryFn: async () => {
      const response = await api.get("/schedule-times");
      const times = response.data.data || response.data;
      return times.map((time: { id: number; label: string }) => ({
        value: time.id.toString(),
        label: time.label,
      }));
    },
  });

export const useCreateMeeting = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: MeetingFormData) => {
      const apiData = mapFormDataToApi(data);
      const response = await api.post("/meetings", apiData);
      const meetingData = response.data.data || response.data;
      return mapApiToMeeting(meetingData);
    },
    onSuccess: (data: Meeting) => {
      queryClient.setQueryData(["meeting", data.id], data);
    },
  });
};

export const useMeeting = (id: string) =>
  useQuery({
    queryKey: ["meeting", id],
    queryFn: async () => {
      const response = await api.get(`/meetings/${id}`);
      const meetingData = response.data.data || response.data;
      return mapApiToMeeting(meetingData);
    },
    enabled: !!id,
  });

export const useUpdateMeeting = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: MeetingFormData) => {
      const apiData = mapFormDataToApi(data);
      const response = await api.put(`/meetings/${id}`, apiData);
      const meetingData = response.data.data || response.data;
      return mapApiToMeeting(meetingData);
    },
    onSuccess: (data: Meeting) => {
      queryClient.setQueryData(["meeting", id], data);
    },
  });
};

