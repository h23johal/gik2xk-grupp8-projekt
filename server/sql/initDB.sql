
INSERT INTO users (first_name, last_name, email, password, created_at, updated_at) VALUES
('Admin', 'Admin', 'Admin@admin.com', '$2b$10$kkgocHbiNZq8Fu9jVbPAv.5jSftKksvoSC8DJ/GQNQ2S1nUeMr4lu', NOW(), NOW()),
('Olivia', 'Taylor', 'olivia.taylor@example.com', 'password123', '2023-11-01 09:00:00', '2023-11-01 09:00:00'),
('Liam', 'Anderson', 'liam.anderson@example.com', 'password123', '2023-11-02 10:15:00', '2023-11-02 10:15:00'),
('Noah', 'Thomas', 'noah.thomas@example.com', 'password123', '2023-11-03 11:30:00', '2023-11-03 11:30:00'),
('Ava', 'Martinez', 'ava.martinez@example.com', 'password123', '2023-11-04 12:45:00', '2023-11-04 12:45:00'),
('William', 'Garcia', 'william.garcia@example.com', 'password123', '2023-11-05 14:00:00', '2023-11-05 14:00:00'),
('Sophia', 'Rodriguez', 'sophia.rodriguez@example.com', 'password123', '2023-11-06 15:15:00', '2023-11-06 15:15:00'),
('James', 'Lee', 'james.lee@example.com', 'password123', '2023-11-07 16:30:00', '2023-11-07 16:30:00'),
('Isabella', 'Hernandez', 'isabella.hernandez@example.com', 'password123', '2023-11-08 17:45:00', '2023-11-08 17:45:00'),
('Benjamin', 'Clark', 'benjamin.clark@example.com', 'password123', '2023-11-09 18:00:00', '2023-11-09 18:00:00'),
('Mia', 'Lewis', 'mia.lewis@example.com', 'password123', '2023-11-10 09:30:00', '2023-11-10 09:30:00'),
('Lucas', 'Walker', 'lucas.walker@example.com', 'password123', '2023-11-11 10:45:00', '2023-11-11 10:45:00'),
('Charlotte', 'Hall', 'charlotte.hall@example.com', 'password123', '2023-11-12 12:00:00', '2023-11-12 12:00:00'),
('Henry', 'Allen', 'henry.allen@example.com', 'password123', '2023-11-13 13:15:00', '2023-11-13 13:15:00'),
('Amelia', 'Young', 'amelia.young@example.com', 'password123', '2023-11-14 14:30:00', '2023-11-14 14:30:00'),
('Alexander', 'King', 'alexander.king@example.com', 'password123', '2023-11-15 15:45:00', '2023-11-15 15:45:00');

INSERT INTO products (title, description, price, image_url, created_at, updated_at) VALUES
('High-Performance Gaming Laptop', 'A high-performance laptop engineered for immersive gaming with the latest GPU and cutting-edge graphics.', 1299.99, 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', '2023-01-15 10:00:00', '2023-01-15 10:00:00'),
('Noise-Cancelling Wireless Headphones', 'Premium Bluetooth headphones with active noise cancellation and rich, immersive sound quality.', 199.99, 'https://images.unsplash.com/photo-1484704849700-f032a568e944?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', '2023-02-20 11:30:00', '2023-02-20 11:30:00'),
('Smart Fitness Watch', 'Monitor your health with a sleek smartwatch featuring an accurate heart rate monitor and an intuitive interface.', 149.99, 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=2127&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', '2023-03-10 09:45:00', '2023-03-10 09:45:00'),
('27-inch 4K Ultra HD Monitor', 'Experience lifelike visuals on a 27-inch display offering 4K resolution, ideal for work and play.', 399.99, 'https://images.unsplash.com/photo-1619953942547-233eab5a70d6?q=80&w=2030&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', '2023-04-05 14:20:00', '2023-04-05 14:20:00'),
('RGB Mechanical Keyboard', 'Enhance your setup with a tactile, RGB-backlit mechanical keyboard built for speed and durability.', 129.99, 'https://plus.unsplash.com/premium_photo-1664194583917-b0ba07c4ce2a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', '2023-05-01 16:00:00', '2023-05-01 16:00:00'),
('Handheld Gaming Console', 'A compact console delivering robust performance and vibrant graphics on the go.', 299.99, 'https://images.unsplash.com/photo-1635514569156-ca58f1247e8d?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', '2023-06-15 12:00:00', '2023-06-15 12:00:00'),
('VR Headset', 'Step into virtual realms with a headset offering crisp visuals and intuitive controls.', 399.99, 'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', '2023-07-10 10:30:00', '2023-07-10 10:30:00'),
('Premium Frisbee', 'Engineered for superior flight dynamics and durability, this frisbee redefines outdoor play.', 29.99, 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1326&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', '2023-08-22 08:15:00', '2023-08-22 08:15:00'),
('Gaming Mouse', 'Experience pinpoint accuracy with an ergonomic gaming mouse featuring customizable buttons for competitive play.', 59.99, 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?q=80&w=1365&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', '2023-09-01 13:00:00', '2023-09-01 13:00:00'),
('High-Fidelity Speakers', 'Deliver crystal-clear audio and booming bass with speakers built for immersive sound performance.', 199.99, 'https://images.unsplash.com/photo-1545454675-3531b543be5d?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', '2023-10-12 15:45:00', '2023-10-12 15:45:00');

INSERT INTO ratings (product_id, rating, user_id, created_at, updated_at) VALUES
(1, 4.5, 2, NOW(), NOW()),
(1, 5.0, 3, NOW(), NOW()),
(2, 4.0, 4, NOW(), NOW()),
(3, 4.5, 5, NOW(), NOW()),
(4, 3.5, 6, NOW(), NOW()),
(5, 5.0, 2, NOW(), NOW());

INSERT INTO ratings (product_id, rating, comment, user_id, created_at, updated_at) VALUES
(1, 5.0, 'This gaming laptop exceeded all my expectations. The GPU handles even the most demanding games with ease, and the cooling system is surprisingly quiet. Battery life is decent for a gaming laptop too!', 2, NOW(), NOW()),
(1, 4.8, 'Great performance for the price. Build quality is excellent and the display is gorgeous with vibrant colors. My only minor complaint is that the keyboard could have better travel.', 3, NOW(), NOW()),
(1, 4.2, 'Solid gaming performance but runs a bit hot during extended sessions. The speakers are surprisingly good for a laptop. Overall happy with my purchase.', 4, NOW(), NOW()),
(1, 3.5, 'Good specs on paper but I experienced some driver issues. Customer support was helpful in resolving them. Decent laptop once everything was properly configured.', 5, NOW(), NOW());

INSERT INTO ratings (product_id, rating, comment, user_id, created_at, updated_at) VALUES
(2, 5.0, 'The noise cancellation on these headphones is absolutely incredible. I use them during my commute and can barely hear any outside noise. Battery life lasts me a full week of daily use.', 6, NOW(), NOW()),
(2, 4.7, 'Very comfortable even for long listening sessions. Sound quality is excellent with deep bass and clear highs. The companion app allows for nice customization.', 2, NOW(), NOW()),
(2, 4.0, 'Good headphones but the ear cushions could be more plush. Noise cancellation works well in most environments. Bluetooth connection is stable.', 5, NOW(), NOW()),
(2, 3.8, 'Sound quality is great but I find them a bit tight on my head after a few hours. Battery life matches what was advertised.', 3, NOW(), NOW());

INSERT INTO ratings (product_id, rating, comment, user_id, created_at, updated_at) VALUES
(3, 4.9, 'This smart watch has transformed my fitness routine. The heart rate monitor is accurate when compared to my gym equipment, and the sleep tracking provides valuable insights.', 4, NOW(), NOW()),
(3, 4.6, 'Excellent battery life - almost a week on a single charge with moderate use. The screen is bright and responsive, and the fitness tracking features work very well.', 6, NOW(), NOW()),
(3, 4.3, 'Good fitness tracker with an intuitive interface. The notifications from my phone are useful without being intrusive. Water resistance works as advertised during swimming.', 2, NOW(), NOW()),
(3, 3.7, 'Decent smartwatch but the companion app could use some improvements. Step counting seems accurate but I question the sleep tracking sometimes.', 3, NOW(), NOW());

INSERT INTO ratings (product_id, rating, comment, user_id, created_at, updated_at) VALUES
(4, 4.8, 'Stunning display quality with excellent color accuracy right out of the box. No dead pixels and minimal backlight bleed. Perfect for both work and entertainment.', 5, NOW(), NOW()),
(4, 4.5, 'The clarity of this 4K monitor is impressive. Text is sharp and colors are vibrant. The adjustable stand makes it easy to find a comfortable viewing position.', 5, NOW(), NOW()),
(4, 4.0, 'Good monitor for the price. The HDR performance is decent though not as impressive as higher-end models. Very satisfied for productivity work and casual gaming.', 4, NOW(), NOW()),
(4, 3.2, 'Picture quality is good but I had some issues with the menu interface being counterintuitive. The built-in speakers are mediocre at best.', 2, NOW(), NOW());

INSERT INTO ratings (product_id, rating, comment, user_id, created_at, updated_at) VALUES
(5, 5.0, 'This mechanical keyboard has transformed my typing experience. The tactile feedback is satisfying and the RGB lighting is customizable to an impressive degree.', 3, NOW(), NOW()),
(5, 4.9, 'Exceptional build quality with a solid metal frame. The switches have a perfect amount of resistance and the sound is satisfying without being too loud for an office environment.', 4, NOW(), NOW()),
(5, 4.7, 'Love this keyboard! The key caps feel durable and the RGB effects are fun to customize. Typing for long periods is comfortable with the included wrist rest.', 4, NOW(), NOW()),
(5, 4.2, 'Good mechanical feel and responsive keys. The software to customize the lighting has a learning curve but offers extensive options once you figure it out.', 6, NOW(), NOW());
USERS