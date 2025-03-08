// PostQueries.jsx
import './PostQueries.css';
import React, { useState } from 'react';
import { postQuery } from '../UtilityFunctions/script.js';
import { toast } from 'react-toastify';
import ToastComponent from '../Components/ToastComponent.js';

const PostQueries = () => {
  const [query, setQuery] = useState('');
  const [tags, setTags] = useState('');
  const [title, setTitle] = useState('');
  const [errors, setErrors] = useState({});

  const notify = (message, type) => {
    toast(message, { type });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    try {
      const tagsList = tags
        .split(',')
        .map((e) => e.trim())
        .filter((e) => e.length > 0);

      const response = await postQuery({ title, query, tags: tagsList });

      if (response.errors) {
        console.log(response);
        setErrors(response.errors);
        notify('Please fix the validation errors.', 'warning');
      } else {
        notify(response.message, 'success');
        setQuery('');
        setTags('');
        setTitle('');
      }
    } catch (error) {
      notify('Failed to post query. Please try again.', 'error');
    }
  };

  return (
    <div className="post-query">
      <h2>Post a Query</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="tags">Tags:</label>
          <input
            type="text"
            id="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            required
          />
          {errors.tags && <p className="error">{errors.tags}</p>}
        </div>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          {errors.title && <p className="error">{errors.title}</p>}
        </div>
        <div>
          <label htmlFor="query">Query:</label>
          <textarea
            id="query"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            required
          ></textarea>
          {errors.query && <p className="error">{errors.query}</p>}
        </div>
        <button type="submit">Post Query</button>
      </form>
      <ToastComponent />
    </div>
  );
};

export default PostQueries;