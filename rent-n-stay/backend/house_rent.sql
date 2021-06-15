-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 13, 2021 at 07:43 AM
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
  `addressRegency` varchar(50) NOT NULL,
  `addressPostcode` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `address`
--

INSERT INTO `address` (`addressID`, `placeID`, `addressStreet`, `addressDistrict`, `addressRegency`, `addressPostcode`) VALUES
('0ixsrptdmas', '5584hmziaug', 'Jl. Komplek PBB', 'Cikoneng', 'Dayeuhkolot', '40257'),
('9wut24j4w24', '2ctgjam41b7', 'Jl. Umaya', 'Sukabirus', 'Dayeuhkolot', '40256');

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

--
-- Dumping data for table `facility`
--

INSERT INTO `facility` (`facilityID`, `placeID`, `facilityName`, `facilityType`) VALUES
('siq7w69crg', '5584hmziaug', 'Bed', 'Room Facility');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `orderID` varchar(11) NOT NULL,
  `placeID` varchar(11) NOT NULL,
  `clientID` varchar(11) NOT NULL,
  `orderDate` date NOT NULL,
  `orderCheckIn` date NOT NULL,
  `orderCheckOut` date NOT NULL,
  `orderStatus` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`orderID`, `placeID`, `clientID`, `orderDate`, `orderCheckIn`, `orderCheckOut`, `orderStatus`) VALUES
('pftr6b0wqm', '5584hmziaug', 'wtws271578r', '0000-00-00', '2021-05-20', '2021-05-27', 'In Progress');

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
('5584hmziauf', 'budi@gmail.com', 'budi', 'budiman', '0822334455'),
('cfpw8rqnwav', 'jaka@gmail.com', 'jaka', 'jakarta', '0832432123');

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
  `placeImage` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `place`
--

INSERT INTO `place` (`placeID`, `ownerID`, `placeName`, `placePrice`, `placeCategory`, `placeImage`) VALUES
('2ctgjam41b7', 'cfpw8rqnwav', '7 Days', 2000000, 'Apartment', '1b70f1dcd6a41b7502aaa9dba9f431a5'),
('5584hmziaug', '5584hmziauf', 'Kontrakan PBB H14', 1000000, 'Boarding House', 'f2007af8779f3415178dbb968a582023');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `address`
--
ALTER TABLE `address`
  ADD PRIMARY KEY (`addressID`),
  ADD KEY `fk_address_place` (`placeID`);

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
-- Indexes for table `orders`
--
ALTER TABLE `orders`
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
-- Constraints for table `address`
--
ALTER TABLE `address`
  ADD CONSTRAINT `fk_address_place` FOREIGN KEY (`placeID`) REFERENCES `place` (`placeID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `facility`
--
ALTER TABLE `facility`
  ADD CONSTRAINT `fk_place_facility` FOREIGN KEY (`placeID`) REFERENCES `place` (`placeID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `FK_client_order` FOREIGN KEY (`clientID`) REFERENCES `client` (`clientID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_place_order` FOREIGN KEY (`placeID`) REFERENCES `place` (`placeID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `place`
--
ALTER TABLE `place`
  ADD CONSTRAINT `FK_owner_place` FOREIGN KEY (`ownerID`) REFERENCES `owner` (`ownerID`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
