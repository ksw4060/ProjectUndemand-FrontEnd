import React from "react";

function CheckBox({
  options,
  selectedOptions,
  onOptionToggle,
  showMoreOptions,
  handleShowMoreOptions,
  title,
}) {
  return (
    <ul className="filter-options">
      <li className="filter-option-title">
        <span>{title}</span>
        <span>({selectedOptions.size})</span>
      </li>
      {(showMoreOptions ? options : options.slice(0, 4)).map((option) => (
        <li key={option.id} className="filter-option">
          <label>
            <input
              type="checkbox"
              checked={selectedOptions.has(option.id)}
              onChange={() => onOptionToggle(option.id)}
            />
            <span>{option.range || option.name}</span>
          </label>
        </li>
      ))}
      {!showMoreOptions ? (
        <li className="filter-option-more">
          <p onClick={handleShowMoreOptions}>더 보기</p>
        </li>
      ) : (
        <li className="filter-option-more">
          <p onClick={handleShowMoreOptions}>숨기기</p>
        </li>
      )}
    </ul>
  );
}

export default CheckBox;
