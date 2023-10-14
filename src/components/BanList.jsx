import React from 'react';

const BanList = ({ banList, removeFromBanList }) => {
    return (
        <div className="ban-list">
            <h3>Ban List</h3>
            <div>
                {banList.map((attribute, index) => (
                    <button 
                        key={index} 
                        className="ban-item"
                        onClick={() => removeFromBanList(attribute)}
                    >
                        {attribute}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default BanList;
