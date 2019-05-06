import React, {useState} from 'react';

const style = {
  outer: (hover) => {
    return {
      backgroundColor: hover ? 'rgba(96, 96, 96, 0.6)' : 'rgba(80,80,80, 0.5)',
      width: '70px',
      padding: '1px',
      borderRadius: '2px',
      cursor: 'pointer',
      margin: '0.7rem'
    }
  },
  inner: (right) => {
    return {
      position: 'relative',
      backgroundColor: '#ff9900',
      width: '28px',
      height: '14px',
      margin: '2px',
      borderRadius: '2px',
      left: right ? '50%' : '0',
      transition: 'all 0.5s',
      boxShadow: '0 0 0 1px rgb(206, 129, 20)',
    }
  }
}

const Switch = ({isRight = true, onToggle}) => {
  const [isSwitchedRight, switchRight] = useState(isRight);
	const [hover, setHover] = useState(false);

  const toggle = () => {
    const isToggledRight = isSwitchedRight;
    switchRight(!isToggledRight);
    onToggle(!isToggledRight);
  }

  return (
    <div>
      <div
        style={style.outer(hover)}
        onClick={toggle}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <div style={style.inner(isSwitchedRight)} />
      </div>
    </div>
    
  )
}

export default Switch;
