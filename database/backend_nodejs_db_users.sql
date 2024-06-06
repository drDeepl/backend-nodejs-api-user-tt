-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: 85.209.9.101    Database: backend_nodejs_db
-- ------------------------------------------------------
-- Server version	8.0.36-0ubuntu0.22.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_name` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password_hash` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `sex` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_key` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'user1','','user1@u.com','$2b$10$kQsoO4NhRmGlTD3X48CfEeiLkdrXHtzKzzuP.7xo5GaTFlFnaC7TO','','2024-06-06 06:20:18.847'),(2,'user2','','user2@u.com','$2b$10$vJ1bmmtG08pk3D2eqckQ3.tUnozWBQYcY3oLfweRmZKQ3YWAeuEhO','','2024-06-06 08:12:33.112'),(3,'user3','','user3@u.com','$2b$10$6SzSSjWhXBZWKiClm5jWtOxa7ebC0D1hUbtnOkobWXX3J6/uytSHy','','2024-06-06 08:12:40.645'),(4,'user4','','user4@u.com','$2b$10$WbrIxydqsrB22POKdIVz1eTmw7EfWBLjMG0l5Jn7ZKXSimt0oJFSm','','2024-06-06 08:24:51.991'),(5,'user5','','user5@u.com','$2b$10$SmfZ3xvNSRyvdbb8mmsL3u4AvAfOhWmb3ESJ3EQ0vNfsoThXaq6Hy','','2024-06-06 08:32:41.736'),(6,'user7','','7@u.com','$2b$10$42STDE3hXFlGib4QUXNajeTDTnwdqcIz/P9Cn3q97q35i.pVVP4xi','','2024-06-06 10:11:44.297'),(7,'user8','','8@u.com','$2b$10$DjLbo/dVJiT4Ia5qcZlpBOjyIGSdWLrv/p//vh.DvibQ6tVGT4kfu','','2024-06-06 10:11:50.192'),(8,'user9','','9@u.com','$2b$10$2L3BxxMD1TfkSsyWCAvuF.ttVKZWUw69jS9XzdSSPlxzj5WfvnxR6','','2024-06-06 10:11:52.880'),(9,'user10','','10@u.com','$2b$10$c4AmIXpY0fk/IXDxmGi/Auh84NR48pFfySnAU3Utqk/OK17nOEmKa','','2024-06-06 10:11:55.292'),(10,'user1daw','','1daw@u.com','$2b$10$Nt9aoMnJ.B/p81p2qI6qKOBVOJd3mUeaRjw8DJGDg9.MAXlJtZOiO','','2024-06-06 10:12:00.792'),(11,'user2daw','','1daw32@u.com','$2b$10$CpOIWqC58k2qwG3e6/uzHO19/epnrRiEQbPxWw3zDJ62FEjuJSKcG','','2024-06-06 10:17:25.285'),(12,'use322daw','','1daw23212@u.com','$2b$10$p5YAlRR5AIkS3C3OfWqTqOxrfuWnzMsmEgXTP.FMMXQu0lh8B.7Um','','2024-06-06 10:17:30.284');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-06-06 17:21:04
