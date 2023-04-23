-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th4 10, 2023 lúc 04:04 PM
-- Phiên bản máy phục vụ: 10.4.27-MariaDB
-- Phiên bản PHP: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `hdcourse`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(150) NOT NULL,
  `thumb` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `categories`
--

INSERT INTO `categories` (`id`, `name`, `thumb`) VALUES
(1, 'Thiết kế Website', 'img/cat-1.jpg'),
(2, 'Lập trình & CSDL', 'img/cat-2.jpg'),
(3, 'Lập trình di động', 'img/cat-3.jpg'),
(4, 'Tin học văn phòng', 'img/cat-4.jpg'),
(5, 'Marketing ', 'img/cat-5.jpg'),
(6, 'SEO 1', '');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `courses`
--

CREATE TABLE `courses` (
  `id` int(11) NOT NULL,
  `id_category` int(11) NOT NULL,
  `id_teacher` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `price` int(50) NOT NULL,
  `thumb` varchar(150) NOT NULL,
  `followers` int(50) DEFAULT 10,
  `views` int(50) DEFAULT 50,
  `des` varchar(500) NOT NULL,
  `benefit` varchar(500) NOT NULL,
  `hot` tinyint(1) DEFAULT NULL,
  `currentUpdate` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `courses`
--

INSERT INTO `courses` (`id`, `id_category`, `id_teacher`, `name`, `price`, `thumb`, `followers`, `views`, `des`, `benefit`, `hot`, `currentUpdate`) VALUES
(1, 1, 1, 'Lập trình Frontend - HTML CSS&Javascript', 299000, 'htmlcssjs.webp', 1550, 2590, 'Học lập trình Frontend, học Javascript với HTML và JAVA Script.', '<li>Có thể tự làm được trang web cá nhân với đầy đủ hiệu ứng như các giao diện web hiện nay được bày bán, giao diện web ảnh, trang trình bày sản phẩm, tự thiết kế trang blog cho cá nhân, trang giới thiệu công ty, cửa hàng, dịch vụ với đầy đủ hiệu ứng theo ý mình, với đầy đủ tính năng phản hồi. </li>\r\n\r\n<li>Về lâu dài có thể ghép với Wordpress hoặc CMS khác để bán thành phẩm tại các trang web nổi tiếng như themeforest...</li>', 1, '2023-03-24 09:13:32'),
(2, 1, 1, 'Trọn bộ kiến thức về AngularJS', 399000, 'agularjs.webp', 1225, 2009, 'Biết về AngularJS giúp bạn có công việc tốt hoặc cải thiện công việc bạn đang có. Đây là kỹ năng cần rất nhiều trong ngành công nghiệp phát triển Web hiện đại. AngularJS giúp bạn tạo các ứng dụng web dễ dàng hơn và đó là lý do tại sao nó trở nên rất phổ biến và được hỗ trợ bởi Google.', '<li>Tìm hiểu cách AngularJS hoạt động, bao gồm các kiến thức như directives, dependency injection, two way data binding, the digest loop, watchers, và nhiều hơn nữa. </li>\r\n<li> Tìm hiểu các nguyên tắc cơ bản của Javascript và HTML được sử dụng bởi AngularJS, chẳng hạn như các thuộc tính tùy chỉnh, phương thức đã được định dạng kiểu, hash, và vòng lặp sự kiện.</li>\r\n<li>Code custom services. Thiết kế custom directives, Tự thiết kế được custom services, tự thiết kế được custom directives, hiểu về', 1, '2023-04-05 07:57:32'),
(3, 1, 1, 'Trọn bộ kiến thức lập trình ReactJS ', 399000, 'reactjs.webp', 1394, 2193, 'Giới thiệu vể React JS - thư viện javascript phát triển bởi Facebook.\r\n- Sức mạnh khủng khiếp mà Facebook mang đến trong React, đó chính là mô hình DOM, làm tăng khả năng trình diễn các đối tượng trên nền web một cách hiệu quả & tốc độ mượt hơn bất kì Java Script Framework nào trước đây.', '<li>Nắm được kiến thức bài bản từ đầu về thư viện Javascript nổi tiếng phát triển bởi facebook - React JS. </li>\r\n<li>Nắm được logic hoạt động, các khái niệm, cách thao tác, lập trình chức năng và cách kết hợp Redux và React JS.\r\n </li>\r\n<li>Học từ đầu về cách thao tác với cơ sở dữ liệu PostgreSQL.\r\n </li>\r\n<li>Hiểu cách xử lý Router trong lập trình React JS.\r\n </li>\r\n<li>Học cách tích hợp React JS với LocalStorage.\r\n </li>\r\n<li> Học cách tích hợp React JS với Firebase.\r\n</li>\r\n<li>Lập trình Nod', 1, '2023-04-05 07:57:36'),
(4, 1, 1, 'Thành thạo Bootstrap qua 10 website', 299000, 'boostrap.webp', 2690, 2900, 'Thành thạo Bootstrap qua 10 website\r\nTạo Chủ đề Bootstrap 4 nâng cao của riêng bạn từ đầu!\r\nKhóa học này sẽ chỉ cho bạn cách tạo một Mẫu Bootstrap 4 hoàn chỉnh từ đầu bắt đầu với các tệp HTML, CSS và JavaScript trống! Chúng tôi sẽ di chuyển nhanh chóng để cung cấp cho bạn trải nghiệm xây dựng trang web Bootstrap nhanh nhất nhưng triệt để nhất có thể', '<li>Tìm hiểu cách thiết kế và phát triển Mẫu Bootstrap của riêng bạn từ đầu. </li>\r\n<li> Tìm hiểu cách tích hợp và tùy chỉnh các trình cắm jQuery hiện đại vào bất kỳ mẫu nào.</li>\r\n<li>Sử dụng HTML5 và CSS3 mới nhất để thêm kiểu dáng độc đáo vào Bootstrap. </li>\r\n<li> Tích hợp Biểu mẫu liên hệ PHP đầy đủ chức năng vào bất kỳ Mẫu Bootstrap nào.</li>\r\n<li> Nhận một khóa học sự cố của Hệ thống lưới Bootstrap với bố cục chủ đề.</li>\r\n<li> Tinh chỉnh các kỹ năng HTML và CSS của bạn để phát triển tran', 0, '2023-04-08 15:52:23'),
(5, 1, 1, 'Lập trình Wordpress Theme cho doanh nghiệp ', 399000, 'wordpress.webp', 1890, 2560, 'Khoá học sẽ mang đến cho bạn các thông tin cần thiết để bạn tự sáng tạo một theme WordPress với chức năng Portfolio để trưng bầy gian hàng, sản phẩm hay đơn giản là các hình ảnh cuả doanh nghiệp hay cá nhân. Bạn sẽ được hướng dẫn cách sử dụng framework như Bootstrap kết hợp với Underscores base theme để sáng tạo ra những theme WordPress cho riêng công việc cuả bạn nhanh chóng, tiết kiệm thời gian, mobile responsive, hiển thị tốt trên mọi kích cỡ màn hình.', '<li>Biết cách tự làm Wordpresss theme bản thân, doanh ngiệp hay khách hàng để tăng thu nhập </li>\r\n<li>Tự tạo và làm chủ cho mình một Wordpress website cùng custom theme </li>\r\n<li>Nắm được các thông tin và kiến thức cần thiết để bắt đầu sự nghiệp cuả một Wordpress Developer chuyên nghiệp </li>\r\n<li>Những kinh nghiệm đáng giá nhất, công cụ hiệu dụng nhất, kiến thức mới nhất... sẽ được cập nhật thường xuyên trên khóa học để các bạn luôn nắm được những công nghệ mới nhất cho website của mình. </li', 0, '2023-04-08 15:52:26'),
(6, 1, 1, 'Khóa học thiết kế UI - UX từ A - Z', 249000, 'uiux.webp', 1110, 1690, 'Mô tả tổng quát. - Khoá học nói về hai phần Phần 1 sẽ nói tất cả lý thuyết về thiết kế ui ux, nguồn gốc thiết kế ui ux từ đâu, các ví dụ về thiết kế ui ux, các công cụ thiết kế ui ux, một team thiết kế ui ux gồm những ai và vai trò của từng thành phần... Phần 2 sẽ nói về cách sử dụng công cụ thiết kế ui ux, cách thiết kế, cách xuất file... Phần 3 là phân tích các sản phẩm : ứng dụng đọc sách, ứng dụng tìm việc, ứng dụng giao đồ ăn nhanh, ứng dụng chăm sóc thú cưng.', '<li> Sau khi học người học có thể tự làm được trang web cá nhân với đầy đủ hiệu ứng như các giao diện web hiện nay được bày bán.</li>\r\n<li>Tự làm được giao diện web ảnh, tự tạo trang trình bày sản phẩm của mình, tự thiết kế trang blog cho cá nhân, tự làm trang giới thiệu công ty, cửa hàng, dịch vụ với đầy đủ hiệu ứng theo ý mình, với đầy đủ tính năng responsive. </li>\r\n<li> Về lâu dài khi đã tự thiết kế được giao diện bạn có thể ghép với wordpress hoặc cái khác để bán thành phẩm tại các trang we', 0, '2023-04-08 15:52:29'),
(7, 2, 2, 'Làm chủ C/C++ trong 4 tuần', 599000, 'c.png', 1290, 1580, '- Khóa học giúp trang bị cho học viên các kỹ năng lập trình được minh hoạ cụ thể bằng ngôn ngữ lập trình C/C++- Khóa học cung cấp trọn bộ kiến thức từ cơ bản đến nâng cao của lập trình C/C++. Bao gồm các kỹ thuật lập trình trên các kiểu dữ liệu cơ bản, các phát biểu lựa chọn, câu lệnh điều khiển, vòng lặp, mảng, con trỏ, kiểu cấu trúc. Bên cạnh đó khóa học cũng trang bị cho học viên kiến thức xử lý tập tin, cách viết chương trình theo kiểu lập trình hàm- Mô tả các chức năng của bài toán thà', '<li>Có thể phân tích thiết kế thuật giải bài toán từ đơn giản đến phức tạp </li>\r\n<li>Sử dụng thành thạo ngôn ngữ C/C++ với các kiểu dữ liệu như, mảng, con trỏ, kiểu cấu trúc, kiểu tập tin, các câu lệnh rẽ nhánh, vòng lặp </li>\r\n<li>Biết sử dụng kỹ thuật lập trình hàm </li>\r\n<li>Biết sử dụng kỹ thuật đệ quy để giải quyết bài toán phức tạp </li>\r\n<li> Thiết kế, xây dựng, thử nghiệm và gỡ lỗi (design, implement, test, and debug) chương trình</li>\r\n<li> Là cơ sở để tiếp cận phương pháp lập trình hư', 0, '2023-03-24 07:19:20'),
(8, 2, 2, 'Lập trình PHP cơ bản cho người mới bắt đầu', 0, 'php.png', 990, 1590, 'Khoá học cung cấp cho học viên đầy đủ các kỹ năng lập trình PHP căn bản thông qua các ví dụ để học viên có thể thực hành theo và ứng dụng vào thực tế.', '<li> Khoá học cung cấp cho học viên đầy đủ các kỹ năng lập trình PHP căn bản thông qua các ví dụ để học viên có thể thực hành theo và ứng dụng vào thực tế. Điểm khác biệt của khóa học là nội dung đầy đủ, thực hành chi tiết, cung cấp đủ thời lượng để bạn có thể hiểu được bản chất của việc lập trình PHP cơ bản. </li>', 0, '2023-03-24 07:11:10'),
(10, 3, 3, 'Lập trình ứng dụng Android trong 6 tuần', 399000, 'lap-trinh-app-inventor_mp.jpg', 1112, 2390, 'Học lập trình app và xây dựng ứng dụng Android từ cơ bản đến nâng cao.', '<li> Có được kiến thức toàn diện về ngôn ngữ lập trình Java. </li>\r\n<li>Nắm rõ những kiến thức về lập trình ứng dụng Android từ cơ bản đến nâng cao.\r\n </li>\r\n<li>Có khả năng tạo được những ứng dụng Android, ứng dụng game Android.\r\n </li>', 0, '2023-04-05 07:57:45'),
(11, 3, 3, 'Lập trình iOS SwiftUI', 299000, '1589863275695_367121_Udemy_750x422.png', 2119, 2290, 'SwiftUI là bộ công cụ giao diện người dùng cho phép thiết kế các ứng dụng theo cách declarative. SwiftUI cho phép chúng ta thực hiện giao diện trông như thế nào và hoạt động ra sao, và nó chỉ ra cách làm cho điều đó xảy ra khi người dùng tương tác với nó.', '<li> Bạn sẽ tự tay thiết kế được ứng dụng iOS với SwiftUI và kiếm tiền thông qua AppStore.\r\n</li>\r\n<li>Bạn có thể cập nhật được công nghệ lập trình mới nhất của Apple để ứng dụng vào dự án của mình. </li>\r\n<li>Bạn sẽ hoàn toàn đủ khả năng ứng tuyển vị trí lập trình iOS tại các công ty trong và ngoài nước. </li>\r\n<li>Bạn có thể viết ứng dụng cộng hai số, ứng dụng Calculator và ứng dụng hiển thị món ăn. </li>\r\n', 0, '2023-04-05 07:57:56'),
(12, 4, 4, 'Hướng dẫn soạn thảo văn bản với Word 365', 299000, 'imageproxy.webp', 2890, 3300, 'Trọn bộ kỹ năng soạn thảo văn bản chuyên nghiệp với Word 365', '<li> Nắm rõ ưu lợi thế của phần mềm Word 365 so với các phiên bản khác</li>\r\n<li>Nâng cao kỹ năng soạn thảo văn bản từ cơ bản đến nâng cao </li>\r\n<li>Đi đầu trong việc cập nhật kiến thức mới nhất về tin học văn phòng </li>\r\n<li>Có thể chia sẻ tài liệu làm việc online ngay trên giao diện của Word 365 </li>\r\n', 0, '2023-03-24 07:30:50'),
(13, 4, 4, 'Trở thành bậc thầy báo cáo với Excel', 399000, 'anh-nen-khoa-hoc-excel.png', 1990, 2490, 'Khóa học này giúp các học viên trở thành 1 chuyên gia báo cáo số liệu trên Excel trong thời gian ngắn. Khóa học bao gồm 15 chương với 50 bài giảng. Nội dung khóa học cung cấp các tuyệt chiêu về Excel cũng như cách xây dựng báo cáo sao cho khoa học, bắt mắt và vi diệu:\r\n- Nắm chắc được các kỹ năng cần thiết cho 1 bài báo cáo: Data Validation, Conditional Formatting, Name Manager, Form Control...\r\n- Biết vận dụng sự kết hợp vi diệu và thông minh của các hàm trong Excel, từ đó giúp học viên tư duy ', '<li>Học viên có thể trở thành 1 chuyên gia báo cáo số liệu trên Excel trong thời gian ngắn. </li>\r\n<li>Thuần thục được nhiều tuyệt chiêu, kỹ thật hay trong Excel. </li>\r\n<li>Biết cách tư duy và ứng dụng trong công việc để tạo ra những báo cáo hay, trọng tâm, đẹp mắt và vi diệu bằng nhiều kỹ thuật và tuyệt chiêu. </li>\r\n<li>Tự tay dễ dàng viết được các ứng dụng trên Excel cực kì hay, hữu ích và rất cần thiết cho người đi làm, giải quyết được rất nhiều vấn đề trong thực tiễn công việc gặp phải. </', 0, '2023-03-24 07:32:37'),
(14, 5, 5, 'Làm Việc Hiệu Quả Với Bộ 3 Công Cụ Marketing', 499000, 'mrt.jpg', 1129, 1570, 'Facebook, Google Adwords, SEO giúp bạn dễ dàng giới thiệu với mọi người những điểm độc đáo về doanh nghiệp của bạn. Nhờ đó, bạn có thể tiếp cận những khách hàng đang tìm kiếm các sản phẩm/dịch vụ mà bạn cung cấp.', '<li> Nắm vững thuật toán, quy định và các chính sách của Facebook, Google và SEO, giúp bạn hạn chế những vi phạm và những hình phạt không đáng có từ các nền tảng này.</li>\r\n<li> Thiết lập quảng cáo với hiệu quả tối ưu, tăng tỉ lệ chuyển đổi, tối thiểu chi phí mà vẫn có đơn về đều đặn trên 2 nền tảng phổ biến nhất hiện nay là Google và Facebook.</li>\r\n<li>Cung cấp những kiến thức, kỹ thuật căn bản về Facebook, chiến lược Facebook Marketing lâu dài và bền vững. </li>\r\n', 0, '2023-03-24 07:36:15'),
(15, 5, 5, 'Bùng Nổ Thương Hiệu SMEs Với Chiến Dịch PR 5 Bước', 599000, 'imageproxy (1).webp', 998, 1589, '- Quan hệ công chúng, một khái niệm không hề mới nhưng không phải ai làm kinh doanh, marketing cũng hiểu một cách chính xác và đầy đủ. Công chúng ở đây bao gồm tất cả những người, tổ chức hoặc cá nhân liên quan tới doanh nghiệp, bao gồm khách hàng, người tiêu dùng, nhân viên công ty, chính quyền, nhà báo....', '<li>Hiểu tổng quan về PR. </li>\r\n<li>Học 5 chiến thuật PR. </li>\r\n<li>3 hình thức PR phổ biến và dễ ứng dụng nhất. </li>\r\n<li> Sử dụng người nổi tiếng (KOLs, Celebs..) để PR cho thương hiệu một cách tự nhiên, thông minh.</li>\r\n<li>Ý tưởng tổ chức sự kiện PR thành công trên mạng Internet. </li>\r\n', 0, '2023-03-24 07:36:15'),
(16, 6, 6, 'SEO Leader căn bản - SEO từ khoá lên TOP', 299000, 'phuochh01.png', 1544, 2344, 'Với khoá học SEO Leader căn bản - SEO từ khoá lên TOP, học viên sẽ được học các kiến thức chuẩn, cũng như nắm về lý thuyết các yếu tố cơ bản trong SEO. Hơn thế nữa học viên có thể phân thành các nhóm từ khóa, mỗi nhóm từ khóa tiếp xúc với các đối tượng khách hàng khác nhau. Mang lại hiệu quả của sự trải nghiệm từ thấp đến cao. Kết thúc khóa học cơ bản học viên tự tin với chính bản thân SEO thành công các từ khóa dài,...', '<li>Tổng quan về SEO </li>\r\n<li>Các kiến thức cơ bản trong SEO </li>\r\n<li> Cách xây dựng kế hoạch SEO</li>\r\n<li>Cách xây dựng content chuẩn SEO </li>\r\n<li>Tối ưu và Chuẩn nội dung trên trang (On-Page Optimization & Copywriting) </li>\r\n<li> Tối ưu On-site, On-page</li>\r\n<li>Cách SEO các từ khoá dài lên TOP </li>\r\n<li> Kết thúc khoá học, học viên sẽ tự tin SEO từ khoá dài lên TOP</li>\r\n', 0, '2023-03-24 07:40:02'),
(17, 6, 6, 'SEO Leader nâng cao', 399000, 'phuonghh02.png', 1323, 2323, 'Khóa học SEO leader mang đến các bạn gốc nhìn tổng quan SEO, Mang đến cho bạn kiến thức từ cơ bản đến nâng cao. Hơn thế nữa khi đến với khóa học SEO leader bạn đã đến với gốc nhìn thực, gốc nhìn tổng quan về bạn và đối thủ bạn. Mang đến sự so sánh. Tạo ra điểm khác biệt thành công.Vượt trội - Đăng cấp so với đối thủ. Chiếm ưu thế về nhận định vượt trội về thứ hạng -> Tiếp cận được khách hàng tốt hơn! Mang về lợi nhuận kinh tế tốt cho chính bạn.', '<li>Khi thử thách ở phần SEO Leader cơ bản bạn đã vượt qua, niềm đam mê và sự hứng thú của SEO đi sâu vào dòng máu \"Anh Hùng\" thích được chinh phục đỉnh núi cao \"Các keywords ngắn\" mang tính cạnh tranh cao. Bạn sẽ chinh phục được vị trí top cao ngang thứ hạng với các chuyên gia SEO. Bởi Slogan sống của chính tôi \"Sống là sự chia sẻ\" Giá trị chia sẻ không giới hạn, mang đến niềm cảm hứng tốt ở những con người gặp tôi và được Tôi chia sẻ! Chúc các bạn trở thành cao thủ SEO - 1 chuyên gia SEO như t', 0, '2023-03-24 07:40:02');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `course_detail`
--

CREATE TABLE `course_detail` (
  `id` int(11) NOT NULL,
  `id_course` int(11) NOT NULL,
  `routes` varchar(200) NOT NULL,
  `totalTime` varchar(50) NOT NULL,
  `count` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `course_detail`
--

INSERT INTO `course_detail` (`id`, `id_course`, `routes`, `totalTime`, `count`) VALUES
(1, 1, '\r\nGiới thiệu khóa học và cài đặt công cụ', '00:16:27', 1),
(2, 1, '\r\nGiới thiệu các thẻ html cơ bản', '00:23:34', 2),
(3, 1, '\r\nGiới thiệu css cơ bản', '00:21:17', 3),
(4, 2, '\r\nNghiên cứu và tìm hiểu angular js', '00:09:44', 1),
(5, 2, 'Mô hình model - view - star(*)', '00:37:03', 2),
(6, 2, '\r\nServices và dependency injection', '01:12:05', 3),
(7, 3, 'Giới thiệu - cài đặt - và chạy chương trình react js đầu tiên', '00:33:04', 1),
(8, 3, '\r\nKhái niệm và 4 cách định nghĩa component trong react js', '00:19:46', 2),
(9, 3, '\r\nKhái niệm và cách truyền thông tin qua props trong component', '00:17:28', 3);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `teachers`
--

CREATE TABLE `teachers` (
  `id` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `avatar` varchar(200) NOT NULL,
  `introduce` varchar(500) NOT NULL,
  `subject` varchar(150) NOT NULL,
  `rating` double NOT NULL,
  `flollowers` int(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `teachers`
--

INSERT INTO `teachers` (`id`, `name`, `avatar`, `introduce`, `subject`, `rating`, `flollowers`) VALUES
(1, 'Đặng Huỳnh Huy', 'teacher-1.jpg', 'Tốt nghiệp Đại học Bách khoa, khoa công nghệ thông tin.\r\nVới 10 năm kinh nghiệm giảng dạy, anh có hàng nghìn học viên đã tốt nghiệp và làm việc trong lĩnh vực thiết kế, đặc biệt là thiết kế website chuyên nghiệp.\r\nNgoài ra anh còn tham gia rất nhiều dự án dạy các shortcourse cho người đi làm và các dự án freelance khác về thiết kế website dựa trên ngôn ngữ lập trình mã nguồn mở.', 'Thiết kế Web', 4.9, 3900),
(2, 'Nguyễn Thanh Tài', 'teacher-2.jpg', 'Tốt nghiệp Đại học Bách khoa, khoa công nghệ thông tin.\r\nVới 10 năm kinh nghiệm giảng dạy, anh có hàng nghìn học viên đã tốt nghiệp và làm việc trong lĩnh vực thiết kế, đặc biệt là thiết kế website chuyên nghiệp.\r\nNgoài ra anh còn tham gia rất nhiều dự án dạy các shortcourse cho người đi làm và các dự án freelance khác về thiết kế website dựa trên ngôn ngữ lập trình mã nguồn mở.', 'Lập trình & CSDL', 4.8, 2500),
(3, 'Nguyễn Phước Khang', 'teacher-3.png', 'Tốt nghiệp Đại học Bách khoa, khoa công nghệ thông tin.\r\nVới 10 năm kinh nghiệm giảng dạy, anh có hàng nghìn học viên đã tốt nghiệp và làm việc trong lĩnh vực thiết kế, đặc biệt là thiết kế website chuyên nghiệp.\r\nNgoài ra anh còn tham gia rất nhiều dự án dạy các shortcourse cho người đi làm và các dự án freelance khác về thiết kế website dựa trên ngôn ngữ lập trình mã nguồn mở.', 'Lập trình di động', 4.6, 1800),
(4, 'Nguyễn Vũ Lân', 'teacher-4.jpeg', 'Tốt nghiệp Đại học Bách khoa, khoa công nghệ thông tin.\r\nVới 10 năm kinh nghiệm giảng dạy, anh có hàng nghìn học viên đã tốt nghiệp và làm việc trong lĩnh vực thiết kế, đặc biệt là thiết kế website chuyên nghiệp.\r\nNgoài ra anh còn tham gia rất nhiều dự án dạy các shortcourse cho người đi làm và các dự án freelance khác về thiết kế website dựa trên ngôn ngữ lập trình mã nguồn mở.', 'Tin học văn phòng', 4.7, 1500),
(5, 'Nguyễn Thị Triệu', 'teacher-5.jpg', 'Tốt nghiệp Đại học Bách khoa, khoa công nghệ thông tin.\r\nVới 10 năm kinh nghiệm giảng dạy, anh có hàng nghìn học viên đã tốt nghiệp và làm việc trong lĩnh vực thiết kế, đặc biệt là thiết kế website chuyên nghiệp.\r\nNgoài ra anh còn tham gia rất nhiều dự án dạy các shortcourse cho người đi làm và các dự án freelance khác về thiết kế website dựa trên ngôn ngữ lập trình mã nguồn mở.', 'Marketing', 4.8, 2790),
(6, 'Nguyễn Nguyên Khôi', 'teacher-6.jpg', 'Tốt nghiệp Đại học Bách khoa, khoa công nghệ thông tin.\r\nVới 10 năm kinh nghiệm giảng dạy, anh có hàng nghìn học viên đã tốt nghiệp và làm việc trong lĩnh vực thiết kế, đặc biệt là thiết kế website chuyên nghiệp.\r\nNgoài ra anh còn tham gia rất nhiều dự án dạy các shortcourse cho người đi làm và các dự án freelance khác về thiết kế website dựa trên ngôn ngữ lập trình mã nguồn mở.', 'SEO', 4.7, 2220);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `fullname` varchar(200) NOT NULL,
  `email` varchar(200) NOT NULL,
  `password` varchar(150) NOT NULL,
  `avatar` varchar(200) DEFAULT 'avt.avif',
  `phone` varchar(11) DEFAULT NULL,
  `role` tinyint(1) NOT NULL DEFAULT 0 COMMENT '1: Admin, 0: Người dùng\r\n'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `users`
--

INSERT INTO `users` (`id`, `fullname`, `email`, `password`, `avatar`, `phone`, `role`) VALUES
(5, 'Huỳnh Huy', 'huy@gmail.com', '$2b$10$TLZWPdAaPgMsLV6q1qtC6.dpPs5ozH60f.SQ0Qbrpigs6mRVs50hq', 'avt.avif', '0999999999', 1),
(15, 'Huỳnh Huy', 'huy1@gmail.com', '$2b$10$KojrwJUyZZkuz43bGOdFxOxVWeEmIXXAM0DbHH8W1C8bc237WMIwa', 'avt.avif', '0888888888', 0),
(16, 'Huynh Huy', 'danghuynhhuy776@gmail.com', '$2b$10$8NsPes6YdBc7pfcNdMzsR.XSy0f7D9IHj4SFFY0THKKhJsGy8skem', 'z3584310480605_a5a6eadb281f7122115dde9208d9d1ea.jpg', '09876543211', 0),
(18, 'Huy Dang', 'huy922003@gmail.com', '$2b$10$eQsJ8vgFEHErbUnPOEsmB.pYrupW/NhZJdChEm3OuHTzLLPryqdAy', 'avt.avif', NULL, 0);

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `courses`
--
ALTER TABLE `courses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `course_cate_fk` (`id_category`),
  ADD KEY `course_teacher_fk` (`id_teacher`);

--
-- Chỉ mục cho bảng `course_detail`
--
ALTER TABLE `course_detail`
  ADD PRIMARY KEY (`id`),
  ADD KEY `course_detail_fk` (`id_course`);

--
-- Chỉ mục cho bảng `teachers`
--
ALTER TABLE `teachers`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT cho bảng `courses`
--
ALTER TABLE `courses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT cho bảng `course_detail`
--
ALTER TABLE `course_detail`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT cho bảng `teachers`
--
ALTER TABLE `teachers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT cho bảng `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `courses`
--
ALTER TABLE `courses`
  ADD CONSTRAINT `course_cate_fk` FOREIGN KEY (`id_category`) REFERENCES `categories` (`id`),
  ADD CONSTRAINT `course_teacher_fk` FOREIGN KEY (`id_teacher`) REFERENCES `teachers` (`id`);

--
-- Các ràng buộc cho bảng `course_detail`
--
ALTER TABLE `course_detail`
  ADD CONSTRAINT `course_detail_fk` FOREIGN KEY (`id_course`) REFERENCES `courses` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
