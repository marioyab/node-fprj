const fs = require('fs')
const iconv = require('iconv');

function toUTF8(body) {
  // convert from iso-8859-1 to utf-8
  var ic = new iconv.Iconv('UTF-8', 'UTF-8');
  var buf = ic.convert(body);
  return buf.toString();
}

const data = fs.readFileSync('./dados.sql','latin1')
const res = toUTF8(data)

fs.writeFileSync('./bd.sql', res)
console.log('Encerrado.')


