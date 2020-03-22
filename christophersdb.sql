-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 22, 2020 at 08:06 PM
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
-- Table structure for table `cateringitems`
--

CREATE TABLE `cateringitems` (
  `name` varchar(200) DEFAULT NULL,
  `category` varchar(30) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `price` varchar(255) DEFAULT NULL,
  `subcategory` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `cateringitems`
--

INSERT INTO `cateringitems` (`name`, `category`, `description`, `price`, `subcategory`) VALUES
('FIRST ITEM', 'Hors', 'asdf', '$REEE', 'Hot Hors Doeuvres'),
('Second item', 'Entrees', 'FFXA AASDF EESA DF', '$a lareg ', 'Pasta/Vegetarian'),
('THIRD ITEM', 'Breakfast', 'FOR', 'assdfsadf', 'A la Carte'),
('Sandwich Box', 'Boxed', 'Choose from all natural turkey, ham or roast beef with provolone, cheddar or Swiss cheese. Or try our popular veggie sandwich (cream cheese, cucumbers, sprouts and tomato).', '$8.50 half sandwich / $10.95 whole sandwich', 'Specialty Sandwiches'),
('Spinach Salad with Hot Bacon Dressing', 'Sides', 'Tender fresh baby spinach, sliced eggs, purple onions and bacon bits.', '$3.50', 'Side Salads'),
('Hot Dogs & Hamburgers', 'Picnic Time', 'With Cole Slaw, and Potato Salad.', '$8.95 per person (100 or more) $9.50 per person (50-100).', ''),
('Homemade Carrot Cake Squares', 'Desserts', 'Best in town!', '$2.50', 'Perfect Endings');

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
('Taco', 'Sides,Taco Sauce,', 'Lunch', 'A very good food, has Spaniard origin. Comes in many flavors, a great meal.', '9.99', '5e527ea0d06a12.23396318.jpg', 'All Day Meals'),
('Christopher’s New York Strip', 'Steak Sauce,Sides,', 'Dinner', 'Grilled to temp. 8 oz. New York strip, with house-made mashed potatoes.', '19.95', '5e528fa1748ca8.41236358.jpg', 'After 5 Menu'),
('Chicken Parmesan', 'Side Salad Dressing,Sides,', 'Dinner', 'A lightly breaded local Hill Family Farm breast of chicken with melted provolone cheese.', '13.95', '5e52903d521fd7.11120202.jpg', 'After 5 Menu'),
('Vegetable Strudel', 'Condiments,Sides,', 'Dinner', 'A blend of seasoned vegetables, wild rice blend and cheeses.', '13.95', '5e529091bb87a8.45211861.jpg', 'After 5 Menu'),
('Maple Mustard Glazed Porkchop', 'Condiments,Steak Sauce,', 'Dinner', 'Ohio-maple mustard glazed local KJB porkchops.', '15.95', '5e5291220886d4.43315930.jpg', 'After 5 Menu'),
('Stroganoff', 'Condiments,Sides,', 'Dinner', 'Homemade stroganoff sauce cooked with fresh portabellas, shallots, and a pinch of tarragon.', '13.95', '5e529163198038.40767693.jpg', 'After 5 Menu'),
('Fish and Chips', 'Sides,', 'Dinner', 'Fresh cod, beer battered and served with fries and coleslaw.', '8.95', '5e5291f85482c4.99397342.jpg', 'Seafood'),
('Barn Buster', 'Sides,', 'Breakfast', 'Three eggs cooked to order with a breakfast meat, home fries or fruit, toast, and one pancake.', '8.95', '5e5293ad919d69.00838965.jpg', 'Classic Breakfasts'),
('Breakfast Burrito', 'Sides,', 'Breakfast', 'Eggs, sausage, mushrooms, peppers, onions, salsa, and cheddar cheese in a fresh tortilla wrap. ', '7.95', '5e5294ea2c7c70.16619326.jpg', 'Classic Breakfasts'),
('Tuna Melt', 'Sides,', 'Lunch', 'From the grill with tuna and melted cheddar.', '5.95', '5e5296152a2431.16363916.jpg', 'Sandwiches'),
('The Veggie Sandwich', 'Condiments,Sides,', 'Lunch', 'Cream cheese, tomato, cucumbers and sprouts.', '5.95', '5e52966f855a26.35492602.jpg', 'Sandwiches'),
('Carrot Cake', 'Condiments,Sides,', 'Dessert', 'Homemade carrot cake baked to perfection.', '9.95', '5e52970586e627.57137157.jpg', ''),
('Cheesecake', 'Condiments,Sides,', 'Dessert', 'Cheesecake, made with the highest quality ingredients.', '8.95', '5e5297787dda71.08201238.jpg', 'Classic Breakfasts'),
('Founders', 'Condiments,Sides,', 'Drinks', 'A high quality craft beer.', '5.95', '5e529801370123.29466384.jpg', 'Craft Beer'),
('Taco', 'Taco Sauce,', 'Lunch', 'This is a great food!', '9.99', '5e52af2d8ab6e1.04417096.jpg', 'Sandwiches');

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
  `timesent` varchar(100) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `date` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`firstname`, `lastname`, `email`, `subtotal`, `bag`, `timesent`, `phone`, `date`) VALUES
('Benjamin', 'Davis', 'bmdavis419@protonmail.com', '15.95', 'Chicken Parmesan,Dinner,15.95,5e52903d521fd7.11120202.jpg,Side Salad Dressing: Blue Cheese,Sides: Corn,|', '01:38', '9373041163', '2020-03-21');

-- --------------------------------------------------------

--
-- Table structure for table `permorders`
--

CREATE TABLE `permorders` (
  `firstname` varchar(100) DEFAULT NULL,
  `lastname` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `subtotal` varchar(30) DEFAULT NULL,
  `bag` longtext DEFAULT NULL,
  `timesent` varchar(30) DEFAULT NULL,
  `phone` varchar(30) DEFAULT NULL,
  `date` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `permorders`
--

INSERT INTO `permorders` (`firstname`, `lastname`, `email`, `subtotal`, `bag`, `timesent`, `phone`, `date`) VALUES
('Benjamin', 'Davis', 'bmdavis419@protonmail.com', '15.95', 'Chicken Parmesan,Dinner,15.95,5e52903d521fd7.11120202.jpg,Side Salad Dressing: Blue Cheese,Sides: Corn,|', '01:38', '9373041163', '2020-03-21');

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
('Side Salad Dressing', 'Caesar|2.00,Blue Cheese|1.00,Cheddar|1.20,', '0'),
('Sides', 'Corn|1.00,', '0'),
('Condiments', 'Ketchup|1.00,Mustard|1.00,Relish|1.00,', '1'),
('Taco Sauce', 'Ranch|1.00,Spicy|0.50,Dill|0.75,Salsa|0.70,', '1');

-- --------------------------------------------------------

--
-- Table structure for table `wait`
--

CREATE TABLE `wait` (
  `time` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `wait`
--

INSERT INTO `wait` (`time`) VALUES
('20 Minutes');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
