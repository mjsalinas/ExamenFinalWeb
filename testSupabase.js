const supabase = require('./services/supabaseClient');

async function test() {
  console.log('supabase:', supabase);  // <--- Aquí agregas esta línea

  const { data, error } = await supabase.from('reviews').select('*');
  if (error) {
    console.error('Error:', error);
  } else {
    console.log('Reviews:', data);
  }
}

test();
