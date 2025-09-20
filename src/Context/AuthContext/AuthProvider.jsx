import React from 'react';
import AuthContext from './AuthContext';

const AuthProvider = ({children}) => {


    const AuthInfo={
        
    };
    return (
        <AuthContext.Provider value={AuthInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;