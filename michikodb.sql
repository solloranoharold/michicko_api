-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: bd3bl6vigzn6awaepqc3-mysql.services.clever-cloud.com:3306
-- Generation Time: Oct 17, 2024 at 03:59 AM
-- Server version: 8.0.22-13
-- PHP Version: 8.2.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bd3bl6vigzn6awaepqc3`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_accounts`
--

CREATE TABLE `tbl_accounts` (
  `account_id` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `employee_id` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `organization_id` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT '0',
  `username` varchar(20) COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `account_status` int NOT NULL DEFAULT '1',
  `position_id` int DEFAULT '2',
  `isSignIn` tinyint(1) DEFAULT '0',
  `date_created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_accounts`
--

INSERT INTO `tbl_accounts` (`account_id`, `employee_id`, `organization_id`, `username`, `password`, `account_status`, `position_id`, `isSignIn`, `date_created`) VALUES
('00000002', '00000002', '0', 'test.jc', 'U2FsdGVkX1+3GR7s27Q2BfYC4se8199Cxb52E0DHdT8=', 1, 1, 0, '2024-08-05 05:03:00'),
('00000003', '00000003', '0', 'dave.michiko.gentri', 'U2FsdGVkX1/kWe04QIcU4gKOD/08sFGIr0PoXnS2+0g=', 1, 1, 0, '2024-08-11 05:41:14'),
('00000004', '00000004', 'lzp4y0cjqyenjn', 'davegentri.admin', 'U2FsdGVkX18glz8ecjvoDXhugixDcXLYPH5n+Tzfkls=', 1, 2, 0, '2024-08-11 05:51:48'),
('00000005', '00000004', 'lzp4y0cjqyenjn', 'davegentri.cashier', 'U2FsdGVkX1/zEc58swcSKWZ1Bhwn4ovJk/u90OuDDW0=', 1, 3, 0, '2024-08-11 05:52:10'),
('00000006', '00000005', 'lzp4y0cjqyenjn', 'mac.michiko.senior', 'U2FsdGVkX19a1ze49+V9VXwGCvHeAdYalF4RTXrjwbt2W6mwOfU4QbI0QKy5EmBi', 1, 3, 0, '2024-08-20 07:51:00'),
('00000007', '00000006', 'lzp4y0cjqyenjn', 'april.michiko.senior', 'U2FsdGVkX1+cuWpycNuNRL8hcXSCyif/BpceFdZsyvc=', 0, 3, 0, '2024-08-20 07:53:03'),
('00000008', '00000007', 'lzp4y0cjqyenjn', 'gab.michiko.senior', 'U2FsdGVkX18URR72iwU3Z80yJovPitgltWGCSFDqDCw=', 1, 3, 0, '2024-08-20 08:48:23'),
('00000009', '00000009', 'lzp4y0cjqyenjn', 'test.account.sr', 'U2FsdGVkX1/nd6cR9Ljq/on143XNj+5In2C6CRrJK5I=', 1, 3, 0, '2024-08-20 11:06:07'),
('00000010', '00000012', 'lzjdp55ay7583d', 'test_harold', 'U2FsdGVkX19WwufB0O6RUMKRYFjtBrHD0euqSDnuhVE=', 1, 2, 0, '2024-09-07 17:42:18'),
('00000011', '00000015', 'lzp4y0cjqyenjn', 'izzy.michiko.senior', 'U2FsdGVkX181gukLiPVYytGmDBqYAuuQiir4nsWVBbv9kLDW+EZbUJpfp56/ZN8R', 1, 3, 0, '2024-09-12 03:38:04'),
('00000012', '00000016', 'lzp4y0cjqyenjn', 'izzy.michiko.senior2', 'U2FsdGVkX1+SPu8QONMW6VGDRRshziQZGoWgdOfU9FY=', 1, 3, 0, '2024-09-28 04:39:37'),
('1', '0', '-1', 'ADMINISTRATOR', 'U2FsdGVkX1+Qi5D3OSD2Bb87d1Bd8yUiH0yshdARehs=', 1, 0, 0, '2024-07-06 14:14:01');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_category`
--

CREATE TABLE `tbl_category` (
  `category_id` int NOT NULL,
  `category_name` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `date_created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_category`
--

INSERT INTO `tbl_category` (`category_id`, `category_name`, `date_created`) VALUES
(1, 'Hair Care', '2024-07-11 20:58:49'),
(2, 'Hand & Foot Care', '2024-07-11 20:58:49'),
(3, 'Styling & Make Up', '2024-07-11 20:59:37'),
(4, 'Eyebrow', '2024-07-11 20:59:37'),
(5, 'Waxing', '2024-07-11 21:00:09'),
(6, 'Add Ons', '2024-07-11 21:00:09'),
(7, 'OTC', '2024-07-11 21:01:18'),
(8, 'Hair Color', '2024-07-11 21:01:18'),
(10, 'Styling & Make Up', '2024-07-11 21:01:47'),
(11, 'Spa Party Package', '2024-07-11 21:02:19'),
(12, 'Promo', '2024-07-11 21:03:03');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_clients`
--

CREATE TABLE `tbl_clients` (
  `client_id` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `last_name` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `first_name` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `contact_no` varchar(20) COLLATE utf8mb4_general_ci NOT NULL,
  `client_email` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `client_address` varchar(500) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `organization_id` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `date_created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_clients`
--

INSERT INTO `tbl_clients` (`client_id`, `last_name`, `first_name`, `contact_no`, `client_email`, `client_address`, `organization_id`, `date_created`) VALUES
('00000001', 'Test', 'Client', '0911023133', 'test@gmail.com', 'Lancaster', 'lzp4y0cjqyenjn', '2024-08-11 05:56:35'),
('00000002', 'Petty', 'Dave', '09278883473', 'pettypetty1113@gmail.com', 'Block 9 lot 6 Kennedy Street Brighton 4 lancaster new city, brgy. pasong camachile 1', 'lzp4y0cjqyenjn', '2024-08-18 09:56:44'),
('00000003', 'Intoy', 'Cess', '09464740537', 'Cess@None.com', NULL, 'lzp4y0cjqyenjn', '2024-08-24 07:43:39'),
('00000004', 'skyes', 'Sarah', '09176550906', 'mojicasarahjane@gmail.con', NULL, 'lzp4y0cjqyenjn', '2024-08-24 07:44:55'),
('00000005', 'C', 'Carolyn', '9152843637', 'cporongan@gmail.com ', NULL, 'lzp4y0cjqyenjn', '2024-08-24 07:46:01'),
('00000006', 'Lalo', 'Maria Arlene', '09175265191', 'arlene.lalo@rhenus.com', NULL, 'lzp4y0cjqyenjn', '2024-08-24 07:46:46'),
('00000007', 'Test Test', 'Dave test', '09278883475', 'pettypetty1113@gmail.com', 'Peras St.', 'lzp4y0cjqyenjn', '2024-08-28 02:49:55'),
('00000008', 'ivy', 'ivy', '09364479300', 'jhillianxhane@gmail.com', NULL, 'lzp4y0cjqyenjn', '2024-08-28 06:34:15'),
('00000009', 'Sitchon', 'Kemuel', '09279567080', 'hannamarcelo27@yahoo.com', 'lancaster', 'lzp4y0cjqyenjn', '2024-08-29 05:37:18'),
('00000010', 'banana', 'hannah', '0935531727689', NULL, NULL, 'lzp4y0cjqyenjn', '2024-08-29 06:20:46'),
('00000011', 'lee', 'grace', '09236285052', NULL, NULL, 'lzp4y0cjqyenjn', '2024-08-29 07:58:38'),
('00000012', 'coronacion', 'angeli', '09161715913', NULL, NULL, 'lzp4y0cjqyenjn', '2024-08-30 05:35:40'),
('00000013', 'correo', 'cynthia', '09399037022', NULL, NULL, 'lzp4y0cjqyenjn', '2024-08-30 05:41:34'),
('00000014', 'c', 'geneva', '09191234567', NULL, NULL, 'lzp4y0cjqyenjn', '2024-08-31 08:38:52'),
('00000015', 'd', 'carmen', '09191234567', NULL, NULL, 'lzp4y0cjqyenjn', '2024-08-31 08:39:15'),
('00000016', 'd', 'monette', '09191234567', NULL, NULL, 'lzp4y0cjqyenjn', '2024-08-31 08:39:39'),
('00000017', 'm', 'cynthia', '09191234567', NULL, NULL, 'lzp4y0cjqyenjn', '2024-09-01 05:18:44'),
('00000018', 'augustin', 'maureen', '09560016651', NULL, 'brighton 1', 'lzp4y0cjqyenjn', '2024-09-03 05:40:51'),
('00000019', 'ann', 'julie anne', '1234567890', NULL, NULL, 'lzp4y0cjqyenjn', '2024-09-05 06:25:36'),
('00000020', 'test_client', 'test_client', '12312312312', NULL, NULL, 'lzjdp55ay7583d', '2024-09-07 17:47:17'),
('00000021', 'deseo  ', 'leilani', '09168649656', NULL, NULL, 'lzp4y0cjqyenjn', '2024-09-08 03:58:35'),
('00000022', 'bongcayao', 'maryann', '09988889654', NULL, NULL, 'lzp4y0cjqyenjn', '2024-09-08 04:32:41'),
('00000023', 'Manalili', 'Ruth', '09228782073', NULL, NULL, 'lzp4y0cjqyenjn', '2024-09-08 07:41:32'),
('00000024', 'Laluna', 'Rose Abigael ', '09669361326', 'ella18abigael@gmail.com', NULL, 'lzp4y0cjqyenjn', '2024-09-10 05:08:11'),
('00000025', 'Baban', 'Grace', '09173201208', 'Marygraceplao@gmail.com', 'Intel', 'lzp4y0cjqyenjn', '2024-09-11 07:01:18'),
('00000026', 'trias', 'cj', '09559915170', NULL, NULL, 'lzp4y0cjqyenjn', '2024-09-11 08:34:39'),
('00000027', 'Austria', 'Vivian', '12345678', 'NA', NULL, 'lzp4y0cjqyenjn', '2024-09-12 03:41:34'),
('00000028', 'mojica', 'isabel', '09178059353', NULL, NULL, 'lzp4y0cjqyenjn', '2024-09-12 04:46:43'),
('00000029', 'marlon', 'marlon gl1', '1234567890', NULL, NULL, 'lzp4y0cjqyenjn', '2024-09-12 05:56:01'),
('00000030', 'Pamuk ', 'Jacqueline', '09177757561', NULL, NULL, 'lzp4y0cjqyenjn', '2024-09-13 05:38:10'),
('00000031', 'Aliermo', 'Kzar', '09285199655', NULL, NULL, 'lzp4y0cjqyenjn', '2024-09-13 05:42:47'),
('00000032', 'Agayatin', 'Khairia', '09999906233', NULL, NULL, 'lzp4y0cjqyenjn', '2024-09-13 05:43:21'),
('00000033', 'O’Brien Grant', 'Anabel', '14433036307', NULL, NULL, 'lzp4y0cjqyenjn', '2024-09-13 05:44:04'),
('00000034', 'magisa', 'paz', '09260963030', NULL, NULL, 'lzp4y0cjqyenjn', '2024-09-13 09:13:09'),
('00000035', 'Perez', 'Reizel', '090554375174', NULL, NULL, 'lzp4y0cjqyenjn', '2024-09-17 08:33:59'),
('00000036', 'Agustin', 'Jesusa Nina', '09560016651', NULL, NULL, 'lzp4y0cjqyenjn', '2024-09-17 08:34:54'),
('00000037', 'Santos', 'Joan', '09178238223', NULL, NULL, 'lzp4y0cjqyenjn', '2024-09-17 08:35:28'),
('00000038', 'Narag', 'Nancy', '09708305641', NULL, NULL, 'lzp4y0cjqyenjn', '2024-09-28 07:02:13'),
('00000039', 'Fos', 'Pheobe grace', '09613989589', NULL, NULL, 'lzp4y0cjqyenjn', '2024-09-28 07:18:40'),
('00000040', 'flores', 'jean', '09171335132', NULL, NULL, 'lzp4y0cjqyenjn', '2024-09-28 07:21:20'),
('00000041', 'Malabonga', 'Dheq marie', '09954780298', NULL, NULL, 'lzp4y0cjqyenjn', '2024-09-28 08:40:00'),
('00000042', 'Tanguanco', 'Rosalie', '09761055486', NULL, NULL, 'lzp4y0cjqyenjn', '2024-09-28 10:15:22'),
('00000043', 'Castillo ', 'Frances claire', '09176395419', NULL, NULL, 'lzp4y0cjqyenjn', '2024-09-28 10:51:47'),
('00000044', 'Asuncion', 'Clette', '09176589303', NULL, NULL, 'lzp4y0cjqyenjn', '2024-09-29 06:05:41'),
('00000045', ' Villaluz', 'Nathalie ', '09206482399', NULL, NULL, 'lzp4y0cjqyenjn', '2024-09-29 06:22:14'),
('00000046', ' Ramacula', 'Conrose', '09178113082', NULL, NULL, 'lzp4y0cjqyenjn', '2024-09-29 07:06:57'),
('00000047', ' Algo', 'glenda', '091580095040', NULL, NULL, 'lzp4y0cjqyenjn', '2024-09-29 07:45:21'),
('00000048', 'Urbano', 'Anj', '09052807089', NULL, NULL, 'lzp4y0cjqyenjn', '2024-09-29 08:40:18'),
('00000049', 'Gutierrz', 'Wyleen ', '09778563991', NULL, NULL, 'lzp4y0cjqyenjn', '2024-09-30 04:17:33'),
('00000050', 'Napocao', 'Wendy', '09984457598', NULL, NULL, 'lzp4y0cjqyenjn', '2024-10-01 03:01:36'),
('00000051', 'Bautista', 'Jinky', '09176232289', NULL, NULL, 'lzp4y0cjqyenjn', '2024-10-01 07:48:29'),
('00000052', 'gonzales', 'Debbie ', '09063159062', NULL, NULL, 'lzp4y0cjqyenjn', '2024-10-01 07:58:16'),
('00000053', 'Dimdam', 'Reinn Madeline', '09063670246', NULL, NULL, 'lzp4y0cjqyenjn', '2024-10-01 09:12:13'),
('00000054', 'Tortocion', 'Cecil', '09399100178', NULL, NULL, 'lzp4y0cjqyenjn', '2024-10-02 07:40:07'),
('00000055', 'Gomez', 'Jorgelita', '09562048880', NULL, NULL, 'lzp4y0cjqyenjn', '2024-10-04 06:04:27'),
('00000056', 'Yare', ' Yare', '09771531202', NULL, NULL, 'lzp4y0cjqyenjn', '2024-10-04 08:03:29');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_discounts`
--

CREATE TABLE `tbl_discounts` (
  `discount_id` int NOT NULL,
  `description` varchar(500) NOT NULL,
  `percent` int NOT NULL,
  `organization_id` varchar(100) NOT NULL,
  `date_created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_discounts`
--

INSERT INTO `tbl_discounts` (`discount_id`, `description`, `percent`, `organization_id`, `date_created`) VALUES
(1, 'PWD', 20, 'lzjdp55ay7583d', '2024-09-07 17:46:19'),
(2, 'Senior', 20, 'lzp4y0cjqyenjn', '2024-09-08 03:32:46'),
(3, 'PWD', 20, 'lzp4y0cjqyenjn', '2024-09-08 03:33:01'),
(4, 'XDEAL', 100, 'lzp4y0cjqyenjn', '2024-09-08 03:33:17');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_employees`
--

CREATE TABLE `tbl_employees` (
  `employee_id` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `commissions` int NOT NULL DEFAULT '0',
  `last_name` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `first_name` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `middle_name` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `nickname` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `email` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `age` int NOT NULL,
  `gender` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `address` varchar(300) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `brgy` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `municipality` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `zip_code` int DEFAULT NULL,
  `province` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `sss` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `pag_ibig` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `tin` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `philhealth` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `position` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `organization_id` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '0',
  `status` int NOT NULL DEFAULT '1',
  `date_created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_employees`
--

INSERT INTO `tbl_employees` (`employee_id`, `commissions`, `last_name`, `first_name`, `middle_name`, `nickname`, `email`, `age`, `gender`, `address`, `brgy`, `municipality`, `zip_code`, `province`, `sss`, `pag_ibig`, `tin`, `philhealth`, `position`, `organization_id`, `status`, `date_created`, `deleted_date`) VALUES
('0', 0, 'ADMIN', 'ADMIN', NULL, NULL, 'admin@gmail.com', 11111, 'Male', 'admin address', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Senior', '-1', 1, '2024-07-07 05:55:15', NULL),
('00000002', 0, 'Test', 'JC', '', NULL, 'johncarliguarina@gmail.com', 26, 'Male', 'Imus', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'ADMIN', '0', 1, '2024-08-05 04:50:20', NULL),
('00000003', 0, 'Petty', 'Dave', '', NULL, 'michikosalonofficial@gmail.com', 30, 'Male', 'General Trias', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'ADMIN', '0', 1, '2024-08-11 05:35:26', NULL),
('00000004', 0, 'Petty', 'Dave', '', NULL, 'pettypetty1113@gmail.com', 30, 'Male', 'General Trias', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Manager', 'lzp4y0cjqyenjn', 1, '2024-08-11 05:50:03', NULL),
('00000005', 10, 'Gallardo', 'Mark', NULL, 'Mac', 'marikgallardo01081993@gmail.com', 34, 'Others', 'P2 Block 8 Lot 5 Maricris Homes', 'Imus City', 'Cavite', NULL, NULL, NULL, NULL, NULL, NULL, 'Senior', 'lzp4y0cjqyenjn', 1, '2024-08-11 06:34:41', NULL),
('00000006', 3, 'Garcia', 'Aprilene', '', 'April', 'jhillianxhane@gmail.com', 35, 'Female', 'Blk 93 Lot 19 Phase 12A Wellington Place', 'General Trias', 'Cavite', NULL, NULL, NULL, NULL, NULL, NULL, 'Junior', 'lzp4y0cjqyenjn', 1, '2024-08-11 06:41:36', NULL),
('00000007', 10, 'Crisino', 'Gilbert Andres', '', 'Gab', 'gilbertandres2019@gmail.com', 45, 'Male', '876 Purok 6 Pasong Camachile 1', 'General Trias', 'Cavite', NULL, NULL, NULL, NULL, NULL, NULL, 'Senior', 'lzp4y0cjqyenjn', 1, '2024-08-11 06:46:25', NULL),
('00000008', 1, 'Balatbat', 'Sally', '', 'Sally', 'pettypetty1113@gmail.com', 47, 'Female', 'Block 94 Lot 21 Pahse 21a Wellington Place Brgy. Pascam 2', 'General Trias', 'Cavite', NULL, NULL, NULL, NULL, NULL, NULL, 'Junior', 'lzp4y0cjqyenjn', 1, '2024-08-15 10:09:37', NULL),
('00000009', 2, 'test', 'account', '', 'test', 'testaccount@gmail.com', 1, 'Male', 's', 'd', '1', 1111, NULL, '1231232131231', '1231313', '211231231', NULL, 'Senior', 'lzp4y0cjqyenjn', 1, '2024-08-20 11:05:44', NULL),
('00000010', 2, 'test', 'account 1 ', NULL, NULL, 'testaccount1@gmail.com', 12, 'Male', 'qqweqweq', 'qweqw', 'qweqwe', 12, NULL, NULL, NULL, NULL, NULL, 'Senior', 'lzp4y0cjqyenjn', 1, '2024-08-29 07:46:03', NULL),
('00000011', 3, 'Arcader', 'Anna Marie', NULL, 'Charlie', 'arcaderannamarie@gmai.com', 34, 'Trans', 'Block 8 lot 7 Section 2 Sunnybrooke 2', 'San Francisco', 'General Trias', NULL, NULL, NULL, NULL, NULL, NULL, 'Junior', 'lzp4y0cjqyenjn', 1, '2024-08-29 07:55:46', NULL),
('00000012', 0, 'Sollorano', 'Harold', NULL, 'Rold', 'harold.sollorano@gmail.com', 27, 'Male', 'Pascam I', 'Pascam 1', 'General Trias', 4107, NULL, NULL, NULL, NULL, NULL, 'Manager', 'lzjdp55ay7583d', 1, '2024-09-07 17:41:51', NULL),
('00000013', 12, 'test ', 'employee', '', 'test_employee', 'test_employee@gmail.com', 12, 'Male', 'fsdfsds', 'qweqweq', 'qweqwe', 1234, NULL, NULL, NULL, NULL, NULL, 'Senior', 'lzjdp55ay7583d', 1, '2024-09-07 17:43:32', NULL),
('00000014', 5, 'test', 'Employee 1 ', NULL, 'test_employee1', 'test_employee1@gmail.com', 23, 'Female', 'qweqweqweq', 'qweqweqw', 'qweqwe', 1234, NULL, NULL, NULL, NULL, NULL, 'Junior', 'lzjdp55ay7583d', 1, '2024-09-07 17:44:01', NULL),
('00000015', 10, 'Nelson', 'Jerico', NULL, 'Izzy', 'izzybermudonelson.121385@gmail.com', 38, 'Woman', 'Block 13, Lot 19 Manila Street, Camilla Leandra Subdivision, ', 'Bucandala 4', 'Imus', NULL, NULL, NULL, NULL, NULL, NULL, 'Senior', 'lzp4y0cjqyenjn', 1, '2024-09-12 03:34:26', NULL),
('00000016', 10, 'Nelson', 'Izzy', NULL, 'Izzy', 'izzybermudonelson.121385@gmail.com', 38, 'Female', 'Bucandala', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Senior', 'lzp4y0cjqyenjn', 1, '2024-09-28 04:36:58', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_expenses`
--

CREATE TABLE `tbl_expenses` (
  `expense_id` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `brand` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `expense_name` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `organization_id` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `date_created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_e_payment`
--

CREATE TABLE `tbl_e_payment` (
  `payment_id` int NOT NULL,
  `payment_method` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `organization_id` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `date_created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_e_payment`
--

INSERT INTO `tbl_e_payment` (`payment_id`, `payment_method`, `organization_id`, `date_created`) VALUES
(1, 'Gcash', 'lzp4y0cjqyenjn', '2024-08-11 05:44:59'),
(2, 'BDO', 'lzp4y0cjqyenjn', '2024-08-11 05:45:33'),
(3, 'maya', 'lzp4y0cjqyenjn', '2024-08-15 09:31:01'),
(4, 'GCASH', 'lzjdp55ay7583d', '2024-09-07 17:46:45'),
(5, 'Parlon Paid', 'lzp4y0cjqyenjn', '2024-09-13 10:00:24');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_inventory`
--

CREATE TABLE `tbl_inventory` (
  `inventory_id` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `organization_id` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `product_name` varchar(200) COLLATE utf8mb4_general_ci NOT NULL,
  `unit` varchar(30) COLLATE utf8mb4_general_ci NOT NULL,
  `date_created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted_date` datetime DEFAULT NULL,
  `updated_date` datetime DEFAULT NULL,
  `quantity` decimal(10,2) NOT NULL,
  `price` double(10,2) NOT NULL DEFAULT '0.00',
  `total_price` double(10,2) NOT NULL DEFAULT '0.00',
  `minimum_qty` int NOT NULL DEFAULT '1',
  `net_value` int NOT NULL,
  `total_value` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_inventory`
--

INSERT INTO `tbl_inventory` (`inventory_id`, `organization_id`, `product_name`, `unit`, `date_created`, `deleted_date`, `updated_date`, `quantity`, `price`, `total_price`, `minimum_qty`, `net_value`, `total_value`) VALUES
('00000001', 'lzp4y0cjqyenjn', '6% Oxidizing Cream SS', 'G', '2024-09-19 06:48:59', NULL, '2024-10-04 07:34:53', 4.47, 150.00, 1087.50, 5, 900, 4020.00),
('00000002', 'lzp4y0cjqyenjn', '9% Oxidizing Cream SS', 'G', '2024-09-19 06:50:31', NULL, '2024-10-01 09:01:39', 11.42, 150.00, 1725.00, 5, 900, 10280.00),
('00000003', 'lzp4y0cjqyenjn', '3% Oxidizing Cream SS', 'G', '2024-09-20 08:34:22', NULL, NULL, 12.50, 150.00, 1875.00, 5, 920, 11500.00),
('00000004', 'lzp4y0cjqyenjn', '3.0 SS', 'G', '2024-09-20 08:35:20', NULL, NULL, 14.00, 50.00, 700.00, 5, 83, 1159.20),
('00000005', 'lzp4y0cjqyenjn', '4.0 SS', 'G', '2024-09-24 11:14:32', NULL, '2024-10-02 08:25:46', 82.76, 50.00, 4150.00, 5, 83, 6869.00),
('00000006', 'lzp4y0cjqyenjn', '5.0 SS', 'G', '2024-09-24 11:15:25', NULL, '2024-09-24 19:15:23', 51.00, 50.00, 2550.00, 5, 83, 4233.00),
('00000007', 'lzp4y0cjqyenjn', '6.0 SS', 'G', '2024-09-24 11:23:56', NULL, '2024-09-24 19:23:54', 52.00, 50.00, 2600.00, 5, 83, 4316.00),
('00000008', 'lzp4y0cjqyenjn', '7.0 SS', 'G', '2024-09-20 08:50:02', NULL, '2024-10-01 09:01:41', 14.62, 50.00, 775.00, 5, 83, 1213.40),
('00000009', 'lzp4y0cjqyenjn', '8.0 SS', 'G', '2024-09-20 08:51:02', NULL, NULL, 33.25, 50.00, 1662.50, 5, 83, 2753.10),
('00000010', 'lzp4y0cjqyenjn', '9.0 SS', 'G', '2024-09-20 08:52:25', NULL, NULL, 19.00, 50.00, 950.00, 5, 83, 1573.20),
('00000011', 'lzp4y0cjqyenjn', '0.0 SS', 'G', '2024-09-20 08:52:58', NULL, NULL, 15.50, 50.00, 775.00, 5, 83, 1283.40),
('00000012', 'lzp4y0cjqyenjn', '6.1 SS', 'G', '2024-09-24 11:22:15', NULL, '2024-10-02 08:25:45', 33.33, 50.00, 1850.00, 10, 83, 2766.00),
('00000013', 'lzp4y0cjqyenjn', '7.1 SS', 'G', '2024-09-20 08:57:16', NULL, NULL, 11.50, 50.00, 575.00, 5, 83, 952.20),
('00000014', 'lzp4y0cjqyenjn', '8.1 SS', 'G', '2024-09-24 11:21:07', NULL, '2024-10-04 07:34:52', 38.01, 50.00, 2250.00, 10, 83, 3155.00),
('00000015', 'lzp4y0cjqyenjn', '6.3 SS', 'G', '2024-09-20 08:59:38', NULL, NULL, 18.75, 50.00, 937.50, 5, 83, 1552.50),
('00000016', 'lzp4y0cjqyenjn', '7.3 SS', 'G', '2024-09-20 09:00:30', NULL, NULL, 7.00, 50.00, 350.00, 5, 83, 579.60),
('00000017', 'lzp4y0cjqyenjn', '8.3 SS', 'G', '2024-09-24 11:25:48', NULL, '2024-09-24 19:25:42', 49.50, 50.00, 2475.00, 5, 83, 4108.50),
('00000018', 'lzp4y0cjqyenjn', '7.33 SS', 'G', '2024-09-20 09:03:03', NULL, '2024-10-01 09:01:41', 5.14, 50.00, 300.00, 5, 83, 426.80),
('00000019', 'lzp4y0cjqyenjn', '8.33 SS', 'G', '2024-09-20 09:04:06', NULL, NULL, 6.00, 50.00, 300.00, 5, 83, 496.80),
('00000020', 'lzp4y0cjqyenjn', '9.33 SS', 'G', '2024-09-20 09:04:33', NULL, NULL, 10.00, 50.00, 500.00, 5, 83, 828.00),
('00000021', 'lzp4y0cjqyenjn', '5.41 SS', 'G', '2024-09-20 09:05:15', NULL, NULL, 11.00, 50.00, 550.00, 5, 83, 910.80),
('00000022', 'lzp4y0cjqyenjn', '6.41 SS', 'G', '2024-09-20 09:06:04', NULL, NULL, 15.00, 50.00, 750.00, 5, 83, 1242.00),
('00000023', 'lzp4y0cjqyenjn', '7.41 SS', 'G', '2024-09-24 11:22:59', NULL, '2024-09-24 19:22:58', 10.00, 50.00, 500.00, 5, 83, 830.00),
('00000024', 'lzp4y0cjqyenjn', '8.41 SS', 'G', '2024-09-20 09:07:39', NULL, NULL, 12.00, 50.00, 600.00, 5, 83, 993.60),
('00000025', 'lzp4y0cjqyenjn', '6.4 SS', 'G', '2024-09-21 04:56:22', NULL, '2024-09-21 12:56:20', 5.00, 50.00, 250.00, 5, 83, 415.00),
('00000026', 'lzp4y0cjqyenjn', '6.43 SS', 'G', '2024-09-20 09:09:36', NULL, NULL, 12.00, 50.00, 600.00, 5, 83, 993.60),
('00000027', 'lzp4y0cjqyenjn', '7.43 SS', 'G', '2024-09-20 09:10:07', NULL, NULL, 5.00, 50.00, 250.00, 5, 83, 414.00),
('00000028', 'lzp4y0cjqyenjn', '8.43 SS', 'G', '2024-09-20 09:10:45', NULL, NULL, 11.00, 50.00, 550.00, 5, 83, 910.80),
('00000029', 'lzp4y0cjqyenjn', '5.4 SS', 'G', '2024-09-21 04:45:01', NULL, '2024-09-21 12:45:00', 8.00, 50.00, 400.00, 5, 83, 662.40),
('00000030', 'lzp4y0cjqyenjn', '5.5 SS', 'G', '2024-09-21 04:58:21', NULL, NULL, 3.00, 50.00, 150.00, 5, 83, 249.00),
('00000031', 'lzp4y0cjqyenjn', '55.7 SS', 'G', '2024-09-21 04:59:13', NULL, NULL, 4.00, 50.00, 200.00, 5, 83, 332.00),
('00000032', 'lzp4y0cjqyenjn', '5.66 SS', 'G', '2024-09-21 04:59:55', NULL, NULL, 2.00, 50.00, 100.00, 5, 83, 166.00),
('00000033', 'lzp4y0cjqyenjn', '6.66 SS', 'G', '2024-09-21 05:05:04', NULL, NULL, 5.00, 50.00, 250.00, 5, 83, 415.00),
('00000034', 'lzp4y0cjqyenjn', '0.22 SS', 'G', '2024-09-21 05:05:42', NULL, NULL, 11.00, 50.00, 550.00, 5, 83, 913.00),
('00000035', 'lzp4y0cjqyenjn', '0.33 SS', 'G', '2024-09-21 05:06:36', NULL, NULL, 2.00, 50.00, 100.00, 5, 83, 166.00),
('00000036', 'lzp4y0cjqyenjn', '0.66 GG', 'G', '2024-09-21 05:39:17', NULL, NULL, 5.00, 50.00, 250.00, 5, 83, 415.00),
('00000037', 'lzp4y0cjqyenjn', '0.99 SS', 'G', '2024-09-21 05:39:51', NULL, NULL, 3.75, 50.00, 187.50, 5, 83, 311.25),
('00000038', 'lzp4y0cjqyenjn', '0.88', 'G', '2024-09-21 05:40:49', NULL, NULL, 5.00, 50.00, 250.00, 5, 83, 415.00),
('00000039', 'lzp4y0cjqyenjn', '9.11 SS', 'G', '2024-09-21 05:43:15', NULL, NULL, 9.00, 50.00, 450.00, 5, 83, 747.00),
('00000040', 'lzp4y0cjqyenjn', '13.28 SS', 'G', '2024-09-21 05:43:59', NULL, NULL, 3.00, 50.00, 150.00, 5, 83, 249.00),
('00000041', 'lzp4y0cjqyenjn', 'V9.16 SS', 'G', '2024-09-21 05:44:48', NULL, NULL, 4.00, 50.00, 200.00, 5, 83, 332.00),
('00000042', 'lzp4y0cjqyenjn', 'G9.12 SS', 'G', '2024-09-21 05:45:25', NULL, NULL, 3.50, 50.00, 175.00, 5, 83, 290.50),
('00000043', 'lzp4y0cjqyenjn', '13.08 SS', 'G', '2024-09-21 05:46:26', NULL, NULL, 5.25, 50.00, 262.50, 5, 83, 435.75),
('00000044', 'lzp4y0cjqyenjn', '13.25 SS', 'G', '2024-09-21 05:47:00', NULL, NULL, 10.50, 50.00, 525.00, 5, 83, 871.50),
('00000045', 'lzp4y0cjqyenjn', '9.18 SS', 'G', '2024-09-21 05:47:35', NULL, NULL, 5.00, 50.00, 250.00, 5, 83, 415.00),
('00000046', 'lzp4y0cjqyenjn', '13.12 SS', 'G', '2024-09-21 05:48:14', NULL, NULL, 5.50, 50.00, 275.00, 5, 83, 456.50),
('00000047', 'lzp4y0cjqyenjn', '0.00 AS', 'G', '2024-09-21 05:49:31', NULL, '2024-10-04 07:34:51', 5.40, 36.00, 216.00, 5, 83, 448.00),
('00000048', 'lzp4y0cjqyenjn', '55.0 AS', 'G', '2024-09-21 05:51:09', NULL, NULL, 13.50, 36.00, 486.00, 5, 83, 1120.50),
('00000049', 'lzp4y0cjqyenjn', '13.15 SS', 'G', '2024-09-21 08:24:57', NULL, NULL, 10.50, 50.00, 525.00, 5, 83, 869.40),
('00000050', 'lzp4y0cjqyenjn', 'Test 111', 'G', '2024-09-21 08:25:59', '2024-09-21 16:26:12', '2024-09-21 16:26:12', 10.00, 50.00, 500.00, 5, 83, 828.00),
('00000051', 'lzp4y0cjqyenjn', '9.18 SS', 'G', '2024-09-21 08:38:01', NULL, NULL, 5.00, 50.00, 250.00, 5, 83, 414.00),
('00000052', 'lzp4y0cjqyenjn', '5.33 AS', 'G', '2024-09-21 08:41:45', NULL, '2024-09-21 16:41:44', 15.00, 36.00, 540.00, 5, 92, 1380.00),
('00000053', 'lzp4y0cjqyenjn', '8.11 AS', 'G', '2024-09-21 08:41:35', NULL, NULL, 12.50, 36.00, 450.00, 5, 92, 1150.00),
('00000054', 'lzp4y0cjqyenjn', '6.11 AS', 'G', '2024-09-21 08:42:19', NULL, NULL, 29.50, 36.00, 1062.00, 5, 92, 2714.00),
('00000055', 'lzp4y0cjqyenjn', 'Loreal Hair Spa Anti Dandruff', 'ML', '2024-09-24 10:26:14', NULL, '2024-09-24 18:26:12', 6.00, 165.00, 990.00, 3, 8, 48.00),
('00000056', 'lzp4y0cjqyenjn', 'Loreal Hair Spa Hydrating', 'ML', '2024-09-21 10:53:57', NULL, NULL, 5.00, 165.00, 825.00, 3, 8, 40.00),
('00000057', 'lzp4y0cjqyenjn', 'Loreal Re-balancing scrub', 'ML', '2024-09-21 10:58:39', NULL, NULL, 2.00, 990.00, 1980.00, 1, 150, 300.00),
('00000058', 'lzp4y0cjqyenjn', 'Loreal ARM Mask 500ML', 'G', '2024-09-24 10:23:43', NULL, '2024-10-01 09:01:43', 5.85, 2550.00, 15300.00, 1, 460, 2690.00),
('00000059', 'lzp4y0cjqyenjn', 'Loreal DX mask 500ML', 'G', '2024-09-24 10:19:51', NULL, '2024-10-01 07:54:42', 1.08, 2550.00, 3187.50, 1, 460, 495.00),
('00000060', 'lzp4y0cjqyenjn', 'Loreal DX Spray', 'ML', '2024-09-21 11:15:54', NULL, '2024-09-30 06:49:42', 6.49, 2350.00, 15275.00, 1, 500, 3245.00),
('00000061', 'lzp4y0cjqyenjn', 'Loreal Xtenso Sensi 500ML', 'G', '2024-09-21 11:22:27', NULL, '2024-09-21 19:22:24', 4.00, 1516.00, 6064.00, 1, 368, 1472.00),
('00000062', 'lzp4y0cjqyenjn', 'Loreal Xtenso Neutralizer 400ML', 'G', '2024-09-21 11:26:30', NULL, NULL, 1.50, 475.00, 712.50, 1, 368, 552.00),
('00000063', 'lzp4y0cjqyenjn', 'Loreal Inoa Oxi 20vol', 'G', '2024-09-24 10:32:22', NULL, '2024-09-24 18:32:20', 4.00, 695.00, 2780.00, 1, 920, 3680.00),
('00000064', 'lzp4y0cjqyenjn', 'Loreal Inoa Oxi 30vol', 'G', '2024-09-21 11:29:12', NULL, NULL, 0.75, 695.00, 521.25, 1, 920, 690.00),
('00000065', 'lzp4y0cjqyenjn', 'Alpha8 Cysteine', 'G', '2024-09-21 11:35:38', NULL, '2024-10-01 09:01:42', 4.02, 3500.00, 14875.00, 1, 920, 3700.00),
('00000066', 'lzp4y0cjqyenjn', 'Argila Activator', 'G', '2024-09-21 11:38:41', NULL, NULL, 0.75, 6700.00, 5025.00, 1, 920, 690.00),
('00000067', 'lzp4y0cjqyenjn', 'Loreal DX Amino Suave', 'ML', '2024-09-24 10:23:04', NULL, NULL, 1.25, 1750.00, 2187.50, 1, 500, 625.00),
('00000068', 'lzp4y0cjqyenjn', 'Loreal Clay Mask', 'G', '2024-09-24 10:29:02', NULL, NULL, 1.00, 2150.00, 2150.00, 1, 460, 460.00),
('00000069', 'lzp4y0cjqyenjn', 'Dialight Oxi 20vol', 'G', '2024-09-24 10:37:25', NULL, NULL, 2.00, 695.00, 1390.00, 1, 920, 1840.00),
('00000070', 'lzp4y0cjqyenjn', 'Dialight Oxi 9vol', 'G', '2024-09-24 10:38:27', NULL, NULL, 0.25, 695.00, 173.75, 1, 920, 230.00),
('00000071', 'lzp4y0cjqyenjn', 'Matrix Opti Normal', 'G', '2024-09-24 10:45:05', NULL, NULL, 4.00, 950.00, 3800.00, 1, 460, 1840.00),
('00000072', 'lzp4y0cjqyenjn', 'Matrix Opti Sensi', 'G', '2024-09-24 10:46:05', NULL, NULL, 3.00, 950.00, 2850.00, 1, 460, 1380.00),
('00000073', 'lzp4y0cjqyenjn', 'Matrix Neutralizer', 'G', '2024-09-24 10:47:16', NULL, NULL, 4.00, 399.00, 1596.00, 1, 460, 1840.00),
('00000074', 'lzp4y0cjqyenjn', 'Inoa 7.44', 'G', '2024-09-24 10:50:44', NULL, NULL, 4.00, 555.00, 2220.00, 1, 55, 220.80),
('00000075', 'lzp4y0cjqyenjn', 'Inoa 6.66', 'G', '2024-09-24 10:51:20', NULL, NULL, 6.00, 555.00, 3330.00, 2, 55, 331.20),
('00000076', 'lzp4y0cjqyenjn', 'Inoa 6.45', 'G', '2024-09-24 10:52:09', NULL, NULL, 4.00, 555.00, 2220.00, 1, 55, 220.80),
('00000077', 'lzp4y0cjqyenjn', 'Inoa 2.10', 'G', '2024-09-24 10:52:49', NULL, NULL, 1.50, 555.00, 832.50, 1, 55, 82.80),
('00000078', 'lzp4y0cjqyenjn', 'Inoa 7.17', 'G', '2024-09-24 10:53:42', NULL, NULL, 3.50, 555.00, 1942.50, 1, 55, 193.20),
('00000079', 'lzp4y0cjqyenjn', 'Inoa 9.11', 'G', '2024-09-24 10:54:29', NULL, NULL, 1.50, 555.00, 832.50, 1, 55, 82.80),
('00000080', 'lzp4y0cjqyenjn', 'Inoa 10.1', 'G', '2024-09-24 10:56:00', NULL, NULL, 2.00, 555.00, 1110.00, 1, 55, 110.40),
('00000081', 'lzp4y0cjqyenjn', 'Diacolor 8.23', 'G', '2024-09-24 10:57:10', NULL, NULL, 4.00, 430.00, 1720.00, 1, 55, 220.80),
('00000082', 'lzp4y0cjqyenjn', 'Diacolor 9.82', 'G', '2024-09-24 10:57:54', NULL, NULL, 3.00, 430.00, 1290.00, 1, 55, 165.60),
('00000083', 'lzp4y0cjqyenjn', 'Diacolor 5.18', 'G', '2024-09-24 10:59:38', NULL, '2024-09-24 18:59:36', 3.00, 430.00, 1290.00, 1, 55, 165.00),
('00000084', 'lzp4y0cjqyenjn', 'Dialight 10.22', 'G', '2024-09-24 11:01:37', NULL, NULL, 6.00, 430.00, 2580.00, 2, 46, 276.00),
('00000085', 'lzp4y0cjqyenjn', 'Dialight 9.01', 'G', '2024-09-24 11:02:42', NULL, NULL, 3.00, 430.00, 1290.00, 1, 46, 138.00),
('00000086', 'lzp4y0cjqyenjn', 'Dialight 10.21', 'G', '2024-09-24 11:03:41', NULL, NULL, 3.00, 430.00, 1290.00, 1, 46, 138.00),
('00000087', 'lzp4y0cjqyenjn', 'Dialight 9.12', 'G', '2024-09-24 11:04:36', NULL, NULL, 4.00, 430.00, 1720.00, 1, 46, 184.00),
('00000088', 'lzp4y0cjqyenjn', 'Dialight 8.28', 'G', '2024-09-24 11:06:17', NULL, NULL, 1.00, 430.00, 430.00, 1, 46, 46.00),
('00000089', 'lzp4y0cjqyenjn', '9/17 SS', 'G', '2024-09-24 11:20:04', NULL, NULL, 22.00, 50.00, 1100.00, 5, 83, 1821.60),
('00000090', 'lzjdp55ay7583d', 'test', 'G', '2024-09-28 06:10:19', NULL, NULL, 1.00, 1.00, 1.00, 1, 123, 123.00),
('00000091', 'lzp4y0cjqyenjn', 'Kera Max #2', 'G', '2024-09-28 07:07:41', NULL, '2024-10-01 08:03:45', 5.40, 3800.00, 20900.00, 1, 920, 4970.00),
('00000092', 'lzp4y0cjqyenjn', 'Olaplex 4P backbar', 'ML', '2024-09-28 07:37:32', NULL, NULL, 0.75, 5265.00, 3948.75, 1, 1000, 750.00),
('00000093', 'lzp4y0cjqyenjn', 'Olaplex 4 Backbar', 'ML', '2024-09-28 08:07:31', NULL, NULL, 0.50, 5265.00, 2632.50, 1, 1000, 500.00),
('00000094', 'lzp4y0cjqyenjn', 'ARM Shampoo 1500ML Backbar', 'ML', '2024-09-28 08:13:09', NULL, NULL, 2.75, 2050.00, 5637.50, 1, 1500, 4125.00),
('00000095', 'lzp4y0cjqyenjn', 'Olaplex 2 Backbar', 'ML', '2024-09-28 08:14:40', NULL, '2024-10-04 07:34:54', 1.79, 15475.00, 27855.00, 1, 2000, 3586.00),
('00000096', 'lzp4y0cjqyenjn', 'ARM Spray', 'ML', '2024-09-28 08:16:34', NULL, NULL, 3.00, 1070.00, 3210.00, 1, 190, 570.00),
('00000097', 'lzp4y0cjqyenjn', 'ARM Serum', 'ML', '2024-09-28 08:18:28', NULL, NULL, 2.00, 1236.00, 2472.00, 1, 250, 500.00),
('00000098', 'lzp4y0cjqyenjn', 'Olaplex 5', 'ML', '2024-09-28 08:19:00', NULL, NULL, 1.00, 1611.00, 1611.00, 1, 250, 250.00),
('00000099', 'lzp4y0cjqyenjn', 'Olaplex 4C', 'ML', '2024-09-28 08:19:29', NULL, NULL, 1.00, 1611.00, 1611.00, 1, 250, 250.00),
('00000100', 'lzp4y0cjqyenjn', 'DX Shampoo backbar', 'ML', '2024-09-28 08:20:40', NULL, '2024-10-01 08:03:46', 1.00, 2050.00, 2050.00, 1, 1500, 1494.00),
('00000101', 'lzp4y0cjqyenjn', 'Loreal Silver Shampoo Backbar', 'ML', '2024-09-28 08:21:31', NULL, '2024-10-01 07:54:43', 1.00, 1450.00, 1450.00, 1, 1500, 1496.00),
('00000102', 'lzp4y0cjqyenjn', 'Olaplex 1', 'ML', '2024-09-28 08:23:45', NULL, '2024-10-01 09:50:54', 1.24, 6760.00, 8450.00, 1, 525, 649.20),
('00000103', 'lzp4y0cjqyenjn', 'Olaplex Chelating', 'ML', '2024-09-28 08:24:41', NULL, NULL, 1.00, 3300.00, 3300.00, 1, 370, 370.00),
('00000104', 'lzp4y0cjqyenjn', 'DX Mask 500ml', 'ML', '2024-09-28 08:25:38', NULL, NULL, 0.25, 2550.00, 637.50, 1, 500, 125.00),
('00000105', 'lzp4y0cjqyenjn', 'ARM Mask 500ml', 'ML', '2024-09-28 08:27:00', NULL, NULL, 4.75, 2550.00, 12112.50, 1, 500, 2375.00),
('00000106', 'lzp4y0cjqyenjn', 'Olaplex Sachet', 'ML', '2024-09-28 08:27:42', NULL, NULL, 5.00, 1.00, 5.00, 1, 45, 225.00),
('00000107', 'lzp4y0cjqyenjn', '9.17 SS', 'ML', '2024-09-29 06:50:55', NULL, '2024-10-02 08:25:47', 12.37, 50.00, 950.00, 5, 83, 1027.00),
('00000108', 'lzp4y0cjqyenjn', 'AS Bleach', 'G', '2024-09-29 11:07:48', NULL, '2024-10-01 09:50:51', 23.25, 260.00, 6240.00, 5, 600, 13950.00),
('00000109', 'lzp4y0cjqyenjn', 'BS 8', 'G', '2024-09-29 11:14:12', NULL, NULL, 2.00, 1950.00, 3900.00, 1, 500, 1000.00),
('00000110', 'lzp4y0cjqyenjn', 'BS 9', 'G', '2024-09-29 11:14:39', NULL, NULL, 0.50, 2250.00, 1125.00, 1, 500, 250.00),
('00000111', 'lzp4y0cjqyenjn', 'BS Oxi 20vol', 'G', '2024-09-29 11:16:06', NULL, NULL, 0.50, 504.00, 252.00, 1, 920, 460.00);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_inventory_history`
--

CREATE TABLE `tbl_inventory_history` (
  `inventory_id` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `added_quantity` int NOT NULL DEFAULT '0',
  `previous_stock` decimal(10,2) DEFAULT NULL,
  `current_stock` decimal(10,2) DEFAULT NULL,
  `organization_id` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `price` double(10,2) NOT NULL DEFAULT '0.00',
  `total_price` double(10,2) NOT NULL DEFAULT '0.00',
  `updated_by` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `date_created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_inventory_history`
--

INSERT INTO `tbl_inventory_history` (`inventory_id`, `added_quantity`, `previous_stock`, `current_stock`, `organization_id`, `price`, `total_price`, `updated_by`, `date_created`) VALUES
('00000001', 7, 0.00, 7.25, 'lzp4y0cjqyenjn', 0.00, 0.00, '00000004', '2024-09-19 06:48:59'),
('00000002', 12, 0.00, 11.50, 'lzp4y0cjqyenjn', 0.00, 0.00, '00000004', '2024-09-19 06:50:31'),
('00000003', 13, 0.00, 12.50, 'lzp4y0cjqyenjn', 0.00, 0.00, '00000004', '2024-09-20 08:34:22'),
('00000004', 14, 0.00, 14.00, 'lzp4y0cjqyenjn', 0.00, 0.00, '00000004', '2024-09-20 08:35:21'),
('00000005', 16, 0.00, 16.00, 'lzp4y0cjqyenjn', 0.00, 0.00, '00000004', '2024-09-20 08:36:38'),
('00000006', 12, 0.00, 12.00, 'lzp4y0cjqyenjn', 0.00, 0.00, '00000004', '2024-09-20 08:47:50'),
('00000007', 18, 0.00, 17.50, 'lzp4y0cjqyenjn', 0.00, 0.00, '00000004', '2024-09-20 08:49:04'),
('00000008', 16, 0.00, 15.50, 'lzp4y0cjqyenjn', 0.00, 0.00, '00000004', '2024-09-20 08:50:02'),
('00000009', 33, 0.00, 33.25, 'lzp4y0cjqyenjn', 0.00, 0.00, '00000004', '2024-09-20 08:51:02'),
('00000010', 19, 0.00, 19.00, 'lzp4y0cjqyenjn', 0.00, 0.00, '00000004', '2024-09-20 08:52:25'),
('00000011', 16, 0.00, 15.50, 'lzp4y0cjqyenjn', 0.00, 0.00, '00000004', '2024-09-20 08:52:58'),
('00000012', 12, 0.00, 12.25, 'lzp4y0cjqyenjn', 0.00, 0.00, '00000004', '2024-09-20 08:56:10'),
('00000013', 12, 0.00, 11.50, 'lzp4y0cjqyenjn', 0.00, 0.00, '00000004', '2024-09-20 08:57:17'),
('00000014', 25, 0.00, 24.50, 'lzp4y0cjqyenjn', 0.00, 0.00, '00000004', '2024-09-20 08:58:54'),
('00000015', 19, 0.00, 18.75, 'lzp4y0cjqyenjn', 0.00, 0.00, '00000004', '2024-09-20 08:59:38'),
('00000016', 7, 0.00, 7.00, 'lzp4y0cjqyenjn', 0.00, 0.00, '00000004', '2024-09-20 09:00:31'),
('00000017', 30, 0.00, 29.50, 'lzp4y0cjqyenjn', 0.00, 0.00, '00000004', '2024-09-20 09:01:40'),
('00000018', 6, 0.00, 6.00, 'lzp4y0cjqyenjn', 0.00, 0.00, '00000004', '2024-09-20 09:03:04'),
('00000019', 6, 0.00, 6.00, 'lzp4y0cjqyenjn', 0.00, 0.00, '00000004', '2024-09-20 09:04:07'),
('00000020', 10, 0.00, 10.00, 'lzp4y0cjqyenjn', 0.00, 0.00, '00000004', '2024-09-20 09:04:33'),
('00000021', 11, 0.00, 11.00, 'lzp4y0cjqyenjn', 0.00, 0.00, '00000004', '2024-09-20 09:05:16'),
('00000022', 15, 0.00, 15.00, 'lzp4y0cjqyenjn', 0.00, 0.00, '00000004', '2024-09-20 09:06:04'),
('00000023', 2, 0.00, 2.00, 'lzp4y0cjqyenjn', 0.00, 0.00, '00000004', '2024-09-20 09:06:49'),
('00000024', 12, 0.00, 12.00, 'lzp4y0cjqyenjn', 0.00, 0.00, '00000004', '2024-09-20 09:07:40'),
('00000025', 12, 0.00, 12.00, 'lzp4y0cjqyenjn', 0.00, 0.00, '00000004', '2024-09-20 09:08:30'),
('00000026', 12, 0.00, 12.00, 'lzp4y0cjqyenjn', 0.00, 0.00, '00000004', '2024-09-20 09:09:36'),
('00000027', 5, 0.00, 5.00, 'lzp4y0cjqyenjn', 0.00, 0.00, '00000004', '2024-09-20 09:10:08'),
('00000028', 11, 0.00, 11.00, 'lzp4y0cjqyenjn', 0.00, 0.00, '00000004', '2024-09-20 09:10:46'),
('00000029', 11, 0.00, 11.00, 'lzp4y0cjqyenjn', 0.00, 0.00, '00000004', '2024-09-21 04:30:11'),
('00000029', 0, 11.00, 0.00, 'lzp4y0cjqyenjn', 50.00, 550.00, '00000004', '2024-09-21 04:38:11'),
('00000029', 8, 0.00, 8.00, 'lzp4y0cjqyenjn', 50.00, 400.00, '00000004', '2024-09-21 04:45:02'),
('00000025', 0, 12.00, 0.00, 'lzp4y0cjqyenjn', 50.00, 600.00, '00000004', '2024-09-21 04:52:08'),
('00000025', 5, 0.00, 5.00, 'lzp4y0cjqyenjn', 50.00, 250.00, '00000004', '2024-09-21 04:56:25'),
('00000030', 3, 0.00, 3.00, 'lzp4y0cjqyenjn', 0.00, 0.00, '00000004', '2024-09-21 04:58:21'),
('00000031', 4, 0.00, 4.00, 'lzp4y0cjqyenjn', 0.00, 0.00, '00000004', '2024-09-21 04:59:13'),
('00000032', 2, 0.00, 2.00, 'lzp4y0cjqyenjn', 0.00, 0.00, '00000004', '2024-09-21 04:59:55'),
('00000033', 5, 0.00, 5.00, 'lzp4y0cjqyenjn', 0.00, 0.00, '00000004', '2024-09-21 05:05:05'),
('00000034', 11, 0.00, 11.00, 'lzp4y0cjqyenjn', 0.00, 0.00, '00000004', '2024-09-21 05:05:43'),
('00000035', 2, 0.00, 2.00, 'lzp4y0cjqyenjn', 0.00, 0.00, '00000004', '2024-09-21 05:06:36'),
('00000036', 5, 0.00, 5.00, 'lzp4y0cjqyenjn', 0.00, 0.00, '00000004', '2024-09-21 05:39:17'),
('00000037', 4, 0.00, 3.75, 'lzp4y0cjqyenjn', 0.00, 0.00, '00000004', '2024-09-21 05:39:51'),
('00000038', 5, 0.00, 5.00, 'lzp4y0cjqyenjn', 0.00, 0.00, '00000004', '2024-09-21 05:40:49'),
('00000039', 9, 0.00, 9.00, 'lzp4y0cjqyenjn', 0.00, 0.00, '00000004', '2024-09-21 05:43:15'),
('00000040', 3, 0.00, 3.00, 'lzp4y0cjqyenjn', 0.00, 0.00, '00000004', '2024-09-21 05:43:59'),
('00000041', 4, 0.00, 4.00, 'lzp4y0cjqyenjn', 0.00, 0.00, '00000004', '2024-09-21 05:44:48'),
('00000042', 4, 0.00, 3.50, 'lzp4y0cjqyenjn', 0.00, 0.00, '00000004', '2024-09-21 05:45:26'),
('00000043', 5, 0.00, 5.25, 'lzp4y0cjqyenjn', 0.00, 0.00, '00000004', '2024-09-21 05:46:27'),
('00000044', 11, 0.00, 10.50, 'lzp4y0cjqyenjn', 0.00, 0.00, '00000004', '2024-09-21 05:47:00'),
('00000045', 5, 0.00, 5.00, 'lzp4y0cjqyenjn', 0.00, 0.00, '00000004', '2024-09-21 05:47:35'),
('00000046', 6, 0.00, 5.50, 'lzp4y0cjqyenjn', 0.00, 0.00, '00000004', '2024-09-21 05:48:15'),
('00000047', 6, 0.00, 6.00, 'lzp4y0cjqyenjn', 0.00, 0.00, '00000004', '2024-09-21 05:49:32'),
('00000048', 14, 0.00, 13.50, 'lzp4y0cjqyenjn', 0.00, 0.00, '00000004', '2024-09-21 05:51:09'),
('00000049', 11, 0.00, 10.50, 'lzp4y0cjqyenjn', 0.00, 0.00, '00000004', '2024-09-21 08:24:57'),
('00000050', 10, 0.00, 10.00, 'lzp4y0cjqyenjn', 0.00, 0.00, '00000004', '2024-09-21 08:26:00'),
('00000051', 5, 0.00, 5.00, 'lzp4y0cjqyenjn', 0.00, 0.00, '00000004', '2024-09-21 08:38:01'),
('00000052', 15, 0.00, 15.00, 'lzp4y0cjqyenjn', 0.00, 0.00, '00000004', '2024-09-21 08:40:39'),
('00000053', 13, 0.00, 12.50, 'lzp4y0cjqyenjn', 0.00, 0.00, '00000004', '2024-09-21 08:41:35'),
('00000054', 30, 0.00, 29.50, 'lzp4y0cjqyenjn', 0.00, 0.00, '00000004', '2024-09-21 08:42:19'),
('00000055', 6, 0.00, 6.00, 'lzp4y0cjqyenjn', 0.00, 0.00, '00000004', '2024-09-21 10:52:22'),
('00000056', 5, 0.00, 5.00, 'lzp4y0cjqyenjn', 0.00, 0.00, '00000004', '2024-09-21 10:53:57'),
('00000057', 2, 0.00, 2.00, 'lzp4y0cjqyenjn', 0.00, 0.00, '00000004', '2024-09-21 10:58:39'),
('00000058', 6, 0.00, 5.50, 'lzp4y0cjqyenjn', 0.00, 0.00, '00000004', '2024-09-21 11:11:08'),
('00000059', 6, 0.00, 5.50, 'lzp4y0cjqyenjn', 0.00, 0.00, '00000004', '2024-09-21 11:14:04'),
('00000060', 7, 0.00, 6.50, 'lzp4y0cjqyenjn', 0.00, 0.00, '00000004', '2024-09-21 11:15:54'),
('00000061', 4, 0.00, 4.00, 'lzp4y0cjqyenjn', 0.00, 0.00, '00000004', '2024-09-21 11:20:25'),
('00000062', 2, 0.00, 1.50, 'lzp4y0cjqyenjn', 0.00, 0.00, '00000004', '2024-09-21 11:26:30'),
('00000063', 5, 0.00, 4.50, 'lzp4y0cjqyenjn', 0.00, 0.00, '00000004', '2024-09-21 11:28:35'),
('00000064', 1, 0.00, 0.75, 'lzp4y0cjqyenjn', 0.00, 0.00, '00000004', '2024-09-21 11:29:12'),
('00000065', 4, 0.00, 4.25, 'lzp4y0cjqyenjn', 0.00, 0.00, '00000004', '2024-09-21 11:35:38'),
('00000066', 1, 0.00, 0.75, 'lzp4y0cjqyenjn', 0.00, 0.00, '00000004', '2024-09-21 11:38:41'),
('00000059', 0, 5.50, 0.00, 'lzp4y0cjqyenjn', 2550.00, 14025.00, '00000004', '2024-09-24 10:17:29'),
('00000059', 1, 0.00, 1.25, 'lzp4y0cjqyenjn', 2550.00, 3187.50, '00000004', '2024-09-24 10:19:52'),
('00000067', 1, 0.00, 1.25, 'lzp4y0cjqyenjn', 0.00, 0.00, '00000004', '2024-09-24 10:23:05'),
('00000058', 1, 5.50, 6.00, 'lzp4y0cjqyenjn', 2550.00, 15300.00, '00000004', '2024-09-24 10:23:44'),
('00000055', 2, 6.00, 8.00, 'lzp4y0cjqyenjn', 165.00, 1320.00, '00000004', '2024-09-24 10:24:36'),
('00000055', 0, 8.00, 0.00, 'lzp4y0cjqyenjn', 165.00, 1320.00, '00000004', '2024-09-24 10:25:05'),
('00000055', 6, 0.00, 6.00, 'lzp4y0cjqyenjn', 165.00, 990.00, '00000004', '2024-09-24 10:26:16'),
('00000068', 1, 0.00, 1.00, 'lzp4y0cjqyenjn', 0.00, 0.00, '00000004', '2024-09-24 10:29:02'),
('00000063', 0, 4.50, 0.00, 'lzp4y0cjqyenjn', 695.00, 3127.50, '00000004', '2024-09-24 10:31:30'),
('00000063', 4, 0.00, 4.00, 'lzp4y0cjqyenjn', 695.00, 2780.00, '00000004', '2024-09-24 10:32:24'),
('00000069', 2, 0.00, 2.00, 'lzp4y0cjqyenjn', 0.00, 0.00, '00000004', '2024-09-24 10:37:25'),
('00000070', 0, 0.00, 0.25, 'lzp4y0cjqyenjn', 0.00, 0.00, '00000004', '2024-09-24 10:38:27'),
('00000071', 4, 0.00, 4.00, 'lzp4y0cjqyenjn', 0.00, 0.00, '00000004', '2024-09-24 10:45:05'),
('00000072', 3, 0.00, 3.00, 'lzp4y0cjqyenjn', 0.00, 0.00, '00000004', '2024-09-24 10:46:05'),
('00000073', 4, 0.00, 4.00, 'lzp4y0cjqyenjn', 0.00, 0.00, '00000004', '2024-09-24 10:47:16'),
('00000074', 4, 0.00, 4.00, 'lzp4y0cjqyenjn', 0.00, 0.00, '00000004', '2024-09-24 10:50:44'),
('00000075', 6, 0.00, 6.00, 'lzp4y0cjqyenjn', 0.00, 0.00, '00000004', '2024-09-24 10:51:20'),
('00000076', 4, 0.00, 4.00, 'lzp4y0cjqyenjn', 0.00, 0.00, '00000004', '2024-09-24 10:52:10'),
('00000077', 2, 0.00, 1.50, 'lzp4y0cjqyenjn', 0.00, 0.00, '00000004', '2024-09-24 10:52:50'),
('00000078', 4, 0.00, 3.50, 'lzp4y0cjqyenjn', 0.00, 0.00, '00000004', '2024-09-24 10:53:42'),
('00000079', 2, 0.00, 1.50, 'lzp4y0cjqyenjn', 0.00, 0.00, '00000004', '2024-09-24 10:54:29'),
('00000080', 2, 0.00, 2.00, 'lzp4y0cjqyenjn', 0.00, 0.00, '00000004', '2024-09-24 10:56:00'),
('00000081', 4, 0.00, 4.00, 'lzp4y0cjqyenjn', 0.00, 0.00, '00000004', '2024-09-24 10:57:11'),
('00000082', 3, 0.00, 3.00, 'lzp4y0cjqyenjn', 0.00, 0.00, '00000004', '2024-09-24 10:57:54'),
('00000083', 3, 0.00, 3.00, 'lzp4y0cjqyenjn', 0.00, 0.00, '00000004', '2024-09-24 10:58:41'),
('00000084', 6, 0.00, 6.00, 'lzp4y0cjqyenjn', 0.00, 0.00, '00000004', '2024-09-24 11:01:37'),
('00000085', 3, 0.00, 3.00, 'lzp4y0cjqyenjn', 0.00, 0.00, '00000004', '2024-09-24 11:02:42'),
('00000086', 3, 0.00, 3.00, 'lzp4y0cjqyenjn', 0.00, 0.00, '00000004', '2024-09-24 11:03:41'),
('00000087', 4, 0.00, 4.00, 'lzp4y0cjqyenjn', 0.00, 0.00, '00000004', '2024-09-24 11:04:36'),
('00000088', 1, 0.00, 1.00, 'lzp4y0cjqyenjn', 0.00, 0.00, '00000004', '2024-09-24 11:06:17'),
('00000005', 67, 16.00, 83.00, 'lzp4y0cjqyenjn', 50.00, 4150.00, '00000004', '2024-09-24 11:14:34'),
('00000006', 39, 12.00, 51.00, 'lzp4y0cjqyenjn', 50.00, 2550.00, '00000004', '2024-09-24 11:15:26'),
('00000089', 22, 0.00, 22.00, 'lzp4y0cjqyenjn', 0.00, 0.00, '00000004', '2024-09-24 11:20:04'),
('00000014', 21, 24.50, 45.00, 'lzp4y0cjqyenjn', 50.00, 2250.00, '00000004', '2024-09-24 11:21:08'),
('00000012', 25, 12.25, 37.00, 'lzp4y0cjqyenjn', 50.00, 1850.00, '00000004', '2024-09-24 11:22:17'),
('00000023', 8, 2.00, 10.00, 'lzp4y0cjqyenjn', 50.00, 500.00, '00000004', '2024-09-24 11:23:01'),
('00000007', 35, 17.50, 52.00, 'lzp4y0cjqyenjn', 50.00, 2600.00, '00000004', '2024-09-24 11:23:57'),
('00000017', 20, 29.50, 49.50, 'lzp4y0cjqyenjn', 50.00, 2475.00, '00000004', '2024-09-24 11:25:50'),
('00000090', 1, 0.00, 1.00, 'lzjdp55ay7583d', 0.00, 0.00, '00000012', '2024-09-28 06:10:19'),
('00000091', 6, 0.00, 5.50, 'lzp4y0cjqyenjn', 0.00, 0.00, '00000004', '2024-09-28 07:07:42'),
('00000092', 1, 0.00, 0.75, 'lzp4y0cjqyenjn', 0.00, 0.00, '00000004', '2024-09-28 07:37:32'),
('00000093', 1, 0.00, 0.50, 'lzp4y0cjqyenjn', 0.00, 0.00, '00000004', '2024-09-28 08:07:32'),
('00000094', 3, 0.00, 2.75, 'lzp4y0cjqyenjn', 0.00, 0.00, '00000004', '2024-09-28 08:13:09'),
('00000095', 2, 0.00, 1.80, 'lzp4y0cjqyenjn', 0.00, 0.00, '00000004', '2024-09-28 08:14:40'),
('00000096', 3, 0.00, 3.00, 'lzp4y0cjqyenjn', 0.00, 0.00, '00000004', '2024-09-28 08:16:35'),
('00000097', 2, 0.00, 2.00, 'lzp4y0cjqyenjn', 0.00, 0.00, '00000004', '2024-09-28 08:18:28'),
('00000098', 1, 0.00, 1.00, 'lzp4y0cjqyenjn', 0.00, 0.00, '00000004', '2024-09-28 08:19:00'),
('00000099', 1, 0.00, 1.00, 'lzp4y0cjqyenjn', 0.00, 0.00, '00000004', '2024-09-28 08:19:29'),
('00000100', 1, 0.00, 1.00, 'lzp4y0cjqyenjn', 0.00, 0.00, '00000004', '2024-09-28 08:20:41'),
('00000101', 1, 0.00, 1.00, 'lzp4y0cjqyenjn', 0.00, 0.00, '00000004', '2024-09-28 08:21:31'),
('00000102', 1, 0.00, 1.25, 'lzp4y0cjqyenjn', 0.00, 0.00, '00000004', '2024-09-28 08:23:45'),
('00000103', 1, 0.00, 1.00, 'lzp4y0cjqyenjn', 0.00, 0.00, '00000004', '2024-09-28 08:24:41'),
('00000104', 0, 0.00, 0.25, 'lzp4y0cjqyenjn', 0.00, 0.00, '00000004', '2024-09-28 08:25:38'),
('00000105', 5, 0.00, 4.75, 'lzp4y0cjqyenjn', 0.00, 0.00, '00000004', '2024-09-28 08:27:00'),
('00000106', 5, 0.00, 5.00, 'lzp4y0cjqyenjn', 0.00, 0.00, '00000004', '2024-09-28 08:27:43'),
('00000107', 19, 0.00, 19.00, 'lzp4y0cjqyenjn', 0.00, 0.00, '00000004', '2024-09-29 06:50:55'),
('00000108', 24, 0.00, 24.00, 'lzp4y0cjqyenjn', 0.00, 0.00, '00000004', '2024-09-29 11:07:48'),
('00000109', 2, 0.00, 2.00, 'lzp4y0cjqyenjn', 0.00, 0.00, '00000004', '2024-09-29 11:14:12'),
('00000110', 1, 0.00, 0.50, 'lzp4y0cjqyenjn', 0.00, 0.00, '00000004', '2024-09-29 11:14:39'),
('00000111', 1, 0.00, 0.50, 'lzp4y0cjqyenjn', 0.00, 0.00, '00000004', '2024-09-29 11:16:06');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_notifications`
--

CREATE TABLE `tbl_notifications` (
  `notification_id` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `path` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `organization_id` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `message` varchar(500) COLLATE utf8mb4_general_ci NOT NULL,
  `isRead` tinyint(1) NOT NULL DEFAULT '1',
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_notifications`
--

INSERT INTO `tbl_notifications` (`notification_id`, `path`, `organization_id`, `message`, `isRead`, `created_date`) VALUES
('m07xs4ewxer5op', '/inventory', 'lzp4y0cjqyenjn', 'Service Product Metal DX shampoo has  0.9973333333333333ML left please restock', 1, '2024-08-24 09:26:53'),
('m07ywebkpn9410', '/inventory', 'lzp4y0cjqyenjn', 'Service Product Sensible 6.0 has  2.6313253012048192G left please restock', 1, '2024-08-24 09:58:12'),
('m07ywfki9n64xm', '/inventory', 'lzp4y0cjqyenjn', 'Service Product kera max has  0.94ML left please restock', 1, '2024-08-24 09:58:13'),
('m0ev2lwae1lexw', '/inventory', 'lzp4y0cjqyenjn', 'Service Product Loreal Hydrating Concetrated Hair Spa has  2.25ML left please restock', 1, '2024-08-29 05:45:26'),
('m0ev2mniiw2lvh', '/inventory', 'lzp4y0cjqyenjn', 'Service Product Loreal Scalp Rebalancing has  1.8ML left please restock', 1, '2024-08-29 05:45:27'),
('m0evdim32tgioe', '/inventory', 'lzp4y0cjqyenjn', 'Service Product Metal Detox Mask has  0.96ML left please restock', 1, '2024-08-29 05:53:55'),
('m0evdjcwbutos8', '/inventory', 'lzp4y0cjqyenjn', 'Service Product Olaplex 2 backbar has  1.985ML left please restock', 1, '2024-08-29 05:53:56'),
('m0gvjsbdbit5kv', '/inventory', 'lzp4y0cjqyenjn', 'Service Product Olaplex 1 has  0.9285714285714286ML left please restock', 1, '2024-08-30 15:34:20'),
('m0hwucaiknb9jq', '/inventory', 'lzp4y0cjqyenjn', 'Service Product Metal Detox Mask has  3.92ML left please restock', 1, '2024-08-31 08:58:18'),
('m0j4j0ia1jnh66', '/inventory', 'lzp4y0cjqyenjn', 'Service Product Metal Detox Mask has  3.82ML left please restock', 1, '2024-09-01 05:21:13'),
('m0sfvffmhpxfpq', '/inventory', 'lzjdp55ay7583d', 'Service Product test service product 1 has  4.999ML left please restock', 1, '2024-09-07 17:48:43'),
('m0tjqteet80dl1', '/inventory', 'lzp4y0cjqyenjn', 'Service Product Argila has  0.9130434782608695G left please restock', 1, '2024-09-08 12:24:53'),
('m0w5xcqm1xk4ns', '/inventory', 'lzp4y0cjqyenjn', 'Service Product Argila Detoxifier has  0.99ML left please restock', 1, '2024-09-10 08:21:22'),
('m0w5xdhvsweci0', '/inventory', 'lzp4y0cjqyenjn', 'Service Product Argila Protecting Spray has  0.9966666666666667ML left please restock', 1, '2024-09-10 08:21:23'),
('m0w5xe8nys4ib6', '/inventory', 'lzp4y0cjqyenjn', 'Service Product Argila Activator has  0.9ML left please restock', 1, '2024-09-10 08:21:24'),
('m0w5xf03yhi83v', '/inventory', 'lzp4y0cjqyenjn', 'Service Product Argila Mask has  0.96G left please restock', 1, '2024-09-10 08:21:25'),
('m0w5xfr65hy064', '/inventory', 'lzp4y0cjqyenjn', 'Service Product Loreal Metal DX Mask has  2.96ML left please restock', 1, '2024-09-10 08:21:26'),
('m0w6ksrsqznrss', '/products', 'lzp4y0cjqyenjn', 'OTC Product Olaplex 4 has  -1 quantity left please restock', 1, '2024-09-10 08:39:36'),
('m0w6la7bjhagmt', '/products', 'lzp4y0cjqyenjn', 'OTC Product Olaplex 4 has  -3 quantity left please restock', 1, '2024-09-10 08:39:58'),
('m0xut5cg180wh9', '/inventory', 'lzp4y0cjqyenjn', 'Service Product Loreal Metal DX Shampoo Back Bar has  1.2466666666666666ML left please restock', 1, '2024-09-11 12:45:42'),
('m0xut63nw3686s', '/inventory', 'lzp4y0cjqyenjn', 'Service Product Argila Detoxifier has  0.975ML left please restock', 1, '2024-09-11 12:45:43'),
('m0xut6v129egl1', '/inventory', 'lzp4y0cjqyenjn', 'Service Product Argila Protecting Spray has  0.9933333333333333ML left please restock', 1, '2024-09-11 12:45:44'),
('m0xut7mr4ravkb', '/inventory', 'lzp4y0cjqyenjn', 'Service Product Argila Mask has  0.92G left please restock', 1, '2024-09-11 12:45:45'),
('m0ynwzssvuxtsk', '/inventory', 'lzp4y0cjqyenjn', 'Service Product Loreal Metal DX Mask has  2.92ML left please restock', 1, '2024-09-12 02:20:30'),
('m0ynx21iv6rmrh', '/inventory', 'lzp4y0cjqyenjn', 'Service Product Loreal Metal DX Shampoo Back Bar has  1.2433333333333334ML left please restock', 1, '2024-09-12 02:20:33'),
('m0ynx2snqwurav', '/inventory', 'lzp4y0cjqyenjn', 'Service Product Olaplex 2 Back Bar has  0.3975ML left please restock', 1, '2024-09-12 02:20:34'),
('m0yu2695iyc6j4', '/inventory', 'lzp4y0cjqyenjn', 'Service Product Loreal Metal DX Shampoo Back Bar has  1.2366666666666666ML left please restock', 1, '2024-09-12 05:12:30'),
('m0yu270dnyuhlq', '/inventory', 'lzp4y0cjqyenjn', 'Service Product Alpha8 Cysteine has  4.9ML left please restock', 1, '2024-09-12 05:12:31'),
('m0yv01dqzu2epx', '/inventory', 'lzp4y0cjqyenjn', 'Service Product Loreal Metal DX Shampoo Back Bar has  1.2333333333333334ML left please restock', 1, '2024-09-12 05:38:50'),
('m0yv0250mwcrab', '/inventory', 'lzp4y0cjqyenjn', 'Service Product Alpha8 Cysteine has  4.82ML left please restock', 1, '2024-09-12 05:38:51'),
('m0yvrval7vwmp5', '/inventory', 'lzp4y0cjqyenjn', 'Service Product Loreal Metal DX Shampoo Back Bar has  1.23ML left please restock', 1, '2024-09-12 06:00:28'),
('m10ajpgubzkclj', '/inventory', 'lzp4y0cjqyenjn', 'Service Product Loreal Metal DX Mask has  2.88ML left please restock', 1, '2024-09-13 05:41:48'),
('m10ajq7yj9mbt5', '/inventory', 'lzp4y0cjqyenjn', 'Service Product Loreal Metal DX Shampoo Back Bar has  1.2233333333333334ML left please restock', 1, '2024-09-13 05:41:49'),
('m10e0nh81w2dft', '/inventory', 'lzp4y0cjqyenjn', 'Service Product Loreal Silver Shampoo Back Bar has  0.7466666666666667ML left please restock', 1, '2024-09-13 07:18:57'),
('m10e0o881u9kdk', '/inventory', 'lzp4y0cjqyenjn', 'Service Product Olaplex 2 Back Bar has  0.395ML left please restock', 1, '2024-09-13 07:18:58'),
('m10e0ozewer8gl', '/inventory', 'lzp4y0cjqyenjn', 'Service Product Loreal ARM Mask has  5.96ML left please restock', 1, '2024-09-13 07:18:59'),
('m10e5y25h2f10x', '/inventory', 'lzp4y0cjqyenjn', 'Service Product Loreal Metal DX Shampoo Back Bar has  1.2166666666666666ML left please restock', 1, '2024-09-13 07:23:04'),
('m10e5ytll8hd2l', '/inventory', 'lzp4y0cjqyenjn', 'Service Product Loreal Metal DX Mask has  2.84ML left please restock', 1, '2024-09-13 07:23:05'),
('m10h13idlqdil3', '/inventory', 'lzp4y0cjqyenjn', 'Service Product Loreal Metal DX Shampoo Back Bar has  1.21ML left please restock', 1, '2024-09-13 08:43:17'),
('m10h149ajvu6xp', '/inventory', 'lzp4y0cjqyenjn', 'Service Product Olaplex 2 Back Bar has  0.39ML left please restock', 1, '2024-09-13 08:43:18'),
('m10h15ib7a8ljt', '/inventory', 'lzp4y0cjqyenjn', 'Service Product Olaplex 1 has  0.7442857142857143ML left please restock', 1, '2024-09-13 08:43:19'),
('m10h1694ik1rcq', '/inventory', 'lzp4y0cjqyenjn', 'Service Product Loreal ARM Shampoo Back Bar has  0.7466666666666667ML left please restock', 1, '2024-09-13 08:43:20'),
('m10h16zqjhifnz', '/inventory', 'lzp4y0cjqyenjn', 'Service Product Loreal ARM Serum has  0.992ML left please restock', 1, '2024-09-13 08:43:21'),
('m10h17qt43qike', '/inventory', 'lzp4y0cjqyenjn', 'Service Product Loreal ARM Mask has  5.92ML left please restock', 1, '2024-09-13 08:43:22'),
('m10hzi1lhgeiro', '/inventory', 'lzp4y0cjqyenjn', 'Service Product Loreal Metal DX Mask has  2.8ML left please restock', 1, '2024-09-13 09:10:02'),
('m10hzisrm972az', '/inventory', 'lzp4y0cjqyenjn', 'Service Product Keratin Pro Max Treatment has  0.98ML left please restock', 1, '2024-09-13 09:10:03'),
('m10hzjjugrvhf0', '/inventory', 'lzp4y0cjqyenjn', 'Service Product Loreal Metal DX Shampoo Back Bar has  1.2033333333333334ML left please restock', 1, '2024-09-13 09:10:04'),
('m10hzkag8x1znv', '/inventory', 'lzp4y0cjqyenjn', 'Service Product 5.66 Sensibles has  2.5625G left please restock', 1, '2024-09-13 09:10:05'),
('m10kp44q82df5n', '/inventory', 'lzp4y0cjqyenjn', 'Service Product Loreal Metal DX Shampoo Back Bar has  1.1966666666666668ML left please restock', 1, '2024-09-13 10:25:56'),
('m10kp4vrqozhrc', '/inventory', 'lzp4y0cjqyenjn', 'Service Product Alpha8 Cysteine has  4.67ML left please restock', 1, '2024-09-13 10:25:57'),
('m16mzufq47ovb5', '/inventory', 'lzjdp55ay7583d', 'Service Product test service product 1 has  0.977ML left please restock', 0, '2024-09-17 16:16:53'),
('m1m08w8iehdj4n', '/inventory', 'lzp4y0cjqyenjn', 'Service Product Loreal DX mask 500ML has  1.2065217391304348G left please restock', 1, '2024-09-28 10:24:23'),
('m1n9x7fgmifgmu', '/inventory', 'lzp4y0cjqyenjn', 'Service Product Loreal DX mask 500ML has  1.1630434782608696G left please restock', 1, '2024-09-29 07:43:00'),
('m1nb128c6b7whv', '/inventory', 'lzp4y0cjqyenjn', 'Service Product DX Shampoo backbar has  0.9986666666666667ML left please restock', 1, '2024-09-29 08:14:00'),
('m1ongjh9mp4nhp', '/inventory', 'lzp4y0cjqyenjn', 'Service Product Olaplex 1 has  1.2426095238095238ML left please restock', 1, '2024-09-30 06:49:43'),
('m1ongk7vt9z8yj', '/inventory', 'lzp4y0cjqyenjn', 'Service Product DX Shampoo backbar has  0.9973333333333333ML left please restock', 1, '2024-09-30 06:49:44'),
('m1ongky9nyv0n2', '/inventory', 'lzp4y0cjqyenjn', 'Service Product Olaplex 2 Backbar has  1.798ML left please restock', 1, '2024-09-30 06:49:45'),
('m1onglot733jjh', '/inventory', 'lzp4y0cjqyenjn', 'Service Product Loreal DX mask 500ML has  1.1195652173913044G left please restock', 1, '2024-09-30 06:49:46'),
('m1ongneh0iafuu', '/inventory', 'lzp4y0cjqyenjn', 'Service Product Loreal Silver Shampoo Backbar has  0.9986666666666667ML left please restock', 1, '2024-09-30 06:49:48'),
('m1q57xme2m23ud', '/inventory', 'lzp4y0cjqyenjn', 'Service Product 6% Oxidizing Cream SS has  5.977777777777778G left please restock', 1, '2024-10-01 07:54:41'),
('m1q57yd8zkxcgc', '/inventory', 'lzp4y0cjqyenjn', 'Service Product Loreal DX mask 500ML has  1.076086956521739G left please restock', 1, '2024-10-01 07:54:42'),
('m1q57z4h16vh1v', '/inventory', 'lzp4y0cjqyenjn', 'Service Product Loreal Silver Shampoo Backbar has  0.9973333333333333ML left please restock', 1, '2024-10-01 07:54:43'),
('m1q5jkxruk0orh', '/inventory', 'lzp4y0cjqyenjn', 'Service Product 6% Oxidizing Cream SS has  5.7G left please restock', 1, '2024-10-01 08:03:44'),
('m1q5jm69nj37pg', '/inventory', 'lzp4y0cjqyenjn', 'Service Product DX Shampoo backbar has  0.996ML left please restock', 1, '2024-10-01 08:03:46'),
('m1q7m2irlqc40x', '/inventory', 'lzp4y0cjqyenjn', 'Service Product 6% Oxidizing Cream SS has  5.611111111111111G left please restock', 1, '2024-10-01 09:01:40'),
('m1q7m3rp78uue3', '/inventory', 'lzp4y0cjqyenjn', 'Service Product 7.33 SS has  5.142168674698795G left please restock', 1, '2024-10-01 09:01:41'),
('m1q9dckrssq2d7', '/inventory', 'lzp4y0cjqyenjn', 'Service Product 6% Oxidizing Cream SS has  4.844444444444444G left please restock', 1, '2024-10-01 09:50:52'),
('m1q9ddbrzs7kg7', '/inventory', 'lzp4y0cjqyenjn', 'Service Product Olaplex 2 Backbar has  1.7955ML left please restock', 1, '2024-10-01 09:50:53'),
('m1q9de2t7o5e24', '/inventory', 'lzp4y0cjqyenjn', 'Service Product Olaplex 1 has  1.2365714285714287ML left please restock', 1, '2024-10-01 09:50:54'),
('m1rlrssmgjkjbe', '/inventory', 'lzp4y0cjqyenjn', 'Service Product 6% Oxidizing Cream SS has  4.5777777777777775G left please restock', 1, '2024-10-02 08:25:48'),
('m1uetzkns4u0mp', '/inventory', 'lzp4y0cjqyenjn', 'Service Product 0.00 AS has  5.397590361445783G left please restock', 1, '2024-10-04 07:34:51'),
('m1ueu0txm5oiro', '/inventory', 'lzp4y0cjqyenjn', 'Service Product 6% Oxidizing Cream SS has  4.466666666666667G left please restock', 1, '2024-10-04 07:34:53'),
('m1ueu1km642erz', '/inventory', 'lzp4y0cjqyenjn', 'Service Product Olaplex 2 Backbar has  1.793ML left please restock', 1, '2024-10-04 07:34:54');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_organizations`
--

CREATE TABLE `tbl_organizations` (
  `organization_id` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `organization_name` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `address` varchar(500) COLLATE utf8mb4_general_ci NOT NULL,
  `org_contact_no` varchar(15) COLLATE utf8mb4_general_ci NOT NULL,
  `org_email` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `manage_by` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `status` tinyint NOT NULL DEFAULT '1',
  `date_created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `delete_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_organizations`
--

INSERT INTO `tbl_organizations` (`organization_id`, `organization_name`, `address`, `org_contact_no`, `org_email`, `manage_by`, `status`, `date_created`, `delete_date`) VALUES
('lzjdp55ay7583d', 'test', 'test', '1231312', 'test@gmail.com', '00000002', 1, '2024-08-07 04:58:13', NULL),
('lzp4y0cjqyenjn', 'Michiko Salon', '102 EI Building, Manalo Road, Barangay Navarro, General Trias, Cavite', '09618995642', 'michikosalonofficial@gmail.com', '00000003', 1, '2024-08-11 05:39:47', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_positions`
--

CREATE TABLE `tbl_positions` (
  `position_id` int NOT NULL,
  `position` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `date_created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_positions`
--

INSERT INTO `tbl_positions` (`position_id`, `position`, `date_created`) VALUES
(0, 'MASTER ADMINISTRATOR', '2024-07-07 16:35:44'),
(1, 'SUPER ADMINISTRATOR', '2024-07-07 16:35:44'),
(2, 'BRANCH ADMINISTRATOR', '2024-08-01 11:17:22'),
(3, 'CASHIER', '2024-07-07 16:35:52');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_products`
--

CREATE TABLE `tbl_products` (
  `product_id` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `organization_id` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `product_name` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `price` double(10,2) NOT NULL,
  `srp` double(10,2) NOT NULL,
  `quantity` int NOT NULL,
  `minimum_qty` int NOT NULL DEFAULT '1',
  `date_created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `delete_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_products`
--

INSERT INTO `tbl_products` (`product_id`, `organization_id`, `product_name`, `price`, `srp`, `quantity`, `minimum_qty`, `date_created`, `delete_date`) VALUES
('00000001', 'lzp4y0cjqyenjn', 'ARM Shampoo', 1036.00, 2500.00, 6, 1, '2024-09-24 11:33:26', NULL),
('00000002', 'lzp4y0cjqyenjn', 'ARM Mask 250ML', 1384.00, 2500.00, 10, 2, '2024-09-24 11:35:25', NULL),
('00000003', 'lzp4y0cjqyenjn', 'Serioxyl Shampoo', 897.00, 1500.00, 3, 1, '2024-09-24 11:38:06', NULL),
('00000004', 'lzp4y0cjqyenjn', 'Loreal Silver Shampoo', 758.00, 1500.00, 2, 1, '2024-09-24 11:39:18', NULL),
('00000005', 'lzp4y0cjqyenjn', 'Oplex 0', 1611.00, 2500.00, 7, 2, '2024-09-24 11:46:12', NULL),
('00000006', 'lzp4y0cjqyenjn', 'Olalplex 3', 1611.00, 2500.00, 7, 2, '2024-09-24 11:46:47', NULL),
('00000007', 'lzp4y0cjqyenjn', 'Olaplex 4', 1611.00, 2500.00, 1, 2, '2024-09-24 11:47:24', NULL),
('00000008', 'lzp4y0cjqyenjn', 'Olaplex 4D', 1611.00, 2500.00, 3, 2, '2024-09-24 11:48:46', NULL),
('00000009', 'lzp4y0cjqyenjn', 'Olaplex 4P', 1611.00, 2500.00, 0, 2, '2024-09-24 11:49:47', NULL),
('00000010', 'lzp4y0cjqyenjn', 'Olaplex 5', 1611.00, 2500.00, 4, 2, '2024-09-24 11:56:45', NULL),
('00000011', 'lzp4y0cjqyenjn', 'Olaplex 6', 1611.00, 2500.00, 15, 2, '2024-09-24 11:57:14', NULL),
('00000012', 'lzp4y0cjqyenjn', 'Olaplex 7', 1611.00, 2500.00, 5, 2, '2024-09-24 11:59:39', NULL),
('00000013', 'lzp4y0cjqyenjn', 'Olaplex 9', 1611.00, 2500.00, 1, 2, '2024-09-24 12:02:14', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_product_history`
--

CREATE TABLE `tbl_product_history` (
  `product_id` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `added_quantity` int NOT NULL DEFAULT '0',
  `previous_stock` decimal(10,2) NOT NULL,
  `current_stock` decimal(10,2) NOT NULL,
  `organization_id` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `srp` double(10,2) NOT NULL DEFAULT '0.00',
  `price` double(10,2) NOT NULL DEFAULT '0.00',
  `total_price` double(10,2) NOT NULL DEFAULT '0.00',
  `updated_by` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `date_created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_product_history`
--

INSERT INTO `tbl_product_history` (`product_id`, `added_quantity`, `previous_stock`, `current_stock`, `organization_id`, `srp`, `price`, `total_price`, `updated_by`, `date_created`) VALUES
('00000001', 6, 0.00, 6.00, 'lzp4y0cjqyenjn', 0.00, 0.00, 0.00, '00000004', '2024-09-24 11:33:26'),
('00000002', 10, 0.00, 10.00, 'lzp4y0cjqyenjn', 0.00, 0.00, 0.00, '00000004', '2024-09-24 11:35:25'),
('00000003', 3, 0.00, 3.00, 'lzp4y0cjqyenjn', 0.00, 0.00, 0.00, '00000004', '2024-09-24 11:38:07'),
('00000004', 2, 0.00, 2.00, 'lzp4y0cjqyenjn', 0.00, 0.00, 0.00, '00000004', '2024-09-24 11:39:18'),
('00000005', 7, 0.00, 7.00, 'lzp4y0cjqyenjn', 0.00, 0.00, 0.00, '00000004', '2024-09-24 11:46:12'),
('00000006', 7, 0.00, 7.00, 'lzp4y0cjqyenjn', 0.00, 0.00, 0.00, '00000004', '2024-09-24 11:46:47'),
('00000007', 1, 0.00, 1.00, 'lzp4y0cjqyenjn', 0.00, 0.00, 0.00, '00000004', '2024-09-24 11:47:25'),
('00000008', 0, 0.00, 0.00, 'lzp4y0cjqyenjn', 0.00, 0.00, 0.00, '00000004', '2024-09-24 11:48:16'),
('00000009', 0, 0.00, 0.00, 'lzp4y0cjqyenjn', 0.00, 0.00, 0.00, '00000004', '2024-09-24 11:49:47'),
('00000010', 4, 0.00, 4.00, 'lzp4y0cjqyenjn', 0.00, 0.00, 0.00, '00000004', '2024-09-24 11:56:45'),
('00000011', 15, 0.00, 15.00, 'lzp4y0cjqyenjn', 0.00, 0.00, 0.00, '00000004', '2024-09-24 11:57:14'),
('00000012', 5, 0.00, 5.00, 'lzp4y0cjqyenjn', 0.00, 0.00, 0.00, '00000004', '2024-09-24 11:59:40'),
('00000013', 1, 0.00, 1.00, 'lzp4y0cjqyenjn', 0.00, 0.00, 0.00, '00000004', '2024-09-24 12:02:14');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_services`
--

CREATE TABLE `tbl_services` (
  `service_id` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `organization_id` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `category_id` int NOT NULL,
  `service_name` varchar(200) COLLATE utf8mb4_general_ci NOT NULL,
  `price` double(10,2) NOT NULL,
  `status` int NOT NULL DEFAULT '1',
  `create_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_services`
--

INSERT INTO `tbl_services` (`service_id`, `organization_id`, `category_id`, `service_name`, `price`, `status`, `create_date`, `deleted_date`) VALUES
('m1bunr1ymdnv7w', 'lzp4y0cjqyenjn', 1, 'Test', 2500.00, 1, '2024-09-21 07:50:17', '2024-09-21 15:50:21'),
('m1hcheow3h8ye9', 'lzp4y0cjqyenjn', 1, 'Balayage (Short)', 6099.00, 1, '2024-09-25 04:08:05', NULL),
('m1hchuuyb3jd46', 'lzp4y0cjqyenjn', 1, 'Balayage (Mid)', 6499.00, 1, '2024-09-25 04:08:26', NULL),
('m1hcifjjk1bpvz', 'lzp4y0cjqyenjn', 1, 'Balayage (Long)', 8499.00, 1, '2024-09-25 04:08:53', NULL),
('m1hcjco5ykllue', 'lzp4y0cjqyenjn', 1, 'Premium Color (Short)', 4099.00, 1, '2024-09-25 04:09:35', NULL),
('m1hcjtgh9fqw28', 'lzp4y0cjqyenjn', 1, 'Premium Color (Mid)', 4499.00, 1, '2024-09-25 04:09:57', NULL),
('m1hckeh8cbqimg', 'lzp4y0cjqyenjn', 1, 'Premium Color Long', 4999.00, 1, '2024-09-25 04:10:24', NULL),
('m1hcp08ikzgep6', 'lzp4y0cjqyenjn', 1, 'Basic Color (Short)', 2000.00, 1, '2024-09-25 04:13:59', NULL),
('m1hcpvrjpay7ht', 'lzp4y0cjqyenjn', 1, 'Basic Color (Mid)', 2500.00, 1, '2024-09-25 04:14:40', NULL),
('m1hcqi6kwobegq', 'lzp4y0cjqyenjn', 1, 'Basic Color (Long)', 3000.00, 1, '2024-09-25 04:15:09', NULL),
('m1hcrquok9xitd', 'lzp4y0cjqyenjn', 1, 'Fashion Color (Short)', 6499.00, 1, '2024-09-25 04:16:07', NULL),
('m1hcs9bdad8ou5', 'lzp4y0cjqyenjn', 1, 'Fashion Color (Mid)', 8499.00, 1, '2024-09-25 04:16:31', NULL),
('m1hctijg8or7xx', 'lzp4y0cjqyenjn', 1, 'Fashion Color (Long)', 9899.00, 1, '2024-09-25 04:17:30', NULL),
('m1hcysl4dohxy0', 'lzp4y0cjqyenjn', 6, 'Lightener (100 G)', 1000.00, 1, '2024-09-25 04:21:36', NULL),
('m1hd0kmv4fywff', 'lzp4y0cjqyenjn', 1, 'L\'oreal Color (1 Tube)', 2000.00, 1, '2024-09-25 04:22:59', NULL),
('m1hd2hsa53a72m', 'lzp4y0cjqyenjn', 6, 'L\'oreal Blonde Studio 9 (100 G)', 2500.00, 1, '2024-09-25 04:24:29', NULL),
('m1hd69d0jitp3n', 'lzp4y0cjqyenjn', 1, 'Cysteine (Short)', 2300.00, 1, '2024-09-25 04:27:24', NULL),
('m1hd6ufwjso5yi', 'lzp4y0cjqyenjn', 1, 'Cysteine (Mid)', 2700.00, 1, '2024-09-25 04:27:52', NULL),
('m1hd8xk9j6oahn', 'lzp4y0cjqyenjn', 1, 'Cysteine (Long)', 3300.00, 1, '2024-09-25 04:29:29', NULL),
('m1hd9oqrhu2lj1', 'lzp4y0cjqyenjn', 1, 'Keratin Pro Max (Short)', 2300.00, 1, '2024-09-25 04:30:04', NULL),
('m1hda70fg8t243', 'lzp4y0cjqyenjn', 1, 'Keratin Pro Max (Mid)', 2600.00, 1, '2024-09-25 04:30:28', NULL),
('m1hdaqlqkei5k9', 'lzp4y0cjqyenjn', 1, 'Keratin Pro Max (Long)', 3300.00, 1, '2024-09-25 04:30:53', NULL),
('m1lmxlah0q66zq', 'lzp4y0cjqyenjn', 1, 'Rebond (Short)', 4900.00, 1, '2024-09-28 04:11:41', NULL),
('m1lmycd93n2a69', 'lzp4y0cjqyenjn', 1, 'Rebond (Mid)', 5500.00, 1, '2024-09-28 04:12:16', NULL),
('m1lmyvf51cp1zw', 'lzp4y0cjqyenjn', 1, 'Rebond (Long)', 6500.00, 1, '2024-09-28 04:12:41', NULL),
('m1ln0fnlrkjvd4', 'lzp4y0cjqyenjn', 1, 'OLAPLEX Salon Treatment', 2000.00, 1, '2024-09-28 04:13:53', NULL),
('m1ln14shnostin', 'lzp4y0cjqyenjn', 1, 'L\'Oreal Metal DX Salon Treatment', 2000.00, 1, '2024-09-28 04:14:26', NULL),
('m1ln1sjqnzgdml', 'lzp4y0cjqyenjn', 1, 'L\'Oreal Absolut Repair Molecular Salon Treatment', 4500.00, 1, '2024-09-28 04:14:57', NULL),
('m1ln365p4hj2ja', 'lzp4y0cjqyenjn', 1, 'Argila (Short)', 3500.00, 1, '2024-09-28 04:16:01', NULL),
('m1ln3n109l00q9', 'lzp4y0cjqyenjn', 1, 'Argila (Mid)', 4000.00, 1, '2024-09-28 04:16:23', NULL),
('m1ln4bhquxmogs', 'lzp4y0cjqyenjn', 1, 'Argila (Long)', 4500.00, 1, '2024-09-28 04:16:55', NULL),
('m1ltgbi0xxk6sv', 'lzjdp55ay7583d', 1, 'test', 123.00, 1, '2024-09-28 07:14:12', NULL),
('m1ltthv0ovxhpf', 'lzp4y0cjqyenjn', 1, 'Haircut', 400.00, 1, '2024-09-28 07:24:27', NULL),
('m1ltu3w5bizrm3', 'lzp4y0cjqyenjn', 1, 'Hair Style', 800.00, 1, '2024-09-28 07:24:56', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_transactions`
--

CREATE TABLE `tbl_transactions` (
  `transaction_id` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `client_id` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `organization_id` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `transaction_total_amount` double(10,2) DEFAULT '0.00',
  `otc_total_amount` double(10,2) DEFAULT '0.00',
  `service_total_amount` double(10,2) DEFAULT '0.00',
  `total_commissions_service` decimal(10,2) DEFAULT '0.00',
  `total_commissions_otc` double(10,2) DEFAULT '0.00',
  `no_of_service` int NOT NULL,
  `discount_id` int DEFAULT NULL,
  `discount` int DEFAULT NULL,
  `original_total_amount` double(10,2) DEFAULT NULL,
  `transaction_details` varchar(500) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `payment_method` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `referrence_no` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `e_payment` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `updated_by` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `deleted_date` datetime DEFAULT NULL,
  `transaction_created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_transactions`
--

INSERT INTO `tbl_transactions` (`transaction_id`, `client_id`, `organization_id`, `transaction_total_amount`, `otc_total_amount`, `service_total_amount`, `total_commissions_service`, `total_commissions_otc`, `no_of_service`, `discount_id`, `discount`, `original_total_amount`, `transaction_details`, `payment_method`, `referrence_no`, `e_payment`, `status`, `updated_by`, `deleted_date`, `transaction_created_date`) VALUES
('1429457862', '00000055', 'lzp4y0cjqyenjn', 4499.00, 0.00, 4499.00, 584.87, 0.00, 1, NULL, NULL, 4499.00, NULL, 'cashless', NULL, 'Gcash', 1, '00000007', NULL, '2024-10-04 07:34:48'),
('1516491831', '00000050', 'lzp4y0cjqyenjn', 8399.00, 0.00, 8399.00, 923.89, 0.00, 3, NULL, NULL, 8399.00, NULL, 'cashless', NULL, 'Parlon Paid', 1, '00000016', NULL, '2024-10-01 09:01:33'),
('2469226134', '00000038', 'lzp4y0cjqyenjn', 3300.00, 0.00, 3300.00, 429.00, 0.00, 1, NULL, NULL, 3300.00, NULL, 'cash', NULL, NULL, 1, '00000016', NULL, '2024-09-28 07:14:41'),
('3256304755', '00000053', 'lzp4y0cjqyenjn', 6499.00, 0.00, 6499.00, 0.00, 0.00, 1, NULL, NULL, 6499.00, 'parlon', 'cashless', NULL, 'Parlon Paid', 1, '00000005', NULL, '2024-10-01 09:50:46'),
('6351857144', '00000042', 'lzp4y0cjqyenjn', 16999.00, 10000.00, 6999.00, 909.87, 0.00, 2, NULL, NULL, 16999.00, NULL, 'cashless', NULL, 'Gcash', 1, '00000007', NULL, '2024-09-28 10:24:17'),
('6448597298', '00000052', 'lzp4y0cjqyenjn', 4499.00, 0.00, 4499.00, 584.87, 0.00, 1, NULL, NULL, 4499.00, NULL, 'cashless', NULL, 'Gcash', 1, '00000007', NULL, '2024-10-01 08:03:40'),
('6583686679', '00000044', 'lzp4y0cjqyenjn', 2700.00, 0.00, 2700.00, 351.00, 0.00, 1, NULL, NULL, 2700.00, NULL, 'cashless', NULL, 'maya', 1, '00000016', NULL, '2024-09-29 07:04:17'),
('6714012774', '00000047', 'lzp4y0cjqyenjn', 3300.00, 0.00, 3300.00, 0.00, 0.00, 1, NULL, NULL, 3300.00, NULL, 'cash', NULL, NULL, 1, '00000007', NULL, '2024-09-29 08:13:56'),
('7275442092', '00000049', 'lzp4y0cjqyenjn', 8499.00, 0.00, 8499.00, 1189.86, 0.00, 2, NULL, NULL, 8499.00, NULL, 'cashless', NULL, 'Gcash', 1, '00000007', NULL, '2024-09-30 06:49:36'),
('8406714130', '00000045', 'lzp4y0cjqyenjn', 6499.00, 0.00, 6499.00, 0.00, 0.00, 2, NULL, NULL, 6499.00, NULL, 'cashless', NULL, 'Gcash', 1, '00000007', NULL, '2024-09-29 07:42:55'),
('9317163402', '00000040', 'lzp4y0cjqyenjn', 5000.00, 0.00, 5000.00, 550.00, 0.00, 2, NULL, NULL, 5000.00, NULL, 'cashless', '12345677', 'Gcash', 1, '00000005', NULL, '2024-09-28 09:31:06'),
('9807469511', '00000051', 'lzp4y0cjqyenjn', 8999.00, 2500.00, 6499.00, 844.87, 250.00, 2, NULL, NULL, 8999.00, NULL, 'cashless', NULL, 'Gcash', 1, '00000007', NULL, '2024-10-01 07:54:36'),
('9875804123', '00000013', 'lzp4y0cjqyenjn', 4000.00, 0.00, 4000.00, 440.00, 0.00, 2, NULL, NULL, 4000.00, NULL, 'cash', NULL, NULL, 1, '00000005', NULL, '2024-10-02 08:25:41');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_transactions_commisions`
--

CREATE TABLE `tbl_transactions_commisions` (
  `transaction_id` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `employee_id` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `organization_id` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `commission_total_amount` double(10,2) NOT NULL,
  `tip` double(10,2) DEFAULT '0.00',
  `commission_type` varchar(20) COLLATE utf8mb4_general_ci NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `date_created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_transactions_commisions`
--

INSERT INTO `tbl_transactions_commisions` (`transaction_id`, `employee_id`, `organization_id`, `commission_total_amount`, `tip`, `commission_type`, `status`, `date_created`) VALUES
('2469226134', '00000015', 'lzp4y0cjqyenjn', 330.00, 0.00, 'service', 1, '2024-09-28 07:14:49'),
('2469226134', '00000006', 'lzp4y0cjqyenjn', 99.00, 0.00, 'service', 1, '2024-09-28 07:14:49'),
('9317163402', '00000005', 'lzp4y0cjqyenjn', 500.00, 0.00, 'service', 1, '2024-09-28 09:31:11'),
('9317163402', '00000008', 'lzp4y0cjqyenjn', 50.00, 0.00, 'service', 1, '2024-09-28 09:31:11'),
('6351857144', '00000007', 'lzp4y0cjqyenjn', 699.90, 0.00, 'service', 1, '2024-09-28 10:24:27'),
('6351857144', '00000011', 'lzp4y0cjqyenjn', 209.97, 0.00, 'service', 1, '2024-09-28 10:24:27'),
('6583686679', '00000015', 'lzp4y0cjqyenjn', 270.00, 0.00, 'service', 1, '2024-09-29 07:04:25'),
('6583686679', '00000006', 'lzp4y0cjqyenjn', 81.00, 0.00, 'service', 1, '2024-09-29 07:04:25'),
('9807469511', '00000007', 'lzp4y0cjqyenjn', 649.90, 0.00, 'service', 1, '2024-10-01 07:54:47'),
('9807469511', '00000006', 'lzp4y0cjqyenjn', 194.97, 0.00, 'service', 1, '2024-10-01 07:54:47'),
('9807469511', '00000007', 'lzp4y0cjqyenjn', 250.00, 0.00, 'otc', 1, '2024-10-01 07:54:48'),
('6448597298', '00000007', 'lzp4y0cjqyenjn', 449.90, 0.00, 'service', 1, '2024-10-01 08:03:50'),
('6448597298', '00000006', 'lzp4y0cjqyenjn', 134.97, 0.00, 'service', 1, '2024-10-01 08:03:50'),
('1516491831', '00000015', 'lzp4y0cjqyenjn', 839.90, 0.00, 'service', 1, '2024-10-01 09:01:47'),
('1516491831', '00000008', 'lzp4y0cjqyenjn', 83.99, 0.00, 'service', 1, '2024-10-01 09:01:48'),
('1429457862', '00000007', 'lzp4y0cjqyenjn', 449.90, 0.00, 'service', 1, '2024-10-04 07:34:57'),
('1429457862', '00000006', 'lzp4y0cjqyenjn', 134.97, 0.00, 'service', 1, '2024-10-04 07:34:57');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_transactions_otc_product`
--

CREATE TABLE `tbl_transactions_otc_product` (
  `transaction_id` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `product_id` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `organization_id` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `client_id` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `less_quantity` double(10,2) NOT NULL,
  `previous_stock` decimal(10,2) NOT NULL DEFAULT '0.00',
  `current_stock` decimal(10,2) NOT NULL DEFAULT '0.00',
  `product_total_amount` double(10,2) NOT NULL,
  `total_commissions` decimal(10,2) DEFAULT '0.00',
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `updated_by` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `date_created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_transactions_otc_product`
--

INSERT INTO `tbl_transactions_otc_product` (`transaction_id`, `product_id`, `organization_id`, `client_id`, `less_quantity`, `previous_stock`, `current_stock`, `product_total_amount`, `total_commissions`, `status`, `updated_by`, `date_created`) VALUES
('6351857144', '00000005', 'lzp4y0cjqyenjn', '00000042', 1.00, 0.00, 0.00, 2500.00, 0.00, 1, '00000007', '2024-09-28 10:24:25'),
('6351857144', '00000006', 'lzp4y0cjqyenjn', '00000042', 1.00, 0.00, 0.00, 2500.00, 0.00, 1, '00000007', '2024-09-28 10:24:26'),
('6351857144', '00000011', 'lzp4y0cjqyenjn', '00000042', 1.00, 0.00, 0.00, 2500.00, 0.00, 1, '00000007', '2024-09-28 10:24:26'),
('6351857144', '00000012', 'lzp4y0cjqyenjn', '00000042', 1.00, 0.00, 0.00, 2500.00, 0.00, 1, '00000007', '2024-09-28 10:24:26'),
('9807469511', '00000002', 'lzp4y0cjqyenjn', '00000051', 1.00, 0.00, 0.00, 2500.00, 10.00, 1, '00000007', '2024-10-01 07:54:46');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_transactions_services`
--

CREATE TABLE `tbl_transactions_services` (
  `transaction_id` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `client_id` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `service_id` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `organization_id` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `total_commissions` decimal(10,2) DEFAULT '0.00',
  `price` double(10,2) NOT NULL,
  `additional` double(10,2) DEFAULT '0.00',
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_transactions_services`
--

INSERT INTO `tbl_transactions_services` (`transaction_id`, `client_id`, `service_id`, `organization_id`, `total_commissions`, `price`, `additional`, `status`, `created_date`) VALUES
('2469226134', '00000038', 'm1hdaqlqkei5k9', 'lzp4y0cjqyenjn', 13.00, 3300.00, 0.00, 1, '2024-09-28 07:14:43'),
('9317163402', '00000040', 'm1ln0fnlrkjvd4', 'lzp4y0cjqyenjn', 11.00, 2000.00, 500.00, 1, '2024-09-28 09:31:07'),
('9317163402', '00000040', 'm1ln14shnostin', 'lzp4y0cjqyenjn', 11.00, 2000.00, 500.00, 1, '2024-09-28 09:31:07'),
('6351857144', '00000042', 'm1ln14shnostin', 'lzp4y0cjqyenjn', 13.00, 2000.00, 0.00, 1, '2024-09-28 10:24:18'),
('6351857144', '00000042', 'm1hckeh8cbqimg', 'lzp4y0cjqyenjn', 13.00, 4999.00, 0.00, 1, '2024-09-28 10:24:18'),
('6583686679', '00000044', 'm1hd6ufwjso5yi', 'lzp4y0cjqyenjn', 13.00, 2700.00, 0.00, 1, '2024-09-29 07:04:18'),
('8406714130', '00000045', 'm1ln14shnostin', 'lzp4y0cjqyenjn', 0.00, 2000.00, 0.00, 1, '2024-09-29 07:42:56'),
('8406714130', '00000045', 'm1hcjtgh9fqw28', 'lzp4y0cjqyenjn', 0.00, 4499.00, 0.00, 1, '2024-09-29 07:42:56'),
('6714012774', '00000047', 'm1hd8xk9j6oahn', 'lzp4y0cjqyenjn', 0.00, 3300.00, 0.00, 1, '2024-09-29 08:13:57'),
('7275442092', '00000049', 'm1hchuuyb3jd46', 'lzp4y0cjqyenjn', 14.00, 6499.00, 0.00, 1, '2024-09-30 06:49:37'),
('7275442092', '00000049', 'm1ln14shnostin', 'lzp4y0cjqyenjn', 14.00, 2000.00, 0.00, 1, '2024-09-30 06:49:37'),
('9807469511', '00000051', 'm1hcjtgh9fqw28', 'lzp4y0cjqyenjn', 13.00, 4499.00, 0.00, 1, '2024-10-01 07:54:37'),
('9807469511', '00000051', 'm1ln14shnostin', 'lzp4y0cjqyenjn', 13.00, 2000.00, 0.00, 1, '2024-10-01 07:54:37'),
('6448597298', '00000052', 'm1hcjtgh9fqw28', 'lzp4y0cjqyenjn', 13.00, 4499.00, 0.00, 1, '2024-10-01 08:03:40'),
('1516491831', '00000050', 'm1hd69d0jitp3n', 'lzp4y0cjqyenjn', 11.00, 2300.00, 0.00, 1, '2024-10-01 09:01:34'),
('1516491831', '00000050', 'm1hcjco5ykllue', 'lzp4y0cjqyenjn', 11.00, 4099.00, 0.00, 1, '2024-10-01 09:01:34'),
('1516491831', '00000050', 'm1ln14shnostin', 'lzp4y0cjqyenjn', 11.00, 2000.00, 0.00, 1, '2024-10-01 09:01:34'),
('3256304755', '00000053', 'm1hchuuyb3jd46', 'lzp4y0cjqyenjn', 0.00, 6499.00, 0.00, 1, '2024-10-01 09:50:47'),
('9875804123', '00000013', 'm1hcp08ikzgep6', 'lzp4y0cjqyenjn', 11.00, 2000.00, 0.00, 1, '2024-10-02 08:25:42'),
('9875804123', '00000013', 'm1ln14shnostin', 'lzp4y0cjqyenjn', 11.00, 2000.00, 0.00, 1, '2024-10-02 08:25:42'),
('1429457862', '00000055', 'm1hcjtgh9fqw28', 'lzp4y0cjqyenjn', 13.00, 4499.00, 0.00, 1, '2024-10-04 07:34:49');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_transactions_services_product`
--

CREATE TABLE `tbl_transactions_services_product` (
  `transaction_id` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `inventory_id` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `organization_id` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `less_quantity` decimal(10,2) NOT NULL,
  `previous_stock` decimal(10,2) NOT NULL DEFAULT '0.00',
  `current_stock` decimal(10,2) NOT NULL DEFAULT '0.00',
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `updated_by` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `date_created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_transactions_services_product`
--

INSERT INTO `tbl_transactions_services_product` (`transaction_id`, `inventory_id`, `organization_id`, `less_quantity`, `previous_stock`, `current_stock`, `status`, `updated_by`, `date_created`) VALUES
('2469226134', '00000091', 'lzp4y0cjqyenjn', 40.00, 5.50, 5.46, 1, '00000016', '2024-09-28 07:14:44'),
('9317163402', '00000058', 'lzp4y0cjqyenjn', 20.00, 6.00, 5.96, 1, '00000005', '2024-09-28 09:31:08'),
('6351857144', '00000059', 'lzp4y0cjqyenjn', 20.00, 1.25, 1.21, 1, '00000007', '2024-09-28 10:24:19'),
('6351857144', '00000059', 'lzp4y0cjqyenjn', 20.00, 1.25, 1.21, 1, '00000007', '2024-09-28 10:24:20'),
('6351857144', '00000059', 'lzp4y0cjqyenjn', 20.00, 1.25, 1.21, 1, '00000007', '2024-09-28 10:24:20'),
('6351857144', '00000059', 'lzp4y0cjqyenjn', 20.00, 1.25, 1.21, 1, '00000007', '2024-09-28 10:24:20'),
('6583686679', '00000065', 'lzp4y0cjqyenjn', 60.00, 4.25, 4.18, 1, '00000016', '2024-09-29 07:04:20'),
('8406714130', '00000059', 'lzp4y0cjqyenjn', 20.00, 1.21, 1.16, 1, '00000007', '2024-09-29 07:42:57'),
('8406714130', '00000059', 'lzp4y0cjqyenjn', 20.00, 1.21, 1.16, 1, '00000007', '2024-09-29 07:42:57'),
('8406714130', '00000059', 'lzp4y0cjqyenjn', 20.00, 1.21, 1.16, 1, '00000007', '2024-09-29 07:42:58'),
('6714012774', '00000100', 'lzp4y0cjqyenjn', 2.00, 1.00, 1.00, 1, '00000007', '2024-09-29 08:13:58'),
('6714012774', '00000100', 'lzp4y0cjqyenjn', 2.00, 1.00, 1.00, 1, '00000007', '2024-09-29 08:13:58'),
('7275442092', '00000095', 'lzp4y0cjqyenjn', 4.00, 1.80, 1.80, 1, '00000007', '2024-09-30 06:49:38'),
('7275442092', '00000095', 'lzp4y0cjqyenjn', 4.00, 1.80, 1.80, 1, '00000007', '2024-09-30 06:49:38'),
('7275442092', '00000095', 'lzp4y0cjqyenjn', 4.00, 1.80, 1.80, 1, '00000007', '2024-09-30 06:49:38'),
('7275442092', '00000095', 'lzp4y0cjqyenjn', 4.00, 1.80, 1.80, 1, '00000007', '2024-09-30 06:49:39'),
('7275442092', '00000095', 'lzp4y0cjqyenjn', 4.00, 1.80, 1.80, 1, '00000007', '2024-09-30 06:49:39'),
('7275442092', '00000095', 'lzp4y0cjqyenjn', 4.00, 1.80, 1.80, 1, '00000007', '2024-09-30 06:49:39'),
('7275442092', '00000095', 'lzp4y0cjqyenjn', 4.00, 1.80, 1.80, 1, '00000007', '2024-09-30 06:49:39'),
('7275442092', '00000095', 'lzp4y0cjqyenjn', 4.00, 1.80, 1.80, 1, '00000007', '2024-09-30 06:49:40'),
('7275442092', '00000095', 'lzp4y0cjqyenjn', 4.00, 1.80, 1.80, 1, '00000007', '2024-09-30 06:49:40'),
('7275442092', '00000095', 'lzp4y0cjqyenjn', 4.00, 1.80, 1.80, 1, '00000007', '2024-09-30 06:49:40'),
('9807469511', '00000012', 'lzp4y0cjqyenjn', 40.00, 35.37, 34.89, 1, '00000007', '2024-10-01 07:54:38'),
('9807469511', '00000012', 'lzp4y0cjqyenjn', 40.00, 35.37, 34.89, 1, '00000007', '2024-10-01 07:54:38'),
('9807469511', '00000012', 'lzp4y0cjqyenjn', 40.00, 35.37, 34.89, 1, '00000007', '2024-10-01 07:54:39'),
('9807469511', '00000012', 'lzp4y0cjqyenjn', 40.00, 35.37, 34.89, 1, '00000007', '2024-10-01 07:54:39'),
('9807469511', '00000012', 'lzp4y0cjqyenjn', 40.00, 35.37, 34.89, 1, '00000007', '2024-10-01 07:54:39'),
('6448597298', '00000100', 'lzp4y0cjqyenjn', 2.00, 1.00, 1.00, 1, '00000007', '2024-10-01 08:03:41'),
('6448597298', '00000100', 'lzp4y0cjqyenjn', 2.00, 1.00, 1.00, 1, '00000007', '2024-10-01 08:03:41'),
('6448597298', '00000100', 'lzp4y0cjqyenjn', 2.00, 1.00, 1.00, 1, '00000007', '2024-10-01 08:03:42'),
('6448597298', '00000100', 'lzp4y0cjqyenjn', 2.00, 1.00, 1.00, 1, '00000007', '2024-10-01 08:03:42'),
('6448597298', '00000100', 'lzp4y0cjqyenjn', 2.00, 1.00, 1.00, 1, '00000007', '2024-10-01 08:03:42'),
('1516491831', '00000058', 'lzp4y0cjqyenjn', 50.00, 5.96, 5.85, 1, '00000016', '2024-10-01 09:01:36'),
('1516491831', '00000058', 'lzp4y0cjqyenjn', 50.00, 5.96, 5.85, 1, '00000016', '2024-10-01 09:01:36'),
('1516491831', '00000058', 'lzp4y0cjqyenjn', 50.00, 5.96, 5.85, 1, '00000016', '2024-10-01 09:01:36'),
('1516491831', '00000058', 'lzp4y0cjqyenjn', 50.00, 5.96, 5.85, 1, '00000016', '2024-10-01 09:01:37'),
('1516491831', '00000058', 'lzp4y0cjqyenjn', 50.00, 5.96, 5.85, 1, '00000016', '2024-10-01 09:01:37'),
('1516491831', '00000058', 'lzp4y0cjqyenjn', 50.00, 5.96, 5.85, 1, '00000016', '2024-10-01 09:01:37'),
('3256304755', '00000102', 'lzp4y0cjqyenjn', 3.17, 1.24, 1.24, 1, '00000005', '2024-10-01 09:50:48'),
('3256304755', '00000102', 'lzp4y0cjqyenjn', 3.17, 1.24, 1.24, 1, '00000005', '2024-10-01 09:50:48'),
('3256304755', '00000102', 'lzp4y0cjqyenjn', 3.17, 1.24, 1.24, 1, '00000005', '2024-10-01 09:50:48'),
('3256304755', '00000102', 'lzp4y0cjqyenjn', 3.17, 1.24, 1.24, 1, '00000005', '2024-10-01 09:50:49'),
('3256304755', '00000102', 'lzp4y0cjqyenjn', 3.17, 1.24, 1.24, 1, '00000005', '2024-10-01 09:50:49'),
('3256304755', '00000102', 'lzp4y0cjqyenjn', 3.17, 1.24, 1.24, 1, '00000005', '2024-10-01 09:50:49'),
('9875804123', '00000001', 'lzp4y0cjqyenjn', 240.00, 4.84, 4.58, 1, '00000005', '2024-10-02 08:25:43'),
('9875804123', '00000001', 'lzp4y0cjqyenjn', 240.00, 4.84, 4.58, 1, '00000005', '2024-10-02 08:25:43'),
('9875804123', '00000001', 'lzp4y0cjqyenjn', 240.00, 4.84, 4.58, 1, '00000005', '2024-10-02 08:25:44'),
('9875804123', '00000001', 'lzp4y0cjqyenjn', 240.00, 4.84, 4.58, 1, '00000005', '2024-10-02 08:25:44'),
('9875804123', '00000001', 'lzp4y0cjqyenjn', 240.00, 4.84, 4.58, 1, '00000005', '2024-10-02 08:25:44'),
('1429457862', '00000095', 'lzp4y0cjqyenjn', 5.00, 1.80, 1.79, 1, '00000007', '2024-10-04 07:34:49'),
('1429457862', '00000095', 'lzp4y0cjqyenjn', 5.00, 1.80, 1.79, 1, '00000007', '2024-10-04 07:34:50'),
('1429457862', '00000095', 'lzp4y0cjqyenjn', 5.00, 1.80, 1.79, 1, '00000007', '2024-10-04 07:34:50'),
('1429457862', '00000095', 'lzp4y0cjqyenjn', 5.00, 1.80, 1.79, 1, '00000007', '2024-10-04 07:34:50');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_accounts`
--
ALTER TABLE `tbl_accounts`
  ADD PRIMARY KEY (`account_id`);

--
-- Indexes for table `tbl_category`
--
ALTER TABLE `tbl_category`
  ADD PRIMARY KEY (`category_id`);

--
-- Indexes for table `tbl_clients`
--
ALTER TABLE `tbl_clients`
  ADD PRIMARY KEY (`client_id`);

--
-- Indexes for table `tbl_discounts`
--
ALTER TABLE `tbl_discounts`
  ADD PRIMARY KEY (`discount_id`);

--
-- Indexes for table `tbl_employees`
--
ALTER TABLE `tbl_employees`
  ADD PRIMARY KEY (`employee_id`);

--
-- Indexes for table `tbl_e_payment`
--
ALTER TABLE `tbl_e_payment`
  ADD PRIMARY KEY (`payment_id`);

--
-- Indexes for table `tbl_inventory`
--
ALTER TABLE `tbl_inventory`
  ADD PRIMARY KEY (`inventory_id`);

--
-- Indexes for table `tbl_notifications`
--
ALTER TABLE `tbl_notifications`
  ADD PRIMARY KEY (`notification_id`);

--
-- Indexes for table `tbl_organizations`
--
ALTER TABLE `tbl_organizations`
  ADD PRIMARY KEY (`organization_id`);

--
-- Indexes for table `tbl_positions`
--
ALTER TABLE `tbl_positions`
  ADD PRIMARY KEY (`position_id`);

--
-- Indexes for table `tbl_products`
--
ALTER TABLE `tbl_products`
  ADD PRIMARY KEY (`product_id`);

--
-- Indexes for table `tbl_services`
--
ALTER TABLE `tbl_services`
  ADD PRIMARY KEY (`service_id`);

--
-- Indexes for table `tbl_transactions`
--
ALTER TABLE `tbl_transactions`
  ADD PRIMARY KEY (`transaction_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbl_category`
--
ALTER TABLE `tbl_category`
  MODIFY `category_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `tbl_discounts`
--
ALTER TABLE `tbl_discounts`
  MODIFY `discount_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `tbl_e_payment`
--
ALTER TABLE `tbl_e_payment`
  MODIFY `payment_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `tbl_positions`
--
ALTER TABLE `tbl_positions`
  MODIFY `position_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
