-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 22, 2020 at 09:17 PM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.4.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `christophersdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `menuitems`
--

CREATE TABLE `menuitems` (
  `name` varchar(255) DEFAULT NULL,
  `properties` varchar(1000) DEFAULT NULL,
  `category` varchar(50) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `cost` varchar(20) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `subcategory` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `menuitems`
--

INSERT INTO `menuitems` (`name`, `properties`, `category`, `description`, `cost`, `image`, `subcategory`) VALUES
('Steak', 'Steak Sauce,Side Salad Dressing,', 'Dinner', 'An excellent meal!', '19.99', '5e470b3665b554.32533391.jpg', 'After 5 Menu'),
('Salmon', 'Side Salad Dressing,Sides,', 'Dinner', 'A great meal!', '11.99', '5e4ab68991ff56.23897576.jpeg', 'Seafood'),
('Burger', 'Condiments,', 'Dinner', 'A good food!', '5.99', '5e4b4563eab4d6.38675668.jpeg', 'Sandwiches');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `firstname` varchar(50) DEFAULT NULL,
  `lastname` varchar(50) DEFAULT NULL,
  `email` varchar(200) DEFAULT NULL,
  `subtotal` varchar(30) DEFAULT NULL,
  `bag` longtext DEFAULT NULL,
  `timesent` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`firstname`, `lastname`, `email`, `subtotal`, `bag`, `timesent`) VALUES
('Benjamin', 'Davis', 'bmdavis419@protonmail.com', '22.99', 'Steak,22.99,5e470b3665b554.32533391.jpg,Steak Sauce: Yes,Side Salad Dressing: Ceasar,', '03:07'),
('Ben', 'D', 'bmdavis@gmail.com', '36.18', 'Steak,22.19,5e470b3665b554.32533391.jpg,Steak Sauce: No,Side Salad Dressing: Blue Cheese,Side Salad Dressing: Cheddar,,Salmon,13.99,5e4ab68991ff56.23897576.jpeg,Side Salad Dressing: Blue Cheese,Sides: Corn,', '03:08'),
('Benjamin', 'Davis', 'bmdavis419@protonmail.com', '14.99', 'Salmon,14.99,5e4ab68991ff56.23897576.jpeg,Side Salad Dressing: Ceasar,Sides: Corn,', '03:11');

-- --------------------------------------------------------

--
-- Table structure for table `properties`
--

CREATE TABLE `properties` (
  `name` varchar(255) DEFAULT NULL,
  `descriptions` varchar(1000) DEFAULT NULL,
  `selectOnlyOne` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `properties`
--

INSERT INTO `properties` (`name`, `descriptions`, `selectOnlyOne`) VALUES
('Steak Sauce', 'Yes|1.00,No|0.00,', '1'),
('Side Salad Dressing', 'Ceasar|2.00,Blue Cheese|1.00,Cheddar|1.20,', '0'),
('Sides', 'Corn|1.00,', '0'),
('Condiments', 'Ketchup|1.00,Mustard|1.00,Relish|1.00,', '1');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
