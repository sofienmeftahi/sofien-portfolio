import { useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Edges } from '@react-three/drei'
import * as THREE from 'three'
import GOVS from '../assets/tunisia3d.json'

// Tunisia in 3D: each governorate is extruded by its 2024 population
// (INS Tunisia, RGPH 2024). Jendouba, home, is marked in red.
const HOME = 'TN-32'
const MAX_POP = Math.max(...GOVS.map((g) => g.pop))
const heightOf = (pop) => 0.06 + (pop / MAX_POP) * 0.95
const ramp = [new THREE.Color('#cfe0ff'), new THREE.Color('#5d93ff'), new THREE.Color('#0a3fb8')]
function colorOf(pop) {
  const t = Math.sqrt(pop / MAX_POP)
  const c = new THREE.Color()
  return t < 0.5 ? c.copy(ramp[0]).lerp(ramp[1], t / 0.5) : c.copy(ramp[1]).lerp(ramp[2], (t - 0.5) / 0.5)
}

function Governorate({ g, hovered, onHover }) {
  const geometry = useMemo(() => {
    const shapes = g.rings.map((ring) => {
      const s = new THREE.Shape()
      ring.forEach(([x, y], i) => (i ? s.lineTo(x, y) : s.moveTo(x, y)))
      return s
    })
    return new THREE.ExtrudeGeometry(shapes, { depth: heightOf(g.pop), bevelEnabled: false })
  }, [g])
  const isHome = g.id === HOME
  const base = useMemo(() => (isHome ? new THREE.Color('#e6261f') : colorOf(g.pop)), [g, isHome])
  const mesh = useRef()
  useFrame(() => {
    const target = hovered ? 1.08 : 1
    mesh.current.scale.z = THREE.MathUtils.lerp(mesh.current.scale.z, target, 0.15)
  })
  return (
    <mesh
      ref={mesh}
      geometry={geometry}
      onPointerOver={(e) => { e.stopPropagation(); onHover(g, e) }}
      onPointerMove={(e) => { e.stopPropagation(); onHover(g, e) }}
      onPointerOut={() => onHover(null)}
    >
      <meshStandardMaterial color={hovered ? '#ffb400' : base} roughness={0.55} metalness={0.05} />
      <Edges color={isHome ? '#7a0d09' : '#ffffff'} threshold={25} />
    </mesh>
  )
}

function Map({ hoverId, onHover }) {
  const group = useRef()
  const { pointer } = useThree()
  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    group.current.rotation.z = THREE.MathUtils.lerp(group.current.rotation.z, Math.sin(t * 0.2) * 0.12 + pointer.x * 0.25, 0.04)
  })
  return (
    <group rotation-x={-Math.PI / 2 + 0.05}>
      <group ref={group}>
        {GOVS.map((g) => (
          <Governorate key={g.id} g={g} hovered={hoverId === g.id} onHover={onHover} />
        ))}
      </group>
    </group>
  )
}

const fmt = new Intl.NumberFormat('en-US')

export default function HeroMap() {
  const [hover, setHover] = useState(null)
  const wrap = useRef()
  const onHover = (g, e) => {
    if (!g) return setHover(null)
    const r = wrap.current.getBoundingClientRect()
    setHover({ g, x: e.clientX - r.left, y: e.clientY - r.top })
  }
  const home = GOVS.find((g) => g.id === HOME)
  const shown = hover?.g || home
  return (
    <div className="map3d" ref={wrap}>
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [1.7, 9.4, 7.6], fov: 40 }}
        gl={{ antialias: true, alpha: true }}
        onCreated={({ camera }) => camera.lookAt(0.9, 0, 0.15)}
        onPointerMissed={() => setHover(null)}
      >
        <ambientLight intensity={1.1} />
        <directionalLight position={[4, 10, 6]} intensity={2.1} />
        <directionalLight position={[-6, 4, -3]} intensity={0.5} color="#dfe8ff" />
        <Map hoverId={hover?.g.id} onHover={onHover} />
      </Canvas>
      <div className="map-card" aria-live="polite">
        <span className="map-kicker">{shown.id === HOME && !hover ? 'Home · ' : ''}{shown.region}</span>
        <strong>{shown.name} <span lang="ar" dir="rtl">{shown.ar}</span></strong>
        <dl>
          <div><dt>Population 2024</dt><dd>{fmt.format(shown.pop)}</dd></div>
          <div><dt>Growth since 2014</dt><dd>{shown.growth > 0 ? '+' : ''}{shown.growth}%</dd></div>
        </dl>
      </div>
      <p className="map-note">
        Height = population of each governorate, INS Tunisia census 2024. Hover the map.
      </p>
    </div>
  )
}
