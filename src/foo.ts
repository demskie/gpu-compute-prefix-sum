import * as gpu from "gpu-compute";
import { readFileSync } from "fs";

export const searchAndReplace = {
  "float round(float);": gpu.functionStrings.round,
  "float floatEquals(float, float);": gpu.functionStrings.floatEquals,
  "float floatNotEquals(float, float);": gpu.functionStrings.floatNotEquals,
  "float floatLessThan(float, float);": gpu.functionStrings.floatLessThan,
  "float floatGreaterThan(float, float);": gpu.functionStrings.floatGreaterThan,
  "float floatLessThanOrEqual(float, float);": gpu.functionStrings.floatLessThanOrEqual,
  "float floatGreaterThanOrEqual(float, float);": gpu.functionStrings.floatGreaterThanOrEqual,
  "float vec2ToUint16(vec2);": gpu.functionStrings.vec2ToUint16,
  "vec2 uint16ToVec2(float);": gpu.functionStrings.uint16ToVec2,
  "float vec2ToInt16(vec2);": gpu.functionStrings.vec2ToInt16,
  "vec2 int16ToVec2(float);": gpu.functionStrings.int16ToVec2,
  "void unpackBooleans(float, inout bool arr[8]);": gpu.functionStrings.unpackBooleans,
  "void packBooleans(bool arr[8]);": gpu.functionStrings.packBooleans,
  "struct texcoord { float x, y, w; };": gpu.functionStrings.texcoord,
  "texcoord addTexcoord(texcoord, float);": gpu.functionStrings.addTexcoord,
  "texcoord subtractTexcoord(texcoord, float);": gpu.functionStrings.subtractTexcoord,
  "texcoord oneSixteenthTexcoord(texcoord);": gpu.functionStrings.oneSixteenthTexcoord,
  "texcoord oneFourthTexcoord(texcoord);": gpu.functionStrings.oneFourthTexcoord,
  "texcoord oneHalfTexcoord(texcoord);": gpu.functionStrings.oneHalfTexcoord,
  "texcoord doubleTexcoord(texcoord);": gpu.functionStrings.doubleTexcoord,
  "texcoord quadrupleTexcoord(texcoord);": gpu.functionStrings.quadrupleTexcoord,
  "texcoord sexdecupleTexcoord(texcoord);": gpu.functionStrings.sexdecupleTexcoord
};

const fooFrag = readFileSync(require.resolve("./shaders/foo.frag"), "utf8");

export function foo() {
  const shader = new gpu.ComputeShader(fooFrag, searchAndReplace);
  const target = new gpu.RenderTarget(4);
  const input = [] as number[];
  [3, 1, 7, 0, 4, 1, 6, 3].forEach((v: number) => input.push(0, 0, 0, v));
  target.pushTextureData(new Uint8Array(input));
  for (let i = 1; i <= target.width * target.width; i *= 2) {
    target.compute(shader, {
      u_tex: target,
      u_neighborX: i % target.width,
      u_neighborY: Math.floor(i / target.width),
      u_width: target.width
    });
  }
  const output = target.readPixels();
  const results = [];
  for (let i = 0; i < output.length; i += 4) {
    results.push(gpu.unpackUint16(output[i + 2], output[i + 3]));
  }
  return results.slice(0, 8);
}
