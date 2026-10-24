/* Vercel Serverless Function: بيرجّع إعدادات Firebase (دي إعدادات عامة بطبيعتها — الأمان في firestore.rules).
   بيقبل أسماء المتغيرات بأي من البادئات الشائعة. */
module.exports = (req, res) => {
  const e = process.env;
  const pick = n => ['FIREBASE_', 'NEXT_PUBLIC_FIREBASE_', 'VITE_FIREBASE_', 'REACT_APP_FIREBASE_', 'PUBLIC_FIREBASE_'].map(p => e[p + n]).find(Boolean);
  let cfg = {};
  try { if (e.FIREBASE_CONFIG) cfg = JSON.parse(e.FIREBASE_CONFIG); } catch (x) { }
  const out = {
    apiKey: cfg.apiKey || pick('API_KEY'), authDomain: cfg.authDomain || pick('AUTH_DOMAIN'), projectId: cfg.projectId || pick('PROJECT_ID'),
    storageBucket: cfg.storageBucket || pick('STORAGE_BUCKET'), messagingSenderId: cfg.messagingSenderId || pick('MESSAGING_SENDER_ID'), appId: cfg.appId || pick('APP_ID')
  };
  res.setHeader('Cache-Control', 'no-store');
  if (!out.apiKey || !out.projectId) { res.status(404).json({ error: 'firebase env vars missing' }); return; }
  Object.keys(out).forEach(k => out[k] || delete out[k]);
  res.status(200).json(out);
};
