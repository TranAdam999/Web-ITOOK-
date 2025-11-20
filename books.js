// books.js
// =============================
//  DATABASE GIẢ LẬP TOÀN BỘ SÁCH
// =============================

const BOOKS = [
  // ==== Manga / YA / Kids ====
  {
    id: 1,
    title: "One Piece Tập 1",
    subtitle: "Romance Dawn – Khởi đầu huyền thoại",
    author: "Eiichiro Oda",
    price: 45000,
    listPrice: 90000,
    image: "images/onepiece.jpg",
    category: "fiction",
    tags: ["manga", "phiêu lưu"],
    description:
      "Khởi đầu hành trình trở thành Vua Hải Tặc của Luffy – cậu bé cao su với chiếc mũ rơm huyền thoại và ước mơ tìm kiếm kho báu One Piece."
  },

  {
    id: 2,
    title: "Naruto Tập 1",
    subtitle: "Cậu bé ninja tinh nghịch",
    author: "Masashi Kishimoto",
    price: 42000,
    listPrice: 85000,
    image: "images/naruto.jpg",
    category: "ya",
    tags: ["manga", "ninja"],
    description:
      "Câu chuyện về Naruto – cậu bé ninja mồ côi mang trong mình Cửu Vĩ Hồ, luôn cố gắng được công nhận và nuôi ước mơ trở thành Hokage."
  },

  {
    id: 3,
    title: "Doraemon Tập 1",
    subtitle: "Chú mèo máy đến từ tương lai",
    author: "Fujiko F. Fujio",
    price: 35000,
    listPrice: 70000,
    image: "images/doraemon.jpg",
    category: "kids",
    tags: ["thiếu nhi", "hài hước"],
    description:
      "Mèo máy Doraemon từ tương lai quay về giúp Nobita bằng chiếc túi thần kỳ với vô số bảo bối vừa hài hước vừa cảm động."
  },

  {
    id: 4,
    title: "Attack on Titan Tập 1",
    subtitle: "Thế giới sau bức tường thành",
    author: "Hajime Isayama",
    price: 52000,
    listPrice: 99000,
    image: "images/aot.jpg",
    category: "ya",
    tags: ["dark", "hành động"],
    description:
      "Nhân loại sống co cụm sau những bức tường khổng lồ để trốn tránh Titan – các sinh vật ăn thịt người bí ẩn. Ngày bức tường sụp đổ cũng là ngày số phận thay đổi."
  },

  // ==== Fiction / Tiểu thuyết ====
  {
    id: 5,
    title: "Harry Potter và Hòn đá Phù thủy",
    subtitle: "Tập 1 – Hành trình đến Hogwarts",
    author: "J.K. Rowling",
    price: 99000,
    listPrice: 180000,
    image: "images/harrypotter1.jpg",
    category: "fiction",
    tags: ["fantasy", "kinh điển"],
    description:
      "Harry Potter – cậu bé sống sót – lần đầu bước vào thế giới phù thủy nhiệm màu tại Hogwarts, mở ra huyền thoại nhiều thế hệ."
  },

  {
    id: 6,
    title: "Nhà Giả Kim",
    subtitle: "The Alchemist",
    author: "Paulo Coelho",
    price: 79000,
    listPrice: 150000,
    image: "images/nhagiakim.jpg",
    category: "fiction",
    tags: ["truyền cảm hứng"],
    description:
      "Hành trình cậu bé chăn cừu Santiago đi tìm kho báu, đồng thời khám phá giấc mơ, định mệnh và tiếng nói từ trái tim mình."
  },

  // ==== Nonfiction / Kỹ năng / Lịch sử ====
  {
    id: 7,
    title: "Đắc Nhân Tâm",
    subtitle: "How to Win Friends and Influence People",
    author: "Dale Carnegie",
    price: 68000,
    listPrice: 120000,
    image: "images/dacnhantam.jpg",
    category: "nonfiction",
    tags: ["kỹ năng sống", "kinh điển"],
    description:
      "Cuốn sách kinh điển về nghệ thuật giao tiếp, thấu hiểu con người và xây dựng các mối quan hệ bền vững."
  },

  {
    id: 8,
    title: "Sapiens: Lược sử loài người",
    subtitle: "A Brief History of Humankind",
    author: "Yuval Noah Harari",
    price: 145000,
    listPrice: 260000,
    image: "images/sapiens.jpg",
    category: "nonfiction",
    tags: ["lịch sử", "tư duy"],
    description:
      "Hành trình loài người từ Homo sapiens nguyên thủy đến xã hội hiện đại, với góc nhìn rất khác về lịch sử, tôn giáo và tương lai."
  },

  {
    id: 9,
    title: "Tư Duy Nhanh Và Chậm",
    subtitle: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    price: 139000,
    listPrice: 260000,
    image: "images/tuduynhanhcham.jpg",
    category: "nonfiction",
    tags: ["tâm lý", "tư duy"],
    description:
      "Giải thích hai hệ thống tư duy của con người – trực giác nhanh và lý trí chậm – và cách chúng ảnh hưởng đến mọi quyết định hàng ngày."
  },

  // ==== Kids / Thiếu nhi ====
  {
    id: 10,
    title: "Hoàng Tử Bé",
    subtitle: "Le Petit Prince",
    author: "Antoine de Saint-Exupéry",
    price: 49000,
    listPrice: 95000,
    image: "images/hoangtube.jpg",
    category: "kids",
    tags: ["thiếu nhi", "triết lý"],
    description:
      "Câu chuyện cổ tích hiện đại về cậu Hoàng tử Bé đi qua các hành tinh để khám phá ý nghĩa của tình yêu, tình bạn và sự trưởng thành."
  },

  {
    id: 11,
    title: "Diary of a Wimpy Kid",
    subtitle: "Nhật ký chú bé Nhút Nhát",
    author: "Jeff Kinney",
    price: 52000,
    listPrice: 99000,
    image: "images/wimpykid.jpg",
    category: "kids",
    tags: ["hài hước", "nhật ký"],
    description:
      "Nhật ký cực kỳ hài hước của Greg Heffley – cậu bé luôn gặp rắc rối ở trường, gia đình và bạn bè."
  },

  // ==== YA / Dystopia cũ ====
  {
    id: 12,
    title: "The Hunger Games",
    subtitle: "Đấu trường sinh tử",
    author: "Suzanne Collins",
    price: 88000,
    listPrice: 165000,
    image: "images/hungergame.jpg",
    category: "ya",
    tags: ["dystopia", "hành động"],
    description:
      "Katniss bước vào đấu trường nơi chỉ có một người duy nhất được quyền sống sót, thay đổi cả số phận của các quận nghèo."
  },

  // ==============================
  //  CÁC SÁCH MỚI BẠN THÊM
  // ==============================

  // 13. Detective Conan
{
    id: 13,
    title: "Thám Tử Lừng Danh Conan",
    subtitle: "Phiên Bản Tiếng Nhật",
    author: "Aoyama Gosho",
    price: 152000,
    listPrice: 169000,
    image: "images/conan.jpeg", // TODO: đổi sang ảnh Conan
    category: "ya",
    tags: ["trinh thám", "học đường"], 
    description: `Tuyển tập series 5 chương truyện đầy kịch tính tại Naniwa.
  Nhóm Conan đến thưởng thức một vở kịch lấy nguyên mẫu từ chính Heiji và mọi người.
  Tại đây, Heiji đã hạ quyết tâm sẽ thổ lộ tình cảm với Kazuha.
  Địa điểm được chọn chính là "Naniwa Harukas", nơi có thể ngắm nhìn hoàng hôn tuyệt đẹp!!
  Thế nhưng, một vụ án mạng bất ngờ xảy ra, thời khắc giới hạn cho lời tỏ tình đang đến gần...`
  },

  // 14. Dragon Ball Super
  {
    id: 14,
    title: "Dragon Ball Super",
    subtitle: "Dragon Ball Super – Broly (Tái bản 2025)",
    author: "Akira Toriyama",
    price: 114000,
    listPrice: 120000,
    image: "images/dragonballsuper.jpg", // TODO: đổi ảnh DB Super
    category: "ya",
    tags: ["viễn tưởng", "kỳ ảo"],
    description: `DRAGON BALL SUPER: BROLY là câu chuyện diễn ra sau khi Giải Đấu Sức Mạnh do Đấng Zeno chủ trì ngã ngũ. Trở về Trái Đất, Goku và Vegeta lại tiếp tục lao vào tập luyện. Giữa lúc này, Frieza đột ngột xuất hiện cùng với một chiến binh Saiya bị vứt bỏ, tên anh ta là Broly. Broly, Vegeta và Goku vốn là những người Saiya sinh cùng thời nhưng số phận đã đẩy họ rẽ theo ba hướng khác nhau.`
  },

  // 15. Jujutsu Kaisen
  {
    id: 15,
    title: "Chú Thuật Hồi Chiến (Jujutsu Kaisen)",
    subtitle: "Phiên Bản Tiếng Nhật - Tập Cuối",
    author: "Gege Akutami",
    price: 146000,
    listPrice: 163000,
    image: "images/jujutsukaisen_1.jpg", // TODO: đổi ảnh JJK
    category: "ya",
    tags: ["viễn tưởng", "kỳ ảo"],
    description: `Quyết tâm tách Sukuna ra khỏi cơ thể Fushiguro bằng cách tung thuật thức "Giải" vào ranh giới linh hồn, Itadori đã triển khai Lãnh Địa ── Hiệu ứng tất trúng đang dồn ép Sukuna đến cực hạn!! Đâu sẽ là quân bài chủ bài cuối cùng đặt dấu chấm hết cho vòng xoáy nguyền rủa này!? Đón đọc tập cuối cùng cực phẩm với rất nhiều nội dung được tác giả vẽ bổ sung đáng kể!!`
  },


  // 16. Naruto bản tái bản
  {
    id: 16,
    title: "Boruto",
    subtitle: "Boruto và những người bạn  (Tái bản 2025)",
    author: "Masashi Kishimoto",
    price: 28500,
    listPrice: 30000,
    image: "images/boruto_1.jpg",
    category: "ya",
    tags: ["viễn tưởng", "kỳ ảo"],
    description: `Cốt truyện Boruto xoay quanh Boruto Uzumaki, con trai của Naruto, khi cậu muốn trở thành một ninja huyền thoại và đối mặt với nhiều mối đe dọa mới sau sự kiện Naruto. Bộ truyện được chia thành hai phần: phần đầu tập trung vào hành trình của cậu và đội, cùng với sự xuất hiện của tổ chức Kara và dấu ấn Karma trên tay cậu; phần hai, "Two Blue Vortex", lấy bối cảnh nhiều năm sau, với Boruto trở thành mối đe dọa do Momoshiki kiểm soát và Kawaki phong ấn Naruto. `
  },

  // 17. NisekoiCốt truyện Boruto xoay quanh Boruto Uzumaki, con trai của Naruto, khi cậu muốn trở thành một ninja huyền thoại và đối mặt với nhiều mối đe dọa mới sau sự kiện Naruto. Bộ truyện được chia thành hai phần: phần đầu tập trung vào hành trình của cậu và đội, cùng với sự xuất hiện của tổ chức Kara và dấu ấn Karma trên tay cậu; phần hai, "Two Blue Vortex", lấy bối cảnh nhiều năm sau, với Boruto trở thành mối đe dọa do Momoshiki kiểm soát và Kawaki phong ấn Naruto. 
  {
    id: 17,
    title: "Nisekoi",
    subtitle: "Cặp Đôi Giả Tạo - Kiểm Chứng - Tặng Kèm Card PVC",
    author: "Naoshi Komi",
    price: 38000,
    listPrice: 40000,
    image: "images/nisekoi.jpeg",
    category: "ya",
    tags: ["romcom", "kỳ ảo"],
    description: `Cuối cùng, Raku đã có cơ hội được đi riêng với Onodera để mua quà sinh nhật cho Chitoge. Ngắm nhìn Onodera, Raku chợt nhớ lại hình ảnh “cô bé ước hẹn” và buột miệng hỏi về chuyện của 10 năm trước!? Bên cạnh đó, một sự thật chấn động được tiết lộ trong bữa tiệc sinh nhật của Chitoge!?`
  },

  // 18. Masamune Báo Thù
  {
    id: 18,
    title: "Masamune Báo Thù",
    subtitle: "Tặng Kèm Standee Nhựa",
    author: "Hazuki Takeoka, Tiv",
    price: 36000,
    listPrice: 38000,
    image: "images/masamune.jpg",
    category: "ya",
    tags: ["romcom", "kỳ ảo"],
    description: `Makabe Masamune bị Adagaki Aki từ chối tình cảm và đặt cho biệt danh “Giò Heo”. 8 năm sau, cậu quay trở lại thị trấn với mục đích trả thù. Trên đường tới biệt thự của Adagaki để tận hưởng kì nghỉ hè, Masamune đã tuyên bố đang hẹn hò với Aki trước mặt tất cả mọi người. Định bụng tranh thủ kì nghỉ hè trên biển, chơi trò thi gan ở trường học bỏ hoang để thu hẹp khoảng cách, nhưng tất cả đều thất bại.`
  },

  // 19. Genshin Illustration
{
    id: 19,
    title: "Tuyển Tập Tranh Minh Họa Genshin Impact",
    subtitle: "Sách Tranh Genshin Impact (Bản Nhật)",
    author: "Đội Ngũ Dự Án Genshin",
    price: 904000,
    listPrice: 1005000,
    image: "images/genshin2.jpg",
    category: "ya",
    tags: ["game3d", "kỳ ảo"],
    description: `Tập thứ 2 của bộ sưu tập tranh minh họa chính thức (phiên bản tiếng Nhật) với vô vàn hình ảnh tuyệt đẹp từ Genshin Impact!
  
Đây là quyển sách tranh chính thức thứ hai của tựa game nhập vai thế giới mở đình đám toàn cầu "Genshin Impact".
Sách bao gồm gần 200 tác phẩm minh họa tinh xảo, từ tạo hình nhân vật, phác thảo trang phục, hình ảnh quảng bá chính thức cho đến các bức tranh kỷ niệm, giúp bạn tận hưởng trọn vẹn sức hút của các nhân vật và thế giới trong game!`
  },

  // 20. Nhà Có 5 Nàng Dâu
  {
    id: 20,
    title: "Nhà Có 5 Nàng Dâu",
    subtitle: "(Tái bản 2025)",
    author: "Negi Haruba",
    price: 28500,
    listPrice: 30000,
    image: "images/5nangdau.jpeg",
    category: "ya",
    tags: ["romcom", "kỳ ảo"],
    description: `Những trang đầu tiên mở ra một đám cưới, nơi chú rể Futaro đứng chờ cô dâu xinh đẹp bước vào lễ đường. Hai người chuẩn bị làm lễ và nhớ về ngày đầu tiên “họ” gặp nhau…!`
  }
];

// Gắn lên window để script.js, detail.js, cart.js sử dụng
window.BOOKS = BOOKS;
