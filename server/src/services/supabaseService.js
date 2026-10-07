const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

let supabase = null;

if (supabaseUrl && supabaseAnonKey && !supabaseUrl.includes('xxxxx')) {
  try {
    supabase = createClient(supabaseUrl, supabaseAnonKey);
    console.log('[Supabase] Client initialized successfully.');
  } catch (err) {
    console.warn('[Supabase] Initialization warning:', err.message);
  }
} else {
  console.log('[Supabase] Notice: SUPABASE_URL / SUPABASE_ANON_KEY not set. Analytics logging will operate in offline fallback mode.');
}

/**
 * Log an analysis execution to the analysis_logs table in Supabase.
 * Fail-safe: Never throws an error to disrupt the user analysis flow.
 */
async function logAnalysis(urlType, analysisType) {
  if (!supabase) return;
  try {
    const { error } = await supabase.from('analysis_logs').insert([
      {
        url_type: urlType || 'unknown',
        analysis_type: analysisType || 'general',
        created_at: new Date().toISOString(),
      },
    ]);
    if (error) {
      console.warn('[Supabase] logAnalysis notice:', error.message);
    }
  } catch (err) {
    console.warn('[Supabase] logAnalysis error:', err.message);
  }
}

/**
 * Record or increment search/query popularity in popular_queries table.
 */
async function recordQuery(query) {
  if (!supabase || !query) return;
  const cleaned = query.trim().toLowerCase();
  if (!cleaned) return;

  try {
    // Check if query exists
    const { data, error } = await supabase
      .from('popular_queries')
      .select('id, count')
      .eq('query', cleaned)
      .maybeSingle();

    if (error) {
      console.warn('[Supabase] recordQuery lookup notice:', error.message);
      return;
    }

    if (data) {
      await supabase
        .from('popular_queries')
        .update({ count: (data.count || 1) + 1 })
        .eq('id', data.id);
    } else {
      await supabase
        .from('popular_queries')
        .insert([{ query: cleaned, count: 1 }]);
    }
  } catch (err) {
    console.warn('[Supabase] recordQuery error:', err.message);
  }
}

module.exports = {
  supabase,
  logAnalysis,
  recordQuery,
};
