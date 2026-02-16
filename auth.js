/**
 * Simple Auth Module (Frontend-only, localStorage)
 * Handles registration and login for Virtual Interview Practice App
 */

const Auth = {
    USERS_KEY: 'vip_users',
    CURRENT_USER_KEY: 'vip_currentUser',

    /**
     * Get all registered users from localStorage
     */
    getUsers() {
        try {
            const users = localStorage.getItem(this.USERS_KEY);
            return users ? JSON.parse(users) : {};
        } catch {
            return {};
        }
    },

    /**
     * Save users to localStorage
     */
    saveUsers(users) {
        localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
    },

    /**
     * Register a new user
     * @param {string} name - User's full name
     * @param {string} email - User's email (used as unique key)
     * @param {string} password - User's password
     * @returns {{ success: boolean, message?: string }}
     */
    register(name, email, password) {
        const normalizedEmail = email.trim().toLowerCase();
        const users = this.getUsers();

        if (users[normalizedEmail]) {
            return { success: false, message: 'An account with this email already exists.' };
        }

        users[normalizedEmail] = {
            name: name.trim(),
            email: normalizedEmail,
            password: password // Note: In production, never store plain passwords
        };
        this.saveUsers(users);

        // Auto-login after registration
        this.setCurrentUser(users[normalizedEmail]);
        return { success: true };
    },

    /**
     * Login with email and password
     * @param {string} email - User's email
     * @param {string} password - User's password
     * @returns {boolean} - True if login successful
     */
    login(email, password) {
        const normalizedEmail = email.trim().toLowerCase();
        const users = this.getUsers();
        const user = users[normalizedEmail];

        if (!user || user.password !== password) {
            return false;
        }

        this.setCurrentUser(user);
        return true;
    },

    /**
     * Set the currently logged-in user
     */
    setCurrentUser(user) {
        const { password, ...userWithoutPassword } = user;
        localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(userWithoutPassword));
    },

    /**
     * Get the currently logged-in user
     * @returns {object|null}
     */
    getCurrentUser() {
        try {
            const user = localStorage.getItem(this.CURRENT_USER_KEY);
            return user ? JSON.parse(user) : null;
        } catch {
            return null;
        }
    },

    /**
     * Logout the current user
     */
    logout() {
        localStorage.removeItem(this.CURRENT_USER_KEY);
    },

    /**
     * Check if user is logged in
     * @returns {boolean}
     */
    isLoggedIn() {
        return this.getCurrentUser() !== null;
    }
};
