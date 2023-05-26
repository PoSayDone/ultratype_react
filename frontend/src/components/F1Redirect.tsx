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
                    case '/typing':
                    case '/typing/':
                    case '/typing/typing':
                    case '/typing/timeatack':
                    case '/typing/infinity':
                        window.open('/docs/pechat.htm');
                        break;
                    case '/settings':
                    case '/settings/':
                        window.open('/docs/settings.htm');
                        break;
                    case '/profile':
                    case '/profile/':
                        window.open('/docs/profil.htm');
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