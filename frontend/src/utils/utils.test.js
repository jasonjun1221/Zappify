import { shortenText, validateEmail, getProductIdsAndCartQuantity } from "./utils";
import { describe, test, expect } from "vitest";

// Test cases for shortenText function
describe("shortenText function", () => {
  test('should shorten text and add "..." if it exceeds the specified length', () => {
    const inputText = "This is a long text";
    const maxLength = 10;
    const result = shortenText(inputText, maxLength);
    expect(result).toBe("This is a ...");
  });

  test("should not modify text if it is within the specified length", () => {
    const inputText = "Short text";
    const maxLength = 20;
    const result = shortenText(inputText, maxLength);
    expect(result).toBe(inputText);
  });
});

// Test cases for validateEmail function
describe("validateEmail function", () => {
  test("should return true for a valid email address", () => {
    const validEmail = "test@example.com";
    const result = validateEmail(validEmail);
    expect(result).toBeTruthy();
  });

  test("should return false for an invalid email address", () => {
    const invalidEmail = "invalid-email";
    const result = validateEmail(invalidEmail);
    expect(result).toBeFalsy();
  });
});

// Test cases for getProductIdsAndCartQuantity function
describe("getProductIdsAndCartQuantity function", () => {
  test("should extract product IDs and cart quantities from cart items", () => {
    const products = [
      { _id: "product1", cartQuantity: 2 },
      { _id: "product2", cartQuantity: 1 },
    ];
    const result = getProductIdsAndCartQuantity(products);
    const expected = [
      { _id: "product1", cartQuantity: 2 },
      { _id: "product2", cartQuantity: 1 },
    ];
    expect(result).toEqual(expected);
  });

  test("should return an empty array for an empty input array", () => {
    const result = getProductIdsAndCartQuantity([]);
    expect(result).toEqual([]);
  });
});
