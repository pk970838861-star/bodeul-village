// Vercel 환경 변수를 보고 게임에 어떤 기능을 켤지 알려 줍니다.
// - SHEETS_WEBAPP_URL 이 있으면 회원 저장·교사용 화면이 켜져요 (주소 자체는 브라우저로 보내지 않아요).
// - SUPABASE_URL, SUPABASE_ANON_KEY 가 있으면 함께 놀기(실시간 친구·채팅·대결)가 켜져요.
//   anon key는 공개용 키라 브라우저에 보여도 괜찮아요.
module.exports = (req, res) => {
  const cfg = {
    sheets: !!process.env.SHEETS_WEBAPP_URL,
    supabaseUrl: process.env.SUPABASE_URL || '',
    supabaseAnonKey: process.env.SUPABASE_ANON_KEY || '',
  };
  res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.status(200).send('window.BODEUL_CONFIG = ' + JSON.stringify(cfg) + ';');
};
