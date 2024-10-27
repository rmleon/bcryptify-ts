import ZippedCharIterable from "./ZippedCharIterable";
/**
 * A utility class for translating strings between bcrypt's custom Base64 encoding and standard Base64 encoding.
 */
export default class Base64Translator {
    // Bcrypt and Base64 character sets
    private static bcrypt = "./ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    private static base64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    // Maps for translating characters between bcrypt and Base64
    private static bcryptKey: Map<string, string> = new Map(new ZippedCharIterable(this.bcrypt, this.base64));
    private static base64Key: Map<string, string> = new Map(new ZippedCharIterable(this.base64, this.bcrypt));
    /**
     * Converts a string from standard Base64 encoding to bcrypt's custom Base64 encoding. Ignores invalid characters.
     *
     * @param {string} base64Input - The input string in standard Base64 encoding.
     * @returns {string} - The translated string in bcrypt's Base64 encoding.
     * 
     * @example
     * const bcryptString = Base64Translator.toBcrypt("SGVsbG8gd29ybGQ="); // "./e..AaF...."
     */
    static toBcrypt(base64Input: string) {
        return Array.from(base64Input).map((c) => this.base64Key.get(c)).join("");
    }

    /**
     * Converts a string from bcrypt's custom Base64 encoding to standard Base64 encoding. Ignores invalid characters.
     *
     * @param {string} bcryptInput - The input string in bcrypt's custom Base64 encoding.
     * @returns {string} - The translated string in standard Base64 encoding. Doesn't use the equals (=) character.
     * 
     * @example
     * const base64String = Base64Translator.toBase64("./e..AaF...."); // "SGVsbG8gd29ybGQ"
     */
    static toBase64(bcryptInput: string) {
        return Array.from(bcryptInput).map((c) => this.bcryptKey.get(c)).join("");
    }
}
