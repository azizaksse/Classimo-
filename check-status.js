const fs = require('fs');
const path = require('path');

async function checkStatus() {
    try {
        const envPath = path.join(process.cwd(), '.env.local');
        const content = fs.readFileSync(envPath, 'utf8');
        const match = content.match(/NEXT_PUBLIC_SUPABASE_URL=(https:\/\/[^"'\s]+)/);

        if (match && match[1]) {
            const url = match[1];
            console.log(`Fetching ${url}...`);

            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

            try {
                const res = await fetch(url, { signal: controller.signal });
                console.log(`Status: ${res.status} ${res.statusText}`);
                const text = await res.text();
                console.log(`Body: ${text.substring(0, 100)}`); // First 100 chars
            } catch (e) {
                console.log(`Fetch failed: ${e.message}`);
                if (e.name === 'AbortError') {
                    console.log("Request timed out");
                }
            } finally {
                clearTimeout(timeoutId);
            }
        }
    } catch (e) {
        console.log("Error:", e.message);
    }
}

checkStatus();
