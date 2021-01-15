import { Transition } from 'react-transition-group';
import React, { useState } from 'react'
import './transition.css'
const duration = 1500;
// const defaultStyle = {
//   transition: `opacity ${duration}ms ease-in-out`,
//   opacity: 0,
// }

// const transitionStyles = {
//   entering: { opacity: 1 },
//   entered:  { opacity: 1 },
//   exiting:  { opacity: 0 },
//   exited:  { opacity: 0 },
// };

// const Fade = ({ in: inProp }) => (
//   <Transition in={inProp} timeout={duration}>
//     {state => (
//       <div style={{
//         ...defaultStyle,
//         ...transitionStyles[state]
//       }}>
//         I'm a fade Transition!
//       </div>
//     )}
//   </Transition>
// );

export default function _Transition() {
  const [inProp, setInProp] = useState(true);
  return (
    <div>
      <Transition in={inProp} timeout={duration}>
        {state => {
          console.log(state)
          return (
            <div className={state}>
              I'm a fade Transition!
            </div>
          )
        }}
      </Transition>
      <button onClick={() => setInProp(!inProp)}>
        Click to Toggle
      </button>
    </div>
  );
}