import { useState } from 'react';

function TopbarData() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLoginClick = () => {
        setIsLoggedIn(!isLoggedIn);
    };

    return {
        isLoggedIn,
        handleLoginClick
    };
}

export default TopbarData;
