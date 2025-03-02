-- Active: 1739636178828@@127.0.0.1@5432@kursovaya@public
-- Создаем таблицу мастеров
CREATE TABLE masters (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    specialization VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    email VARCHAR(255),
    is_active BOOLEAN DEFAULT true
);

-- Удаляем таблицу если она существует
DROP TABLE IF EXISTS applications;

-- Создаем таблицу applications с полем для мастера
CREATE TABLE applications (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    email VARCHAR(255),
    service VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'pending',
    master_id INTEGER REFERENCES masters(id),
    assigned_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Добавляем индекс для ускорения поиска по статусу
CREATE INDEX idx_applications_status ON applications(status);

-- Добавляем индекс для сортировки по дате создания
CREATE INDEX idx_applications_created_at ON applications(created_at DESC);

-- Добавляем ограничение на возможные значения статуса
ALTER TABLE applications 
ADD CONSTRAINT check_status 
CHECK (status IN ('pending', 'approved', 'rejected'));

-- Добавляем тестовых мастеров
INSERT INTO masters (name, specialization, phone, email) VALUES
('Иван Петров', 'Электроника', '+7 (999) 123-45-67', 'ivan@example.com'),
('Сергей Иванов', 'Механика', '+7 (999) 234-56-78', 'sergey@example.com'),
('Алексей Смирнов', 'Оптика', '+7 (999) 345-67-89', 'alexey@example.com');

INSERT INTO services (img, title)
VALUES
  ('/service1.png', 'Акустические компоненты'),
  ('/service2.png', 'Электронные компоненты'),
  ('/service3.png', 'Механические компоненты'),
  ('/service4.png', 'Оптические компоненты'),
  ('/service5.png', 'Силовые компоненты'),
  ('/service6.png', 'Пассивные компоненты');




