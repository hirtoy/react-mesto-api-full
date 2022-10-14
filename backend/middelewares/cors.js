const allowedCors = [
  'https://hirtoy.nomoredomains.icu',
  'http://hirtoy.nomoredomains.icu',
  'http://api.hirtoy.nomoredomains.icu',
  'https://api.hirtoy.nomoredomains.icu',
];

// eslint-disable-next-line consistent-return
module.exports = ((req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;

  // Значение для заголовка Access-Control-Allow-Methods по умолчанию (разрешены все типы запросов)
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

  // сохраняем список заголовков исходного запроса
  const requestHeaders = req.headers['access-control-request-headers'];
  res.header('X-Server', 'test');
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', true);
  }

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    res.end();
  }
  next();
});