
INSERT INTO users (first_name, last_name, email, password, created_at, updated_at) VALUES
('Admin', 'Admin', 'Admin@admin.com', '$2b$10$kkgocHbiNZq8Fu9jVbPAv.5jSftKksvoSC8DJ/GQNQ2S1nUeMr4lu', NOW(), NOW()),
('Sarah', 'Johnson', 'sarah.j@example.com', 'password123', NOW(), NOW()),
('Michael', 'Smith', 'mike.smith@example.com', 'password123', NOW(), NOW()),
('Emma', 'Davis', 'emma.d@example.com', 'password123', NOW(), NOW()),
('David', 'Wilson', 'david.w@example.com', 'password123', NOW(), NOW()),
('Jennifer', 'Brown', 'jen.brown@example.com', 'password123', NOW(), NOW());

INSERT INTO products (title, description, price, image_url, created_at, updated_at) VALUES
('Gaming Laptop', 'High-performance gaming laptop with latest GPU', 1299.99, 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', NOW(), NOW()),
('Wireless Headphones', 'Noise-cancelling Bluetooth headphones', 199.99, 'https://images.unsplash.com/photo-1484704849700-f032a568e944?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', NOW(), NOW()),
('Smart Watch', 'Fitness tracker with heart rate monitor', 149.99, 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=2127&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', NOW(), NOW()),
('4K Monitor', '27-inch 4K Ultra HD Display', 399.99, 'https://images.unsplash.com/photo-1619953942547-233eab5a70d6?q=80&w=2030&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', NOW(), NOW()),
('Mechanical Keyboard', 'RGB Mechanical Gaming Keyboard', 129.99, 'https://plus.unsplash.com/premium_photo-1664194583917-b0ba07c4ce2a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', NOW(), NOW());

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
