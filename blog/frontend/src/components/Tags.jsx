import React from 'react';

function TagsComponent({ tags, onSelectTag }) {
    return (
        <div>
            <h3>Tags:</h3>
                <ul>
                {Array.isArray(tags) && tags.map(tag => (
                    <li key={tag.id} onClick={() => onSelectTag(tag.name)}>
                        {tag.name}
                    </li>
                    ))}
                     <li style={{ cursor: 'pointer', color: 'red' }}>
                    <a onClick={() => onSelectTag(null)}>Clear Tags</a>
                </li>
                </ul>
        </div>
    );
}

export default TagsComponent;
