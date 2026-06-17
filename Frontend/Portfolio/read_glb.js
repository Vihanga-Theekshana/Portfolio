const fs = require('fs');

try {
  const glb = fs.readFileSync('public/Model_1781689221684.glb');
  const magic = glb.readUInt32LE(0);
  if (magic !== 0x46546C67) throw new Error("Not a GLB");
  const jsonChunkLength = glb.readUInt32LE(12);
  const jsonChunkString = glb.toString('utf8', 20, 20 + jsonChunkLength);
  const json = JSON.parse(jsonChunkString);
  const nodeNames = json.nodes.map(n => n.name).filter(n => n);
  console.log("GLB Node names (first 20):", nodeNames.slice(0, 20).join(', '));
} catch (e) {
  console.error("Error reading GLB:", e.message);
}
