# Tourism_Management_System
I have develeop a tourism management system using javascript, node.js and express. This system allows users to create, read, update and delete (CRUD) tourist attractions, hotels, and help manage ratings based on those reviews.

MONGOOSE MODELS OF THE DEVELOPMENT:  1)attraction.js  2)review.js  3)visitor.js

FEATURES OF THE DEVELOPMENT:
1. Attractions Management

Create Attraction: Add a new tourist attraction with details such as name, location, and entry fee.

Read Attractions: Retrieve all attractions from the database.

Update Attraction: Modify details of an existing attraction.

Delete Attraction: Remove an attraction from the database.

2. Visitor Management

Create Visitor: Register a new visitor with their name, email, and visited attractions.

Read Visitors: Fetch all registered visitors along with the attractions they visited.

Update Visitor: Edit visitor details such as name, email, and visited attractions.

Delete Visitor: Remove a visitor from the database.

3. Review Management

Create Review: Allow visitors to add reviews for attractions they have visited. Each review includes a score (1-5) and a comment.

Automatically updates the average rating of the attraction.

Read Reviews: Retrieve all reviews with details about the visitor and attraction.

Delete Review: Remove a review and update the average rating of the corresponding attraction.

4. Additional Endpoints

Top-Rated Attractions: Retrieve the top 5 attractions based on average rating.

Visitor Activity: Fetch visitors along with the count of attractions they have reviewed.