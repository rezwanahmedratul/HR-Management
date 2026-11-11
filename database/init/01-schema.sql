-- HR Database Schema
-- Character set: UTF-8 Unicode

CREATE TABLE IF NOT EXISTS Department (
    department_id INT AUTO_INCREMENT PRIMARY KEY,
    department_name VARCHAR(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS Employee (
    employee_id INT AUTO_INCREMENT PRIMARY KEY,
    employee_name VARCHAR(100) NOT NULL,
    department_id INT NULL,
    email VARCHAR(100) NULL,
    CONSTRAINT fk_employee_department FOREIGN KEY (department_id)
        REFERENCES Department (department_id)
        ON DELETE SET NULL
        ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS Salary (
    salary_id INT AUTO_INCREMENT PRIMARY KEY,
    employee_id INT NULL,
    basic_salary DECIMAL(10, 2) NOT NULL,
    bonus DECIMAL(10, 2) NULL DEFAULT NULL,
    CONSTRAINT fk_salary_employee FOREIGN KEY (employee_id)
        REFERENCES Employee (employee_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS Attendance (
    attendance_id INT AUTO_INCREMENT PRIMARY KEY,
    employee_id INT NULL,
    attendance_date DATE NOT NULL,
    status VARCHAR(50) NOT NULL,
    CONSTRAINT fk_attendance_employee FOREIGN KEY (employee_id)
        REFERENCES Employee (employee_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
