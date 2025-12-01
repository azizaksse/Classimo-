async function fetchApi() {
    try {
        const res = await fetch('http://localhost:3001/api/products');
        if (!res.ok) {
            const data = await res.json();
            console.log("API Error:", JSON.stringify(data, null, 2));
        } else {
            const data = await res.json();
            console.log("API Success:", JSON.stringify(data, null, 2));
        }
    } catch (e) {
        console.log("Fetch Error:", e);
    }
}
fetchApi();
