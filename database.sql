create database conference;
use conference;

CREATE TABLE admins (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL ,
  password VARCHAR(255) NOT NULL 
);

CREATE TABLE committee (
  id INT PRIMARY KEY AUTO_INCREMENT,
  committee_type VARCHAR(255),
  sub_committee VARCHAR(255),
  name VARCHAR(255),
  role VARCHAR(255),
  organization VARCHAR(255),
  country VARCHAR(255)
);	

CREATE TABLE registrations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  registration_id VARCHAR(50) UNIQUE NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  affiliation VARCHAR(255) NOT NULL,
  designation VARCHAR(100),
  country VARCHAR(100),
  email VARCHAR(255),
  contact_number VARCHAR(50),
  participant_type VARCHAR(50),
  paper_id VARCHAR(100),
  paper_title TEXT,
  num_authors INT,
  sub_category VARCHAR(100),
  region VARCHAR(100),
  attendance_mode VARCHAR(20),
  attend_workshop VARCHAR(10),
  total_fee_usd DECIMAL(10,2),
  total_fee_inr DECIMAL(10,2),
  mode_of_payment VARCHAR(50),
  transaction_id VARCHAR(100),
  date_of_payment DATE,
  payment_proof_path VARCHAR(255),
  declaration BOOLEAN,
  qr_code LONGTEXT,
  payment_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create the admin row yourself: hash a strong password with
-- `node scripts/hash-admin-password.mjs "<password>"` and INSERT the PHC string only.

SELECT * FROM committee;
ALTER TABLE committee CHANGE sub_committee sub_committe VARCHAR(255);
