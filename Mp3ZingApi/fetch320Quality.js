const fetch = require("node-fetch");
(async () => {
  let request = "https://api.mp3.zing.vn/api/streaming/audio/ZOAC7BUF/320";
  const res = await fetch(request);
  console.log(res.url.replace("http", "https"));
})();
