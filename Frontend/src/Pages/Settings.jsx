import React, { useState, useEffect } from 'react';
import { FiUser, FiMoon, FiGlobe, FiBell, FiLock, FiLogOut } from 'react-icons/fi';

const Settings = () => {
  // User profile state
  const [userProfile, setUserProfile] = useState({
    name: '',
    age: '',
    gender: '',
    email: '',
    profilePicture: null
  });

  // Preferences state
  const [preferences, setPreferences] = useState({
    darkMode: false,
    language: 'English'
  });

  // Notification settings state
  const [notifications, setNotifications] = useState({
    healthAlerts: true,
    medicationReminders: true,
    doctorVisitReminders: true
  });

  // Privacy settings state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Fetch user data on component mount
  useEffect(() => {
    // Mock API call - replace with actual fetch
    const fetchUserData = async () => {
      try {
        // const response = await fetch('/api/user/profile');
        // const data = await response.json();
        
        // Mock data for demonstration
        const data = {
          name: 'John Doe',
          age: 32,
          gender: 'Male',
          email: 'john.doe@example.com',
          profilePicture: null,
          preferences: {
            darkMode: false,
            language: 'English'
          },
          notifications: {
            healthAlerts: true,
            medicationReminders: true,
            doctorVisitReminders: true
          }
        };
        
        setUserProfile({
          name: data.name,
          age: data.age,
          gender: data.gender,
          email: data.email,
          profilePicture: data.profilePicture
        });
        
        setPreferences(data.preferences);
        setNotifications(data.notifications);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    
    fetchUserData();
  }, []);

  // Handle profile picture upload
  const handleProfilePictureChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      
      reader.onload = (event) => {
        setUserProfile({
          ...userProfile,
          profilePicture: event.target.result
        });
      };
      
      reader.readAsDataURL(file);
    }
  };

  // Handle form input changes
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setUserProfile({
      ...userProfile,
      [name]: value
    });
  };

  // Handle preference changes
  const handlePreferenceChange = (e) => {
    const { name, type, value, checked } = e.target;
    setPreferences({
      ...preferences,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  // Handle notification changes
  const handleNotificationChange = (e) => {
    const { name, checked } = e.target;
    setNotifications({
      ...notifications,
      [name]: checked
    });
  };

  // Handle password change
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    if (name === 'currentPassword') setCurrentPassword(value);
    if (name === 'newPassword') setNewPassword(value);
    if (name === 'confirmPassword') setConfirmPassword(value);
  };

  // Save all settings
  const handleSaveSettings = async () => {
    try {
      // Mock API calls - replace with actual implementation
      // await fetch('/api/user/profile', {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(userProfile)
      // });
      
      // await fetch('/api/user/preferences', {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(preferences)
      // });
      
      // await fetch('/api/user/notifications', {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(notifications)
      // });
      
      alert('Settings saved successfully!');
    } catch (error) {
      console.error('Error saving settings:', error);
      alert('Failed to save settings. Please try again.');
    }
  };

  // Change password
  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      alert('New passwords do not match!');
      return;
    }
    
    try {
      // Mock API call - replace with actual implementation
      // await fetch('/api/user/change-password', {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     currentPassword,
      //     newPassword
      //   })
      // });
      
      alert('Password changed successfully!');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      console.error('Error changing password:', error);
      alert('Failed to change password. Please try again.');
    }
  };

  // Handle account deletion
  const handleDeleteAccount = async () => {
    const confirmed = window.confirm('Are you sure you want to delete your account? This action cannot be undone.');
    
    if (confirmed) {
      try {
        // Mock API call - replace with actual implementation
        // await fetch('/api/user/account', {
        //   method: 'DELETE'
        // });
        
        alert('Account deleted successfully. Redirecting to login page...');
        // Redirect to login page
        // window.location.href = '/login';
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Failed to delete account. Please try again.');
      }
    }
  };

  // Handle logout
  const handleLogout = () => {
    // Mock logout - replace with actual implementation
    // localStorage.removeItem('token');
    alert('Logging out...');
    // Redirect to login page
    // window.location.href = '/login';
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Settings</h1>

      {/* User Profile Section */}
      <section className="mb-10 p-6 bg-white rounded-lg shadow-md">
        <div className="flex items-center mb-4">
          <FiUser className="mr-2 text-blue-500" size={24} />
          <h2 className="text-xl font-semibold">User Profile</h2>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Profile Picture */}
          <div className="flex flex-col items-center">
            <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200 mb-4">
              {userProfile.profilePicture ? (
                <img 
                  src={userProfile.profilePicture} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <FiUser size={48} className="text-gray-400" />
                </div>
              )}
            </div>
            <label className="cursor-pointer bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition">
              Upload Photo
              <input 
                type="file" 
                className="hidden" 
                accept="image/*"
                onChange={handleProfilePictureChange}
              />
            </label>
          </div>

          {/* Profile Fields */}
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={userProfile.name}
                  onChange={handleProfileChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                <input
                  type="number"
                  name="age"
                  value={userProfile.age}
                  onChange={handleProfileChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                <select
                  name="gender"
                  value={userProfile.gender}
                  onChange={handleProfileChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Non-binary">Non-binary</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={userProfile.email}
                  onChange={handleProfileChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Preferences Section */}
      <section className="mb-10 p-6 bg-white rounded-lg shadow-md">
        <div className="flex items-center mb-4">
          <FiMoon className="mr-2 text-purple-500" size={24} />
          <h2 className="text-xl font-semibold">Preferences</h2>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Dark Mode</h3>
              <p className="text-sm text-gray-500">Switch between light and dark theme</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                name="darkMode"
                checked={preferences.darkMode}
                onChange={handlePreferenceChange}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          
          <div>
            <label className="block font-medium mb-1">Language</label>
            <select
              name="language"
              value={preferences.language}
              onChange={handlePreferenceChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="English">English</option>
              <option value="Spanish">Spanish</option>
              <option value="French">French</option>
              <option value="German">German</option>
              <option value="Chinese">Chinese</option>
              <option value="Japanese">Japanese</option>
            </select>
          </div>
        </div>
      </section>

      {/* Notification Settings */}
      <section className="mb-10 p-6 bg-white rounded-lg shadow-md">
        <div className="flex items-center mb-4">
          <FiBell className="mr-2 text-yellow-500" size={24} />
          <h2 className="text-xl font-semibold">Notification Settings</h2>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Health Alerts</h3>
              <p className="text-sm text-gray-500">Get notified about important health indicators</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                name="healthAlerts"
                checked={notifications.healthAlerts}
                onChange={handleNotificationChange}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Medication Reminders</h3>
              <p className="text-sm text-gray-500">Receive reminders for medication schedules</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                name="medicationReminders"
                checked={notifications.medicationReminders}
                onChange={handleNotificationChange}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Doctor Visit Reminders</h3>
              <p className="text-sm text-gray-500">Get notified about upcoming doctor appointments</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                name="doctorVisitReminders"
                checked={notifications.doctorVisitReminders}
                onChange={handleNotificationChange}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </section>

      {/* Privacy & Security */}
      <section className="mb-10 p-6 bg-white rounded-lg shadow-md">
        <div className="flex items-center mb-4">
          <FiLock className="mr-2 text-green-500" size={24} />
          <h2 className="text-xl font-semibold">Privacy & Security</h2>
        </div>
        
        <div className="space-y-6">
          <div>
            <h3 className="font-medium mb-4">Change Password</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                <input
                  type="password"
                  name="currentPassword"
                  value={currentPassword}
                  onChange={handlePasswordChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                <input
                  type="password"
                  name="newPassword"
                  value={newPassword}
                  onChange={handlePasswordChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={handlePasswordChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <button
                onClick={handleChangePassword}
                className="mt-2 bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition"
              >
                Update Password
              </button>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium mb-2">Data Management</h3>
            <button
              onClick={handleDeleteAccount}
              className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition"
            >
              Delete My Account
            </button>
            <p className="text-sm text-gray-500 mt-2">
              This will permanently delete all your data and cannot be undone.
            </p>
          </div>
        </div>
      </section>

      {/* Save Settings Button */}
      <div className="mb-20">
        <button
          onClick={handleSaveSettings}
          className="bg-blue-500 text-white py-3 px-6 rounded-md hover:bg-blue-600 transition font-medium"
        >
          Save Settings
        </button>
      </div>

      {/* Logout Button (Fixed at bottom) */}
      <div className="fixed bottom-0 left-0 right-0 bg-white p-4 border-t border-gray-200 flex justify-center">
        <button
          onClick={handleLogout}
          className="flex items-center bg-red-500 text-white py-2 px-6 rounded-md hover:bg-red-600 transition"
        >
          <FiLogOut className="mr-2" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Settings;