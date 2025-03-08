import React, { useEffect, useState } from 'react';
import { FaCheckCircle, FaTimesCircle, FaExclamationTriangle } from 'react-icons/fa';
import './StatusCard.css';

const StatusCard = ({ status, message, duration = 10000 }) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
        }, duration);

        return () => clearTimeout(timer); 
    }, [duration]);

    if (!visible || !status || !message) return null;

    return (
        <div className={`status-card ${status}`}>
            {status === 'success' && <FaCheckCircle className="status-icon success" />}
            {status === 'error' && <FaTimesCircle className="status-icon error" />}
            {status === 'warning' && <FaExclamationTriangle className="status-icon warning" />}
            <p>{message}</p>
        </div>
    );
};

export default StatusCard;
