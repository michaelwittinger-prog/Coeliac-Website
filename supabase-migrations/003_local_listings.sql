-- Migration: Create local_listings table for structured local support directory
-- Run this SQL in Supabase Dashboard → SQL Editor

-- 1. Create the local_listings table
CREATE TABLE IF NOT EXISTS public.local_listings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Source tracking
  source text NOT NULL DEFAULT 'curated' CHECK (source IN ('curated', 'community')),
  submission_id uuid REFERENCES public.user_submissions(id) ON DELETE SET NULL,
  is_active boolean NOT NULL DEFAULT true,
  
  -- Location
  country_code text NOT NULL,  -- ISO code like AT, DE
  city_slug text NOT NULL,     -- lowercase: vienna, berlin
  city_name text NOT NULL,     -- Display name: Vienna, Berlin
  
  -- Category
  category text NOT NULL CHECK (category IN (
    'restaurant', 'cafe', 'bakery', 'hotel', 
    'doctor', 'dietitian', 'pharmacy', 'hospital',
    'shop', 'event', 'community', 'other'
  )),
  
  -- Listing details
  name text NOT NULL,
  description text,
  address text,
  district text,
  website_url text,
  maps_url text,
  phone text,
  
  -- Geolocation (optional)
  lat numeric,
  lng numeric,
  
  -- Tags for flexible categorization
  tags text[],
  
  -- Timestamps
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 2. Create indexes for efficient querying
CREATE INDEX IF NOT EXISTS idx_local_listings_location 
ON public.local_listings(country_code, city_slug);

CREATE INDEX IF NOT EXISTS idx_local_listings_location_category 
ON public.local_listings(country_code, city_slug, category);

CREATE INDEX IF NOT EXISTS idx_local_listings_is_active 
ON public.local_listings(is_active);

CREATE INDEX IF NOT EXISTS idx_local_listings_source 
ON public.local_listings(source);

-- 3. Enable Row Level Security
ALTER TABLE public.local_listings ENABLE ROW LEVEL SECURITY;

-- 4. RLS Policies

-- Public can view active listings
CREATE POLICY "Public can view active listings"
  ON public.local_listings
  FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

-- Admins can do everything (we'll use service role for admin operations)
-- No explicit admin policy needed since we use service role key

-- 5. Grant permissions
GRANT SELECT ON public.local_listings TO anon;
GRANT SELECT ON public.local_listings TO authenticated;

-- 6. Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_local_listings_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 7. Create trigger for updated_at
DROP TRIGGER IF EXISTS local_listings_updated_at ON public.local_listings;
CREATE TRIGGER local_listings_updated_at
  BEFORE UPDATE ON public.local_listings
  FOR EACH ROW
  EXECUTE FUNCTION update_local_listings_updated_at();

-- 8. Insert sample curated listings for Vienna
INSERT INTO public.local_listings (source, country_code, city_slug, city_name, category, name, description, address, district, website_url) VALUES
('curated', 'AT', 'vienna', 'Vienna', 'community', 'Österreichische Arbeitsgemeinschaft Zöliakie', 'The Austrian Coeliac Society providing support, information, and advocacy for people with coeliac disease throughout Austria.', 'Antonsplatz 16, 1100 Wien', '10th', 'https://www.zoeliakie.or.at/'),
('curated', 'AT', 'vienna', 'Vienna', 'shop', 'Denn''s Biomarkt', 'Organic supermarket with extensive gluten-free section including fresh bread, pasta, and specialty items.', 'Mariahilfer Straße 45, 1060 Wien', '6th', 'https://www.denns-biomarkt.at/'),
('curated', 'AT', 'vienna', 'Vienna', 'shop', 'Reformstark Martin', 'Health food store chain in Vienna with dedicated gluten-free products, natural remedies, and knowledgeable staff.', 'Wien Mitte The Mall, Landstraßer Hauptstraße 1b, 1030 Wien', '3rd', 'https://www.reformstark.at/'),
('curated', 'AT', 'vienna', 'Vienna', 'restaurant', 'Swing Kitchen', 'Vegan fast food chain with clearly marked gluten-free options and staff trained in allergen awareness.', 'Schottenfeldgasse 3, 1070 Wien', '7th', 'https://www.swingkitchen.com/'),
('curated', 'AT', 'vienna', 'Vienna', 'hospital', 'Medical University of Vienna - Gastroenterology', 'Vienna''s leading university hospital with specialists experienced in coeliac disease diagnosis and management at AKH Wien.', 'Währinger Gürtel 18-20, 1090 Wien', '9th', 'https://www.meduniwien.ac.at/'),
('curated', 'AT', 'vienna', 'Vienna', 'shop', 'Bio Company', 'Large organic supermarket near Prater with comprehensive gluten-free product range.', 'Praterstraße 42, 1020 Wien', '2nd', 'https://www.biocompany.de/'),
('curated', 'AT', 'vienna', 'Vienna', 'restaurant', 'Tian Bistro', 'Upscale vegetarian restaurant with dedicated gluten-free menu options and allergy-aware kitchen practices.', 'Himmelpfortgasse 23, 1010 Wien', '1st', 'https://www.tian-bistro.com/');

-- 9. Insert sample curated listings for Berlin
INSERT INTO public.local_listings (source, country_code, city_slug, city_name, category, name, description, address, district, website_url) VALUES
('curated', 'DE', 'berlin', 'Berlin', 'community', 'Deutsche Zöliakie Gesellschaft (DZG)', 'The German Coeliac Society offering support, resources, and a certified gluten-free product list.', 'Kupferstraße 36, 70565 Stuttgart', NULL, 'https://www.dzg-online.de/'),
('curated', 'DE', 'berlin', 'Berlin', 'bakery', 'Jute Bäckerei', 'Dedicated gluten-free bakery offering fresh bread, pastries, and cakes. Everything is 100% gluten-free.', 'Invalidenstraße 157, 10115 Berlin', 'Mitte', 'https://www.jute-baeckerei.de/'),
('curated', 'DE', 'berlin', 'Berlin', 'restaurant', 'Chutnify', 'South Indian restaurant with excellent gluten-free options. Staff well-trained in allergen management.', 'Sredzkistraße 43, 10435 Berlin', 'Prenzlauer Berg', 'https://www.chutnify.com/'),
('curated', 'DE', 'berlin', 'Berlin', 'shop', 'Bio Company Berlin', 'Organic supermarket chain with extensive gluten-free sections in multiple Berlin locations.', 'Various locations across Berlin', NULL, 'https://www.biocompany.de/'),
('curated', 'DE', 'berlin', 'Berlin', 'cafe', 'Café Vélo', 'Cozy café with gluten-free cake options and understanding staff. Always ask about daily gluten-free offerings.', 'Oderberger Str. 21, 10435 Berlin', 'Prenzlauer Berg', NULL),
('curated', 'DE', 'berlin', 'Berlin', 'restaurant', 'Daluma', 'Health-focused restaurant with clearly labeled gluten-free bowls and dishes. Great for safe dining.', 'Weinbergsweg 3, 10119 Berlin', 'Mitte', 'https://www.daluma.de/'),
('curated', 'DE', 'berlin', 'Berlin', 'shop', 'Veganz', 'Vegan supermarket with good gluten-free selection and clear labeling.', 'Warschauer Str. 33, 10243 Berlin', 'Friedrichshain', 'https://www.veganz.de/'),
('curated', 'DE', 'berlin', 'Berlin', 'doctor', 'Charité Gastroenterology', 'Major university hospital with experienced gastroenterologists for coeliac diagnosis and follow-up care.', 'Charitéplatz 1, 10117 Berlin', 'Mitte', 'https://www.charite.de/'),
('curated', 'DE', 'berlin', 'Berlin', 'bakery', 'Glutanada', 'Another excellent dedicated gluten-free bakery with breads, rolls, and sweet treats.', 'Graefestraße 11, 10967 Berlin', 'Kreuzberg', NULL),
('curated', 'DE', 'berlin', 'Berlin', 'restaurant', 'Cookies Cream', 'Upscale vegetarian restaurant that can accommodate gluten-free diners with advance notice.', 'Behrenstraße 55, 10117 Berlin', 'Mitte', 'https://www.cookiescream.com/');
