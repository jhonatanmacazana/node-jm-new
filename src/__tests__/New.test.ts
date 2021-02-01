import New from "../New";

test("New check length of available types ", async () => {
  const types: string[] = await New.getTypes();
  expect(types.length).toBeGreaterThanOrEqual(0);
});
