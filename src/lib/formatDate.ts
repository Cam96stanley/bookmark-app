export const formatDate = (date: string | Date): string => {
    const newDate = new Date(date);
    const formatted = newDate.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
    });
    return formatted;
  };