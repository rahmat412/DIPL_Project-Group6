-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 05, 2021 at 01:24 PM
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
  `placeID` varchar(11) NOT NULL,
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

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`adminID`, `adminEmail`, `adminPassword`, `adminName`, `adminPhone`) VALUES
('arg07070707', 'achmadrg@gmail.com', '13131313', 'achmadrg', '08666555444'),
('hekw0606060', 'hafizh@gmail.com', '10101010', 'hafizh', '081010101010'),
('inc08080808', 'arnol@gmail.com', '14141414', 'arnol', '08999888777'),
('mat04122000', 'rahmat@gmail.com', '12121212', 'rahmat', '08113909822');

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

--
-- Dumping data for table `client`
--

INSERT INTO `client` (`clientID`, `clientEmail`, `clientName`, `clientPassword`, `clientPhone`) VALUES
('wtws271578r', 'joko@gmail.com', 'joko', 'jokoprak', '082233445566');

-- --------------------------------------------------------

--
-- Table structure for table `facility`
--

CREATE TABLE `facility` (
  `facilityID` varchar(11) NOT NULL,
  `placeID` varchar(11) NOT NULL,
  `facilityName` varchar(50) NOT NULL,
  `facilityType` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `order`
--

CREATE TABLE `order` (
  `orderID` varchar(11) NOT NULL,
  `placeID` varchar(11) NOT NULL,
  `clientID` varchar(11) NOT NULL,
  `orderDate` date NOT NULL,
  `orderCheckIn` date NOT NULL,
  `orderCheckOut` date NOT NULL,
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
  `ownerPhone` varchar(12) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `owner`
--

INSERT INTO `owner` (`ownerID`, `ownerEmail`, `ownerName`, `ownerPassword`, `ownerPhone`) VALUES
('5584hmziauf', 'budi@gmail.com', 'budi', 'budiman', '0822334455');

-- --------------------------------------------------------

--
-- Table structure for table `place`
--

CREATE TABLE `place` (
  `placeID` varchar(11) NOT NULL,
  `ownerID` varchar(11) NOT NULL,
  `placeName` varchar(200) NOT NULL,
  `placePrice` int(11) NOT NULL,
  `placeCategory` varchar(100) NOT NULL,
  `placeStatus` varchar(20) NOT NULL
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
  ADD PRIMARY KEY (`facilityID`),
  ADD KEY `fk_place_facility` (`placeID`);

--
-- Indexes for table `order`
--
ALTER TABLE `order`
  ADD PRIMARY KEY (`orderID`),
  ADD KEY `FK_client_order` (`clientID`),
  ADD KEY `FK_place_order` (`placeID`);

--
-- Indexes for table `owner`
--
ALTER TABLE `owner`
  ADD PRIMARY KEY (`ownerID`);

--
-- Indexes for table `place`
--
ALTER TABLE `place`
  ADD PRIMARY KEY (`placeID`),
  ADD KEY `FK_owner_place` (`ownerID`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `facility`
--
ALTER TABLE `facility`
  ADD CONSTRAINT `fk_place_facility` FOREIGN KEY (`placeID`) REFERENCES `place` (`placeID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `order`
--
ALTER TABLE `order`
  ADD CONSTRAINT `FK_client_order` FOREIGN KEY (`clientID`) REFERENCES `client` (`clientID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_place_order` FOREIGN KEY (`placeID`) REFERENCES `place` (`placeID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `place`
--
ALTER TABLE `place`
  ADD CONSTRAINT `FK_owner_place` FOREIGN KEY (`ownerID`) REFERENCES `address` (`addressID`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
