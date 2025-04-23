import { subDays, startOfMonth, endOfMonth, startOfYear, endOfYear, format } from 'date-fns';

const today = new Date();

export const generateSampleData = (range: string) => {
  let startDate: Date;
  let endDate: Date = today;
  let dateFormat: string;
  let dataPoints: number;

  switch (range) {
    case 'today':
      startDate = today;
      dataPoints = 24; // Hourly data
      dateFormat = 'HH:00';
      break;
    case 'last7d':
      startDate = subDays(today, 6);
      dataPoints = 7; // Daily data
      dateFormat = 'MMM dd';
      break;
    case 'last30d':
      startDate = subDays(today, 29);
      dataPoints = 30; // Daily data
      dateFormat = 'MMM dd';
      break;
    case 'thisMonth':
      startDate = startOfMonth(today);
      endDate = endOfMonth(today);
      dataPoints = endDate.getDate(); // Daily data
      dateFormat = 'MMM dd';
      break;
    case 'lastMonth':
      startDate = startOfMonth(subDays(today, 30));
      endDate = endOfMonth(subDays(today, 30));
      dataPoints = endDate.getDate(); // Daily data
      dateFormat = 'MMM dd';
      break;
    case 'thisYear':
      startDate = startOfYear(today);
      endDate = endOfYear(today);
      dataPoints = 12; // Monthly data
      dateFormat = 'MMM yyyy';
      break;
    default:
      startDate = subDays(today, 6);
      dataPoints = 7;
      dateFormat = 'MMM dd';
  }

  const sampleReservationsData = Array.from({ length: dataPoints }).map((_, i) => {
    const date = new Date(startDate);
    if (range === 'today') {
      date.setHours(i);
    } else if (range === 'thisYear') {
       date.setMonth(i);
    }
     else {
      date.setDate(startDate.getDate() + i);
    }


    const formattedDate = format(date, dateFormat);
    const totalReservations = Math.floor(Math.random() * 100) + 20;
    const seated = Math.floor(totalReservations * (0.8 + Math.random() * 0.15));
    const cancelled = Math.floor(totalReservations * Math.random() * 0.1);
    const noShows = totalReservations - seated - cancelled;

    return {
      date: formattedDate,
      total: totalReservations,
      seated: seated,
      cancelled: cancelled,
      noShows: noShows,
    };
  });

  const sampleGuestData = Array.from({ length: dataPoints }).map((_, i) => {
     const date = new Date(startDate);
    if (range === 'today') {
      date.setHours(i);
    } else if (range === 'thisYear') {
       date.setMonth(i);
    }
     else {
      date.setDate(startDate.getDate() + i);
    }
    const formattedDate = format(date, dateFormat);
    const totalGuests = Math.floor(Math.random() * 200) + 50;
    const returningGuests = Math.floor(totalGuests * (0.3 + Math.random() * 0.4));
    const newGuests = totalGuests - returningGuests;

    return {
      date: formattedDate,
      'New Guests': newGuests,
      'Returning Guests': returningGuests,
    };
  });

   const sampleTableUtilizationData = Array.from({ length: dataPoints }).map((_, i) => {
     const date = new Date(startDate);
    if (range === 'today') {
      date.setHours(i);
    } else if (range === 'thisYear') {
       date.setMonth(i);
    }
     else {
      date.setDate(startDate.getDate() + i);
    }
    const formattedDate = format(date, dateFormat);
    const utilization = parseFloat((Math.random() * (0.9 - 0.4) + 0.4).toFixed(2)); // Utilization between 40% and 90%

    return {
      date: formattedDate,
      'Utilization Rate': utilization,
    };
  });


  // Static sample data for breakdowns (less dependent on date range)
  const sampleReservationSourceData = [
    { name: 'Online Widget', value: 150 },
    { name: 'Phone', value: 80 },
    { name: 'Third-Party', value: 50 },
    { name: 'Walk-in', value: 30 },
  ];

  const samplePartySizeData = [
    { name: '1-2', value: 120 },
    { name: '3-4', value: 150 },
    { name: '5-6', value: 70 },
    { name: '7+', value: 40 },
  ];

  const sampleDayOfWeekData = [
      {name: 'Mon', total: Math.floor(Math.random() * 50) + 20},
      {name: 'Tue', total: Math.floor(Math.random() * 60) + 25},
      {name: 'Wed', total: Math.floor(Math.random() * 70) + 30},
      {name: 'Thu', total: Math.floor(Math.random() * 80) + 40},
      {name: 'Fri', total: Math.floor(Math.random() * 120) + 60},
      {name: 'Sat', total: Math.floor(Math.random() * 150) + 80},
      {name: 'Sun', total: Math.floor(Math.random() * 100) + 50},
  ];


  return {
    sampleReservationsData,
    sampleGuestData,
    sampleTableUtilizationData,
    sampleReservationSourceData,
    samplePartySizeData,
    sampleDayOfWeekData,
  };
};