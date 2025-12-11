-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 11, 2025 at 03:06 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `trozo_security`
--

-- --------------------------------------------------------

--
-- Table structure for table `attempt`
--

CREATE TABLE `attempt` (
  `id` int(250) NOT NULL,
  `ip` varchar(250) NOT NULL,
  `login_time` bigint(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `attempt`
--

INSERT INTO `attempt` (`id`, `ip`, `login_time`) VALUES
(511, '127.0.0.1', 1702652371),
(512, '127.0.0.1', 1702652372),
(513, '127.0.0.1', 1702652374);

-- --------------------------------------------------------

--
-- Table structure for table `infos`
--

CREATE TABLE `infos` (
  `id` int(20) NOT NULL,
  `idnumber` varchar(15) NOT NULL,
  `firstname` varchar(250) NOT NULL,
  `lastname` varchar(250) NOT NULL,
  `middlename` varchar(250) DEFAULT NULL,
  `suffix` varchar(250) DEFAULT NULL,
  `sex` varchar(250) NOT NULL,
  `age` varchar(255) NOT NULL,
  `birth` date NOT NULL,
  `email` varchar(250) NOT NULL,
  `username` varchar(25) NOT NULL,
  `passw` varchar(250) NOT NULL,
  `street` varchar(250) NOT NULL,
  `barangay` varchar(250) NOT NULL,
  `municipality` varchar(250) NOT NULL,
  `province` varchar(250) NOT NULL,
  `postal` varchar(250) NOT NULL,
  `country` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `infos`
--

INSERT INTO `infos` (`id`, `idnumber`, `firstname`, `lastname`, `middlename`, `suffix`, `sex`, `age`, `birth`, `email`, `username`, `passw`, `street`, `barangay`, `municipality`, `province`, `postal`, `country`) VALUES
(310, '2022-1010', 'Benjie Pamat Tr', 'Trozo', 'P', 'jr. ', 'Male', '23', '2001-11-09', 'trozobenjie@gmail.com', 'benz', '$2y$10$ru.FREVKrY1fDhsB4ddVjO3jCgx7zaY0T4brCVe5FhVsjghixDUqm', 'Purok 2', 'Poblacion', 'Alegria', 'Surigao Del Norte', '8425', 'Philippines'),
(311, '2022-1011', 'Bbbbbbbbbbbbbbb', 'Trozo', 'P', '', 'Male', '23', '2001-11-09', 'benjie@gmail.com', 'robert', '$2y$10$YQIFML0Hg1XLKRafpYEbgeNeqK0TyeGmhVhLAaxSb.f4//Du3hIZa', 'Purok 2', 'Poblacion', 'Alegria', 'Surigao Del Norte', '8425', 'Philippines'),
(314, '2022-1013', 'Benjie', 'Trozo', 'P', 'Jr.', 'Male', '23', '2001-11-09', 'benjie.trozo@csucc.edu.ph', 'benz22', '$2y$10$XUv0GLC8QEVXTEw0mxzeZ.8Gyaa1xQG4JfCi3.liwqWMmTq4IK8P6', 'Purok-2', 'Poblacion', 'Alegria', 'Surigao Del Norte', '8425', 'Philippines'),
(315, '2022-1012', 'Benjie', 'Trozo', 'P', 'Jr.', 'Male', '24', '2001-11-09', 'benz@gmail.com', 'benjie', '$2y$10$Mg7PpwKAy0akzL3BpjHyBOFLP8MQSvFXiQgAYNBtLodHD/gA0d.Zi', 'Sampaguita', 'Poblacion', 'Alegria', 'Surigao del Norte', '8425', 'philippines');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `attempt`
--
ALTER TABLE `attempt`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `infos`
--
ALTER TABLE `infos`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `idnumber` (`idnumber`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `attempt`
--
ALTER TABLE `attempt`
  MODIFY `id` int(250) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1525;

--
-- AUTO_INCREMENT for table `infos`
--
ALTER TABLE `infos`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=316;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
