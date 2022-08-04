import React from 'react';

const HeaderButton = (props: any) => {

  return (
    <div>
      <h4 onClick={props.onClick}>{props.children}</h4>
    </div>
  )
}

export default HeaderButton;
