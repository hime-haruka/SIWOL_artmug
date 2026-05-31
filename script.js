(function () {
  var SHEETS = {
    artist: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQZKsNqD34VXit2k6UF-YPT_P83kzICwp_GV17z3Dyf47i4iFRzTLVLn9vZrUKajJzibQZlIrV57btl/pub?gid=2057102953&single=true&output=csv',
    works: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQZKsNqD34VXit2k6UF-YPT_P83kzICwp_GV17z3Dyf47i4iFRzTLVLn9vZrUKajJzibQZlIrV57btl/pub?gid=1770989884&single=true&output=csv',
    calendar: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQZKsNqD34VXit2k6UF-YPT_P83kzICwp_GV17z3Dyf47i4iFRzTLVLn9vZrUKajJzibQZlIrV57btl/pub?gid=1641124664&single=true&output=csv',
    schedule: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQZKsNqD34VXit2k6UF-YPT_P83kzICwp_GV17z3Dyf47i4iFRzTLVLn9vZrUKajJzibQZlIrV57btl/pub?gid=1743736528&single=true&output=csv',
    process: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQZKsNqD34VXit2k6UF-YPT_P83kzICwp_GV17z3Dyf47i4iFRzTLVLn9vZrUKajJzibQZlIrV57btl/pub?gid=1888942756&single=true&output=csv',
    notice: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQZKsNqD34VXit2k6UF-YPT_P83kzICwp_GV17z3Dyf47i4iFRzTLVLn9vZrUKajJzibQZlIrV57btl/pub?gid=1856790988&single=true&output=csv',
    usage: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQZKsNqD34VXit2k6UF-YPT_P83kzICwp_GV17z3Dyf47i4iFRzTLVLn9vZrUKajJzibQZlIrV57btl/pub?gid=1082370574&single=true&output=csv',
    portfolioAreas: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ-7WOJ_VPL_FvMxGcA6JOJ5QoLbcGUPGTU4YR5c7P7TDtq8m45qDGJU9mzIBTkyARvun0FWtUYmKiJ/pub?gid=527258077&single=true&output=csv',
    portfolioPrices: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ-7WOJ_VPL_FvMxGcA6JOJ5QoLbcGUPGTU4YR5c7P7TDtq8m45qDGJU9mzIBTkyARvun0FWtUYmKiJ/pub?gid=593038740&single=true&output=csv',
    portfolioImages: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ-7WOJ_VPL_FvMxGcA6JOJ5QoLbcGUPGTU4YR5c7P7TDtq8m45qDGJU9mzIBTkyARvun0FWtUYmKiJ/pub?gid=0&single=true&output=csv',
    portfolioBadgeImages: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ-7WOJ_VPL_FvMxGcA6JOJ5QoLbcGUPGTU4YR5c7P7TDtq8m45qDGJU9mzIBTkyARvun0FWtUYmKiJ/pub?gid=598002765&single=true&output=csv',
    portfolioEmojiImages: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ-7WOJ_VPL_FvMxGcA6JOJ5QoLbcGUPGTU4YR5c7P7TDtq8m45qDGJU9mzIBTkyARvun0FWtUYmKiJ/pub?gid=1099663677&single=true&output=csv',
    portfolioMoveEmojiImages: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ-7WOJ_VPL_FvMxGcA6JOJ5QoLbcGUPGTU4YR5c7P7TDtq8m45qDGJU9mzIBTkyARvun0FWtUYmKiJ/pub?gid=1293209114&single=true&output=csv',
    portfolioOgqImages: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ-7WOJ_VPL_FvMxGcA6JOJ5QoLbcGUPGTU4YR5c7P7TDtq8m45qDGJU9mzIBTkyARvun0FWtUYmKiJ/pub?gid=1227183664&single=true&output=csv',
    portfolioFacialChartImages: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ-7WOJ_VPL_FvMxGcA6JOJ5QoLbcGUPGTU4YR5c7P7TDtq8m45qDGJU9mzIBTkyARvun0FWtUYmKiJ/pub?gid=1630494617&single=true&output=csv',
    portfolioFanCharImages: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ-7WOJ_VPL_FvMxGcA6JOJ5QoLbcGUPGTU4YR5c7P7TDtq8m45qDGJU9mzIBTkyARvun0FWtUYmKiJ/pub?gid=520864347&single=true&output=csv',
    portfolioSdIllustImages: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ-7WOJ_VPL_FvMxGcA6JOJ5QoLbcGUPGTU4YR5c7P7TDtq8m45qDGJU9mzIBTkyARvun0FWtUYmKiJ/pub?gid=1777463947&single=true&output=csv',
    portfolioGifTalkImages: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ-7WOJ_VPL_FvMxGcA6JOJ5QoLbcGUPGTU4YR5c7P7TDtq8m45qDGJU9mzIBTkyARvun0FWtUYmKiJ/pub?gid=1621408550&single=true&output=csv',
    portfolioDonaImageImages: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ-7WOJ_VPL_FvMxGcA6JOJ5QoLbcGUPGTU4YR5c7P7TDtq8m45qDGJU9mzIBTkyARvun0FWtUYmKiJ/pub?gid=1331595230&single=true&output=csv',
    portfolioLdIllustImages: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ-7WOJ_VPL_FvMxGcA6JOJ5QoLbcGUPGTU4YR5c7P7TDtq8m45qDGJU9mzIBTkyARvun0FWtUYmKiJ/pub?gid=253758500&single=true&output=csv',
    portfolioOverlayImages: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ-7WOJ_VPL_FvMxGcA6JOJ5QoLbcGUPGTU4YR5c7P7TDtq8m45qDGJU9mzIBTkyARvun0FWtUYmKiJ/pub?gid=2045618008&single=true&output=csv',
    portfolioVAnimalImages: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ-7WOJ_VPL_FvMxGcA6JOJ5QoLbcGUPGTU4YR5c7P7TDtq8m45qDGJU9mzIBTkyARvun0FWtUYmKiJ/pub?gid=348143665&single=true&output=csv',
    portfolioVNyahImages: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ-7WOJ_VPL_FvMxGcA6JOJ5QoLbcGUPGTU4YR5c7P7TDtq8m45qDGJU9mzIBTkyARvun0FWtUYmKiJ/pub?gid=1193239419&single=true&output=csv'
  };

  var requestOptions = ['구독종합패키지','구독뱃지','구독티콘','움짤티콘','OGQ','페이셜차트','후원이미지(치즈냠)','후원이미지(커스텀)','팬캐릭터(시트지)','팬캐릭터(디자인)','팬캐릭터(시트지+디자인)','짚톡','SD','LD','방송화면','멍멍냥냥','메롱SD'];
  var qtyOptions = ['구독뱃지','구독티콘','페이셜차트'];
  var collabOptions = ['멍멍냥냥','메롱SD'];

  function qs(sel) { return document.querySelector(sel); }
  function el(tag, className, text) { var node = document.createElement(tag); if (className) node.className = className; if (text != null) node.textContent = text; return node; }
  function safe(text) { return String(text == null ? '' : text).trim(); }
  function nl(text) { return safe(text).replace(/\n/g, '<br>'); }

  function parseCSVRows(text) {
    text = String(text || '').replace(/^\uFEFF/, '');
    var rows = [], row = [], value = '', quote = false;
    for (var i = 0; i < text.length; i++) {
      var c = text[i], n = text[i + 1];
      if (c === '"' && quote && n === '"') { value += '"'; i++; continue; }
      if (c === '"') { quote = !quote; continue; }
      if (c === ',' && !quote) { row.push(value); value = ''; continue; }
      if ((c === '\n' || c === '\r') && !quote) {
        if (c === '\r' && n === '\n') i++;
        row.push(value); rows.push(row); row = []; value = ''; continue;
      }
      value += c;
    }
    row.push(value); rows.push(row);
    return rows.map(function (r) { return r.map(safe); }).filter(function (r) { return r.some(function (v) { return v !== ''; }); });
  }

  function rowsToObjects(rows) {
    if (!rows.length) return [];
    var heads = rows.shift().map(function (h, i) { return h || (i === 0 ? '__rowTitle' : '__blank' + i); });
    return rows.map(function (r, rowIndex) {
      var obj = { __idx: rowIndex };
      heads.forEach(function (h, idx) { obj[h] = safe(r[idx]); });
      return obj;
    });
  }

  function rowsToKeyValue(rows) {
    var data = {};
    rows.forEach(function (r) {
      var key = safe(r[0]);
      if (key) data[key] = safe(r.slice(1).join('\n'));
    });
    return [data];
  }

  function parseUsageCSVRows(rows) {
    if (!rows.length) return [];
    var header = rows[0].slice();
    var dataRows = rows.slice(1);
    if (header[0] === '') header = header.slice(1);
    if (header.indexOf('비상업용') === -1 && rows.length > 1) {
      header = ['비상업용', '방송용', '상업용'];
      dataRows = rows;
    }
    return dataRows.filter(function (r) { return r.length >= 4 || safe(r[0]); }).map(function (r) {
      var shifted = r.length === header.length ? [''].concat(r) : r;
      return {
        label: safe(shifted[0]),
        noncommercial: safe(shifted[1]),
        broadcast: safe(shifted[2]),
        commercial: safe(shifted[3])
      };
    }).filter(function (r) { return r.label; });
  }

  function parseCSV(text, mode) {
    var rows = parseCSVRows(text);
    if (mode === 'artist') {
      if (rows.some(function (r) { return ['image_url','nick','sub','tags','desc','response'].indexOf(safe(r[0])) > -1; })) return rowsToKeyValue(rows);
      return rowsToObjects(rows);
    }
    if (mode === 'usage') return parseUsageCSVRows(rows);
    if (mode === 'keyValue') return rowsToKeyValue(rows);
    return rowsToObjects(rows);
  }

  function fetchCSV(url, mode) {
    var sep = url.indexOf('?') === -1 ? '?' : '&';
    return fetch(url + sep + 'cacheBust=' + Date.now(), { cache: 'no-store' }).then(function (res) {
      if (!res.ok) throw new Error('CSV 로드 실패');
      return res.text();
    }).then(function (text) { return parseCSV(text, mode); });
  }

  function driveImage(url) {
    var str = safe(url);
    var match = str.match(/\/d\/([^/]+)/);
    return match ? 'https://lh3.googleusercontent.com/d/' + match[1] : str;
  }

  function esc(text) {
    return safe(text).replace(/[&<>\"]/g, function (ch) {
      return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '\"': '&quot;' })[ch];
    });
  }

  function emphasize(text) {
    return esc(text).replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>').replace(/\*([^*]+)\*/g, '<strong>$1</strong>');
  }


  function formatWorkName(text) {
    var raw = safe(text);
    var m = raw.match(/^\*\*([^*]+)\*\*\s*(.*)$/) || raw.match(/^\*([^*]+)\*\s*(.*)$/);
    if (m) {
      return '<strong>' + esc(m[1]) + '</strong>' + (safe(m[2]) ? '<span>' + esc(m[2]) + '</span>' : '');
    }
    return emphasize(raw);
  }

  function processText(text) {
    return esc(text).replace(/\n/g, '<br>').replace(/\*\*([^*]+)\*\*/g, '<span class="subtext">$1</span>').replace(/\*([^*]+)\*/g, '<span class="subtext">$1</span>');
  }

  function normalizeArtist(rows) {
    var data = rows[0] || {};
    if (!data.nick && rows.length) {
      rows.forEach(function (row) {
        Object.keys(row).forEach(function (key) {
          if (['image_url','nick','sub','tags','desc','response'].indexOf(key) > -1 && row[key]) data[key] = row[key];
        });
      });
    }
    return data;
  }

  function setError(slot, message) {
    var target = typeof slot === 'string' ? qs(slot) : slot;
    if (target) target.innerHTML = '<div class="empty">' + message + '</div>';
  }

  function renderArtist(rows) {
    var data = normalizeArtist(rows);
    qs('[data-field="nick"]').textContent = data.nick || '시월';
    qs('[data-field="sub"]').textContent = data.sub || 'SIWOL';
    qs('[data-field="desc"]').innerHTML = nl(data.desc || '');
    qs('[data-field="response"]').textContent = data.response || '답변 가능 시간';
    var tags = qs('[data-field="tags"]');
    tags.innerHTML = '';
    safe(data.tags).split(/\s+/).filter(Boolean).forEach(function (tag) { tags.appendChild(el('span', '', tag)); });
    var imageBox = qs('[data-field="image"]');
    imageBox.innerHTML = '';
    if (data.image_url) {
      var img = el('img');
      img.src = driveImage(data.image_url);
      img.alt = (data.nick || '작가') + ' 프로필 이미지';
      img.onerror = function () { imageBox.innerHTML = ''; };
      imageBox.appendChild(img);
    }
  }

  function renderWorks(rows) {
    var box = qs('[data-slot="works"]');
    box.innerHTML = '';
    rows.sort(function (a, b) { return Number(a.order || 0) - Number(b.order || 0); });
    if (!rows.length) return setError(box, '등록된 대표 작업 내역이 없습니다.');
    var countRow = rows.find(function (row) { return Number(row.order || 0) === 1; }) || rows[0];
    qs('[data-field="works-count"]').textContent = countRow && countRow.name ? countRow.name : '총 작업건수 확인 중';
    rows.filter(function (row) { return Number(row.order || 0) !== 1; }).forEach(function (row) {
      var card = el('div', 'work-card');
      if (row.image_url) {
        card.classList.add('has-image');
        card.style.setProperty('--work-image', 'url("' + driveImage(row.image_url).replace(/"/g, '%22') + '")');
      }
      card.innerHTML = '<div class="work-card-text">' + formatWorkName(row.name || '작업 내역') + '</div>';
      box.appendChild(card);
    });
    if (!box.children.length) setError(box, '등록된 대표 작업 내역이 없습니다.');
  }

  function renderCalendar(rows) {
    var box = qs('[data-slot="calendar"]');
    box.innerHTML = '';
    var today = new Date();
    var year = today.getFullYear();
    var month = today.getMonth();
    var off = {};
    rows.forEach(function (r) { if (r.date) off[r.date] = true; });
    var head = el('div', 'calendar-head');
    head.innerHTML = '<strong>' + year + '. ' + String(month + 1).padStart(2, '0') + '</strong><span>휴무일 표시</span>';
    var grid = el('div', 'calendar-grid');
    ['일','월','화','수','목','금','토'].forEach(function (d) { grid.appendChild(el('b', '', d)); });
    var first = new Date(year, month, 1).getDay();
    var last = new Date(year, month + 1, 0).getDate();
    for (var i = 0; i < first; i++) grid.appendChild(el('span', 'blank', ''));
    for (var day = 1; day <= last; day++) {
      var key = year + '-' + String(month + 1).padStart(2, '0') + '-' + String(day).padStart(2, '0');
      grid.appendChild(el('span', off[key] ? 'off' : '', String(day)));
    }
    box.appendChild(head); box.appendChild(grid);
  }

  function renderSchedule(rows) {
    var box = qs('[data-slot="schedule"]');
    if (!rows.length) return setError(box, '등록된 예약 현황이 없습니다.');
    var table = el('table', 'schedule-table');
    table.innerHTML = '<thead><tr><th>월</th><th>주차</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th></tr></thead><tbody></tbody>';
    var tbody = table.querySelector('tbody');
    rows.forEach(function (r) {
      var tr = el('tr');
      tr.innerHTML = '<td>' + safe(r.month) + '월</td><td>' + safe(r.week) + '주</td>';
      for (var i = 1; i <= 6; i++) {
        var v = safe(r['slot ' + i]).toUpperCase();
        var td = el('td', v === 'OPEN' ? 'open' : 'closed', v === 'OPEN' ? '♡' : '♥');
        tr.appendChild(td);
      }
      tbody.appendChild(tr);
    });
    box.innerHTML = ''; box.appendChild(table);
  }

  function renderProcess(rows) {
    var box = qs('[data-slot="process"]');
    box.innerHTML = '';
    rows.sort(function (a, b) { return Number(a.order || 0) - Number(b.order || 0); });
    if (!rows.length) return setError(box, '등록된 진행 방식이 없습니다.');
    rows.forEach(function (r) {
      var card = el('article', 'info-card');
      card.innerHTML = '<strong>' + safe(r.title) + '</strong><p>' + processText(r.desc) + '</p>';
      box.appendChild(card);
    });
  }

  function renderNotice(rows) {
    var box = qs('[data-slot="notice"]');
    box.innerHTML = '';
    rows.sort(function (a, b) { return Number(a.order || 0) - Number(b.order || 0); });
    if (!rows.length) { box.innerHTML = '<li>등록된 공지사항이 없습니다.</li>'; return; }
    rows.forEach(function (r) { box.appendChild(el('li', '', r.desc || '공지사항')); });
  }

  function renderUsage(rows) {
    var box = qs('[data-slot="usage"]');
    if (!rows.length) return setError(box, '등록된 사용 범위가 없습니다.');
    var table = el('table', 'usage-table');
    var headers = ['비상업용', '방송용', '상업용'];
    var html = '<thead><tr><th>구분</th>' + headers.map(function (h) { return '<th>' + h + '</th>'; }).join('') + '</tr></thead><tbody>';
    rows.forEach(function (r) {
      var values = [r.noncommercial, r.broadcast, r.commercial];
      html += '<tr><th>' + safe(r.label) + '</th>';
      values.forEach(function (value) {
        var v = safe(value).toUpperCase();
        html += '<td class="' + (v === 'O' ? 'ok' : 'no') + '">' + v + '</td>';
      });
      html += '</tr>';
    });
    html += '</tbody>';
    table.innerHTML = html;
    box.innerHTML = ''; box.appendChild(table);
  }


  var portfolioState = { areas: [], prices: [], images: [], current: '' };

  function boolValue(value) {
    return ['TRUE','Y','YES','1','O'].indexOf(safe(value).toUpperCase()) > -1;
  }

  function dateValue(value) {
    var time = Date.parse(safe(value).replace(/\./g, '-').replace(/\//g, '-'));
    return isNaN(time) ? 0 : time;
  }

  function sortLatest(list) {
    return list.slice().sort(function (a, b) {
      var dateDiff = dateValue(b.date) - dateValue(a.date);
      if (dateDiff) return dateDiff;
      return Number(a.order || 0) - Number(b.order || 0);
    });
  }

  function sortByDateThenOrder(list) {
    return list.slice().sort(function (a, b) {
      var dateDiff = dateValue(b.date) - dateValue(a.date);
      if (dateDiff) return dateDiff;
      return Number(a.order || 0) - Number(b.order || 0);
    });
  }

  function sortByOrder(list) {
    return list.slice().sort(function (a, b) {
      return Number(a.order || 0) - Number(b.order || 0);
    });
  }

  function sampleColumns(count, fallback) {
    var n = Number(count || 0);
    var base = Math.max(1, Number(fallback || 3));
    if (!n) return base;
    if (n > 20) return 6;
    return base;
  }

  function mainColumns(area) {
    var n = Number(area && area.c_grid || 0);
    return Math.max(1, n || 3);
  }

  function workGroupKey(item) {
    return [safe(item.title) || '기타 샘플', safe(item.date) || '날짜 없음'].join('@@');
  }

  function workGroupTitle(key) {
    return safe(String(key).split('@@')[0]) || '기타 샘플';
  }

  function latestTime(list) {
    var times = list.map(function (item) { return dateValue(item.date); }).filter(Boolean);
    return times.length ? Math.max.apply(null, times) : 0;
  }

  function sortGroupItems(list, area) {
    var hasOrder = list.some(function (item) { return safe(item.order); });
    if (safe(area && area.area_id) === 'badge' || hasOrder) return sortByOrder(list);
    return list.slice().sort(function (a, b) { return Number(a.__idx || 0) - Number(b.__idx || 0); });
  }


  function formatPrice(value) {
    var n = Number(String(value || '').replace(/[^0-9.-]/g, ''));
    if (!n) return safe(value) || '문의';
    return n.toLocaleString('ko-KR') + '원';
  }

  function groupedBy(list, key) {
    return list.reduce(function (acc, item) {
      var k = safe(item[key]) || '기본';
      if (!acc[k]) acc[k] = [];
      acc[k].push(item);
      return acc;
    }, {});
  }

  function renderPortfolioTabs() {
    var box = qs('[data-slot="portfolio-tabs"]');
    if (box) box.innerHTML = '';
  }

  function makePortfolioImageCard(item, area) {
    var card = el('figure', 'portfolio-image-card');
    if (boolValue(item.sensi)) card.classList.add('is-sensitive');
    if (item.category) card.setAttribute('data-category', safe(item.category));
    var img = el('img');
    img.src = driveImage(item.image);
    img.alt = [item.title, area.title, item.category, item.date].filter(Boolean).join(' ');
    img.loading = 'lazy';
    img.onerror = function () { card.classList.add('image-error'); };
    card.appendChild(img);
    var noCaptionAreas = ['package', 'badge', 'emoji', 'move_emoji', 'ogq', 'gif_talk'];
    var showCaption = noCaptionAreas.indexOf(safe(area.area_id)) === -1;

    if (showCaption && (item.title || item.category)) {
      var cap = el('figcaption');
      cap.innerHTML =
        (item.title ? '<strong>' + esc(item.title) + '</strong>' : '') +
        (!item.title && item.category ? '<strong>' + esc(item.category) + '</strong>' : '');
      card.appendChild(cap);
    }
        return card;
  }


  function getPackageMainImages(images) {
    var limits = { '구독뱃지': 6, '구독티콘': 5, '움짤티콘': 5 };
    var labels = ['구독뱃지', '구독티콘', '움짤티콘'];
    var picked = [];
    labels.forEach(function (label) {
      var group = sortLatest(images.filter(function (item) { return safe(item.label) === label; })).slice(0, limits[label]);
      picked = picked.concat(group);
    });
    return picked;
  }

  function itemKey(item) {
    return [safe(item.area_id), safe(item.image), safe(item.title), safe(item.label), safe(item.date)].join('|');
  }

  function renderPackageImageRows(images, options) {
    options = options || {};
    var limits = { '구독뱃지': 6, '구독티콘': 5, '움짤티콘': 5 };
    var labels = ['구독뱃지', '구독티콘', '움짤티콘'];
    var rows = el('div', 'package-image-rows');
    labels.forEach(function (label) {
      var rowItems = sortLatest(images.filter(function (item) { return safe(item.label) === label; })).slice(0, limits[label]);
      if (!rowItems.length) return;
      var row = el('div', 'portfolio-images package-row package-row-' + limits[label]);
      row.style.setProperty('--portfolio-cols', limits[label]);
      rowItems.forEach(function (item) { row.appendChild(makePortfolioImageCard(item, { title: '' })); });
      rows.appendChild(row);
    });
    if (!rows.children.length && options.emptyText) {
      rows.innerHTML = '<div class="portfolio-ready">' + esc(options.emptyText) + '</div>';
    }
    return rows;
  }

  function renderPackageMainImages(images, mains) {
    return renderPackageImageRows(mains, { emptyText: '등록된 샘플 이미지가 없습니다.' });
  }

  function renderPackageMoreImages(images) {
    var wrap = el('div', 'package-more-groups');
    if (!images.length) return wrap;
    var groups = images.reduce(function (acc, item) {
      var key = workGroupKey(item);
      if (!acc[key]) acc[key] = [];
      acc[key].push(item);
      return acc;
    }, {});
    Object.keys(groups).sort(function (a, b) {
      return latestTime(groups[b]) - latestTime(groups[a]);
    }).forEach(function (key) {
      var group = el('section', 'package-sample-group');
      group.innerHTML = '<h4>' + esc(workGroupTitle(key)) + '</h4>';
      group.appendChild(renderPackageImageRows(sortByDateThenOrder(groups[key])));
      wrap.appendChild(group);
    });
    return wrap;
  }

  function renderImageGrid(images, area, options) {
    options = options || {};
    var list = options.keepOrder ? images.slice() : sortByDateThenOrder(images);
    var wrap = el('div', 'portfolio-images balanced-images' + (options.className ? ' ' + options.className : ''));
    var cols = options.cols || sampleColumns(list.length, options.fallbackCols || mainColumns(area));
    wrap.style.setProperty('--portfolio-cols', Math.max(1, cols));
    if (!list.length) {
      wrap.innerHTML = '<div class="portfolio-ready">' + esc(options.emptyText || '등록된 샘플 이미지가 없습니다.') + '</div>';
      return wrap;
    }
    list.forEach(function (item) { wrap.appendChild(makePortfolioImageCard(item, area)); });
    return wrap;
  }

  function renderGroupedMoreImages(images, area) {
    var wrap = el('div', 'package-more-groups generic-more-groups');
    if (!images.length) return wrap;

    var areaId = safe(area.area_id);
    var categoryMode = ['dona_image', 'overlay', 'v_animal', 'v_nyah'].indexOf(areaId) > -1;

    var groups = images.reduce(function (acc, item) {
      var key;
      if (categoryMode) {
        key = safe(item.category) || '기타 샘플';
      } else {
        key = workGroupKey(item);
      }
      if (!acc[key]) acc[key] = [];
      acc[key].push(item);
      return acc;
    }, {});

    var keys = Object.keys(groups);

    if (areaId === 'v_animal' || areaId === 'v_nyah') {
      keys.sort(function (a, b) {
        if (a === '표정 샘플' && b !== '표정 샘플') return -1;
        if (b === '표정 샘플' && a !== '표정 샘플') return 1;
        return latestTime(groups[b]) - latestTime(groups[a]);
      });
    } else {
      keys.sort(function (a, b) {
        return latestTime(groups[b]) - latestTime(groups[a]);
      });
    }

    keys.forEach(function (key) {
      var group = el('section', 'package-sample-group generic-sample-group');
      var sorted = sortGroupItems(groups[key], area);
      var title = categoryMode ? key : workGroupTitle(key);
      group.innerHTML = '<h4>' + esc(title) + '</h4>';
      group.appendChild(renderImageGrid(sorted, area, {
        keepOrder: true,
        className: 'more-images show-captions',
        cols: sampleColumns(sorted.length, mainColumns(area))
      }));
      wrap.appendChild(group);
    });

    return wrap;
  }


  function renderGifTalkCards(images, area) {
    var wrap = el('div', 'gif-talk-layout');
    var groups = images.reduce(function (acc, item) {
      var key = safe(item.title) || '기타 샘플';
      if (!acc[key]) acc[key] = [];
      acc[key].push(item);
      return acc;
    }, {});
    var preferred = ['동물친구들', '조립형', '말랑이', '말콩이', '와앙이', '짚톡세트'];
    var keys = preferred.filter(function (key) { return groups[key]; });
    Object.keys(groups).forEach(function (key) {
      if (preferred.indexOf(key) === -1) keys.push(key);
    });
    if (!keys.length) {
      wrap.innerHTML = '<div class="portfolio-ready">등록된 샘플 이미지가 없습니다.</div>';
      return wrap;
    }

    function createCard(title) {
      var group = sortByDateThenOrder(groups[title] || []);
      var thumbs = group.filter(function (item) { return boolValue(item.thumb); });
      var cover = thumbs.length ? thumbs[0] : group[0];
      var imagesForHover = group.slice();
      var card = el('article', 'gif-talk-card');
      if (title === '짚톡세트') card.classList.add('is-wallpaper');
      card.setAttribute('data-gif-title', title);
      var img = el('img');
      img.src = driveImage(cover.image);
      img.alt = title;
      img.loading = 'lazy';
      img.onerror = function () { card.classList.add('image-error'); };
      card.appendChild(img);
      card.appendChild(el('strong', '', title));
      card.dataset.images = JSON.stringify(imagesForHover.map(function (item) { return driveImage(item.image); }));
      card.dataset.cover = driveImage(cover.image);
      var timer = null;
      function stopHover() {
        clearInterval(timer);
        timer = null;
        img.src = card.dataset.cover;
      }
      function startHover() {
        var list;
        try { list = JSON.parse(card.dataset.images || '[]'); } catch (e) { list = []; }
        if (list.length < 2) return;
        var idx = list.indexOf(img.src);
        if (idx < 0) idx = 0;
        clearInterval(timer);
        idx = (idx + 1) % list.length;
        img.src = list[idx];
        timer = setInterval(function () {
          idx = (idx + 1) % list.length;
          img.src = list[idx];
        }, 700);
      }
      card.addEventListener('pointerenter', startHover);
      card.addEventListener('pointerleave', stopHover);
      card.addEventListener('focusin', startHover);
      card.addEventListener('focusout', stopHover);
      wrap.appendChild(card);
      return card;
    }

    var row1 = el('div', 'gif-talk-row gif-talk-row-3');
    var row2 = el('div', 'gif-talk-row gif-talk-row-2');
    var row3 = el('div', 'gif-talk-row gif-talk-row-1');
    wrap.appendChild(row1);
    wrap.appendChild(row2);
    wrap.appendChild(row3);

    keys.forEach(function (title) {
      var card = createCard(title);
      if (['동물친구들', '조립형', '말랑이'].indexOf(title) > -1) row1.appendChild(card);
      else if (['말콩이', '와앙이'].indexOf(title) > -1) row2.appendChild(card);
      else if (title === '짚톡세트') row3.appendChild(card);
      else row1.appendChild(card);
    });
    Array.prototype.slice.call(wrap.querySelectorAll('.gif-talk-row')).forEach(function (row) {
      if (!row.children.length) row.remove();
    });
    return wrap;
  }


  function pickOneByCategory(images) {
    var groups = images.reduce(function (acc, item) {
      var key = safe(item.category) || '기타';
      if (!acc[key]) acc[key] = [];
      acc[key].push(item);
      return acc;
    }, {});
    return Object.keys(groups).sort(function (a, b) {
      return latestTime(groups[b]) - latestTime(groups[a]);
    }).map(function (category) {
      var sorted = sortByDateThenOrder(groups[category]);
      var thumb = sorted.find(function (item) { return boolValue(item.thumb); });
      return thumb || sorted[0];
    }).filter(Boolean);
  }

  function renderDonaImagePortfolio(area, images, checked, cols) {
    var outer = el('div', 'portfolio-samples dona-portfolio-samples');
    var mains = pickOneByCategory(checked.length ? checked : images);
    if (!mains.length) {
      var emptyWrap = el('div', 'portfolio-images balanced-images');
      emptyWrap.style.setProperty('--portfolio-cols', cols);
      emptyWrap.innerHTML = '<div class="portfolio-ready">등록된 샘플 이미지가 없습니다.</div>';
      outer.appendChild(emptyWrap);
      return outer;
    }
    var grid = renderImageGrid(mains, area, { keepOrder: true, className: 'dona-main-grid show-captions', cols: Math.min(2, Math.max(1, mains.length)) });
    outer.appendChild(grid);
    var mainKeys = new Set(mains.map(itemKey));
    var more = sortLatest(images.filter(function (item) { return !mainKeys.has(itemKey(item)); }));
    if (more.length) {
      var details = el('details', 'portfolio-more');
      details.appendChild(el('summary', '', '샘플 더보기'));
      details.appendChild(renderCategoryImageGroups(more, area, { cols: cols }));
      details.addEventListener('toggle', sendHeight);
      outer.appendChild(details);
    }
    return outer;
  }


  function categoryPriority(area, category) {
    var id = safe(area && area.area_id);
    var name = safe(category) || '기타';
    if (id === 'v_animal' || id === 'v_nyah') {
      if (name === '표정 샘플') return 0;
      if (name === '모델 샘플') return 1;
      return 2;
    }
    if (id === 'overlay') {
      if (name === 'LD') return 0;
      if (name === 'SD') return 1;
      return 2;
    }
    return 10;
  }

  function renderCategoryImageGroups(images, area, options) {
    options = options || {};
    var wrap = el('div', 'package-more-groups category-image-groups');
    if (!images.length) {
      wrap.innerHTML = '<div class="portfolio-ready">등록된 샘플 이미지가 없습니다.</div>';
      return wrap;
    }
    var groups = images.reduce(function (acc, item) {
      var key = safe(item.category) || '기타';
      if (!acc[key]) acc[key] = [];
      acc[key].push(item);
      return acc;
    }, {});
    Object.keys(groups).sort(function (a, b) {
      var priorityDiff = categoryPriority(area, a) - categoryPriority(area, b);
      if (priorityDiff) return priorityDiff;
      return latestTime(groups[b]) - latestTime(groups[a]);
    }).forEach(function (category) {
      var group = el('section', 'package-sample-group generic-sample-group category-sample-group');
      var sorted = sortByDateThenOrder(groups[category]);
      group.innerHTML = '<h4>' + esc(category) + '</h4>';
      group.appendChild(renderImageGrid(sorted, area, { keepOrder: true, className: 'more-images show-captions', cols: options.cols || mainColumns(area) }));
      wrap.appendChild(group);
    });
    return wrap;
  }

  function renderCategorizedPortfolioImages(area, images, checked, mainCount, cols) {
    var outer = el('div', 'portfolio-samples category-portfolio-samples');
    var id = safe(area.area_id);
    var mains = (checked.length ? checked : images).slice(0, mainCount);
    if (!mains.length) {
      var emptyWrap = el('div', 'portfolio-images balanced-images');
      emptyWrap.style.setProperty('--portfolio-cols', cols);
      emptyWrap.innerHTML = '<div class="portfolio-ready">등록된 샘플 이미지가 없습니다.</div>';
      outer.appendChild(emptyWrap);
      return outer;
    }
    if (id === 'v_animal' || id === 'v_nyah') {
      outer.appendChild(renderImageGrid(mains, area, { keepOrder: true, className: 'vtuber-main-grid show-captions', cols: 1 }));
    } else {
      outer.appendChild(renderCategoryImageGroups(mains, area, { cols: cols }));
    }
    var mainKeys = new Set(mains.map(itemKey));
    var more = sortLatest(images.filter(function (item) { return !mainKeys.has(itemKey(item)); }));
    if (more.length) {
      var details = el('details', 'portfolio-more');
      details.appendChild(el('summary', '', '샘플 더보기'));
      details.appendChild(renderCategoryImageGroups(more, area, { cols: cols }));
      details.addEventListener('toggle', sendHeight);
      outer.appendChild(details);
    }
    return outer;
  }


  function renderEmojiSizeGuide(item) {
    if (!item || !safe(item.image)) return null;
    var wrap = el('div', 'emoji-size-guide');
    var sizes = [
      { label: '원본', width: 180, original: true },
      { label: '112px', width: 112 },
      { label: '54px', width: 54 },
      { label: '26px', width: 26 }
    ];
    sizes.forEach(function (size) {
      var cell = el('div', 'emoji-size-cell' + (size.original ? ' is-original' : ''));
      var imgWrap = el('div', 'emoji-size-image');
      var img = el('img');
      img.src = driveImage(item.image);
      img.alt = '구독티콘 ' + size.label + ' 미리보기';
      img.loading = 'lazy';
      img.style.width = size.width + 'px';
      img.style.height = size.width + 'px';
      imgWrap.appendChild(img);
      cell.appendChild(imgWrap);
      cell.appendChild(el('strong', '', size.label));
      wrap.appendChild(cell);
    });
    return wrap;
  }

  function renderPortfolioImages(area) {
    var isActive = boolValue(area.active);
    var areaId = safe(area.area_id);
    var images = sortLatest(portfolioState.images.filter(function (item) {
      return safe(item.area_id) === areaId && safe(item.image);
    }));

    var mainCount = Math.max(1, Number(area.c_main || 1));
    var cols = mainColumns(area);
    var checked = sortLatest(images.filter(function (item) {
      return boolValue(item.thumb);
    }));

    var mains = checked.length ? checked.slice(0, mainCount) : images.slice(0, mainCount);
    var more = sortLatest(images.filter(function (item) {
      return !boolValue(item.thumb);
    }));

    if (!more.length && images.length > mains.length) {
      more = sortLatest(images.filter(function (item) {
        return mains.indexOf(item) === -1;
      }));
    }

    var outer = el('div', 'portfolio-samples');

    if (!isActive) {
      var readyWrap = el('div', 'portfolio-images balanced-images');
      readyWrap.style.setProperty('--portfolio-cols', cols);
      readyWrap.innerHTML = '<div class="portfolio-ready">오픈 준비중입니다.</div>';
      outer.appendChild(readyWrap);
      return outer;
    }

    if (areaId === 'gif_talk') {
      outer.appendChild(renderGifTalkCards(images, area));
      return outer;
    }

    if (areaId === 'package') {
      var packageMains = getPackageMainImages(checked);
      if (!packageMains.length) packageMains = getPackageMainImages(images);
      if (!packageMains.length) {
        outer.appendChild(renderImageGrid([], area, { cols: cols }));
      } else {
        outer.appendChild(renderPackageMainImages(images, packageMains));
      }
      var packageKeys = new Set(packageMains.map(itemKey));
      more = sortLatest(images.filter(function (item) {
        return !packageKeys.has(itemKey(item));
      }));
    } else if (areaId === 'dona_image') {
      var donaMains = checked.length ? checked.slice(0, mainCount) : images.slice(0, mainCount);
      outer.appendChild(renderImageGrid(donaMains, area, {
        keepOrder: true,
        cols: Math.max(1, Math.min(cols, donaMains.length || cols)),
        className: 'dona-main-grid show-captions'
      }));
    } else if (areaId === 'v_animal' || areaId === 'v_nyah') {
      outer.appendChild(renderImageGrid(mains, area, {
        keepOrder: true,
        cols: 1,
        className: 'vtuber-main-grid show-captions'
      }));
    } else {
      var mainClass = (areaId === 'ld_illust' || areaId === 'overlay') ? 'show-captions' : '';
      outer.appendChild(renderImageGrid(mains, area, {
        keepOrder: true,
        cols: cols,
        className: mainClass
      }));
    }

    if (more.length) {
      var details = el('details', 'portfolio-more');
      var summary = el('summary', '', '샘플 더보기');
      details.appendChild(summary);

      if (areaId === 'package') {
        details.appendChild(renderPackageMoreImages(more));
      } else {
        details.appendChild(renderGroupedMoreImages(more, area));
      }

      details.addEventListener('toggle', sendHeight);
      outer.appendChild(details);
    }

    return outer;
  }

  function renderPriceRows(area) {
    var rows = portfolioState.prices.filter(function (item) { return safe(item.area_id) === safe(area.area_id); });
    var wrap = el('div', 'price-wrap');
    if (!rows.length) {
      wrap.innerHTML = '<div class="empty">등록된 가격표가 없습니다.</div>';
      return wrap;
    }
    var groups = groupedBy(rows, 'group');
    Object.keys(groups).forEach(function (groupName) {
      var group = el('div', 'price-group');
      if (groupName !== '기본') {
        group.appendChild(el('h4', 'sample-group-title', groupName));
      }
      var grid = el('div', 'price-grid');
      groups[groupName].forEach(function (row) {
        var item = el('article', 'price-card');
        item.innerHTML = '<strong>' + esc(row.label || row.title || '옵션') + '</strong>' + (row.desc ? '<p>' + esc(row.desc) + '</p>' : '') + '<em>' + formatPrice(row.price) + '</em>';
        grid.appendChild(item);
      });
      group.appendChild(grid);
      wrap.appendChild(group);
    });
    return wrap;
  }

  function renderPortfolioOne(area) {
    var section = el('article', 'portfolio-detail' + (!boolValue(area.active) ? ' is-disabled' : ''));
    section.setAttribute('data-area-id', safe(area.area_id));

    if (!boolValue(area.active)) {
      section.setAttribute('data-ready-tooltip', '오픈 준비중입니다.');
    }

    var awning = el('img', 'portfolio-area-awning');
    awning.src = './awning.png';
    awning.alt = '';
    awning.loading = 'lazy';
    section.appendChild(awning);

    var head = el('div', 'portfolio-area-title');
    head.innerHTML =
      '<span class="title-dot">⦁</span>' +
      '<strong>' + esc(area.title || '') + '</strong>' +
      '<span class="title-dot">⦁</span>' +
      (!boolValue(area.active) ? '<em>오픈 준비중입니다.</em>' : '');
    section.appendChild(head);

    if (area.desc) {
      var desc = el('p', 'portfolio-area-desc');
      desc.innerHTML = '♥ ' + esc(area.desc) + ' ♥';
      section.appendChild(desc);
    }

    section.appendChild(renderPortfolioImages(area));
    section.appendChild(renderPriceRows(area));

    return section;
  }

  function renderPortfolioArea() {
    var box = qs('[data-slot="portfolio"]');
    if (!box) return;
    box.innerHTML = '';
    box.classList.add('portfolio-list');
    if (!portfolioState.areas.length) return setError(box, '등록된 포트폴리오가 없습니다.');
    portfolioState.areas.forEach(function (area) { box.appendChild(renderPortfolioOne(area)); });
    sendHeight();
  }

  function renderPortfolio(data) {
    portfolioState.areas = (data[0] || []).filter(function (row) { return safe(row.area_id); }).sort(function (a, b) { return Number(a.order || 0) - Number(b.order || 0); });
    portfolioState.prices = data[1] || [];
    portfolioState.images = data[2] || [];
    portfolioState.current = '';
    renderPortfolioTabs();
    renderPortfolioArea();
  }

  function renderOptions() {
    var box = qs('[data-slot="options"]');
    box.innerHTML = '';
    requestOptions.forEach(function (name) {
      var label = el('label');
      label.innerHTML = '<input type="checkbox" name="option" value="' + name + '"><span>' + name + '</span>';
      if (qtyOptions.indexOf(name) > -1) {
        var input = el('input'); input.type = 'number'; input.min = '1'; input.placeholder = '수량'; input.name = 'qty_' + name; input.disabled = true;
        label.appendChild(input);
      }
      box.appendChild(label);
    });
  }

  function selectedOptions() {
    return Array.prototype.slice.call(document.querySelectorAll('input[name="option"]:checked')).map(function (input) {
      var qty = qs('input[name="qty_' + input.value + '"]');
      return qty && qty.value ? input.value + ' ' + qty.value + '개' : input.value;
    });
  }

  function syncFormDetails() {
    var checked = selectedOptions();
    qs('[data-zip-fields]').hidden = checked.indexOf('짚톡') === -1;
    qs('[data-collab-fields]').hidden = !checked.some(function (x) { return collabOptions.indexOf(x) > -1; });
    Array.prototype.slice.call(document.querySelectorAll('input[type="number"][name^="qty_"]')).forEach(function (qty) {
      var name = qty.name.replace('qty_', '');
      var related = qs('input[name="option"][value="' + name + '"]');
      qty.disabled = !(related && related.checked);
      if (qty.disabled) qty.value = '';
    });
    sendHeight();
  }

  function buildCopyText() {
    var form = qs('#requestForm');
    var options = selectedOptions();
    var zip = Array.prototype.slice.call(document.querySelectorAll('input[name="zipOption"]:checked')).map(function (x) { return x.value; });
    var collab = Array.prototype.slice.call(document.querySelectorAll('input[name="collabConfirm"]:checked')).map(function (x) { return x.value; });
    if (zip.length) options.push('짚톡 옵션: ' + zip.join(', '));
    if (collab.length) options.push(collab.join(', '));
    var contact = qs('input[name="contact"]:checked');
    return ['＊ 활동명/플랫폼: ' + safe(form.activity.value) + ' / ' + safe(form.platform.value),'＊ 신청 옵션: ' + (options.join(', ') || '-'),'＊ 소통 방식: ' + (contact ? contact.value : '-'),'＊ 세부 내용: ' + (safe(form.detail.value) || '-'),'＊ 의뢰 내용: ' + (safe(form.request.value) || '-'),'＊ 질문 사항: ' + (safe(form.question.value) || '-')].join('\n');
  }

  function initForm() {
    renderOptions();
    qs('#requestForm').addEventListener('change', syncFormDetails);
    qs('#requestForm').addEventListener('reset', function () { setTimeout(syncFormDetails, 0); });
    qs('#copyRequest').addEventListener('click', function () {
      var text = buildCopyText();
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).catch(function () {});
    });
    syncFormDetails();
  }

  function sendHeight() {
    var height = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
    parent.postMessage({ type: 'SIWOL_IFRAME_HEIGHT', height: height }, '*');
  }

  function handleMessage(event) {
    var data = event.data || {};
    if (data.type !== 'SIWOL_SCROLL_TO') return;
    var target = document.getElementById(data.sectionId);
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function syncReadyTooltip(event) {
    var target = event.target.closest ? event.target.closest('.portfolio-detail.is-disabled') : null;
    if (!target) return;
    target.style.setProperty('--tip-x', event.clientX + 'px');
    target.style.setProperty('--tip-y', event.clientY + 'px');
  }

  function loadAll() {
    initForm();
    Promise.allSettled([
      fetchCSV(SHEETS.artist, 'artist').then(renderArtist),
      fetchCSV(SHEETS.works).then(renderWorks),
      fetchCSV(SHEETS.calendar).then(renderCalendar),
      fetchCSV(SHEETS.schedule).then(renderSchedule),
      fetchCSV(SHEETS.process).then(renderProcess),
      fetchCSV(SHEETS.notice).then(renderNotice),
      fetchCSV(SHEETS.usage, 'usage').then(renderUsage),
      Promise.all([fetchCSV(SHEETS.portfolioAreas), fetchCSV(SHEETS.portfolioPrices), Promise.all([fetchCSV(SHEETS.portfolioImages), fetchCSV(SHEETS.portfolioBadgeImages), fetchCSV(SHEETS.portfolioEmojiImages), fetchCSV(SHEETS.portfolioMoveEmojiImages), fetchCSV(SHEETS.portfolioOgqImages), fetchCSV(SHEETS.portfolioFacialChartImages), fetchCSV(SHEETS.portfolioFanCharImages), fetchCSV(SHEETS.portfolioSdIllustImages), fetchCSV(SHEETS.portfolioGifTalkImages), fetchCSV(SHEETS.portfolioDonaImageImages), fetchCSV(SHEETS.portfolioLdIllustImages), fetchCSV(SHEETS.portfolioOverlayImages), fetchCSV(SHEETS.portfolioVAnimalImages), fetchCSV(SHEETS.portfolioVNyahImages)]).then(function (sets) { return [].concat.apply([], sets.map(function (set) { return set || []; })); })]).then(renderPortfolio)
    ]).then(function (results) {
      var map = ['artist','works','calendar','schedule','process','notice','usage','portfolio'];
      results.forEach(function (r, i) {
        if (r.status === 'rejected') console.warn(map[i] + ' load failed', r.reason);
      });
      sendHeight();
    });
  }

  window.addEventListener('message', handleMessage);
  window.addEventListener('mousemove', syncReadyTooltip);
  window.addEventListener('load', loadAll);
  window.addEventListener('resize', sendHeight);
  if ('ResizeObserver' in window) new ResizeObserver(sendHeight).observe(document.body);

/* v50: robust iframe height sender */
(function(){
  if (window.__siwolHeightSenderV50) return;
  window.__siwolHeightSenderV50 = true;

  function siwolGetHeight(){
    var body = document.body;
    var html = document.documentElement;

    return Math.max(
      body ? body.scrollHeight : 0,
      html ? html.scrollHeight : 0,
      body ? body.offsetHeight : 0,
      html ? html.offsetHeight : 0,
      body ? body.getBoundingClientRect().height : 0,
      html ? html.getBoundingClientRect().height : 0
    );
  }

  function siwolSendHeight(){
    window.parent.postMessage({
      source:'syura-css',
      type:'SYURA_IFRAME_HEIGHT',
      height:siwolGetHeight()
    }, '*');
  }

  function siwolSendReady(){
    window.parent.postMessage({
      source:'syura-css',
      type:'SYURA_IFRAME_READY'
    }, '*');
    siwolSendHeight();
  }

  window.addEventListener('load', function(){
    siwolSendReady();
    [50,150,350,700,1200,2000,3500].forEach(function(ms){
      setTimeout(siwolSendHeight, ms);
    });
  });

  window.addEventListener('resize', function(){
    siwolSendHeight();
    setTimeout(siwolSendHeight, 200);
  });

  document.addEventListener('toggle', function(e){
    if(e.target && e.target.tagName === 'DETAILS'){
      [30,120,260,600].forEach(function(ms){
        setTimeout(siwolSendHeight, ms);
      });
    }
  }, true);

  document.addEventListener('click', function(){
    requestAnimationFrame(siwolSendHeight);
    setTimeout(siwolSendHeight, 240);
  }, true);

  if ('ResizeObserver' in window) {
    var ro = new ResizeObserver(function(){
      siwolSendHeight();
    });
    if (document.documentElement) ro.observe(document.documentElement);
    if (document.body) ro.observe(document.body);
  }

  if ('MutationObserver' in window) {
    var mo = new MutationObserver(function(){
      siwolSendHeight();
    });
    mo.observe(document.documentElement || document.body, {
      childList:true,
      subtree:true,
      attributes:true,
      attributeFilter:['open','style','class']
    });
  }

  setInterval(siwolSendHeight, 1500);

  if (document.readyState !== 'loading') {
    siwolSendReady();
    setTimeout(siwolSendHeight, 100);
    setTimeout(siwolSendHeight, 500);
  } else {
    document.addEventListener('DOMContentLoaded', siwolSendReady);
  }
})();

})();


/* v52: parent-created right floating menu bridge for iframe embed */
(function(){
  if (window.__siwolParentMenuBridgeV52) return;
  window.__siwolParentMenuBridgeV52 = true;

  var lastViewport = null;
  var lastActiveId = '';

  var NAV_ORDER = [
    { id:'intro', title:'작가 소개' },
    { id:'calendar', title:'예약 현황' },
    { id:'process', title:'진행 방식' },
    { id:'notice', title:'공지사항' },
    { id:'usage', title:'사용 범위' },
    { id:'portfolio', title:'포트폴리오' },
    { id:'portfolio:package', title:'구독 패키지', parent:'portfolio', areaIds:['package','subscribe_package','sub_package'] },
    { id:'portfolio:badge', title:'구독 뱃지', parent:'portfolio', areaIds:['badge','subscribe_badge'] },
    { id:'portfolio:emoji', title:'구독티콘', parent:'portfolio', areaIds:['emoji','subscribe_emoji'] },
    { id:'portfolio:move_emoji', title:'움짤티콘', parent:'portfolio', areaIds:['move_emoji','moving_emoji','gif_emoji'] },
    { id:'portfolio:ogq', title:'OGQ', parent:'portfolio', areaIds:['ogq'] },
    { id:'portfolio:facial_chart', title:'페이셜 차트', parent:'portfolio', areaIds:['facial_chart','facialchart','face_chart'] },
    { id:'portfolio:dona_image', title:'후원 이미지', parent:'portfolio', areaIds:['dona_image','donation_image','donation'] },
    { id:'portfolio:fan_char', title:'팬 캐릭터', parent:'portfolio', areaIds:['fan_char','fan_character'] },
    { id:'portfolio:gif_talk', title:'짚톡', parent:'portfolio', areaIds:['gif_talk','giftalk','ziptalk','zip_talk'] },
    { id:'portfolio:sd_illust', title:'SD 일러스트', parent:'portfolio', areaIds:['sd_illust','sd'] },
    { id:'portfolio:ld_illust', title:'LD 일러스트', parent:'portfolio', areaIds:['ld_illust','ld'] },
    { id:'portfolio:overlay', title:'방송 화면', parent:'portfolio', areaIds:['overlay','broadcast_overlay','screen'] },
    { id:'portfolio:v_animal', title:'멍냥 버츄얼', parent:'portfolio', areaIds:['v_animal','animal_virtual','mungnyang','dogcat'] },
    { id:'portfolio:v_nyah', title:'SD 버츄얼', parent:'portfolio', areaIds:['v_nyah','sd_virtual','virtual_sd'] },
    { id:'form', title:'신청 양식' }
  ];

  function safeText(value){ return String(value == null ? '' : value).replace(/\s+/g, ' ').trim(); }
  function getScrollY(){ return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0; }
  function getTargetY(target){ return target ? Math.max(0, Math.round(target.getBoundingClientRect().top + getScrollY())) : 0; }

  function resolveTarget(sectionId){
    if (!sectionId) return null;
    if (sectionId.indexOf('portfolio:') === 0) {
      var item = NAV_ORDER.filter(function(row){ return row.id === sectionId; })[0];
      var ids = item && item.areaIds ? item.areaIds : [sectionId.replace('portfolio:', '')];
      for (var i = 0; i < ids.length; i++) {
        var found = document.querySelector('[data-area-id="' + ids[i].replace(/"/g,'') + '"]');
        if (found) return found;
      }
      var label = item ? item.title : '';
      if (label) {
        var details = Array.prototype.slice.call(document.querySelectorAll('.portfolio-detail'));
        for (var j = 0; j < details.length; j++) {
          var title = safeText((details[j].querySelector('.portfolio-area-title strong') || details[j].querySelector('.portfolio-detail-head strong')) && (details[j].querySelector('.portfolio-area-title strong') || details[j].querySelector('.portfolio-detail-head strong')).textContent);
          if (title === label || title.indexOf(label) > -1 || label.indexOf(title) > -1) return details[j];
        }
      }
      return document.getElementById('portfolio');
    }
    return document.getElementById(sectionId);
  }

  function getNavItems(){
    return NAV_ORDER.map(function(item){
      return {
        id:item.id,
        title:item.title,
        parent:item.parent || '',
        targetY:getTargetY(resolveTarget(item.id))
      };
    });
  }

  function sendNavItems(){
    window.parent.postMessage({ source:'syura-css', type:'SYURA_NAV_ITEMS', items:getNavItems() }, '*');
  }

  function sendScrollTarget(sectionId, navHeight){
    var target = resolveTarget(sectionId);
    if (!target) return;
    window.parent.postMessage({
      source:'syura-css',
      type:'SYURA_PARENT_SCROLL_TO',
      sectionId:sectionId,
      targetY:getTargetY(target),
      navHeight:Number(navHeight || 0)
    }, '*');
  }

  function sendActive(sectionId){
    if (!sectionId || sectionId === lastActiveId) return;
    lastActiveId = sectionId;
    window.parent.postMessage({ source:'syura-css', type:'SYURA_ACTIVE_SECTION', sectionId:sectionId }, '*');
  }

  function syncActiveFromParentViewport(){
    if (!lastViewport) return;
    var sections = getNavItems().filter(function(item){ return !item.parent || item.id.indexOf('portfolio:') === 0; });
    if (!sections.length) return;
    var parentViewY = Number(lastViewport.scrollY || 0);
    var iframeTop = Number(lastViewport.iframeTop || 0) + parentViewY;
    var line = parentViewY - iframeTop + 190;
    var active = sections[0];
    sections.forEach(function(item){ if (item.targetY <= line) active = item; });
    sendActive(active.id);
  }

  function handleParentMenuMessage(event){
    var data = event.data || {};
    if (data.source !== 'syura-artmug-parent') return;
    if (data.type === 'SYURA_PARENT_REQUEST_NAV') { sendNavItems(); syncActiveFromParentViewport(); return; }
    if (data.type === 'SYURA_PARENT_NAV_TO') { sendScrollTarget(data.sectionId, data.navHeight); sendActive(data.sectionId); return; }
    if (data.type === 'SYURA_PARENT_VIEWPORT') { lastViewport = data; syncActiveFromParentViewport(); }
  }

  window.addEventListener('message', handleParentMenuMessage);
  window.addEventListener('load', function(){ [80,250,700,1400,2500].forEach(function(ms){ setTimeout(sendNavItems, ms); }); });
  window.addEventListener('resize', function(){ sendNavItems(); setTimeout(sendNavItems, 240); });
  document.addEventListener('toggle', function(){ [40,180,420].forEach(function(ms){ setTimeout(sendNavItems, ms); }); }, true);

  if ('ResizeObserver' in window) {
    var ro = new ResizeObserver(function(){ sendNavItems(); syncActiveFromParentViewport(); });
    if (document.body) ro.observe(document.body);
  }
  if ('MutationObserver' in window) {
    var mo = new MutationObserver(function(){ sendNavItems(); syncActiveFromParentViewport(); });
    mo.observe(document.documentElement || document.body, { childList:true, subtree:true, attributes:true, attributeFilter:['id','data-area-id','style','class','open'] });
  }
  setTimeout(sendNavItems, 300);
})();

/* v53: quick action buttons bridge for parent iframe scrolling */
(function(){
  if (window.__siwolQuickActionBridgeV53) return;
  window.__siwolQuickActionBridgeV53 = true;

  function getScrollY(){
    return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
  }

  function getTargetY(target){
    return target ? Math.max(0, Math.round(target.getBoundingClientRect().top + getScrollY())) : 0;
  }

  function sendHeightSoon(){
    if (typeof window.siwolSendHeight === 'function') window.siwolSendHeight();
    [80, 240, 600].forEach(function(ms){
      setTimeout(function(){
        var height = Math.max(
          document.body ? document.body.scrollHeight : 0,
          document.documentElement ? document.documentElement.scrollHeight : 0
        );
        window.parent.postMessage({ source:'syura-css', type:'SYURA_IFRAME_HEIGHT', height:height }, '*');
      }, ms);
    });
  }

  function moveParentTo(sectionId){
    var target = document.getElementById(sectionId);
    if (!target) return;

    window.parent.postMessage({
      source:'syura-css',
      type:'SYURA_PARENT_SCROLL_TO',
      sectionId:sectionId,
      targetY:getTargetY(target),
      navHeight:0
    }, '*');

    // 단독 페이지로 열었을 때도 동작하도록 로컬 스크롤도 함께 유지
    if (window.parent === window) {
      target.scrollIntoView({ behavior:'smooth', block:'start' });
    }

    sendHeightSoon();
  }

  document.addEventListener('click', function(event){
    var link = event.target.closest ? event.target.closest('.quick-actions a[href^="#"]') : null;
    if (!link) return;

    var sectionId = (link.getAttribute('href') || '').replace(/^#/, '');
    if (!sectionId) return;

    event.preventDefault();
    event.stopPropagation();
    moveParentTo(sectionId);
  }, true);
})();

