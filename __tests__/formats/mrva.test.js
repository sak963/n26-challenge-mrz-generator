const {generateMrv} = require("../../index");
const inputDataForMrvb = require("../data/input-for-global-tests-mrvb.json");

test('FORMATS TD3: Should generate MRV type B', () => {
  const mrz = generateMrv(inputDataForMrvb)
  expect(mrz).toBe(
    'V<VENFUENTES<MORA<<GLADYS<<<<<<<<<<<\n2912960<<9COL7010169F2903013281122<<'
  )
})