import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const F1Redirect: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            event.preventDefault();
            if (event.key === 'F1') {
                switch (location.pathname) {
                    case '/':
                        window.open('/docs/');
                        break;
                    case '/settings':
                        window.open('/docs/settings');
                        break;
                    default:
                        break;
                }
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [location]);

    return null;
};

export default F1Redirect;