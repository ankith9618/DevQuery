import User from "../Schema/UserSchema.js";
export const verifyToken = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select('-password'); // Exclude password field
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({ message: 'Token verified successfully', user });
    } catch (error) {
        console.error('Token verification error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};