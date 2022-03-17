import React from "react";
import { shallow } from "enzyme";
import Footer from "./Footer";
import { expect } from "@jest/globals";
import { beforeEach } from "@jest/globals";

const setUp = (props = {}) => {
  const component = shallow(<Footer {...props} />);
  return component;
};

describe("Footer Component", () => {
  let component;
  beforeEach(() => {
    component = setUp();
  });

  it("Should render Copyright", () => {
    const copyRight = component.find(`[data-test='Copyright © Dulstech']`);
    expect(copyRight.length).toBe(1);
  });
});
