# Admin Login Credentials

## Default Admin Account

The admin account credentials are defined in `src/services/fakeApi.js`:

### 📍 Location: `src/services/fakeApi.js`

**Line 12:** Admin Email Configuration
```javascript
const ADMIN_EMAIL = "admin@example.com"; // Change this to your admin email
```

**Lines 258-264:** Default Admin User
```javascript
{
  id: 1,
  username: "admin",
  email: ADMIN_EMAIL, // Must match the ADMIN_EMAIL constant above
  password: "admin123",
}
```

## 🔑 Default Admin Credentials

- **Username:** `admin`
- **Email:** `admin@example.com`
- **Password:** `admin123`

## 🔐 How to Login as Admin

1. Go to the login page (`/login`)
2. Enter:
   - Username: `admin`
   - Password: `admin123`
3. Click "Login"

## ✏️ How to Change Admin Email

1. Open `src/services/fakeApi.js`
2. Find line 12: `const ADMIN_EMAIL = "admin@example.com";`
3. Change it to your email: `const ADMIN_EMAIL = "your-email@example.com";`
4. **Important:** If you already have users in localStorage, you need to:
   - Clear localStorage (F12 → Application → Local Storage → Clear)
   - OR manually update the admin user's email in localStorage

## 🔍 How to View All Users (Including Admin)

You can view all users in the browser console:

1. Open Developer Tools (F12)
2. Go to Console tab
3. Run this command:
```javascript
JSON.parse(localStorage.getItem('fakeApi_users'))
```

This will show all registered users including the admin account.

## ⚠️ Important Notes

- The admin email is checked on login to determine admin status
- Only the user with email matching `ADMIN_EMAIL` will have admin privileges
- If you change `ADMIN_EMAIL`, make sure to update the admin user's email in localStorage or clear localStorage to recreate users
- In a production app, passwords should be hashed (currently stored in plain text for demo purposes)

## 🛡️ Admin Features

Once logged in as admin, you can:
- ✅ See "Sell Products" button on Home page
- ✅ Access `/add-item` page to add/edit products
- ✅ See "Edit" and "Delete" buttons on products in Service page
- ✅ Edit existing products
- ✅ Delete products
- ✅ Manage categories

## 👤 Regular User Features

Regular users (non-admin) can:
- ✅ Register and create accounts
- ✅ View products
- ✅ Buy products (register for products)
- ❌ Cannot see "Sell Products" button
- ❌ Cannot access `/add-item` page
- ❌ Cannot edit or delete products

