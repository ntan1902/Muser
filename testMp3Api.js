const ZingMp3 = require("zingmp3-api");
// idMusic = "ZOAC7BUF";
// ZingMp3.getHome((page = 1));
// ZingMp3.getFullInfo(idMusic).then((data) => {
//   console.log(data);
// });

ZingMp3.getDetailPlaylist("ZWZB96AI").then((data) => {
  data.song.items.forEach((item) => {
    ZingMp3.getFullInfo(item.encodeId).then((data2) => console.log(data2));
  });
});

// ZingMp3.getSectionPlaylist("6Z87F988")
//   .then((data) => console.log(data[1].items))
//   .catch((err) => console.log(err));
