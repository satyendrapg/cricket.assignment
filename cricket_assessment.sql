/*
SQLyog Ultimate v12.4.3 (64 bit)
MySQL - 5.7.24 : Database - cricket_assessment
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`cricket_assessment` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `cricket_assessment`;

/*Table structure for table `failed_jobs` */

DROP TABLE IF EXISTS `failed_jobs`;

CREATE TABLE `failed_jobs` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `failed_jobs` */

/*Table structure for table `matches` */

DROP TABLE IF EXISTS `matches`;

CREATE TABLE `matches` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `team1` int(11) NOT NULL,
  `team2` int(11) NOT NULL,
  `matchDate` date NOT NULL,
  `winner` tinyint(4) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `points` tinyint(4) DEFAULT NULL,
  `team1_scores` smallint(6) DEFAULT NULL,
  `team2_scores` smallint(6) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `matches` */

insert  into `matches`(`id`,`team1`,`team2`,`matchDate`,`winner`,`created_at`,`updated_at`,`points`,`team1_scores`,`team2_scores`) values 
(1,2,1,'2020-05-01',2,NULL,NULL,2,149,148),
(2,3,1,'2020-05-02',1,NULL,NULL,2,147,151),
(3,7,3,'2020-05-03',3,NULL,NULL,2,162,165),
(4,1,2,'2020-05-04',2,NULL,NULL,2,131,132),
(5,2,6,'2020-05-05',2,NULL,NULL,2,134,133),
(6,7,4,'2020-05-06',4,NULL,NULL,2,175,178),
(7,5,3,'2020-05-07',3,NULL,NULL,2,115,121),
(8,1,8,'2020-05-08',8,NULL,NULL,2,170,173);

/*Table structure for table `migrations` */

DROP TABLE IF EXISTS `migrations`;

CREATE TABLE `migrations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `migrations` */

insert  into `migrations`(`id`,`migration`,`batch`) values 
(1,'2014_10_12_000000_create_users_table',1),
(2,'2014_10_12_100000_create_password_resets_table',1),
(3,'2019_08_19_000000_create_failed_jobs_table',1),
(4,'2020_02_22_184209_create_matches_table',1);

/*Table structure for table `password_resets` */

DROP TABLE IF EXISTS `password_resets`;

CREATE TABLE `password_resets` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  KEY `password_resets_email_index` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `password_resets` */

/*Table structure for table `players` */

DROP TABLE IF EXISTS `players`;

CREATE TABLE `players` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `teamId` int(11) DEFAULT NULL,
  `firstName` varchar(100) DEFAULT NULL,
  `lastName` varchar(100) DEFAULT NULL,
  `imageUri` varchar(255) DEFAULT NULL,
  `jerseyNumber` tinyint(4) DEFAULT NULL,
  `country` varchar(50) DEFAULT NULL,
  `matches` smallint(6) DEFAULT NULL,
  `runs` int(7) DEFAULT NULL,
  `highestScores` smallint(6) DEFAULT NULL,
  `fifties` tinyint(4) DEFAULT NULL,
  `hundreds` tinyint(4) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `TeamId` (`teamId`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;

/*Data for the table `players` */

insert  into `players`(`id`,`teamId`,`firstName`,`lastName`,`imageUri`,`jerseyNumber`,`country`,`matches`,`runs`,`highestScores`,`fifties`,`hundreds`,`created_at`,`updated_at`) values 
(1,1,'MS','Dhoni','1589307067dhoni.jpg',7,'India',98,1617,56,2,0,'2020-05-12 18:11:07','2020-05-12 18:11:07'),
(2,1,'Dwayne','Bravo','1589307160bravo.jpg',13,'West Indies',71,1151,66,4,0,'2020-05-12 18:12:40','2020-05-12 18:12:40'),
(3,1,'Faf du','Plessis','1589307265duplessis.jpg',16,'South Africa',47,1407,119,8,1,'2020-05-12 18:14:25','2020-05-12 18:14:25'),
(4,1,'Suresh','Raina','1589307338raina.jpg',8,'India',78,1605,101,5,1,'2020-05-12 18:15:38','2020-05-12 18:15:38'),
(5,2,'Rohit','Sharma','1589307446rohit.jpg',12,'India',108,2773,118,21,4,'2020-05-12 18:17:26','2020-05-12 18:17:26'),
(6,2,'Hardik','Pandya','1589307523pandya.jpg',17,'India',40,310,33,0,0,'2020-05-12 18:18:43','2020-05-12 18:18:43'),
(7,2,'Kieron','Pollard','1589307595polard.jpg',25,'West Indies',73,1123,68,4,0,'2020-05-12 18:19:55','2020-05-12 18:19:55'),
(8,2,'Quinton','de Kock','1589307760dekock.jpg',11,'South Africa',44,1226,79,6,0,'2020-05-12 18:22:40','2020-05-12 18:22:40'),
(9,3,'Shreyas','Iyer','1589307845iyer.jpg',13,'India',22,417,62,2,0,'2020-05-12 18:24:05','2020-05-12 18:24:05'),
(10,3,'Shimron','Hetmyer','1589307917hetmyer.jpg',12,'West Indies',25,354,56,1,0,'2020-05-12 18:25:17','2020-05-12 18:25:17'),
(11,3,'Shikhar','Dhawan','1589307980dhawan.jpg',17,'India',61,1588,92,10,0,'2020-05-12 18:26:20','2020-05-12 18:26:20'),
(12,3,'Rishabh','Pant','1589308104pant.jpg',11,'India',28,410,65,2,0,'2020-05-12 18:28:24','2020-05-12 18:28:24'),
(13,4,'Virat','Kohli','1589308712virat.jpg',8,'India',82,2794,94,24,0,'2020-05-12 18:38:32','2020-05-12 18:38:32'),
(14,4,'Aaron','Finch','1589308926finch.jpg',6,'Australia',61,1989,172,12,2,'2020-05-12 18:42:06','2020-05-12 18:42:06'),
(15,4,'AB de','Villiers','1589309076divillier.jpg',7,'South Africa',78,1672,79,10,0,'2020-05-12 18:44:37','2020-05-12 18:44:37'),
(16,4,'Chris','Morris','1589309155morris.jpg',18,'South Africa',23,133,55,1,0,'2020-05-12 18:45:55','2020-05-12 18:45:55');

/*Table structure for table `teams` */

DROP TABLE IF EXISTS `teams`;

CREATE TABLE `teams` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `logoUri` varchar(255) DEFAULT NULL,
  `clubState` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

/*Data for the table `teams` */

insert  into `teams`(`id`,`name`,`logoUri`,`clubState`,`created_at`,`updated_at`) values 
(1,'Chennai Super Kings','1589306627csk.png','Chennai','2020-05-12 18:03:47','2020-05-12 18:03:47'),
(2,'Mumbai Indians','1589306717mi.png','Mumbai','2020-05-12 18:05:17','2020-05-12 18:05:17'),
(3,'Delhi Capitals','1589306767dc.png','Delhi','2020-05-12 18:06:07','2020-05-12 18:06:07'),
(4,'Royal Challengers Bangalore','1589306814rcb.jpg','Banglore','2020-05-12 18:06:54','2020-05-12 18:06:54'),
(5,'Rajasthan Royals','1589306841rr.png','Rajasthan','2020-05-12 18:07:21','2020-05-12 18:07:21'),
(6,'Kolkata Knight Riders','1589306900kkr.png','Kolkatta','2020-05-12 18:08:20','2020-05-12 18:08:20'),
(7,'Sunrisers Hyderabad','1589306954sh.jpg','Hyderabad','2020-05-12 18:09:14','2020-05-12 18:09:14'),
(8,'Kings XI Punjab','1589306985kxi.jpg','Pubjab','2020-05-12 18:09:45','2020-05-12 18:09:45');

/*Table structure for table `users` */

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `users` */

insert  into `users`(`id`,`name`,`email`,`email_verified_at`,`password`,`remember_token`,`created_at`,`updated_at`) values 
(1,'Satyendra Kumar','satyendrapg@gmail.com',NULL,'$2y$10$whceBVM15L7XEJWoYstLW.Gk8wkXdzLrcKIhC9EwtaCAb7K5wEW7e',NULL,'2020-05-09 07:46:32','2020-05-09 07:46:32');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
