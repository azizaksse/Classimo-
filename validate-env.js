const fs = require('fs');
const path = require('path');

try {
    const envPath = path.join(process.cwd(), '.env.local');
    if (!fs.existsSync(envPath)) {
        console.log("❌ .env.local file NOT found!");
        process.exit(1);
    }

    const content = fs.readFileSync(envPath, 'utf8');
    const lines = content.split('\n');
    let url = '';
    let key = '';
    let serviceKey = '';

    lines.forEach(line => {
        if (line.startsWith('NEXT_PUBLIC_SUPABASE_URL=')) {
            url = line.split('=')[1].trim().replace(/"/g, '');
        }
        if (line.startsWith('NEXT_PUBLIC_SUPABASE_ANON_KEY=')) {
            key = line.split('=')[1].trim().replace(/"/g, '');
        }
        if (line.startsWith('SUPABASE_SERVICE_ROLE=')) {
            serviceKey = line.split('=')[1].trim().replace(/"/g, '');
        }
    });

    console.log("Analyzing Config...");

    if (!url) console.log("❌ NEXT_PUBLIC_SUPABASE_URL is missing");
    else if (!url.startsWith('https://')) console.log("❌ NEXT_PUBLIC_SUPABASE_URL must start with https://");
    else if (url.includes('your-project-url')) console.log("❌ NEXT_PUBLIC_SUPABASE_URL seems to be a placeholder");
    else console.log("✅ NEXT_PUBLIC_SUPABASE_URL format looks correct");

    if (!key) console.log("❌ NEXT_PUBLIC_SUPABASE_ANON_KEY is missing");
    else if (key.length < 20) console.log("❌ NEXT_PUBLIC_SUPABASE_ANON_KEY seems too short");
    else console.log("✅ NEXT_PUBLIC_SUPABASE_ANON_KEY format looks correct");

    if (!serviceKey) console.log("❌ SUPABASE_SERVICE_ROLE is missing");
    else if (serviceKey.length < 20) console.log("❌ SUPABASE_SERVICE_ROLE seems too short");
    else console.log("✅ SUPABASE_SERVICE_ROLE format looks correct");

} catch (e) {
    console.log("Error reading .env.local:", e.message);
}
