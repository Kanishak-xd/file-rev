# File Review Workflow Application

A small file review workflow application that allows users to upload files (PDF/images) for review and enables admins to approve or reject them with optional comments.

## Features

1. **Drag-and-drop file upload** - Users can upload PDF or image files via drag-and-drop interface
2. **In-browser file preview** - Preview uploaded files before submission
3. **Review workflow** - Admins can review each file and mark as Approve or Reject with optional comments
4. **Summary report** - Generate reports containing:
   - Total files reviewed
   - Approved count
   - Rejected count
   - Per-file status and comments
5. **Export functionality** - Export reports as JSON or CSV

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── FileUpload.jsx   # Drag-and-drop file upload component
│   ├── FilePreview.jsx  # File preview component
│   ├── RequestCard.jsx  # Request card for admin dashboard
│   └── ReviewModal.jsx  # Modal for reviewing files
├── pages/              # Page components
│   ├── UserPage.jsx    # User upload page
│   └── AdminPage.jsx   # Admin review dashboard
├── utils/              # Utility functions
│   ├── storage.js      # LocalStorage management
│   ├── reportGenerator.js  # Report generation logic
│   └── saveReport.js   # Report saving utilities
├── App.jsx             # Main app component with navigation
└── main.jsx            # Application entry point
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or the port Vite assigns).

### Build

```bash
npm run build
```

## Usage

1. **User Tab**: 
   - Drag and drop PDF or image files, or click to browse
   - Preview uploaded files
   - Submit files for review

2. **Admin Tab**:
   - View all pending requests
   - Click "Approve" or "Reject" on any request
   - Review each file individually, set status (approve/reject) and add optional comments
   - Submit the review
   - View summary statistics
   - Export reports as JSON or CSV

## State Management Approach

The application uses **localStorage** for state management. This approach was chosen because:

1. **No backend requirement**: All data persists in the browser's localStorage
2. **Simplicity**: No need for complex state management libraries like Redux or Zustand
3. **Persistence**: Data survives page refreshes
4. **Lightweight**: Perfect for a small application with no authentication

The state is managed through utility functions in `src/utils/storage.js`:
- **Requests**: Stored with key `file_review_requests` - contains pending file submissions
- **Reviews**: Stored with key `file_review_reviews` - contains completed reviews

Each request includes:
- Unique ID
- Array of files (with name, type, size, preview data)
- Status (pending)
- Creation timestamp

Each review includes:
- Request ID reference
- Array of files with status (approved/rejected) and comments
- Review timestamp

## Backend Usage

**No backend was used.** This decision was made because:

1. **Requirements**: The constraints explicitly stated that backend is optional and in-memory/local storage is sufficient
2. **Scope**: This is a small workflow application without authentication or multi-user requirements
3. **Simplicity**: localStorage provides all necessary persistence for a single-user or demo scenario
4. **Performance**: No network latency for read/write operations
5. **Deployment**: Easier deployment as a static site (can be hosted on GitHub Pages, Netlify, Vercel, etc.)

If this application needed to scale to multiple users or required data synchronization, a backend with a database would be necessary.

## What Would Break at Scale

1. **localStorage Limitations**:
   - **Storage limit**: Most browsers limit localStorage to 5-10MB. With base64-encoded file previews, this will fill up quickly with many files
   - **No cross-device sync**: Data is browser-specific and won't sync across devices
   - **No concurrent access**: Multiple admins can't review simultaneously without conflicts

2. **File Size Issues**:
   - Large files (especially images) are stored as base64 in localStorage, which increases size by ~33%
   - No file size validation beyond browser limits
   - Memory issues with many large files

3. **Data Integrity**:
   - No validation or schema enforcement
   - No backup or recovery mechanism
   - Data can be lost if localStorage is cleared

4. **Performance**:
   - All data loaded into memory on page load
   - No pagination for large lists of requests/reviews
   - Synchronous localStorage operations can block UI

5. **Security**:
   - No authentication or authorization
   - File data stored in plain text (base64)
   - No input sanitization for comments
   - XSS vulnerabilities possible with user-generated content

6. **Concurrency**:
   - No locking mechanism - two admins could review the same request simultaneously
   - Race conditions when removing requests after review

## Shortcuts Taken

**File preview storage in localStorage**: I knowingly stored base64-encoded file previews directly in localStorage. This was a shortcut because:

- **Why it's a problem**: Base64 encoding increases file size by ~33%, and localStorage has a 5-10MB limit. This will fail with many or large files.
- **Better approach**: In a production system, files should be uploaded to cloud storage (S3, Cloudinary, etc.) and only file metadata (URLs, IDs) should be stored. Preview URLs would be generated server-side or via CDN.
- **Why I took it**: It simplifies the implementation significantly - no file upload API, no storage service setup, and works entirely client-side. For a demo/small-scale app, this trade-off is acceptable.

## Report Generation

Reports can be exported in two formats:

1. **JSON** (`report.json`): Structured data with summary statistics and detailed file information
2. **CSV** (`report.csv`): Tabular format with columns: File Name, Status, Comment, Reviewed At

Reports include:
- Summary: Total files, Approved count, Rejected count, Pending count
- Per-file details: Name, status, comment, review timestamp

To generate a report file in the `output/` folder, use the export buttons in the Admin dashboard. The files will be downloaded to your default download location (you can manually move them to the `output/` folder, or configure your browser to download there).

## Technologies Used

- **React 19** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS v4.1** - Styling
- **localStorage API** - Data persistence

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

Note: localStorage is supported in all modern browsers.

## License

MIT

