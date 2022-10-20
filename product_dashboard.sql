-- phpMyAdmin SQL Dump
-- version 5.1.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Sep 22, 2022 at 08:03 AM
-- Server version: 8.0.28
-- PHP Version: 7.4.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `product_dashboard`
--

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `product_id` int NOT NULL,
  `quantity` int NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `user_id`, `product_id`, `quantity`, `created_at`, `updated_at`) VALUES
(1, 2, 1, 30, '2022-02-25 16:15:44', '2022-02-25 16:15:44'),
(2, 3, 3, 20, '2022-02-25 16:15:44', '2022-02-25 16:15:44'),
(3, 3, 1, 50, '2022-02-25 16:21:39', '2022-02-25 16:21:39'),
(4, 3, 3, 15, '2022-02-25 16:21:39', '2022-02-25 16:21:39');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` text NOT NULL,
  `price` float(8,2) NOT NULL,
  `quantity` int NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `user_id`, `name`, `description`, `price`, `quantity`, `created_at`, `updated_at`) VALUES
(1, 1, 'V88 Cap', 'Comfortable blue cap with v88', 100.00, 150, '2022-02-25 18:17:08', '2022-05-01 02:58:35'),
(2, 1, 'V88 T-shirt', 'Blue t-shirt with v88 logo', 300.00, 100, '2022-02-25 18:18:17', '2022-02-25 19:13:56'),
(3, 1, 'V88 Towel', 'Silky smooth body towel', 350.00, 200, '2022-02-25 18:18:50', '2022-02-25 19:13:28');

-- --------------------------------------------------------

--
-- Table structure for table `replies`
--

CREATE TABLE `replies` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `review_id` int NOT NULL,
  `content` text NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `replies`
--

INSERT INTO `replies` (`id`, `user_id`, `review_id`, `content`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 'This is a sample reply', '2022-02-25 15:16:55', '2022-02-25 15:16:55'),
(2, 1, 1, 'Another sample reply in this sample review', '2022-02-25 16:02:41', '2022-02-25 16:02:41'),
(3, 1, 2, 'How about here?', '2022-02-25 16:02:55', '2022-02-25 16:02:55'),
(4, 1, 2, 'How about there', '2022-02-25 16:03:22', '2022-02-25 16:03:22'),
(5, 1, 2, 'Try another one', '2022-02-25 16:05:46', '2022-02-25 16:05:46'),
(6, 2, 2, 'How about another user', '2022-02-25 16:06:08', '2022-02-25 16:06:08'),
(7, 2, 3, 'Yeah it works', '2022-02-25 16:06:44', '2022-02-25 16:06:44'),
(8, 2, 4, 'How about here', '2022-02-25 16:08:43', '2022-02-25 16:08:43'),
(9, 1, 5, 'Hello po', '2022-05-01 00:47:41', '2022-05-01 00:47:41'),
(10, 1, 5, 'Hi', '2022-05-01 00:47:45', '2022-05-01 00:47:45'),
(11, 2, 5, 'hello', '2022-05-01 00:48:00', '2022-05-01 00:48:00'),
(12, 2, 4, 'Heyyy', '2022-05-01 00:48:12', '2022-05-01 00:48:12'),
(13, 2, 7, 'yeah nice try', '2022-05-01 00:48:19', '2022-05-01 00:48:19'),
(14, 1, 8, 'thank you', '2022-05-01 00:49:39', '2022-05-01 00:49:39'),
(15, 1, 2, 'heyyy', '2022-05-01 02:58:43', '2022-05-01 02:58:43'),
(16, 2, 8, 'welcome', '2022-05-01 03:03:08', '2022-05-01 03:03:08'),
(17, 9, 9, 'Yeah', '2022-09-10 04:07:45', '2022-09-10 04:07:45'),
(18, 9, 5, 'Yeah', '2022-09-10 04:07:56', '2022-09-10 04:07:56');

-- --------------------------------------------------------

--
-- Table structure for table `reviews`
--

CREATE TABLE `reviews` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `product_id` int NOT NULL,
  `content` text NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `reviews`
--

INSERT INTO `reviews` (`id`, `user_id`, `product_id`, `content`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 'This is a sample review.', '2022-02-25 14:47:06', '2022-02-25 14:47:06'),
(2, 1, 1, 'Another sample review', '2022-02-25 15:08:22', '2022-02-25 15:08:22'),
(3, 2, 1, 'How about a review from a different user', '2022-02-25 16:06:29', '2022-02-25 16:06:29'),
(4, 1, 3, 'Try here', '2022-02-25 16:08:31', '2022-02-25 16:08:31'),
(5, 2, 2, 'another user review', '2022-02-25 16:08:57', '2022-02-25 16:08:57'),
(6, 1, 3, 'Cool', '2022-04-30 15:46:42', '2022-04-30 15:46:42'),
(7, 1, 3, 'Nice try', '2022-04-30 16:40:55', '2022-04-30 16:40:55'),
(8, 2, 3, 'What a nice product', '2022-05-01 00:49:16', '2022-05-01 00:49:16'),
(9, 9, 2, 'Another Try', '2022-09-10 04:07:37', '2022-09-10 04:07:37');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `first_name` varchar(55) NOT NULL,
  `last_name` varchar(55) NOT NULL,
  `email` varchar(55) NOT NULL,
  `password` varchar(100) NOT NULL,
  `user_level` int NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `email`, `password`, `user_level`, `created_at`, `updated_at`) VALUES
(1, 'Clem', 'Narciso', 'clementnarciso@yahoo.com', '365d38c60c4e98ca5ca6dbc02d396e53', 9, '2022-02-24 16:03:21', '2022-05-01 02:59:07'),
(2, 'Lianne', 'Narciso', 'liannemontes@gmail.com', '482c811da5d5b4bc6d497ffa98491e38', 1, '2022-02-24 16:03:38', '2022-05-01 03:02:56'),
(3, 'Michiko', 'Narciso', 'michiko@gmail.com', '482c811da5d5b4bc6d497ffa98491e38', 1, '2022-02-25 18:22:00', '2022-02-25 18:22:00'),
(5, 'Jabez', 'Narciso', 'jabeznarciso@gmail.com', 'bdc87b9c894da5168059e00ebffb9077', 1, '2022-04-30 10:43:09', '2022-04-30 10:43:09'),
(6, 'Clement', 'Narciso', 'clemont@gmail.com', '482c811da5d5b4bc6d497ffa98491e38', 1, '2022-05-17 00:37:06', '2022-05-17 00:37:06'),
(7, 'Clement', 'Narciso', 'clemont@gmail.com', '482c811da5d5b4bc6d497ffa98491e38', 1, '2022-05-17 00:37:46', '2022-05-17 00:37:46'),
(8, 'Clement', 'Narciso', 'clemont@gmail.com', '482c811da5d5b4bc6d497ffa98491e38', 1, '2022-05-17 00:40:19', '2022-05-17 00:40:19'),
(9, 'Clem', 'Narc', 'clementnarciso12@gmail.com', '482c811da5d5b4bc6d497ffa98491e38', 1, '2022-09-10 04:06:19', '2022-09-10 04:06:19');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `replies`
--
ALTER TABLE `replies`
  ADD PRIMARY KEY (`id`),
  ADD KEY `review_id` (`review_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `replies`
--
ALTER TABLE `replies`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Constraints for table `replies`
--
ALTER TABLE `replies`
  ADD CONSTRAINT `replies_ibfk_1` FOREIGN KEY (`review_id`) REFERENCES `reviews` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `replies_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Constraints for table `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `reviews_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
