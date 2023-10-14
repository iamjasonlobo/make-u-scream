import React from 'react';

const BanList = ({ banList, removeFromBanList }) => {
    return (
        <div className="ban-list">
            <h3>Ban List</h3>
            <ul>
                {banList.map((attribute, index) => (
                    <li key={index}>
                        {attribute}
                        <button onClick={() => removeFromBanList(attribute)}>Remove</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default BanList;