// pages/api/news.js   ←← yeh file bana dena
export default async function handler(req, res) {
  const { country = 'us', category = 'general', page = 1, pageSize = 8 } = req.query;

  const url = `https://gnews.io/api/v4/top-headlines?country=${country}&category=${category}&lang=en&max=${pageSize}&page=${page}&apikey=70c5d5f0426a737b9316e8df0d22e6a2`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ articles: [], totalArticles: 0 });
  }
}