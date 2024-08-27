import { IListening } from "@/interfaces/listening.interface";

export const filterListeningsByDate = (listenings: Array<IListening>) => {
  const currentDate = new Date();

  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(currentDate.getDate() - 7);

  const recentDates = listenings.filter(listening => listening.date >= sevenDaysAgo);

  console.log(recentDates, listenings)

  return recentDates
}