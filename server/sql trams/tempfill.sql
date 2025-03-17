USE webbshop;

-- Insert sample products
INSERT INTO products (title, description, price, image_url, created_at, updated_at) VALUES
('Gaming Laptop', 'High-performance gaming laptop with latest GPU', 1299.99, 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', NOW(), NOW()),
('Wireless Headphones', 'Noise-cancelling Bluetooth headphones', 199.99, 'https://images.unsplash.com/photo-1484704849700-f032a568e944?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', NOW(), NOW()),
('Smart Watch', 'Fitness tracker with heart rate monitor', 149.99, 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=2127&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', NOW(), NOW()),
('4K Monitor', '27-inch 4K Ultra HD Display', 399.99, 'https://images.unsplash.com/photo-1619953942547-233eab5a70d6?q=80&w=2030&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', NOW(), NOW()),
('Mechanical Keyboard', 'RGB Mechanical Gaming Keyboard', 129.99, 'https://plus.unsplash.com/premium_photo-1664194583917-b0ba07c4ce2a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', NOW(), NOW());


-- Insert sample ratings
INSERT INTO ratings (product_id, rating, created_at, updated_at) VALUES
(1, 4.5, NOW(), NOW()),
(1, 5.0, NOW(), NOW()),
(2, 4.0, NOW(), NOW()),
(3, 4.5, NOW(), NOW()),
(4, 3.5, NOW(), NOW()),
(5, 5.0, NOW(), NOW());
