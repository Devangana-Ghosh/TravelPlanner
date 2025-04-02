export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q") || "travel";
    const apiKey = process.env.NEWS_API_KEY;
    const apiUrl = `https://newsapi.org/v2/everything?q=${query}&apiKey=${apiKey}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.status !== "ok") {
            return Response.json({ error: "Failed to fetch news" }, { status: 500 });
        }

        const travelNews = data.articles.filter(article =>
            article.title.toLowerCase().includes("travel") || 
            article.description?.toLowerCase().includes("travel")
        );

        return Response.json({ articles: travelNews });
    } catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }
}
