# Where Your Data is Saved

## Overview
Your eCommerce application uses **localStorage** to store all data (products, categories, users) directly in your web browser.

## Storage Location

### In the Browser
- **Storage Type**: Browser's Local Storage (localStorage API)
- **Location**: Stored in your browser's database/files on your computer
- **Scope**: Per domain/website (e.g., `localhost:5173` or `yourdomain.com`)

### Physical Location on Your Computer

The exact location depends on your browser and operating system:

#### **Chrome/Edge (Windows)**
```
C:\Users\[YourUsername]\AppData\Local\Google\Chrome\User Data\Default\Local Storage\leveldb\
```

#### **Chrome/Edge (Mac)**
```
~/Library/Application Support/Google/Chrome/Default/Local Storage/leveldb/
```

#### **Firefox (Windows)**
```
C:\Users\[YourUsername]\AppData\Roaming\Mozilla\Firefox\Profiles\[ProfileName]\webappsstore.sqlite
```

#### **Firefox (Mac)**
```
~/Library/Application Support/Firefox/Profiles/[ProfileName]/webappsstore.sqlite
```

#### **Safari (Mac)**
```
~/Library/Safari/LocalStorage/
```

## Storage Keys Used

Your application stores data under these keys:
- `fakeApi_products` - All your products
- `fakeApi_categories` - All categories
- `fakeApi_users` - All registered users
- `fakeApi_currentUser` - Currently logged-in user
- `token` - Authentication token

## How to View Your Data

### Method 1: Browser Developer Tools
1. Open your website
2. Press `F12` or `Right-click` → `Inspect`
3. Go to **Application** tab (Chrome/Edge) or **Storage** tab (Firefox)
4. Expand **Local Storage** in the left sidebar
5. Click on your website URL (e.g., `http://localhost:5173`)
6. You'll see all your data stored as key-value pairs

### Method 2: Console Commands
Open browser console (F12) and run:
```javascript
// View all products
console.log(JSON.parse(localStorage.getItem('fakeApi_products')));

// View all categories
console.log(JSON.parse(localStorage.getItem('fakeApi_categories')));

// View all users
console.log(JSON.parse(localStorage.getItem('fakeApi_users')));
```

## Important Characteristics

### ✅ What localStorage DOES:
- **Persists** data after closing the browser
- **Survives** page refreshes
- **Remains** after computer restart
- **Stored locally** on your device
- **Fast access** (no network needed)

### ❌ What localStorage DOES NOT:
- **Sync** across different browsers
- **Sync** across different devices
- **Backup** automatically to cloud
- **Share** with other users
- **Persist** if browser data is cleared

## Data Persistence

### When Data is Saved:
- ✅ Immediately when you add a product
- ✅ Immediately when you add a category
- ✅ Immediately when you register a user
- ✅ Automatically on every change

### When Data is Lost:
- ❌ If you clear browser data/cache
- ❌ If you use "Clear browsing data"
- ❌ If you use private/incognito mode (when window closes)
- ❌ If browser storage quota is exceeded
- ❌ If you uninstall the browser

## Storage Limits

- **Typical Limit**: 5-10 MB per domain
- **Your App**: Usually uses < 1 MB (unless you have thousands of products with large images)
- **Images**: Stored as Base64 data URLs (can be large)

## Backup Your Data

### Option 1: Export Function (Built-in)
The app includes export/import functions:
```javascript
import { exportData, importData } from './services/fakeApi';

// Export all data
const backup = exportData();
console.log(backup); // Save this JSON to a file

// Import data
importData(backupJsonString);
```

### Option 2: Manual Backup
1. Open Developer Tools (F12)
2. Go to Application → Local Storage
3. Copy the values for:
   - `fakeApi_products`
   - `fakeApi_categories`
   - `fakeApi_users`
4. Save them in a text file

### Option 3: Browser Extension
Use browser extensions like "LocalStorage Manager" to backup/restore data

## Security Notes

⚠️ **Important**: 
- Data is stored in **plain text** (not encrypted)
- Anyone with access to your computer can view it
- Don't store sensitive information (passwords are stored in plain text - this is for demo only!)
- In production, use a real backend with proper encryption

## Testing Persistence

To verify data persists:
1. Add a product
2. Close browser completely
3. Reopen browser and go to your website
4. Product should still be there ✅

## Troubleshooting

### Data Disappears?
- Check if you're in private/incognito mode
- Check browser settings for "Clear data on exit"
- Check if you're testing on different ports (localhost:5173 vs localhost:3000)
- Check browser console for errors

### Can't Find Data?
- Make sure you're checking the correct domain/port
- Different ports = different storage (localhost:5173 ≠ localhost:3000)
- Check Application tab in Developer Tools

## Summary

**Your data is saved in your browser's localStorage, which is stored in your browser's data folder on your computer. It persists across sessions but is local to your browser and device.**


