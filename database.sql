-- phpMyAdmin SQL Dump
-- version 4.6.6
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Apr 15, 2017 at 05:43 PM
-- Server version: 5.6.35
-- PHP Version: 5.6.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `adver_main`
--

DELIMITER $$
--
-- Functions
--
CREATE DEFINER=`adver`@`localhost` FUNCTION `RemoveDots` (`email` VARCHAR(100)) RETURNS VARCHAR(100) CHARSET latin1 BEGIN
    DECLARE newEmail varchar(100);
    SET newEmail = concat (replace( substring_index( email, '@', 1 ) , '.', '' ) , '@', substring_index( email, '@', -1 ) ) ;
 
 RETURN (newEmail);
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `Ad`
--

CREATE TABLE `Ad` (
  `IdAd` int(11) NOT NULL,
  `UserIdAd` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `NameAd` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `UrlAd` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `IdentificatorAd` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `TimeAd` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `UtcTimeAd` int(11) NOT NULL,
  `AuthTokenAd` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `DeletedAd` varchar(5) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'no'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Admin`
--

CREATE TABLE `Admin` (
  `IdAdmin` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `EmailAdmin` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `NameAdmin` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `SurnameAdmin` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `PasswordHashCodeAdmin` varchar(250) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `HashAdmin` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `DeletedAdmin` varchar(5) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'none'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `Admin`
--

INSERT INTO `Admin` (`IdAdmin`, `EmailAdmin`, `NameAdmin`, `SurnameAdmin`, `PasswordHashCodeAdmin`, `HashAdmin`, `DeletedAdmin`) VALUES
('admin', 'theofficialadvertisements@gmail.com', 'Timur', 'Hamid', '52e925cb0118585f483e5de1c3f05e45f2faba64d3bf11b919c3203c71df9ac686674bd296ccd36228e595e406bdeaa27f12e93a7c3e073a720bf0e8194ab1ac', '384711ea1f601abff51b916ec0f82a4baf28afeac8c306adb763724967e33fdcd63faa759b5b4e07d61bfa6d9ffab2ff2ac7a3125e3185b687c1cb3b321d3b34', 'no');

-- --------------------------------------------------------

--
-- Table structure for table `AuthTokenAdmin`
--

CREATE TABLE `AuthTokenAdmin` (
  `HashAuthTokenAdmin` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `UserIdAuthTokenAdmin` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `IPAddressAuthTokenAdmin` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `TimeAuthTokenAdmin` int(11) NOT NULL,
  `LastActivityAuthTokenAdmin` int(11) NOT NULL,
  `ActiveAuthTokenAdmin` varchar(5) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'yes'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;


--
-- Table structure for table `AuthTokenUser`
--

CREATE TABLE `AuthTokenUser` (
  `HashAuthTokenUser` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `UserIdAuthTokenUser` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `IPAddressAuthTokenUser` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `TimeAuthTokenUser` int(11) NOT NULL,
  `LastActivityAuthTokenUser` int(11) NOT NULL,
  `ActiveAuthTokenUser` varchar(5) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'yes'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Table structure for table `ControlValue`
--

CREATE TABLE `ControlValue` (
  `IdControlValue` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `CharControlValue` text COLLATE utf8_unicode_ci,
  `IntControlValue` int(11) DEFAULT NULL,
  `DoubleControlValue` double DEFAULT NULL,
  `AuthTokenControlValue` varchar(250) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `ControlValue`
--

INSERT INTO `ControlValue` (`IdControlValue`, `CharControlValue`, `IntControlValue`, `DoubleControlValue`, `AuthTokenControlValue`) VALUES
('System availability status', 'available', NULL, NULL, '');

-- --------------------------------------------------------

--
-- Table structure for table `Earning`
--

CREATE TABLE `Earning` (
  `IdEarning` int(11) NOT NULL,
  `UserIdEarning` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `AmountEarning` double NOT NULL,
  `TimeEarning` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `AuthTokenEarning` varchar(250) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Instructions`
--

CREATE TABLE `Instructions` (
  `IdInstructions` int(11) NOT NULL,
  `TitleInstructions` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `TextInstructions` text COLLATE utf8_unicode_ci NOT NULL,
  `AdminIdInstructions` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `TimeInstructions` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `TypeInstructions` varchar(10) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'text',
  `AuthTokenInstructions` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `DeletedInstructions` varchar(5) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'no'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Notification`
--

CREATE TABLE `Notification` (
  `IdNotification` int(11) NOT NULL,
  `AdminIdNotification` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `TitleNotification` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `TextNotification` text COLLATE utf8_unicode_ci NOT NULL,
  `AuthTokenNotification` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `DeletedNotification` varchar(5) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'no'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Notified`
--

CREATE TABLE `Notified` (
  `UserIdNotified` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `NotificationIdNotified` int(11) NOT NULL,
  `AuthTokenNotified` varchar(250) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Rating`
--

CREATE TABLE `Rating` (
  `IdRating` int(11) NOT NULL,
  `UserIdRating` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `GradeRating` int(5) NOT NULL,
  `TimeRating` int(11) NOT NULL,
  `AuthTokenRating` varchar(250) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Report`
--

CREATE TABLE `Report` (
  `IdReport` int(11) NOT NULL,
  `UserIdReport` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `CategoryReport` varchar(30) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'General support',
  `TitleReport` text COLLATE utf8_unicode_ci NOT NULL,
  `DescriptionReport` text COLLATE utf8_unicode_ci NOT NULL,
  `StatusReport` varchar(30) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'Open',
  `TimeReport` int(11) NOT NULL,
  `TimeMessageReport` int(11) NOT NULL,
  `AuthTokenReport` varchar(250) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Rules`
--

CREATE TABLE `Rules` (
  `IdRules` int(11) NOT NULL,
  `TitleRules` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `TextRules` text COLLATE utf8_unicode_ci NOT NULL,
  `AdminIdRules` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `TimeRules` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `AuthTokenRules` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `DeletedRules` varchar(5) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'no'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `SupportMessage`
--

CREATE TABLE `SupportMessage` (
  `IdSupportMessage` int(11) NOT NULL,
  `ReportIdSupportMessage` int(11) NOT NULL,
  `TextSupportMessage` text COLLATE utf8_unicode_ci NOT NULL,
  `TimeSupportMessage` int(11) NOT NULL,
  `SenderSupportMessage` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `AuthTokenSupportMessage` varchar(250) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `TopAd`
--

CREATE TABLE `TopAd` (
  `IdTopAd` int(11) NOT NULL,
  `UserIdTopAd` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `NameTopAd` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `AverageCPCTopAd` double NOT NULL DEFAULT '0',
  `MaxCPCTopAd` double NOT NULL DEFAULT '0',
  `TimeTopAd` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `AuthTokenTopAd` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `DeletedTopAd` varchar(5) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'no'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Usr`
--

CREATE TABLE `Usr` (
  `IdUser` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `EmailUser` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `NameUser` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `SurnameUser` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `CompanyUser` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `WhatsAppNumberUser` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `AddressUser` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `FacebookProfileUrlUser` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `CountryUser` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `ImageUrlUser` varchar(100) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'https://www.officialadvertisements.com/profiles/root.png',
  `DocumentImageUrlUser` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `PasswordHashCodeUser` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `HashUser` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `BalanceUser` double NOT NULL DEFAULT '0',
  `StatusUser` varchar(25) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'pending verification',
  `ApproveTokenUser` varchar(250) COLLATE utf8_unicode_ci DEFAULT NULL,
  `DeletedUser` varchar(5) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'no',
  `ReceiveNewslettersUser` varchar(5) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'yes',
  `ReceiveNewTicketUser` varchar(5) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'yes',
  `ReceiveTicketMessagesUser` varchar(5) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'yes',
  `ReceiveTicketUpdatesUser` varchar(5) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'yes'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Table structure for table `Website`
--

CREATE TABLE `Website` (
  `IdWebsite` int(11) NOT NULL,
  `UserIdWebsite` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `UrlWebsite` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `CTRWebsite` double NOT NULL DEFAULT '0',
  `ViewsWebsite` int(11) NOT NULL DEFAULT '0',
  `DayNumberWebsite` int(11) NOT NULL,
  `DateWebsite` varchar(11) COLLATE utf8_unicode_ci NOT NULL,
  `AuthTokenWebsite` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `DeletedWebsite` varchar(5) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'no'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Ad`
--
ALTER TABLE `Ad`
  ADD PRIMARY KEY (`IdAd`);

--
-- Indexes for table `Admin`
--
ALTER TABLE `Admin`
  ADD PRIMARY KEY (`IdAdmin`);

--
-- Indexes for table `ControlValue`
--
ALTER TABLE `ControlValue`
  ADD PRIMARY KEY (`IdControlValue`);

--
-- Indexes for table `Earning`
--
ALTER TABLE `Earning`
  ADD PRIMARY KEY (`IdEarning`);

--
-- Indexes for table `Instructions`
--
ALTER TABLE `Instructions`
  ADD PRIMARY KEY (`IdInstructions`);

--
-- Indexes for table `Notification`
--
ALTER TABLE `Notification`
  ADD PRIMARY KEY (`IdNotification`);

--
-- Indexes for table `Rating`
--
ALTER TABLE `Rating`
  ADD PRIMARY KEY (`IdRating`);

--
-- Indexes for table `Report`
--
ALTER TABLE `Report`
  ADD PRIMARY KEY (`IdReport`);

--
-- Indexes for table `Rules`
--
ALTER TABLE `Rules`
  ADD PRIMARY KEY (`IdRules`);

--
-- Indexes for table `SupportMessage`
--
ALTER TABLE `SupportMessage`
  ADD PRIMARY KEY (`IdSupportMessage`);

--
-- Indexes for table `TopAd`
--
ALTER TABLE `TopAd`
  ADD PRIMARY KEY (`IdTopAd`);

--
-- Indexes for table `Usr`
--
ALTER TABLE `Usr`
  ADD PRIMARY KEY (`IdUser`);

--
-- Indexes for table `Website`
--
ALTER TABLE `Website`
  ADD PRIMARY KEY (`IdWebsite`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Ad`
--
ALTER TABLE `Ad`
  MODIFY `IdAd` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `Earning`
--
ALTER TABLE `Earning`
  MODIFY `IdEarning` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `Instructions`
--
ALTER TABLE `Instructions`
  MODIFY `IdInstructions` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `Notification`
--
ALTER TABLE `Notification`
  MODIFY `IdNotification` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `Rating`
--
ALTER TABLE `Rating`
  MODIFY `IdRating` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `Report`
--
ALTER TABLE `Report`
  MODIFY `IdReport` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `Rules`
--
ALTER TABLE `Rules`
  MODIFY `IdRules` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `SupportMessage`
--
ALTER TABLE `SupportMessage`
  MODIFY `IdSupportMessage` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `TopAd`
--
ALTER TABLE `TopAd`
  MODIFY `IdTopAd` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `Website`
--
ALTER TABLE `Website`
  MODIFY `IdWebsite` int(11) NOT NULL AUTO_INCREMENT;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
