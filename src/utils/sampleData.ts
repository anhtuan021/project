// Sample booking data for photographer dashboard
export const initializeSampleData = () => {
  const sampleBookings = [
    {
      id: "booking_001",
      photographyType: "Wedding Photography",
      photographer: { id: "1", name: "Lily Emily" },
      status: "Confirmed",
      bookingDetails: {
        date: "2024-02-15",
        time: "14:00",
        location: "Saigon Opera House",
        duration: 6,
      },
      totalCost: 800,
      reference: "WED-001",
    },
    {
      id: "booking_002",
      photographyType: "Portrait Session",
      photographer: { id: "1", name: "Lily Emily" },
      status: "Completed",
      bookingDetails: {
        date: "2024-01-20",
        time: "10:00",
        location: "District 1, Ho Chi Minh City",
        duration: 2,
      },
      totalCost: 300,
      reference: "POR-002",
    },
    {
      id: "booking_003",
      photographyType: "Family Photography",
      photographer: { id: "1", name: "Lily Emily" },
      status: "Pending",
      bookingDetails: {
        date: "2024-02-25",
        time: "16:00",
        location: "Landmark 81",
        duration: 3,
      },
      totalCost: 450,
      reference: "FAM-003",
    },
  ];

  // Only add sample data if no bookings exist
  const existingBookings = localStorage.getItem("userBookings");
  if (!existingBookings || JSON.parse(existingBookings).length === 0) {
    localStorage.setItem("userBookings", JSON.stringify(sampleBookings));
  }
};
