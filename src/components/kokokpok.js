import * as THREE from 'three'

import React, {  useRef, useMemo } from 'react'
import {  useFrame } from 'react-three-fiber'

function Particles({count,played,x}) {
    
        
            const mesh = useRef()
            const dummy = useMemo(() => new THREE.Object3D(), [])
          
            const particles = useMemo(() => {
              const temp = []
              for (let i = 0; i < count; i++) {
                const t = Math.random() * 100
                const factor = 20 + Math.random() * 100
                const speed = 0.01 + Math.random() / 200
                const xFactor = x
                const yFactor = -20 + Math.random() * 40
                const zFactor = -20 + Math.random() * 40
                temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 })
              }
              return temp
            }, [count])
          
            useFrame(state => {
             if(played===false){
              particles.forEach((particle, i) => {
                let { t, factor, speed, xFactor, yFactor, zFactor } = particle
                t = particle.t += speed / 2
                const a = Math.cos(t) + Math.sin(t * 1) / 10
                const b = Math.sin(t) + Math.cos(t * 2) / 10
                const s = Math.max(1.5, Math.cos(t) * 5)
                dummy.position.set(
                  (particle.mx / 10) * a + xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
                  (particle.my / 10) * b + yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
                  (particle.my / 10) * b + zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
                )
                dummy.scale.set(0.7, 0.7, 0.7)
                dummy.updateMatrix()
                mesh.current.setMatrixAt(i, dummy.matrix)
              })
              mesh.current.instanceMatrix.needsUpdate = true
             }else{
                particles.forEach((particle, i) => {
                    let { t, factor, speed, xFactor, yFactor, zFactor } = particle
                    t = particle.t += speed / 2
                    const a = Math.cos(t) + Math.sin(t * 1) 
                    const b = Math.sin(t) + Math.cos(t * 2) 
                    const s = Math.max(1.5, Math.cos(t) * 5) 
                    dummy.position.set(
                     ((particle.mx / 10) * a + xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10)+5,
                      ((particle.my / 10) * b + yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10),
                      ((particle.my / 10) * b + zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10)+5
                    )
                    dummy.scale.set(0.7, 0.7, 0.7)
                    dummy.updateMatrix()
                    mesh.current.setMatrixAt(i, dummy.matrix)
                  })
                  mesh.current.instanceMatrix.needsUpdate = true
             }
            })
            let color= played===false? "black": "red"
            return (
              <>
                <instancedMesh ref={mesh} args={[null, null, count]}>
                  <boxBufferGeometry attach="geometry" args={[0.7, 0.7, 0.7]} />
                  <meshPhongMaterial attach="material" color={color} />
                </instancedMesh>
              </>
            )
      
}

export default Particles