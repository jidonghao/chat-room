let tools = {
  formatDate: (time, format = 'YY-MM-DD hh:mm:ss') => {
    let date = new Date(time);
    let year = date.getFullYear(),
      month = date.getMonth() + 1,//月份是从0开始的
      day = date.getDate(),
      hour = date.getHours(),
      min = date.getMinutes(),
      sec = date.getSeconds();
    let preArr = Array.apply(null, Array(10)).map(function (elem, index) {
      return '0' + index;
    });
    return format.replace(/YY/g, year)
      .replace(/MM/g, preArr[month] || month)
      .replace(/DD/g, preArr[day] || day)
      .replace(/hh/g, preArr[hour] || hour)
      .replace(/mm/g, preArr[min] || min)
      .replace(/ss/g, preArr[sec] || sec);
  },
  reData: (topic, payload) => {
    let result = '';
    for (let i = 0; i < payload.byteLength; i++) {
      result += String.fromCharCode(payload[i]);
    }
    return JSON.parse(result)
  },
  utf8ByteToUnicodeStr: (utf8Bytes) => {
    var unicodeStr = "";
    for (var pos = 0; pos < utf8Bytes.length;) {
      var flag = utf8Bytes[pos];
      var unicode = 0;
      if ((flag >>> 7) === 0) {
        unicodeStr += String.fromCharCode(utf8Bytes[pos]);
        pos += 1;

      } else if ((flag & 0xFC) === 0xFC) {
        unicode = (utf8Bytes[pos] & 0x3) << 30;
        unicode |= (utf8Bytes[pos + 1] & 0x3F) << 24;
        unicode |= (utf8Bytes[pos + 2] & 0x3F) << 18;
        unicode |= (utf8Bytes[pos + 3] & 0x3F) << 12;
        unicode |= (utf8Bytes[pos + 4] & 0x3F) << 6;
        unicode |= (utf8Bytes[pos + 5] & 0x3F);
        unicodeStr += String.fromCharCode(unicode);
        pos += 6;

      } else if ((flag & 0xF8) === 0xF8) {
        unicode = (utf8Bytes[pos] & 0x7) << 24;
        unicode |= (utf8Bytes[pos + 1] & 0x3F) << 18;
        unicode |= (utf8Bytes[pos + 2] & 0x3F) << 12;
        unicode |= (utf8Bytes[pos + 3] & 0x3F) << 6;
        unicode |= (utf8Bytes[pos + 4] & 0x3F);
        unicodeStr += String.fromCharCode(unicode);
        pos += 5;

      } else if ((flag & 0xF0) === 0xF0) {
        unicode = (utf8Bytes[pos] & 0xF) << 18;
        unicode |= (utf8Bytes[pos + 1] & 0x3F) << 12;
        unicode |= (utf8Bytes[pos + 2] & 0x3F) << 6;
        unicode |= (utf8Bytes[pos + 3] & 0x3F);
        unicodeStr += String.fromCharCode(unicode);
        pos += 4;

      } else if ((flag & 0xE0) === 0xE0) {
        unicode = (utf8Bytes[pos] & 0x1F) << 12;
        ;
        unicode |= (utf8Bytes[pos + 1] & 0x3F) << 6;
        unicode |= (utf8Bytes[pos + 2] & 0x3F);
        unicodeStr += String.fromCharCode(unicode);
        pos += 3;

      } else if ((flag & 0xC0) === 0xC0) { //110
        unicode = (utf8Bytes[pos] & 0x3F) << 6;
        unicode |= (utf8Bytes[pos + 1] & 0x3F);
        unicodeStr += String.fromCharCode(unicode);
        pos += 2;

      } else {
        unicodeStr += String.fromCharCode(utf8Bytes[pos]);
        pos += 1;
      }
    }
    return unicodeStr;
  }
}

export default tools
