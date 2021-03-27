-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 27, 2021 at 06:58 PM
-- Server version: 10.4.11-MariaDB
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
-- Database: `house_rent`
--

-- --------------------------------------------------------

--
-- Table structure for table `address`
--

CREATE TABLE `address` (
  `addressID` varchar(11) NOT NULL,
  `addressStreet` varchar(50) NOT NULL,
  `addressDistrict` varchar(50) NOT NULL,
  `addressRegion` varchar(50) NOT NULL,
  `addressPostcode` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `adminID` varchar(11) NOT NULL,
  `adminEmail` varchar(200) NOT NULL,
  `adminPassword` varchar(200) NOT NULL,
  `adminName` varchar(200) NOT NULL,
  `adminPhone` varchar(12) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `client`
--

CREATE TABLE `client` (
  `clientID` varchar(11) NOT NULL,
  `clientEmail` varchar(200) NOT NULL,
  `clientName` varchar(200) NOT NULL,
  `clientPassword` varchar(200) NOT NULL,
  `clientPhone` varchar(12) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `facility`
--

CREATE TABLE `facility` (
  `facilityID` varchar(11) NOT NULL,
  `facilityName` varchar(50) NOT NULL,
  `facilityType` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `order`
--

CREATE TABLE `order` (
  `orderID` varchar(11) NOT NULL,
  `orderDate` date NOT NULL,
  `orderStayDate` date NOT NULL,
  `orderStatus` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `owner`
--

CREATE TABLE `owner` (
  `ownerID` varchar(11) NOT NULL,
  `ownerEmail` varchar(200) NOT NULL,
  `ownerName` varchar(200) NOT NULL,
  `ownerPassword` varchar(200) NOT NULL,
  `ownerPhone` varchar(12) NOT NULL,
  `placeID` varchar(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `place`
--

CREATE TABLE `place` (
  `placeID` varchar(11) NOT NULL,
  `orderID` varchar(11) NOT NULL,
  `addressID` varchar(11) NOT NULL,
  `facilityID` varchar(11) NOT NULL,
  `placeName` varchar(200) NOT NULL,
  `placeAddress` varchar(200) NOT NULL,
  `placePrice` int(11) NOT NULL,
  `placeSize` varchar(100) NOT NULL,
  `placeCategory` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `address`
--
ALTER TABLE `address`
  ADD PRIMARY KEY (`addressID`);

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`adminID`);

--
-- Indexes for table `client`
--
ALTER TABLE `client`
  ADD PRIMARY KEY (`clientID`);

--
-- Indexes for table `facility`
--
ALTER TABLE `facility`
  ADD PRIMARY KEY (`facilityID`);

--
-- Indexes for table `order`
--
ALTER TABLE `order`
  ADD PRIMARY KEY (`orderID`);

--
-- Indexes for table `owner`
--
ALTER TABLE `owner`
  ADD PRIMARY KEY (`ownerID`),
  ADD KEY `FK_place_owner` (`placeID`);

--
-- Indexes for table `place`
--
ALTER TABLE `place`
  ADD PRIMARY KEY (`placeID`),
  ADD KEY `FK_order_place` (`orderID`),
  ADD KEY `FK_address_place` (`addressID`),
  ADD KEY `FK_facility_place` (`facilityID`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `owner`
--
ALTER TABLE `owner`
  ADD CONSTRAINT `FK_place_owner` FOREIGN KEY (`placeID`) REFERENCES `place` (`placeID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `place`
--
ALTER TABLE `place`
  ADD CONSTRAINT `FK_address_place` FOREIGN KEY (`addressID`) REFERENCES `address` (`addressID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_facility_place` FOREIGN KEY (`facilityID`) REFERENCES `facility` (`facilityID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_order_place` FOREIGN KEY (`orderID`) REFERENCES `order` (`orderID`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
