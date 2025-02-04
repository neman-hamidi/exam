-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 04, 2025 at 07:27 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `arghavan`
--

-- --------------------------------------------------------

--
-- Table structure for table `car`
--

CREATE TABLE `car` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `photo` varchar(255) NOT NULL,
  `price` int(11) NOT NULL,
  `year` int(11) NOT NULL,
  `body` varchar(255) NOT NULL,
  `work` int(11) NOT NULL,
  `color` varchar(255) NOT NULL,
  `letter` varchar(255) NOT NULL,
  `insurance` varchar(255) NOT NULL,
  `rubber` varchar(2550) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_persian_ci;

--
-- Dumping data for table `car`
--

INSERT INTO `car` (`id`, `name`, `photo`, `price`, `year`, `body`, `work`, `color`, `letter`, `insurance`, `rubber`) VALUES
(1, 'پراید', '/images/pride.jpg', 200, 1394, 'خوردگی', 140, 'سفید', 'دارد', '9 ماه', 'کامل'),
(2, 'پارس سال', '/images/pars.png', 750, 1400, 'سالم', 77, 'سفید', 'ندارد', '9 ماه', '70%'),
(3, 'پراید 111', '/images/pride111.png', 123, 1397, 'سالم', 87, 'سفید', 'دارد', 'دارد', 'ندارد'),
(5, 'پارس تیوفایو', '/images/pars.png', 765, 1399, 'جزئی رنگ', 110, 'سفید', 'ندارد', 'دارد', 'ندارد'),
(6, 'سمند', '/images/samand.png', 566, 1392, 'تمام رنگ', 550, 'سفید', 'ندارد', 'دارد', 'ندارد'),
(7, 'پژو 405', '/images/pars.png', 560, 1399, 'سالم', 110, 'سفید', 'داره', 'دارد', 'کامل');

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `userClass` varchar(155) DEFAULT NULL,
  `suggest` varchar(255) DEFAULT NULL,
  `text` varchar(4000) NOT NULL,
  `approved` int(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_persian_ci;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`id`, `name`, `userClass`, `suggest`, `text`, `approved`) VALUES
(33, 'dfg', 'dfg', 'dfg', 'dgf', 1),
(35, 'عدنان', 'دهم', 'کنکور', 'عالی است', 0),
(36, 'نواب', '11', 'ریاضی', 'سوالات بسیار عالی بود', 1);

-- --------------------------------------------------------

--
-- Table structure for table `question`
--

CREATE TABLE `question` (
  `id` int(7) NOT NULL,
  `subTitle` varchar(100) NOT NULL,
  `Title` varchar(255) DEFAULT NULL,
  `SuggestTime` int(5) DEFAULT NULL,
  `question` varchar(1000) NOT NULL,
  `qu1` varchar(1000) NOT NULL,
  `qu2` varchar(1000) NOT NULL,
  `qu3` varchar(1000) NOT NULL,
  `qu4` varchar(1000) NOT NULL,
  `correctAnswer` varchar(1000) NOT NULL,
  `description` varchar(2550) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_persian_ci;

--
-- Dumping data for table `question`
--

INSERT INTO `question` (`id`, `subTitle`, `Title`, `SuggestTime`, `question`, `qu1`, `qu2`, `qu3`, `qu4`, `correctAnswer`, `description`) VALUES
(35, 'shimi', 'شیمی', 40, 'جدول تناوبی عنصرها بر اساس .........................................ساماندهی شده است.', 'کاهش عدد اتمی', 'افزایش جرم', 'افزایش عدد اتمی\n\n', 'کاهش جرم\n\n', 'افزایش عدد اتمی\n\n', 'توضیحات سوال'),
(37, 'konkur', 'کنکور سال 92', 10, 'سوال', 'گزینه 1', 'گزینه2', 'گزینه3', 'گزینه4', 'گزینه 3', 'توضیحات راجب جواب سوال'),
(38, 'shimi', 'کنکور سال 92', 10, 'jhkjhkjی', 'asdی', 'Dیddd', 'aیsdS', 'ssی', 'gیf', 'as'),
(41, 'zist', 'زیست', 15, 'درون تخمدان خانمی از بدو تشکیل تا یائسگی چند عبارت جمله زیر را بطور صحیح تکمیل میکند؟\r\n\r\n《هر مام یاخته(اووسیت) ای که ...........》\r\n\r\nالف)در مرحله فولیکولی به وجود میآید، کروموزومهای آن در دوران جنینی مضاعف شده است.\r\nب) در مرحله لوتئال یافت میشود، فامتنهای همتا آن از طول در کنار هم قرار دارند.\r\n\r\nج) توسط یاخته هایی تغذیه میشود که قابلیت تقسیم دارند، با تقسیم خود، یاخته های تک لاد (هاپلوئید) تولیدمیکند.\r\n\r\nد) لایه شفاف ژلهای آن به جدار لقاحی تبدیل شده است، در پی تکمیل تقسیم کاستمان، هسته آن با هسته اسپرم ادغام میشود.\r\n\r\nهـ) دارای کروموزومهای دو کروماتیدی است، درون انبانک (فولیکول) به وجود می آید.', '2', '4', '1', '3', '2', 'گزینه 1،مورد 《الف و ب》'),
(42, 'zist', 'زیست', 0, 'کدام گزینه در رابطه با یاخته های واقع در لوله گوارش انسان نادرست است؟ 《در پی ......... یاخته های..........》', 'پر کاری تیروئید ـ تولید کننده پپسینوژن +Hبیشتری را تولید می کنند.', 'افزایش فعالیت ـ هدف سکرتین، با افزایش ترشح بیکربنات، در فعال کردن پروتئازها در فضای روده نقش دارند.', 'کم کاری ـ ترشح کننده فاکتور داخلی معده، هضم پروتئین های غذایی فرد دستخوش اختلال شود.', 'کم ترشحی ـ ترشح کننده اسید در لایه مخاطی، ترشح نوعی پیک شیمیایی از کلیه افزایش می یابد.', 'کم کاری ـ ترشح کننده فاکتور داخلی معده، هضم پروتئین های غذایی فرد دستخوش اختلال شود.', 'ندارد'),
(43, 'zist', 'زیست', 0, 'در انسان بالغ، طی فرایند تبدیل یاخته های حاصل از اسپرماتوسیت.............. قبل ازاینکه......', 'اولیه به اسپرماتید ـ حلقه انقباضی اکتین و میوزین در غشای هسته تشکیل شود، کروموزوم های تـک کروماتیـدی در قطبین یاختـه تجمع می یابند.', 'ثانویه به اسپرم یاخته حالت کشیده پیدا کنند، کروموزوم ها فشرده شده و در سر اسپرم به صورت مجزا قرار می گیرد.', 'اولیه به اسپرماتیدـ کروموزوم های همتا از یکدیگر جدا شوند، تترادها در استوای سلول قرار میگیرند.', 'ثانویه به اسپرم ـ مقدار زیادی از سیتوپلاسم خود را از دست بدهند، از هم جدا و تاژک دار می شوند.', 'ثانویه به اسپرم ـ مقدار زیادی از سیتوپلاسم خود را از دست بدهند، از هم جدا و تاژک دار می شوند.', 'ندارد :)'),
(44, 'zist', 'زیست', 0, 'چند عبارت در رابطه با یاخته های واقع در غدد معده انسان درست است؟《در پی کاهش فعالیت یاخته‌های..........》\n\nالف)ترشح کننده گاسترین، pH کیموس معده افزایش و ترشح پپسین از یاخته های اصلی کاهش می یابد.\nب)یاخته های ترشح کننده کلریدریک اسید، کارکرد صحیح فولیک اسید مختل می شود.\nج) یاخته های پوششی سطحی، ترشح موسین و بیکربنات کاهش می یابد.\nد)ترشح کننده فاکتور داخلی، هضم پروتئین های غذایی فرد دستخوش اختلال می شود.', '1', '2', '3', '4', '2', 'ندارد'),
(45, 'zist', 'زیست', 0, 'در انسان سالم و بالغ هر یاخته........', 'که بطورموقت یا دائمی تقسیم نمیشود در مرحله‌ای متوقف شده است که کروموزوم های آن تک کروماتیدی هستند.', 'بنیادی بالغ، در مغز قرمز استخوان و در بین حفرات بافت اسفنجی استخوان ها قرار دارد.', 'خونی که خارج از مغز قرمز استخوان، غشاء هسته خود را ناپدید میکند، در غشای سیتوپلاسمی خود گیرنده آنتیژنی دارد.', 'تشکیل دهنده ساختاری درون رحم که رابط بین بند ناف و مادر است، از ترفوبلاست منشأ گرفته است.', 'خونی که خارج از مغز قرمز استخوان، غشاء هسته خود را ناپدید میکند، در غشای سیتوپلاسمی خود گیرنده آنتیژنی دارد.', 'نداااارد'),
(46, 'zist', 'زیست', 0, 'در انسان بخشی از لوله گوارش.....', 'که بلع به صورت غیر ارادی از آن آغاز میشود، هنگام عبور غذا از آن پل مغز با اثر بر مرکز اصلی تنفس دم را متوقف می کند.', 'که قوی ترین و متنوع ترین پروتئازها را تولید میکند، تحت تأثیر سکرتین، ترشح بیکربنات خود را افزایش می دهد.', 'که هنگام عبور غذا از آن منجربه مهار شدن فعالیت مرکز تنفس میشود، حرکات کرمی را آغاز می کند.', 'صفرا همراه با شیره لوزالمعده وارد آن میشود، گوارش لیپیدها و پروتئینها را آغاز می کند.', 'که هنگام عبور غذا از آن منجربه مهار شدن فعالیت مرکز تنفس میشود، حرکات کرمی را آغاز می کند.', 'آقا ندارد بیخیال دگ'),
(47, 'zist', 'زیست', 0, 'به طور معمول، در بخش شنوایی گوش انسان، ............... از ............... رخ می‌دهد.', 'لرزش استخوان رکابی پیش ـ ارتعاش پرده صماخ', ' لرزش مژک های درون ماده ژلاتینی پس ـ ارتعاش دریچ بیضی', ' باز شدن کانال های یونی غشاء یاخته های عصبی پس لرزش ماده ژلاتینی در تماس با‌ مژک ها', 'خم شدن مژک های یاخته های بخش دهلیزی پیش ـ تغییر نفوذپذیری غشاء یاخته گیرنده', ' باز شدن کانال های یونی غشاء یاخته های عصبی پس لرزش ماده ژلاتینی در تماس با‌ مژک ها', 'نداااارد'),
(48, 'zist', 'زیست', 0, 'در کلیه یک فرد سالم، هر مادهای که ............... قطعاً.............', 'به دنبال عبور از وابران به درون نفرون واردشده، ـ از بین دو شبکه مجزایی از رشته های پروتئینی و گلیکوپروتئینی عبور کرده است.', 'در بخش قشری به درون گردیزه وارد میشود ـ با عبور از شبکه دوم مویرگی قادر است به خون باز گردد.', 'بدون صرف انرژی به مجرای نفرون وارد شده ـ از بین زوائد یاخته های پودوسیتی عبور کرده است.', ' با عبور از شبکه دوم مویرگی به مجرای نفرون وارد میشود ـ در سرخرگ ورودی به کلیه نسبت به سیاهرگ خروجـی مقـدار کم تری دارد.', 'به دنبال عبور از وابران به درون نفرون واردشده، ـ از بین دو شبکه مجزایی از رشته های پروتئینی و گلیکوپروتئینی عبور کرده است.', 'آقا ندارد بیخیال دگ'),
(49, 'zist', 'زیست', 0, 'کدام عبارت صحیح است؟', 'هر اندامی که خون سیاهرگ های آن وارد باب میشود، نوعی اندام مرتبط با لوله گوارش است.', 'هر اندام لنفی که خون آن وارد سیاهرگ باب میشود، در آزادسازی آهن موجود در یاخته های خونی مرده، نقش مؤثری دارد.', ' هر هورمونی که پس از ترشح قبل از ورود به قلب از طریق باب وارد کبد میشود، از نوعی غده درون ریز ترشح می شود.', 'هر غده درون ریز که خون سیاهرگ آن وارد باب میشود، هورمون های آن قبل از ورود به قلب از اندام هدف خود عبور می کند.', 'هر غده درون ریز که خون سیاهرگ آن وارد باب میشود، هورمون های آن قبل از ورود به قلب از اندام هدف خود عبور می کند.', ':)'),
(50, 'zist', 'زیست', 0, 'کدام گزینه، در رابطه با ریشه گیاهان عبارت مقابل را بطور صحیح تکمیل میکند؟ 《در گیاه(هان).......', 'گل جالیزی، بخشی از مواد آلی موجود در شیره پرورده از آوند آبکش با انتقال فعال بار برداری و مصرف می شود.', 'سِس برای دریافت مواد مغذی، اندام های مکنده به درون دستگاه آوندی گیاه میزبان نفوذ می کند.', ' پروانه واران، هر یاخته زنده که با انتقال فعال یونها را به درون آوند چوبی منتقل میکند، در استوانه آوندی قرار دارد.', 'گونرا، سیانوباکتری های همزیست که تثبیت نیتروژن انجام میدهند، از محصولات فتوسنتزی گیاه استفاده می کنند.', 'گل جالیزی، بخشی از مواد آلی موجود در شیره پرورده از آوند آبکش با انتقال فعال بار برداری و مصرف می شود.', 'باشه در آینده میزارم :)'),
(57, 's', 's', 0, 's', 's', 's', 's', 's', 's', 's');

-- --------------------------------------------------------

--
-- Table structure for table `result`
--

CREATE TABLE `result` (
  `id` int(11) NOT NULL,
  `Name` varchar(255) DEFAULT NULL,
  `Course` varchar(255) DEFAULT NULL,
  `Score` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_persian_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `user` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_persian_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `user`, `password`, `email`) VALUES
(80, 'ds', 'd', '$2a$10$ZIjzzkDGWksQpeEQ4KtPQ.yvJNSHcr6VKvSHuG6LNtL.t3H4LB4rm', ''),
(81, 'w', 'w', '$2a$10$nCRlomV19SpN3PcDxuvfmOGSZ/egQNlofC74M.ff8nPOnnQb9B7Dm', ''),
(82, 'ww', 'w', '$2a$10$v7e5ldHbMX52GcYcc.oIbOFwvUGMApscPq9BqCA/q7fWp8RMCt3vW', ''),
(83, 'd', 'd', '$2a$10$kPfH6Qwnc2R8js2iRmnUX.fLlJEmaIT1zi12I1mLxaIA1dSUR4Ot2', ''),
(84, 'neman', 'hamidi', '$2a$10$AIJCe0ROXw/wWJplGshAUus/fZsIhMnXOdZs.RHAWgx/f0EzCKwpm', ''),
(85, 'dw', 'dw', '$2a$10$5qXRwXfv6eA6et0UAzbUmOQ1qpFkW8dXTOxOD3ZWt3ZSofiXymEce', ''),
(86, 'ss', 'ss', 'ss', ''),
(87, 'NemanHamidiUserAdmin', 'NemanHamidiUserAdmin', 'NemanHamidiUserAdmin', 'hosha1290@gmail.com');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `car`
--
ALTER TABLE `car`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `question`
--
ALTER TABLE `question`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `result`
--
ALTER TABLE `result`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `car`
--
ALTER TABLE `car`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `question`
--
ALTER TABLE `question`
  MODIFY `id` int(7) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=59;

--
-- AUTO_INCREMENT for table `result`
--
ALTER TABLE `result`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35661;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=88;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
