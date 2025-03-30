CREATE DATABASE QUANLYDUHOC;
USE QUANLYDUHOC;

CREATE TABLE quyen (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ten_quyen VARCHAR(50) NOT NULL
);

-- Bảng tài khoản
CREATE TABLE taikhoan (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    id_quyen INT NOT NULL,
    ngay_tao DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_quyen) REFERENCES quyen(id)
);

-- Bảng tài khoản học sinh
CREATE TABLE taikhoan_hs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ma_temp VARCHAR(10) NOT NULL UNIQUE,
    id_hocsinh VARCHAR(10) UNIQUE,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    id_quyen INT NOT NULL,
    ngay_tao DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_quyen) REFERENCES quyen(id)
);


CREATE TABLE tinhthanh (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ten_tinhthanh VARCHAR(100) NOT NULL
);

-- Bảng quận huyện
CREATE TABLE quanhuyen (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_tinhthanh INT NOT NULL,
    ten_quanhuyen VARCHAR(100) NOT NULL,
    FOREIGN KEY (id_tinhthanh) REFERENCES tinhthanh(id)
);

-- Bảng thành phố Hàn Quốc
CREATE TABLE thanhpho_hq (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ten_thanhpho VARCHAR(100) NOT NULL,
    korean_name VARCHAR(100) NOT NULL
);

SELECT u.id, u.ten_truong_hq AS university, u.korean_name AS uni_korean, 
       p.ten_thanhpho AS province, p.korean_name AS province_korean, u.xep_hang
FROM truong_hq u
JOIN thanhpho_hq p ON u.id_thanhpho = p.id
ORDER BY p.id, u.xep_hang;


CREATE TABLE truong_hq (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_thanhpho INT NOT NULL,
    ten_truong_hq VARCHAR(100) NOT NULL,
    korean_name VARCHAR(100) NOT NULL,
    xep_hang TINYINT,
    FOREIGN KEY (id_thanhpho) REFERENCES thanhpho_hq(id)
);


CREATE TABLE dm_hoso (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ten_dm_hoso VARCHAR(100) NOT NULL
);

CREATE TABLE hocsinh (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_hocsinh VARCHAR(10) UNIQUE,
    ten_hs VARCHAR(100) NOT NULL,
    dob DATE,
    gioitinh ENUM('Nam', 'Nữ', 'Khác'),
    email VARCHAR(100),
    sdt VARCHAR(10),
    link_fb VARCHAR(255),
	grade_10 DECIMAL(4,2) CHECK (grade_10 BETWEEN 0.00 AND 10.00),
	grade_11 DECIMAL(4,2) CHECK (grade_11 BETWEEN 0.00 AND 10.00),
	grade_12 DECIMAL(4,2) CHECK (grade_12 BETWEEN 0.00 AND 10.00),
    id_quanhuyen INT,
    diachi_chitiet TEXT,
    ngay_dk DATETIME DEFAULT CURRENT_TIMESTAMP,
    status ENUM('Chờ xử lý', 'Đã duyệt', 'Từ chối') DEFAULT 'Chờ xử lý',
    FOREIGN KEY (id_quanhuyen) REFERENCES quanhuyen(id)
);


CREATE TABLE bo_hoso (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_hocsinh VARCHAR(10) NOT NULL,
    ten_bo_hoso VARCHAR(150) NOT NULL,
    ngay_tao DATETIME DEFAULT CURRENT_TIMESTAMP,
    status ENUM('Đang chuẩn bị', 'Đã nộp', 'Đã duyệt', 'Từ chối') DEFAULT 'Đang chuẩn bị',
    FOREIGN KEY (id_hocsinh) REFERENCES hocsinh(id_hocsinh)
);

CREATE TABLE ho_so (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_bo_hoso INT NOT NULL,
    id_dm_hoso INT NOT NULL,
	link VARCHAR(255),
    index_trang INT,
    ngay_up DATETIME DEFAULT CURRENT_TIMESTAMP,
    ngay_sua DATETIME,
    FOREIGN KEY (id_bo_hoso) REFERENCES bo_hoso(id),
    FOREIGN KEY (id_dm_hoso) REFERENCES dm_hoso(id)
);

CREATE TABLE nguyenvong (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_bo_hoso INT NOT NULL,
    id_truong_hq INT NOT NULL,
    thu_tu INT NOT NULL,
    FOREIGN KEY (id_bo_hoso) REFERENCES bo_hoso(id),
    FOREIGN KEY (id_truong_hq) REFERENCES truong_hq(id)
);

CREATE TABLE tiendo_visa (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_bo_hoso INT NOT NULL,
    lan_lam INT NOT NULL,
    dau_do ENUM('Chờ xử lý', 'Đã đạt', 'Không đạt') DEFAULT 'Chờ xử lý',
    ngay_xin DATE,
    ngay_tra DATE,
    han_nhap_canh DATE,
    FOREIGN KEY (id_bo_hoso) REFERENCES bo_hoso(id)
);


CREATE TABLE nguoi_than (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_hocsinh VARCHAR(10) NOT NULL,
    ten_nguoithan VARCHAR(100) NOT NULL,
    quan_he VARCHAR(50) NOT NULL,
    sdt VARCHAR(15),
    loai_stk ENUM('Sổ Hàn', 'Sổ Việt', 'Khác'),
    FOREIGN KEY (id_hocsinh) REFERENCES hocsinh(id_hocsinh)
);

CREATE TABLE giayphep_kinhdoanh (
    id INT AUTO_INCREMENT PRIMARY KEY,
    maso_gpkd VARCHAR(50) UNIQUE,
    id_nguoi_than INT NOT NULL,
    nghe_nghiep VARCHAR(100),
    thu_nhap_thang DECIMAL(15,2),
    FOREIGN KEY (id_nguoi_than) REFERENCES nguoi_than(id)
);

CREATE TABLE ky_hoc (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ten_kyhoc VARCHAR(50) NOT NULL,
    ngaybd DATE NOT NULL,
    ngaykt DATE NOT NULL
);

CREATE TABLE phonghoc (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ten_phonghoc VARCHAR(50) NOT NULL
);

CREATE TABLE giaovien (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ten_giaovien VARCHAR(100) NOT NULL,
    dob DATE,
    gioitinh ENUM('Nam', 'Nữ', 'Khác'),
    sdt VARCHAR(10),
    email VARCHAR(100) UNIQUE
);

CREATE TABLE lophoc (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_kyhoc INT NOT NULL,
    id_giaovien INT NOT NULL,
    id_phonghoc INT NOT NULL,
    ten_lop VARCHAR(50) NOT NULL,
    soluong_hs INT DEFAULT 0,
    FOREIGN KEY (id_kyhoc) REFERENCES ky_hoc(id),
    FOREIGN KEY (id_giaovien) REFERENCES giaovien(id),
    FOREIGN KEY (id_phonghoc) REFERENCES phonghoc(id)
);

CREATE TABLE lichhoc (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_lophoc INT NOT NULL,
    thu_trong_tuan TINYINT NOT NULL,
    gio_bd TIME NOT NULL,
    gio_kt TIME NOT NULL,
    FOREIGN KEY (id_lophoc) REFERENCES lophoc(id)
);

CREATE TABLE dangky_hoc (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_hocsinh VARCHAR(10) NOT NULL,
    id_lophoc INT NOT NULL,
    FOREIGN KEY (id_hocsinh) REFERENCES hocsinh(id_hocsinh),
    FOREIGN KEY (id_lophoc) REFERENCES lophoc(id),
    UNIQUE KEY unique_dangky (id_hocsinh, id_lophoc)
);

CREATE TABLE diem_danh (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_dangky_hoc INT NOT NULL,
    ngay_dd DATE NOT NULL,
    status ENUM('Có mặt', 'Vắng có phép', 'Vắng không phép') DEFAULT 'Có mặt',
    FOREIGN KEY (id_dangky_hoc) REFERENCES dangky_hoc(id),
    UNIQUE KEY unique_diemdanh (id_dangky_hoc, ngay_dd)
);

CREATE TABLE loai_baiviet (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ten_dm_baiviet VARCHAR(100) NOT NULL
);

CREATE TABLE baiviet (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_loai_baiviet INT NOT NULL,
    tieu_de VARCHAR(255) NOT NULL,
    noi_dung TEXT,
    thumbnail VARCHAR(255),
    ngay_up DATETIME DEFAULT CURRENT_TIMESTAMP,
    ngay_sua DATETIME,
    status ENUM('Bản nháp', 'Công khai', 'Riêng tư') DEFAULT 'Bản nháp',
    FOREIGN KEY (id_loai_baiviet) REFERENCES loai_baiviet(id)
);

CREATE TABLE anh_baiviet (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_baiviet INT NOT NULL,
    anh VARCHAR(255) NOT NULL,
    FOREIGN KEY (id_baiviet) REFERENCES baiviet(id)
);

CREATE TABLE dm_thu (
    id INT AUTO_INCREMENT PRIMARY KEY,
    loai_thu VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE thu_hs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_dm_thu INT NOT NULL,
    id_hocsinh VARCHAR(10) NOT NULL,
    noi_dung TEXT,
    so_tien DECIMAL(15,2) NOT NULL,
    ngay_thu DATE NOT NULL,
    FOREIGN KEY (id_dm_thu) REFERENCES dm_thu(id),
    FOREIGN KEY (id_hocsinh) REFERENCES hocsinh(id_hocsinh)
);

CREATE TABLE lienhe (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ten_khachhang VARCHAR(100) NOT NULL,
    sdt VARCHAR(10) NOT NULL,
    status ENUM('Chưa liên hệ', 'Đã liên hệ', 'Đã tư vấn', 'Không liên hệ được') DEFAULT 'Chưa liên hệ',
    kenh_tiep_can VARCHAR(100)
);


