# bcryptify-ts

## Overview

`BCrypt.ts` is a TypeScript implementation of the BCrypt password hashing algorithm. This module provides utilities for hashing passwords and generating salts, allowing developers to protect sensitive user data.

## Features
- Hash a password using the BCrypt algorithm.
- Validate hashed passwords against plaintext input.
- Generate and validate custom salts.
- Use a customizable number of hashing rounds (cost factor).

## Installation

To use the `BCrypt` module, you need to add it as a dependency to your project.

```sh
npm install bcrypt-ts
```

## Usage

### Importing BCrypt

To use the `BCrypt` class, import it into your TypeScript project as follows:

```typescript
import BCrypt from './BCrypt';
```

### Example: Hashing a Password

To hash a password, you first need to generate a salt and then pass the password and the generated salt to the hash function:

```typescript
import BCrypt from './BCrypt';

const password = "my_secure_password";
const salt = BCrypt.salt(12); // The number of rounds (cost factor)

const hashedPassword = BCrypt.hash(password, salt);
console.log(`Hashed Password: ${hashedPassword}`);
```

### Example: Validating a Password

To validate a password, use the `BCrypt.check()` function. This method compares a plaintext password to a previously hashed one.

```typescript
import BCrypt from './BCrypt';

const isValid = BCrypt.check("my_secure_password", hashedPassword);
if (isValid) {
    console.log("Password matches!");
} else {
    console.log("Password does not match.");
}
```

## Methods

### `salt(logRounds: number): string`
Generates a salt for use with the `BCrypt.hash()` method.
- **Parameters**:
  - `logRounds`: The cost factor, which determines the complexity of the hashing operation.
- **Returns**: A string representation of the generated salt.

### `hash(password: LimitedString<72>, encodedSalt: string): string`
Hashes a password using BCrypt.
- **Parameters**:
  - `password`: The plaintext password.
  - `encodedSalt`: The salt to use for hashing.
- **Returns**: The resulting BCrypt hash.

### `check(plainText: LimitedString<72>, hashed: string): boolean`
Checks if a plaintext password matches a hashed password.
- **Parameters**:
  - `plainText`: The plaintext password.
  - `hashed`: The previously hashed password.
- **Returns**: `true` if the password matches, otherwise `false`.

## License

MIT License

This project is licensed under the MIT License. See the [LICENSE.txt](./LICENSE) file for more information.

