/**
 * A class that implements an iterable, allowing the iteration over pairs of characters from two strings.
 * The two strings are "zipped" together character by character.
 * Note: this doesn't work with strings that use 2 characters points, such as emojis.
 * 
 * @example
 * const zipped = new ZippedCharIterable("ABC", "123");
 * for (const [char1, char2] of zipped) {
 *     console.log(char1, char2); 
 *     // Output: A 1
 *     //         B 2
 *     //         C 3
 * }
 */
export default class ZippedCharIterable implements Iterable<[string, string]> {
    /**
      * Creates an instance of ZippedCharIterable.
      * 
      * @param {string} firstString - The first string to be zipped.
      * @param {string} secondString - The second string to be zipped.
      * @throws {Error} Throws an error if the two strings are not of equal length.
      */
    constructor(private firstString: string, private secondString: string) {
        if (firstString.length !== secondString.length) {
            throw new Error('Strings must be of equal length');
        }
    }

    /**
     * Returns an iterator that allows for iterating over pairs of characters from the two strings.
     * Each iteration yields a tuple containing characters from the same index of the first and second strings.
     * 
     * @returns {Iterator<[string, string]>} An iterator over pairs of characters from the two strings.
     */
    *[Symbol.iterator](): Iterator<[string, string]> {
        for (let i = 0; i < this.firstString.length; i += 1) {
            yield [this.firstString[i], this.secondString[i]];
        }
    }
};