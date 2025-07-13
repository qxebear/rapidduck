import express from "express";

const app = express();
const PORT = 7100;

app.get("/api/suggestions", async (req, res) => {
  const { q } = req.query;

  if (!q || typeof q !== "string") {
    return res.status(400).json({ error: "Missing query parameter 'q'" });
  }

  const cleanedQuery = q.trim().replace(/^!\S+\s*/i, "");

  try {
    const oSuggestionsResponse = await fetch(
      `https://www.startpage.com/osuggestions?q=${encodeURIComponent(
        cleanedQuery
      )}`,
      {
        // treat like fetching from Browser
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36",
          Referer: "https://d.cutebear.in.th",
          "sec-ch-ua":
            '"Chromium";v="138", "Google Chrome";v="138", "Not/A)Brand";v="32"',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": '"Windows"',
          "sec-fetch-dest": "document",
          "sec-fetch-mode": "navigate",
          "sec-fetch-user": "?1",
          "sec-fetch-site": "same-origin",
          "accept-language": "en-US,en;q=0.9",
          accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
        },
      }
    );

    if (!oSuggestionsResponse.ok) {
      return res.status(oSuggestionsResponse.status).json({
        error: "Failed to fetch suggestions from Startpage",
      });
    }

    const suggestions = await oSuggestionsResponse.json();
    return res.status(200).json(suggestions);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Express server running at http://localhost:${PORT}`);
});
