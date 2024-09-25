// import React from 'react';
// import { createSession, viewSession, invalidateSession } from './sessionService'; // Adjust the path as needed

// const SessionManager = () => {
//     const handleCreateSession = async () => {
//         try {
//             await createSession();
//             alert('Session created successfully!');
//         } catch (error) {
//             alert('Error creating session. Check the console for details.');
//         }
//     };

//     const handleViewSession = async () => {
//         try {
//             await viewSession();
//         } catch (error) {
//             alert('Error retrieving session data. Check the console for details.');
//         }
//     };

//     const handleInvalidateSession = async () => {
//         try {
//             await invalidateSession();
//             alert('Session invalidated successfully!');
//         } catch (error) {
//             alert('Error invalidating session. Check the console for details.');
//         }
//     };

//     return (
//         <div>
//             <button onClick={handleCreateSession}>Create Session</button>
//             <button onClick={handleViewSession}>View Session</button>
//             <button onClick={handleInvalidateSession}>Invalidate Session</button>
//         </div>
//     );
// };

// export default SessionManager;
