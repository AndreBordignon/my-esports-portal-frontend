// Página localizada em pages/api/proxy.js
export default async (req, res) => {
  const result = await fetch('https://api.pandascore.co', {
    headers: req.headers,
    method: req.method,
    body: req.body,
  });

  const data = await result.json();
  res.status(result.status).json(data);
};
