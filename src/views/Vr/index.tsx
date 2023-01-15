// @ts-nocheck
/*  eslint-disable */
import React, { useEffect, useState, useRef, useMemo } from 'react'
import * as THREE from 'three'
import { makeStyles } from '@mui/styles'
import { LinearProgress } from '@mui/material'
import clsx from 'clsx'
import { STATIC_URL } from 'config/constants/preloadResource'
import LoadedImage from 'components/Image/loadedImage'
import { OrbitControls } from './assets/OrbitControls'
import { GLTFLoader } from './assets/GLTFLoader'

const useStyles = makeStyles((theme) => ({
  container: {
    background: ({ showBg }: { showBg: boolean }) => (showBg ? 'url(/images/vr/bg.jpg) no-repeat center center' : ''),
    backgroundSize: 'cover',
    position: 'relative',
    height: '100vh',
    width: '100vw',
    marginBottom: -100,
    position: 'relative',
  },

  loadingContainer: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    width: 300,
    textAlign: 'center',
    transform: 'translate(-50%,-50%)',
    fontSize: 16,
    fontWeight: 600,
    '& .MuiLinearProgress-root': {
      background: theme.palette.background.paper,
    },
    '& .MuiLinearProgress-bar': {
      backgroundSize: '20px 20px',
      backgroundImage:
        'linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent)',
    },
  },
  loading: {
    height: 14,
    borderRadius: 7,
    marginBottom: 10,
  },
}))

const Vr = () => {
  const [loadingPercent, setLoadingPercent] = useState(0)
  const [bgVisible, setBgVisible] = useState(false)
  const showBg = useMemo(() => loadingPercent === 1 && bgVisible, [loadingPercent, bgVisible])
  const classes = useStyles({ showBg })
  const containerRef = useRef()
  useEffect(() => {
    let scene, renderer, camera
    let model, cameraTarget, mixer, clock

    const crossFadeControls = []

    let currentBaseAction = 'idle'
    const allActions = []
    const baseActions = {
      idle: { weight: 1 },
      walk: { weight: 0 },
      run: { weight: 0 },
    }
    const additiveActions = {
      sneak_pose: { weight: 0 },
      sad_pose: { weight: 0 },
      agree: { weight: 0 },
      headShake: { weight: 0 },
    }
    let panelSettings, numAnimations

    init()

    function init() {
      const container = containerRef.current
      clock = new THREE.Clock()

      scene = new THREE.Scene()
      //   scene.background = new THREE.Color(0xbfe3dd)
      scene.fog = new THREE.Fog(0xa0a0a0, 10, 50)

      const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444)
      hemiLight.position.set(0, 20, 0)
      scene.add(hemiLight)

      cameraTarget = new THREE.Vector3(0, -0.1, 0)
      const dirLight = new THREE.DirectionalLight(0xffffff)
      dirLight.position.set(3, 10, 10)
      dirLight.castShadow = true
      dirLight.shadow.camera.top = 2
      dirLight.shadow.camera.bottom = -2
      dirLight.shadow.camera.left = -2
      dirLight.shadow.camera.right = 2
      dirLight.shadow.camera.near = 10
      dirLight.shadow.camera.far = 400
      scene.add(dirLight)

      const loader = new GLTFLoader()
      loader.load(
        `https://topdj0430.s3-accelerate.amazonaws.com/static/vr.glb`,
        function (gltf) {
          model = gltf.scene
          model.scale.set(0.1, 0.1, 0.1)
          model.position.set(0, 0.5, 0)
          scene.add(model)

          model.traverse(function (object) {
            if (object.isMesh) object.castShadow = true
          })

          const animations = gltf.animations
          mixer = new THREE.AnimationMixer(model)

          numAnimations = animations.length

          animate()
        },
        (e) => {
          if (e.total) {
            setLoadingPercent(e.loaded / e.total)
          } else {
            setLoadingPercent(1)
          }
        },
      )

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
      renderer.setPixelRatio(window.devicePixelRatio)
      renderer.setSize(window.innerWidth, window.innerHeight)
      renderer.outputEncoding = THREE.sRGBEncoding
      renderer.shadowMap.enabled = true
      container.appendChild(renderer.domElement)

      // camera
      camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000)
      camera.position.set(-1, 2, 80) // 位置比例

      const controls = new OrbitControls(camera, renderer.domElement)
      // controls.enablePan = false;
      // controls.enableZoom = false;
      controls.minDistance = 5 // 放大最大 值越小越大
      controls.maxDistance = 8 // 缩小最小 值越大越小
      controls.target.set(0, 1, 0)
      controls.update()

      // stats = new Stats();
      // container.appendChild(stats.dom);

      window.addEventListener('resize', onWindowResize)
    }

    // This function is needed, since animationAction.crossFadeTo() disables its start action and sets
    // the start action's timeScale to ((start animation's duration) / (end animation's duration))

    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()

      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    function animate() {
      // Render loop

      requestAnimationFrame(animate)

      //   for (let i = 0; i !== numAnimations; ++i) {
      //     const action = allActions[i]
      //     const clip = action.getClip()
      //     const settings = baseActions[clip.name] || additiveActions[clip.name]
      //     settings.weight = action.getEffectiveWeight()
      //   }

      // Get the time elapsed since the last frame, used for mixer update

      const mixerUpdateDelta = clock.getDelta()

      // Update the animation mixer, the stats panel, and render this frame

      mixer.update(mixerUpdateDelta)

      model.rotation.y += 0.005
      // camera.lookAt(cameraTarget)

      renderer.render(scene, camera)
    }
  }, [])
  return (
    <div ref={containerRef} className={classes.container}>
      <LoadedImage
        src="/images/vr/bg.jpg"
        onLoad={() => {
          setBgVisible(true)
        }}
        hidden
      />
      {loadingPercent !== 0 && loadingPercent !== 1 && (
        <div className={classes.loadingContainer}>
          <LinearProgress variant="determinate" className={classes.loading} value={loadingPercent * 100} />
          {Math.round(loadingPercent * 100)}%
        </div>
      )}
    </div>
  )
}

export default Vr
