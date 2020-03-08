import * as gpu from "gpu-compute";
import * as index from "../index";

beforeAll(() => {
  gpu.setWebGLContext(require("gl")(1, 1));
});

test("testFoo", () => {
  expect(index.foo()).toEqual(4);
});
