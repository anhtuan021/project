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
      totalCost: 8,
      reference: "WED-001",
      customerInfo: {
        name: "Nguyễn Văn A",
        email: "customer@example.com",
        phone: "+84 123 456 789"
      },
      conceptRequirements: "Chụp ảnh cưới phong cách vintage, tông màu ấm. Muốn có những khoảnh khắc tự nhiên và lãng mạn.",
      specialNotes: "Cô dâu có thể bị dị ứng với một số loại hoa. Vui lòng chuẩn bị backup location."
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
      totalCost: 4,
      reference: "POR-002",
      customerInfo: {
        name: "Trần Thị B",
        email: "tran.b@example.com", 
        phone: "+84 987 654 321"
      },
      conceptRequirements: "Chụp ảnh chân dung nghệ thuật, phong cách hiện đại với ánh sáng studio.",
      specialNotes: "Khách hàng muốn có nhiều góc chụp khác nhau và hiệu ứng ánh sáng đẹp."
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
      totalCost: 5,
      reference: "FAM-003",
      customerInfo: {
        name: "Lê Văn C",
        email: "le.c@example.com",
        phone: "+84 555 123 456"
      },
      conceptRequirements: "Chụp ảnh gia đình ngoài trời, tự nhiên và ấm áp trong môi trường công viên.",
      specialNotes: "Có 2 trẻ nhỏ (3 và 5 tuổi), cần kiên nhẫn và có kinh nghiệm chụp ảnh trẻ em."
    },
  ];

  // Only add sample data if no bookings exist
  const existingBookings = localStorage.getItem("userBookings");
  if (!existingBookings || JSON.parse(existingBookings).length === 0) {
    localStorage.setItem("userBookings", JSON.stringify(sampleBookings));
  }

  // Initialize notifications for photographers
  const sampleNotifications = [
    {
      id: 'notif_001',
      photographerId: '1',
      type: 'booking',
      title: 'Booking mới từ Nguyễn Văn A',
      message: 'Yêu cầu chụp ảnh cưới vào ngày 15/02/2024',
      timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(), // 5 minutes ago
      read: false,
      priority: 'high'
    },
    {
      id: 'notif_002',
      photographerId: '1',
      type: 'message',
      title: 'Tin nhắn mới từ Trần Thị B',
      message: 'Câu hỏi về buổi chụp ảnh gia đình',
      timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(), // 15 minutes ago
      read: false,
      priority: 'medium'
    },
    {
      id: 'notif_003',
      photographerId: '1',
      type: 'review',
      title: 'Đánh giá mới 5 sao',
      message: 'Lê Văn C đã đánh giá buổi chụp ảnh chân dung',
      timestamp: new Date(Date.now() - 60 * 60 * 1000).toISOString(), // 1 hour ago
      read: true,
      priority: 'low'
    }
    ];

  // Only add sample notifications if none exist
  const existingNotifications = localStorage.getItem("photographerNotifications");
  if (!existingNotifications || JSON.parse(existingNotifications).length === 0) {
    localStorage.setItem("photographerNotifications", JSON.stringify(sampleNotifications));
  }
};
