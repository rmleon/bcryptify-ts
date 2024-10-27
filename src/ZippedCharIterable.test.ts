import ZippedCharIterable from "./ZippedCharIterable";

describe('ZippedCharIterable', () => {
    it('should correctly zip two equal-length strings', () => {
        const firstString = "ABC";
        const secondString = "123";
        const zipped = new ZippedCharIterable(firstString, secondString);

        const result = Array.from(zipped);
        expect(result).toEqual([['A', '1'], ['B', '2'], ['C', '3']]);
    });

    it('should handle empty strings without error', () => {
        const firstString = "";
        const secondString = "";
        const zipped = new ZippedCharIterable(firstString, secondString);

        const result = Array.from(zipped);
        expect(result).toEqual([]);
    });

    it('should throw an error if strings are of unequal length', () => {
        const firstString = "AB";
        const secondString = "123";

        expect(() => new ZippedCharIterable(firstString, secondString)).toThrowError();
    });

    it('should iterate over all character pairs correctly', () => {
        const firstString = "hello";
        const secondString = "world";
        const zipped = new ZippedCharIterable(firstString, secondString);

        const result = Array.from(zipped);
        expect(result).toEqual([['h', 'w'], ['e', 'o'], ['l', 'r'], ['l', 'l'], ['o', 'd']]);
    });
});
