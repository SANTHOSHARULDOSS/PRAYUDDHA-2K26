import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
    supabaseAnonKey &&
    supabaseUrl !== 'https://your-supabase-url.supabase.co' &&
    supabaseAnonKey !== 'your-anon-key'
);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

/**
 * Upload a file to Supabase storage or return base64 fallback URL
 */
export async function uploadMediaFile(
  file: File,
  folder: string = 'general'
): Promise<string> {
  // 1. Basic validation
  if (!file) {
    throw new Error('No file provided for upload.');
  }

  const MAX_SIZE = 15 * 1024 * 1024; // 15MB limit
  if (file.size > MAX_SIZE) {
    throw new Error(`File size (${(file.size / (1024 * 1024)).toFixed(1)}MB) exceeds maximum limit of 15MB.`);
  }

  if (isSupabaseConfigured && supabase) {
    try {
      const fileExt = file.name.split('.').pop() || 'png';
      const cleanFileName = file.name.toLowerCase().replace(/[^a-z0-9.]/g, '-');
      const fileName = `${folder}/${Date.now()}_${cleanFileName}`;

      const { data, error } = await supabase.storage
        .from('prayuddha-media')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: true,
        });

      if (error) {
        console.warn('Supabase storage upload error, falling back to local URL:', error.message);
        return await fileToDataURL(file);
      }

      const { data: publicUrlData } = supabase.storage
        .from('prayuddha-media')
        .getPublicUrl(data.path);

      return publicUrlData.publicUrl;
    } catch (err: any) {
      console.warn('Supabase upload exception, falling back to local URL:', err?.message || err);
      return await fileToDataURL(file);
    }
  }

  // Fallback if Supabase is not configured locally
  return await fileToDataURL(file);
}

function fileToDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
}
