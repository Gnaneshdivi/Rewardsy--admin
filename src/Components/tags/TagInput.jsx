import React, { useState } from 'react';
import './TagInput.css'; // Import CSS for styling the tags

const TagInput = ({ tags = [], setTags }) => {
  const [tagInput, setTagInput] = useState('');

  const handleTagInputChange = (e) => {
    setTagInput(e.target.value);
  };

  const handleTagInputKeyDown = (e) => {
    if ((e.key === 'Enter' || e.key === ',') && tagInput.trim()) {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
      }
      setTagInput('');
    }
  };

  const removeTag = (index) => {
    const updatedTags = tags.filter((_, i) => i !== index);
    setTags(updatedTags);
  };

  return (
    <div>
      <label>Tags:</label>
      <div className="tag-input-wrapper">
        {tags.map((tag, index) => (
          <div className="tag-bubble" key={index}>
            {tag}
            <span className="tag-remove" onClick={() => removeTag(index)}>
              &times;
            </span>
          </div>
        ))}
      </div>
      <input
        type="text"
        value={tagInput}
        onChange={handleTagInputChange}
        onKeyDown={handleTagInputKeyDown}
        placeholder="Add Tags Here (Press Enter)"
        className="tag-input"
      />
    </div>
  );
};

export default TagInput;
