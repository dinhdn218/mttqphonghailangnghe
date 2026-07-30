// Dữ liệu bài viết lấy từ Facebook fanpage MTTQ xã Phong Hải, chờ import vào hệ thống.
// Cách dùng: thêm bài mới vào mảng FB_POSTS bên dưới rồi chạy:
//   npx tsx --env-file=.env scripts/import-fb-posts.ts
// Script tự bỏ qua bài đã có (so theo titleVi) nên chạy lại nhiều lần vẫn an toàn.

export interface FbPostInput {
  titleVi: string;
  // Nội dung thô copy từ Facebook, giữ nguyên xuống dòng — script tự tách đoạn thành <p>.
  contentVi: string;
  categorySlug: string;
  // Ngày đăng gốc trên Facebook, dạng YYYY-MM-DD.
  publishedAt: string;
  excerptVi?: string;
  coverImage?: string;
  featured?: boolean;
}

export const FB_POSTS: FbPostInput[] = [
  {
    titleVi:
      "🇻🇳 TUỔI TRẺ XÃ PHONG HẢI RA QUÂN “NGÀY CHỦ NHẬT XANH” LẦN THỨ III, NĂM 2026 – CHUNG TAY CHỈNH TRANG NGHĨA TRANG LIỆT SĨ 🇻🇳",
    categorySlug: "tin-tuc-su-kien",
    publishedAt: "2026-07-26",
    contentVi: `Hướng tới kỷ niệm 79 năm Ngày Thương binh - Liệt sĩ (27/7/1947 - 27/7/2026), thực hiện Công văn số 555-CV/TĐTN ngày 20/7/2026 của Ban Thường vụ Tỉnh đoàn Lào Cai về việc triển khai đồng loạt "Ngày Chủ nhật xanh" lần thứ III, năm 2026, Đoàn Thanh niên xã Phong Hải đã tổ chức ra quân vệ sinh môi trường, chỉnh trang khuôn viên Nghĩa trang Liệt sĩ trên địa bàn xã.
💚 Chương trình thu hút trên 50 đoàn viên, thanh niên tham gia với tinh thần hăng hái, trách nhiệm và lòng biết ơn sâu sắc đối với các thế hệ cha anh đã anh dũng hy sinh vì độc lập, tự do của Tổ quốc.
Trong buổi ra quân, các đoàn viên, thanh niên đã tích cực thực hiện nhiều phần việc ý nghĩa:
🧹 Quét dọn, thu gom rác thải, phát quang cỏ dại trong khuôn viên nghĩa trang.
🪣 Lau chùi, vệ sinh các phần mộ, bát hương, bia ghi danh liệt sĩ.
🌼 Chỉnh trang cảnh quan, tạo không gian xanh – sạch – đẹp, trang nghiêm và thành kính.
Mỗi nhành cỏ được dọn sạch, mỗi phần mộ được lau chùi, mỗi nén hương được dâng lên không chỉ là việc làm thiết thực mà còn là lời tri ân sâu sắc của thế hệ trẻ hôm nay đối với những người đã ngã xuống vì sự bình yên của quê hương, đất nước.
Hoạt động là dịp để giáo dục truyền thống cách mạng, khơi dậy lòng yêu nước, tinh thần "Uống nước nhớ nguồn", đồng thời lan tỏa hình ảnh đẹp của tuổi trẻ Phong Hải sống trách nhiệm, xung kích, tình nguyện vì cộng đồng.
💙 Trân trọng ghi nhận và biểu dương tinh thần nhiệt huyết của hơn 50 đoàn viên, thanh niên đã tích cực tham gia, góp phần tạo nên một "Ngày Chủ nhật xanh" ý nghĩa, thiết thực và giàu giá trị nhân văn.
Tuổi trẻ Phong Hải – Tiên phong hành động, sống đẹp, sống có ích, tiếp nối truyền thống, dựng xây quê hương! 🇻🇳
#DoanXaPhongHai #NgayChuNhatXanh2026 #DenOnDapNghia #UongNuocNhoNguon #TKT`,
  },
  {
    titleVi: "Phong Hải trao tặng 62 suất quà tri ân gia đình người có công với cách mạng",
    categorySlug: "tin-tuc-su-kien",
    publishedAt: "2026-07-22",
    contentVi: `Hướng tới kỷ niệm 79 năm Ngày Thương binh - Liệt sĩ (27/7/1947 - 27/7/2026), xã Phong Hải (tỉnh Lào Cai) phối hợp với Phòng Cảnh sát giao thông Công an tỉnh Lào Cai và Gia đình Trí tuệ Tình người Lào Cai tổ chức trao tặng 62 suất quà tới các gia đình người có công với cách mạng và thân nhân liệt sĩ, góp phần lan tỏa đạo lý "Uống nước nhớ nguồn", "Đền ơn đáp nghĩa".
Trong không khí trang nghiêm, ấm áp của những ngày tháng Bảy tri ân, Đoàn công tác đã trao 62 suất quà tới các thương binh, bệnh binh, thân nhân liệt sĩ và người có công với cách mạng.
Mỗi phần quà không chỉ mang giá trị vật chất mà còn thể hiện sự quan tâm, sẻ chia và lòng biết ơn sâu sắc của cấp ủy, chính quyền địa phương, lực lượng Công an cùng các tổ chức thiện nguyện đối với những cống hiến, hy sinh to lớn của các thế hệ đi trước vì sự nghiệp đấu tranh giải phóng dân tộc, bảo vệ Tổ quốc.
Tại buổi trao tặng, ông Bùi Quang Hưng, Bí thư Đảng ủy xã Phong Hải bày tỏ lòng tri ân sâu sắc đối với các gia đình chính sách, người có công với cách mạng, ghi nhận những cống hiến, hy sinh to lớn của các thế hệ đi trước vì độc lập, tự do của Tổ quốc.
Bày tỏ lòng tri ân sâu sắc đối với các gia đình chính sách, người có công với cách mạng, ông Bùi Quang Hưng, Bí thư Đảng ủy xã Phong Hải, cho biết, công tác "Đền ơn đáp nghĩa" luôn được địa phương xác định là nhiệm vụ chính trị thường xuyên, đồng thời là trách nhiệm, tình cảm và đạo lý của mỗi cán bộ, đảng viên và nhân dân.
Trong thời gian tới, xã Phong Hải sẽ tiếp tục thực hiện đầy đủ, kịp thời các chế độ, chính sách ưu đãi đối với người có công; tăng cường giáo dục truyền thống cách mạng cho thế hệ trẻ; đồng thời huy động các nguồn lực xã hội để chăm lo tốt hơn đời sống vật chất, tinh thần cho các gia đình chính sách.
62 suất quà nghĩa tình được trao tới các thương binh, bệnh binh, thân nhân liệt sĩ và người có công với cách mạng trên địa bàn xã Phong Hải.
Bí thư Đảng ủy xã Phong Hải cũng gửi lời cảm ơn tới Phòng Cảnh sát giao thông (Công an tỉnh Lào Cai), Gia đình Trí tuệ Tình người Lào Cai cùng các đơn vị, nhà hảo tâm đã đồng hành với địa phương trong các hoạt động an sinh xã hội, góp phần lan tỏa tinh thần nhân ái và củng cố khối đại đoàn kết toàn dân.
Chương trình trao quà tri ân nhân dịp Ngày Thương binh - Liệt sĩ là hoạt động thiết thực, thể hiện đạo lý "Uống nước nhớ nguồn" của dân tộc. Đây không chỉ là dịp bày tỏ lòng biết ơn đối với những người đã cống hiến, hy sinh vì độc lập, tự do của Tổ quốc, mà còn góp phần động viên các gia đình chính sách tiếp tục phát huy truyền thống cách mạng, chung sức cùng cấp ủy, chính quyền và nhân dân xây dựng quê hương Phong Hải ngày càng phát triển.
Nguồn: Duy Trinh - Phan Anh.`,
  },
  {
    titleVi: "📢 THÔNG BÁO QUAN TRỌNG: NHIỀU LUẬT VÀ QUY ĐỊNH MỚI CHÍNH THỨC CÓ HIỆU LỰC TỪ 1/7 📢",
    categorySlug: "tin-tuc-su-kien",
    publishedAt: "2026-07-01",
    contentVi: `Chào bà con nhân dân xã Phong Hải! Để chủ động cập nhật các chính sách mới nhất của Nhà nước liên quan trực tiếp đến quyền lợi và đời sống của chúng ta, Ủy ban MTTQ Việt Nam xã Phong Hải xin gửi đến mọi người những điểm mới đáng chú ý nhất bắt đầu từ ngày hôm nay (1/7):`,
  },
  {
    titleVi: "📢 RA MẮT MÔ HÌNH “BAN CÔNG TÁC MẶT TRẬN, CHI ĐOÀN, CHI HỘI KHÔNG MA TÚY” TẠI THÔN KHỞI KHE",
    categorySlug: "mo-hinh-hay",
    publishedAt: "2026-06-25",
    contentVi: `Chiều ngày 25/6/2026, tại Nhà văn hóa thôn Khởi Khe, Ủy ban Mặt trận Tổ quốc Việt Nam xã Phong Hải đã tổ chức Hội nghị ra mắt mô hình “Ban Công tác Mặt trận, Chi đoàn, Chi hội không ma túy”.
Đến dự và chỉ đạo hội nghị có đồng chí Phạm Văn Viên - Phó Bí thư Thường trực Đảng ủy xã; đồng chí Nguyễn Ngọc Tuấn - Ủy viên Ban Thường vụ Đảng ủy, Trưởng Ban Xây dựng Đảng; đồng chí Đặng Minh Long - Ủy viên Ban Thường vụ Đảng ủy, Chủ tịch Ủy ban MTTQ Việt Nam xã Phong Hải; cùng đại diện Công an xã, Ban Chỉ huy Quân sự xã, các tổ chức chính trị - xã hội, cấp ủy chi bộ, Ban Công tác Mặt trận, các chi hội, chi đoàn và đông đảo Nhân dân thôn Khởi Khe.
Tại hội nghị, Ban Tổ chức đã công bố Quyết định thành lập mô hình “Ban Công tác Mặt trận, Chi đoàn, Chi hội không ma túy” thôn Khởi Khe; thông qua quy chế hoạt động; ra mắt Ban đại diện mô hình và tổ chức ký cam kết thực hiện giữa Ban Công tác Mặt trận và các tổ chức đoàn thể tại thôn.
Phát biểu chỉ đạo tại hội nghị, đồng chí Phạm Văn Viên - Phó Bí thư Thường trực Đảng ủy xã ghi nhận sự chủ động, trách nhiệm của Ban Thường trực Ủy ban MTTQ xã và các tổ chức chính trị - xã hội trong việc triển khai mô hình; đồng thời đề nghị Ban đại diện mô hình phát huy vai trò nòng cốt trong công tác tuyên truyền, vận động Nhân dân nâng cao ý thức phòng, chống ma túy, xây dựng khu dân cư an toàn, lành mạnh, không có tệ nạn ma túy.
Cũng tại hội nghị, lãnh đạo Công an xã đã thông tin về tình hình tội phạm và tệ nạn ma túy, tuyên truyền các quy định của pháp luật, những tác hại của ma túy đối với cá nhân, gia đình và xã hội; qua đó nâng cao nhận thức, trách nhiệm của cán bộ, đoàn viên, hội viên và Nhân dân trong công tác phòng, chống ma túy.
Việc ra mắt mô hình “Ban Công tác Mặt trận, Chi đoàn, Chi hội không ma túy” tại thôn Khởi Khe là hoạt động thiết thực nhằm cụ thể hóa Nghị quyết số 20-NQ/ĐU của Ban Thường vụ Đảng ủy xã Phong Hải về xây dựng “Xã không ma túy” năm 2026, góp phần phát huy sức mạnh khối đại đoàn kết toàn dân tộc, chung tay xây dựng địa bàn an toàn, văn minh và phát triển bền vững.
📸 Một số hình ảnh tại hội nghị.
#MTTQPhongHai #XaKhongMaTuy #PhongChongMaTuy #KhoiKhe #DaiDoanKetToanDanToc`,
  },
  {
    titleVi: "📢 ỦY BAN MTTQ VIỆT NAM XÃ PHONG HẢI PHỐI HỢP TỔ CHỨC HỘI NGHỊ TIẾP XÚC, ĐỐI THOẠI VỚI NHÂN DÂN VỀ CÔNG TÁC GIẢI PHÓNG MẶT BẰNG",
    categorySlug: "tin-tuc-su-kien",
    publishedAt: "2026-06-16",
    contentVi: `Ngày 16/6/2026, tại Nhà văn hóa thôn 2, UBND xã Phong Hải phối hợp với Ủy ban MTTQ Việt Nam xã tổ chức Hội nghị tiếp xúc, đối thoại với các hộ dân liên quan đến công tác giải phóng mặt bằng thực hiện các dự án trên địa bàn xã.
Tại hội nghị, lãnh đạo UBND xã, Ban Quản lý dự án đầu tư xây dựng khu vực Bảo Thắng cùng các cơ quan chuyên môn đã trực tiếp lắng nghe tâm tư, nguyện vọng, ý kiến, kiến nghị của các hộ dân liên quan đến công tác thu hồi đất, bồi thường, hỗ trợ, tái định cư và tiến độ triển khai các dự án.
Với tinh thần dân chủ, cởi mở, thẳng thắn và xây dựng, các ý kiến của Nhân dân đã được tiếp thu, giải đáp và làm rõ ngay tại hội nghị. Đây là hoạt động thiết thực nhằm phát huy quyền làm chủ của Nhân dân, tăng cường sự đồng thuận xã hội, góp phần đẩy nhanh tiến độ triển khai các dự án, phục vụ mục tiêu phát triển kinh tế - xã hội của địa phương.
Ủy ban MTTQ Việt Nam xã Phong Hải sẽ tiếp tục phối hợp chặt chẽ với chính quyền và các cơ quan liên quan, thực hiện tốt vai trò đại diện, bảo vệ quyền và lợi ích hợp pháp, chính đáng của Nhân dân; đồng thời tăng cường công tác tuyên truyền, vận động để tạo sự đồng thuận trong quá trình thực hiện các dự án trên địa bàn.`,
  },
  {
    titleVi: "📢 PHÁT ĐỘNG CUỘC THI TRẮC NGHIỆM TRỰC TUYẾN TÌM HIỂU CHÍNH SÁCH, PHÁP LUẬT VỀ PHÒNG, CHỐNG THAM NHŨNG, LÃNG PHÍ, TIÊU CỰC TỈNH LÀO CAI NĂM 2026",
    categorySlug: "cuoc-van-dong",
    publishedAt: "2026-06-22",
    contentVi: `Nhằm đẩy mạnh tuyên truyền, phổ biến chủ trương, chính sách, pháp luật của Đảng và Nhà nước về công tác phòng, chống tham nhũng, lãng phí, tiêu cực; nâng cao nhận thức, trách nhiệm của cán bộ, đảng viên và Nhân dân trong đấu tranh phòng, chống tham nhũng, lãng phí, tiêu cực, Ban Tuyên giáo và Dân vận Tỉnh ủy Lào Cai tổ chức Cuộc thi trắc nghiệm trực tuyến năm 2026.
⏰ Thời gian cuộc thi: Từ 09h00 ngày 22/6/2026 đến 22h00 ngày 12/7/2026.
📌 Cuộc thi được tổ chức trong 03 đợt, mỗi tuần 01 đợt thi.
👥 Đối tượng tham gia: Cán bộ, đảng viên, công chức, viên chức, lực lượng vũ trang, đoàn viên, hội viên, người lao động và Nhân dân đang sinh sống, công tác, học tập trong và ngoài tỉnh Lào Cai.
💻 Hình thức tham gia: Thi trắc nghiệm trực tuyến trên Hệ thống thi trắc nghiệm trực tuyến Tỉnh ủy Lào Cai tại địa chỉ: http://tuyengiao-tracnghiem.laocai.gov.vn/
📚 Nội dung thi tập trung vào:
✅ Các quy định của Đảng, pháp luật của Nhà nước về phòng, chống tham nhũng, lãng phí, tiêu cực;
✅ Luật Phòng, chống tham nhũng năm 2018 và các quy định sửa đổi, bổ sung;
✅ Các văn bản chỉ đạo của Trung ương, của Tỉnh ủy Lào Cai về phòng, chống tham nhũng, lãng phí, tiêu cực;
✅ Nghị quyết Đại hội đại biểu Đảng bộ tỉnh Lào Cai lần thứ I, nhiệm kỳ 2025–2030; Đề án số 04-ĐA/TU và các văn bản liên quan.
🏆 Cơ cấu giải thưởng hấp dẫn: Mỗi đợt thi có 25 giải cá nhân, gồm: Giải Nhất, Giải Nhì, Giải Ba và Giải Khuyến khích. Kết thúc cuộc thi, Ban Tổ chức trao các giải tập thể cho các cơ quan, đơn vị, địa phương có thành tích xuất sắc trong triển khai, hưởng ứng cuộc thi.
📖 Tài liệu tham khảo cuộc thi được đăng tải công khai trên Hệ thống thi trắc nghiệm trực tuyến Tỉnh ủy Lào Cai và Cổng Thông tin điện tử Ban Tuyên giáo và Dân vận Tỉnh ủy.
Cuộc thi là đợt sinh hoạt chính trị thiết thực, góp phần lan tỏa tinh thần liêm chính, tiết kiệm, kỷ cương; phát huy vai trò, trách nhiệm của cả hệ thống chính trị và Nhân dân trong công tác phòng, chống tham nhũng, lãng phí, tiêu cực.
👉 Kính mời cán bộ, đảng viên, công chức, viên chức, đoàn viên, hội viên, chiến sĩ lực lượng vũ trang, người lao động và các tầng lớp Nhân dân tích cực tìm hiểu, hưởng ứng, tham gia cuộc thi!`,
  },
  {
    titleVi: "🏠 MÁI ẤM NGHĨA TÌNH – TRỌN VẸN NIỀM VUI ĐÓN NGÔI NHÀ MỚI 💝",
    categorySlug: "cuoc-van-dong",
    publishedAt: "2026-06-08",
    contentVi: `Có những niềm vui được đong đếm bằng vật chất, nhưng cũng có những niềm vui được đong đầy bằng tình người. Hôm nay, niềm vui ấy đang hiện hữu rõ nét trên gương mặt của gia đình bà Nguyễn Thị Thu (thôn 3, xã Phong Hải) khi ước mơ về một mái nhà kiên cố, vững chãi đã chính thức trở thành hiện thực!
Thực hiện chủ trương của Thường trực Đảng ủy xã về công tác an sinh xã hội và chương trình hỗ trợ xóa nhà tạm, nhà dột nát năm 2026, vừa qua, Ủy ban MTTQ Việt Nam xã Phong Hải đã phối hợp cùng Ngân hàng Nông nghiệp và Phát triển nông thôn Việt Nam (Agribank) Chi nhánh Bảo Thắng long trọng tổ chức Lễ bàn giao Nhà tình nghĩa cho hộ gia đình bà Nguyễn Thị Thu.
🛠️ Từ sự chung tay của cộng đồng...
Gia đình bà Thu thuộc diện hộ nghèo, có 6 nhân khẩu, điều kiện kinh tế đặc biệt khó khăn, căn nhà cũ đã xuống cấp nghiêm trọng, không bảo đảm an toàn. Trước thực trạng đó, MTTQ xã đã chủ động phối hợp rà soát, lập hồ sơ và kết nối vận động nguồn lực xã hội hóa.
Nhờ sự kết nối trực tiếp của đồng chí Bí thư Đảng ủy xã, Ngân hàng Agribank Chi nhánh Bảo Thắng đã hỗ trợ gia đình số tiền 50 triệu đồng. Cùng với sự đồng hành của con cháu (hỗ trợ 55 triệu đồng), sự giúp đỡ ngày công lao động từ Ban Công tác Mặt trận thôn 3, các tổ chức đoàn thể và bà con lối xóm... Sau hơn 1 tháng thi công (từ 02/5/2026 đến 08/6/2026), ngôi nhà cấp 4 khang trang với diện tích 65m² cùng khuôn viên sân 85,2m² đã hoàn thành đúng tiến độ, đảm bảo kỹ thuật và an toàn. Tổng kinh phí xây dựng công trình là 220 triệu đồng.
✨ Thắp sáng niềm tin, an tâm lạc nghiệp
Ngôi nhà mới kiên cố thay thế căn nhà dột nát cũ không chỉ giúp gia đình bà Thu có nơi che mưa, che nắng an toàn trước mùa mưa bão, mà còn là nguồn động viên tinh thần to lớn, tiếp thêm nghị lực để gia đình yên tâm lao động sản xuất, từng bước vươn lên thoát nghèo bền vững.
Buổi lễ bàn giao diễn ra trong không khí ấm áp, thắm đượm nghĩa tình với sự tham dự và chúc mừng của: Đồng chí Bùi Quang Hưng – Ủy viên BCH Đảng bộ tỉnh Lào Cai, Bí thư Đảng ủy, Chủ tịch HĐND xã. Đồng chí Đặng Minh Long – Ủy viên BTV Đảng ủy, Chủ tịch Ủy ban MTTQ Việt Nam xã. Đồng chí Lê Xuân Cương – Phó Chủ tịch UBND xã. Đồng chí Nguyễn Đình Long – Phó Giám đốc Agribank Chi nhánh Bảo Thắng. Cùng đại diện các ngành, đoàn thể xã, cấp ủy, chính quyền thôn 3 và đông đảo bà con Nhân dân.
Tại buổi lễ, các đồng chí lãnh đạo địa phương, đơn vị tài trợ cùng Công an xã cũng đã trao tặng những phần quà ý nghĩa nhằm hỗ trợ gia đình ổn định cuộc sống sinh hoạt trong ngôi nhà mới.
🙏 Ban Thường trực Ủy ban MTTQ Việt Nam xã Phong Hải xin trân trọng cảm ơn sự quan tâm chỉ đạo sát sao của Thường trực Đảng ủy, HĐND, UBND xã; trân trọng tri ân tấm lòng vàng của ban lãnh đạo và tập thể cán bộ Ngân hàng Agribank Chi nhánh Bảo Thắng; cảm ơn tinh thần đoàn kết, tương thân tương ái của cấp ủy, các đoàn thể và nhân dân thôn 3 đã cùng đồng hành, chung tay làm nên một câu chuyện nhân văn ý nghĩa!
Trong thời gian tới, MTTQ xã Phong Hải sẽ tiếp tục nỗ lực phát huy vai trò cầu nối, khơi dậy các nguồn lực xã hội để chăm lo tốt hơn nữa cho các hộ nghèo, quyết tâm chung tay xóa nhà tạm, nhà dột nát trên địa bàn toàn xã.
#MTTQ_PhongHai #AnSinhXaHoi #NhaTinhNghia #AgribankBaoThang #ChungTayViNguoiNgheo #PhongHai2026`,
  },
  {
    titleVi: "📢 ỦY BAN MTTQ VIỆT NAM XÃ PHONG HẢI LẮNG NGHE Ý KIẾN NHÂN DÂN VỀ PHƯƠNG ÁN SẮP XẾP THÔN NĂM 2026",
    categorySlug: "tin-tuc-su-kien",
    publishedAt: "2026-06-15",
    contentVi: `Thực hiện chủ trương sắp xếp, kiện toàn tổ chức thôn nhằm nâng cao hiệu quả quản lý, đáp ứng yêu cầu phát triển trong giai đoạn mới, UBND xã Phong Hải xây dựng phương án sắp xếp các thôn trên địa bàn xã và tổ chức lấy ý kiến Nhân dân.
Việc sắp xếp thôn được thực hiện với mục tiêu:
✅ Bảo đảm quy mô số hộ gia đình theo quy định của Trung ương và của tỉnh.
✅ Tinh gọn bộ máy, giảm số lượng người hoạt động không chuyên trách ở thôn.
✅ Nâng cao hiệu quả quản lý, tập trung nguồn lực đầu tư phát triển kinh tế - xã hội.
✅ Góp phần nâng cao chất lượng giáo dục, y tế và tăng cường khối đại đoàn kết toàn dân tộc.
Theo phương án dự kiến:
🔹 Số lượng thôn giảm từ 21 thôn xuống còn 18 thôn.
🔹 Số lượng người hoạt động không chuyên trách giảm từ 54 người xuống còn 48 người.
🔹 Thực hiện hợp nhất một số thôn và điều chỉnh địa giới dân cư phù hợp với tình hình thực tế của địa phương.
📝 Ủy ban MTTQ Việt Nam xã Phong Hải trân trọng đề nghị cán bộ, đảng viên và toàn thể Nhân dân nghiên cứu, đóng góp ý kiến đối với phương án sắp xếp thôn năm 2026.
📌 Hình thức góp ý: Gửi ý kiến trực tiếp đến Ủy ban MTTQ Việt Nam xã Phong Hải, hoặc góp ý qua Trang Zalo OA “Ủy ban MTTQ Việt Nam xã Phong Hải” bằng cách quét mã QR trên hình ảnh tuyên truyền.
⏰ Thời gian lấy ý kiến Nhân dân: Từ ngày 15/6/2026 đến ngày 29/6/2026.
Mỗi ý kiến đóng góp của Nhân dân là cơ sở quan trọng để hoàn thiện phương án, bảo đảm sự đồng thuận, thống nhất và phù hợp với nguyện vọng của cộng đồng dân cư.
🤝 Vì sự phát triển của quê hương Phong Hải, kính mong Nhân dân quan tâm, nghiên cứu và tích cực tham gia đóng góp ý kiến!
#MTTQPhongHai #LangNgheDanNoi #SapXepThon2026 #PhatHuyDanChu #DaiDoanKetToanDanToc #PhongHaiPhatTrienBenVung`,
  },
  {
    titleVi: "Phong Hải lấy ý kiến về Đồ án quy hoạch chung, tạo động lực phát triển bền vững",
    categorySlug: "tin-tuc-su-kien",
    publishedAt: "2026-06-09",
    contentVi: `Ngày 9/6, UBND xã Phong Hải (tỉnh Lào Cai) đã tổ chức Hội nghị lấy ý kiến về Đồ án quy hoạch chung xã đến năm 2035, tầm nhìn đến năm 2050.
Theo định hướng, Đồ án quy hoạch chung xã Phong Hải được xây dựng trên quan điểm phát triển bền vững, toàn diện, lấy người dân làm trung tâm và nâng cao chất lượng cuộc sống của Nhân dân làm mục tiêu xuyên suốt.
Quy hoạch sẽ bảo đảm sự gắn kết chặt chẽ giữa phát triển kinh tế - xã hội với xây dựng hạ tầng kỹ thuật, hạ tầng xã hội, bảo vệ môi trường và giữ vững quốc phòng, an ninh.
Hội nghị lấy ý kiến về Đồ án quy hoạch chung xã Phong Hải đến năm 2035, tầm nhìn đến năm 2050. Ảnh: Duy Trinh.
Trong đó, địa phương xác định phát huy hiệu quả các tiềm năng, lợi thế sẵn có thông qua phát triển nông nghiệp đặc sản, nông nghiệp xanh gắn với du lịch sinh thái, du lịch văn hóa, thương mại và dịch vụ.
Hệ thống khu dân cư, trung tâm hành chính, khu sản xuất và hạ tầng giao thông, kỹ thuật sẽ được quy hoạch đồng bộ, tạo sự kết nối thuận lợi giữa các khu vực, thúc đẩy phát triển kinh tế và nâng cao đời sống người dân.
Tại hội nghị, đại diện đơn vị tư vấn đã trình bày tổng quan Đồ án quy hoạch chung thông qua hệ thống bản đồ trực quan, đánh giá hiện trạng và các phương án phát triển đến năm 2035, tầm nhìn đến năm 2050.
Trên cơ sở đó, các đại biểu đã tập trung thảo luận, đóng góp nhiều ý kiến thiết thực liên quan đến quy hoạch sử dụng đất, hạ tầng giao thông, hệ thống lưới điện, đất lâm nghiệp, khu dân cư và các công trình phúc lợi xã hội.
Các ý kiến cơ bản thống nhất với định hướng phát triển của đồ án; đồng thời, đề nghị tiếp tục mở rộng việc lấy ý kiến Nhân dân nhằm bảo đảm tính khách quan, khả thi và tạo sự đồng thuận cao trong quá trình triển khai thực hiện.
Lãnh đạo xã Phong Hải phát biểu tại Hội nghị lấy ý kiến về Đồ án quy hoạch chung xã đến năm 2035, tầm nhìn đến năm 2050. Ảnh: Phan Anh.
Phát biểu kết luận hội nghị, ông Vũ Trung Dũng, Phó Bí thư Đảng ủy, Chủ tịch UBND xã Phong Hải, ghi nhận và đánh giá cao những ý kiến tâm huyết, trách nhiệm của các đại biểu.
Chủ tịch UBND xã Phong Hải khẳng định, các ý kiến đóng góp sẽ được tổng hợp, tiếp thu đầy đủ để hoàn thiện đồ án trước khi trình cấp có thẩm quyền xem xét.
Nhấn mạnh quy hoạch là nền tảng quan trọng cho sự phát triển của địa phương trong nhiều năm tới, Chủ tịch UBND xã yêu cầu các bộ phận chuyên môn tiếp tục phối hợp chặt chẽ với đơn vị tư vấn, đẩy mạnh công tác tuyên truyền, lấy ý kiến Nhân dân công khai, minh bạch, bảo đảm phát huy quyền làm chủ của người dân.
Đồng thời, các đơn vị liên quan cần chủ động phối hợp với cơ quan chức năng để hoàn thiện phương án quy hoạch hệ thống lưới điện, đất lâm nghiệp và hạ tầng kỹ thuật theo hướng đồng bộ, phù hợp với định hướng phát triển chung của địa phương.
Nguồn: Duy Trinh - Phan Anh.`,
  },
  {
    titleVi: "🌿 MTTQ XÃ PHONG HẢI PHÁT HUY VAI TRÒ NÒNG CỐT TRONG TUYÊN TRUYỀN, VẬN ĐỘNG NHÂN DÂN CHUNG TAY BẢO VỆ MÔI TRƯỜNG 🌿",
    categorySlug: "tin-tuc-su-kien",
    publishedAt: "2026-06-05",
    contentVi: `Hưởng ứng Ngày Môi trường thế giới 05/6 và phong trào “Toàn dân chung tay bảo vệ môi trường vì một Việt Nam xanh - sạch - đẹp”, sáng ngày 05/6/2026, Ủy ban MTTQ Việt Nam xã Phong Hải phối hợp với UBND xã tổ chức Lễ ra quân vệ sinh môi trường với sự tham gia của đông đảo cán bộ, hội viên, đoàn viên, lực lượng vũ trang và Nhân dân trên địa bàn.
Dự buổi lễ có đồng chí Bùi Quang Hưng - Ủy viên BCH Đảng bộ tỉnh Lào Cai, Bí thư Đảng ủy, Chủ tịch HĐND xã; đồng chí Phạm Văn Viên - Phó Bí thư Thường trực Đảng ủy cùng các đồng chí lãnh đạo Đảng ủy, HĐND, UBND, Ủy ban MTTQ Việt Nam xã, các tổ chức chính trị - xã hội và Nhân dân địa phương.
Trong những năm qua, Ủy ban MTTQ Việt Nam xã Phong Hải luôn xác định công tác bảo vệ môi trường là một trong những nhiệm vụ trọng tâm, thường xuyên phối hợp với các tổ chức thành viên đẩy mạnh tuyên truyền, vận động đoàn viên, hội viên và các tầng lớp Nhân dân thực hiện các mô hình tự quản về môi trường, thu gom và xử lý rác thải, xây dựng cảnh quan nông thôn sáng - xanh - sạch - đẹp, góp phần nâng cao chất lượng cuộc sống và xây dựng nông thôn mới nâng cao.
Phát biểu tại buổi lễ, đồng chí Bùi Quang Hưng nhấn mạnh vai trò, trách nhiệm của mỗi cán bộ, đảng viên và người dân trong việc bảo vệ môi trường; đồng thời đề nghị MTTQ và các tổ chức đoàn thể tiếp tục phát huy vai trò tuyên truyền, vận động, tập hợp và phát huy sức mạnh khối đại đoàn kết toàn dân tham gia các hoạt động bảo vệ môi trường, ứng phó với biến đổi khí hậu, xây dựng nếp sống văn minh, thân thiện với môi trường.
Ngay sau lễ phát động, các đại biểu cùng Nhân dân đã đồng loạt ra quân tổng vệ sinh môi trường, thu gom và phân loại rác thải, phát quang bụi rậm, khơi thông cống rãnh, làm sạch các tuyến đường giao thông và khu vực công cộng. Không khí ra quân sôi nổi, trách nhiệm đã thể hiện tinh thần đoàn kết, sự đồng lòng của cán bộ và Nhân dân trong việc chung tay bảo vệ môi trường sống.
Thông qua hoạt động ý nghĩa này, Ủy ban MTTQ Việt Nam xã Phong Hải tiếp tục lan tỏa thông điệp “Mỗi người dân là một tuyên truyền viên, mỗi gia đình là một điểm sáng trong bảo vệ môi trường”, góp phần xây dựng quê hương Phong Hải ngày càng xanh - sạch - đẹp, văn minh và phát triển bền vững.
#MTTQPhongHai #ToanDanBaoVeMoiTruong #DaiDoanKetToanDanToc #PhongHaiXanhSachDep #NgayMoiTruongTheGioi2026`,
  },
  {
    titleVi: "Phong Hải ra mắt Tổ hội nghề nghiệp chè Bát Tiên, giải ngân 1 tỷ đồng hỗ trợ nông dân",
    categorySlug: "tin-tuc-su-kien",
    publishedAt: "2026-05-28",
    contentVi: `Hội Nông dân tỉnh Lào Cai vừa phối hợp với Hội Nông dân xã Phong Hải tổ chức ra mắt Tổ Hội nông dân nghề nghiệp trồng và chăm sóc chè Bát Tiên; đồng thời giải ngân 1 tỷ đồng từ Quỹ Hỗ trợ nông dân tỉnh cho 10 hộ hội viên, góp phần thúc đẩy liên kết sản xuất, phát triển thương hiệu chè địa phương theo hướng bền vững.
Việc thành lập Tổ Hội nông dân nghề nghiệp trồng và chăm sóc chè Bát Tiên được xem là bước đi quan trọng trong định hướng phát triển nông nghiệp theo hướng liên kết, chuyên sâu và bền vững của xã Phong Hải.
Tổ hội tập hợp các hội viên cùng ngành nghề để hỗ trợ nhau về kỹ thuật, kinh nghiệm sản xuất, nguồn lực và định hướng tiêu thụ sản phẩm, từ đó nâng cao năng suất, chất lượng chè, tạo việc làm và tăng thu nhập cho người dân.
Lãnh đạo Hội Nông dân tỉnh Lào Cai và xã Phong Hải trao Quyết định ra mắt Tổ Hội nông dân nghề nghiệp trồng và chăm sóc chè Bát Tiên thôn Ải Nam. Ảnh: Duy Trinh.
Tại chương trình, Hội Nông dân xã đã công bố Quyết định thành lập Tổ Hội nông dân nghề nghiệp; chỉ định Ban Chấp hành, Tổ trưởng và Tổ phó của tổ hội. Đại diện các thành viên bày tỏ sự phấn khởi trước sự quan tâm của Hội Nông dân tỉnh và cấp ủy, chính quyền địa phương; đồng thời, cam kết sử dụng hiệu quả nguồn vốn hỗ trợ, tích cực ứng dụng khoa học kỹ thuật vào sản xuất nhằm nâng cao giá trị thương hiệu chè Bát Tiên.
Ông Bùi Quang Hưng - Ủy viên BCH Đảng bộ tỉnh, Bí thư Đảng ủy Phong Hải, cho biết, việc thành lập tổ hội có ý nghĩa quan trọng trong phát triển kinh tế nông nghiệp của địa phương, là tiền đề để xây dựng vùng chè tập trung, phát triển sản phẩm theo hướng hàng hóa, nâng cao chất lượng và giá trị kinh tế của cây chè.
Ông Bùi Quang Hưng - Ủy viên BCH Đảng bộ tỉnh, Bí thư Đảng ủy Phong Hải phát biểu tại chương trình. Ảnh: Duy Trinh.
Bí thư Đảng ủy Phong Hải đề nghị các thành viên phát huy tinh thần đoàn kết, chủ động học hỏi kinh nghiệm, mạnh dạn áp dụng tiến bộ khoa học kỹ thuật vào sản xuất; chú trọng chăm sóc, cải tạo diện tích chè hiện có, từng bước mở rộng vùng chè Bát Tiên chất lượng cao. Đồng thời, sử dụng hiệu quả nguồn vốn vay, đúng mục đích để tạo động lực phát triển kinh tế, nâng cao thu nhập và ổn định đời sống.
Phát biểu tại chương trình, bà Nguyễn Thị Phương Đông – Phó Chủ tịch Hội Nông dân tỉnh Lào Cai khẳng định, việc xây dựng các Tổ Hội nông dân nghề nghiệp là nhiệm vụ trọng tâm nhằm đổi mới phương thức tập hợp hội viên, thúc đẩy phát triển kinh tế tập thể và nâng cao đời sống nông dân.
Bà Nguyễn Thị Phương Đông – Phó Chủ tịch Hội Nông dân tỉnh Lào Cai phát biểu tại chương trình. Ảnh: Văn Anh.
Phó Chủ tịch Hội Nông dân tỉnh Lào Cai mong muốn các thành viên tổ hội tiếp tục phát huy tinh thần đoàn kết, tương trợ trong sản xuất; chú trọng xây dựng thương hiệu, nâng cao chất lượng sản phẩm chè Bát Tiên theo hướng an toàn, bền vững và có sức cạnh tranh trên thị trường. Hội Nông dân tỉnh sẽ tiếp tục đồng hành, hỗ trợ hội viên tiếp cận các nguồn vốn ưu đãi, tập huấn và chuyển giao khoa học kỹ thuật nhằm nâng cao hiệu quả sản xuất.
10 hộ thành viên của Tổ Hội nông dân nghề nghiệp thôn Ải Nam đã được giải ngân nguồn vốn vay từ Quỹ Hỗ trợ nông dân tỉnh Lào Cai với tổng số tiền 1 tỷ đồng. Ảnh: Duy Trinh.
Nhân dịp này, 10 hộ thành viên của Tổ Hội nông dân nghề nghiệp thôn Ải Nam đã được giải ngân nguồn vốn vay từ Quỹ Hỗ trợ nông dân tỉnh Lào Cai với tổng số tiền 1 tỷ đồng. Nguồn vốn sẽ giúp các hộ đầu tư mở rộng diện tích, chăm sóc và phát triển vùng chè theo hướng hàng hóa, góp phần nâng cao thu nhập và cải thiện đời sống.
Nguồn: Duy Trinh - Văn Anh.`,
  },
  {
    titleVi: "📌 HỘI NGHỊ BAN THANH TRA NHÂN DÂN XÃ PHONG HẢI BẦU TRƯỞNG BAN, PHÓ TRƯỞNG BAN THANH TRA NHÂN DÂN NHIỆM KỲ 2025 – 2030",
    categorySlug: "tin-tuc-su-kien",
    publishedAt: "2026-05-07",
    contentVi: `Sáng ngày 07/05/2026, tại Hội trường tầng 2 UBND xã Phong Hải, Ban Thường trực Ủy ban MTTQ Việt Nam xã Phong Hải đã tổ chức Hội nghị Ban Thanh tra nhân dân nhằm kiện toàn chức danh Trưởng ban, Phó Trưởng ban Thanh tra nhân dân xã nhiệm kỳ 2025 – 2030.
Dự và chỉ đạo Hội nghị có: Ông Phạm Văn Viên – Phó Bí thư Thường trực Đảng ủy xã; Ông Nguyễn Ngọc Tuấn – Ủy viên Ban Thường vụ Đảng ủy, Trưởng Ban Xây dựng Đảng xã; Ông Đặng Minh Long – Ủy viên Ban Thường vụ Đảng ủy, Chủ tịch Ủy ban MTTQ Việt Nam xã Phong Hải; Ông Lê Xuân Cương – Ủy viên Ban Chấp hành Đảng bộ xã, Phó Chủ tịch UBND xã Phong Hải.
Tham dự Hội nghị còn có các ông, bà trong Ban Thường trực Ủy ban MTTQ Việt Nam xã; đại diện các tổ chức chính trị - xã hội; các đồng chí Bí thư chi bộ, Trưởng thôn trên địa bàn xã; đặc biệt là sự có mặt của 20/21 ông, bà thành viên Ban Thanh tra nhân dân xã.
Tại Hội nghị, đại diện lãnh đạo Ban Xây dựng Đảng đã thông báo kết luận của Thường trực Đảng ủy xã về việc phê duyệt nhân sự Ban Thanh tra nhân dân và các chức danh Trưởng ban, Phó Trưởng ban Thanh tra nhân dân xã Phong Hải nhiệm kỳ 2025 – 2030.
Với tinh thần dân chủ, đoàn kết và thống nhất cao, Hội nghị đã tiến hành biểu quyết bầu các chức danh:
✅ Ông Nguyễn Tiên Phong giữ chức vụ Trưởng ban Thanh tra nhân dân xã Phong Hải nhiệm kỳ 2025 – 2030.
✅ Ông Châu Đức Quý giữ chức vụ Phó Trưởng ban Thanh tra nhân dân xã Phong Hải nhiệm kỳ 2025 – 2030.
Kết quả, cả hai đồng chí đều đạt tỷ lệ tín nhiệm 100% đại biểu dự Hội nghị nhất trí biểu quyết thông qua.
Hội nghị diễn ra nghiêm túc, đúng quy định và thành công tốt đẹp, góp phần kiện toàn tổ chức Ban Thanh tra nhân dân, nâng cao hiệu quả công tác giám sát ở cơ sở, phát huy quyền làm chủ của Nhân dân trên địa bàn xã Phong Hải.
#MTTQPhongHai #ThanhTraNhanDan #PhongHai #DanChuCoSo`,
  },
  {
    titleVi: "Ban Thường trực UB MTTQ Việt Nam xã Phong Hải tổ chức Hội nghị Đánh giá kết quả thực hiện nhiệm vụ MTTQ tháng 4, Triển khai nhiệm vụ tháng 5, Quý II năm 2026",
    categorySlug: "tin-tuc-su-kien",
    publishedAt: "2026-05-07",
    contentVi: `Sáng ngày 07/05/2026, Ban Thường trực Ủy ban MTTQ Việt Nam xã Phong Hải tổ chức Hội nghị đánh giá kết quả thực hiện nhiệm vụ công tác Mặt trận tháng 4, triển khai phương hướng, nhiệm vụ tháng 5 và Quý II năm 2026; tham gia đóng góp ý kiến vào dự thảo tiêu chí xây dựng thôn “Đoàn kết – An toàn – Hạnh phúc”; đồng thời tổ chức ra mắt mô hình “Ủy ban MTTQ và các tổ chức chính trị - xã hội xã Phong Hải lắng nghe dân nói”.
Tham dự hội nghị có các đồng chí trong Ban thường trực UBMTTQ xã; đại diện các tổ chức chính trị - xã hội, các hội quần chúng; các đồng chí Trưởng Ban công tác Mặt trận các thôn cùng đông đảo đại biểu tham dự.
Tại hội nghị, Ban Thường trực Ủy ban MTTQ Việt Nam xã đã đánh giá toàn diện kết quả triển khai nhiệm vụ công tác Mặt trận trong tháng 4 năm 2026. Trong thời gian qua, MTTQ và các tổ chức chính trị - xã hội xã đã tích cực tuyên truyền, vận động Nhân dân thực hiện tốt chủ trương của Đảng, chính sách pháp luật của Nhà nước; đẩy mạnh các phong trào thi đua yêu nước, các cuộc vận động tại địa phương; phát huy tinh thần đoàn kết, chung sức xây dựng nông thôn mới, giữ gìn an ninh trật tự, bảo vệ môi trường và chăm lo đời sống Nhân dân.
Bên cạnh những kết quả đạt được, hội nghị cũng tập trung thảo luận, phân tích những tồn tại, hạn chế trong quá trình triển khai nhiệm vụ tại cơ sở; đồng thời đề ra nhiều giải pháp nhằm nâng cao chất lượng, hiệu quả hoạt động công tác Mặt trận trong thời gian tới. Trên cơ sở đó, Ban Thường trực UB MTTQ Việt Nam xã triển khai phương hướng, nhiệm vụ trọng tâm tháng 5 và Quý II năm 2026 với nhiều nội dung thiết thực, sát với tình hình thực tế địa phương.
Cũng trong chương trình, các đại biểu đã tham gia đóng góp ý kiến vào dự thảo tiêu chí xây dựng thôn “Đoàn kết – An toàn – Hạnh phúc”. Nhiều ý kiến tâm huyết, trách nhiệm đã được đưa ra nhằm bổ sung, hoàn thiện các tiêu chí phù hợp với điều kiện thực tế của từng khu dân cư, hướng tới mục tiêu xây dựng cộng đồng dân cư đoàn kết, văn minh, an toàn và ngày càng phát triển.
Điểm nhấn quan trọng của hội nghị là lễ ra mắt mô hình “Ủy ban MTTQ và các tổ chức chính trị - xã hội xã Phong Hải lắng nghe dân nói”. Đây là mô hình được triển khai nhằm đổi mới nội dung, phương thức hoạt động của Mặt trận trong giai đoạn hiện nay, tăng cường ứng dụng công nghệ thông tin và chuyển đổi số trong công tác nắm bắt tình hình Nhân dân.
Thông qua mô hình, người dân có thể dễ dàng gửi các ý kiến phản ánh, kiến nghị, tâm tư, nguyện vọng tới MTTQ và chính quyền địa phương thông qua nền tảng Zalo OA “Ủy ban MTTQ Việt Nam xã Phong Hải”. Các nội dung phản ánh của người dân sẽ được tiếp nhận, phân loại và chuyển đến cơ quan có thẩm quyền xem xét, giải quyết kịp thời, góp phần nâng cao hiệu quả công tác giám sát, phản biện xã hội, xây dựng chính quyền gần dân, sát dân và vì Nhân dân phục vụ.
Tại hội nghị, Ban Tổ chức cũng tiến hành nghi thức ra mắt, kích hoạt mô hình và trực tiếp hướng dẫn các đại biểu, Trưởng Ban công tác Mặt trận các thôn cách truy cập, sử dụng trang Zalo OA để tuyên truyền, hướng dẫn Nhân dân tham gia thực hiện hiệu quả mô hình trong thời gian tới.
Việc ra mắt mô hình “Lắng nghe dân nói” thể hiện quyết tâm của Ủy ban MTTQ Việt Nam xã Phong Hải trong việc đổi mới phương thức hoạt động, phát huy vai trò cầu nối giữa Đảng, chính quyền với Nhân dân; góp phần củng cố khối đại đoàn kết toàn dân tộc và xây dựng hệ thống chính trị cơ sở ngày càng vững mạnh.`,
  },
  {
    titleVi: "❤️ CHUNG TAY ỦNG HỘ QUỸ “VÌ NGƯỜI NGHÈO” NĂM 2026 ❤️",
    categorySlug: "cuoc-van-dong",
    publishedAt: "2026-04-15",
    contentVi: `Phát huy truyền thống đoàn kết, tương thân tương ái của dân tộc, Ủy ban MTTQ Việt Nam xã Phong Hải kêu gọi cán bộ, đảng viên, công chức, viên chức, người lao động, lực lượng vũ trang; các cơ quan, đơn vị, doanh nghiệp, hợp tác xã, nhà hảo tâm và toàn thể Nhân dân trong và ngoài xã cùng chung tay ủng hộ Quỹ “Vì người nghèo” tỉnh Lào Cai năm 2026.
Hiện nay trên địa bàn tỉnh Lào Cai vẫn còn 22.944 hộ nghèo (5,50%) và 24.685 hộ cận nghèo (5,93%). Riêng xã Phong Hải còn 117 hộ nghèo (3,04%) và 290 hộ cận nghèo (7,47%) cùng nhiều gia đình có hoàn cảnh đặc biệt khó khăn rất cần sự quan tâm, sẻ chia của cộng đồng.
✨ Mỗi sự đóng góp – dù nhỏ bé – đều là nguồn động viên to lớn giúp các hộ nghèo vơi bớt khó khăn, có thêm điều kiện vươn lên trong cuộc sống.
📅 Thời gian tiếp nhận ủng hộ: Từ nay đến hết 15/12/2026.
💰 Mức vận động khuyến khích: Cán bộ, công chức, viên chức, lực lượng vũ trang: ủng hộ 01 ngày lương hoặc từ 200.000đ/người trở lên. Nhân dân trên địa bàn: từ 20.000đ/hộ. Doanh nghiệp, HTX: từ 500.000đ trở lên.
📌 Hình thức ủng hộ: Chuyển khoản tới Ban Vận động Quỹ “Vì người nghèo” tỉnh Lào Cai, hoặc ủng hộ trực tiếp theo hướng dẫn của Ủy ban MTTQ Việt Nam xã Phong Hải.
🌱 Mỗi tấm lòng vàng – Một nghĩa cử cao đẹp – Chung tay vì cộng đồng.
Rất mong nhận được sự quan tâm, ủng hộ của các cơ quan, đơn vị, doanh nghiệp và toàn thể Nhân dân. Xin trân trọng cảm ơn!`,
  },
  {
    titleVi: "ĐẠI HỘI ĐẠI BIỂU HỘI NGƯỜI CAO TUỔI XÃ PHONG HẢI LẦN THỨ I, NHIỆM KỲ 2026 – 2031",
    categorySlug: "tin-tuc-su-kien",
    publishedAt: "2026-04-01",
    contentVi: `Sáng ngày 01/4/2026, tại Nhà văn hoá thôn 4, Hội Người cao tuổi xã Phong Hải đã long trọng tổ chức Đại hội đại biểu lần thứ I, nhiệm kỳ 2026 – 2031.
Dự và chỉ đạo Đại hội có đồng chí Phạm Văn Viên – Phó Bí thư Thường trực Đảng ủy xã; đồng chí Bàn Văn Dũng – Ủy viên Ban Thường vụ Đảng ủy, Phó Chủ tịch HĐND xã; đồng chí Đặng Minh Long – Ủy viên Ban Thường vụ Đảng ủy, Chủ tịch Ủy ban MTTQ xã; cùng các đồng chí trong Ban Thường vụ Đảng ủy, đại diện Ủy ban MTTQ, các tổ chức chính trị - xã hội, các ban, ngành, đoàn thể của xã, Ban Chỉ huy Quân sự xã, lãnh đạo Trạm Y tế, Phòng khám đa khoa khu vực Phong Hải và các đại biểu chính thức đại diện cho hội viên người cao tuổi trên địa bàn.
Tại Đại hội, các đại biểu đã được nghe Báo cáo kết quả thực hiện nhiệm vụ công tác Hội và phong trào người cao tuổi nhiệm kỳ 2021 – 2026; phương hướng, nhiệm vụ nhiệm kỳ 2026 – 2031; Báo cáo kiểm điểm của Ban Chấp hành.
Phát biểu chỉ đạo tại Đại hội, đồng chí Phạm Văn Viên – Phó Bí thư Thường trực Đảng ủy xã đã ghi nhận và biểu dương những kết quả mà Hội Người cao tuổi xã đã đạt được trong thời gian qua. Đồng chí nhấn mạnh: trong nhiệm kỳ tới, Hội cần tiếp tục phát huy vai trò, uy tín của người cao tuổi trong gia đình và xã hội; tích cực tham gia xây dựng Đảng, chính quyền; đẩy mạnh các phong trào thi đua “Tuổi cao – gương sáng”, góp phần giữ gìn bản sắc văn hoá, xây dựng đời sống văn hoá ở khu dân cư; quan tâm chăm lo đời sống vật chất, tinh thần cho hội viên, đặc biệt là người cao tuổi có hoàn cảnh khó khăn.
Đại hội đã công bố các quyết định chỉ định Ban Chấp hành Hội Người cao tuổi xã Phong Hải khóa I, nhiệm kỳ 2026 – 2031 gồm 25 đồng chí; Ban Thường vụ gồm 05 đồng chí; Ban Kiểm tra gồm 03 đồng chí. Đồng thời, chỉ định 01 Chủ tịch và 01 Phó Chủ tịch Hội.
Theo đó, bà Lê Thị Mùi được chỉ định giữ chức vụ Chủ tịch Hội Người cao tuổi xã Phong Hải khóa I, nhiệm kỳ 2026 – 2031; ông Nguyễn Thành Đô được chỉ định giữ chức vụ Phó Chủ tịch Hội Người cao tuổi xã Phong Hải khóa I, nhiệm kỳ 2026 – 2031.
Đại hội Đại biểu Hội Người cao tuổi xã Phong Hải lần thứ I, nhiệm kỳ 2026 – 2031 đã diễn ra thành công tốt đẹp, tạo tiền đề quan trọng để tiếp tục nâng cao chất lượng hoạt động Hội, phát huy vai trò người cao tuổi trong giai đoạn mới, góp phần xây dựng xã Phong Hải ngày càng phát triển.`,
  },
  {
    titleVi: "🎉 HỘI NGHỊ TỔNG KẾT CÔNG TÁC BẦU CỬ ĐẠI BIỂU QUỐC HỘI KHÓA XVI VÀ ĐẠI BIỂU HĐND CÁC CẤP, NHIỆM KỲ 2026 – 2031",
    categorySlug: "tin-tuc-su-kien",
    publishedAt: "2026-03-31",
    contentVi: `Chiều ngày 31/3/2026, tại Nhà đa năng Trường PTDTBT Tiểu học số 2 Phong Hải, Ủy ban bầu cử xã Phong Hải đã tổ chức Hội nghị tổng kết công tác bầu cử đại biểu Quốc hội khóa XVI và đại biểu HĐND các cấp nhiệm kỳ 2026 – 2031.
👉 Dự và chỉ đạo Hội nghị có: Đồng chí Bùi Quang Hưng – TUV, Bí thư Đảng ủy, Chủ tịch HĐND xã; Đồng chí Phạm Văn Viên – Phó Bí thư Thường trực Đảng ủy; Đồng chí Vũ Trung Dũng – Phó Bí thư Đảng ủy, Chủ tịch UBND xã; cùng các đồng chí lãnh đạo, thành viên Ban Chỉ đạo, Ủy ban bầu cử xã, đại diện các cơ quan, đơn vị, các thôn và các tập thể, cá nhân được khen thưởng.
📝 Tại Hội nghị, các đại biểu đã được nghe báo cáo tổng kết, đánh giá toàn diện công tác tổ chức bầu cử trên địa bàn xã. Với sự lãnh đạo, chỉ đạo sát sao của cấp ủy, chính quyền, sự phối hợp chặt chẽ của Ủy ban MTTQ và các tổ chức chính trị - xã hội, cùng tinh thần trách nhiệm cao của Nhân dân, cuộc bầu cử đã được tổ chức thành công, đảm bảo dân chủ, đúng pháp luật, an toàn, tiết kiệm, thực sự là ngày hội của toàn dân.
🤝 Phát huy vai trò của mình, Ủy ban MTTQ Việt Nam xã đã tích cực tham gia công tác hiệp thương, tuyên truyền, vận động cử tri, giám sát quá trình bầu cử, góp phần quan trọng vào thành công chung của cuộc bầu cử trên địa bàn.
🏆 Nhân dịp này, Hội nghị đã biểu dương, khen thưởng các tập thể, cá nhân có thành tích xuất sắc trong công tác bầu cử, qua đó lan tỏa tinh thần trách nhiệm, sự tận tụy và những đóng góp tích cực của các lực lượng tham gia.
🔎 Hội nghị cũng đã thẳng thắn chỉ ra những tồn tại, hạn chế, rút ra bài học kinh nghiệm, đề ra phương hướng, nhiệm vụ nhằm nâng cao chất lượng công tác tổ chức bầu cử trong thời gian tới.
💐 Thành công của Hội nghị là tiền đề quan trọng để tiếp tục củng cố, phát huy sức mạnh khối đại đoàn kết toàn dân tộc, nâng cao vai trò của MTTQ và các tổ chức chính trị - xã hội trong việc tham gia xây dựng chính quyền, góp phần thực hiện thắng lợi các nhiệm vụ phát triển kinh tế - xã hội tại địa phương.`,
  },
  {
    titleVi: "🌾🎉 LỄ HỘI XUỐNG ĐỒNG THÔN NẬM CHỦ – XUÂN BÍNH NGỌ 2026 🎉🌾",
    categorySlug: "doi-song-van-hoa-moi",
    publishedAt: "2026-02-23",
    contentVi: `Đảng ủy – HĐND – UBND – Ủy ban MTTQ Việt Nam xã Phong Hải trân trọng kính mời Nhân dân và du khách đến tham gia:
📅 Thời gian: Ngày 23/02/2026 (📌 Tức mùng 7 tháng Giêng năm Bính Ngọ)
📍 Địa điểm: Thôn Nậm Chủ, xã Phong Hải, tỉnh Lào Cai
Lễ hội Xuống đồng là nét đẹp văn hóa truyền thống, cầu cho một năm mưa thuận gió hòa – mùa màng bội thu – nhà nhà ấm no, hạnh phúc.
Kính mời bà con Nhân dân và du khách gần xa cùng về chung vui, giữ gìn và phát huy bản sắc văn hóa quê hương 🌾✨
#LeHoiXuongDong2026 #NamChu #PhongHai #XuanBinhNgo`,
  },
  {
    titleVi: "THÔNG BÁO V/v tham gia Chương trình Hội Xuân và Phiên chợ vùng cao thôn Ải Nam năm 2026",
    categorySlug: "doi-song-van-hoa-moi",
    publishedAt: "2026-02-22",
    contentVi: `Thực hiện kế hoạch tổ chức các hoạt động mừng Đảng, mừng Xuân, giữ gìn và phát huy bản sắc văn hóa truyền thống của địa phương, Đảng ủy – HĐND – UBND – Ủy ban MTTQ Việt Nam xã Phong Hải trân trọng thông báo và kính mời toàn thể cán bộ, đảng viên và Nhân dân trong và ngoài xã đến tham gia Chương trình Hội Xuân và Phiên chợ vùng cao thôn Ải Nam năm 2026.
Thời gian: Từ ngày 22 đến ngày 24 tháng 02 năm 2026 (Tức từ ngày mùng 6 đến ngày mùng 8 tháng Giêng năm Bính Ngọ).
Địa điểm: Thôn Ải Nam, xã Phong Hải, tỉnh Lào Cai.
Chương trình có nhiều hoạt động văn hóa, văn nghệ, trò chơi dân gian, trình diễn bản sắc dân tộc và Phiên chợ vùng cao với các sản phẩm truyền thống, ẩm thực đặc sắc của địa phương, hứa hẹn mang đến không khí vui tươi, đầm ấm, đậm đà bản sắc văn hóa trong những ngày đầu xuân mới.
Trân trọng kính mời toàn thể Nhân dân sắp xếp thời gian đến tham gia, cổ vũ và chung vui cùng chương trình, góp phần xây dựng đời sống văn hóa tinh thần phong phú, đoàn kết và phát triển.
Rất mong sự hưởng ứng nhiệt tình của toàn thể Nhân dân!`,
  },
  {
    titleVi: "🗳️ HỘI NGHỊ HIỆP THƯƠNG LẦN THỨ BA LỰA CHỌN, LẬP DANH SÁCH NGƯỜI ỨNG CỬ ĐẠI BIỂU HĐND XÃ PHONG HẢI KHÓA II, NHIỆM KỲ 2026 – 2031",
    categorySlug: "tin-tuc-su-kien",
    publishedAt: "2026-02-13",
    contentVi: `Sáng ngày 13/02/2026, tại phòng họp tầng 2 UBND xã, Ban Thường trực Ủy ban MTTQ Việt Nam xã Phong Hải tổ chức Hội nghị hiệp thương lần thứ ba để lựa chọn, lập danh sách những người đủ tiêu chuẩn ứng cử đại biểu HĐND xã khóa II, nhiệm kỳ 2026 – 2031.
🔹 Dự và chỉ đạo hội nghị có: Đồng chí Bùi Quang Hưng – Tỉnh ủy viên, Bí thư Đảng ủy, Chủ tịch HĐND xã; Đồng chí Phạm Văn Viên – Phó Bí thư Thường trực Đảng ủy; Đồng chí Vũ Trung Dũng – Phó Bí thư Đảng ủy, Chủ tịch UBND xã; Đồng chí Đặng Minh Long – Ủy viên Ban Thường vụ Đảng ủy, Chủ tịch Ủy ban MTTQ Việt Nam xã.
Cùng dự có Ban Thường trực Ủy ban MTTQ Việt Nam xã; đại diện lãnh đạo các tổ chức chính trị - xã hội; đại diện Ủy ban bầu cử xã.
Tại hội nghị, các đại biểu đã nghe báo cáo kết quả lấy ý kiến nhận xét, tín nhiệm của cử tri nơi cư trú đối với những người ứng cử; thảo luận dân chủ, trách nhiệm về cơ cấu, thành phần, số lượng người ứng cử đảm bảo đúng quy định.
Với tinh thần đoàn kết, dân chủ và trách nhiệm cao, hội nghị đã biểu quyết nhất trí 100% thông qua danh sách 37 người đủ tiêu chuẩn ứng cử đại biểu HĐND xã Phong Hải khóa II, nhiệm kỳ 2026 – 2031, đảm bảo cơ cấu hợp lý về giới, độ tuổi, dân tộc, thành phần và tỷ lệ tái cử theo quy định.
Hội nghị diễn ra nghiêm túc, đúng quy trình, góp phần chuẩn bị tốt các điều kiện để tổ chức thành công cuộc bầu cử đại biểu HĐND xã nhiệm kỳ 2026 – 2031.`,
  },
  {
    titleVi: "🇻🇳 XÃ PHONG HẢI TỔ CHỨC DÂNG HƯƠNG VIẾNG NGHĨA TRANG LIỆT SỸ NHÂN DỊP XUÂN BÍNH NGỌ 2026 🇻🇳",
    categorySlug: "tin-tuc-su-kien",
    publishedAt: "2026-02-12",
    contentVi: `Sáng ngày 12/02/2026 (tức ngày 25 tháng 12 năm Ất Tỵ), trong không khí trang nghiêm và thành kính, Đảng uỷ - HĐND - UBND - Ủy ban MTTQ Việt Nam xã Phong Hải đã tổ chức lễ dâng hương viếng Nghĩa trang liệt sỹ xã nhân dịp đầu Xuân năm mới.
Tham dự buổi lễ có các đồng chí Thường trực Đảng uỷ, HĐND, UBND, Ủy ban MTTQ Việt Nam xã; lãnh đạo các ban, ngành, đoàn thể; lực lượng vũ trang; cán bộ, công chức xã; bí thư chi bộ, trưởng thôn và đại diện các tổ chức chính trị - xã hội trên địa bàn.
Trong không khí linh thiêng, các đại biểu đã thành kính dâng hương, dâng hoa, dành phút mặc niệm tưởng nhớ công lao to lớn của các Anh hùng liệt sỹ – những người con ưu tú của quê hương đã anh dũng hy sinh vì độc lập, tự do của Tổ quốc, vì hạnh phúc của Nhân dân.
Hoạt động dâng hương đầu xuân là việc làm thường niên, thể hiện đạo lý “Uống nước nhớ nguồn”, “Đền ơn đáp nghĩa”, góp phần giáo dục truyền thống yêu nước, lòng tự hào dân tộc cho cán bộ, đảng viên và các tầng lớp Nhân dân, đặc biệt là thế hệ trẻ xã nhà.
Trước anh linh các Anh hùng liệt sỹ, Đảng bộ, chính quyền và Nhân dân xã Phong Hải nguyện đoàn kết một lòng, nỗ lực phấn đấu hoàn thành thắng lợi các mục tiêu, nhiệm vụ phát triển kinh tế - xã hội năm 2026, xây dựng quê hương ngày càng giàu đẹp, văn minh.`,
  },
  {
    titleVi: "📌 HỘI NGHỊ HƯỚNG DẪN MỘT SỐ NỘI DUNG, QUY TRÌNH, THỦ TỤC GIỚI THIỆU NGƯỜI ỨNG CỬ ĐẠI BIỂU HĐND XÃ PHONG HẢI KHÓA II, NHIỆM KỲ 2026 – 2031",
    categorySlug: "tin-tuc-su-kien",
    publishedAt: "2025-12-19",
    contentVi: `Chiều ngày 19/12/2025, tại Hội trường tầng 2 UBND xã Phong Hải, Ban Thường trực Ủy ban MTTQ Việt Nam xã Phong Hải đã tổ chức Hội nghị hướng dẫn một số nội dung, quy trình, thủ tục giới thiệu người ứng cử đại biểu Hội đồng nhân dân xã Phong Hải khóa II, nhiệm kỳ 2026 – 2031.
Tham dự Hội nghị có Ban thường trực Uỷ ban MTTQ Việt Nam xã; lãnh đạo các cơ quan, đơn vị, trường học, trạm y tế; đại diện các hợp tác xã; Trưởng Ban Công tác Mặt trận 21 thôn trên địa bàn xã.
Tại Hội nghị, các đại biểu đã được quán triệt, hướng dẫn quy trình hiệp thương, giới thiệu người ứng cử đại biểu HĐND xã, các nội dung trọng tâm liên quan đến công tác bầu cử, bảo đảm việc giới thiệu người ứng cử được thực hiện đúng quy trình, dân chủ, công khai, khách quan, đúng cơ cấu, thành phần và tiêu chuẩn theo quy định của pháp luật.
Hội nghị có ý nghĩa quan trọng, góp phần nâng cao nhận thức, trách nhiệm của các cơ quan, đơn vị, tổ chức trong việc phối hợp thực hiện tốt công tác giới thiệu người ứng cử đại biểu HĐND xã Phong Hải khóa II, nhiệm kỳ 2026 – 2031, hướng tới tổ chức thành công cuộc bầu cử trong thời gian tới.
📷 Một số hình ảnh tại Hội nghị.`,
  },
  {
    titleVi: "XUÂN SẺ CHIA – TẾT ẤM ĐẾN MỌI NHÀ",
    categorySlug: "cuoc-van-dong",
    publishedAt: "2026-02-08",
    contentVi: `Sáng ngày 08/02/2026, tại Hội trường Đa năng Trường PTDTBT Tiểu học số 2 Phong Hải, trong không khí ấm áp, nghĩa tình, Đảng ủy – HĐND – UBND – Ủy ban MTTQ Việt Nam xã Phong Hải đã tổ chức chương trình trao quà cho các hộ gia đình có hoàn cảnh khó khăn trên địa bàn.
Về dự chương trình có: Đồng chí Bùi Quang Hưng – Tỉnh ủy viên, Bí thư Đảng ủy, Chủ tịch HĐND xã; Đồng chí Phạm Văn Viên – Phó Bí thư Thường trực Đảng ủy; Đồng chí Vũ Trung Dũng – Phó Bí thư Đảng ủy, Chủ tịch UBND xã; Đồng chí Đặng Minh Long – Ủy viên BTV Đảng ủy, Chủ tịch Ủy ban MTTQ Việt Nam xã; cùng các đồng chí trong Thường trực Đảng ủy – HĐND – UBND – Ủy ban MTTQ, các ban ngành, đoàn thể, lực lượng công an, quân sự xã.
Phát biểu chỉ đạo tại chương trình, đồng chí Bùi Quang Hưng ghi nhận và trân trọng cảm ơn sự quan tâm của Quỹ Vì người nghèo tỉnh Lào Cai cùng cá nhân đồng chí Trịnh Xuân Trường; đồng thời khẳng định cấp ủy, chính quyền địa phương sẽ tiếp tục thực hiện tốt các chính sách an sinh xã hội, chăm lo đời sống nhân dân, với quyết tâm không để ai bị bỏ lại phía sau.
Tại chương trình đã trao: 🔹 117 suất quà từ Quỹ Vì người nghèo tỉnh Lào Cai, trị giá 600.000 đồng/suất. 🔹 125 suất quà do đồng chí Trịnh Xuân Trường – Ủy viên BCH Trung ương Đảng, Bí thư Tỉnh ủy Thái Nguyên, nguyên Bí thư Tỉnh ủy Lào Cai trao tặng, gồm 500.000 đồng tiền mặt và hiện vật trị giá 500.000 đồng/suất.
Những phần quà thiết thực, ý nghĩa không chỉ góp phần hỗ trợ các hộ gia đình giảm bớt khó khăn mà còn thể hiện sự quan tâm sâu sắc của Tỉnh ủy, Quỹ Vì người nghèo và các đồng chí lãnh đạo đối với công tác an sinh xã hội tại cơ sở.
Chương trình diễn ra trong không khí trang trọng, ấm áp, lan tỏa tinh thần đoàn kết, sẻ chia và trách nhiệm vì cộng đồng trên địa bàn xã Phong Hải.`,
  },
  {
    titleVi: "TRAO QUÀ AN SINH – LAN TỎA YÊU THƯƠNG TẠI XÃ PHONG HẢI",
    categorySlug: "cuoc-van-dong",
    publishedAt: "2026-02-08",
    contentVi: `Sáng ngày 08/02/2026, tại Hội trường Đa năng Trường PTDTBT Tiểu học số 2 Phong Hải, Ngân hàng Nông nghiệp và Phát triển nông thôn (Agribank) Chi nhánh Bảo Thắng đã phối hợp cùng Đảng ủy – HĐND – UBND – Ủy ban MTTQ Việt Nam xã Phong Hải tổ chức chương trình trao quà an sinh xã hội cho các hộ gia đình có hoàn cảnh khó khăn trên địa bàn.
Tại chương trình, Agribank Chi nhánh Bảo Thắng đã trao 70 suất quà, trị giá 600.000 đồng/suất, với tổng kinh phí 42.000.000 đồng. Đây là hoạt động thiết thực, ý nghĩa, thể hiện tinh thần “Tương thân tương ái”, “Lá lành đùm lá rách”, đồng thời khẳng định trách nhiệm xã hội và sự đồng hành của Ngân hàng đối với công tác an sinh tại địa phương.
Về dự chương trình có: Đồng chí Bùi Quang Hưng – Tỉnh ủy viên, Bí thư Đảng ủy, Chủ tịch HĐND xã; Đồng chí Phạm Văn Viên – Phó Bí thư Thường trực Đảng ủy; Đồng chí Vũ Trung Dũng – Phó Bí thư Đảng ủy, Chủ tịch UBND xã; Đồng chí Đặng Minh Long – Ủy viên BTV Đảng ủy, Chủ tịch Ủy ban MTTQ Việt Nam xã; cùng các đồng chí trong Thường trực Đảng ủy – HĐND – UBND – Ủy ban MTTQ, các ban ngành, đoàn thể, lực lượng công an, quân sự xã.
Về phía Agribank Chi nhánh Bảo Thắng có đồng chí Vũ Minh Khải – Phó Giám đốc Chi nhánh cùng các đồng chí cán bộ, nhân viên Ngân hàng.
Phát biểu tại chương trình, đồng chí Vũ Minh Khải đã chia sẻ những tình cảm, sự quan tâm của Agribank đối với nhân dân xã Phong Hải, mong muốn những phần quà nhỏ sẽ góp phần động viên, hỗ trợ các hộ gia đình vươn lên trong cuộc sống.
Đại diện lãnh đạo địa phương, đồng chí Bùi Quang Hưng – Bí thư Đảng ủy xã đã trân trọng cảm ơn sự quan tâm, đồng hành đầy trách nhiệm của Agribank Chi nhánh Bảo Thắng; đồng thời khẳng định đây là nguồn động viên thiết thực, góp phần cùng địa phương thực hiện tốt công tác an sinh xã hội.
Những phần quà được trao tận tay các hộ gia đình không chỉ mang giá trị vật chất mà còn chứa đựng tình cảm, sự sẻ chia và niềm tin vào sự chung tay vì cộng đồng.
Chương trình đã diễn ra trong không khí trang trọng, ấm áp và nghĩa tình, tiếp tục lan tỏa tinh thần nhân ái trên địa bàn xã Phong Hải. 💙`,
  },
  {
    titleVi: "🎉🎶 CHƯƠNG TRÌNH VĂN NGHỆ MỪNG ĐẢNG – MỪNG XUÂN 2026 🎶🎉",
    categorySlug: "doi-song-van-hoa-moi",
    publishedAt: "2026-02-06",
    contentVi: `Hòa chung không khí vui tươi, phấn khởi chào mừng Xuân mới và kỷ niệm 96 năm Ngày thành lập Đảng Cộng sản Việt Nam (03/02/1930 – 03/02/2026), Đảng ủy – HĐND – UBND – Ủy ban MTTQ Việt Nam xã Phong Hải tổ chức Chương trình văn nghệ “Mừng Đảng quang vinh – Mừng đất nước đổi mới – Chào Xuân mới” Xuân Bính Ngọ năm 2026.
⏰ Thời gian: 19h00, ngày 06/02/2026
📍 Địa điểm: Nhà văn hoá thôn Tòng Già (km18), xã Phong Hải
Chương trình với nhiều tiết mục đặc sắc ca ngợi Đảng quang vinh, Bác Hồ kính yêu, quê hương đổi mới; các tiết mục múa, hát, giao lưu văn nghệ đặc sắc do cán bộ, đoàn viên, hội viên và nhân dân trên địa bàn biểu diễn.
Đây là dịp để đoàn viên, thanh niên và bà con nhân dân gặp gỡ, giao lưu, thắt chặt tình đoàn kết, cùng nhau tạo nên không khí vui tươi, đầm ấm trong những ngày đầu xuân năm mới.
👉 Kính mời toàn thể đoàn viên, hội viên và nhân dân sắp xếp thời gian đến tham dự, cổ vũ, động viên tinh thần cho các đội văn nghệ, góp phần tạo nên thành công của chương trình.
Sự hiện diện và cổ vũ nhiệt tình của quý vị là niềm động viên lớn nhất đối với các diễn viên và Ban Tổ chức!
🌸 Hẹn gặp lại vào 19h00 ngày 06/02/2026 tại Nhà văn hoá thôn Tòng Già! 🌸`,
  },
  {
    titleVi: "🗳️ NIÊM YẾT DANH SÁCH CỬ TRI TẠI NHÀ VĂN HÓA CÁC THÔN",
    categorySlug: "tin-tuc-su-kien",
    publishedAt: "2026-02-20",
    contentVi: `Thực hiện công tác chuẩn bị cho cuộc bầu cử Hội đồng nhân dân các cấp nhiệm kỳ 2026 – 2031, các Tổ bầu cử tại các thôn trên địa bàn đã và đang tiến hành niêm yết công khai danh sách cử tri tại Nhà văn hóa thôn theo đúng quy định của pháp luật.
Việc niêm yết danh sách cử tri nhằm: Bảo đảm quyền và nghĩa vụ công dân trong bầu cử; Tạo điều kiện để Nhân dân kiểm tra, rà soát thông tin cá nhân; Góp phần thực hiện tốt nguyên tắc dân chủ, công khai, minh bạch trong bầu cử.
📌 Đề nghị cử tri các thôn quan tâm theo dõi, kiểm tra thông tin trong danh sách cử tri. Trường hợp phát hiện sai sót hoặc có ý kiến phản ánh, đề nghị liên hệ trực tiếp với Tổ bầu cử thôn để được xem xét, điều chỉnh kịp thời.
👉 Mỗi lá phiếu – Một tiếng nói – Góp phần xây dựng chính quyền của Nhân dân, do Nhân dân và vì Nhân dân.`,
  },
  {
    titleVi: "🌟 HỘI NGHỊ HIỆP THƯƠNG LẦN THỨ HAI – THỎA THUẬN LẬP DANH SÁCH SƠ BỘ NGƯỜI ỨNG CỬ ĐẠI BIỂU HĐND XÃ PHONG HẢI KHOÁ II, NHIỆM KỲ 2026 – 2031",
    categorySlug: "tin-tuc-su-kien",
    publishedAt: "2026-02-02",
    contentVi: `Chiều ngày 02/02/2026, Ban Thường trực Ủy ban Mặt trận Tổ quốc Việt Nam xã Phong Hải đã tổ chức Hội nghị hiệp thương lần thứ hai nhằm thỏa thuận lập danh sách sơ bộ những người ứng cử đại biểu Hội đồng nhân dân xã Phong Hải khóa II, nhiệm kỳ 2026 – 2031, theo đúng quy định của Luật Bầu cử đại biểu Quốc hội và đại biểu Hội đồng nhân dân.
Hội nghị được tổ chức công khai, dân chủ, đúng trình tự, thủ tục pháp luật, với sự tham gia của đại diện Đảng ủy, HĐND, UBND xã, Ủy ban bầu cử xã, Ban Thường trực Ủy ban MTTQ xã và các tổ chức thành viên, thể hiện rõ vai trò hiệp thương, thống nhất và đồng thuận trong công tác bầu cử ở cơ sở.
Tại hội nghị, các đại biểu đã thảo luận, cho ý kiến về tiêu chuẩn, cơ cấu, thành phần, số lượng người ứng cử; bảo đảm sự đại diện của phụ nữ, người trẻ, người dân tộc thiểu số, người ngoài Đảng, qua đó phản ánh đầy đủ ý chí, nguyện vọng và quyền làm chủ của Nhân dân.
Kết quả, hội nghị đã nhất trí cao thông qua danh sách sơ bộ 45 người ứng cử đại biểu HĐND xã Phong Hải nhiệm kỳ 2026 – 2031, đồng thời thống nhất kế hoạch tổ chức lấy ý kiến nhận xét và tín nhiệm của cử tri nơi cư trú – một bước quan trọng nhằm phát huy quyền giám sát, tham gia trực tiếp của Nhân dân trong công tác bầu cử.
Hội nghị hiệp thương lần thứ hai khẳng định vai trò nòng cốt của Ủy ban MTTQ Việt Nam xã Phong Hải trong việc tập hợp khối đại đoàn kết toàn dân, bảo đảm để mỗi lá phiếu bầu cử thực sự là sự lựa chọn dân chủ, đúng pháp luật và thể hiện niềm tin của Nhân dân đối với những người đại diện cho mình trong nhiệm kỳ mới.
📌 Trong thời gian tới, Ủy ban MTTQ Việt Nam xã Phong Hải sẽ tiếp tục phối hợp chặt chẽ với các cơ quan, đơn vị liên quan, triển khai các bước tiếp theo đúng luật, đúng tiến độ, hướng tới tổ chức thành công cuộc bầu cử đại biểu HĐND các cấp, nhiệm kỳ 2026 – 2031.`,
  },
  {
    titleVi: "🌟 HỘI NGHỊ TỔNG KẾT CÔNG TÁC MẶT TRẬN VÀ CÁC TỔ CHỨC CHÍNH TRỊ – XÃ HỘI XÃ PHONG HẢI NĂM 2025",
    categorySlug: "tin-tuc-su-kien",
    publishedAt: "2026-01-15",
    contentVi: `📅 Chiều ngày 15/01/2026, tại hội trường nhà đa năng Trường PTDT bán trú Tiểu học số 2, Ủy ban MTTQ Việt Nam xã Phong Hải đã tổ chức Hội nghị tổng kết công tác Mặt trận và các tổ chức chính trị – xã hội năm 2025, triển khai phương hướng, nhiệm vụ năm 2026.
👉 Hội nghị vinh dự được đón tiếp sự tham dự và chỉ đạo của Thường trực Đảng ủy, lãnh đạo UBND xã, cùng sự có mặt của đại diện các ban, ngành, đoàn thể, Ban công tác Mặt trận các thôn, tổ dân phố và gần 160 đại biểu tham dự.
📝 Tại hội nghị, các đại biểu đã: Nghe báo cáo tổng kết công tác năm 2025, đánh giá toàn diện kết quả đạt được, chỉ rõ những tồn tại, hạn chế; Thảo luận, đóng góp nhiều ý kiến tâm huyết, trách nhiệm, sát với tình hình thực tiễn ở cơ sở; Tiếp thu ý kiến chỉ đạo của Thường trực Đảng ủy, định hướng nhiệm vụ trọng tâm trong năm 2026; Phát động phong trào thi đua và ký giao ước thi đua năm 2026 giữa MTTQ và các tổ chức chính trị – xã hội.
🎯 Hội nghị là dịp quan trọng để tăng cường sự thống nhất, phối hợp hành động giữa Mặt trận và các tổ chức chính trị – xã hội; tạo khí thế thi đua sôi nổi, quyết tâm thực hiện thắng lợi các mục tiêu, nhiệm vụ đã đề ra trong năm 2026.
💐 Với tinh thần đoàn kết – dân chủ – đổi mới – hiệu quả, công tác Mặt trận và các tổ chức chính trị – xã hội xã Phong Hải hứa hẹn sẽ tiếp tục đạt nhiều kết quả tích cực, góp phần xây dựng địa phương ngày càng phát triển.
📸 Một số hình ảnh tại hội nghị…`,
  },
  {
    titleVi: "📌 ỦY BAN MTTQ VIỆT NAM XÃ PHONG HẢI LÀM VIỆC VỚI ĐOÀN GIÁM SÁT CỦA HĐND TỈNH",
    categorySlug: "tin-tuc-su-kien",
    publishedAt: "2026-01-09",
    contentVi: `Thực hiện công tác bầu cử đại biểu Quốc hội khóa XVI và đại biểu Hội đồng nhân dân các cấp nhiệm kỳ 2026 – 2031, ngày 09/01/2026, Ủy ban MTTQ Việt Nam xã Phong Hải phối hợp với Ủy ban bầu cử xã Phong Hải đã làm việc với Đoàn giám sát của Thường trực HĐND tỉnh Lào Cai.
Tại buổi làm việc, Đoàn giám sát đã nghe báo cáo về công tác chuẩn bị bầu cử trên địa bàn xã; đồng thời kiểm tra, đánh giá việc chấp hành các quy định của pháp luật về bầu cử, công tác phối hợp giữa các cơ quan, tổ chức liên quan trong quá trình triển khai nhiệm vụ.
Thông qua buổi làm việc, Đoàn giám sát ghi nhận sự chủ động, nghiêm túc của địa phương trong công tác chuẩn bị bầu cử, đồng thời trao đổi, hướng dẫn một số nội dung nhằm tiếp tục nâng cao chất lượng, hiệu quả công tác bầu cử, bảo đảm dân chủ, đúng luật, an toàn và thành công.
👉 Ủy ban MTTQ Việt Nam xã Phong Hải sẽ tiếp thu đầy đủ các ý kiến của Đoàn giám sát, tiếp tục phối hợp chặt chẽ với các cơ quan liên quan để tổ chức tốt cuộc bầu cử trong thời gian tới.
📷 Một số hình ảnh tại buổi làm việc.`,
  },
  {
    titleVi: "🌟 HỘI NGHỊ HIỆP THƯƠNG LẦN THỨ NHẤT – MTTQ XÃ PHONG HẢI",
    categorySlug: "tin-tuc-su-kien",
    publishedAt: "2025-12-05",
    contentVi: `Thỏa thuận về cơ cấu, thành phần, số lượng người được giới thiệu ứng cử đại biểu HĐND xã nhiệm kỳ 2026–2031.
Sáng ngày 05/12/2025, Ủy ban Mặt trận Tổ quốc Việt Nam xã Phong Hải tổ chức Hội nghị hiệp thương lần thứ nhất để thỏa thuận về cơ cấu, thành phần và số lượng người được giới thiệu ứng cử đại biểu HĐND xã nhiệm kỳ 2026–2031.
Thành phần tham dự gồm: Thường trực Đảng ủy, HĐND, UBND xã; đại diện Ủy ban bầu cử xã; Ban Thường trực Ủy ban MTTQ Việt Nam xã (06/06 đại biểu tham dự, đạt 100%); cùng đại diện lãnh đạo các tổ chức thành viên.
Tại hội nghị, các đại biểu đã nghe đại diện Thường trực HĐND xã trình bày dự kiến cơ cấu, thành phần và số lượng người được giới thiệu ứng cử đại biểu HĐND xã nhiệm kỳ 2026–2031; đồng thời nghe Ban Thường trực Ủy ban MTTQ Việt Nam xã báo cáo Tờ trình về cơ cấu, thành phần và số lượng người được giới thiệu ứng cử theo đúng quy định của Luật Bầu cử.
Các đại biểu tham dự hội nghị đã thảo luận dân chủ, đóng góp nhiều ý kiến trách nhiệm và biểu quyết thống nhất cao đối với phương án cơ cấu, thành phần, số lượng người được giới thiệu ứng cử.
📌 Hội nghị là bước mở đầu quan trọng trong quy trình chuẩn bị nhân sự ứng cử HĐND xã nhiệm kỳ 2026–2031.
📸 Một số hình ảnh tại hội nghị.`,
  },
  {
    titleVi: "🇻🇳 MTTQ VIỆT NAM XÃ PHONG HẢI THAM DỰ HỘI NGHỊ TẬP HUẤN CÔNG TÁC BẦU CỬ NHIỆM KỲ 2026–2031",
    categorySlug: "tin-tuc-su-kien",
    publishedAt: "2025-11-23",
    contentVi: `Sáng ngày 23/11, Ủy ban MTTQ Việt Nam xã Phong Hải đã tham dự Hội nghị trực tuyến tập huấn công tác bầu cử đại biểu Quốc hội khóa XVI và đại biểu HĐND các cấp nhiệm kỳ 2026–2031.
Tại điểm cầu xã Phong Hải, Ban Thường trực Ủy ban MTTQ Việt Nam xã cùng các Trưởng Ban Công tác Mặt trận trên địa bàn đã tham dự đầy đủ, nghiêm túc.
Hội nghị tập trung hướng dẫn các nội dung: quy trình hiệp thương; giới thiệu người ứng cử; tổ chức lấy ý kiến cử tri; công tác giám sát và kiểm tra bầu cử.
Qua tập huấn, MTTQ xã Phong Hải tiếp tục nâng cao kỹ năng, nghiệp vụ, sẵn sàng triển khai các nhiệm vụ phục vụ cuộc bầu cử Quốc hội và HĐND các cấp nhiệm kỳ 2026–2031 đảm bảo dân chủ, đúng luật và hiệu quả.`,
  },
  {
    titleVi: "Thôn 4 tổ chức Ngày hội Đại đoàn kết toàn dân tộc, kỷ niệm 95 năm Ngày truyền thống MTTQ Việt Nam",
    categorySlug: "tin-tuc-su-kien",
    publishedAt: "2025-11-16",
    contentVi: `Chiều ngày 16/11/2025, khu dân cư thôn 4 long trọng tổ chức kỷ niệm 95 năm ngày truyền thống Mặt trận tổ quốc Việt Nam. Về dự và động viên ngày hội có đồng chí Bùi Quang Hưng - Ủy viên BCH Đảng bộ tỉnh Lào Cai, Bí thư Đảng ủy, Chủ tịch Hội đồng nhân dân xã Phong Hải. Chương trình Ngày hội đã diễn ra thành công tốt đẹp.`,
  },
  {
    titleVi: "Đồng chí Chủ tịch UBND tỉnh Nguyễn Tuấn Anh dự Ngày hội Đại đoàn kết toàn dân tộc thôn Khởi Khe",
    categorySlug: "tin-tuc-su-kien",
    publishedAt: "2025-11-16",
    contentVi: `Sáng 16/11, đồng chí Nguyễn Tuấn Anh, Phó Bí thư Tỉnh ủy, Chủ tịch UBND tỉnh, đã đến dự và chung vui Ngày hội Đại đoàn kết toàn dân tộc cùng Nhân dân các dân tộc thôn Khởi Khe, xã Phong Hải.`,
  },
  {
    titleVi: "Ban Thường trực Ủy ban MTTQ Việt Nam xã Phong Hải tổ chức Hội nghị đánh giá kết quả công tác tháng 10, triển khai nhiệm vụ tháng 11 và triển khai nội dung tổ chức Ngày hội Đại đoàn kết toàn dân tộc năm 2025",
    categorySlug: "tin-tuc-su-kien",
    publishedAt: "2025-11-04",
    contentVi: `🌸 Sáng ngày 04/11/2025, tại Hội trường UBND xã Phong Hải, Ban Thường trực Ủy ban Mặt trận Tổ quốc Việt Nam xã Phong Hải tổ chức hội nghị đánh giá kết quả thực hiện nhiệm vụ công tác Mặt trận tháng 10, triển khai phương hướng, nhiệm vụ tháng 11 và triển khai nội dung tổ chức Ngày hội Đại đoàn kết toàn dân tộc năm 2025.
✨ Chủ trì hội nghị là đồng chí Đặng Minh Long – Ủy viên Ban Thường vụ Đảng ủy, Chủ tịch Ủy ban MTTQ Việt Nam xã Phong Hải.
Đồng chí Đặng Minh Long đã đánh giá kết quả nổi bật trong công tác Mặt trận tháng 10, ghi nhận tinh thần trách nhiệm, sự nỗ lực của các Ban công tác Mặt trận thôn trong việc phát huy sức mạnh khối đại đoàn kết toàn dân, tích cực tham gia các phong trào thi đua yêu nước, góp phần xây dựng nông thôn mới và giữ gìn an ninh trật tự tại địa phương.
🏵️ Đồng chí cũng định hướng các nhiệm vụ trọng tâm tháng 11, trong đó nhấn mạnh việc chuẩn bị chu đáo cho Ngày hội Đại đoàn kết toàn dân tộc năm 2025, gắn với kỷ niệm 95 năm Ngày truyền thống Mặt trận Dân tộc thống nhất Việt Nam (18/11/1930 - 18/11/2025), đảm bảo trang trọng, ý nghĩa và thiết thực.
🎯 Hội nghị đã nghe các ý kiến phát biểu, trao đổi của đại diện Ban công tác Mặt trận các thôn, qua đó thống nhất một số giải pháp để nâng cao hiệu quả hoạt động, đẩy mạnh công tác tuyên truyền, vận động nhân dân, tạo không khí phấn khởi hướng về Ngày hội Đại đoàn kết.
🌺 Với tinh thần “Đoàn kết – Chung sức – Đồng lòng – Phát triển”, Ban Thường trực Ủy ban MTTQ Việt Nam xã Phong Hải quyết tâm triển khai thắng lợi các nhiệm vụ tháng 11, góp phần xây dựng quê hương Phong Hải ngày càng giàu đẹp, văn minh.`,
  },
  {
    titleVi: "🌧 PHONG HẢI CHUNG TAY ỦNG HỘ ĐỒNG BÀO SAU BÃO SỐ 10 🌧",
    categorySlug: "cuoc-van-dong",
    publishedAt: "2025-10-20",
    contentVi: `Sáng ngày 20/10/2025, UBND - Ủy ban MTTQ Việt Nam xã Phong Hải đã tổ chức phát động ủng hộ nhân dân khắc phục thiệt hại do bão số 10.
Tại buổi phát động, cán bộ, đảng viên, công chức, lực lượng vũ trang đã tích cực quyên góp, ủng hộ bằng tiền và hiện vật, thể hiện tinh thần “tương thân tương ái, lá lành đùm lá rách.” 💙
Số tiền và hiện vật quyên góp sẽ được MTTQ xã Phong Hải tiếp nhận và chuyển đến các địa phương bị ảnh hưởng, giúp người dân sớm ổn định cuộc sống.
Xin trân trọng cảm ơn tấm lòng của toàn thể cán bộ và Nhân dân! ❤️`,
  },
  {
    titleVi: "Lào Cai: Lời kêu gọi ủng hộ nhân dân tỉnh Lào Cai khắc phục hậu quả do cơn bão số 10 gây ra",
    categorySlug: "cuoc-van-dong",
    publishedAt: "2025-10-03",
    contentVi: `Ủy ban Mặt trận Tổ quốc Việt Nam tỉnh kêu gọi các cơ quan, tổ chức, doanh nghiệp, tập thể, cá nhân ở trong và ngoài tỉnh ủng hộ nhân dân tỉnh Lào Cai khắc phục hậu quả do cơn bão số 10 gây ra.
Bão số 10 đã gây ra nhiều tổn thất nặng nề về người, tài sản tại các địa phương khu vực Bắc Bộ và Bắc Trung Bộ. Trong đó, có tỉnh Lào Cai do ảnh hưởng hoàn lưu bão từ đêm 28/9/2025 đến 01/10/2025, trên địa bàn tỉnh Lào Cai có mưa vừa, mưa to đến rất to trên diện rộng. Mưa lũ đã gây ra thiệt hại rất nghiêm trọng về người, tài sản của người dân và cơ sở hạ tầng, trong đó thiệt hại về người: 20 người (Người chết 07 người, mất tích 03 người; người bị thương 10 người); 11.792 ngôi nhà ở của người dân bị hư hỏng. Ước thiệt hại sơ bộ khoảng 2.750 tỷ đồng.
Tỉnh Lào Cai đã chỉ đạo quyết liệt, chủ động từ sớm, triển khai đồng bộ nhiều giải pháp cụ thể để phòng, chống, tích cực, quyết tâm, nỗ lực cao thực hiện các giải pháp khắc phục, giảm thiểu tối đa thiệt hại về người, tài sản của người dân. Tuy nhiên, sự tàn phá khủng khiếp của cơn bão Bualoi đã gây ra hậu quả, thiệt hại hết sức nghiêm trọng, cần nhiều nguồn lực để hỗ trợ Nhân dân, phục hồi sản xuất, khắc phục cơ sở hạ tầng bị hư hỏng, sớm ổn định cuộc sống của người dân.
Hưởng ứng Lời kêu gọi của Đoàn Chủ tịch Ủy ban Trung ương MTTQ Việt Nam về việc vận động ủng hộ đồng bào khắc phục thiệt hại do bão số 10 gây ra; Thực hiện Công văn số 738/MTTW-BTT ngày 03/10/2025 của Ban Thường trực Uỷ ban Trung ương MTTQ Việt Nam về việc ủng hộ đồng bào bị thiệt hại do bão số 10 gây ra.
Uỷ ban MTTQ Việt Nam tỉnh Lào Cai tha thiết kêu gọi các cơ quan, tổ chức, các doanh nghiệp, các nhà hảo tâm ở trong và ngoài tỉnh, người nước ngoài đang sinh sống, làm việc ở Việt Nam… hãy dành những tình cảm tốt đẹp, sẻ chia, giúp đỡ về tinh thần, vật chất, góp phần cùng với tỉnh Lào Cai khắc phục thiệt hại do bão số 10 gây ra. Với tinh thần “Nhường cơm sẻ áo”, người có của góp của, người có công góp công, có ít góp ít, có nhiều góp nhiều. Mỗi cán bộ, công chức, viên chức, chiến sĩ lực lượng vũ trang, người hưởng lương từ ngân sách nhà nước, mỗi người nên giúp ít nhất một ngày lương trở lên; người lao động nên giúp một ngày thu nhập; đoàn viên, hội viên, thanh niên, hộ gia đình có mức sống từ trung bình trở lên tiết kiệm chi tiêu ủng hộ 50.000 đồng trở lên. Các tổ chức, doanh nghiệp ủng hộ theo tinh thần tự nguyện, tùy theo khả năng đóng góp và lòng hảo tâm của mình.
Mọi đóng góp ủng hộ xin gửi về Ban Vận động cứu trợ tỉnh Lào Cai.
Ủng hộ trực tiếp tại trụ sở cơ quan Ủy ban MTTQ Việt Nam tỉnh Lào Cai, địa chỉ: Đường Trần Huy Liệu, phường Yên Bái, tỉnh Lào Cai.
Ủng hộ qua chuyển khoản: Tên tài khoản: Ban Vận động cứu trợ tỉnh Lào Cai; Số tài khoản: 1050357395, mở tại Ngân hàng Vietcombank; Số tài khoản: 8602571666, mở tại Ngân hàng BIDV - Chi nhánh Yên Bái. Ủy ban MTTQ Việt Nam tỉnh, Ban Vận động cứu trợ tỉnh Lào Cai cam kết sử dụng đúng mục đích, có hiệu quả, công khai, minh bạch toàn bộ nguồn kinh phí vận động được để hỗ trợ khắc phục thiệt hại do cơn bão số 10 gây ra.`,
  },
  {
    titleVi: "🌸🇻🇳 ĐẠI HỘI ĐẠI BIỂU MTTQ VIỆT NAM XÃ PHONG HẢI LẦN THỨ I, NHIỆM KỲ 2025 – 2030 – DẤU MỐC QUAN TRỌNG TRONG HÀNH TRÌNH ĐẠI ĐOÀN KẾT TOÀN DÂN TỘC 🇻🇳🌸",
    categorySlug: "tin-tuc-su-kien",
    publishedAt: "2025-09-27",
    contentVi: `Trong không khí phấn khởi thi đua lập thành tích chào mừng các ngày lễ lớn của đất nước và của tỉnh nhà, trong hai ngày 26 – 27/9/2025, tại Hội trường Nhà Đa năng Trường PTDTBT Tiểu học số 2, Đại hội đại biểu MTTQ Việt Nam xã Phong Hải lần thứ I, nhiệm kỳ 2025 – 2030 đã được tổ chức trọng thể, với sự tham dự của 135/135 đại biểu chính thức, đại diện tiêu biểu cho các tầng lớp nhân dân, các dân tộc, tôn giáo trên địa bàn xã.
✨ Đại hội vinh dự được đón tiếp các đồng chí lãnh đạo về dự và chỉ đạo: Ông Bùi Quang Hưng – TUV, Bí thư Đảng ủy, Chủ tịch HĐND xã; Ông Phạm Văn Viên – Phó Bí thư Thường trực Đảng ủy; Ông Vũ Trung Dũng – Phó Bí thư Đảng ủy, Chủ tịch UBND xã; cùng các đồng chí trong BTV, BCH Đảng ủy xã; các đồng chí nguyên lãnh đạo UBMTTQ xã Bản Cầm và TTNT Phong Hải (trước khi sáp nhập); đại diện các cơ quan, đơn vị, doanh nghiệp trên địa bàn, ngân hàng chính sách xã hội, ngân hàng agribank; cùng đại diện MTTQ các xã bạn.
🌟 Với tinh thần “Dân chủ – Đoàn kết – Kỷ cương – Sáng tạo – Phát triển”, Đại hội đã thảo luận sôi nổi, dân chủ, thẳng thắn, thống nhất cao thông qua: Báo cáo chính trị của Ủy ban MTTQ xã Phong Hải nhiệm kỳ 2024 – 2029; Báo cáo kiểm điểm của Ủy ban MTTQ xã khóa trước; 12 chỉ tiêu cụ thể, 06 chương trình hành động trọng tâm cho nhiệm kỳ 2025 – 2030.
💡 Các chỉ tiêu nổi bật mà Đại hội đã đề ra: 100% cán bộ, đảng viên, đoàn viên, hội viên và 90% Nhân dân được tuyên truyền, quán triệt nghị quyết của Đảng, chính sách pháp luật của Nhà nước. Hằng năm mỗi khu dân cư có ít nhất 01 công trình, mô hình hoặc phần việc tiêu biểu, góp phần xây dựng đời sống văn hóa, cảnh quan sáng – xanh – sạch – đẹp. 100% khu dân cư tổ chức Ngày hội Đại đoàn kết toàn dân tộc; 100% hộ gia đình tham gia vận động ủng hộ Quỹ “Vì người nghèo”. Mặt trận xã và các tổ chức thành viên hằng năm tổ chức tối thiểu 02 cuộc giám sát, phản biện xã hội; 100% hoạt động Ban Thanh tra Nhân dân và Ban Giám sát đầu tư cộng đồng đạt hiệu quả. 80% Ban Công tác Mặt trận khu dân cư ứng dụng công nghệ thông tin trong triển khai nhiệm vụ; 100% cán bộ MTTQ xã thành thạo CNTT. Tăng cường xây dựng nông thôn mới nâng cao, góp phần thực hiện thắng lợi các mục tiêu phát triển KT – XH, đảm bảo quốc phòng – an ninh ở địa phương.
🌸 Đại hội đã hiệp thương dân chủ, thống nhất cử ra 57 đồng chí Ủy viên Ủy ban MTTQ Việt Nam xã Phong Hải khóa I, nhiệm kỳ 2025 – 2030; đồng thời bầu Ban Thường trực gồm 05 đồng chí (01 Chủ tịch, 04 Phó Chủ tịch), bảo đảm tiêu biểu về phẩm chất, năng lực, đại diện cho khối đại đoàn kết toàn dân.
💐 Với chủ đề: “Đoàn kết – Dân chủ – Kỷ cương – Sáng tạo – Phát triển”, Đại hội kêu gọi toàn thể các tầng lớp Nhân dân các dân tộc trong xã tiếp tục phát huy truyền thống đoàn kết, nêu cao ý chí tự lực, tự cường, thi đua sáng tạo, góp phần xây dựng xã Phong Hải ngày càng giàu đẹp – văn minh – hạnh phúc.
🇻🇳 Đại hội đại biểu MTTQ Việt Nam xã Phong Hải lần thứ I, nhiệm kỳ 2025 – 2030 đã thành công tốt đẹp, mở ra một chặng đường mới đầy tin tưởng và kỳ vọng! 🇻🇳`,
  },
  {
    titleVi: "🌸🇻🇳 ĐẠI HỘI ĐẠI BIỂU MTTQ VIỆT NAM XÃ PHONG HẢI LẦN THỨ I, NHIỆM KỲ 2025 – 2030 (Phiên thứ nhất)",
    categorySlug: "tin-tuc-su-kien",
    publishedAt: "2025-09-26",
    contentVi: `Chiều ngày 26/9/2025, Ủy ban MTTQ Việt Nam xã Phong Hải long trọng tổ chức phiên thứ nhất Đại hội Đại biểu MTTQ Việt Nam xã Phong Hải lần thứ I, nhiệm kỳ 2025 – 2030.
Đại hội vinh dự được đón tiếp: Ông Phạm Văn Viên – Phó Bí thư Thường trực Đảng ủy xã. Ông Vũ Trung Dũng – Phó Bí thư, Chủ tịch UBND xã. Các đồng chí trong Ban Thường vụ Đảng ủy, Ban Chấp hành Đảng bộ xã. Cùng 135/135 đại biểu chính thức tham dự Đại hội.
Tại Đại hội, các đại biểu đã nghe và thảo luận nhiều nội dung quan trọng: Thông qua báo cáo tổng hợp tình hình đại biểu, báo cáo kiểm điểm, đóng góp ý kiến vào dự thảo văn kiện. Đại hội đã được lắng nghe 03 ý kiến tham luận trực tiếp của đại biểu, tập trung vào các giải pháp nâng cao hiệu quả hoạt động của MTTQ trong nhiệm kỳ mới.
Đặc biệt, Đại hội đã được nghe phát biểu chỉ đạo sâu sắc của Đảng ủy xã, định hướng những nhiệm vụ trọng tâm, khẳng định vai trò nòng cốt của Mặt trận trong việc tăng cường khối đại đoàn kết toàn dân, phát huy dân chủ và sức mạnh nhân dân để xây dựng quê hương Phong Hải ngày càng phát triển.
Đại hội đã hiệp thương cử ra 57 vị Ủy viên Ủy ban MTTQ Việt Nam xã Phong Hải khóa I, nhiệm kỳ 2025 – 2030; đồng thời tổ chức Hội nghị lần thứ nhất để bầu các chức danh chủ chốt: Chủ tịch, Phó Chủ tịch và Ban Thường trực Ủy ban MTTQ xã.
👉 Ngày mai (27/9/2025), phiên thứ hai của Đại hội sẽ tiếp tục diễn ra với các nội dung trọng tâm: trình bày báo cáo tổng kết nhiệm kỳ 2024 – 2029 và phương hướng, mục tiêu, chương trình hành động nhiệm kỳ 2025 – 2030; hiệp thương cử đoàn đại biểu đi dự Đại hội MTTQ Việt Nam tỉnh Lào Cai lần thứ I nhiệm kỳ 2025-2030; thông qua nghị quyết và bế mạc Đại hội.
🌸 Với sự chuẩn bị chu đáo, Đại hội hứa hẹn sẽ tiếp tục thành công tốt đẹp, tạo khí thế mới cho công tác Mặt trận trong giai đoạn tới. 🌸`,
  },
  {
    titleVi: "🌸🇻🇳 TRI ÂN ANH HÙNG LIỆT SĨ – HƯỚNG VỀ ĐẠI HỘI 🇻🇳🌸",
    categorySlug: "tin-tuc-su-kien",
    publishedAt: "2025-09-26",
    contentVi: `Sáng ngày 26/9/2025, trước thềm Đại hội MTTQ Việt Nam và các tổ chức chính trị - xã hội xã Phong Hải lần thứ nhất, nhiệm kỳ 2025 – 2030, Ủy ban MTTQ Việt Nam cùng các tổ chức chính trị - xã hội xã đã long trọng tổ chức Lễ dâng hương, dâng hoa tại Nghĩa trang liệt sĩ xã Phong Hải.
Trong không khí trang nghiêm, các đại biểu đã kính cẩn dâng hương, dâng hoa tưởng nhớ các anh hùng liệt sĩ – những người con ưu tú của quê hương, đã anh dũng hy sinh cho sự nghiệp đấu tranh giải phóng dân tộc, thống nhất đất nước.
Hoạt động là dịp để bày tỏ lòng thành kính và tri ân sâu sắc đối với công lao to lớn của các thế hệ cha anh đi trước; đồng thời cũng là dịp để báo công, báo cáo trước anh linh các liệt sĩ về những kết quả nổi bật mà MTTQ và các tổ chức chính trị - xã hội xã đã đạt được trong thời gian qua.
🌟 Trước anh linh các liệt sĩ, cán bộ, đảng viên và nhân dân xã Phong Hải nguyện phát huy truyền thống anh hùng, tiếp tục đoàn kết, đổi mới, sáng tạo, xây dựng khối đại đoàn kết toàn dân tộc vững chắc; ra sức thi đua lập nhiều thành tích thiết thực, góp phần vào thành công của Đại hội MTTQ Việt Nam và các tổ chức chính trị - xã hội xã Phong Hải nhiệm kỳ 2025 – 2030.`,
  },
  {
    titleVi: "🌸 HỘI NGHỊ ỦY BAN MTTQ VIỆT NAM XÃ PHONG HẢI LẦN THỨ 3, NHIỆM KỲ 2024-2029 🌸",
    categorySlug: "tin-tuc-su-kien",
    publishedAt: "2025-09-17",
    contentVi: `Sáng ngày 17/9/2025, tại Hội trường Nhà văn hoá thôn 4, Ủy ban MTTQ Việt Nam xã Phong Hải tổ chức Hội nghị Ủy ban MTTQ xã lần thứ 3, nhiệm kỳ 2024-2029.
Hội nghị được tổ chức nhằm thực hiện công tác chuẩn bị Đại hội Đại biểu MTTQ Việt Nam xã Phong Hải lần thứ nhất, nhiệm kỳ 2025-2030; đồng thời lấy ý kiến đóng góp vào dự thảo văn kiện Đại hội Đại biểu MTTQ Việt Nam xã Phong Hải lần thứ nhất, nhiệm kỳ 2025-2030 và Đại hội Đại biểu MTTQ Việt Nam tỉnh Lào Cai nhiệm kỳ 2025-2030.
Tham dự hội nghị có các đồng chí lãnh đạo Đảng ủy, HĐND, UBND xã; các đồng chí nguyên lãnh đạo MTTQ Việt Nam xã Bản Cầm và TTNT Phong Hải qua các thời kỳ; các vị Ủy viên Ủy ban MTTQ Việt Nam xã Phong Hải cùng đại diện các tổ chức thành viên.
➡️ Hội nghị diễn ra trong không khí dân chủ, đoàn kết và trách nhiệm, thể hiện tinh thần chuẩn bị chu đáo cho Đại hội MTTQ xã Phong Hải lần thứ nhất, nhiệm kỳ 2025-2030.`,
  },
  {
    titleVi: "🇻🇳 HỘI NGHỊ ĐIỂN HÌNH TIÊN TIẾN LẦN THỨ I, GIAI ĐOẠN 2025 – 2030 🇻🇳",
    categorySlug: "mo-hinh-hay",
    publishedAt: "2025-09-10",
    contentVi: `Chiều ngày 10/9/2025, tại nhà đa năng Trường PTDTBT Tiểu học số 2 Phong Hải, UBND – Ủy ban MTTQ Việt Nam xã Phong Hải đã phối hợp tổ chức Hội nghị điển hình tiên tiến lần thứ I, giai đoạn 2025 – 2030.
✨ Hội nghị là dịp quan trọng nhằm tổng kết, đánh giá kết quả các phong trào thi đua yêu nước giai đoạn 2021 – 2025; đồng thời tuyên dương, khen thưởng 06 tập thể và 09 cá nhân điển hình tiên tiến có nhiều thành tích xuất sắc, đóng góp tích cực cho sự phát triển chung của địa phương.
🤝 Tại hội nghị, nhiều tham luận tiêu biểu đã được trình bày, chia sẻ những kinh nghiệm quý báu trong quá trình thực hiện các phong trào thi đua. Đặc biệt, ý kiến phát biểu, chỉ đạo của lãnh đạo Đảng ủy và UBND xã đã khẳng định quyết tâm, định hướng rõ ràng để phong trào thi đua tiếp tục lan tỏa sâu rộng trong Nhân dân.
🚀 Đồng chí Chủ tịch UBND xã đã phát động phong trào thi đua giai đoạn 2025 – 2030, kêu gọi toàn thể cán bộ, đảng viên, đoàn viên, hội viên các đoàn thể và Nhân dân tiếp tục phát huy sức mạnh đoàn kết, chung tay xây dựng quê hương Phong Hải ngày càng giàu đẹp, văn minh.
🌸 Ủy ban MTTQ Việt Nam xã Phong Hải tin tưởng rằng, với sự chung sức đồng lòng của cả hệ thống chính trị và Nhân dân, các phong trào thi đua yêu nước sẽ tiếp tục đạt nhiều kết quả nổi bật, góp phần thực hiện thắng lợi các mục tiêu phát triển của xã trong giai đoạn mới.`,
  },
  {
    titleVi: "🌸 XÃ PHONG HẢI CHI TRẢ QUÀ TRUNG ƯƠNG NHÂN DỊP QUỐC KHÁNH 02/9 🌸",
    categorySlug: "tin-tuc-su-kien",
    publishedAt: "2025-09-01",
    contentVi: `Nhân dịp kỷ niệm 80 năm Quốc khánh nước Cộng hòa xã hội chủ nghĩa Việt Nam (02/9/1945 – 02/9/2025), thực hiện chủ trương của Trung ương, ngày 01/9/2025, UBND xã Phong Hải đã tổ chức chi trả quà tặng của Trung ương tới toàn thể Nhân dân trên địa bàn. Theo đó, mỗi người dân được hỗ trợ 100.000 đồng.
Tại xã Phong Hải, có trên 16.800 người dân được nhận quà, với tổng số tiền trên 1,68 tỷ đồng.
Với vai trò là tổ chức đại diện, chăm lo và bảo vệ quyền, lợi ích hợp pháp, chính đáng của Nhân dân, Ủy ban MTTQ Việt Nam xã Phong Hải đã phối hợp chặt chẽ với UBND xã và các thôn, bản để giám sát việc chi trả, bảo đảm công khai, minh bạch, đúng đối tượng, đúng thời gian quy định. MTTQ xã cũng lắng nghe, tiếp nhận phản ánh từ Nhân dân, kịp thời kiến nghị giải quyết những vấn đề phát sinh, để mọi người dân đều được thụ hưởng chính sách.
Hoạt động ý nghĩa này không chỉ thể hiện sự quan tâm sâu sắc của Đảng, Nhà nước đối với đời sống Nhân dân, mà còn góp phần củng cố niềm tin của Nhân dân vào sự lãnh đạo của Đảng, Nhà nước; phát huy sức mạnh khối đại đoàn kết toàn dân tộc, tạo khí thế phấn khởi, đồng lòng cùng địa phương thực hiện thắng lợi các mục tiêu phát triển kinh tế - xã hội.`,
  },
  {
    titleVi: "🇻🇳 PHÁT HUY VAI TRÒ MTTQ TRONG VẬN ĐỘNG NHÂN DÂN VỆ SINH MÔI TRƯỜNG, CHÀO MỪNG 80 NĂM QUỐC KHÁNH NƯỚC CHXHCN VIỆT NAM 🇻🇳",
    categorySlug: "tin-tuc-su-kien",
    publishedAt: "2025-08-30",
    contentVi: `Hướng tới kỷ niệm 80 năm Quốc khánh nước Cộng hòa xã hội chủ nghĩa Việt Nam (02/9/1945 – 02/9/2025), Ủy ban MTTQ Việt Nam xã Phong Hải đã chỉ đạo các Ban công tác Mặt trận thôn phối hợp cùng các đoàn thể, vận động nhân dân tích cực ra quân tổng vệ sinh đường làng, ngõ xóm, chỉnh trang cảnh quan môi trường.
Với vai trò là trung tâm đoàn kết, tập hợp sức mạnh khối đại đoàn kết toàn dân, MTTQ xã đã phát huy tốt công tác tuyên truyền, vận động, khơi dậy tinh thần trách nhiệm và ý thức cộng đồng của mỗi người dân. Nhờ đó, phong trào vệ sinh môi trường không chỉ dừng lại ở những hoạt động bề nổi, mà đã trở thành việc làm thường xuyên, gắn bó chặt chẽ với đời sống hàng ngày của bà con.
💠 Qua hoạt động này, nhân dân các thôn đã cùng nhau quét dọn, khơi thông rãnh thoát nước, thu gom rác thải, phát quang bụi rậm, tạo cảnh quan sáng – xanh – sạch – đẹp, góp phần nâng cao chất lượng cuộc sống, xây dựng nông thôn mới bền vững.
💠 Đây là việc làm thiết thực của MTTQ và nhân dân xã Phong Hải nhằm góp phần bảo vệ môi trường, lan tỏa tinh thần đoàn kết, đồng lòng hướng về ngày lễ trọng đại của dân tộc, đồng thời thể hiện rõ vai trò nòng cốt của Mặt trận trong việc phát động và tổ chức các phong trào thi đua yêu nước.
🌿 Với sự vào cuộc trách nhiệm của MTTQ và sự hưởng ứng tích cực của nhân dân, phong trào vệ sinh môi trường đã tạo nên bầu không khí thi đua sôi nổi, thể hiện tình cảm, niềm tự hào và lòng biết ơn sâu sắc của toàn dân trước ngày Quốc khánh thiêng liêng của Tổ quốc.`,
  },
  {
    titleVi: "🇻🇳 DÂNG HƯƠNG TƯỞNG NHỚ CÁC ANH HÙNG LIỆT SỸ NHÂN KỶ NIỆM 80 NĂM QUỐC KHÁNH NƯỚC CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM (02/9/1945 – 02/9/2025) 🇻🇳",
    categorySlug: "tin-tuc-su-kien",
    publishedAt: "2025-08-29",
    contentVi: `Sáng ngày 29/8/2025, Đảng ủy, HĐND, UBND, Ủy ban MTTQ Việt Nam xã Phong Hải đã trang trọng tổ chức Lễ dâng hương, viếng nghĩa trang liệt sĩ xã Phong Hải nhân kỷ niệm 80 năm Quốc khánh.
Trong không khí thiêng liêng và trang nghiêm, các đồng chí lãnh đạo, cán bộ, công chức, lực lượng vũ trang cùng đại diện các ban, ngành, đoàn thể đã thành kính dâng hương, dâng hoa tưởng niệm các anh hùng liệt sĩ – những người con ưu tú của quê hương đã anh dũng hy sinh vì độc lập, tự do của Tổ quốc.
Hoạt động dâng hương là dịp để bày tỏ lòng tri ân sâu sắc đối với công lao to lớn của các thế hệ cha anh, đồng thời góp phần giáo dục truyền thống yêu nước, hun đúc tinh thần cách mạng cho thế hệ hôm nay và mai sau; tiếp tục phát huy sức mạnh đoàn kết xây dựng quê hương Phong Hải ngày càng giàu đẹp, văn minh.
🌺 Đời đời ghi nhớ công ơn các anh hùng liệt sĩ! 🌺`,
  },
  {
    titleVi: "🇻🇳 ỦY BAN MTTQ VIỆT NAM XÃ PHONG HẢI HƯỞNG ỨNG CHƯƠNG TRÌNH “CÙNG VIỆT NAM TIẾN BƯỚC” 🇻🇳",
    categorySlug: "tin-tuc-su-kien",
    publishedAt: "2025-08-16",
    contentVi: `✨ Hòa trong không khí thi đua sôi nổi chào mừng 80 năm Cách mạng Tháng Tám, Quốc khánh 2/9 (02/9/1945 – 02/9/2025) và 80 năm Ngày Truyền thống Công an Nhân dân (19/8/1945 – 19/8/2025), sáng ngày 16/8/2025, Ủy ban MTTQ Việt Nam xã Phong Hải đã cùng với Đảng ủy, HĐND, UBND và các đoàn thể xã nhà tham gia hoạt động đi bộ hưởng ứng chương trình “Cùng Việt Nam Tiến Bước” do Báo Nhân Dân phối hợp Bộ Công an phát động.
🚶‍♂️🚶‍♀️ Chương trình diễn ra từ 6h00 đến 7h30, thu hút đông đảo cán bộ, đảng viên, đoàn viên, hội viên, lực lượng công an và nhân dân trên địa bàn. Trong màu áo đỏ sao vàng rực rỡ, mọi người cùng cất vang Quốc ca và tiến bước trên các tuyến đường trung tâm xã. Hình ảnh đoàn người đồng loạt sải bước, rộn ràng khí thế, đã để lại ấn tượng đẹp, lan tỏa tinh thần đoàn kết, gắn bó và niềm tự hào dân tộc.
🌿 Tham gia hoạt động, MTTQ xã Phong Hải không chỉ phát huy vai trò là trung tâm đoàn kết, tập hợp các tầng lớp nhân dân, mà còn góp phần nâng cao nhận thức về luyện tập thể thao, bảo vệ sức khỏe, giữ gìn môi trường sống xanh - sạch - đẹp. Đây cũng là dịp để nhân dân cùng nhau thể hiện tinh thần trách nhiệm, khẳng định quyết tâm đồng hành cùng cấp ủy, chính quyền trong xây dựng quê hương Phong Hải ngày càng phát triển.
🔥 Hoạt động đi bộ hưởng ứng chương trình “Cùng Việt Nam Tiến Bước” chính là minh chứng sinh động cho sức mạnh đại đoàn kết toàn dân tộc – yếu tố quyết định để mỗi người dân Phong Hải thêm tự hào, thêm động lực phấn đấu, cùng nhau viết tiếp những trang mới cho sự phát triển của quê hương trong giai đoạn mới.`,
  },
  {
    titleVi: "XÃ PHONG HẢI TỔ CHỨC LỄ KỶ NIỆM 80 NĂM NGÀY TRUYỀN THỐNG CÔNG AN NHÂN DÂN VÀ 20 NĂM NGÀY HỘI TOÀN DÂN BẢO VỆ AN NINH TỔ QUỐC",
    categorySlug: "tin-tuc-su-kien",
    publishedAt: "2025-08-15",
    contentVi: `Chiều ngày 15/8, tại Hội trường UBND xã Phong Hải, Đảng uỷ, HĐND, UBND, UBMTTQ xã long trọng tổ chức Lễ kỷ niệm 80 năm Ngày truyền thống Công an nhân dân (19/8/1945 – 19/8/2025) và 20 năm Ngày hội Toàn dân bảo vệ an ninh Tổ quốc (19/8/2005 – 19/8/2025).
Tham dự buổi lễ có các đồng chí Thường trực Đảng uỷ, HĐND, UBND, UBMTTQ xã; Công an xã; lực lượng đảm bảo an ninh cơ sở; bí thư chi bộ, trưởng thôn; đại diện các cơ quan, đơn vị đóng trên địa bàn; các đồng chí nguyên lãnh đạo Công an xã, nguyên lãnh đạo địa phương qua các thời kỳ.
Tại buổi lễ, các đại biểu đã cùng nhau ôn lại truyền thống 80 năm xây dựng, chiến đấu và trưởng thành của lực lượng Công an nhân dân Việt Nam, 20 năm Ngày hội Toàn dân bảo vệ an ninh Tổ quốc; khẳng định vai trò nòng cốt của lực lượng Công an trong sự nghiệp bảo vệ an ninh quốc gia, giữ gìn trật tự, an toàn xã hội, đồng thời ghi nhận sự chung sức, đồng lòng của nhân dân trong phong trào toàn dân bảo vệ an ninh Tổ quốc.
Buổi lễ diễn ra trong không khí trang trọng, thắm tình đoàn kết quân – dân, tiếp thêm động lực để lực lượng Công an và nhân dân xã Phong Hải tiếp tục phát huy truyền thống, nỗ lực hoàn thành xuất sắc nhiệm vụ bảo vệ an ninh, trật tự trong tình hình mới.`,
  },
  {
    titleVi: "MTTQ XÃ PHONG HẢI PHỐI HỢP TỔ CHỨC TIẾP XÚC CỬ TRI SAU KỲ HỌP THƯỜNG LỆ GIỮA NĂM 2025",
    categorySlug: "tin-tuc-su-kien",
    publishedAt: "2025-08-14",
    contentVi: `Sáng 14/8/2025, thực hiện chức năng đại diện, bảo vệ quyền và lợi ích hợp pháp, chính đáng của nhân dân, Ủy ban MTTQ Việt Nam xã Phong Hải đã phối hợp cùng Thường trực HĐND xã tổ chức hội nghị tiếp xúc cử tri sau kỳ họp thường lệ giữa năm 2025 tại hai thôn Bản Lọt và Na Năng (thuộc xã Bản Cầm trước sáp nhập).
Tại hội nghị, đại biểu HĐND xã đã thông tin tới cử tri kết quả thực hiện nhiệm vụ phát triển kinh tế – xã hội 6 tháng đầu năm, cũng như những nội dung quan trọng được quyết nghị tại kỳ họp thường lệ giữa năm. Đây là dịp để MTTQ xã thực hiện tốt vai trò cầu nối giữa cử tri với chính quyền, lắng nghe và tập hợp ý kiến, nguyện vọng của nhân dân.
Không khí hội nghị diễn ra sôi nổi, dân chủ với 11 lượt ý kiến trực tiếp và nhiều kiến nghị bằng văn bản. Nội dung tập trung vào các vấn đề được đông đảo người dân quan tâm như: quản lý, sử dụng đất đai; tài nguyên – môi trường; chính sách an sinh xã hội; phản ánh tình trạng khai thác mỏ đá trên địa bàn. Đại diện UBND xã và các phòng ban chuyên môn đã trực tiếp giải đáp, làm rõ một số nội dung thuộc thẩm quyền.
Đồng chí Bùi Quang Hưng – Tỉnh ủy viên, Bí thư Đảng ủy, Chủ tịch HĐND xã – đã thông tin tới cử tri về kết quả Đại hội đại biểu Đảng bộ xã Phong Hải khóa I, nhiệm kỳ 2025-2030. Toàn bộ ý kiến, kiến nghị của cử tri đã được MTTQ xã tổng hợp, phân loại và chuyển tới các cơ quan chức năng để xem xét, giải quyết theo quy định.
Hoạt động tiếp xúc cử tri lần này khẳng định vai trò của MTTQ Việt Nam xã Phong Hải trong việc phát huy dân chủ, tăng cường mối liên hệ gắn bó giữa nhân dân với Đảng và chính quyền, góp phần xây dựng khối đại đoàn kết toàn dân và thúc đẩy sự phát triển bền vững của địa phương.`,
  },
  {
    titleVi: "MẶT TRẬN TỔ QUỐC THAM GIA TIẾP XÚC CỬ TRI SAU KỲ HỌP THƯỜNG LỆ GIỮA NĂM 2025",
    categorySlug: "tin-tuc-su-kien",
    publishedAt: "2025-08-13",
    contentVi: `Sáng ngày 13/8/2025, Thường trực HĐND xã Phong Hải khóa I, nhiệm kỳ 2021 – 2026 tổ chức hội nghị tiếp xúc cử tri sau kỳ họp thường lệ giữa năm với cử tri thôn 2 và thôn 3. Thường trực Ủy ban MTTQ Việt Nam xã tham dự, phối hợp cùng Thường trực HĐND và UBND xã tổ chức hội nghị.
Tại hội nghị, các đại biểu HĐND xã đã thông tin tới cử tri kết quả phát triển kinh tế – xã hội 6 tháng đầu năm, kết quả kỳ họp thường lệ giữa năm của HĐND xã. Không khí trao đổi dân chủ, cởi mở với 08 lượt ý kiến trực tiếp và các ý kiến góp ý bằng văn bản từ cử tri tập trung vào các lĩnh vực: quản lý, sử dụng đất đai; tài nguyên – môi trường; thực hiện các chính sách và một số vấn đề dân sinh bức xúc khác.
Phát huy vai trò là tổ chức đại diện, bảo vệ quyền và lợi ích hợp pháp, chính đáng của nhân dân, Ủy ban MTTQ Việt Nam xã đã chủ động phối hợp tổng hợp, ghi nhận đầy đủ các ý kiến, kiến nghị của cử tri; đồng thời giám sát việc giải đáp, trả lời của UBND xã và đại biểu HĐND.
Cũng tại hội nghị, đồng chí Bùi Quang Hưng – TUV, Bí thư Đảng ủy, Chủ tịch HĐND xã đã thông tin về kết quả Đại hội đại biểu Đảng bộ xã Phong Hải khóa I, nhiệm kỳ 2025-2030, đồng thời khẳng định quyết tâm của cấp ủy, chính quyền trong việc tiếp thu, giải quyết các kiến nghị của nhân dân.
Hoạt động tiếp xúc cử tri là dịp để Mặt trận Tổ quốc tăng cường vai trò cầu nối giữa Đảng, chính quyền và nhân dân, góp phần củng cố khối đại đoàn kết toàn dân tộc, tạo sự đồng thuận để hoàn thành thắng lợi các nhiệm vụ phát triển kinh tế – xã hội của địa phương.`,
  },
  {
    titleVi: "ĐẠI HỘI ĐẠI BIỂU ĐẢNG BỘ XÃ PHONG HẢI LẦN THỨ NHẤT NHIỆM KỲ 2025 – 2030",
    categorySlug: "tin-tuc-su-kien",
    publishedAt: "2025-08-11",
    contentVi: `Sáng ngày 11/8, Đảng bộ xã phong Hải tổ chức Đại hội đại biểu Đảng bộ lần thứ Nhất, nhiệm kỳ 2025 – 2030. Đồng chí Nguyễn Tuấn Anh, Phó Bí thư Tỉnh ủy Lào Cai dự và chỉ đạo Đại hội. Dự Đại hội có đồng chí Bùi Quang Vinh, Nguyên Ủy Viên BCH Trung ương Đảng, Nguyên Bộ trưởng Bộ Kế hoạch và Đầu tư, nguyên Bí thư Tỉnh ủy Lào Cai. Các đồng chí trong Tổ công tác chỉ đạo Đại hội tỉnh và lãnh đạo một số sở, ngành cùng 136 đại biểu đại diện cho 694 đảng viên của Đảng bộ xã dự Đại hội.
Phát biểu khai mạc Đại hội, đồng chí Bùi Quang Hưng, Tỉnh ủy viên, Bí thư Đảng ủy xã Phong Hải nhấn mạnh: Nhiệm kỳ qua, mặc dù còn gặp nhiều khó khăn. Song Nhân dân các dân tộc thuộc 2 xã trước khi sáp nhập đã nỗ lực phấn đấu đạt được những thành tựu quan trọng, rất đáng tự hào; Đảng bộ xã đã phát huy lợi thế mới, xây dựng hệ thống chính trị vững mạnh và đạt nhiều thành tựu quan trọng trên các lĩnh vực. Công tác xây dựng, chỉnh đốn Đảng và hệ thống chính trị được triển khai đồng bộ, hiệu quả. Công tác tổ chức bộ máy, cán bộ được sắp xếp tinh gọn, hiệu quả. Hiệu lực, hiệu quả hoạt động của chính quyền ngày càng được nâng cao, cải cách hành chính được đẩy mạnh, góp phần xây dựng nền hành chính hiện đại, phục vụ nhân dân.
Nhiệm kỳ qua, với sự tập trung lãnh đạo, chỉ đạo sâu sát, kịp thời của các cấp ủy Đảng, chính quyền, đoàn thể và sự quyết tâm phấn đấu của Đảng bộ, Nhân dân các dân tộc, xã Phong Hải đã đạt nhiều kết quả tích cực, các chỉ tiêu đề ra đều đạt và vượt so với mục tiêu nghị quyết.
Cơ cấu kinh tế chuyển biến tích cực, tiểu thủ công nghiệp và dịch vụ, thương mại ngày càng tăng. Trên địa bàn xã có 342 hộ kinh doanh dịch vụ, tiểu thủ công nghiệp, tăng 152 hộ so với đầu nhiệm kỳ. Các cơ sở sản xuất tiểu thủ công nghiệp trên địa bàn phát triển, tạo cơ hội việc làm ổn định cho nhiều lao động. Chỉ riêng lĩnh vực tiểu thủ công nghiệp, dịch vụ đã tạo việc làm cho trên 1.000 lao động. Trong đó, giá trị tiểu thủ công nghiệp đạt 166,3 tỷ đồng, tăng 54 tỷ đồng so với đầu nhiệm kỳ, tổng mức bán lẻ hàng hoá và dịch vụ ước thu 50 tỷ đồng đạt 106,3% kế hoạch; Thương mại dịch vụ đạt 67 tỷ đồng, tăng 32,5 tỷ đồng so với đầu nhiệm kỳ. Thu ngân sách Nhà nước tăng trưởng tốt, trung bình trong 5 năm qua đạt 121% so với mục tiêu Đại hội.
Nông nghiệp đã có nhiều chuyển biến tích cực, tư duy, phương thức sản xuất của người nông dân có sự đổi thay tích cực từ “sản xuất nông nghiệp” sang “kinh tế nông nghiệp”. Giá trị sản phẩm nông, lâm nghiệp và thủy sản trên 1 ha đất sản xuất nông nghiệp, đất nuôi trồng thủy sản đạt 115 triệu đồng, tăng 48,6 triệu đồng/ha so với năm 2020. Thu nhập bình quân đầu người đạt 67,5 triệu đồng/người/năm, tăng 47 triệu so với đầu nhiệm kỳ. Công tác giảm nghèo bền vững luôn được quan tâm chú trọng, đến nay tỷ lệ nghèo toàn xã còn 3,49%; hộ cận nghèo chiếm 7,9%. Tỷ lệ hộ khá, giàu tăng đáng kể, đặc biệt tại các thôn có điều kiện phát triển nông nghiệp hàng hóa.
Tại Đại hội, Đảng bộ xã đã đề ra 18 chỉ tiêu cụ thể, trong đó, tốc độ tăng tổng giá trị sản phẩm trên địa bàn bình quân 10,2%/năm; thu nhập bình quân đầu người đạt 75 triệu đồng/năm và tỷ lệ hộ nghèo đến năm 2030 (theo chuẩn nghèo đa chiều giai đoạn 2026-2030) còn 3,5 - 4%, và tỷ lệ lao động đã qua đào tạo số 75%. Trong đó: Tỷ lệ lao động đã qua đào tạo có bằng cấp, chứng chỉ 37% trở lên; Tỷ lệ bao phủ bảo hiểm y tế 97% trở lên và đặc biệt chỉ số hạnh phúc của người dân đạt 72,5% trở lên.
Phát biểu chỉ đạo Đại hội, đồng chí Nguyễn Tuấn Anh, Phó Bí thư Tỉnh ủy Lào Cai đề nghị Đảng bộ xã Phong Hải cần tập trung xây dựng Đảng bộ trong sạch vững mạnh, đáp ứng yêu cầu của mô hình chính quyền địa phương 2 cấp; phát huy sức mạnh đại đoàn kết và khát vọng vươn lên; huy động và sử dụng hiệu quả mọi nguồn lực, từng bước phát triển hạ tầng giao thông, công nghiệp, thương mại, dịch vụ; đẩy mạnh phát triển nông, lâm nghiệp, thuỷ sản theo hướng sản xuất hàng hóa, chuyển đổi cơ cấu một số cây trồng mới có giá trị kinh tế cao, thúc đẩy phát triển kinh tế nhanh, bền vững gắn với thực hiện tiến bộ và công bằng xã hội, nâng cao đời sống vật chất, tinh thần Nhân dân, đặc biệt ở vùng khó khăn.
Đồng chí cũng lưu ý, Phong Hải cần tập trung phát triển ngành thủy sản thành ngành kinh tế chủ lực, xây dựng thương hiệu thủy sản Phong Hải gắn với chuỗi giá trị sản xuất - chế biến - tiêu thụ, ứng dụng công nghệ cao và thích ứng biến đổi khí hậu. Phát triển đồng bộ kết cấu hạ tầng kinh tế - xã hội, ưu tiên đầu tư khu trung tâm hành chính - dịch vụ làm hạt nhân lan tỏa; kết nối hiệu quả các vùng sản xuất, dân cư với trục Quốc lộ 70 và vùng lân cận; tạo động lực phát triển thương mại, tiểu thủ công nghiệp, thúc đẩy đô thị hóa nông thôn.
Đặc biệt xã bảo đảm tất cả trẻ em được đến trường, giảm thiểu tình trạng bỏ học, đặc biệt là trẻ em vùng cao, vùng đồng bào dân tộc thiểu số, vùng khó khăn bằng việc phát huy các nguồn lực, nâng cao chất lượng trường học, nhà trẻ, điểm trường vùng khó. Xây dựng mô hình “Trường học hạnh phúc”, “Gia đình hạnh phúc”, “Thôn bản hạnh phúc” góp phần lan rộng mối quan hệ cộng đồng, thân thiện với tinh thần truyền thống văn hóa thúc đẩy đoàn kết dân tộc.
Đại hội đã công bố Quyết định của Tỉnh ủy về chỉ định ủy viên Ban Chấp hành Đảng bộ xã Phong Hải nhiệm kỳ 2025 – 2030 với 27 đồng chí; đồng chí Bùi Quang Hưng, Ủy viên Ban chấp hành Đảng bộ tỉnh Lào Cai được Tỉnh ủy chỉ định giữ chức vụ Bí thư Đảng ủy, Chủ tịch HĐND xã Phong Hải nhiệm kỳ 2025 - 2030.
Với phương châm “Đoàn kết - Dân chủ - Kỷ cương - Sáng tạo - Phát triển”. Đại hội đại biểu Đảng bộ xã Phong Hải quyết tâm thực hiện thắng lợi mục tiêu: “Xây dựng Đảng và hệ thống chính trị trong sạch, vững mạnh; phát huy sức mạnh đại đoàn kết toàn dân; khai thác hiệu quả các động lực tăng trưởng mới, tạo bước đột phá xây dựng xã Phong Hải phát triển toàn diện, bền vững”.`,
  },
  {
    titleVi: "🌿 PHONG HẢI SÔI NỔI RA QUÂN TỔNG VỆ SINH MÔI TRƯỜNG CHÀO MỪNG ĐẠI HỘI ĐẢNG BỘ XÃ PHONG HẢI LẦN THỨ I, NHIỆM KỲ 2025-2030🌿",
    categorySlug: "tin-tuc-su-kien",
    publishedAt: "2025-08-09",
    contentVi: `Hướng tới Đại hội đại biểu Đảng bộ xã Phong Hải lần thứ I, nhiệm kỳ 2025 – 2030, Ủy ban MTTQ Việt Nam xã Phong Hải đã phát huy vai trò là trung tâm đoàn kết, tập hợp các tầng lớp nhân dân, chủ động xây dựng kế hoạch, chỉ đạo Ban Công tác Mặt trận các thôn tổ chức nhiều hoạt động thiết thực, ý nghĩa.
Trong đó, hoạt động đồng loạt ra quân tổng vệ sinh môi trường, chỉnh trang đô thị, đường làng, ngõ xóm được xác định là nhiệm vụ trọng tâm, vừa tạo cảnh quan sạch đẹp, vừa góp phần tuyên truyền, cổ vũ cán bộ, đảng viên và nhân dân hướng về sự kiện chính trị trọng đại của địa phương.
💪 Sáng ngày 09/08/2025, hưởng ứng lời kêu gọi của MTTQ xã, toàn bộ 21/21 thôn trên địa bàn đã đồng loạt ra quân. Hàng trăm cán bộ, đảng viên, đoàn viên, hội viên và bà con nhân dân tích cực tham gia quét dọn, phát quang bụi rậm, thu gom rác thải, trồng và chăm sóc cây xanh. Từng con đường, ngõ xóm như được khoác “tấm áo mới” sạch đẹp, khang trang hơn.
🌸 Hoạt động này không chỉ góp phần xây dựng xã Phong Hải xanh – sạch – đẹp, mà còn thể hiện tinh thần đoàn kết, sự đồng lòng của nhân dân dưới sự dẫn dắt, vận động của MTTQ xã. Đây cũng là hình thức tuyên truyền trực quan, sinh động, khơi dậy niềm tự hào, trách nhiệm và ý thức xây dựng quê hương trong mỗi người dân.
🎯 Với vai trò là cầu nối giữa Đảng, chính quyền và nhân dân, Ủy ban MTTQ Việt Nam xã Phong Hải tiếp tục đẩy mạnh các phong trào thi đua, vận động các tầng lớp nhân dân tích cực tham gia các hoạt động chào mừng Đại hội, góp phần vào thành công chung của Đại hội đại biểu Đảng bộ xã lần thứ I.
📸 Sau đây là một số hình ảnh của hoạt động.`,
  },
  {
    titleVi: "📣 TRÂN TRỌNG THÔNG BÁO LỊCH DIỄN RA ĐẠI HỘI ĐẠI BIỂU ĐẢNG BỘ XÃ PHONG HẢI LẦN THỨ I, NHIỆM KỲ 2025–2030",
    categorySlug: "tin-tuc-su-kien",
    publishedAt: "2025-08-01",
    contentVi: `🎯 Thời gian tổ chức Đại hội: từ ngày 10/08 đến 11/08/2025, tại Nhà đa năng Trường PTDTBT Tiểu học số 2 Phong Hải.
🔥 Các hoạt động chào mừng Đại hội:
🏐 Giao lưu bóng chuyền hơi Nam – Nữ: 7h00, ngày 05/08/2025, tại Phân hiệu Trường Mầm non số 2 Phong Hải (Km 24, thôn 1, xã Phong Hải).
🎶 Chương trình giao lưu văn nghệ: 19h00, ngày 09/08/2025, tại Sân khấu ngoài trời Trường THCS Phong Hải (Km 24, thôn 1, xã Phong Hải).
📌 Kính mời toàn thể cán bộ, đảng viên và Nhân dân đến tham dự, cổ vũ và cùng hòa chung không khí thi đua chào mừng Đại hội Đảng bộ xã Phong Hải lần thứ I, nhiệm kỳ 2025–2030!`,
  },
  {
    titleVi: "📣 RA MẮT TỔ KỸ THUẬT SỐ CỘNG ĐỒNG HỖ TRỢ NGƯỜI DÂN THỰC HIỆN DỊCH VỤ CÔNG TRỰC TUYẾN 💻📲",
    categorySlug: "chuyen-doi-so",
    publishedAt: "2025-07-25",
    contentVi: `Thực hiện Nghị quyết số 57-NQ/TW ngày 22/12/2024 của Bộ Chính trị về đột phá phát triển khoa học, công nghệ, đổi mới sáng tạo và chuyển đổi số quốc gia, đồng thời hưởng ứng đợt cao điểm “30 ngày đêm” ra quân hỗ trợ người dân thực hiện dịch vụ công trực tuyến, chiều ngày 25/7/2025, Ủy ban MTTQ Việt Nam xã Phong Hải đã tổ chức Hội nghị triển khai và ra mắt mô hình Tổ kỹ thuật số cộng đồng.
🔷 Tại hội nghị, UBMTTQ xã đã triển khai kế hoạch hành động tới toàn thể Ủy viên Ủy ban, các tổ chức đoàn thể và lực lượng đoàn viên, hội viên, với trọng tâm: hướng dẫn, vận động người dân thực hiện các thủ tục hành chính phổ biến qua dịch vụ công trực tuyến như đăng ký khai sinh, khai tử, kết hôn, bảo hiểm y tế, chứng thực chữ ký, công chứng giấy tờ, xác nhận thông tin cư trú...; hỗ trợ cài đặt ứng dụng, đăng ký tài khoản, sử dụng dịch vụ công trên điện thoại, máy tính; lồng ghép tuyên truyền chuyển đổi số, bảo vệ thông tin cá nhân, thanh toán không dùng tiền mặt; tổ chức điểm hỗ trợ cố định tại nhà văn hóa các thôn và Trung tâm phục vụ hành chính công xã; phối hợp với Công an và Trung tâm hành chính công tiếp nhận, xử lý hồ sơ; phát động các hoạt động “Ngày thứ Bảy tình nguyện”, “Ngày Chủ nhật vì dân”.
🌐 Đặc biệt, Tổ kỹ thuật số cộng đồng tại Trung tâm phục vụ hành chính công xã và tại 21 thôn trên địa bàn đã được ra mắt. Lực lượng hỗ trợ là các đoàn viên thanh niên, hội viên có trình độ công nghệ, sẵn sàng hướng dẫn, hỗ trợ người dân tận tình tại chỗ hoặc trực tiếp đến từng hộ.
📌 Đoàn thanh niên xã chủ trì triển khai thiết kế video, infographic hướng dẫn; Hội Nông dân, Hội Phụ nữ, Hội CCB chủ động tuyên truyền trong hội viên. Mỗi thôn đều có Ban công tác Mặt trận phối hợp theo dõi, hỗ trợ, phản ánh kịp thời khó khăn, vướng mắc từ cơ sở.
💬 Việc ra mắt Tổ kỹ thuật số cộng đồng không chỉ giúp người dân tiếp cận dễ dàng hơn với dịch vụ công trực tuyến, mà còn góp phần quan trọng trong thực hiện mục tiêu chuyển đổi số toàn dân, toàn diện tại cơ sở.
➡️ Người dân có thể đến trực tiếp tại điểm hỗ trợ thôn hoặc Trung tâm hành chính công xã để được hướng dẫn, hỗ trợ tận tình.`,
  },
  {
    titleVi: "🇻🇳 ỦY BAN MTTQ VIỆT NAM XÃ PHONG HẢI TỔ CHỨC HỘI NGHỊ LẤY Ý KIẾN GÓP Ý VÀO DỰ THẢO CÁC VĂN KIỆN ĐẠI HỘI ĐẢNG CÁC CẤP 🇻🇳",
    categorySlug: "tin-tuc-su-kien",
    publishedAt: "2025-08-01",
    contentVi: `Thực hiện chỉ đạo của Ban Thường trực Ủy ban MTTQ Việt Nam tỉnh Lào Cai và hướng dẫn của cấp ủy Đảng xã Phong Hải, sáng ngày 01/8/2025, Ủy ban MTTQ Việt Nam xã Phong Hải đã tổ chức Hội nghị lấy ý kiến góp ý của Ủy viên Ủy ban MTTQ xã và đại diện các tổ chức chính trị - xã hội vào dự thảo các văn kiện trình Đại hội đại biểu Đảng bộ xã Phong Hải khóa I, nhiệm kỳ 2025–2030 và Đại hội đại biểu toàn quốc lần thứ XIV của Đảng.
Tham dự hội nghị có các đồng chí trong Ban Thường trực Ủy ban MTTQ xã, cùng đại diện các tổ chức đoàn thể chính trị - xã hội như: Đoàn Thanh niên, Hội Phụ nữ, Hội Nông dân, Hội Cựu chiến binh… và toàn thể Ủy viên Ủy ban MTTQ xã Phong Hải.
Phát biểu khai mạc hội nghị, đồng chí Đặng Minh Long - Chủ tịch Ủy ban MTTQ Việt Nam xã nhấn mạnh: "Việc lấy ý kiến góp ý của Mặt trận và các đoàn thể vào dự thảo văn kiện đại hội Đảng là một nội dung quan trọng, thể hiện vai trò của MTTQ trong việc đại diện cho tiếng nói của nhân dân, phát huy dân chủ, đóng góp xây dựng Đảng, chính quyền ngày càng vững mạnh. Các ý kiến hôm nay sẽ là nguồn thông tin quý báu giúp tiểu ban văn kiện tiếp thu, chỉnh sửa, hoàn thiện dự thảo phù hợp hơn với tình hình thực tế của địa phương và nguyện vọng chính đáng của nhân dân."
Tại hội nghị, các đại biểu đã được nghe giới thiệu tổng quan về các dự thảo văn kiện. Sau phần trình bày, các đại biểu đã tích cực nghiên cứu, thảo luận, đóng góp 07 ý kiến phát biểu trực tiếp và nhiều ý kiến góp ý bằng văn bản với tinh thần xây dựng, trách nhiệm cao. Các ý kiến tập trung vào các nhóm nội dung chính như: công tác tuyên truyền, giáo dục chính trị tư tưởng; chế độ, chính sách hỗ trợ người dân; bảo vệ tài nguyên và môi trường; giải pháp phát triển kinh tế gắn với chuyển đổi số, du lịch sinh thái, nông nghiệp sạch.
Phát biểu kết luận hội nghị, đồng chí Đặng Minh Long đánh giá cao các ý kiến tâm huyết, thiết thực của đại biểu tham dự. Đồng chí đề nghị Ban Thường trực Ủy ban MTTQ xã tổng hợp đầy đủ, gửi về Ban Thường vụ Đảng ủy xã và tiểu ban văn kiện đại hội để làm căn cứ tiếp thu, hoàn thiện văn kiện trước khi trình đại hội.
Hội nghị diễn ra trong không khí dân chủ, cởi mở, thể hiện tinh thần trách nhiệm cao của các tổ chức trong hệ thống chính trị ở cơ sở, góp phần quan trọng vào thành công của Đại hội Đảng các cấp.
🔔 Ủy ban MTTQ Việt Nam xã Phong Hải sẽ tiếp tục phát huy vai trò là cầu nối giữa Đảng, chính quyền và nhân dân, lắng nghe và phản ánh tâm tư, nguyện vọng chính đáng của các tầng lớp nhân dân đến cấp ủy, chính quyền để xây dựng địa phương phát triển nhanh, bền vững, góp phần thực hiện thắng lợi Nghị quyết Đại hội Đảng bộ xã khóa I, nhiệm kỳ 2025–2030.`,
  },
  {
    titleVi: "🔹 MTTQ VIỆT NAM XÃ PHONG HẢI TÍCH CỰC NẮM BẮT DƯ LUẬN, TUYÊN TRUYỀN NHÂN DÂN PHÒNG, CHỐNG BÃO LŨ TẠI THÔN ẢI NAM 🔹",
    categorySlug: "tin-tuc-su-kien",
    publishedAt: "2025-07-28",
    contentVi: `Thực hiện nhiệm vụ nắm bắt tình hình dư luận xã hội, tăng cường công tác tuyên truyền phòng, chống thiên tai, Ban Thường trực Ủy ban MTTQ Việt Nam xã Phong Hải đã trực tiếp xuống cơ sở, tuyên truyền, vận động nhân dân nâng cao cảnh giác và chủ động các biện pháp phòng, tránh bão lũ, đặc biệt tại các khu vực có nguy cơ sạt lở cao.
Qua nắm bắt thực tế tại thôn Ải Nam, MTTQ xã phát hiện hộ gia đình ông Sùng Seo Pao đang sinh sống gần taluy đất cao khoảng 12m, có nguy cơ sạt lở nghiêm trọng nếu xảy ra mưa lớn kéo dài. Trước tình hình đó, MTTQ đã phối hợp với lực lượng Công an và Quân sự xã đến hiện trường, trao đổi trực tiếp với hộ gia đình, vận động di dời đến nơi an toàn. Đồng thời, sẵn sàng hỗ trợ di chuyển tài sản nếu gia đình có nhu cầu.
Đây là một trong những hoạt động thiết thực, kịp thời, thể hiện tinh thần trách nhiệm cao của hệ thống chính trị xã Phong Hải trong công tác phòng, chống thiên tai, góp phần bảo vệ tính mạng và tài sản của nhân dân.
🚨 MTTQ xã Phong Hải kêu gọi các hộ dân sinh sống tại khu vực có nguy cơ sạt lở, lũ quét… cần nâng cao ý thức phòng tránh, theo dõi sát tình hình thời tiết và chủ động phối hợp với chính quyền địa phương để đảm bảo an toàn tuyệt đối trong mùa mưa bão.`,
  },
  {
    titleVi: "🎗️ PHÁT HUY TRUYỀN THỐNG “UỐNG NƯỚC NHỚ NGUỒN”, “ĐỀN ƠN ĐÁP NGHĨA” NHÂN KỶ NIỆM 78 NĂM NGÀY THƯƠNG BINH - LIỆT SỸ",
    categorySlug: "tin-tuc-su-kien",
    publishedAt: "2025-07-23",
    contentVi: `💐 Hướng tới kỷ niệm 78 năm Ngày Thương binh - Liệt sỹ (27/7/1947 – 27/7/2025), chiều ngày 23/7/2025, Ủy ban Mặt trận Tổ quốc Việt Nam xã Phong Hải đã phối hợp tổ chức hoạt động tri ân các Anh hùng Liệt sỹ tại Nghĩa trang Liệt sỹ xã Phong Hải.
🧹 Trong không khí trang nghiêm và thành kính, hơn 20 đoàn viên thanh niên đã tham gia dọn dẹp vệ sinh, nhổ cỏ, lau chùi bia mộ, chăm sóc cảnh quan nghĩa trang. Đây là việc làm mang ý nghĩa thiết thực nhằm thể hiện lòng biết ơn sâu sắc đối với những người con ưu tú của quê hương đã anh dũng hy sinh vì nền độc lập, tự do của dân tộc.
🙏 Ủy ban MTTQ xã Phong Hải ghi nhận hoạt động là biểu hiện sinh động của truyền thống đạo lý “Uống nước nhớ nguồn”, “Đền ơn đáp nghĩa” – những giá trị luôn được các tầng lớp nhân dân trong xã trân trọng gìn giữ và phát huy. Thông qua đó, Mặt trận Tổ quốc xã cũng khẳng định vai trò là trung tâm đoàn kết, tập hợp sức mạnh khối đại đoàn kết toàn dân tộc trong các hoạt động nghĩa tình, chăm lo cho người có công với cách mạng.
📣 Bên cạnh hoạt động chăm sóc nghĩa trang, công tác tuyên truyền về Ngày Thương binh - Liệt sỹ cũng được chú trọng. Những câu chuyện về sự hy sinh anh dũng, những tấm gương vượt lên thương tật, sống có ích cho cộng đồng đã lan tỏa tinh thần yêu nước và trách nhiệm trong mỗi cán bộ, đoàn viên, hội viên và người dân trên địa bàn.
💙 MTTQ xã Phong Hải khẳng định tiếp tục phát huy vai trò nòng cốt trong việc phối hợp tổ chức các hoạt động tri ân, góp phần giáo dục truyền thống cách mạng, đạo lý dân tộc cho thế hệ trẻ và xây dựng khối đại đoàn kết vững mạnh trong cộng đồng.`,
  },
  {
    titleVi: "🇻🇳 CHÀO MỪNG ĐẠI HỘI ĐẢNG BỘ XÃ PHONG HẢI LẦN THỨ I, NHIỆM KỲ 2025–2030 🇻🇳",
    categorySlug: "tin-tuc-su-kien",
    publishedAt: "2025-07-30",
    contentVi: `Trong không khí sôi nổi, phấn khởi của toàn Đảng, toàn dân hướng tới Đại hội Đảng bộ các cấp, Đảng bộ xã Phong Hải, tỉnh Lào Cai – đang gấp rút hoàn tất mọi công tác chuẩn bị cho Đại hội Đảng bộ xã lần thứ I, nhiệm kỳ 2025–2030, diễn ra vào ngày 11/08/2025.
🔥 Đây là dấu mốc chính trị quan trọng, khẳng định sự đoàn kết, trí tuệ và quyết tâm đổi mới vì sự phát triển bền vững của quê hương xã Phong Hải trong giai đoạn mới.
🌟 Kính mời toàn thể cán bộ, đảng viên và nhân dân trên địa bàn cùng lan toả tinh thần đại hội bằng cách đổi ảnh đại diện trên các nền tảng mạng xã hội, thể hiện niềm tự hào, niềm tin và sự ủng hộ đối với Đại hội Đảng bộ xã Phong Hải!
📌 Kính mời cán bộ, đảng viên và Nhân dân đăng bài đổi ảnh đại diện ở chế độ công khai trên trang cá nhân kèm hashtag: #ĐạiHộiĐảngBộXãPhongHải #PhongHải2025_2030`,
  },
  {
    titleVi: "🌿 ỦY BAN MTTQ VIỆT NAM XÃ PHONG HẢI PHỐI HỢP TRIỂN KHAI NGÀY CAO ĐIỂM CHUNG TAY XÂY DỰNG NÔNG THÔN MỚI VÀ NGÀY CHỦ NHẬT XANH LẦN THỨ IV NĂM 2025 🌿",
    categorySlug: "tin-tuc-su-kien",
    publishedAt: "2025-07-20",
    contentVi: `Thực hiện Công văn số 15-CV/TĐTN-PT ngày 15/7/2025 của Tỉnh đoàn Lào Cai về việc tổ chức đồng loạt ra quân ngày cao điểm “Chung tay xây dựng nông thôn mới” và “Ngày Chủ nhật xanh” lần thứ IV năm 2025, Ủy ban MTTQ Việt Nam xã Phong Hải đã phối hợp với Đoàn Thanh niên và các tổ chức thành viên tích cực triển khai các hoạt động thiết thực, phát huy vai trò khối đại đoàn kết toàn dân trong xây dựng nông thôn mới bền vững và nâng cao.
🔹 Với vai trò là trung tâm tập hợp, đoàn kết và phát huy sức mạnh nhân dân, Ủy ban MTTQ Việt Nam xã đã tích cực tuyên truyền, vận động các tầng lớp nhân dân, đặc biệt là đoàn viên, thanh niên, cùng chung tay thực hiện các phần việc cụ thể như:
✅ Tổ chức tổng vệ sinh môi trường: Làm sạch đường làng, ngõ xóm, khuôn viên nhà văn hóa, thu gom rác thải, phát quang cỏ dại, cải tạo cảnh quan tại các khu dân cư.
✅ Phối hợp với đoàn tình nguyện “Mùa hè xanh” của Trường Đại học Khoa học Xã hội và Nhân văn – Đại học Quốc gia Hà Nội tổ chức sơn sửa, dọn vệ sinh và tổ chức hoạt động vui chơi cho thiếu nhi tại điểm phân hiệu Trường Tiểu học và Mầm non Bản Cầm.
✅ Bóc dỡ quảng cáo, rao vặt sai quy định, giữ gìn cảnh quan văn minh, sạch đẹp, góp phần nâng cao tiêu chí môi trường và khu dân cư kiểu mẫu.
✅ Hướng dẫn người dân thực hiện chuyển đổi số: thành lập tổ thanh niên tình nguyện tại các thôn, hỗ trợ cài đặt ứng dụng VNeID, VSSID, đăng ký dịch vụ công trực tuyến, sử dụng các tiện ích thanh toán không dùng tiền mặt.
✅ Phân loại và xử lý rác thải tại nguồn, tuyên truyền thói quen sống xanh, sử dụng vật liệu thân thiện với môi trường.
✅ Vệ sinh nghĩa trang, bia tưởng niệm liệt sĩ nhân dịp 27/7, thể hiện đạo lý “Uống nước nhớ nguồn”.
🏡 Thông qua các hoạt động đồng loạt, MTTQ xã Phong Hải tiếp tục khẳng định vai trò nòng cốt trong công tác tuyên truyền, vận động và giám sát thực hiện các tiêu chí nông thôn mới, đặc biệt là tiêu chí môi trường, văn hóa và chuyển đổi số.
💪 Ủy ban MTTQ Việt Nam xã Phong Hải – Phát huy sức mạnh đại đoàn kết, đồng hành cùng nhân dân xây dựng nông thôn mới văn minh, hiện đại và bền vững!`,
  },
  {
    titleVi: "📌 HỘI NGHỊ LẦN THỨ NHẤT ỦY BAN MTTQ VIỆT NAM XÃ PHONG HẢI, NHIỆM KỲ 2024–2029",
    categorySlug: "tin-tuc-su-kien",
    publishedAt: "2025-07-11",
    contentVi: `🗓 Sáng ngày 11/7/2025, Ủy ban MTTQ Việt Nam xã Phong Hải tổ chức Hội nghị lần thứ nhất, nhiệm kỳ 2024–2029.
🎉 Tham dự Hội nghị có các đồng chí lãnh đạo Đảng ủy, HĐND, UBND xã cùng các vị Ủy viên Ủy ban MTTQ Việt Nam xã Phong Hải.
📌 Các đại biểu đã nghe công bố các quyết định về việc thành lập Ủy ban MTTQ Việt Nam Xã Phong Hải sau sáp nhập đơn vị hành chính; đồng thời công nhận Ban Thường trực và các Ủy viên Ủy ban MTTQ Việt Nam xã Phong Hải nhiệm kỳ 2024–2029.
📣 Phát biểu chỉ đạo, đồng chí Phạm Văn Viên – Phó Bí thư Thường trực Đảng ủy xã đã thông tin kết quả bước đầu triển khai mô hình chính quyền địa phương 2 cấp. Đồng chí nhấn mạnh vai trò nòng cốt của MTTQ và các đoàn thể trong tuyên truyền, vận động nhân dân, giám sát, phản biện và xây dựng khối đại đoàn kết toàn dân tộc.
🔎 Đồng chí cũng định hướng một số nhiệm vụ trọng tâm trong nhiệm kỳ mới, yêu cầu Ủy ban MTTQ bám sát thực tiễn, đổi mới nội dung và phương thức hoạt động, phát huy tính chủ động, sáng tạo.
💬 Phần thảo luận tại Hội nghị diễn ra sôi nổi, dân chủ và trách nhiệm, nhấn mạnh nội dung nắm bắt tư tưởng nhân dân trong giai đoạn sáp nhập đơn vị hành chính. Trong bối cảnh xã Phong Hải được hình thành trên cơ sở sáp nhập Thị trấn Nông trường Phong Hải và xã Bản Cầm, địa bàn rộng, dân số đông, phong tục tập quán và mức độ phát triển kinh tế - xã hội còn có sự chênh lệch giữa các thôn, việc nắm bắt kịp thời tâm tư, nguyện vọng, tư tưởng của nhân dân có ý nghĩa đặc biệt quan trọng để đảm bảo sự ổn định, đồng thuận trong cộng đồng dân cư.
🔹 Các đại biểu đề xuất MTTQ xã cần: tăng cường đối thoại, gặp gỡ trực tiếp với nhân dân thông qua các hội nghị tiếp xúc, sinh hoạt ở khu dân cư; phát huy vai trò Ban công tác Mặt trận ở cơ sở trong việc nắm bắt dư luận xã hội, phát hiện sớm những vấn đề nảy sinh từ cơ sở; phối hợp chặt chẽ với các tổ chức thành viên như Hội phụ nữ, Hội nông dân, Đoàn thanh niên,… để đưa thông tin chính thống đến với người dân, kịp thời định hướng dư luận, tháo gỡ tâm lý lo lắng, hoài nghi trong giai đoạn đầu thực hiện mô hình chính quyền 2 cấp; kịp thời phản ánh những vướng mắc, khó khăn, kiến nghị của nhân dân đến cấp ủy, chính quyền để có giải pháp xử lý hiệu quả.
🔹 Một số đại biểu cũng nêu ý kiến cần bổ sung nhiệm vụ giám sát việc triển khai chủ trương sáp nhập; chú trọng theo dõi, đánh giá mức độ hài lòng của nhân dân về chất lượng phục vụ của bộ máy chính quyền sau sắp xếp.
✅ Các ý kiến được tiếp thu và khẳng định sẽ là nội dung trọng tâm trong chương trình hành động của Ủy ban MTTQ Việt Nam xã Phong Hải nhiệm kỳ 2024–2029, nhất là trong giai đoạn đầu vận hành chính quyền sau sáp nhập.
📝 Hội nghị đã thông qua Quy chế làm việc, phân công nhiệm vụ cho các đồng chí trong cơ quan Uỷ Ban MTTQ Việt Nam Xã Phong Hải, đồng thời nhất trí Chương trình công tác trọng tâm 6 tháng cuối năm 2025.
🌟 Hội nghị kết thúc trong không khí dân chủ – đoàn kết – trách nhiệm, mở ra giai đoạn hoạt động hiệu quả, đổi mới cho Ủy ban MTTQ và các tổ chức chính trị – xã hội xã Phong Hải.`,
  },
  {
    titleVi: "🌈 ĐOÀN THANH NIÊN XÃ PHONG HẢI THAM GIA ĐỢT THI ĐUA CAO ĐIỂM TÌNH NGUYỆN HỖ TRỢ THI CÔNG DỰ ÁN ĐƯỜNG DÂY 500kV LÀO CAI - VĨNH YÊN 🌈",
    categorySlug: "tin-tuc-su-kien",
    publishedAt: "2025-07-10",
    contentVi: `📍 Sáng ngày 10/7/2025, tại Nhà sinh hoạt cộng đồng thôn Xả Hồ, xã Xuân Quang, tỉnh Lào Cai, Trung ương Đoàn TNCS Hồ Chí Minh phối hợp với Tập đoàn Điện lực Việt Nam (EVN) tổ chức Lễ phát động Đợt thi đua cao điểm tình nguyện tham gia hỗ trợ thi công Dự án đường dây 500kV Lào Cai - Vĩnh Yên.
💬 Đồng chí Nguyễn Minh Triết – Bí thư Trung ương Đoàn, Chủ tịch Trung ương Hội Sinh viên Việt Nam đã tham dự và phát biểu chỉ đạo tại buổi lễ.
🇻🇳 Đây là dự án trọng điểm cấp quốc gia với tổng mức đầu tư hơn 7.410 tỷ đồng, chiều dài toàn tuyến 229,5 km, đi qua 2 tỉnh Lào Cai và Phú Thọ, ảnh hưởng trực tiếp tới 31 xã. Dự án có ý nghĩa chiến lược trong đảm bảo an ninh năng lượng quốc gia, góp phần thúc đẩy phát triển kinh tế - xã hội khu vực Tây Bắc.
🔧 Hưởng ứng lễ phát động, Đoàn Thanh niên xã Phong Hải đã triệu tập 25 đoàn viên thanh niên tiêu biểu, tham gia hỗ trợ chương trình. Các đoàn viên đã cùng lực lượng thanh niên các đơn vị bạn thực hiện phát quang hành lang tuyến, chặt hạ cây đổ, giải phóng mặt bằng phục vụ thi công dự án, góp phần thúc đẩy tiến độ hoàn thành công trình trước ngày 19/8/2025, thiết thực chào mừng kỷ niệm 80 năm Cách mạng Tháng Tám và Quốc khánh 2/9.
🔥 Với tinh thần xung kích, tình nguyện và trách nhiệm cao, đoàn viên thanh niên xã Phong Hải đã để lại hình ảnh đẹp về tuổi trẻ địa phương trong mắt các đơn vị phối hợp, thể hiện vai trò “đâu cần thanh niên có – việc gì khó có thanh niên” trong các nhiệm vụ phát triển quê hương, đất nước.`,
  },
  {
    titleVi: "🌟 CHIẾN DỊCH THANH NIÊN TÌNH NGUYỆN HÈ 2025 – RA QUÂN NGÀY CAO ĐIỂM HỖ TRỢ VẬN HÀNH MÔ HÌNH CHÍNH QUYỀN ĐỊA PHƯƠNG 2 CẤP VÀ CUNG CẤP DỊCH VỤ CÔNG TRỰC TUYẾN 🔥",
    categorySlug: "dich-vu-cong",
    publishedAt: "2025-07-05",
    contentVi: `📍 Tại Trung tâm Phục vụ Hành chính công xã Phong Hải, Đoàn Thanh niên – Hội LHTN Việt Nam xã Phong Hải đã tổ chức ra quân hưởng ứng ngày cao điểm hỗ trợ người dân thực hiện dịch vụ công trực tuyến, góp phần đồng hành cùng chính quyền địa phương trong giai đoạn đầu triển khai mô hình chính quyền địa phương 2 cấp.
🎯 Các nội dung hoạt động trọng tâm:
🔹 Hướng dẫn người dân nộp hồ sơ trực tuyến, đăng ký thủ tục hành chính qua Cổng Dịch vụ công Quốc gia.
🔹 Cài đặt, kích hoạt và sử dụng ứng dụng định danh điện tử (VNeID) – an toàn, bảo mật, thuận tiện.
🔹 Tư vấn, giải thích quy trình thủ tục hành chính, giúp người dân hiểu rõ quyền lợi và nghĩa vụ của mình.
🔹 Hỗ trợ người cao tuổi, người yếu thế, người chưa quen sử dụng công nghệ tiếp cận dịch vụ công một cách dễ dàng, thân thiện.
💪 Với tinh thần xung kích – tình nguyện – trách nhiệm, tuổi trẻ Phong Hải quyết tâm góp sức trẻ xây dựng nền hành chính hiện đại, gần dân, vì dân – tạo tiền đề vững chắc cho mô hình chính quyền 2 cấp hoạt động hiệu quả ngay từ những ngày đầu.
🚀 Tuổi trẻ Phong Hải quyết tâm chuyển đổi số thành công từ cơ sở!`,
  },
  {
    titleVi: "XÃ PHONG HẢI TỔ CHỨC LỄ CÔNG BỐ CÁC NGHỊ QUYẾT, QUYẾT ĐỊNH CỦA TRUNG ƯƠNG VÀ TỈNH VỀ SÁP NHẬP ĐƠN VỊ HÀNH CHÍNH, THÀNH LẬP TỔ CHỨC ĐẢNG, CHỈ ĐỊNH CẤP ỦY, HĐND, UBND, MTTQ TỈNH, XÃ, PHƯỜNG",
    categorySlug: "tin-tuc-su-kien",
    publishedAt: "2025-06-30",
    contentVi: `Thực hiện Kế hoạch số 254-KH/TU ngày 26/6/2025 của Tỉnh ủy Lào Cai – Yên Bái về việc tổ chức Lễ công bố Nghị quyết, Quyết định của Trung ương và tỉnh Lào Cai (mới) liên quan đến việc sáp nhập đơn vị hành chính cấp tỉnh, cấp xã; kết thúc hoạt động đơn vị hành chính cấp huyện; thành lập tổ chức đảng, chỉ định cấp ủy, Hội đồng nhân dân, Ủy ban nhân dân, Ủy ban MTTQ Việt Nam các cấp, sáng ngày 30/6/2025, Đảng ủy Thị trấn Nông trường Phong Hải long trọng tổ chức Lễ công bố tại điểm cầu xã Phong Hải.
Dự Lễ công bố tại điểm cầu xã Phong Hải có đồng chí Trần Sơn Bình – Phó Giám đốc Sở Văn hóa, Thể thao và Du lịch tỉnh; đồng chí Phạm Văn Viên – Phó Bí thư Thường trực Đảng ủy xã Phong Hải chủ trì buổi lễ. Tham dự buổi lễ còn có các đồng chí nguyên là lãnh đạo xã Bản Cầm, thị trấn Nông trường Phong Hải qua các thời kỳ; cán bộ, công chức xã Phong Hải.
Tại buổi lễ, các đại biểu đã theo dõi chương trình Lễ công bố được tổ chức tại điểm cầu Bộ Chỉ huy Quân sự tỉnh thông qua nền tảng truyền hình trực tuyến. Trong chương trình đã công bố và trao các quyết định như: Quyết định chỉ định Ủy viên Ủy ban Kiểm tra, Chủ nhiệm và Phó Chủ nhiệm Ủy ban Kiểm tra; Quyết định chỉ định Chủ tịch, Phó Chủ tịch và Trưởng các Ban của Hội đồng nhân dân tỉnh; Quyết định chỉ định Chủ tịch, Phó Chủ tịch Ủy ban nhân dân các xã, phường sau sáp nhập.
Buổi lễ công bố là sự kiện chính trị quan trọng, thể hiện quyết tâm của Đảng, Nhà nước trong việc sắp xếp tổ chức bộ máy theo hướng tinh gọn, hiệu lực, hiệu quả. Đồng thời khẳng định sự đoàn kết, thống nhất của cán bộ, đảng viên và nhân dân trên địa bàn xã Phong Hải trong việc thực hiện chủ trương lớn của Trung ương và tỉnh.
Việc tổ chức thành công Lễ công bố cũng là tiền đề quan trọng để địa phương ổn định tổ chức, sớm đưa các nghị quyết, quyết định vào cuộc sống, góp phần thực hiện thắng lợi các mục tiêu phát triển kinh tế - xã hội, xây dựng hệ thống chính trị vững mạnh toàn diện trong giai đoạn mới.`,
  },
  {
    titleVi: "Trung tâm Phục vụ Hành chính công xã Phong Hải chính thức đi vào hoạt động từ ngày 01/7/2025",
    categorySlug: "dich-vu-cong",
    publishedAt: "2025-07-01",
    contentVi: `Thực hiện Nghị định số 118/2025/NĐ-CP của Chính phủ về tổ chức Trung tâm Phục vụ Hành chính công cấp xã, UBND xã Phong Hải trân trọng thông báo:
Từ ngày 01/7/2025, Trung tâm Phục vụ Hành chính công xã Phong Hải chính thức đi vào hoạt động, thực hiện chức năng tiếp nhận, hướng dẫn và giải quyết thủ tục hành chính cho tổ chức, cá nhân trên địa bàn xã.
Người dân có nhu cầu thực hiện thủ tục hành chính, vui lòng đến Trung tâm để được hướng dẫn, nộp hồ sơ và nhận kết quả. Trung tâm thực hiện các thủ tục thuộc các lĩnh vực: đất đai, hộ tịch, chứng thực, lao động, bảo trợ xã hội, xây dựng, môi trường… đảm bảo nhanh chóng, công khai, minh bạch, đúng hẹn.
Địa điểm tiếp nhận hồ sơ: Điểm 1: Trụ sở Trung tâm Phục vụ Hành chính công xã Phong Hải (trong khuôn viên UBND xã Phong Hải). Điểm 2: Bộ phận "Một cửa" tại trụ sở UBND xã Bản Cầm (cũ).
Thời gian làm việc: Từ thứ Hai đến thứ Sáu hàng tuần (trừ ngày lễ, tết). Buổi sáng: 07h30 – 12h00. Buổi chiều: 13h30 – 17h00.
Hotline hỗ trợ: 0888.446.262
UBND xã Phong Hải rất mong nhận được sự quan tâm, hợp tác và đóng góp ý kiến từ Nhân dân để Trung tâm hoạt động hiệu quả, phục vụ tốt nhất nhu cầu chính đáng của người dân.`,
  },
  {
    titleVi: "Ủy ban MTTQ Việt Nam thị trấn phối hợp Hội LHPN thị trấn trồng 1,5km đường hoa, hỗ trợ thôn Ải Nam xây dựng thôn kiểu mẫu",
    categorySlug: "mo-hinh-hay",
    publishedAt: "2024-05-18",
    contentVi: `Thực hiện sự chỉ đạo của Đảng ủy nhằm giúp đỡ, hỗ trợ thôn Ải Nam xây dựng thôn kiểu mẫu, sáng ngày 18/5/2024, Ủy ban MTTQ thị trấn phối hợp với Hội LHPN thị trấn tổ chức lao động, trồng 1,5km đường hoa. Với 55 cán bộ Mặt trận, hội viên phụ nữ các thôn, tổ dân phố trên địa bàn tham gia hưởng ứng.`,
  },
  {
    titleVi: "🎁🌸 CHƯƠNG TRÌNH “TẾT NHÂN ÁI” – XUÂN BÍNH NGỌ NĂM 2026 🌸🎁",
    categorySlug: "cuoc-van-dong",
    publishedAt: "2026-01-25",
    contentVi: `Thiết thực chăm lo cho các hộ gia đình có hoàn cảnh khó khăn trên địa bàn nhân dịp Tết đến, Xuân về, Đảng uỷ – HĐND – UBND – Ủy ban MTTQ Việt Nam xã Phong Hải phối hợp cùng sự đồng hành tài trợ của Công ty TNHH MTV Huy Vọng và Công ty TNHH MTV Quang Vinh tổ chức trao tặng 25 suất quà ý nghĩa đến bà con.
🔹 Dự chương trình có: Đồng chí Phạm Văn Viên – Phó Bí thư Thường trực Đảng ủy; Đồng chí Vũ Trung Dũng – Phó Bí thư Đảng ủy, Chủ tịch UBND xã; Đồng chí Đặng Minh Long – Ủy viên BTV Đảng ủy, Chủ tịch Ủy ban MTTQ Việt Nam xã.
🔹 Đại diện nhà tài trợ: Ông Bùi Huy Vọng – Giám đốc Công ty TNHH MTV Huy Vọng; Ông Phạm Quang Phúc – Giám đốc Công ty TNHH MTV Quang Vinh.
Những phần quà được trao tận tay các hộ gia đình không chỉ mang giá trị vật chất mà còn là nguồn động viên tinh thần to lớn, giúp bà con đón Xuân Bính Ngọ 2026 trong không khí ấm áp, nghĩa tình.
Chương trình “Tết nhân ái” tiếp tục lan tỏa thông điệp sẻ chia, phát huy tinh thần đoàn kết, chung tay vì người nghèo, góp phần bảo đảm an sinh xã hội trên địa bàn xã Phong Hải.
💐 Xin trân trọng cảm ơn sự quan tâm, đồng hành của các doanh nghiệp; cảm ơn sự lãnh đạo, chỉ đạo của cấp ủy, chính quyền và sự phối hợp của các ban, ngành, đoàn thể để chương trình được tổ chức thành công tốt đẹp.`,
  },
  {
    titleVi: "🎉🎁 CHƯƠNG TRÌNH “CHUNG VỊ TẾT VIỆT – GẮN KẾT MUÔN MIỀN” XUÂN 2026 TẠI XÃ PHONG HẢI 🎁🎉",
    categorySlug: "cuoc-van-dong",
    publishedAt: "2026-01-20",
    contentVi: `Trong không khí rộn ràng, ấm áp của những ngày giáp Tết Nguyên đán 2026, tinh thần đoàn kết, sẻ chia và truyền thống nhân ái của dân tộc tiếp tục được lan tỏa mạnh mẽ tại xã Phong Hải.
Ủy ban MTTQ Việt Nam xã Phong Hải phối hợp cùng Tổng Công ty Cổ phần Bia – Rượu – Nước giải khát Sài Gòn (SABECO) tổ chức Chương trình trao quà Tết với chủ đề “Chung Vị Tết Việt – Gắn Kết Muôn Miền”, dành cho các hộ gia đình có hoàn cảnh khó khăn trên địa bàn, đồng thời tri ân các hộ kinh doanh, nhà phân phối của Công ty Bia Sài Gòn.
🌸 Tham dự chương trình có:
🔹 Về phía Ủy ban Trung ương MTTQ Việt Nam: Đồng chí Nguyễn Thị Thu Vân – Phó Trưởng Ban Công tác xã hội, Ủy ban Trung ương MTTQ Việt Nam.
🔹 Về phía Ủy ban MTTQ Việt Nam tỉnh Lào Cai: Đồng chí Ngô Hoài Linh – Phó Chủ tịch Ủy ban MTTQ Việt Nam tỉnh.
🔹 Về phía lãnh đạo xã Phong Hải: Đồng chí Bùi Quang Hưng – Tỉnh ủy viên, Bí thư Đảng ủy, Chủ tịch HĐND xã; Đồng chí Phạm Văn Viên – Phó Bí thư Thường trực Đảng ủy; Đồng chí Vũ Trung Dũng – Phó Bí thư Đảng ủy, Chủ tịch UBND xã; Đồng chí Đặng Minh Long – Ủy viên Ban Thường vụ Đảng ủy, Chủ tịch Ủy ban MTTQ Việt Nam xã; cùng các đồng chí trong Thường trực Đảng ủy – HĐND – UBND – Ủy ban MTTQ Việt Nam xã; đại diện các ban, ngành, đoàn thể, Công an, Quân sự xã.
🔹 Về phía đơn vị tài trợ SABECO: Bà Trần Kim Nga – Thành viên Hội đồng Quản trị SABECO; Bà Đinh Nguyễn Thị Hường – Giám đốc Truyền thông Doanh nghiệp; Ông Trương Văn Tuấn – Giám đốc Vùng khu vực phía Bắc và Miền Trung; Ông Đỗ Thanh Bình – Quản lý khu vực, Trợ lý Giám đốc vùng; Ông Nguyễn Đức Hoàng Sơn – Giám sát bán hàng; cùng các cán bộ, nhân viên SABECO là tình nguyện viên của chương trình.
✨ Tại chương trình, 300 suất quà đã được trao, mỗi suất gồm 300.000 đồng tiền mặt và hiện vật trị giá 600.000 đồng, góp phần chia sẻ khó khăn, giúp bà con vui Xuân, đón Tết đầm ấm, đủ đầy hơn.
💬 Đại diện SABECO khẳng định mỗi phần quà trao đi không chỉ mang giá trị vật chất mà còn thể hiện trách nhiệm xã hội và cam kết đồng hành lâu dài cùng địa phương trong công tác an sinh.
Phát biểu tại chương trình, lãnh đạo xã Phong Hải trân trọng cảm ơn sự quan tâm của SABECO và các cấp MTTQ; đồng thời khẳng định đây là hoạt động ý nghĩa, góp phần củng cố khối đại đoàn kết toàn dân tộc.
🌼 Chương trình khép lại trong không khí ấm áp, nghĩa tình, lan tỏa sâu sắc tinh thần “tương thân tương ái”.
🎊 Chúc Nhân dân xã Phong Hải đón Xuân 2026 vui tươi – an toàn – tiết kiệm – hạnh phúc!`,
  },
];
