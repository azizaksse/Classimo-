async function checkImage() {
    const url = "https://cfvkyycvoairmhuoowcb.supabase.co/storage/v1/object/public/product-images/products/1763769468493-549202186_801683152244059_7538435626221459413_n.jpg";
    console.log(`Checking ${url}...`);
    try {
        const res = await fetch(url);
        console.log(`Status: ${res.status} ${res.statusText}`);
        if (!res.ok) {
            const text = await res.text();
            console.log(`Body: ${text.substring(0, 200)}`);
        }
    } catch (e) {
        console.log("Error:", e.message);
    }
}
checkImage();
