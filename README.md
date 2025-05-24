## Finable: A Banking API That Packs a Punch!
   
Hey there! I’m Chukwuka, and Finable is my stellar banking API built for the Learnable 24 Backend Standardisation Test. Crafted with Node.js, TypeScript, Express, and MongoDB, this is a secure, scalable powerhouse for core banking operations, blending clean code with unrelenting reliability.
## Overview
Finable is more than an API—it’s my hustle and craft, designed to make banking seamless and secure. From creating accounts with virtual cards to decrypting sensitive data, this project tackles real-world challenges with finesse.
## Features

Effortless Account Creation:The POST /api/accounts endpoint spins up accounts with auto-generated virtual cards. Sensitive data like phone numbers, dates of birth, and card details? Secured with Crypto AES encryption for top-tier protection.

Transparent Account Listing:Hit GET /api/accounts to fetch all accounts and their linked virtual cards, served with both encrypted and decrypted data for ultimate transparency.

Secure Data Decryption:The POST /api/decrypt endpoint unlocks sensitive fields like card numbers safely, ensuring only authorized access.

## The Grind
Building finable was like cooking the perfect jollof rice—every ingredient had to pop. I wrestled with CVV generation bugs, streamlined encryption, and optimized ID generation with crypto. Hours of debugging, logging, and redeploying later, this API is a vibe: secure, efficient, and ready to impress.
## Shoutout to Edeba
Big love to my favorite custodian, Edeba, for their top-notch guidance. Your insights on documentation and testing polished Lst-learnable into a Trial 5 gem.

## API Documentation

Live API: Explore the action at "https://finable.onrender.com".
Postman Collection: for the live postman documentation Dive check my published link; "https://documenter.getpostman.com/view/42949149/2sB2qcBLVn" or check into docs/postman_collection.json for detailed endpoints, covering account creation, listing, and decryption.

Deployment
Finable is hosted on Render with MongoDB Atlas for seamless scalability. Check it out live at " https://finable.onrender.com " Faced deployment hiccups? I tackled TypeScript errors and MongoDB whitelist issues to ensure a smooth ride.
Try It Out!

GitHub Repo: See the code magic at "https://github.com/Chukwuka-E/Lst-learnable".
Test the API: Use Postman with the endpoints in by live link "https://documenter.getpostman.com/view/42949149/2sB2qcBLVn" or  docs/postman_collection.json to create accounts, list data, and decrypt fields.

Finable is my proof of what’s possible—secure, scalable, and built to impress. Ready to dive in, Edeba? Let’s make banking epic🙂🙂!
