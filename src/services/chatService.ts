import axiosClient from "@/lib/axiosClient";

export const chatWithSeller = (emailOpponent: string) =>
  axiosClient.post<{ emailOpponent: string }, unknown>("/conversations", {
    emailOpponent,
  });

export const chatWithBuyer = (emailOpponent: string) =>
  axiosClient.post<{ emailOpponent: string }, unknown>("/conversations", {
    emailOpponent,
  });
