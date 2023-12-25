import React from 'react';

const SkeletonLoader: React.FC = () => {
    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <div style={{ backgroundColor: '#eee', height: '20px', width: '100%', marginBottom: '10px' }}></div>
            <div style={{ backgroundColor: '#eee', height: '300px', width: '100%' }}></div>
        </div>
    );
};

export default SkeletonLoader;
