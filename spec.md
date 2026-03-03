# Specification

## Summary
**Goal:** Apply a comprehensive set of UX and admin improvements to Susan Richten's portfolio site, covering loading states, navigation enhancements, gallery features, form improvements, and admin tools.

**Planned changes:**
- Add animated shimmer/skeleton loading placeholders on all public pages and the admin panel while CMS data loads
- Add a fixed "Back to Top" button on Gallery, Commissions, About, and Testimonials pages that appears after scrolling 400px
- Highlight the active navigation link in the Header with bold and/or underline styling matching the current route
- Add "Home > [Page Name]" breadcrumb navigation below the header on all public pages except Home
- Add a real-time search bar to the Gallery page that filters artworks by title, medium, or location alongside the existing category filter
- Add a "Request This Style" button on sold artwork cards that navigates to /commissions with the artwork title pre-filled in the Project Description
- Display artwork dimensions more prominently on each ArtworkCard below the title
- Show a "We typically respond within 24–48 hours" notice above the submit button on both the CommissionInquiryForm and ContactForm
- Split the CommissionInquiryForm into a 2-step form with a step progress indicator, Next/Back/Submit controls, and step-level validation
- Make featured artwork cards on the Home page open the Gallery lightbox on the clicked artwork (via /gallery?open=<artworkId>)
- Replace the static hero background on the Home page with an auto-advancing slideshow cycling through featured artwork images, with crossfade transitions, prev/next arrows, and dot indicators
- Add per-row checkboxes and a bulk actions toolbar to the Admin Gallery Manager supporting: Mark as Featured, Remove from Featured, Mark as Sold, Mark as Available, Toggle Visibility, and Delete Selected (with confirmation)
- Add an "Export as CSV" button to the Admin Commissions Manager that downloads filtered commission inquiries as commission-inquiries.csv
- Add a "Preview" button to the Admin Pages Editor and Settings pages that opens the corresponding public page in a new browser tab

**User-visible outcome:** Visitors experience a more polished portfolio with smooth loading states, easier navigation, searchable gallery, and streamlined commission inquiries. Susan gains powerful admin tools including bulk artwork management, CSV export, and live preview of her edits.
