-- ============================================================
-- PRAYUDDHA 2K26 SECURE PRODUCTION DATABASE SCHEMA FOR SUPABASE
-- Run this script in your Supabase SQL Editor to create all required
-- tables, storage buckets, and secure row-level security (RLS) policies.
-- ============================================================

-- 1. Site Configuration & Registration Info Table
CREATE TABLE IF NOT EXISTS site_config (
  id TEXT PRIMARY KEY DEFAULT 'default',
  site_name TEXT NOT NULL DEFAULT 'PRAYUDDHA 2K26',
  edition TEXT NOT NULL DEFAULT '2K26',
  motto TEXT NOT NULL DEFAULT 'Unleash. Innovate. Conquer.',
  slogan TEXT NOT NULL DEFAULT 'IDEAS IGNITE IMPACTS',
  tagline TEXT NOT NULL DEFAULT 'LET THE IDEAS BATTLE',
  symposium_identity TEXT NOT NULL DEFAULT 'A SYMPOSIUM • BEYOND • BOUNDARIES',
  event_date TEXT NOT NULL DEFAULT '09 October 2026',
  event_date_short TEXT NOT NULL DEFAULT 'October 9, 2026',
  event_day TEXT NOT NULL DEFAULT 'Friday',
  event_time TEXT NOT NULL DEFAULT '9:00 AM onwards',
  countdown_date TEXT NOT NULL DEFAULT '2026-10-09T09:00:00+05:30',
  venue TEXT NOT NULL DEFAULT 'Dr. A.P.J. Abdul Kalam Auditorium, B-Block',
  institution TEXT NOT NULL DEFAULT 'University College of Engineering (BIT) Campus',
  university TEXT NOT NULL DEFAULT 'Anna University',
  city TEXT NOT NULL DEFAULT 'Tiruchirappalli',
  pincode TEXT NOT NULL DEFAULT '620024',
  state TEXT NOT NULL DEFAULT 'Tamil Nadu',
  google_form_url TEXT NOT NULL DEFAULT 'https://docs.google.com/forms/d/e/1FAIpQLScJBrmOymB9yixizaYP8SRDUXp4h-cMwWDTxqCBSI5szyfQgA/viewform',
  registration_status TEXT NOT NULL DEFAULT 'OPEN',
  registration_btn_text TEXT NOT NULL DEFAULT 'Register Now',
  registration_fee TEXT NOT NULL DEFAULT '₹299',
  upi_phone TEXT NOT NULL DEFAULT '9751600742',
  qr_code_url TEXT NOT NULL DEFAULT '/images/qr/registration-google-form-qr.png',
  google_maps_url TEXT NOT NULL DEFAULT 'https://www.google.com/maps/place/Anna+University+RO+Tiruchirappalli/@10.6581513,78.7423525,17z',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Announcements / Notices Table
CREATE TABLE IF NOT EXISTS announcements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'info', -- 'info', 'urgent', 'warning'
  priority INTEGER DEFAULT 1,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Gallery Photos Table
CREATE TABLE IF NOT EXISTS gallery (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL DEFAULT 'Inauguration', -- 'Inauguration', 'Events', 'Behind the Scenes', 'Venue', 'Other'
  image_url TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  is_published BOOLEAN DEFAULT true,
  date TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Official Poster Table
CREATE TABLE IF NOT EXISTS poster (
  id TEXT PRIMARY KEY DEFAULT 'default',
  poster_url TEXT NOT NULL DEFAULT '/images/poster/prayuddha-2k26-official-poster.png',
  caption TEXT DEFAULT 'PRAYUDDHA 2K26 Official Symposium Poster',
  is_published BOOLEAN DEFAULT true,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Official 2-Page Brochure Table
CREATE TABLE IF NOT EXISTS brochure (
  id TEXT PRIMARY KEY DEFAULT 'default',
  page1_url TEXT NOT NULL DEFAULT '/images/brochure/brochure-page-1.png',
  page2_url TEXT NOT NULL DEFAULT '/images/brochure/brochure-page-2.png',
  title TEXT DEFAULT 'PRAYUDDHA 2K26 Official Brochure',
  is_published BOOLEAN DEFAULT true,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Events Table
CREATE TABLE IF NOT EXISTS events (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL, -- 'Technical' or 'Non-Technical'
  tagline TEXT,
  description TEXT NOT NULL,
  concept TEXT,
  rules JSONB DEFAULT '[]'::jsonb,
  rounds_details JSONB DEFAULT '[]'::jsonb,
  evaluation_criteria JSONB DEFAULT '[]'::jsonb,
  winner_criteria TEXT,
  skills_tested JSONB DEFAULT '[]'::jsonb,
  team_size TEXT NOT NULL,
  fee TEXT DEFAULT 'Single Entry Fee',
  duration TEXT DEFAULT 'TBA',
  rounds TEXT DEFAULT 'TBA',
  eligibility TEXT DEFAULT 'Open to all college students',
  prizes TEXT NOT NULL,
  first_prize TEXT,
  second_prize TEXT,
  image TEXT NOT NULL DEFAULT 'code',
  registration_link TEXT DEFAULT 'TBA',
  status TEXT NOT NULL DEFAULT 'Open', -- 'Open', 'Coming Soon', 'Closed', 'Full'
  display_order INTEGER DEFAULT 0,
  is_published BOOLEAN DEFAULT true,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Team & Core Committee Table
CREATE TABLE IF NOT EXISTS team (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  initial TEXT,
  role TEXT NOT NULL,
  phone TEXT,
  photo_url TEXT,
  priority BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. Centralized Contact Configuration Table
CREATE TABLE IF NOT EXISTS contact_config (
  id TEXT PRIMARY KEY DEFAULT 'default',
  email TEXT NOT NULL DEFAULT 'prayuddha2k26@gmail.com',
  phone1 TEXT NOT NULL DEFAULT '9884526924',
  phone2 TEXT NOT NULL DEFAULT '7603934990',
  whatsapp_url TEXT NOT NULL DEFAULT 'https://chat.whatsapp.com/EWYDbkcT7US2GPasizlxlT',
  instagram_handle TEXT NOT NULL DEFAULT '@prayuddha2k26',
  address TEXT NOT NULL DEFAULT 'University College of Engineering (BIT) Campus, Anna University, Tiruchirappalli – 620024',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. Travel & Reach Us Routes Table
CREATE TABLE IF NOT EXISTS travel_routes (
  id TEXT PRIMARY KEY DEFAULT 'default',
  venue_name TEXT NOT NULL DEFAULT 'Dr. A.P.J. Abdul Kalam Auditorium',
  b_block_info TEXT NOT NULL DEFAULT 'Inauguration Ceremony & Prize Distribution (Valedictory)',
  c_block_info TEXT NOT NULL DEFAULT 'All Technical & Non-Technical Event Competitions',
  trichy_route_info TEXT NOT NULL DEFAULT 'Buses run frequently from Trichy Central Bus Stand / Chathiram Bus Stand towards Keeranur / Pudukkottai route. Get down at Anna University / BIT Campus stop.',
  keeranur_route_info TEXT NOT NULL DEFAULT 'Frequent buses available from Keeranur side taking the Trichy direction / BIT Campus route. Get down at BIT Campus stop.',
  fare_estimate TEXT NOT NULL DEFAULT '₹15 – ₹30 depending on starting point',
  google_maps_url TEXT NOT NULL DEFAULT 'https://www.google.com/maps/place/Anna+University+RO+Tiruchirappalli/@10.6581513,78.7423525,17z',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. Schedule Items Table
CREATE TABLE IF NOT EXISTS schedule (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  time_range TEXT NOT NULL,
  programme TEXT NOT NULL,
  venue TEXT DEFAULT 'BIT Campus',
  is_break BOOLEAN DEFAULT false,
  is_end BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. Prizes Overview Table
CREATE TABLE IF NOT EXISTS prizes (
  id TEXT PRIMARY KEY DEFAULT 'default',
  tech_first TEXT NOT NULL DEFAULT '₹1,000',
  tech_second TEXT NOT NULL DEFAULT '₹500',
  non_tech_first TEXT NOT NULL DEFAULT 'Prizes / Gifts (TBA)',
  non_tech_second TEXT NOT NULL DEFAULT 'Prizes / Gifts (TBA)',
  overall_championship TEXT NOT NULL DEFAULT 'Overall Championship Trophy (TBA)',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- Enable RLS for all 11 tables
-- ============================================================

ALTER TABLE site_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE poster ENABLE ROW LEVEL SECURITY;
ALTER TABLE brochure ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE team ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE travel_routes ENABLE ROW LEVEL SECURITY;
ALTER TABLE schedule ENABLE ROW LEVEL SECURITY;
ALTER TABLE prizes ENABLE ROW LEVEL SECURITY;

-- Clean up any legacy or duplicate policies if present
DROP POLICY IF EXISTS "Public Read Site Config" ON site_config;
DROP POLICY IF EXISTS "Admin All Site Config" ON site_config;
DROP POLICY IF EXISTS "Admin Write Site Config" ON site_config;

DROP POLICY IF EXISTS "Public Read Announcements" ON announcements;
DROP POLICY IF EXISTS "Admin All Announcements" ON announcements;
DROP POLICY IF EXISTS "Admin Write Announcements" ON announcements;

DROP POLICY IF EXISTS "Public Read Gallery" ON gallery;
DROP POLICY IF EXISTS "Admin All Gallery" ON gallery;
DROP POLICY IF EXISTS "Admin Write Gallery" ON gallery;

DROP POLICY IF EXISTS "Public Read Poster" ON poster;
DROP POLICY IF EXISTS "Admin All Poster" ON poster;
DROP POLICY IF EXISTS "Admin Write Poster" ON poster;

DROP POLICY IF EXISTS "Public Read Brochure" ON brochure;
DROP POLICY IF EXISTS "Admin All Brochure" ON brochure;
DROP POLICY IF EXISTS "Admin Write Brochure" ON brochure;

DROP POLICY IF EXISTS "Public Read Events" ON events;
DROP POLICY IF EXISTS "Admin All Events" ON events;
DROP POLICY IF EXISTS "Admin Write Events" ON events;

DROP POLICY IF EXISTS "Public Read Team" ON team;
DROP POLICY IF EXISTS "Admin All Team" ON team;
DROP POLICY IF EXISTS "Admin Write Team" ON team;

DROP POLICY IF EXISTS "Public Read Contact" ON contact_config;
DROP POLICY IF EXISTS "Admin All Contact" ON contact_config;
DROP POLICY IF EXISTS "Admin Write Contact" ON contact_config;

DROP POLICY IF EXISTS "Public Read Travel" ON travel_routes;
DROP POLICY IF EXISTS "Admin All Travel" ON travel_routes;
DROP POLICY IF EXISTS "Admin Write Travel" ON travel_routes;

DROP POLICY IF EXISTS "Public Read Schedule" ON schedule;
DROP POLICY IF EXISTS "Admin All Schedule" ON schedule;
DROP POLICY IF EXISTS "Admin Write Schedule" ON schedule;

DROP POLICY IF EXISTS "Public Read Prizes" ON prizes;
DROP POLICY IF EXISTS "Admin All Prizes" ON prizes;
DROP POLICY IF EXISTS "Admin Write Prizes" ON prizes;

-- ============================================================
-- 1. PUBLIC READ ACCESS POLICIES (Unauthenticated Visitor Access)
-- ============================================================

CREATE POLICY "Public Read Site Config" ON site_config FOR SELECT USING (true);
CREATE POLICY "Public Read Announcements" ON announcements FOR SELECT USING (true);
CREATE POLICY "Public Read Gallery" ON gallery FOR SELECT USING (true);
CREATE POLICY "Public Read Poster" ON poster FOR SELECT USING (true);
CREATE POLICY "Public Read Brochure" ON brochure FOR SELECT USING (true);
CREATE POLICY "Public Read Events" ON events FOR SELECT USING (true);
CREATE POLICY "Public Read Team" ON team FOR SELECT USING (true);
CREATE POLICY "Public Read Contact" ON contact_config FOR SELECT USING (true);
CREATE POLICY "Public Read Travel" ON travel_routes FOR SELECT USING (true);
CREATE POLICY "Public Read Schedule" ON schedule FOR SELECT USING (true);
CREATE POLICY "Public Read Prizes" ON prizes FOR SELECT USING (true);

-- ============================================================
-- 2. AUTHENTICATED ADMIN WRITE POLICIES (Strict Write Access)
-- Only logged-in Supabase Auth users can INSERT, UPDATE, DELETE
-- ============================================================

CREATE POLICY "Admin Write Site Config" ON site_config FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin Write Announcements" ON announcements FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin Write Gallery" ON gallery FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin Write Poster" ON poster FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin Write Brochure" ON brochure FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin Write Events" ON events FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin Write Team" ON team FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin Write Contact" ON contact_config FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin Write Travel" ON travel_routes FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin Write Schedule" ON schedule FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin Write Prizes" ON prizes FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- ============================================================
-- STORAGE BUCKET & RLS POLICIES FOR 'prayuddha-media'
-- ============================================================

-- Create storage bucket if not existing
INSERT INTO storage.buckets (id, name, public)
VALUES ('prayuddha-media', 'prayuddha-media', true)
ON CONFLICT (id) DO NOTHING;

-- Drop legacy storage policies if existing
DROP POLICY IF EXISTS "Public Read Storage" ON storage.objects;
DROP POLICY IF EXISTS "Admin Insert Storage" ON storage.objects;
DROP POLICY IF EXISTS "Admin Update Storage" ON storage.objects;
DROP POLICY IF EXISTS "Admin Delete Storage" ON storage.objects;

-- Allow public read access to media files
CREATE POLICY "Public Read Storage" ON storage.objects
FOR SELECT USING (bucket_id = 'prayuddha-media');

-- Allow authenticated admin users to upload new media
CREATE POLICY "Admin Insert Storage" ON storage.objects
FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'prayuddha-media');

-- Allow authenticated admin users to update existing media
CREATE POLICY "Admin Update Storage" ON storage.objects
FOR UPDATE TO authenticated
USING (bucket_id = 'prayuddha-media')
WITH CHECK (bucket_id = 'prayuddha-media');

-- Allow authenticated admin users to delete media
CREATE POLICY "Admin Delete Storage" ON storage.objects
FOR DELETE TO authenticated
USING (bucket_id = 'prayuddha-media');
