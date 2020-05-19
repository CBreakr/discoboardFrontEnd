

import ReactDOM from 'react-dom'
import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from 'react-three-fiber'

function Note(props) {
  // This give us direct access to the mesh
  const mesh = useRef()

  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)

  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01))
    const color= props.played===false? "blue": "red"
    // const onHover = useCallback((e, value) => {
    //     e.stopPropagation();
    //     setIsHovered(value);
    //   }, [setIsHovered]);
     
  
  return (
      
    <mesh
      position={props.pos}
      ref={mesh}
      scale={hovered? [1.5, 1.5, 1.5] : [1, 1, 1]}
      onClick={(e)=>props.handleNotePLay(e,props.seqNum,props.noteNum)}
      onPointerOver={(e) =>{ setHover(true);  if (!e) var e = window.event; e.cancelBubble = true; if (e.stopPropagation) e.stopPropagation();}}
      onPointerOut={(e) => {setHover(false);if(!e) var e = window.event; e.cancelBubble = true; if (e.stopPropagation) e.stopPropagation();} }>
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <meshStandardMaterial attach="material" metalness={.0} color={hovered ? 'hotpink' : color} />
    </mesh>
  )
}
export default Note