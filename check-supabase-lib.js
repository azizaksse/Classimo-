const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

async function checkLib() {
    try {
        const envPath = path.join(process.cwd(), '.env.local');
        const content = fs.readFileSync(envPath, 'utf8');

        let url = '';
        let key = '';

        content.split('\n').forEach(line => {
            if (line.startsWith('NEXT_PUBLIC_SUPABASE_URL=')) {
                url = line.split('=')[1].trim().replace(/"/g, '');
            }
            if (line.startsWith('SUPABASE_SERVICE_ROLE=')) {
                key = line.split('=')[1].trim().replace(/"/g, '');
            }
        });

        if (!url || !key) {
            console.log("Missing credentials");
            return;
        }

        console.log(`Connecting to ${url}...`);
        const supabase = createClient(url, key);

        const { data, error } = await supabase.from('products').select('*').limit(1);

        if (error) {
            console.log("Supabase Error:", error.message);
            console.log("Error Details:", JSON.stringify(error, null, 2));
        } else {
            console.log("Success! Data:", JSON.stringify(data, null, 2));
        }

    } catch (e) {
        console.log("Exception:", e);
    }
}

checkLib();
