-- Seed SQL: Curated Local Support Listings for Vienna and Berlin
-- Run this SQL in Supabase Dashboard → SQL Editor
-- This will add curated listings to the local_listings table

-- First, clear existing curated listings to avoid duplicates (optional - comment out if you want to keep existing)
-- DELETE FROM public.local_listings WHERE source = 'curated';

-- ============================================
-- VIENNA, AUSTRIA (AT)
-- ============================================

-- Food & Cafés
INSERT INTO public.local_listings (source, is_active, country_code, city_slug, city_name, category, name, description, address, website_url, tags) VALUES
('curated', true, 'AT', 'vienna', 'Vienna', 'cafe', 'Café Ausnahmsweise', 'Gluten free café offering cakes, pastries, and light meals.', 'Florianigasse 16, 1080 Vienna', 'https://www.ausnahmsweise.at', ARRAY['gluten free', 'cafe', 'dedicated']),

('curated', true, 'AT', 'vienna', 'Vienna', 'restaurant', 'Velani', 'Gluten free restaurant focused on Austrian cuisine.', 'Florianigasse 15, 1080 Vienna', 'https://www.velani.at', ARRAY['gluten free', 'restaurant', 'austrian']),

('curated', true, 'AT', 'vienna', 'Vienna', 'bakery', 'Gustl''s Glutenfrei', 'Dedicated gluten free bakery with bread and desserts.', 'Vienna', NULL, ARRAY['gluten free', 'bakery', 'dedicated']);

-- Medical & Professional Support
INSERT INTO public.local_listings (source, is_active, country_code, city_slug, city_name, category, name, description, address, website_url, tags) VALUES
('curated', true, 'AT', 'vienna', 'Vienna', 'hospital', 'AKH Vienna – Gastroenterology', 'University hospital with expertise in celiac disease and gastrointestinal disorders.', 'Währinger Gürtel 18–20, 1090 Vienna', 'https://www.akhwien.at', ARRAY['hospital', 'gastroenterology', 'celiac']),

('curated', true, 'AT', 'vienna', 'Vienna', 'community', 'Austrian Coeliac Society (ÖDZ)', 'National patient organisation providing education, advocacy, and certification.', 'Vienna', 'https://www.oedz.at', ARRAY['advocacy', 'community', 'certification']);

-- Shops & Services
INSERT INTO public.local_listings (source, is_active, country_code, city_slug, city_name, category, name, description, address, website_url, tags) VALUES
('curated', true, 'AT', 'vienna', 'Vienna', 'shop', 'Billa Plus – Gluten Free Selection', 'Large supermarket chain with dedicated gluten free product ranges.', 'Vienna (multiple locations)', 'https://www.billa.at', ARRAY['supermarket', 'gluten free', 'certified']);

-- Community / Events
INSERT INTO public.local_listings (source, is_active, country_code, city_slug, city_name, category, name, description, address, website_url, tags) VALUES
('curated', true, 'AT', 'vienna', 'Vienna', 'event', 'ÖDZ Vienna Regional Group', 'Regular meetups and educational events for people with celiac disease.', 'Vienna', 'https://www.oedz.at', ARRAY['event', 'community', 'education']);


-- ============================================
-- BERLIN, GERMANY (DE)
-- ============================================

-- Food & Cafés
INSERT INTO public.local_listings (source, is_active, country_code, city_slug, city_name, category, name, description, address, website_url, tags) VALUES
('curated', true, 'DE', 'berlin', 'Berlin', 'bakery', 'Jute Bäckerei', 'Dedicated gluten free bakery with bread, pastries, and cakes.', 'Schönhauser Allee 102, 10439 Berlin', 'https://www.jute-baeckerei.de', ARRAY['gluten free', 'bakery', 'dedicated']),

('curated', true, 'DE', 'berlin', 'Berlin', 'bakery', 'AERA Bread', '100 percent gluten free sourdough bakery with café seating.', 'Kollwitzstraße 87, 10435 Berlin', 'https://aera-bread.de', ARRAY['gluten free', 'sourdough', 'dedicated']),

('curated', true, 'DE', 'berlin', 'Berlin', 'restaurant', 'Velicious', 'Vegan and gluten free friendly café and restaurant.', 'Danziger Str. 33, 10435 Berlin', 'https://velicious.de', ARRAY['gluten free', 'vegan', 'cafe']);

-- Medical & Professional Support
INSERT INTO public.local_listings (source, is_active, country_code, city_slug, city_name, category, name, description, address, website_url, tags) VALUES
('curated', true, 'DE', 'berlin', 'Berlin', 'hospital', 'Charité – Celiac Disease Outpatient Clinic', 'Specialized outpatient clinic for celiac disease and gastrointestinal disorders.', 'Charitéplatz 1, 10117 Berlin', 'https://www.charite.de', ARRAY['hospital', 'gastroenterology', 'celiac']),

('curated', true, 'DE', 'berlin', 'Berlin', 'community', 'German Coeliac Society (DZG) – Berlin', 'German Coeliac Society providing education, certification, and local support groups.', 'Bundesallee 218, 10719 Berlin', 'https://www.dzg-online.de', ARRAY['advocacy', 'community', 'certification']);

-- Shops & Services
INSERT INTO public.local_listings (source, is_active, country_code, city_slug, city_name, category, name, description, address, website_url, tags) VALUES
('curated', true, 'DE', 'berlin', 'Berlin', 'shop', 'Glutenfreie Welt', 'Specialty shop offering certified gluten free products.', 'Berlin (multiple locations)', 'https://www.glutenfreie-welt.de', ARRAY['shop', 'certified', 'gluten free']);

-- Community / Events
INSERT INTO public.local_listings (source, is_active, country_code, city_slug, city_name, category, name, description, address, website_url, tags) VALUES
('curated', true, 'DE', 'berlin', 'Berlin', 'event', 'DZG Regional Group Berlin', 'Regular meetups and educational events for people with celiac disease.', 'Berlin', 'https://www.dzg-online.de/regionale-gruppen', ARRAY['event', 'community', 'education']);


-- ============================================
-- VERIFICATION QUERIES
-- ============================================

-- Count listings by city
SELECT city_name, COUNT(*) as listing_count 
FROM public.local_listings 
WHERE source = 'curated' AND is_active = true
GROUP BY city_name;

-- Count listings by category for Vienna
SELECT category, COUNT(*) as count 
FROM public.local_listings 
WHERE city_slug = 'vienna' AND source = 'curated'
GROUP BY category
ORDER BY count DESC;

-- Count listings by category for Berlin
SELECT category, COUNT(*) as count 
FROM public.local_listings 
WHERE city_slug = 'berlin' AND source = 'curated'
GROUP BY category
ORDER BY count DESC;
