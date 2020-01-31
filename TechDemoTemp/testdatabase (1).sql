-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 29, 2020 at 01:27 AM
-- Server version: 10.4.10-MariaDB
-- PHP Version: 7.3.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `testdatabase`
--

-- --------------------------------------------------------
USE testdatabase;
--
-- Table structure for table `menuitems`
--

CREATE TABLE `menuitems` (
  `name` varchar(255) DEFAULT NULL,
  `properties` varchar(255) DEFAULT NULL,
  `catagory` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `cost` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `menuitems`
--

INSERT INTO `menuitems` (`name`, `properties`, `catagory`, `description`, `cost`, `image`) VALUES
('Steak', 'Drink Size,Side Salad Dressing,Bread,', 'Dinner', 'Good food.', '19.95', '5e308a233ff9d6.38809973.jpg'),
('Salmon', 'Drink Size,Side Salad Dressing,Bread,', 'Dinner', 'Excellent food.', '13.99', '5e308ad581f181.48432439.jpeg');

-- --------------------------------------------------------

--
-- Table structure for table `properties`
--

CREATE TABLE `properties` (
  `name` varchar(255) DEFAULT NULL,
  `descriptions` varchar(255) DEFAULT NULL,
  `minimum` varchar(255) DEFAULT NULL,
  `maximum` varchar(255) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `properties`
--

INSERT INTO `properties` (`name`, `descriptions`, `minimum`, `maximum`) VALUES
('Drink Size', 'Small|0.00,Medium|0.00,Large|0.00,', '1', '1'),
('Side Salad Dressing', 'Ceasar|2.00,Ranch|2.00,Blue Cheese|2.00,Italian|2.00,', '1', '2'),
('Bread', 'Rye|2.00,Wheat|5.00,', '1', '2'),
('asdf', 'asdf|asdf,', '0', '4');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
