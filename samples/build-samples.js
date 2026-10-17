// Writes the sample PDFs to disk using the same generator embedded in ../index.html
const fs = require('fs'), path = require('path');
const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
const m = /<script id="samplegen">([\s\S]*?)<\/script>/.exec(html);
const { makeSample, SAMPLES } = new Function(m[1] + '\nreturn { makeSample, SAMPLES };')();
for (const s of SAMPLES) {
  const dir = path.join(__dirname, s.fixable ? 'fixable' : 'unfixable');
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, s.file), makeSample(s.kind));
  console.log((s.fixable ? 'fixable   ' : 'unfixable ') + s.file);
}
