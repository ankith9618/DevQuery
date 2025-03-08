import { useState, useEffect } from 'react';
import './QuoteScroller.css';

const quotes = [
  "The best way to predict the future is to share the knowledge that creates it.",
  "Great things are never done by one person. They’re done by a team of people.",
  "Code is not just about writing, it’s about communication, problem-solving, and learning together.",
  "Sharing knowledge is the ultimate form of collaboration."
];

const QuoteScroller = () => {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuoteIndex(prevIndex => (prevIndex + 1) % quotes.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="quote-scroller">
      <div className="quote-item">
        <p>{quotes[currentQuoteIndex]}</p>
      </div>
    </div>
  );
};

export default QuoteScroller;
