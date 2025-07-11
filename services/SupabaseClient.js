const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
    throw new Error('Las variables de entorno SUPABASE_URL y/o SUPABASE_KEY no están definidas. Verifica tu archivo .env.');
}

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;