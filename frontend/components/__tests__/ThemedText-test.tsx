import * as React from "react";
import renderer from "react-test-renderer";

import { Txt } from "../StyledText";

it(`renders correctly`, () => {
  const tree = renderer.create(<Txt>Snapshot test!</Txt>).toJSON();

  expect(tree).toMatchSnapshot();
});
