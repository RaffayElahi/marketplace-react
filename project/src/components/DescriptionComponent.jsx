import React from 'react';

const DescriptionComponent = ({ item, description }) => {
  const data = description? item.description : item.fabricInformation
  const formatDescription = (description) => {
    // Split the string by new lines
    const lines = description.split('\n');
    
    // Replace \t with spaces
    return lines.map((line, index) => (
      <React.Fragment key={index}>
        {line.split('\t').map((segment, i) => (
          <span key={i}>
            {i > 0 && <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>}
            {segment}
          </span>
        ))}
        <br />
      </React.Fragment>
    ));
  };

  return (
    <div className="text-base">
      {formatDescription(data)}
    </div>
  );
};

export default DescriptionComponent;