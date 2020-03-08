import * as gpu from "gpu-compute";
import * as index from "../index";

beforeAll(() => {
  gpu.setWebGLContext(require("gl")(1, 1));
});

test("testFoo", () => {
  expect(`${index.foo()}`).toEqual(`${[3, 4, 11, 11, 15, 16, 22, 25]}`);
});
