const fs = require('node:fs/promises');
const path = require('node:path');
const { cwd } = require('node:process');

(async () => {
  await fs.cp(
    path.join(__dirname, 'assets'),
    path.join(cwd(), 'symbol-tools', 'assets'),
    { recursive: true }
  );
  await fs.cp(
    path.join(__dirname, 'src'),
    path.join(cwd(), 'symbol-tools', 'src'),
    { recursive: true }
  );
  console.log(`Tools have been copied into ${cwd()}/symbol-assets`);
})();
