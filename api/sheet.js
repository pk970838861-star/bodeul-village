// 게임 ↔ 구글 스프레드시트(Apps Script 웹 앱) 사이를 이어 주는 서버 함수.
// 웹 앱 주소는 Vercel 환경 변수 SHEETS_WEBAPP_URL 에만 두고 학생 브라우저에는 보이지 않아요.
module.exports = async (req, res) => {
  const url = process.env.SHEETS_WEBAPP_URL;
  if (!url) return res.status(503).json({ error: 'not_configured' });
  if (req.method !== 'POST') return res.status(405).json({ error: 'method_not_allowed' });

  let body = req.body;
  if (typeof body !== 'string') body = JSON.stringify(body || {});
  if (body.length > 50000) return res.status(413).json({ error: 'too_large' });

  try {
    const r = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body,
      redirect: 'follow',
    });
    const text = await r.text();
    try { JSON.parse(text); } catch (e) { return res.status(502).json({ error: 'sheet_not_ready' }); }
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.setHeader('Cache-Control', 'no-store');
    return res.status(200).send(text);
  } catch (e) {
    return res.status(502).json({ error: 'upstream' });
  }
};
