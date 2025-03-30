-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: localhost    Database: quanlyduhoc
-- ------------------------------------------------------
-- Server version	8.0.40

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `anh_baiviet`
--

DROP TABLE IF EXISTS `anh_baiviet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `anh_baiviet` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_baiviet` int NOT NULL,
  `anh` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_baiviet` (`id_baiviet`),
  CONSTRAINT `anh_baiviet_ibfk_1` FOREIGN KEY (`id_baiviet`) REFERENCES `baiviet` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `anh_baiviet`
--

LOCK TABLES `anh_baiviet` WRITE;
/*!40000 ALTER TABLE `anh_baiviet` DISABLE KEYS */;
/*!40000 ALTER TABLE `anh_baiviet` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `baiviet`
--

DROP TABLE IF EXISTS `baiviet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `baiviet` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_loai_baiviet` int NOT NULL,
  `tieu_de` varchar(255) NOT NULL,
  `noi_dung` text,
  `thumbnail` varchar(255) DEFAULT NULL,
  `ngay_up` datetime DEFAULT CURRENT_TIMESTAMP,
  `ngay_sua` datetime DEFAULT NULL,
  `status` enum('Bản nháp','Công khai','Riêng tư') DEFAULT 'Bản nháp',
  PRIMARY KEY (`id`),
  KEY `id_loai_baiviet` (`id_loai_baiviet`),
  CONSTRAINT `baiviet_ibfk_1` FOREIGN KEY (`id_loai_baiviet`) REFERENCES `loai_baiviet` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `baiviet`
--

LOCK TABLES `baiviet` WRITE;
/*!40000 ALTER TABLE `baiviet` DISABLE KEYS */;
/*!40000 ALTER TABLE `baiviet` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bo_hoso`
--

DROP TABLE IF EXISTS `bo_hoso`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bo_hoso` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_hocsinh` varchar(10) NOT NULL,
  `ten_bo_hoso` varchar(150) NOT NULL,
  `ngay_tao` datetime DEFAULT CURRENT_TIMESTAMP,
  `status` enum('Đang chuẩn bị','Đã nộp','Đã duyệt','Từ chối') DEFAULT 'Đang chuẩn bị',
  PRIMARY KEY (`id`),
  KEY `id_hocsinh` (`id_hocsinh`),
  CONSTRAINT `bo_hoso_ibfk_1` FOREIGN KEY (`id_hocsinh`) REFERENCES `hocsinh` (`id_hocsinh`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bo_hoso`
--

LOCK TABLES `bo_hoso` WRITE;
/*!40000 ALTER TABLE `bo_hoso` DISABLE KEYS */;
INSERT INTO `bo_hoso` VALUES (1,'HS001','Hồ sơ du học Hàn Quốc - T3','2025-03-01 10:00:00','Đang chuẩn bị'),(2,'HS002','Hồ sơ du học Hàn Quốc - T6','2025-06-01 14:30:00','Đã nộp'),(3,'HS003','Hồ sơ du học Hàn Quốc - T9','2025-09-01 09:15:00','Đã duyệt'),(4,'HS004','Hồ sơ du học Hàn Quốc - T12','2025-12-01 16:45:00','Từ chối'),(5,'HS005','Hồ sơ du học Hàn Quốc - T3','2025-03-15 12:20:00','Đang chuẩn bị');
/*!40000 ALTER TABLE `bo_hoso` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dangky_hoc`
--

DROP TABLE IF EXISTS `dangky_hoc`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dangky_hoc` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_hocsinh` varchar(10) NOT NULL,
  `id_lophoc` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_dangky` (`id_hocsinh`,`id_lophoc`),
  KEY `id_lophoc` (`id_lophoc`),
  CONSTRAINT `dangky_hoc_ibfk_1` FOREIGN KEY (`id_hocsinh`) REFERENCES `hocsinh` (`id_hocsinh`),
  CONSTRAINT `dangky_hoc_ibfk_2` FOREIGN KEY (`id_lophoc`) REFERENCES `lophoc` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dangky_hoc`
--

LOCK TABLES `dangky_hoc` WRITE;
/*!40000 ALTER TABLE `dangky_hoc` DISABLE KEYS */;
/*!40000 ALTER TABLE `dangky_hoc` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `diem_danh`
--

DROP TABLE IF EXISTS `diem_danh`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `diem_danh` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_dangky_hoc` int NOT NULL,
  `ngay_dd` date NOT NULL,
  `status` enum('Có mặt','Vắng có phép','Vắng không phép') DEFAULT 'Có mặt',
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_diemdanh` (`id_dangky_hoc`,`ngay_dd`),
  CONSTRAINT `diem_danh_ibfk_1` FOREIGN KEY (`id_dangky_hoc`) REFERENCES `dangky_hoc` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `diem_danh`
--

LOCK TABLES `diem_danh` WRITE;
/*!40000 ALTER TABLE `diem_danh` DISABLE KEYS */;
/*!40000 ALTER TABLE `diem_danh` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dm_hoso`
--

DROP TABLE IF EXISTS `dm_hoso`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dm_hoso` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ten_dm_hoso` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dm_hoso`
--

LOCK TABLES `dm_hoso` WRITE;
/*!40000 ALTER TABLE `dm_hoso` DISABLE KEYS */;
INSERT INTO `dm_hoso` VALUES (1,'Bằng TN'),(2,'Học bạ'),(3,'Hộ chiếu'),(4,'Ảnh 3.5 x 4.5'),(5,'CT07'),(6,'CCCD học sinh'),(7,'CCCD bố'),(8,'CCCD mẹ');
/*!40000 ALTER TABLE `dm_hoso` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dm_thu`
--

DROP TABLE IF EXISTS `dm_thu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dm_thu` (
  `id` int NOT NULL AUTO_INCREMENT,
  `loai_thu` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `loai_thu` (`loai_thu`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dm_thu`
--

LOCK TABLES `dm_thu` WRITE;
/*!40000 ALTER TABLE `dm_thu` DISABLE KEYS */;
INSERT INTO `dm_thu` VALUES (1,'Cọc'),(3,'Phí dịch vụ và xử lý hồ sơ'),(5,'Phí nộp bên thứ 3'),(4,'Phí nộp trường Hàn'),(2,'Xử lý hồ sơ và đào tạo kỹ năng tiền xuất cảnh');
/*!40000 ALTER TABLE `dm_thu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `giaovien`
--

DROP TABLE IF EXISTS `giaovien`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `giaovien` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ten_giaovien` varchar(100) NOT NULL,
  `dob` date DEFAULT NULL,
  `gioitinh` enum('Nam','Nữ','Khác') DEFAULT NULL,
  `sdt` varchar(10) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `giaovien`
--

LOCK TABLES `giaovien` WRITE;
/*!40000 ALTER TABLE `giaovien` DISABLE KEYS */;
INSERT INTO `giaovien` VALUES (1,'Phạm Thanh Hùng','1982-07-20','Nam','0911223344','hung.pham@example.com'),(2,'Đỗ Hoài An','1993-05-15','Nữ','0977889900','hoai.an@example.com'),(3,'Vũ Đức Thịnh','1989-11-30','Nam','0909667788','thinh.vu@example.com');
/*!40000 ALTER TABLE `giaovien` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `giayphep_kinhdoanh`
--

DROP TABLE IF EXISTS `giayphep_kinhdoanh`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `giayphep_kinhdoanh` (
  `id` int NOT NULL AUTO_INCREMENT,
  `maso_gpkd` varchar(50) DEFAULT NULL,
  `id_nguoi_than` int NOT NULL,
  `nghe_nghiep` varchar(100) DEFAULT NULL,
  `thu_nhap_thang` decimal(15,2) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `maso_gpkd` (`maso_gpkd`),
  KEY `id_nguoi_than` (`id_nguoi_than`),
  CONSTRAINT `giayphep_kinhdoanh_ibfk_1` FOREIGN KEY (`id_nguoi_than`) REFERENCES `nguoi_than` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `giayphep_kinhdoanh`
--

LOCK TABLES `giayphep_kinhdoanh` WRITE;
/*!40000 ALTER TABLE `giayphep_kinhdoanh` DISABLE KEYS */;
/*!40000 ALTER TABLE `giayphep_kinhdoanh` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ho_so`
--

DROP TABLE IF EXISTS `ho_so`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ho_so` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_bo_hoso` int NOT NULL,
  `id_dm_hoso` int NOT NULL,
  `link` varchar(255) DEFAULT NULL,
  `index_trang` int DEFAULT NULL,
  `ngay_up` datetime DEFAULT CURRENT_TIMESTAMP,
  `ngay_sua` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_bo_hoso` (`id_bo_hoso`),
  KEY `id_dm_hoso` (`id_dm_hoso`),
  CONSTRAINT `ho_so_ibfk_1` FOREIGN KEY (`id_bo_hoso`) REFERENCES `bo_hoso` (`id`),
  CONSTRAINT `ho_so_ibfk_2` FOREIGN KEY (`id_dm_hoso`) REFERENCES `dm_hoso` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ho_so`
--

LOCK TABLES `ho_so` WRITE;
/*!40000 ALTER TABLE `ho_so` DISABLE KEYS */;
INSERT INTO `ho_so` VALUES (1,1,1,'data/Ho_So/BoHS1/bang/bang_hs1.jpg',1,'2025-03-01 10:05:00','2025-03-01 10:05:00'),(2,1,2,'data/Ho_So/BoHS1/hoc_ba/hoc_ba_hs1_1.jpg',1,'2025-03-01 10:10:00','2025-03-01 10:10:00'),(3,1,2,'data/Ho_So/BoHS1/hoc_ba/hoc_ba_hs1_2.jpg',2,'2025-03-01 10:10:00','2025-03-01 10:10:00'),(4,1,2,'data/Ho_So/BoHS1/hoc_ba/hoc_ba_hs1_3.jpg',3,'2025-03-01 10:10:00','2025-03-01 10:10:00'),(5,1,3,'data/Ho_So/BoHS1/ho_chieu/ho_chieu_hs1_1.jpg',1,'2025-03-01 10:15:00','2025-03-01 10:15:00'),(6,1,3,'data/Ho_So/BoHS1/ho_chieu/ho_chieu_hs1_2.jpg',2,'2025-03-01 10:15:00','2025-03-01 10:15:00'),(7,1,4,'data/Ho_So/BoHS1/anh_35x45/anh_35x45_hs1_1.jpg',1,'2025-03-01 10:20:00','2025-03-01 10:20:00'),(8,1,4,'data/Ho_So/BoHS1/anh_35x45/anh_35x45_hs1_2.jpg',2,'2025-03-01 10:20:00','2025-03-01 10:20:00'),(9,1,4,'data/Ho_So/BoHS1/anh_35x45/anh_35x45_hs1_3.jpg',3,'2025-03-01 10:20:00','2025-03-01 10:20:00'),(10,1,4,'data/Ho_So/BoHS1/anh_35x45/anh_35x45_hs1_4.jpg',4,'2025-03-01 10:20:00','2025-03-01 10:20:00'),(11,1,4,'data/Ho_So/BoHS1/anh_35x45/anh_35x45_hs1_5.jpg',5,'2025-03-01 10:20:00','2025-03-01 10:20:00'),(12,1,5,'data/Ho_So/BoHS1/ct_07/ct_07_hs1_1.jpg',1,'2025-03-01 10:25:00','2025-03-01 10:25:00'),(13,1,6,'data/Ho_So/BoHS1/cccd_hs/cccd_hs_1_mat_truoc.jpg',1,'2025-03-01 10:30:00','2025-03-01 10:30:00'),(14,1,6,'data/Ho_So/BoHS1/cccd_hs/cccd_hs_1_mat_sau.jpg',2,'2025-03-01 10:30:00','2025-03-01 10:30:00'),(15,1,7,'data/Ho_So/BoHS1/cccd_bo/cccd_bo_1_mat_truoc.jpg',1,'2025-03-01 10:35:00','2025-03-01 10:35:00'),(16,1,7,'data/Ho_So/BoHS1/cccd_bo/cccd_bo_1_mat_sau.jpg',2,'2025-03-01 10:35:00','2025-03-01 10:35:00'),(17,1,8,'data/Ho_So/BoHS1/cccd_me/cccd_me_1_mat_truoc.jpg',1,'2025-03-01 10:40:00','2025-03-01 10:40:00'),(18,1,8,'data/Ho_So/BoHS1/cccd_me/cccd_me_1_mat_sau.jpg',2,'2025-03-01 10:40:00','2025-03-01 10:40:00');
/*!40000 ALTER TABLE `ho_so` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hocsinh`
--

DROP TABLE IF EXISTS `hocsinh`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hocsinh` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_hocsinh` varchar(10) DEFAULT NULL,
  `ten_hs` varchar(100) NOT NULL,
  `dob` date DEFAULT NULL,
  `gioitinh` enum('Nam','Nữ','Khác') DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `sdt` varchar(10) DEFAULT NULL,
  `link_fb` varchar(255) DEFAULT NULL,
  `grade_10` decimal(4,2) DEFAULT NULL,
  `grade_11` decimal(4,2) DEFAULT NULL,
  `grade_12` decimal(4,2) DEFAULT NULL,
  `id_quanhuyen` int DEFAULT NULL,
  `diachi_chitiet` text,
  `ngay_dk` datetime DEFAULT CURRENT_TIMESTAMP,
  `status` enum('Chờ xử lý','Đã duyệt','Từ chối') DEFAULT 'Chờ xử lý',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_hocsinh` (`id_hocsinh`),
  KEY `id_quanhuyen` (`id_quanhuyen`),
  CONSTRAINT `hocsinh_ibfk_1` FOREIGN KEY (`id_quanhuyen`) REFERENCES `quanhuyen` (`id`),
  CONSTRAINT `hocsinh_chk_1` CHECK ((`grade_10` between 0.00 and 10.00)),
  CONSTRAINT `hocsinh_chk_2` CHECK ((`grade_11` between 0.00 and 10.00)),
  CONSTRAINT `hocsinh_chk_3` CHECK ((`grade_12` between 0.00 and 10.00))
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hocsinh`
--

LOCK TABLES `hocsinh` WRITE;
/*!40000 ALTER TABLE `hocsinh` DISABLE KEYS */;
INSERT INTO `hocsinh` VALUES (1,'HS001','Nguyễn Văn A','2007-05-15','Nam','nguyenvana@example.com','0987654321','https://facebook.com/nguyenvana',8.50,8.20,9.00,1,'123 Đường ABC, Quận 1','2025-03-31 00:01:21','Đã duyệt'),(2,'HS002','Trần Thị B','2006-09-20','Nữ','tranthib@example.com','0912345678','https://facebook.com/tranthib',7.80,8.00,8.50,2,'456 Đường XYZ, Quận 3','2025-03-31 00:01:21','Chờ xử lý'),(3,'HS003','Lê Văn C','2005-12-01','Nam','levanc@example.com','0978123456','https://facebook.com/levanc',9.00,9.20,9.50,3,'789 Đường DEF, Quận 5','2025-03-31 00:01:21','Từ chối'),(4,'HS004','Hoàng Minh D','2007-07-10','Nam','hoangminhd@example.com','0965432109','https://facebook.com/hoangminhd',6.50,7.00,7.50,1,'12 Đường LMN, Quận 7','2025-03-31 00:01:21','Chờ xử lý'),(5,'HS005','Phạm Thị E','2006-03-25','Nữ','phamthie@example.com','0956789012','https://facebook.com/phamthie',8.00,8.30,8.70,2,'99 Đường OPQ, Quận 10','2025-03-31 00:01:21','Đã duyệt');
/*!40000 ALTER TABLE `hocsinh` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ky_hoc`
--

DROP TABLE IF EXISTS `ky_hoc`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ky_hoc` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ten_kyhoc` varchar(50) NOT NULL,
  `ngaybd` date NOT NULL,
  `ngaykt` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ky_hoc`
--

LOCK TABLES `ky_hoc` WRITE;
/*!40000 ALTER TABLE `ky_hoc` DISABLE KEYS */;
INSERT INTO `ky_hoc` VALUES (1,'Kỳ T3','2025-03-01','2025-05-26'),(2,'Kỳ T6','2025-06-01','2025-08-26'),(3,'Kỳ T9','2025-09-01','2025-11-26'),(4,'Kỳ T12','2025-12-01','2026-02-23');
/*!40000 ALTER TABLE `ky_hoc` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lichhoc`
--

DROP TABLE IF EXISTS `lichhoc`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lichhoc` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_lophoc` int NOT NULL,
  `thu_trong_tuan` tinyint NOT NULL,
  `gio_bd` time NOT NULL,
  `gio_kt` time NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_lophoc` (`id_lophoc`),
  CONSTRAINT `lichhoc_ibfk_1` FOREIGN KEY (`id_lophoc`) REFERENCES `lophoc` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lichhoc`
--

LOCK TABLES `lichhoc` WRITE;
/*!40000 ALTER TABLE `lichhoc` DISABLE KEYS */;
/*!40000 ALTER TABLE `lichhoc` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lienhe`
--

DROP TABLE IF EXISTS `lienhe`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lienhe` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ten_khachhang` varchar(100) NOT NULL,
  `sdt` varchar(10) NOT NULL,
  `status` enum('Chưa liên hệ','Đã liên hệ','Đã tư vấn','Không liên hệ được') DEFAULT 'Chưa liên hệ',
  `kenh_tiep_can` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lienhe`
--

LOCK TABLES `lienhe` WRITE;
/*!40000 ALTER TABLE `lienhe` DISABLE KEYS */;
/*!40000 ALTER TABLE `lienhe` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `loai_baiviet`
--

DROP TABLE IF EXISTS `loai_baiviet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `loai_baiviet` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ten_dm_baiviet` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `loai_baiviet`
--

LOCK TABLES `loai_baiviet` WRITE;
/*!40000 ALTER TABLE `loai_baiviet` DISABLE KEYS */;
/*!40000 ALTER TABLE `loai_baiviet` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lophoc`
--

DROP TABLE IF EXISTS `lophoc`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lophoc` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_kyhoc` int NOT NULL,
  `id_giaovien` int NOT NULL,
  `id_phonghoc` int NOT NULL,
  `ten_lop` varchar(50) NOT NULL,
  `soluong_hs` int DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `id_kyhoc` (`id_kyhoc`),
  KEY `id_giaovien` (`id_giaovien`),
  KEY `id_phonghoc` (`id_phonghoc`),
  CONSTRAINT `lophoc_ibfk_1` FOREIGN KEY (`id_kyhoc`) REFERENCES `ky_hoc` (`id`),
  CONSTRAINT `lophoc_ibfk_2` FOREIGN KEY (`id_giaovien`) REFERENCES `giaovien` (`id`),
  CONSTRAINT `lophoc_ibfk_3` FOREIGN KEY (`id_phonghoc`) REFERENCES `phonghoc` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lophoc`
--

LOCK TABLES `lophoc` WRITE;
/*!40000 ALTER TABLE `lophoc` DISABLE KEYS */;
/*!40000 ALTER TABLE `lophoc` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nguoi_than`
--

DROP TABLE IF EXISTS `nguoi_than`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `nguoi_than` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_hocsinh` varchar(10) NOT NULL,
  `ten_nguoithan` varchar(100) NOT NULL,
  `quan_he` varchar(50) NOT NULL,
  `sdt` varchar(15) DEFAULT NULL,
  `loai_stk` enum('Sổ Hàn','Sổ Việt','Khác') DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_hocsinh` (`id_hocsinh`),
  CONSTRAINT `nguoi_than_ibfk_1` FOREIGN KEY (`id_hocsinh`) REFERENCES `hocsinh` (`id_hocsinh`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nguoi_than`
--

LOCK TABLES `nguoi_than` WRITE;
/*!40000 ALTER TABLE `nguoi_than` DISABLE KEYS */;
/*!40000 ALTER TABLE `nguoi_than` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nguyenvong`
--

DROP TABLE IF EXISTS `nguyenvong`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `nguyenvong` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_bo_hoso` int NOT NULL,
  `id_truong_hq` int NOT NULL,
  `thu_tu` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_bo_hoso` (`id_bo_hoso`),
  KEY `id_truong_hq` (`id_truong_hq`),
  CONSTRAINT `nguyenvong_ibfk_1` FOREIGN KEY (`id_bo_hoso`) REFERENCES `bo_hoso` (`id`),
  CONSTRAINT `nguyenvong_ibfk_2` FOREIGN KEY (`id_truong_hq`) REFERENCES `truong_hq` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nguyenvong`
--

LOCK TABLES `nguyenvong` WRITE;
/*!40000 ALTER TABLE `nguyenvong` DISABLE KEYS */;
/*!40000 ALTER TABLE `nguyenvong` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `phonghoc`
--

DROP TABLE IF EXISTS `phonghoc`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `phonghoc` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ten_phonghoc` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `phonghoc`
--

LOCK TABLES `phonghoc` WRITE;
/*!40000 ALTER TABLE `phonghoc` DISABLE KEYS */;
INSERT INTO `phonghoc` VALUES (1,'101'),(2,'102'),(3,'103'),(4,'201'),(5,'202'),(6,'203');
/*!40000 ALTER TABLE `phonghoc` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `quanhuyen`
--

DROP TABLE IF EXISTS `quanhuyen`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `quanhuyen` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_tinhthanh` int NOT NULL,
  `ten_quanhuyen` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_tinhthanh` (`id_tinhthanh`),
  CONSTRAINT `quanhuyen_ibfk_1` FOREIGN KEY (`id_tinhthanh`) REFERENCES `tinhthanh` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=708 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `quanhuyen`
--

LOCK TABLES `quanhuyen` WRITE;
/*!40000 ALTER TABLE `quanhuyen` DISABLE KEYS */;
INSERT INTO `quanhuyen` VALUES (1,24,'Quận Ba Đình'),(2,24,'Quận Hoàn Kiếm'),(3,24,'Quận Tây Hồ'),(4,24,'Quận Long Biên'),(5,24,'Quận Cầu Giấy'),(6,24,'Quận Đống Đa'),(7,24,'Quận Hai Bà Trưng'),(8,24,'Quận Hoàng Mai'),(9,24,'Quận Thanh Xuân'),(10,24,'Huyện Sóc Sơn'),(11,24,'Huyện Đông Anh'),(12,24,'Huyện Gia Lâm'),(13,24,'Quận Nam Từ Liêm'),(14,24,'Huyện Thanh Trì'),(15,24,'Quận Bắc Từ Liêm'),(16,24,'Huyện Mê Linh'),(17,24,'Quận Hà Đông'),(18,24,'Thị xã Sơn Tây'),(19,24,'Huyện Ba Vì'),(20,24,'Huyện Phúc Thọ'),(21,24,'Huyện Đan Phượng'),(22,24,'Huyện Hoài Đức'),(23,24,'Huyện Quốc Oai'),(24,24,'Huyện Thạch Thất'),(25,24,'Huyện Chương Mỹ'),(26,24,'Huyện Thanh Oai'),(27,24,'Huyện Thường Tín'),(28,24,'Huyện Phú Xuyên'),(29,24,'Huyện Ứng Hòa'),(30,24,'Huyện Mỹ Đức'),(31,22,'Hà Giang'),(32,22,'Huyện Đồng Văn'),(33,22,'Huyện Mèo Vạc'),(34,22,'Huyện Yên Minh'),(35,22,'Huyện Quản Bạ'),(36,22,'Huyện Vị Xuyên'),(37,22,'Huyện Bắc Mê'),(38,22,'Huyện Hoàng Su Phì'),(39,22,'Huyện Xín Mần'),(40,22,'Huyện Bắc Quang'),(41,22,'Huyện Quang Bình'),(42,14,'Cao Bằng'),(43,14,'Huyện Bảo Lâm'),(44,14,'Huyện Bảo Lạc'),(45,14,'Huyện Hà Quảng'),(46,14,'Huyện Trùng Khánh'),(47,14,'Huyện Hạ Lang'),(48,14,'Huyện Quảng Hòa'),(49,14,'Huyện Hoà An'),(50,14,'Huyện Nguyên Bình'),(51,14,'Huyện Thạch An'),(52,4,'Thành Phố Bắc Kạn'),(53,4,'Huyện Pác Nặm'),(54,4,'Huyện Ba Bể'),(55,4,'Huyện Ngân Sơn'),(56,4,'Huyện Bạch Thông'),(57,4,'Huyện Chợ Đồn'),(58,4,'Huyện Chợ Mới'),(59,4,'Huyện Na Rì'),(60,60,'Tuyên Quang'),(61,60,'Huyện Lâm Bình'),(62,60,'Huyện Na Hang'),(63,60,'Huyện Chiêm Hóa'),(64,60,'Huyện Hàm Yên'),(65,60,'Huyện Yên Sơn'),(66,60,'Huyện Sơn Dương'),(67,37,'Lào Cai'),(68,37,'Huyện Bát Xát'),(69,37,'Huyện Mường Khương'),(70,37,'Huyện Si Ma Cai'),(71,37,'Huyện Bắc Hà'),(72,37,'Huyện Bảo Thắng'),(73,37,'Huyện Bảo Yên'),(74,37,'Thị xã Sa Pa'),(75,37,'Huyện Văn Bàn'),(76,18,'Điện Biên Phủ'),(77,18,'Thị Xã Mường Lay'),(78,18,'Huyện Mường Nhé'),(79,18,'Huyện Mường Chà'),(80,18,'Huyện Tủa Chùa'),(81,18,'Huyện Tuần Giáo'),(82,18,'Huyện Điện Biên'),(83,18,'Huyện Điện Biên Đông'),(84,18,'Huyện Mường Ảng'),(85,18,'Huyện Nậm Pồ'),(86,34,'Lai Châu'),(87,34,'Huyện Tam Đường'),(88,34,'Huyện Mường Tè'),(89,34,'Huyện Sìn Hồ'),(90,34,'Huyện Phong Thổ'),(91,34,'Huyện Than Uyên'),(92,34,'Huyện Tân Uyên'),(93,34,'Huyện Nậm Nhùn'),(94,51,'Sơn La'),(95,51,'Huyện Quỳnh Nhai'),(96,51,'Huyện Thuận Châu'),(97,51,'Huyện Mường La'),(98,51,'Huyện Bắc Yên'),(99,51,'Huyện Phù Yên'),(100,51,'Huyện Mộc Châu'),(101,51,'Huyện Yên Châu'),(102,51,'Huyện Mai Sơn'),(103,51,'Huyện Sông Mã'),(104,51,'Huyện Sốp Cộp'),(105,51,'Huyện Vân Hồ'),(106,63,'Yên Bái'),(107,63,'Thị xã Nghĩa Lộ'),(108,63,'Huyện Lục Yên'),(109,63,'Huyện Văn Yên'),(110,63,'Huyện Mù Căng Chải'),(111,63,'Huyện Trấn Yên'),(112,63,'Huyện Trạm Tấu'),(113,63,'Huyện Văn Chấn'),(114,63,'Huyện Yên Bình'),(115,29,'Hòa Bình'),(116,29,'Huyện Đà Bắc'),(117,29,'Huyện Lương Sơn'),(118,29,'Huyện Kim Bôi'),(119,29,'Huyện Cao Phong'),(120,29,'Huyện Tân Lạc'),(121,29,'Huyện Mai Châu'),(122,29,'Huyện Lạc Sơn'),(123,29,'Huyện Yên Thủy'),(124,29,'Huyện Lạc Thủy'),(125,54,'Thái Nguyên'),(126,54,'Sông Công'),(127,54,'Huyện Định Hóa'),(128,54,'Huyện Phú Lương'),(129,54,'Huyện Đồng Hỷ'),(130,54,'Huyện Võ Nhai'),(131,54,'Huyện Đại Từ'),(132,54,'Thị xã Phổ Yên'),(133,54,'Huyện Phú Bình'),(134,36,'Lạng Sơn'),(135,36,'Huyện Tràng Định'),(136,36,'Huyện Bình Gia'),(137,36,'Huyện Văn Lãng'),(138,36,'Huyện Cao Lộc'),(139,36,'Huyện Văn Quan'),(140,36,'Huyện Bắc Sơn'),(141,36,'Huyện Hữu Lũng'),(142,36,'Huyện Chi Lăng'),(143,36,'Huyện Lộc Bình'),(144,36,'Huyện Đình Lập'),(145,48,'Hạ Long'),(146,48,'Móng Cái'),(147,48,'Cẩm Phả'),(148,48,'Uông Bí'),(149,48,'Huyện Bình Liêu'),(150,48,'Huyện Tiên Yên'),(151,48,'Huyện Đầm Hà'),(152,48,'Huyện Hải Hà'),(153,48,'Huyện Ba Chẽ'),(154,48,'Huyện Vân Đồn'),(155,48,'Thị xã Đông Triều'),(156,48,'Thị xã Quảng Yên'),(157,48,'Huyện Cô Tô'),(158,3,'Bắc Giang'),(159,3,'Huyện Yên Thế'),(160,3,'Huyện Tân Yên'),(161,3,'Huyện Lạng Giang'),(162,3,'Huyện Lục Nam'),(163,3,'Huyện Lục Ngạn'),(164,3,'Huyện Sơn Động'),(165,3,'Huyện Yên Dũng'),(166,3,'Huyện Việt Yên'),(167,3,'Huyện Hiệp Hòa'),(168,43,'Việt Trì'),(169,43,'Thị xã Phú Thọ'),(170,43,'Huyện Đoan Hùng'),(171,43,'Huyện Hạ Hoà'),(172,43,'Huyện Thanh Ba'),(173,43,'Huyện Phù Ninh'),(174,43,'Huyện Yên Lập'),(175,43,'Huyện Cẩm Khê'),(176,43,'Huyện Tam Nông'),(177,43,'Huyện Lâm Thao'),(178,43,'Huyện Thanh Sơn'),(179,43,'Huyện Thanh Thuỷ'),(180,43,'Huyện Tân Sơn'),(181,62,'Vĩnh Yên'),(182,62,'Phúc Yên'),(183,62,'Huyện Lập Thạch'),(184,62,'Huyện Tam Dương'),(185,62,'Huyện Tam Đảo'),(186,62,'Huyện Bình Xuyên'),(187,62,'Huyện Yên Lạc'),(188,62,'Huyện Vĩnh Tường'),(189,62,'Huyện Sông Lô'),(190,6,'Bắc Ninh'),(191,6,'Huyện Yên Phong'),(192,6,'Huyện Quế Võ'),(193,6,'Huyện Tiên Du'),(194,6,'Thị xã Từ Sơn'),(195,6,'Huyện Thuận Thành'),(196,6,'Huyện Gia Bình'),(197,6,'Huyện Lương Tài'),(198,26,'Hải Dương'),(199,26,'Chí Linh'),(200,26,'Huyện Nam Sách'),(201,26,'Thị xã Kinh Môn'),(202,26,'Huyện Kim Thành'),(203,26,'Huyện Thanh Hà'),(204,26,'Huyện Cẩm Giàng'),(205,26,'Huyện Bình Giang'),(206,26,'Huyện Gia Lộc'),(207,26,'Huyện Tứ Kỳ'),(208,26,'Huyện Ninh Giang'),(209,26,'Huyện Thanh Miện'),(210,27,'Quận Hồng Bàng'),(211,27,'Quận Ngô Quyền'),(212,27,'Quận Lê Chân'),(213,27,'Quận Hải An'),(214,27,'Quận Kiến An'),(215,27,'Quận Đồ Sơn'),(216,27,'Quận Dương Kinh'),(217,27,'Huyện Thuỷ Nguyên'),(218,27,'Huyện An Dương'),(219,27,'Huyện An Lão'),(220,27,'Huyện Kiến Thuỵ'),(221,27,'Huyện Tiên Lãng'),(222,27,'Huyện Vĩnh Bảo'),(223,27,'Huyện Cát Hải'),(224,27,'Huyện Bạch Long Vĩ'),(225,30,'Hưng Yên'),(226,30,'Huyện Văn Lâm'),(227,30,'Huyện Văn Giang'),(228,30,'Huyện Yên Mỹ'),(229,30,'Thị xã Mỹ Hào'),(230,30,'Huyện Ân Thi'),(231,30,'Huyện Khoái Châu'),(232,30,'Huyện Kim Động'),(233,30,'Huyện Tiên Lữ'),(234,30,'Huyện Phù Cừ'),(235,53,'Thái Bình'),(236,53,'Huyện Quỳnh Phụ'),(237,53,'Huyện Hưng Hà'),(238,53,'Huyện Đông Hưng'),(239,53,'Huyện Thái Thụy'),(240,53,'Huyện Tiền Hải'),(241,53,'Huyện Kiến Xương'),(242,53,'Huyện Vũ Thư'),(243,23,'Phủ Lý'),(244,23,'Thị xã Duy Tiên'),(245,23,'Huyện Kim Bảng'),(246,23,'Huyện Thanh Liêm'),(247,23,'Huyện Bình Lục'),(248,23,'Huyện Lý Nhân'),(249,39,'Nam Định'),(250,39,'Huyện Mỹ Lộc'),(251,39,'Huyện Vụ Bản'),(252,39,'Huyện Ý Yên'),(253,39,'Huyện Nghĩa Hưng'),(254,39,'Huyện Nam Trực'),(255,39,'Huyện Trực Ninh'),(256,39,'Huyện Xuân Trường'),(257,39,'Huyện Giao Thủy'),(258,39,'Huyện Hải Hậu'),(259,41,'Ninh Bình'),(260,41,'Tam Điệp'),(261,41,'Huyện Nho Quan'),(262,41,'Huyện Gia Viễn'),(263,41,'Huyện Hoa Lư'),(264,41,'Huyện Yên Khánh'),(265,41,'Huyện Kim Sơn'),(266,41,'Huyện Yên Mô'),(267,55,'Thanh Hóa'),(268,55,'Thị xã Bỉm Sơn'),(269,55,'Sầm Sơn'),(270,55,'Huyện Mường Lát'),(271,55,'Huyện Quan Hóa'),(272,55,'Huyện Bá Thước'),(273,55,'Huyện Quan Sơn'),(274,55,'Huyện Lang Chánh'),(275,55,'Huyện Ngọc Lặc'),(276,55,'Huyện Cẩm Thủy'),(277,55,'Huyện Thạch Thành'),(278,55,'Huyện Hà Trung'),(279,55,'Huyện Vĩnh Lộc'),(280,55,'Huyện Yên Định'),(281,55,'Huyện Thọ Xuân'),(282,55,'Huyện Thường Xuân'),(283,55,'Huyện Triệu Sơn'),(284,55,'Huyện Thiệu Hóa'),(285,55,'Huyện Hoằng Hóa'),(286,55,'Huyện Hậu Lộc'),(287,55,'Huyện Nga Sơn'),(288,55,'Huyện Như Xuân'),(289,55,'Huyện Như Thanh'),(290,55,'Huyện Nông Cống'),(291,55,'Huyện Đông Sơn'),(292,55,'Huyện Quảng Xương'),(293,55,'Thị xã Nghi Sơn'),(294,40,'Vinh'),(295,40,'Thị xã Cửa Lò'),(296,40,'Thị xã Thái Hoà'),(297,40,'Huyện Quế Phong'),(298,40,'Huyện Quỳ Châu'),(299,40,'Huyện Kỳ Sơn'),(300,40,'Huyện Tương Dương'),(301,40,'Huyện Nghĩa Đàn'),(302,40,'Huyện Quỳ Hợp'),(303,40,'Huyện Quỳnh Lưu'),(304,40,'Huyện Con Cuông'),(305,40,'Huyện Tân Kỳ'),(306,40,'Huyện Anh Sơn'),(307,40,'Huyện Diễn Châu'),(308,40,'Huyện Yên Thành'),(309,40,'Huyện Đô Lương'),(310,40,'Huyện Thanh Chương'),(311,40,'Huyện Nghi Lộc'),(312,40,'Huyện Nam Đàn'),(313,40,'Huyện Hưng Nguyên'),(314,40,'Thị xã Hoàng Mai'),(315,25,'Hà Tĩnh'),(316,25,'Thị xã Hồng Lĩnh'),(317,25,'Huyện Hương Sơn'),(318,25,'Huyện Đức Thọ'),(319,25,'Huyện Vũ Quang'),(320,25,'Huyện Nghi Xuân'),(321,25,'Huyện Can Lộc'),(322,25,'Huyện Hương Khê'),(323,25,'Huyện Thạch Hà'),(324,25,'Huyện Cẩm Xuyên'),(325,25,'Huyện Kỳ Anh'),(326,25,'Huyện Lộc Hà'),(327,25,'Thị xã Kỳ Anh'),(328,45,'Thành Phố Đồng Hới'),(329,45,'Huyện Minh Hóa'),(330,45,'Huyện Tuyên Hóa'),(331,45,'Huyện Quảng Trạch'),(332,45,'Huyện Bố Trạch'),(333,45,'Huyện Quảng Ninh'),(334,45,'Huyện Lệ Thủy'),(335,45,'Thị xã Ba Đồn'),(336,49,'Đông Hà'),(337,49,'Thị xã Quảng Trị'),(338,49,'Huyện Vĩnh Linh'),(339,49,'Huyện Hướng Hóa'),(340,49,'Huyện Gio Linh'),(341,49,'Huyện Đa Krông'),(342,49,'Huyện Cam Lộ'),(343,49,'Huyện Triệu Phong'),(344,49,'Huyện Hải Lăng'),(345,49,'Huyện Cồn Cỏ'),(346,56,'Huế'),(347,56,'Huyện Phong Điền'),(348,56,'Huyện Quảng Điền'),(349,56,'Huyện Phú Vang'),(350,56,'Thị xã Hương Thủy'),(351,56,'Thị xã Hương Trà'),(352,56,'Huyện A Lưới'),(353,56,'Huyện Phú Lộc'),(354,56,'Huyện Nam Đông'),(355,15,'Quận Liên Chiểu'),(356,15,'Quận Thanh Khê'),(357,15,'Quận Hải Châu'),(358,15,'Quận Sơn Trà'),(359,15,'Quận Ngũ Hành Sơn'),(360,15,'Quận Cẩm Lệ'),(361,15,'Huyện Hòa Vang'),(362,15,'Huyện Hoàng Sa'),(363,46,'Tam Kỳ'),(364,46,'Hội An'),(365,46,'Huyện Tây Giang'),(366,46,'Huyện Đông Giang'),(367,46,'Huyện Đại Lộc'),(368,46,'Thị xã Điện Bàn'),(369,46,'Huyện Duy Xuyên'),(370,46,'Huyện Quế Sơn'),(371,46,'Huyện Nam Giang'),(372,46,'Huyện Phước Sơn'),(373,46,'Huyện Hiệp Đức'),(374,46,'Huyện Thăng Bình'),(375,46,'Huyện Tiên Phước'),(376,46,'Huyện Bắc Trà My'),(377,46,'Huyện Nam Trà My'),(378,46,'Huyện Núi Thành'),(379,46,'Huyện Phú Ninh'),(380,46,'Huyện Nông Sơn'),(381,47,'Quảng Ngãi'),(382,47,'Huyện Bình Sơn'),(383,47,'Huyện Trà Bồng'),(384,47,'Huyện Sơn Tịnh'),(385,47,'Huyện Tư Nghĩa'),(386,47,'Huyện Sơn Hà'),(387,47,'Huyện Sơn Tây'),(388,47,'Huyện Minh Long'),(389,47,'Huyện Nghĩa Hành'),(390,47,'Huyện Mộ Đức'),(391,47,'Thị xã Đức Phổ'),(392,47,'Huyện Ba Tơ'),(393,47,'Huyện Lý Sơn'),(394,8,'Quy Nhơn'),(395,8,'Huyện An Lão'),(396,8,'Thị xã Hoài Nhơn'),(397,8,'Huyện Hoài Ân'),(398,8,'Huyện Phù Mỹ'),(399,8,'Huyện Vĩnh Thạnh'),(400,8,'Huyện Tây Sơn'),(401,8,'Huyện Phù Cát'),(402,8,'Thị xã An Nhơn'),(403,8,'Huyện Tuy Phước'),(404,8,'Huyện Vân Canh'),(405,44,'Tuy Hoà'),(406,44,'Thị xã Sông Cầu'),(407,44,'Huyện Đồng Xuân'),(408,44,'Huyện Tuy An'),(409,44,'Huyện Sơn Hòa'),(410,44,'Huyện Sông Hinh'),(411,44,'Huyện Tây Hoà'),(412,44,'Huyện Phú Hoà'),(413,44,'Thị xã Đông Hòa'),(414,31,'Nha Trang'),(415,31,'Cam Ranh'),(416,31,'Huyện Cam Lâm'),(417,31,'Huyện Vạn Ninh'),(418,31,'Thị xã Ninh Hòa'),(419,31,'Huyện Khánh Vĩnh'),(420,31,'Huyện Diên Khánh'),(421,31,'Huyện Khánh Sơn'),(422,31,'Huyện Trường Sa'),(423,42,'Phan Rang-Tháp Chàm'),(424,42,'Huyện Bác Ái'),(425,42,'Huyện Ninh Sơn'),(426,42,'Huyện Ninh Hải'),(427,42,'Huyện Ninh Phước'),(428,42,'Huyện Thuận Bắc'),(429,42,'Huyện Thuận Nam'),(430,11,'Phan Thiết'),(431,11,'Thị xã La Gi'),(432,11,'Huyện Tuy Phong'),(433,11,'Huyện Bắc Bình'),(434,11,'Huyện Hàm Thuận Bắc'),(435,11,'Huyện Hàm Thuận Nam'),(436,11,'Huyện Tánh Linh'),(437,11,'Huyện Đức Linh'),(438,11,'Huyện Hàm Tân'),(439,11,'Huyện Phú Quí'),(440,33,'Kon Tum'),(441,33,'Huyện Đắk Glei'),(442,33,'Huyện Ngọc Hồi'),(443,33,'Huyện Đắk Tô'),(444,33,'Huyện Kon Plông'),(445,33,'Huyện Kon Rẫy'),(446,33,'Huyện Đắk Hà'),(447,33,'Huyện Sa Thầy'),(448,33,'Huyện Tu Mơ Rông'),(449,33,'Huyện Ia H\' Drai'),(450,21,'Pleiku'),(451,21,'Thị xã An Khê'),(452,21,'Thị xã Ayun Pa'),(453,21,'Huyện KBang'),(454,21,'Huyện Đăk Đoa'),(455,21,'Huyện Chư Păh'),(456,21,'Huyện Ia Grai'),(457,21,'Huyện Mang Yang'),(458,21,'Huyện Kông Chro'),(459,21,'Huyện Đức Cơ'),(460,21,'Huyện Chư Prông'),(461,21,'Huyện Chư Sê'),(462,21,'Huyện Đăk Pơ'),(463,21,'Huyện Ia Pa'),(464,21,'Huyện Krông Pa'),(465,21,'Huyện Phú Thiện'),(466,21,'Huyện Chư Pưh'),(467,16,'Buôn Ma Thuột'),(468,16,'Thị Xã Buôn Hồ'),(469,16,'Huyện Ea H\'leo'),(470,16,'Huyện Ea Súp'),(471,16,'Huyện Buôn Đôn'),(472,16,'Huyện Cư M\'gar'),(473,16,'Huyện Krông Búk'),(474,16,'Huyện Krông Năng'),(475,16,'Huyện Ea Kar'),(476,16,'Huyện M\'Đrắk'),(477,16,'Huyện Krông Bông'),(478,16,'Huyện Krông Pắc'),(479,16,'Huyện Krông A Na'),(480,16,'Huyện Lắk'),(481,16,'Huyện Cư Kuin'),(482,17,'Gia Nghĩa'),(483,17,'Huyện Đăk Glong'),(484,17,'Huyện Cư Jút'),(485,17,'Huyện Đắk Mil'),(486,17,'Huyện Krông Nô'),(487,17,'Huyện Đắk Song'),(488,17,'Huyện Đắk R\'Lấp'),(489,17,'Huyện Tuy Đức'),(490,35,'Đà Lạt'),(491,35,'Bảo Lộc'),(492,35,'Huyện Đam Rông'),(493,35,'Huyện Lạc Dương'),(494,35,'Huyện Lâm Hà'),(495,35,'Huyện Đơn Dương'),(496,35,'Huyện Đức Trọng'),(497,35,'Huyện Di Linh'),(498,35,'Huyện Bảo Lâm'),(499,35,'Huyện Đạ Huoai'),(500,35,'Huyện Đạ Tẻh'),(501,35,'Huyện Cát Tiên'),(502,10,'Thị xã Phước Long'),(503,10,'Đồng Xoài'),(504,10,'Thị xã Bình Long'),(505,10,'Huyện Bù Gia Mập'),(506,10,'Huyện Lộc Ninh'),(507,10,'Huyện Bù Đốp'),(508,10,'Huyện Hớn Quản'),(509,10,'Huyện Đồng Phú'),(510,10,'Huyện Bù Đăng'),(511,10,'Huyện Chơn Thành'),(512,10,'Huyện Phú Riềng'),(513,52,'Tây Ninh'),(514,52,'Huyện Tân Biên'),(515,52,'Huyện Tân Châu'),(516,52,'Huyện Dương Minh Châu'),(517,52,'Huyện Châu Thành'),(518,52,'Thị xã Hòa Thành'),(519,52,'Huyện Gò Dầu'),(520,52,'Huyện Bến Cầu'),(521,52,'Thị xã Trảng Bàng'),(522,9,'Thủ Dầu Một'),(523,9,'Huyện Bàu Bàng'),(524,9,'Huyện Dầu Tiếng'),(525,9,'Thị xã Bến Cát'),(526,9,'Huyện Phú Giáo'),(527,9,'Thị xã Tân Uyên'),(528,9,'Dĩ An'),(529,9,'Thuận An'),(530,9,'Huyện Bắc Tân Uyên'),(531,19,'Biên Hòa'),(532,19,'Long Khánh'),(533,19,'Huyện Tân Phú'),(534,19,'Huyện Vĩnh Cửu'),(535,19,'Huyện Định Quán'),(536,19,'Huyện Trảng Bom'),(537,19,'Huyện Thống Nhất'),(538,19,'Huyện Cẩm Mỹ'),(539,19,'Huyện Long Thành'),(540,19,'Huyện Xuân Lộc'),(541,19,'Huyện Nhơn Trạch'),(542,2,'Vũng Tàu'),(543,2,'Bà Rịa'),(544,2,'Huyện Châu Đức'),(545,2,'Huyện Xuyên Mộc'),(546,2,'Huyện Long Điền'),(547,2,'Huyện Đất Đỏ'),(548,2,'Thị xã Phú Mỹ'),(549,2,'Huyện Côn Đảo'),(550,58,'Quận 1'),(551,58,'Quận 12'),(552,58,'Quận Thủ Đức'),(553,58,'Quận 9'),(554,58,'Quận Gò Vấp'),(555,58,'Quận Bình Thạnh'),(556,58,'Quận Tân Bình'),(557,58,'Quận Tân Phú'),(558,58,'Quận Phú Nhuận'),(559,58,'Quận 2'),(560,58,'Quận 3'),(561,58,'Quận 10'),(562,58,'Quận 11'),(563,58,'Quận 4'),(564,58,'Quận 5'),(565,58,'Quận 6'),(566,58,'Quận 8'),(567,58,'Quận Bình Tân'),(568,58,'Quận 7'),(569,58,'Huyện Củ Chi'),(570,58,'Huyện Hóc Môn'),(571,58,'Huyện Bình Chánh'),(572,58,'Huyện Nhà Bè'),(573,58,'Huyện Cần Giờ'),(574,38,'Tân An'),(575,38,'Thị xã Kiến Tường'),(576,38,'Huyện Tân Hưng'),(577,38,'Huyện Vĩnh Hưng'),(578,38,'Huyện Mộc Hóa'),(579,38,'Huyện Tân Thạnh'),(580,38,'Huyện Thạnh Hóa'),(581,38,'Huyện Đức Huệ'),(582,38,'Huyện Đức Hòa'),(583,38,'Huyện Bến Lức'),(584,38,'Huyện Thủ Thừa'),(585,38,'Huyện Tân Trụ'),(586,38,'Huyện Cần Đước'),(587,38,'Huyện Cần Giuộc'),(588,38,'Huyện Châu Thành'),(589,57,'Mỹ Tho'),(590,57,'Thị xã Gò Công'),(591,57,'Thị xã Cai Lậy'),(592,57,'Huyện Tân Phước'),(593,57,'Huyện Cái Bè'),(594,57,'Huyện Cai Lậy'),(595,57,'Huyện Châu Thành'),(596,57,'Huyện Chợ Gạo'),(597,57,'Huyện Gò Công Tây'),(598,57,'Huyện Gò Công Đông'),(599,57,'Huyện Tân Phú Đông'),(600,7,'Bến Tre'),(601,7,'Huyện Châu Thành'),(602,7,'Huyện Chợ Lách'),(603,7,'Huyện Mỏ Cày Nam'),(604,7,'Huyện Giồng Trôm'),(605,7,'Huyện Bình Đại'),(606,7,'Huyện Ba Tri'),(607,7,'Huyện Thạnh Phú'),(608,7,'Huyện Mỏ Cày Bắc'),(609,59,'Trà Vinh'),(610,59,'Huyện Càng Long'),(611,59,'Huyện Cầu Kè'),(612,59,'Huyện Tiểu Cần'),(613,59,'Huyện Châu Thành'),(614,59,'Huyện Cầu Ngang'),(615,59,'Huyện Trà Cú'),(616,59,'Huyện Duyên Hải'),(617,59,'Thị xã Duyên Hải'),(618,61,'Vĩnh Long'),(619,61,'Huyện Long Hồ'),(620,61,'Huyện Mang Thít'),(621,61,'Huyện  Vũng Liêm'),(622,61,'Huyện Tam Bình'),(623,61,'Thị xã Bình Minh'),(624,61,'Huyện Trà Ôn'),(625,61,'Huyện Bình Tân'),(626,20,'Cao Lãnh'),(627,20,'Sa Đéc'),(628,20,'Hồng Ngự'),(629,20,'Huyện Tân Hồng'),(630,20,'Huyện Hồng Ngự'),(631,20,'Huyện Tam Nông'),(632,20,'Huyện Tháp Mười'),(633,20,'Huyện Cao Lãnh'),(634,20,'Huyện Thanh Bình'),(635,20,'Huyện Lấp Vò'),(636,20,'Huyện Lai Vung'),(637,20,'Huyện Châu Thành'),(638,1,'Long Xuyên'),(639,1,'Châu Đốc'),(640,1,'Huyện An Phú'),(641,1,'Thị xã Tân Châu'),(642,1,'Huyện Phú Tân'),(643,1,'Huyện Châu Phú'),(644,1,'Huyện Tịnh Biên'),(645,1,'Huyện Tri Tôn'),(646,1,'Huyện Châu Thành'),(647,1,'Huyện Chợ Mới'),(648,1,'Huyện Thoại Sơn'),(649,32,'Rạch Giá'),(650,32,'Hà Tiên'),(651,32,'Huyện Kiên Lương'),(652,32,'Huyện Hòn Đất'),(653,32,'Huyện Tân Hiệp'),(654,32,'Huyện Châu Thành'),(655,32,'Huyện Giồng Riềng'),(656,32,'Huyện Gò Quao'),(657,32,'Huyện An Biên'),(658,32,'Huyện An Minh'),(659,32,'Huyện Vĩnh Thuận'),(660,32,'Phú Quốc'),(661,32,'Huyện Kiên Hải'),(662,32,'Huyện U Minh Thượng'),(663,32,'Huyện Giang Thành'),(664,13,'Quận Ninh Kiều'),(665,13,'Quận Ô Môn'),(666,13,'Quận Bình Thuỷ'),(667,13,'Quận Cái Răng'),(668,13,'Quận Thốt Nốt'),(669,13,'Huyện Vĩnh Thạnh'),(670,13,'Huyện Cờ Đỏ'),(671,13,'Huyện Phong Điền'),(672,13,'Huyện Thới Lai'),(673,28,'Vị Thanh'),(674,28,'Ngã Bảy'),(675,28,'Huyện Châu Thành A'),(676,28,'Huyện Châu Thành'),(677,28,'Huyện Phụng Hiệp'),(678,28,'Huyện Vị Thuỷ'),(679,28,'Huyện Long Mỹ'),(680,28,'Thị xã Long Mỹ'),(681,50,'Sóc Trăng'),(682,50,'Huyện Châu Thành'),(683,50,'Huyện Kế Sách'),(684,50,'Huyện Mỹ Tú'),(685,50,'Huyện Cù Lao Dung'),(686,50,'Huyện Long Phú'),(687,50,'Huyện Mỹ Xuyên'),(688,50,'Thị xã Ngã Năm'),(689,50,'Huyện Thạnh Trị'),(690,50,'Thị xã Vĩnh Châu'),(691,50,'Huyện Trần Đề'),(692,5,'Bạc Liêu'),(693,5,'Huyện Hồng Dân'),(694,5,'Huyện Phước Long'),(695,5,'Huyện Vĩnh Lợi'),(696,5,'Thị xã Giá Rai'),(697,5,'Huyện Đông Hải'),(698,5,'Huyện Hoà Bình'),(699,12,'Cà Mau'),(700,12,'Huyện U Minh'),(701,12,'Huyện Thới Bình'),(702,12,'Huyện Trần Văn Thời'),(703,12,'Huyện Cái Nước'),(704,12,'Huyện Đầm Dơi'),(705,12,'Huyện Năm Căn'),(706,12,'Huyện Phú Tân'),(707,12,'Huyện Ngọc Hiển');
/*!40000 ALTER TABLE `quanhuyen` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `quyen`
--

DROP TABLE IF EXISTS `quyen`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `quyen` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ten_quyen` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `quyen`
--

LOCK TABLES `quyen` WRITE;
/*!40000 ALTER TABLE `quyen` DISABLE KEYS */;
INSERT INTO `quyen` VALUES (1,'Giám đốc'),(2,'Đào tạo'),(3,'Hồ sơ'),(4,'Tuyển sinh'),(5,'Biên tập'),(6,'Kế toán'),(7,'Học sinh');
/*!40000 ALTER TABLE `quyen` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `taikhoan`
--

DROP TABLE IF EXISTS `taikhoan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `taikhoan` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `id_quyen` int NOT NULL,
  `ngay_tao` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  KEY `id_quyen` (`id_quyen`),
  CONSTRAINT `taikhoan_ibfk_1` FOREIGN KEY (`id_quyen`) REFERENCES `quyen` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `taikhoan`
--

LOCK TABLES `taikhoan` WRITE;
/*!40000 ALTER TABLE `taikhoan` DISABLE KEYS */;
/*!40000 ALTER TABLE `taikhoan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `taikhoan_hs`
--

DROP TABLE IF EXISTS `taikhoan_hs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `taikhoan_hs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ma_temp` varchar(10) NOT NULL,
  `id_hocsinh` varchar(10) DEFAULT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `id_quyen` int NOT NULL,
  `ngay_tao` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ma_temp` (`ma_temp`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `id_hocsinh` (`id_hocsinh`),
  KEY `id_quyen` (`id_quyen`),
  CONSTRAINT `taikhoan_hs_ibfk_1` FOREIGN KEY (`id_quyen`) REFERENCES `quyen` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `taikhoan_hs`
--

LOCK TABLES `taikhoan_hs` WRITE;
/*!40000 ALTER TABLE `taikhoan_hs` DISABLE KEYS */;
INSERT INTO `taikhoan_hs` VALUES (1,'TEMP001','HS001','nguyenvana','hashed_password_1',7,'2025-03-31 00:01:21'),(2,'TEMP002','HS002','tranthib','hashed_password_2',7,'2025-03-31 00:01:21'),(3,'TEMP003','HS003','levanc','hashed_password_3',7,'2025-03-31 00:01:21'),(4,'TEMP004','HS004','hoangminhd','hashed_password_4',7,'2025-03-31 00:01:21'),(5,'TEMP005','HS005','phamthie','hashed_password_5',7,'2025-03-31 00:01:21');
/*!40000 ALTER TABLE `taikhoan_hs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `thanhpho_hq`
--

DROP TABLE IF EXISTS `thanhpho_hq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `thanhpho_hq` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ten_thanhpho` varchar(100) NOT NULL,
  `korean_name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `thanhpho_hq`
--

LOCK TABLES `thanhpho_hq` WRITE;
/*!40000 ALTER TABLE `thanhpho_hq` DISABLE KEYS */;
INSERT INTO `thanhpho_hq` VALUES (1,'Seoul','서울'),(2,'Busan','부산'),(3,'Incheon','인천'),(4,'Daegu','대구'),(5,'Daejeon','대전'),(6,'Gwangju','광주'),(7,'Ulsan','울산'),(8,'Suwon','수원'),(9,'Changwon','창원'),(10,'Seongnam','성남'),(11,'Goyang','고양'),(12,'Yongin','용인'),(13,'Bucheon','부천'),(14,'Ansan','안산'),(15,'Jeonju','전주'),(16,'Cheongju','청주'),(17,'Pohang','포항'),(18,'Uijeongbu','의정부'),(19,'Jeju','제주'),(20,'Chuncheon','춘천');
/*!40000 ALTER TABLE `thanhpho_hq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `thu_hs`
--

DROP TABLE IF EXISTS `thu_hs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `thu_hs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_dm_thu` int NOT NULL,
  `id_hocsinh` varchar(10) NOT NULL,
  `noi_dung` text,
  `so_tien` decimal(15,2) NOT NULL,
  `ngay_thu` date NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_dm_thu` (`id_dm_thu`),
  KEY `id_hocsinh` (`id_hocsinh`),
  CONSTRAINT `thu_hs_ibfk_1` FOREIGN KEY (`id_dm_thu`) REFERENCES `dm_thu` (`id`),
  CONSTRAINT `thu_hs_ibfk_2` FOREIGN KEY (`id_hocsinh`) REFERENCES `hocsinh` (`id_hocsinh`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `thu_hs`
--

LOCK TABLES `thu_hs` WRITE;
/*!40000 ALTER TABLE `thu_hs` DISABLE KEYS */;
INSERT INTO `thu_hs` VALUES (1,1,'HS001','Cọc',5000000.00,'2025-03-01'),(2,2,'HS001','Xử lý hồ sơ và đào tạo kỹ năng tiền xuất cảnh',31000000.00,'2025-03-02'),(3,3,'HS001','Phí dịch vụ và xử lý hồ sơ',34000000.00,'2025-03-03'),(4,4,'HS001','Phí nộp trường Hàn',95000000.00,'2025-03-04'),(5,5,'HS001','Phí nộp bên thứ 3',25000000.00,'2025-03-05');
/*!40000 ALTER TABLE `thu_hs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tiendo_visa`
--

DROP TABLE IF EXISTS `tiendo_visa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tiendo_visa` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_bo_hoso` int NOT NULL,
  `lan_lam` int NOT NULL,
  `dau_do` enum('Chờ xử lý','Đã đạt','Không đạt') DEFAULT 'Chờ xử lý',
  `ngay_xin` date DEFAULT NULL,
  `ngay_tra` date DEFAULT NULL,
  `han_nhap_canh` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_bo_hoso` (`id_bo_hoso`),
  CONSTRAINT `tiendo_visa_ibfk_1` FOREIGN KEY (`id_bo_hoso`) REFERENCES `bo_hoso` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tiendo_visa`
--

LOCK TABLES `tiendo_visa` WRITE;
/*!40000 ALTER TABLE `tiendo_visa` DISABLE KEYS */;
/*!40000 ALTER TABLE `tiendo_visa` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tinhthanh`
--

DROP TABLE IF EXISTS `tinhthanh`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tinhthanh` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ten_tinhthanh` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=64 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tinhthanh`
--

LOCK TABLES `tinhthanh` WRITE;
/*!40000 ALTER TABLE `tinhthanh` DISABLE KEYS */;
INSERT INTO `tinhthanh` VALUES (1,'An Giang'),(2,'Bà Rịa - Vũng Tàu'),(3,'Bắc Giang'),(4,'Bắc Kạn'),(5,'Bạc Liêu'),(6,'Bắc Ninh'),(7,'Bến Tre'),(8,'Bình Định'),(9,'Bình Dương'),(10,'Bình Phước'),(11,'Bình Thuận'),(12,'Cà Mau'),(13,'Cần Thơ'),(14,'Cao Bằng'),(15,'Đà Nẵng'),(16,'Đắk Lắk'),(17,'Đắk Nông'),(18,'Điện Biên'),(19,'Đồng Nai'),(20,'Đồng Tháp'),(21,'Gia Lai'),(22,'Hà Giang'),(23,'Hà Nam'),(24,'Hà Nội'),(25,'Hà Tĩnh'),(26,'Hải Dương'),(27,'Hải Phòng'),(28,'Hậu Giang'),(29,'Hòa Bình'),(30,'Hưng Yên'),(31,'Khánh Hòa'),(32,'Kiên Giang'),(33,'Kon Tum'),(34,'Lai Châu'),(35,'Lâm Đồng'),(36,'Lạng Sơn'),(37,'Lào Cai'),(38,'Long An'),(39,'Nam Định'),(40,'Nghệ An'),(41,'Ninh Bình'),(42,'Ninh Thuận'),(43,'Phú Thọ'),(44,'Phú Yên'),(45,'Quảng Bình'),(46,'Quảng Nam'),(47,'Quảng Ngãi'),(48,'Quảng Ninh'),(49,'Quảng Trị'),(50,'Sóc Trăng'),(51,'Sơn La'),(52,'Tây Ninh'),(53,'Thái Bình'),(54,'Thái Nguyên'),(55,'Thanh Hóa'),(56,'Thừa Thiên Huế'),(57,'Tiền Giang'),(58,'Thành phố Hồ Chí Minh'),(59,'Trà Vinh'),(60,'Tuyên Quang'),(61,'Vĩnh Long'),(62,'Vĩnh Phúc'),(63,'Yên Bái');
/*!40000 ALTER TABLE `tinhthanh` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `truong_hq`
--

DROP TABLE IF EXISTS `truong_hq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `truong_hq` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_thanhpho` int NOT NULL,
  `ten_truong_hq` varchar(100) NOT NULL,
  `korean_name` varchar(100) NOT NULL,
  `xep_hang` tinyint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_thanhpho` (`id_thanhpho`),
  CONSTRAINT `truong_hq_ibfk_1` FOREIGN KEY (`id_thanhpho`) REFERENCES `thanhpho_hq` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `truong_hq`
--

LOCK TABLES `truong_hq` WRITE;
/*!40000 ALTER TABLE `truong_hq` DISABLE KEYS */;
INSERT INTO `truong_hq` VALUES (1,1,'Seoul National University','서울대학교',1),(2,1,'Korea University','고려대학교',2),(3,1,'Yonsei University','연세대학교',2),(4,2,'Pusan National University','부산대학교',2),(5,2,'Dong-A University','동아대학교',3),(6,3,'Inha University','인하대학교',2),(7,3,'University of Incheon','인천대학교',3),(8,4,'Kyungpook National University','경북대학교',2),(9,4,'Daegu Catholic University','대구가톨릭대학교',3),(10,5,'Chungnam National University','충남대학교',2),(11,5,'KAIST','한국과학기술원',1),(12,6,'Gwangju Institute of Science and Technology','광주과학기술원',1),(13,6,'Chonnam National University','전남대학교',2),(14,7,'Ulsan National Institute of Science and Technology','울산과학기술원',1),(15,7,'University of Ulsan','울산대학교',2),(16,8,'Sejong University','세종대학교',3),(17,9,'Kyung Hee University','경희대학교',2),(18,9,'Ajou University','아주대학교',3),(19,10,'Gangwon National University','강원대학교',2),(20,11,'Chungbuk National University','충북대학교',2),(21,12,'Jeonbuk National University','전북대학교',2),(22,13,'Chosun University','조선대학교',3),(23,14,'Gyeongsang National University','경상국립대학교',2),(24,15,'Jeju National University','제주대학교',2);
/*!40000 ALTER TABLE `truong_hq` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-03-31  0:47:00
