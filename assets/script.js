(function() {
  var btn = document.getElementById('download-btn');
  var text = document.getElementById('download-text');
  var fallback = btn.href;

  btn.classList.add('loading');
  text.textContent = '获取下载链接...';

  fetch('https://api.github.com/repos/yyt0315/minClip-dev/releases/latest')
    .then(function(res) {
      if (!res.ok) throw new Error('API error');
      return res.json();
    })
    .then(function(data) {
      var zip = null;
      for (var i = 0; i < data.assets.length; i++) {
        if (data.assets[i].name.endsWith('.zip')) {
          zip = data.assets[i];
          break;
        }
      }
      if (zip) {
        btn.href = zip.browser_download_url;
        text.textContent = '下载 ' + data.tag_name;
      } else {
        text.textContent = '下载 ' + data.tag_name;
      }
      btn.classList.remove('loading');
    })
    .catch(function() {
      btn.classList.remove('loading');
      btn.classList.add('error');
      text.textContent = '前往 GitHub Releases';
    });
})();