import { IListening } from "@/interfaces/listening.interface";

export const filterListeningsByDate = (listenings: Array<IListening>) => {
  const currentDate = new Date();
  const oneWeekAgo = new Date(currentDate);
  oneWeekAgo.setDate(currentDate.getDate() - 7)

  return listenings.filter(listening => listening.date >= oneWeekAgo && listening.date <= currentDate);
}