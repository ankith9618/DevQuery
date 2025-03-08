import { validationResult } from 'express-validator';
import Query from '../Schema/QuerySchema.js'; 
import User from '../Schema/UserSchema.js'; 

export const postQuery = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    let { title, query, tags } = req.body;
    const {userId,username} = req.user; 
    title = title.charAt(0).toUpperCase() + title.slice(1).toLowerCase();
    try {
        const newQuery = new Query({
            title,
            query,
            tags,
            postedAt: new Date(),
            userId,
            user:{username,userId},
            searchTerms: title
        });

        await newQuery.save();

        await User.findByIdAndUpdate(
            userId,
            { $push: { queries: newQuery._id } }, 
            { new: true }
        );

        res.status(201).json({
            message: 'Query posted successfully!',
            query: newQuery,
        });

    } catch (error) {

        if (error.code === 11000) {
  
            return res.status(400).json({ error: 'Query with title altready exists',status:true});
        }

        res.status(500).json({ error: 'Internal server error',status:false });
    }
};
