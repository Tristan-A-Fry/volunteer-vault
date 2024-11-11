/// volunteerHistoryController.js
const db = require('../config/index');

const retrieveHistory = async (req, res) => {
    try {
        const db_con = await db();
        console.log("Database connected successfully");

        // Fetch volunteer history details with necessary joins
        const [rows] = await db_con.query(`
            SELECT 
                vh.history_id,
                vh.volunteer_id,
                vh.event_id,
                vh.participation_status,
                up.full_name AS volunteer_name,
                ed.event_name,
                ed.event_description,
                ed.location,
                ed.required_skills,
                ed.urgency,
                ed.event_date
            FROM 
                volunteerhistory vh
            JOIN 
                userprofile up ON vh.volunteer_id = up.profile_owner_id
            JOIN 
                eventdetails ed ON vh.event_id = ed.event_id
        `);

        await db_con.end();
        
        res.status(200).json(rows);
    } catch (error) {
        console.error("Error fetching volunteer history:", error);
        res.status(500).json({ error: "Error fetching volunteer history" });
    }
};

module.exports = { retrieveHistory  };

// This file contains the logic for handling requests. 
// In this case, the retrieveHistory function fetches the volunteerHistory data and returns it as a JSON response.

// API Flow: Between the Controller, Route, & Data Files
//	1.	Client makes a POST request to /retrieveHistory.
//	2.	The Express route matches this URL and method (POST), and the request is passed to the controller.
//	3.	The controller retrieves the volunteer history data from the data file.
//	4.	The data is sent as a JSON response to the client.


// let volunteerHistory = require("../data/volunteerHistory"); // Import hardcoded data
//
// // Function to retrieve all participation history
// exports.retrieveHistory = (req, res) => {
//     //console.log("volunteerHistory", volunteerHistory);
//     res.status(200).json(volunteerHistory);
//
// };
//

// Function to update participation status
/* exports.updateParticipationStatus = (req, res) => {
    const { volunteerName, eventName, newStatus } = req.body;

    // Find the matching record based on volunteerName and eventName
    let participationRecord = volunteerHistory.find(record =>
        record.volunteerName === volunteerName && record.eventName === eventName
    );

    // If found, update the participation status
    if (participationRecord) {
        participationRecord.participationStatus = newStatus;
        res.status(200).json({ message: "Status updated successfully", record: participationRecord });
    } else {
        res.status(404).json({ message: "Volunteer or event not found" });
    }
}; */
