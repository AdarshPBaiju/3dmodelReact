import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Model(props) {
  const { nodes, materials } = useGLTF('/table.glb')
  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.Circle005.geometry}
        material={materials['02 - VRay Material']}
        rotation={[-Math.PI, -Math.PI / 2, 0]}
      />
      <mesh
        geometry={nodes.Cylinder003.geometry}
        material={materials['derevo star.saltov']}
        rotation={[0, 1.57, 0]}
      />
    </group>
  )
}

useGLTF.preload('/WIRED SIDE TABLE .glb')