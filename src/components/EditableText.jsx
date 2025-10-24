import React, { useState, useEffect, useRef } from 'react';

const EditableText = ({
  tag: Tag = 'p',
  initialValue,
  onChange,
  isEditable,
  className = '',
  onStartEditing = () => {},
  onStopEditing = () => {}
}) => {
  const [text, setText] = useState(initialValue);
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => setText(initialValue), [initialValue]);
  useEffect(() => {
    if (isEditing && inputRef.current) inputRef.current.focus();
  }, [isEditing]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleBlur();
  };
  const handleBlur = () => {
    setIsEditing(false);
    onChange(text);
    onStopEditing();
  };
  const handleClick = () => {
    if (isEditable) {
      setIsEditing(true);
      onStartEditing();
    }
  };

  if (isEditable && isEditing) {
    return (
      <input
        ref={inputRef}
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className={`w-full bg-transparent border-b-2 border-lime-400 p-1 outline-none ${className}`}
      />
    );
  }

  return (
    <Tag className={className} onClick={handleClick}>
      {text}
      {isEditable && <span className="ml-2 text-xs opacity-50 cursor-pointer select-none">&#9998;</span>}
    </Tag>
  );
};

export default EditableText;
