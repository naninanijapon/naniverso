/*
  【ファンアートの追加方法】
  1. 新しい画像ファイルを `naniverso/assets/fanart/` フォルダに置きます。
  2. 下のリストに、新しいブロック {...} をコピーして追加します。
  3. `image:` の "..." に "assets/fanart/画像ファイル名" を、
     `artist:` の "..." にルールに従った作者名を記入します。
*/

const fanArtData = [
  // スクリーンショットのファイル名に基づき、下から順番に（古い順）
  {
    image: "assets/fanart/ZarateLX.jpeg",
    artist: "@ZarateLX"
  },
  {
    image: "assets/fanart/MetalSulfurStudios.png",
    artist: "@MetalSulfurStudios"
  },
  {
    image: "assets/fanart/KATT_Anongaka.png",
    artist: "@KATT_Anongaka"
  },
  {
    image: "assets/fanart/JoshuaGonzalez-Otaku18_587.png",
    artist: "@JoshuaGonzalez-Otaku18_587"
  },
  {
    image: "assets/fanart/ivanvaldez1589MKL=00.png",
    artist: "@ivanvaldez1589" // "="より前
  },
  {
    image: "assets/fanart/ivanvaldez1589=03.png",
    artist: "@ivanvaldez1589" // "="より前
  },
  {
    image: "assets/fanart/ivanvaldez1589=01.png",
    artist: "@ivanvaldez1589" // "="より前
  },
  {
    image: "assets/fanart/Hans_Eler.jpeg",
    artist: "@Hans_Eler"
  },
  {
    image: "assets/fanart/Daro_oficial.png",
    artist: "@Daro_oficial"
  },
  {
    image: "assets/fanart/ajstudios6756.png",
    artist: "@ajstudios6756"
  },
  {
    image: "assets/fanart/@_N4hkz_.jpeg",
    artist: "@_N4hkz_"
  }
  // ここに新しいファンアートを追加
  // 注意：スクリーンショットには13個のファイルがありましたが、
  // 以前の指示で12個のリストだったため、12個で作成しています。
  // もし13個目のファイル（一番上の「@_N4hkz_.jpeg」のさらに上にあるファイル）
  // が必要であれば、そのファイル名を教えてください。
];