"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "./api";
import type { Meeting, MeetingFormData } from "@/types/meeting";

export const useContactMethods = () =>
  useQuery({
    queryKey: ["contact-methods"],
    queryFn: () => api.get("/contact-methods").then((res) => res.data),
  });

export const useScheduleTimes = () =>
  useQuery({
    queryKey: ["schedule-times"],
    queryFn: () => api.get("/schedule-times").then((res) => res.data),
  });

export const useCreateMeeting = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: MeetingFormData) =>
      api.post("/meetings", data).then((res) => res.data),
    onSuccess: (data: Meeting) => {
      queryClient.setQueryData(["meeting", data.id], data);
    },
  });
};

export const useMeeting = (id: string) =>
  useQuery({
    queryKey: ["meeting", id],
    queryFn: () => api.get(`/meetings/${id}`).then((res) => res.data),
    enabled: !!id,
  });

export const useUpdateMeeting = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: MeetingFormData) =>
      api.put(`/meetings/${id}`, data).then((res) => res.data),
    onSuccess: (data: Meeting) => {
      queryClient.setQueryData(["meeting", id], data);
    },
  });
};

