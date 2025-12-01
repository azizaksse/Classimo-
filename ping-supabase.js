const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

try {
    const envPath = path.join(process.cwd(), '.env.local');
    const content = fs.readFileSync(envPath, 'utf8');
    const match = content.match(/NEXT_PUBLIC_SUPABASE_URL=(https:\/\/[^"'\s]+)/);

    if (match && match[1]) {
        const url = new URL(match[1]);
        const host = url.hostname;
        console.log(`Pinging ${host}...`);

        exec(`ping ${host}`, (error, stdout, stderr) => {
            if (error) {
                console.log(`❌ Ping failed: ${error.message}`);
                return;
            }
            console.log(stdout);
        });
    } else {
        console.log("❌ Could not find Supabase URL in .env.local");
    }

} catch (e) {
    console.log("Error:", e.message);
}
