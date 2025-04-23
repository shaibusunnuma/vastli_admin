export enum DateRange {
  TODAY = "today",
  LAST_7_DAYS = "last7d",
  LAST_30_DAYS = "last30d",
  THIS_MONTH = "thisMonth",
  LAST_MONTH = "lastMonth",
  THIS_YEAR = "thisYear",
}

export interface AnalyticsOverview {
  totalReservations: number;
  averagePartySize: number;
  noShowRate: number;
  cancellationRate: number;
}

export interface DailyReservationStats {
    date: Date;
    total: number;
    seated: number;
    cancelled: number;
    noShow: number;
    completed: number;
  }
