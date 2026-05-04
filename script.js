async function convert() {
    const text = document.getElementById("text").value;

    const response = await fetch("https://YOUR_BACKEND_URL/synthesize", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ text })
    });

    const blob = await response.blob();
    const url = URL.createObjectURL(blob);

    document.getElementById("audio").src = url;
}