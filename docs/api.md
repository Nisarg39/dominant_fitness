# API & Data Models

This app uses Next.js Server Actions instead of REST routes for listed features.

## Server Actions

### createContactUs(formData)
- Location: `src/server/actions/userActions.js`
- Input: `{ name, email, phone, message }`
- Behavior: connects DB; if `MONGODBURL` missing, returns local success; else creates `ContactUs`.
- Returns: `{ success: string }` or `{ error: string }`

### signInAdmin(formData)
- Location: `src/server/actions/adminActions.js`
- Input: `FormData` with `username`, `password`
- Behavior: finds admin, issues JWT using `JWT_SECRET`, saves `adminToken`
- Returns: `{ success: boolean, message: string, adminToken?: string }`

### getContactUs(page = 1)
- Location: `src/server/actions/adminActions.js`
- Behavior: paginated fetch (10/page), returns metadata
- Returns: `{ success, data, total, currentPage, totalPages, hasNextPage, hasPrevPage }`

### markContactUsAsRead(id)
- Location: `src/server/actions/adminActions.js`
- Behavior: sets `isRead` true for a record
- Returns: `{ success: boolean, message: string }`

## Models
- `Admin`: credentials and `adminToken`
- `ContactUs`: contact form entries with timestamps and `isRead`

## Database
- `mongoose` connection via `src/server/config/mongoose.js`
