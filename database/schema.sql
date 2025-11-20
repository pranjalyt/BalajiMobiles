-- Balaji Mobiles Database Schema
-- Run this SQL in your Supabase SQL Editor

-- Create phones table
CREATE TABLE IF NOT EXISTS phones (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    brand TEXT NOT NULL,
    price INTEGER NOT NULL CHECK (price > 0),
    condition TEXT NOT NULL CHECK (condition IN ('Good', 'Like New', 'Excellent')),
    description TEXT NOT NULL,
    images TEXT[] NOT NULL,
    storage TEXT NOT NULL,
    battery TEXT,
    available BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on brand for faster filtering
CREATE INDEX IF NOT EXISTS idx_phones_brand ON phones(brand);

-- Create index on available for faster queries
CREATE INDEX IF NOT EXISTS idx_phones_available ON phones(available);

-- Create index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_phones_created_at ON phones(created_at DESC);

-- Enable Row Level Security
ALTER TABLE phones ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read available phones
CREATE POLICY "Public phones are viewable by everyone"
ON phones FOR SELECT
USING (true);

-- Policy: Only authenticated users can insert phones
CREATE POLICY "Authenticated users can insert phones"
ON phones FOR INSERT
TO authenticated
WITH CHECK (true);

-- Policy: Only authenticated users can update phones
CREATE POLICY "Authenticated users can update phones"
ON phones FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- Policy: Only authenticated users can delete phones
CREATE POLICY "Authenticated users can delete phones"
ON phones FOR DELETE
TO authenticated
USING (true);

-- Insert sample data for testing (optional)
INSERT INTO phones (name, brand, price, condition, description, images, storage, battery, available) VALUES
(
    'iPhone 12',
    'iPhone',
    28500,
    'Like New',
    'Excellent condition iPhone 12 with minimal signs of use. Comes with original box and accessories. Battery health at 89%. Perfect working condition with no scratches on screen.',
    ARRAY[
        'https://res.cloudinary.com/demo/image/upload/sample.jpg',
        'https://res.cloudinary.com/demo/image/upload/sample.jpg'
    ],
    '128GB',
    '89%',
    true
),
(
    'Samsung Galaxy S21',
    'Samsung',
    22000,
    'Good',
    'Well-maintained Samsung Galaxy S21. Minor scratches on back panel but screen is pristine. All features working perfectly. Comes with charger and case.',
    ARRAY[
        'https://res.cloudinary.com/demo/image/upload/sample.jpg',
        'https://res.cloudinary.com/demo/image/upload/sample.jpg'
    ],
    '256GB',
    '85%',
    true
),
(
    'OnePlus 9 Pro',
    'OnePlus',
    24500,
    'Excellent',
    'Premium OnePlus 9 Pro in excellent condition. Barely used, looks brand new. Hasselblad camera system working flawlessly. Includes original packaging.',
    ARRAY[
        'https://res.cloudinary.com/demo/image/upload/sample.jpg',
        'https://res.cloudinary.com/demo/image/upload/sample.jpg'
    ],
    '256GB',
    '92%',
    true
);

-- Verify the table was created
SELECT * FROM phones;
