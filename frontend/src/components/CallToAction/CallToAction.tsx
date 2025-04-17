import React, { ReactNode } from 'react';
import './CallToAction.css';

interface CallToActionProps {
    children: ReactNode;
    className?: string;
}

const CallToAction: React.FC<CallToActionProps> = ({ children, className = '' }) => {
    return (
        <div className={`callToAction ${className}`}>
            {children}
        </div>
    );
};

export default CallToAction;
