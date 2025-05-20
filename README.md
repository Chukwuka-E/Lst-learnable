## Learnable 24 Backend Standardisation Test
 This is one of my last project with learnable, my banking API built for the Learnable 24 Backend Standardisation Test. Crafted with Node.js, TypeScript, Express, and MongoDB, it’s a secure, scalable system that powers core banking operations with a focus on reliability and clean code.
## Features

1.  Account Creation: The POST /api/accounts endpoint lets users create accounts with auto-generated virtual cards, encrypting sensitive data like phone numbers and dates of birth using AES for top-notch security.
2. Account Listing: The GET /api/accounts endpoint retrieves all accounts, complete with their linked virtual cards, displaying both encrypted and decrypted data for transparency.
3. Data Decryption: The POST /api/decrypt endpoint securely decrypts fields like card numbers, ensuring safe access to sensitive info.


## Favorite Custodian
I’m shouting out Edeba as my favorite custodian for their clear guidance and support, especially in nailing the documentation for Trial 5.

## Finable-hosted API Documentation
The API is live at:" https://finable.onrender.com ". Check my docs/postman_collection.json for the Postman endpoints, detailing all the banking goodness!
