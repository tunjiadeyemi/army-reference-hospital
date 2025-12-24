<!-- Signal Form API Integration Documentation -->

# Signal Form API Integration Guide

## Overview

This document outlines the complete API integration for the Signal Form module following the clean, scalable architecture of the Army Reference Hospital application.

## Architecture Flow

```
User Interaction (SignalModal/SignalForm)
    ↓
Custom Hooks (useCreateSignalForm, useUpdateSignalForm, useGetSignalForms)
    ↓
React Query Mutations/Queries
    ↓
API Service Layer (dashboardServices.ts)
    ↓
Axios HTTP Client (with auth interceptor)
    ↓
Backend API (/v1/signal-form)
```

## Files Modified/Created

### 1. API Services

**File:** `src/services/dashboardApi/dashboardServices.tsx`

**Added Functions:**

- `getSignalForms()` - Fetch all signal forms
- `getSignalFormById(id)` - Fetch single signal form
- `createSignalForm(payload)` - Create new signal form (with file upload)
- `updateSignalForm(payload)` - Update existing signal form
- `deleteSignalForm(id)` - Delete a signal form

**Features:**

- FormData handling for multipart file uploads
- Automatic token injection via Axios interceptor
- Field mapping from camelCase to snake_case
- Error handling through handleApi wrapper

### 2. Zustand Store

**File:** `src/store/useDashboardStore.tsx`

**Added Properties:**

```typescript
signalForms: any;          // List of all signal forms
signalForm: any;           // Single signal form detail
setSignalForms: (data) => void;
setSignalForm: (data) => void;
```

**Persistence:** Auto-persisted to localStorage via Zustand middleware

### 3. Custom Hooks

**File:** `src/hooks/dashboardhooks/useDasboardData.ts`

**Query Hooks:**

```typescript
useGetSignalForms(); // Fetch all forms with caching
useGetSignalForm(id); // Fetch single form with optional ID
```

**Mutation Hooks:**

```typescript
useCreateSignalForm(); // Create new form (auto-refetch on success)
useUpdateSignalForm(); // Update existing form
useDeleteSignalForm(); // Delete form
```

**Key Features:**

- Automatic query invalidation on mutation success
- Two-level persistence (Zustand + localStorage)
- Smart enabled/disabled logic to avoid redundant API calls
- staleTime: 5 minutes, gcTime: 10 minutes

### 4. Components

#### SignalForm.tsx

**Props:**

```typescript
interface SignalFormProps {
  isEdit?: boolean; // Enable/disable edit mode
  mockData?: any; // Prefill form data
  onSuccess?: () => void; // Callback on successful save
  isLoading?: boolean; // Show loading state
}
```

**Features:**

- Form validation (required fields check)
- Toast notifications (success, error, loading)
- Loading state UI with spinner
- File upload support
- Automatic disabled state during loading

#### SignalModal.tsx

**Responsibilities:**

- Manage modal state (open/close)
- Handle edit mode toggle
- Integrate API mutations
- Pass loading state to form component
- Handle save/cancel operations

**API Integration:**

```typescript
const createMutation = useCreateSignalForm();
const updateMutation = useUpdateSignalForm();

const isLoading = createMutation.isPending || updateMutation.isPending;
```

#### SignalRecord.tsx

**Responsibilities:**

- Display signal forms in table
- Fetch data on component mount
- Show loading/error states
- Handle row selection (open modal)
- Transform API data for table display

**Data Flow:**

```
useGetSignalForms() hook
    ↓
Auto-fetch from /v1/signal-form
    ↓
Cache in Zustand + localStorage
    ↓
Display in MainTable
    ↓
On row click → open SignalModal
```

### 5. Type Definitions

**File:** `src/utils/types/signal.types.ts`

```typescript
interface SignalFormPayload {
  id?: string | number;
  drafter_name_in: string;
  from: string;
  to: string;
  info: string;
  precedence_a_action: string;
  branch: string;
  precedence_info: string;
  telephone_number: string;
  date_time_group_month: string;
  dig_serial_no: string;
  name_in_block_letters: string;
  message_instructions: string;
  releasing_officer_rank: string;
  security_classification: string;
  originator_number: string;
  text: string;
  internal_distribution: string;
  file_number_or_reference: string;
  classification_status: boolean | string;
  page_details: string;
  comm_gen_serial: string;
  senior_received: string;
  system: string;
  time_in_out: string;
  upload?: File | null;
}
```

## User Experience Features

### Loading States

- **Form Submission:** Animated spinner with "Saving..." text
- **Data Fetching:** Spinning loader in table area
- **Button Disabling:** All form inputs disabled during loading

### Toast Notifications

**Success:** "Signal form saved successfully!"
**Error:** Displayed automatically with error message
**Loading:** "Saving signal form..." (dismisses on completion)

### Error Handling

- Form validation (required fields)
- API error catching and display
- Graceful degradation (shows sample data if API fails)
- User-friendly error messages

### Data Refetch Strategy

After successful mutation:

1. React Query invalidates 'signalForms' query key
2. Auto-refetch triggered if component mounted
3. Zustand store updated automatically
4. localStorage synced via useEffect
5. UI re-renders with fresh data

## API Endpoint Details

**Base URL:** `https://edusoft.tonyicon.com.ng`

**Endpoints:**
| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/v1/signal-form` | Fetch all forms |
| GET | `/v1/signal-form/{id}` | Fetch single form |
| POST | `/v1/signal-form/create` | Create form |
| PATCH | `/v1/signal-form/edit/{id}` | Update form |
| DELETE | `/v1/signal-form/remove/{id}` | Delete form |

**Headers:**

```
Authorization: Bearer {accessToken}
Content-Type: application/json (or multipart/form-data for file uploads)
```

## Request/Response Examples

### Create Signal Form

**Request:**

```typescript
{
  drafter_name_in: "LT JOHN DOE",
  from: "Command HQ",
  to: "Field Unit",
  info: "Important message",
  precedence_a_action: "High",
  // ... other fields
  upload: File // Optional
}
```

**Response:**

```typescript
{
  success: true,
  status: 200,
  message: "Signal form created successfully",
  data: {
    id: "123",
    drafter_name_in: "LT JOHN DOE",
    // ... all fields
    created_at: "2025-12-23T10:30:00Z"
  }
}
```

## Testing the Integration

1. **Create a signal form:**

   - Click "Edit" on SignalModal
   - Fill in required fields
   - Click "Save"
   - Observe toast notification
   - Verify data persists in table

2. **View all forms:**

   - Navigate to Signal module
   - Observe loading spinner
   - Check if forms display in table

3. **Edit existing form:**

   - Click row in table
   - Click "Edit" button
   - Modify fields
   - Click "Save"
   - Verify success notification

4. **File upload:**
   - Select file in form
   - Click "Save"
   - Verify file uploaded with form

## Styling & UX Consistency

- **Colors:** Teal (#22A08E) for primary actions
- **Inputs:** Gray (#D9D9D9) borders, rounded corners
- **Loading:** Animated spinner, disabled opacity
- **Spacing:** Consistent 6px padding, 4px gap between elements
- **Typography:** 14px font for labels, responsive sizes

## Best Practices Implemented

✅ Type-safe API calls with TypeScript
✅ Automatic token management
✅ Query caching and deduplication
✅ Optimistic error handling
✅ Loading states for better UX
✅ Validation before submission
✅ Toast notifications for feedback
✅ Scalable architecture for easy expansion
✅ Two-level persistence for reliability
✅ Proper cleanup and garbage collection

## Future Enhancements

- Add PDF export functionality
- Implement print preview
- Add batch operations
- Enable search/filter optimization
- Add signature capture
- Implement digital signature validation
- Add audit logging
- Enable form templates

## Troubleshooting

**Issue:** Form not submitting

- Check network tab for API errors
- Verify required fields are filled
- Check token validity in cookies

**Issue:** Data not persisting

- Clear localStorage and retry
- Check browser console for errors
- Verify API endpoint is accessible

**Issue:** File upload fails

- Check file size limits
- Verify file format support
- Check network connection
