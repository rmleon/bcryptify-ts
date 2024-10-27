
import { createLimitedString } from "limitedstring-ts";
import BCrypt from "./BCrypt";

const validTestPasswords = [
    ["test", "$2a$06$taUt9mNQN/OEJqHUQw7hEu", "$2a$06$taUt9mNQN/OEJqHUQw7hEuHmqdNbKkdT1LC54VcV4TLM6ctI6XI4C"],
    ["Hello", "$2a$04$Ple0QwxiRAJSclOT8yq4r.", "$2a$04$Ple0QwxiRAJSclOT8yq4r.SuhyoAaZtEOS64rgLQRsVaJJ3UnXT4u"]];


describe('BCrypt', () => {
    const invalidPassword: string = 'wrongPassword';
    const maxLogRounds = 31;
    const mockHash = createLimitedString('$2b$10$salt_string_that_is_22_chars', 60);
    const plainTextPassword = createLimitedString('testpassword', 72);

    function generateRandomSaltBytes(length: number): Uint8Array {
        const bytes = new Uint8Array(length);
        for (let i = 0; i < length; i++) {
            bytes[i] = Math.floor(Math.random() * 256);
        }
        return bytes;
    }

    describe('hash', () => {
        for (const t of validTestPasswords) {
            const [pw, salt, result] = t;
            test(`test password "${pw}" with salt ${salt}`, () => {
                const limitedPw = createLimitedString(pw, 72);
                const limitedSalt = createLimitedString(salt, 29);
                const hashed = BCrypt.hash(limitedPw, limitedSalt);
                expect(hashed).toStrictEqual(result);
                expect(BCrypt.check(limitedPw, hashed)).toBeTruthy();
                expect(BCrypt.check(createLimitedString(invalidPassword, 72), hashed)).toBeFalsy();
            });
        };
        it('should throw an error if the salt version is invalid', () => {
            const encodedSalt = createLimitedString('*1b$10$salt_string_that_is_22', 29);
            expect(() => BCrypt.hash(plainTextPassword, encodedSalt)).toThrow('Invalid salt version');
        });
        it('should throw an error if the minor version is invalid', () => {
            const encodedSalt = createLimitedString('$2c$10$salt_string_that_is_22', 29); // Invalid minor version 'c'
            expect(() => BCrypt.hash(plainTextPassword, encodedSalt)).toThrow("Invalid salt format. Salt must match BCrypt format.");
        });
        it('should throw an error if the rounds are not a number', () => {
            const encodedSalt = createLimitedString('$2b$xx$salt_stri', 29);
            expect(() => BCrypt.hash(plainTextPassword, encodedSalt)).toThrow('Invalid salt format. Salt must match BCrypt format.');
        });
        it('should throw an error if the salt format is invalid', () => {
            const encodedSalt = '$2b10$salt_string_that_is_22_chars';
            expect(() => (BCrypt as any).parseSalt(encodedSalt)).toThrow('Invalid salt');
        });
    });


    describe('salt', () => {
        it('should generate a valid salt string', () => {
            const logRounds = 10;
            const randomSaltBytes = generateRandomSaltBytes(16);
            const salt = BCrypt.salt(logRounds, randomSaltBytes);

            expect(salt).toMatch(/^\$2b\$10\$/);
            expect(salt).toHaveLength(29);
        });

        it('should throw an error if logRounds exceed the maximum number of rounds', () => {
            expect(() => {
                BCrypt.salt(maxLogRounds + 1);
            }).toThrow(`log_rounds exceeds maximum (${maxLogRounds})`);
        });
    });

    describe('check', () => {
        it('should return true if the hashed password matches', () => {
            jest.spyOn(BCrypt, 'hash').mockReturnValue(mockHash);
            const result = BCrypt.check(plainTextPassword, mockHash);
            expect(result).toBe(true);
        });

        it('should return false if the hashed password does not match', () => {
            jest.spyOn(BCrypt, 'hash').mockReturnValue(createLimitedString('different_hash', 60));
            const result = BCrypt.check(plainTextPassword, mockHash);
            expect(result).toBe(false);
        });
    });
});