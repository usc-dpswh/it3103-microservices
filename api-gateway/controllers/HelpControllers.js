// // HelpControllers.js

// import { db } from "../db";
// import { tickets } from "../db/schema";
// import { insertTicketSchema } from "../types/ticket.type";

// export const HelpControllers = {
//   getAllTickets: async (req, res) => {
//     try {
//       const allTickets = await db.query.tickets.findMany();
//       res.json(allTickets);
//     } catch (error) {
//       console.error("Error fetching tickets:", error.message);
//       res.status(500).send("Error fetching tickets");
//     }
//   },

//   createTicket: async (req, res) => {
//     try {
//       const body = req.body; // Assuming body is sent as JSON
//       const data = insertTicketSchema.parse(body); // Validate the data

//       // Insert the ticket into the database
//       const newTicket = await db.insert(tickets).values(data).returning();
//       res.status(201).json(newTicket[0]);
//     } catch (error) {
//       console.error("Error creating ticket:", error.message);
//       res.status(500).send("Error creating ticket");
//     }
//   },

//   getTicketById: async (req, res) => {
//     const id = req.params.id;
//     try {
//       const ticket = await db.query.tickets.findFirst({
//         where: (tickets, { eq }) => eq(tickets.id, id),
//       });
//       if (!ticket) return res.status(404).json({ message: "Ticket not found" });
//       return res.json(ticket);
//     } catch (error) {
//       console.error("Error fetching ticket:", error.message);
//       res.status(500).send("Error fetching ticket");
//     }
//   },

//   updateTicket: async (req, res) => {
//     const id = req.params.id;
//     try {
//       const data = insertTicketSchema.partial().parse(req.body); // Validate the data
//       const updatedTicket = await db
//         .update(tickets)
//         .set(data)
//         .where(eq(tickets.id, id))
//         .returning();

//       if (updatedTicket.length === 0)
//         return res.status(404).json({ message: "Ticket not found" });
//       return res.json(updatedTicket[0]);
//     } catch (error) {
//       console.error("Error updating ticket:", error.message);
//       res.status(500).send("Error updating ticket");
//     }
//   },

//   deleteTicket: async (req, res) => {
//     const id = req.params.id;
//     try {
//       const deletedTicket = await db
//         .delete(tickets)
//         .where(eq(tickets.id, id))
//         .returning();

//       if (deletedTicket.length === 0)
//         return res.status(404).json({ message: "Ticket does not exist" });
//       return res.status(204).json({ message: "Ticket deleted successfully" });
//     } catch (error) {
//       console.error("Error deleting ticket:", error.message);
//       res.status(500).send("Error deleting ticket");
//     }
//   },
// };
