"use client";

import { useState } from "react";

export const useCalendar = (initialDate: Date = new Date()) => {
  const [currentMonth, setCurrentMonth] = useState(initialDate);
  const [selectedDate, setSelectedDate] = useState<Date>(initialDate);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    return days;
  };

  const goToPreviousMonth = () => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(newMonth.getMonth() - 1);
    setCurrentMonth(newMonth);
  };

  const goToNextMonth = () => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(newMonth.getMonth() + 1);
    setCurrentMonth(newMonth);
  };

  const isDateInFuture = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const checkDate = new Date(date);
    checkDate.setHours(0, 0, 0, 0);
    return checkDate >= today;
  };

  const handleDateClick = (date: Date | null) => {
    if (date && isDateInFuture(date)) {
      setSelectedDate(date);
      return true;
    }
    return false;
  };

  const days = getDaysInMonth(currentMonth);

  return {
    currentMonth,
    selectedDate,
    days,
    goToPreviousMonth,
    goToNextMonth,
    handleDateClick,
    isDateInFuture,
    setSelectedDate,
  };
};

