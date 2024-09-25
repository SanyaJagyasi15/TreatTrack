// package com.example.receipt_management_system.Controller;

// import org.springframework.web.bind.annotation.GetMapping;
// import org.springframework.web.bind.annotation.RestController;

// import jakarta.servlet.http.HttpSession;

// @RestController
// public class SessionController {

//     // Create and store session attribute
//     @GetMapping("/session/create")
//     public String createSession(HttpSession session) {
//         session.setAttribute("username", "Sanya");
//         return "Session created with username: " + session.getAttribute("username");
//     }

//     // Retrieve session attribute
//     @GetMapping("/session/view")
//     public String viewSession(HttpSession session) {
//         String username = (String) session.getAttribute("username");
//         if (username == null) {
//             return "No session found";
//         }
//         return "Session username: " + username;
//     }

//     // Invalidate session
//     @GetMapping("/session/invalidate")
//     public String invalidateSession(HttpSession session) {
//         session.invalidate();
//         return "Session invalidated";
//     }
// }