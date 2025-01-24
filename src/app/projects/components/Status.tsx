import React from 'react';

interface Props {
     icon: any;
     text: string;
     className: string;
}

const StatusComponent = ({ icon, text, className }: Props) => {
     return (
          <span className={className}>
               {icon}
               {text}
          </span>
     );
};

export default StatusComponent;
