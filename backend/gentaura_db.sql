-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 01, 2026 at 01:42 PM
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
-- Database: `gentaura_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `customer_name` varchar(255) NOT NULL,
  `customer_email` varchar(255) NOT NULL,
  `total_amount` decimal(10,2) NOT NULL,
  `cart_items` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`cart_items`)),
  `order_date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `category` varchar(100) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `description` text DEFAULT NULL,
  `images` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`images`)),
  `sizes` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`sizes`)),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `category`, `price`, `description`, `images`, `sizes`, `created_at`) VALUES
(4, 'Charcoal Wool Tailored Suit', 'Suits', 4500.00, 'A masterpiece of modern tailoring. Crafted from 100% Italian virgin wool, this slim-fit suit features a notched lapel and natural shoulder construction.', '[\"/images/suit1-img1.webp\", \"/images/suit1-img2.webp\", \"/images/suit1-img3.webp\"]', '[\"48\", \"50\", \"52\", \"54\", \"56\"]', '2026-03-28 12:19:33'),
(5, 'Egyptian Cotton White Shirt', 'Shirts', 950.00, 'The foundation of every formal wardrobe. Made from ultra-breathable Giza cotton with a crisp spread collar and double cuffs.', '[\"/images/shirt1-img1.webp\", \"/images/shirt1-img2.webp\"]', '[\"S\", \"M\", \"L\", \"XL\", \"XXL\"]', '2026-03-28 12:19:33'),
(6, 'Brown Leather Oxford Shoes', 'Shoes', 2200.00, 'Hand-burnished genuine calfskin leather. Features a durable Goodyear-welted sole and a sleek silhouette for the perfect formal finish.', '[\"/images/shoes1-img1.webp\", \"/images/shoes1-img2.webp\", \"/images/shoes1-img3.webp\", \"/images/shoes1-img4.webp\"]', '[\"41\", \"42\", \"43\", \"44\", \"45\"]', '2026-03-28 12:19:33'),
(7, 'Midnight Navy Tuxedo', 'Suits', 6800.00, 'Designed for the most prestigious events. Featuring silk-satin peak lapels and a tailored fit that commands presence.', '[\"/images/suit2-img1.jpg\", \"/images/suit2-img2.jpg\", \"/images/suit2-img3.jpg\"]', '[\"48\", \"50\", \"52\", \"54\"]', '2026-03-28 12:19:33'),
(8, 'Midnight Silk Paisley Tie', 'Accessories', 450.00, 'Hand-finished navy silk tie with a subtle paisley weave. Adds a touch of personality to your formal ensemble.', '[\"/images/tie1-img1.webp\", \"/images/tie1-img2.webp\"]', '[\"One Size\"]', '2026-03-28 12:19:33'),
(9, 'Leather Document Briefcase', 'Bags', 3200.00, 'Crafted from premium full-grain leather with brass hardware. Includes a padded compartment for a 15-inch laptop.', '[\"/images/bag1-img1.webp\", \"/images/bag1-img2.webp\"]', '[\"One Size\"]', '2026-03-28 12:19:33'),
(10, 'Sky Blue Herringbone Shirt', 'Shirts', 850.00, 'A sophisticated texture for the modern office. Soft-touch Egyptian cotton with a subtle herringbone pattern.', '[\"/images/shirt2-img1.webp\"]', '[\"S\", \"M\", \"L\", \"XL\"]', '2026-03-28 12:19:33'),
(11, 'Gold-Tone Classic Chronograph', 'Accessories', 5500.00, 'A timeless timepiece featuring a sapphire crystal face and a genuine leather strap. Water-resistant up to 50 meters.', '[\"/images/watch1-img1.avif\", \"/images/watch1-img2.avif\", \"/images/watch1-img3.avif\"]', '[\"One Size\"]', '2026-03-28 12:19:33'),
(12, 'Black Pebbled Leather Belt', 'Accessories', 600.00, 'Minimalist design with a brushed brass buckle. The perfect companion for tailored trousers.', '[\"/images/belt1-img1.avif\", \"/images/belt1-img2.avif\", \"/images/belt1-img3.avif\"]', '[\"90\", \"95\", \"100\", \"105\"]', '2026-03-28 12:19:33'),
(13, 'Camel Hair Overcoat', 'Outerwear', 7500.00, 'The ultimate winter luxury. A heavy-weight blend of wool and cashmere, designed to be worn over your finest suits.', '[\"/images/coat1-img1.webp\", \"/images/coat1-img2.webp\", \"/images/coat1-img3.jpg\", \"/images/coat1-img4.jpg\"]', '[\"M\", \"L\", \"XL\"]', '2026-03-28 12:19:33');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
