-- phpMyAdmin SQL Dump
-- version 4.9.5deb2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jun 06, 2021 at 11:37 AM
-- Server version: 8.0.25-0ubuntu0.20.04.1
-- PHP Version: 7.4.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `digyhomeschooling`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int NOT NULL,
  `nama_admin` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `username` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `level` int NOT NULL,
  `tanggal` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `tanggal_update` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `nama_admin`, `username`, `password`, `level`, `tanggal`, `tanggal_update`) VALUES
(1, 'Rizki Fauzi', 'uji', '$2y$10$hahGG7L1uMj8/maVIliqQeKIrtiEpwF4x7grC/jYYlYHXM7hW3D/i', 0, '17-05-2021 06:37:18 PM', '17-05-2021 06:37:18 PM'),
(3, 'Aye Shabira', 'aye', '$2y$10$9JXj45C0k4.yrfMgstUc2udDZb09DJFGXRpwDg0pOZAEoNtvdfZSq', 0, '18-05-2021 05:47:40 PM', '18-05-2021 05:47:40 PM'),
(5, 'sfujan', 'fujan', '$2b$10$voys.S3VJrY.lmrYAqs8Luya98CPaAxClzm3RluaMU1kIsA3TyMi6', 1, '2021-05-25 09:17:34.307', '2021-05-26 08:49:34.377');

-- --------------------------------------------------------

--
-- Table structure for table `article`
--

CREATE TABLE `article` (
  `id` int NOT NULL,
  `id_article` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `judul` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `tags` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `cover` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `isi` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `tanggal` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `tanggal_update` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `article`
--

INSERT INTO `article` (`id`, `id_article`, `judul`, `tags`, `cover`, `isi`, `tanggal`, `tanggal_update`) VALUES
(6, '60a405b0e12dd', 'Testing Artikel', 'Zoom,Aye Shabira,Pendidikan', '60a405b0e12e5.jpg', '<h3 style=\"margin: 15px 0px; padding: 0px; font-weight: 700; font-size: 14px; font-family: &quot;Open Sans&quot;, Arial, sans-serif;\">The standard Lorem Ipsum passage, used since the 1500s</h3><p style=\"margin-right: 0px; margin-bottom: 15px; margin-left: 0px; padding: 0px; text-align: justify; font-family: &quot;Open Sans&quot;, Arial, sans-serif; font-size: 14px;\">\"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\"</p><h3 style=\"margin: 15px 0px; padding: 0px; font-weight: 700; font-size: 14px; font-family: &quot;Open Sans&quot;, Arial, sans-serif;\">Section 1.10.32 of \"de Finibus Bonorum et Malorum\", written by Cicero in 45 BC</h3><p style=\"margin-right: 0px; margin-bottom: 15px; margin-left: 0px; padding: 0px; text-align: justify; font-family: &quot;Open Sans&quot;, Arial, sans-serif; font-size: 14px;\">\"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?\"</p><h3 style=\"margin: 15px 0px; padding: 0px; font-weight: 700; font-size: 14px; font-family: &quot;Open Sans&quot;, Arial, sans-serif;\">1914 translation by H. Rackham</h3><p style=\"margin-right: 0px; margin-bottom: 15px; margin-left: 0px; padding: 0px; text-align: justify; font-family: &quot;Open Sans&quot;, Arial, sans-serif; font-size: 14px;\">\"But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?\"</p><h3 style=\"margin: 15px 0px; padding: 0px; font-weight: 700; font-size: 14px; font-family: &quot;Open Sans&quot;, Arial, sans-serif;\">Section 1.10.33 of \"de Finibus Bonorum et Malorum\", written by Cicero in 45 BC</h3><p style=\"margin-right: 0px; margin-bottom: 15px; margin-left: 0px; padding: 0px; text-align: justify; font-family: &quot;Open Sans&quot;, Arial, sans-serif; font-size: 14px;\">\"At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.\"</p><h3 style=\"margin: 15px 0px; padding: 0px; font-weight: 700; font-size: 14px; font-family: &quot;Open Sans&quot;, Arial, sans-serif;\">1914 translation by H. Rackham</h3><p style=\"margin-right: 0px; margin-bottom: 15px; margin-left: 0px; padding: 0px; text-align: justify; font-family: &quot;Open Sans&quot;, Arial, sans-serif; font-size: 14px;\">\"On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains.\"</p>', '18-05-2021 06:21:36 PM', '18-05-2021 06:21:36 PM');

-- --------------------------------------------------------

--
-- Table structure for table `data_zoom_siswa`
--

CREATE TABLE `data_zoom_siswa` (
  `id` int NOT NULL,
  `id_zoom_siswa` varchar(70) COLLATE utf8mb4_unicode_ci NOT NULL,
  `id_zoom` varchar(70) COLLATE utf8mb4_unicode_ci NOT NULL,
  `id_siswa` varchar(70) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` varchar(70) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tanggal` varchar(70) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tanggal_update` varchar(70) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `guru`
--

CREATE TABLE `guru` (
  `id` int NOT NULL,
  `id_gurus` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `id_guru` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nama_guru` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `no_wa` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `dir_image` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tanggal` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `tanggal_update` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `guru`
--

INSERT INTO `guru` (`id`, `id_gurus`, `id_guru`, `nama_guru`, `email`, `password`, `no_wa`, `dir_image`, `tanggal`, `tanggal_update`) VALUES
(2, 'lWF_vZb6L', 'digyguru003', 'Aye Shabira', 'aye@aye.com', '$2b$10$lyJ9WS7ggjXgGTalS15.rejvIz5MDH0B1EUNHyDrWIVXkxCrRIqgG', '099989877678', '', '2021-05-26 10:21:47.947', '2021-05-26 10:21:47.947'),
(4, 'T9VU9-xBe', 'digyguru005', 'Rizki Fauzi', 'mypcfauzi2@gmail.com', '$2b$10$nH1ThSsI69OFNyLp7LPNnOsG/jc2uQwo.f0.aAt00qOWtstJlFgfq', '23123123', '', '2021-05-26 20:34:36.900', '2021-05-26 20:34:36.900');

-- --------------------------------------------------------

--
-- Table structure for table `jadwal_zoom`
--

CREATE TABLE `jadwal_zoom` (
  `id` int NOT NULL,
  `id_zoom` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `id_guru` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `nama_guru` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `kelas` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `mapel` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `judul_pertemuan` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `tanggal_pertemuan` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `thumbnail` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `materi` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` int NOT NULL,
  `tanggal` varchar(70) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `tanggal_update` varchar(70) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `jadwal_zoom`
--

INSERT INTO `jadwal_zoom` (`id`, `id_zoom`, `id_guru`, `nama_guru`, `kelas`, `mapel`, `judul_pertemuan`, `tanggal_pertemuan`, `thumbnail`, `materi`, `status`, `tanggal`, `tanggal_update`) VALUES
(10, 'izd0m7L7N', 'T9VU9-xBe', 'Rizki Fauzi', 'SMP 1', 'PKN', 'dawd', '06/03/2021 9:35 PM', 'beneatheredress_187174548_1145869139212678_2052110651647488495_n.jpg', '34119172.pdf', 3, '2021-06-02 21:44:32.093', '2021-06-02 21:44:32.093'),
(12, 'cZTe295_S', 'T9VU9-xBe', 'Rizki Fauzi', 'SMP 1', 'IPS', 'Coba', '06/04/2021 9:42 AM', 'beneatheredress_187174548_1145869139212678_2052110651647488495_n.jpg', 'Invoice-2981879.pdf', 3, '2021-06-03 01:43:12.733', '2021-06-03 01:43:12.733');

-- --------------------------------------------------------

--
-- Table structure for table `kelas_guru`
--

CREATE TABLE `kelas_guru` (
  `id` int NOT NULL,
  `id_guru` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `jenjang` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `kelas` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `tanggal` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `tanggal_update` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `kelas_guru`
--

INSERT INTO `kelas_guru` (`id`, `id_guru`, `jenjang`, `kelas`, `tanggal`, `tanggal_update`) VALUES
(1, 'T9VU9-xBe', 'SMP', '1', '2021-05-26 20:34:36.900', '2021-05-26 20:34:36.900'),
(2, 'T9VU9-xBe', 'SD', '1', '2021-05-26 20:34:36.900', '2021-05-26 20:34:36.900');

-- --------------------------------------------------------

--
-- Table structure for table `mapel`
--

CREATE TABLE `mapel` (
  `id` int NOT NULL,
  `id_guru` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `mapel` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `tanggal` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `tanggal_update` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `mapel`
--

INSERT INTO `mapel` (`id`, `id_guru`, `mapel`, `tanggal`, `tanggal_update`) VALUES
(8, 'T9VU9-xBe', 'IPS', '2021-05-26 20:34:36.900', '2021-05-26 20:34:36.900'),
(9, 'T9VU9-xBe', 'PKN', '2021-05-26 20:34:36.900', '2021-05-26 20:34:36.900');

-- --------------------------------------------------------

--
-- Table structure for table `siswa`
--

CREATE TABLE `siswa` (
  `id` int NOT NULL,
  `id_sis` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `nama` varchar(80) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(80) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `id_siswa` varchar(80) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `no_wa` varchar(80) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `jenjang` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `kelas` varchar(80) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `paket` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `dir_image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tanggal` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `tanggal_update` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `siswa`
--

INSERT INTO `siswa` (`id`, `id_sis`, `nama`, `email`, `password`, `id_siswa`, `no_wa`, `jenjang`, `kelas`, `paket`, `dir_image`, `tanggal`, `tanggal_update`) VALUES
(19, 'VuKfj8o-1', 'Aye Shabira', 'mypcfauzi2@gmail.com', '$2b$10$Cb59ZELNAnqq1VCamH.CWOxLyKZpovqzexF25IoJhg//JdE3uHgVG', 'digy020', '09090987', 'SMP', '1', 'VC 1', 'default.jpg', '2021-06-05 21:19:01.579', '2021-06-05 21:19:01.579');

-- --------------------------------------------------------

--
-- Table structure for table `tmp_zoom_in`
--

CREATE TABLE `tmp_zoom_in` (
  `id` int NOT NULL,
  `id_zoom_in` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL,
  `id_zoom` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL,
  `id_user` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `detail` varchar(70) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tanggal` varchar(80) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tanggal_update` varchar(80) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `zoom_meetings`
--

CREATE TABLE `zoom_meetings` (
  `id` int NOT NULL,
  `id_zoom_meeting` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `id_zoom` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `id_guru` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `start_url` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `join_url` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `id_meeting` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tanggal` varchar(80) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tanggal_update` varchar(80) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `zoom_meetings`
--

INSERT INTO `zoom_meetings` (`id`, `id_zoom_meeting`, `id_zoom`, `id_guru`, `start_url`, `join_url`, `id_meeting`, `password`, `tanggal`, `tanggal_update`) VALUES
(3, 'ESyHbSE1Zg', 'izd0m7L7N', 'T9VU9-xBe', 'https://us04web.zoom.us/s/75055877981?zak=eyJ6bV9za20iOiJ6bV9vMm0iLCJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJjbGllbnRzbSIsInVpZCI6InlOYU9xN0QzU0Qtc01aelI4Zl9yQWciLCJpc3MiOiJ3ZWIiLCJzdHkiOjEsIndjZCI6InVzMDQiLCJjbHQiOjAsInN0ayI6Ijh1c0xOVFo3S29kYWpSR1BfSzhheDZ4bkwzOFVpUWtSQTFVZDNIcUs2ZDQuQUcuYU9yWi1zbmxwcG1lVV8yLWhXc3hJQWo5Mk8yRUpRS2pzV3FCNnV0VE5VSmxrYU9EdHBGSUZSZ1JPY3o2U25ITWMyWUxEMVo3QzN0WXEyX3kudE5pd2Q5TlUwcFFLeENYVHI3OHo0QS5CNjBMM0JOQzVfRUt5RGZNIiwiZXhwIjoxNjIyNjUyMjczLCJpYXQiOjE2MjI2NDUwNzMsImFpZCI6IktCelIwNmhtUlVxaWlnWXR3YVYzbXciLCJjaWQiOiIifQ.T0QFWIPpgaMeND0DHbrbic4BdW3p7c2OE3Uqz5LsSwA', 'https://us04web.zoom.us/j/75055877981?pwd=NUE1SFIwSGNYWDRsM2djY2ZCWlRvUT09', '75055877981', 'RpXth0', '2021-06-02 21:44:32.093', '2021-06-02 21:44:32.093'),
(5, 'XCbU6wdJ_N', 'cZTe295_S', 'T9VU9-xBe', 'https://us04web.zoom.us/s/78554017963?zak=eyJ6bV9za20iOiJ6bV9vMm0iLCJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJjbGllbnRzbSIsInVpZCI6InlOYU9xN0QzU0Qtc01aelI4Zl9yQWciLCJpc3MiOiJ3ZWIiLCJzdHkiOjEsIndjZCI6InVzMDQiLCJjbHQiOjAsInN0ayI6IjlKbmM5M0ZKbVp6eGJjZ0JXRDl6eTEwazN4QWZWTWVtdnF6NzczR0ZCNzQuQUcueGhubnhveTlXNGVVb1pNTFNYWTRaRkZQQVAyZlhKdFgxYjAtWWFvOFVPNGRSMFdiQk16NjY2bVpyUkw2dmtnRC1TSjBBMUxnYXQ3WFZPeUIuQjhZeXBmaFR5RVpuYzhBNlk0b1lJZy56Qkk1XzBja3Nfdm1kQzl3IiwiZXhwIjoxNjIyNjY2NTk0LCJpYXQiOjE2MjI2NTkzOTQsImFpZCI6IktCelIwNmhtUlVxaWlnWXR3YVYzbXciLCJjaWQiOiIifQ.IEMsO1DDtR-yog47_8h4fv0MURicio7QXcccYlbmPDI', 'https://us04web.zoom.us/j/78554017963?pwd=NjB6TWpqNmNtYmtkSEU4RE44VjNBdz09', '78554017963', 'CzBW9C', '2021-06-03 01:43:12.733', '2021-06-03 01:43:12.733');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `article`
--
ALTER TABLE `article`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `data_zoom_siswa`
--
ALTER TABLE `data_zoom_siswa`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `guru`
--
ALTER TABLE `guru`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `jadwal_zoom`
--
ALTER TABLE `jadwal_zoom`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `kelas_guru`
--
ALTER TABLE `kelas_guru`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `mapel`
--
ALTER TABLE `mapel`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `siswa`
--
ALTER TABLE `siswa`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tmp_zoom_in`
--
ALTER TABLE `tmp_zoom_in`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `zoom_meetings`
--
ALTER TABLE `zoom_meetings`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `article`
--
ALTER TABLE `article`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `data_zoom_siswa`
--
ALTER TABLE `data_zoom_siswa`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `guru`
--
ALTER TABLE `guru`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `jadwal_zoom`
--
ALTER TABLE `jadwal_zoom`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `kelas_guru`
--
ALTER TABLE `kelas_guru`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `mapel`
--
ALTER TABLE `mapel`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `siswa`
--
ALTER TABLE `siswa`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `tmp_zoom_in`
--
ALTER TABLE `tmp_zoom_in`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `zoom_meetings`
--
ALTER TABLE `zoom_meetings`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
