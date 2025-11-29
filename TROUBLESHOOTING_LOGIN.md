# Troubleshooting Admin Login Issues

## Quick Fix: Clear localStorage and Restart

If admin login is not working, try this:

1. **Open Browser Developer Tools** (F12)
2. **Go to Application tab** (Chrome) or **Storage tab** (Firefox)
3. **Click on Local Storage** → Your website URL
4. **Delete the key:** `fakeApi_users`
5. **Refresh the page** - Admin user will be created automatically
6. **Try logging in again** with:
   - Username: `admin`
   - Password: `admin123`

## Check if Admin User Exists

1. Open Browser Console (F12)
2. Run this command:
```javascript
JSON.parse(localStorage.getItem('fakeApi_users'))
```

You should see an array with at least one user that has:
- `username: "admin"`
- `email: "admin@example.com"`
- `password: "admin123"`

## Manual Admin User Creation

If admin user doesn't exist, create it manually:

1. Open Browser Console (F12)
2. Run this command:
```javascript
const users = JSON.parse(localStorage.getItem('fakeApi_users') || '[]');
const adminUser = {
  id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
  username: "admin",
  email: "admin@example.com",
  password: "admin123"
};
users.push(adminUser);
localStorage.setItem('fakeApi_users', JSON.stringify(users));
console.log('Admin user created!');
```

3. Try logging in again

## Common Issues

### Issue 1: "Invalid username or password"
**Solution:**
- Make sure you're typing exactly: `admin` and `admin123`
- Check for extra spaces (the code now trims them automatically)
- Check browser console for debug messages

### Issue 2: Admin user not created
**Solution:**
- Clear localStorage (see Quick Fix above)
- Or manually create admin user (see above)

### Issue 3: Wrong email
**Solution:**
- Make sure `ADMIN_EMAIL` in `fakeApi.js` matches the admin user's email
- Default is `"admin@example.com"`

## Debug Login Process

The login function now logs debug information. Check the browser console (F12) when logging in:

1. You should see: `🔍 Attempting login for username: admin`
2. You should see: `📋 Available users: [...]`
3. If successful: `✅ Login successful for user: admin`
4. If failed: `❌ Login failed - Invalid username or password`

## Verify Login Success

After logging in, check:
1. Browser Console should show: `✅ Login successful`
2. localStorage should have `token` key
3. localStorage should have `fakeApi_currentUser` key with your user data
4. You should be redirected to home page (`/`)

## Still Not Working?

1. **Check browser console** for any errors
2. **Verify localStorage is enabled** in your browser
3. **Try in incognito/private mode** (to test with fresh localStorage)
4. **Check if you're on the correct domain/port** (localhost:5173 vs localhost:3000)

