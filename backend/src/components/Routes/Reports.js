// backend/src/components/Routes/Reports.js
const express = require('express');
const router = express.Router();

const AuthMiddleware  = require('../middleware/AuthMiddleware');
const AdminMiddleware = require('../middleware/AdminMiddleware');

const VolunteerHistory  = require('../Models/VolunteerHistory');
const VolunteerMatching = require('../models/VolunteerMatching');
const EventDetails      = require('../Models/EventDetails');

const { Parser }  = require('json2csv');
const PDFDocument = require('pdfkit');

router.get(
  '/', 
  AuthMiddleware,    // verify token & populate req.user
  AdminMiddleware,   // ensure req.user.role === 'admin'
  async (req, res) => {
    try {
      // fetch all data in parallel
      const [history, matching, events] = await Promise.all([
        VolunteerHistory.find(),
        VolunteerMatching.find(),
        EventDetails.find()
      ]);

      const reportData = { history, matching, events };
      const { format } = req.query;

      // CSV output
      if (format === 'csv') {
        const hCsv = new Parser().parse(history);
        const mCsv = new Parser().parse(matching);
        const eCsv = new Parser().parse(events);
        const combined = 
          `Volunteer History:\n${hCsv}\n\n` +
          `Volunteer Matching:\n${mCsv}\n\n` +
          `Event Details:\n${eCsv}`;

        res.header('Content-Type', 'text/csv');
        res.attachment('report.csv');
        return res.send(combined);
      }

      // PDF output
      if (format === 'pdf') {
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=report.pdf');

        const doc = new PDFDocument();
        doc.pipe(res);

        doc.fontSize(18).text('Volunteer & Event Report', { align: 'center' }).moveDown();

        doc.fontSize(16).text('Volunteer History', { underline: true });
        history.forEach((r, i) =>
          doc.fontSize(10).text(`${i+1}. ${r.volunteer} — ${r.event} (${r.participationStatus})`)
        );
        doc.moveDown();

        doc.fontSize(16).text('Volunteer Matching', { underline: true });
        matching.forEach((r, i) =>
          doc.fontSize(10).text(`${i+1}. ${r.volunteerName} → ${r.matchedEvent}`)
        );
        doc.moveDown();

        doc.fontSize(16).text('Event Details', { underline: true });
        events.forEach((e, i) =>
          doc.fontSize(10).text(
            `${i+1}. ${e.eventName} @ ${e.location} on ${new Date(e.eventDate).toLocaleDateString()}`
          )
        );

        doc.end();
        return;
      }

      // default: JSON
      res.json(reportData);
    } catch (err) {
      console.error('Error generating report:', err);
      res.status(500).json({ error: 'Server error while generating report' });
    }
  }
);

module.exports = router;
