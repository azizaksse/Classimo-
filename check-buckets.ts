import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import { getSupabaseAdmin } from "./src/lib/supabaseAdminClient";

async function checkBuckets() {
    const admin = getSupabaseAdmin();
    if (!admin) {
        console.log("No admin client");
        return;
    }

    const { data, error } = await admin.storage.listBuckets();
    if (error) {
        console.log("Error listing buckets:", error.message);
    } else {
        console.log("Buckets:", JSON.stringify(data, null, 2));

        // Check if product-images exists and is public
        const bucket = data.find(b => b.name === 'product-images');
        if (bucket) {
            console.log("product-images bucket found. Public:", bucket.public);
        } else {
            console.log("product-images bucket NOT found!");
        }
    }
}

checkBuckets();
