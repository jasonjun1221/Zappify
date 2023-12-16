import { validateEmail, shortenText, getProductIdsAndCartQuantity } from "./utils";
import { describe, expect, it } from "vitest";

describe("shortenText Function", () => {
  it('shortens text to the specified length and adds "..." at the end', () => {
    const originalText = "This is a long text that needs to be shortened.";
    const shortenedText = shortenText(originalText, 20);
    expect(shortenedText).toBe("This is a long text ...");
  });

  it("does not change the text if its length is less than or equal to the specified length", () => {
    const originalText = "Short text";
    const shortenedText = shortenText(originalText, 20);

    expect(shortenedText).toBe(originalText);
  });
});

describe("validateEmail Function", () => {
  it("returns true for a valid email address", () => {
    const validEmail = "example@example.com";
    const isValid = validateEmail(validEmail);

    expect(isValid).toBeTruthy();
  });

  it("returns false for an invalid email address", () => {
    const invalidEmail = "invalid_email";
    const isValid = validateEmail(invalidEmail);

    expect(isValid).toBeFalsy();
  });
});

describe("getProductIdsAndCartQuantity Function", () => {
  it("returns an array of product IDs and cart quantities", () => {
    const products = [
      { _id: "product1", cartQuantity: 3 },
      { _id: "product2", cartQuantity: 2 },
    ];
    const result = getProductIdsAndCartQuantity(products);

    expect(result).toEqual([
      { _id: "product1", cartQuantity: 3 },
      { _id: "product2", cartQuantity: 2 },
    ]);
  });

  it("returns an empty array if input is an empty array", () => {
    const products = [];
    const result = getProductIdsAndCartQuantity(products);

    expect(result).toEqual([]);
  });
});
