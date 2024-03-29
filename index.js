/* global preloadImagesTmr $fx fxpreview fxhash fxrand paper1Loaded */

//
//  fxhash - 33⅓rpm - LP Cover
//
//
//  HELLO!! Code is copyright revdancatt (that's me), so no sneaky using it for your
//  NFT projects.
//  But please feel free to unpick it, and ask me questions. A quick note, this is written
//  as an artist, which is a slightly different (and more storytelling way) of writing
//  code, than if this was an engineering project. I've tried to keep it somewhat readable
//  rather than doing clever shortcuts, that are cool, but harder for people to understand.
//
//  You can find me at...
//  https://twitter.com/revdancatt
//  https://instagram.com/revdancatt
//  https://youtube.com/revdancatt
//

// Global values, because today I'm being an artist not an engineer!
const ratio = 1 // canvas ratio
const features = {} //  so we can keep track of what we're doing
const nextFrame = null // requestAnimationFrame, and the ability to clear it
let resizeTmr = null // a timer to make sure we don't resize too often
let highRes = false // display high or low res
let drawStarted = false // Flag if we have kicked off the draw loop
let thumbnailTaken = false
let forceDownloaded = false
const urlSearchParams = new URLSearchParams(window.location.search)
const urlParams = Object.fromEntries(urlSearchParams.entries())
const prefix = '33rpm-lp-cover'
// dumpOutputs will be set to false unless we have ?dumpOutputs=true in the URL
const dumpOutputs = urlParams.dumpOutputs === 'true'
// const startTime = new Date().getTime()

// Custom features go here
let full = false

//  We need this to display features
window.$fxhashFeatures = {
  Release: 'mnml Ser I XTRA',
  rpm: '33.333',
  size: '12"'
}

//  Call the above make features, so we'll have the window.$fxhashFeatures available
//  for fxhash
const makeFeatures = () => {
  // features.background = 1
  features.paperOffset = {
    paper1: {
      x: fxrand(),
      y: fxrand()
    },
    paper2: {
      x: fxrand(),
      y: fxrand()
    }
  }

  const typeChoice = fxrand()
  features.type = 'grid'
  window.$fxhashFeatures['Cover type'] = 'Grid'
  if (typeChoice < 0.75) {
    features.type = 'pills'
    window.$fxhashFeatures['Cover type'] = 'Pills'
  }
  if (typeChoice < 0.50) {
    features.type = 'strip'
    window.$fxhashFeatures['Cover type'] = 'Strip'
  }
  if (typeChoice < 0.25) {
    features.type = 'circles'
    window.$fxhashFeatures['Cover type'] = 'Circles'
  }

  features.colours = [{
    h: 155,
    s: 24,
    l: 58
  },
  {
    h: 52,
    s: 95,
    l: 56
  },
  {
    h: 255,
    s: 31,
    l: 60
  },
  {
    h: 16,
    s: 64,
    l: 50
  },
  {
    h: 203,
    s: 79,
    l: 83
  },
  {
    h: 321,
    s: 55,
    l: 76
  },
  {
    h: 263,
    s: 41,
    l: 40
  },
  {
    h: 321,
    s: 64,
    l: 48
  },
  {
    h: 206,
    s: 83,
    l: 64
  },
  {
    h: 113,
    s: 1,
    l: 99
  }
  ]

  features.alphaMap = {
    1: {
      type: 'round',
      colours: [0],
      split: null
    },
    2: {
      type: 'round',
      colours: [1],
      split: null
    },
    3: {
      type: 'round',
      colours: [2],
      split: null
    },
    4: {
      type: 'round',
      colours: [3],
      split: null
    },
    5: {
      type: 'round',
      colours: [4],
      split: null
    },
    6: {
      type: 'round',
      colours: [5],
      split: null
    },
    7: {
      type: 'round',
      colours: [6],
      split: null
    },
    8: {
      type: 'round',
      colours: [7],
      split: null
    },
    9: {
      type: 'round',
      colours: [8],
      split: null
    },
    0: {
      type: 'round',
      colours: [9],
      split: null
    },
    a: {
      type: 'square',
      colours: [0],
      split: null
    },
    b: {
      type: 'square',
      colours: [1],
      split: null
    },
    c: {
      type: 'square',
      colours: [2],
      split: null
    },
    d: {
      type: 'square',
      colours: [3],
      split: null
    },
    e: {
      type: 'square',
      colours: [4],
      split: null
    },
    f: {
      type: 'square',
      colours: [5],
      split: null
    },
    g: {
      type: 'square',
      colours: [6],
      split: null
    },
    h: {
      type: 'square',
      colours: [7],
      split: null
    },
    i: {
      type: 'square',
      colours: [8],
      split: null
    },
    j: {
      type: 'square',
      colours: [9, 0],
      split: null
    },
    k: {
      type: 'square',
      colours: [0, 0],
      split: 'horizontal'
    },
    l: {
      type: 'square',
      colours: [1, 0],
      split: 'horizontal'
    },
    m: {
      type: 'square',
      colours: [2, 0],
      split: 'horizontal'
    },
    n: {
      type: 'square',
      colours: [3, 0],
      split: 'horizontal'
    },
    o: {
      type: 'square',
      colours: [4, 0],
      split: 'horizontal'
    },
    p: {
      type: 'square',
      colours: [5, 0],
      split: 'horizontal'
    },
    q: {
      type: 'square',
      colours: [6, 0],
      split: 'horizontal'
    },
    r: {
      type: 'square',
      colours: [7, 0],
      split: 'horizontal'
    },
    s: {
      type: 'square',
      colours: [8, 0],
      split: 'horizontal'
    },
    t: {
      type: 'square',
      colours: [9, 1],
      split: 'horizontal'
    },
    u: {
      type: 'square',
      colours: [0, 1],
      split: 'horizontal'
    },
    v: {
      type: 'square',
      colours: [1, 1],
      split: 'horizontal'
    },
    w: {
      type: 'square',
      colours: [2, 1],
      split: 'horizontal'
    },
    x: {
      type: 'square',
      colours: [3, 1],
      split: 'horizontal'
    },
    y: {
      type: 'square',
      colours: [4, 1],
      split: 'horizontal'
    },
    z: {
      type: 'square',
      colours: [5, 1],
      split: 'horizontal'
    }
  }
}

//  Call the above make features, so we'll have the window.$fxhashFeatures available
//  for fxhash
makeFeatures()

const drawCanvas = async () => {
  //  Let the preloader know that we've hit this function at least once
  drawStarted = true
  // Grab all the canvas stuff
  const canvas = document.getElementById('target')
  const ctx = canvas.getContext('2d')
  const w = canvas.width
  const h = canvas.height

  //  Lay down the first paper texture
  ctx.fillStyle = features.paper1Pattern
  ctx.save()
  ctx.translate(-w * features.paperOffset.paper1.x, -h * features.paperOffset.paper1.y)
  ctx.fillRect(0, 0, w * 2, h * 2)
  ctx.restore()

  //  Lay down the second paper texture
  ctx.globalCompositeOperation = 'darken'
  ctx.fillStyle = features.paper2Pattern
  ctx.save()
  ctx.translate(-w * features.paperOffset.paper1.x, -h * features.paperOffset.paper1.y)
  ctx.fillRect(0, 0, w * 2, h * 2)
  ctx.restore()
  ctx.globalCompositeOperation = 'source-over'

  //  Draw the album square
  const album = {
    x: w * 0.1,
    y: h * 0.05,
    w: w * 0.8,
    h: h * 0.8
  }
  if (full) {
    album.x = 0
    album.y = 0
    album.w = w
    album.h = h
  }

  ctx.fillStyle = 'black'
  ctx.fillRect(album.x, album.y, album.w, album.h)

  const grd = ctx.createLinearGradient(album.x, album.y + album.h, album.x, album.y + album.h + h * 0.1)
  grd.addColorStop(0, 'rgba(0, 0, 0, 0.666)')
  grd.addColorStop(1, 'rgba(0, 0, 0, 0)')
  ctx.fillStyle = grd
  ctx.fillRect(album.x, album.y + album.h, album.w, h * 0.1)

  const border = album.w / 49

  //  Now draw the squares
  if (features.type === 'grid') {
    const subBorder = border / 4
    const squares = 7
    const squareSize = (album.w - (border * 8)) / squares
    for (let y = 0; y < squares; y++) {
      for (let x = 0; x < squares; x++) {
        const hashOffset = 2 + (y * squares) + x
        const hashLetter = fxhash[hashOffset].toLowerCase()
        const isLowerCase = (hashLetter === fxhash[hashOffset])
        const colours = features.alphaMap[hashLetter].colours
        const c1 = features.colours[colours[0]]
        let c2 = null
        if (colours.length > 1) c2 = features.colours[colours[1]]
        ctx.fillStyle = `hsl(${c1.h}, ${c1.s}%, ${c1.l}%)`
        if ('1234567890'.includes(hashLetter)) {
          //  Circle
          ctx.beginPath()
          ctx.arc(album.x + border + (squareSize * x) + (border * x) + (squareSize / 2), album.y + border + (squareSize * y) + (border * y) + (squareSize / 2), (squareSize / 2), 0, 2 * Math.PI)
          ctx.fill()
        } else {
          if (c2) {
            ctx.fillRect(album.x + border + (squareSize * x) + (border * x), album.y + border + (squareSize * y) + (border * y), squareSize / 2 - subBorder, squareSize)
            ctx.fillStyle = `hsl(${c2.h}, ${c2.s}%, ${c2.l}%)`
            ctx.fillRect(album.x + border + (squareSize * x) + (border * x) + (squareSize / 2) + subBorder, album.y + border + (squareSize * y) + (border * y), squareSize / 2 - subBorder, squareSize)
          } else {
            ctx.fillRect(album.x + border + (squareSize * x) + (border * x), album.y + border + (squareSize * y) + (border * y), squareSize, squareSize)
          }
        }
        //  If lowercase set cut off corner
        if (isLowerCase) {
          ctx.fillStyle = 'black'
          ctx.beginPath()
          ctx.moveTo(album.x + border + (squareSize * x) + (border * x) - (squareSize / 80), album.y + border + (squareSize * y) + (border * y) - (squareSize / 80))
          ctx.lineTo(album.x + border + (squareSize * x) + (border * x) + (squareSize * 0.2), album.y + border + (squareSize * y) + (border * y) - (squareSize / 80))
          ctx.lineTo(album.x + border + (squareSize * x) + (border * x) - (squareSize / 80), album.y + border + (squareSize * y) + (border * y) + (squareSize * 0.2))
          ctx.closePath()
          ctx.fill()
        }
      }
    }
  }

  //  Now draw the squares
  if (features.type === 'pills') {
    const squares = 7
    const squareSize = (album.w - (border * 8)) / squares
    for (let y = 0; y < squares; y++) {
      for (let x = 0; x < squares; x++) {
        const hashOffset = 2 + (y * squares) + x
        const hashLetter = fxhash[hashOffset].toLowerCase()
        const isLowerCase = (hashLetter === fxhash[hashOffset])
        const colours = features.alphaMap[hashLetter].colours
        const c1 = features.colours[colours[0]]
        let c2 = null
        if (colours.length > 1) c2 = features.colours[colours[1]]
        ctx.fillStyle = `hsl(${c1.h}, ${c1.s}%, ${c1.l}%)`

        let angleMod = 45
        if (!isLowerCase || '1234567890'.includes(hashLetter)) angleMod += 90
        let tinyOffset = squareSize / 64
        if (c2 && c2 === c1) tinyOffset *= -1
        //  Do the smaller side first
        ctx.save()
        ctx.translate(album.x + border + (squareSize * x) + (border * x) + (squareSize / 2), album.y + border + (squareSize * y) + (border * y) + (squareSize / 2))
        ctx.rotate(angleMod * Math.PI / 180)
        ctx.scale(0.975, -0.975)
        ctx.beginPath()
        ctx.moveTo(tinyOffset, squareSize / 4)
        ctx.lineTo(-squareSize / 4, squareSize / 4)
        ctx.arc(-squareSize / 4, 0, squareSize / 4, 0.5 * Math.PI, 1.5 * Math.PI, false)
        ctx.lineTo(tinyOffset, -squareSize / 4)
        ctx.closePath()
        ctx.fill()
        ctx.restore()

        //  Now do the larger size
        if (c2) ctx.fillStyle = `hsl(${c2.h}, ${c2.s}%, ${c2.l}%)`
        ctx.save()
        ctx.translate(album.x + border + (squareSize * x) + (border * x) + (squareSize / 2), album.y + border + (squareSize * y) + (border * y) + (squareSize / 2))
        ctx.rotate((angleMod + 180) * Math.PI / 180)
        ctx.scale(1, -1)
        ctx.beginPath()
        ctx.moveTo(0, squareSize / 4)
        ctx.lineTo(-squareSize / 4, squareSize / 4)
        ctx.arc(-squareSize / 4, 0, squareSize / 4, 0.5 * Math.PI, 1.5 * Math.PI, false)
        ctx.lineTo(0, -squareSize / 4)
        ctx.closePath()
        ctx.fill()
        ctx.restore()

        //   If we are numeric, then we need to mark that
        if ('1234567890'.includes(hashLetter)) {
          ctx.fillStyle = 'rgba(0, 0, 0, 0.5)'
          ctx.save()
          ctx.translate(album.x + border + (squareSize * x) + (border * x) + (squareSize / 2), album.y + border + (squareSize * y) + (border * y) + (squareSize / 2))
          ctx.rotate((angleMod) * Math.PI / 180)
          ctx.scale(1, -1)
          ctx.beginPath()
          ctx.arc((squareSize / 4) - (squareSize / 100), (squareSize / 100), squareSize / 5, 0, 2 * Math.PI)
          ctx.fill()

          ctx.fillStyle = `hsl(${c1.h}, ${c1.s}%, ${c1.l}%)`
          if (c2) ctx.fillStyle = `hsl(${c2.h}, ${c2.s}%, ${c2.l}%)`
          ctx.beginPath()
          ctx.arc((squareSize / 4) - (squareSize / 28), -(squareSize / 50), squareSize / 4.6, 0, 2 * Math.PI, false)
          ctx.fill()

          ctx.restore()
        }
      }
    }
  }

  if (features.type === 'strip') {
    const subBorder = border / 4
    const squareSize = (album.h - (border * 2) - (subBorder * 16)) / 17
    const leftOffset = (squareSize + subBorder) * 3

    for (let x = 0; x < 3; x++) {
      for (let y = 0; y < 17; y++) {
        const hashOffset = 0 + (x * 17) + y
        if (hashOffset > 50) break
        const hashLetter = fxhash[hashOffset].toLowerCase()
        const isLowerCase = (hashLetter === fxhash[hashOffset])
        const colours = features.alphaMap[hashLetter].colours
        const c1 = features.colours[colours[0]]
        let c2 = null
        if (colours.length > 1) c2 = features.colours[colours[1]]
        ctx.fillStyle = `hsl(${c1.h}, ${c1.s}%, ${c1.l}%)`
        if ('1234567890'.includes(hashLetter)) {
          //  Circle
          ctx.beginPath()
          ctx.arc(album.x + border + (squareSize * x) + (subBorder * x) + (squareSize / 2) + leftOffset, album.y + border + (squareSize * y) + (subBorder * y) + (squareSize / 2), (squareSize / 2), 0, 2 * Math.PI)
          ctx.fill()
        } else {
          if (c2) {
            ctx.fillRect(album.x + border + (squareSize * x) + (subBorder * x) + leftOffset, album.y + border + (squareSize * y) + (subBorder * y), squareSize, squareSize / 2 - (subBorder / 2))
            ctx.fillStyle = `hsl(${c2.h}, ${c2.s}%, ${c2.l}%)`
            ctx.fillRect(album.x + border + (squareSize * x) + (subBorder * x) + leftOffset, album.y + border + (squareSize * y) + (subBorder * y) + (squareSize / 2) + (subBorder / 2), squareSize, squareSize / 2 - (subBorder / 2))
          } else {
            ctx.fillRect(album.x + border + (squareSize * x) + (subBorder * x) + leftOffset, album.y + border + (squareSize * y) + (subBorder * y), squareSize, squareSize)
          }
        }
        //  If lowercase set cut off corner
        if (isLowerCase) {
          ctx.fillStyle = 'black'
          ctx.beginPath()
          ctx.moveTo(album.x + border + (squareSize * x) + (subBorder * x) - (squareSize / 80) + leftOffset, album.y + border + (squareSize * y) + (subBorder * y) - (squareSize / 80))
          ctx.lineTo(album.x + border + (squareSize * x) + (subBorder * x) + (squareSize * 0.2) + leftOffset, album.y + border + (squareSize * y) + (subBorder * y) - (squareSize / 80))
          ctx.lineTo(album.x + border + (squareSize * x) + (subBorder * x) - (squareSize / 80) + leftOffset, album.y + border + (squareSize * y) + (subBorder * y) + (squareSize * 0.2))
          ctx.closePath()
          ctx.fill()
        }
      }
    }

    //  Now write CATT33 on the right hand side
    const C3 = features.colours[features.alphaMap.c.colours[0]]
    ctx.fillStyle = `hsl(${C3.h}, ${C3.s}%, ${C3.l}%)`
    ctx.fillRect(album.x + album.w - squareSize / 2, album.y + album.h - ((squareSize + subBorder) * 8) - border + subBorder, squareSize / 2, squareSize)

    const A = features.colours[features.alphaMap.a.colours[0]]
    ctx.fillStyle = `hsl(${A.h}, ${A.s}%, ${A.l}%)`
    ctx.fillRect(album.x + album.w - squareSize / 2, album.y + album.h - ((squareSize + subBorder) * 7) - border + subBorder, squareSize / 2, squareSize)

    const T1 = features.colours[features.alphaMap.t.colours[0]]
    const T2 = features.colours[features.alphaMap.t.colours[1]]
    ctx.fillStyle = `hsl(${T1.h}, ${T1.s}%, ${T1.l}%)`
    ctx.fillRect(album.x + album.w - squareSize / 2, album.y + album.h - ((squareSize + subBorder) * 6) - border + subBorder, squareSize / 2, (squareSize / 2) - (subBorder / 2))
    ctx.fillStyle = `hsl(${T2.h}, ${T2.s}%, ${T2.l}%)`
    ctx.fillRect(album.x + album.w - squareSize / 2, album.y + album.h - ((squareSize + subBorder) * 6) + (squareSize / 2) + (subBorder / 2) - border + subBorder, squareSize / 2, (squareSize / 2) - (subBorder / 2))

    ctx.fillStyle = `hsl(${T1.h}, ${T1.s}%, ${T1.l}%)`
    ctx.fillRect(album.x + album.w - squareSize / 2, album.y + album.h - ((squareSize + subBorder) * 5) - border + subBorder, squareSize / 2, (squareSize / 2) - (subBorder / 2))
    ctx.fillStyle = `hsl(${T2.h}, ${T2.s}%, ${T2.l}%)`
    ctx.fillRect(album.x + album.w - squareSize / 2, album.y + album.h - ((squareSize + subBorder) * 5) + (squareSize / 2) + (subBorder / 2) - border + subBorder, squareSize / 2, (squareSize / 2) - (subBorder / 2))

    ctx.fillStyle = `hsl(${C3.h}, ${C3.s}%, ${C3.l}%)`
    ctx.beginPath()
    ctx.arc(album.x + album.w, album.y + album.h - ((squareSize + subBorder) * 4) - border + subBorder + (squareSize / 2), squareSize / 2, 0.5 * Math.PI, 1.5 * Math.PI)
    ctx.fill()
    ctx.beginPath()
    ctx.arc(album.x + album.w, album.y + album.h - ((squareSize + subBorder) * 3) - border + subBorder + (squareSize / 2), squareSize / 2, 0.5 * Math.PI, 1.5 * Math.PI)
    ctx.fill()
  }

  if (features.type === 'circles') {
    const circles = [{
      segments: 17,
      outerRadius: 1,
      innerRadius: 0.8,
      gap: 10
    },
    {
      segments: 17,
      outerRadius: 0.78,
      innerRadius: 0.58,
      gap: 11
    },
    {
      segments: 17,
      outerRadius: 0.56,
      innerRadius: 0.36,
      gap: 12
    }
    ]
    let hashPoints = 0
    let loop = 0
    for (const circle of circles) {
      const outerAngle = 360 / circle.segments
      const outerAngleBorder = outerAngle / circle.gap
      for (let segment = 0; segment < circle.segments; segment++) {
        //  Set radiuses
        const outerRadius = circle.outerRadius
        const innerRadius = circle.innerRadius
        const middleRadius = innerRadius + ((outerRadius - innerRadius) / 2)

        const hashLetter = fxhash[hashPoints].toLowerCase()
        const isLowerCase = (hashLetter === fxhash[hashPoints])
        const colours = features.alphaMap[hashLetter].colours
        const c1 = features.colours[colours[0]]
        let c2 = null
        if (colours.length > 1) c2 = features.colours[colours[1]]

        const startAngle = segment * outerAngle + (outerAngleBorder / 2) + 180
        const endAngle = (segment + 1) * outerAngle - (outerAngleBorder / 2) + 180
        const r1 = ((album.h / 2) - border) * outerRadius * 0.95
        const r2 = ((album.h / 2) - border) * middleRadius * 0.95
        const r3 = ((album.h / 2) - border) * innerRadius * 0.95

        const x0 = Math.sin(startAngle * Math.PI / 180) * r1
        const y0 = Math.cos(startAngle * Math.PI / 180) * r1
        const x1 = Math.sin(startAngle * Math.PI / 180) * r2
        const y1 = Math.cos(startAngle * Math.PI / 180) * r2
        const x2 = Math.sin(endAngle * Math.PI / 180) * r3
        const y2 = Math.cos(endAngle * Math.PI / 180) * r3
        const x3 = Math.sin(endAngle * Math.PI / 180) * r2
        const y3 = Math.cos(endAngle * Math.PI / 180) * r2

        if (c2) {
          ctx.fillStyle = `hsl(${c2.h}, ${c2.s}%, ${c2.l}%)`
          ctx.beginPath()
          ctx.moveTo(w - (x0 + album.x + (album.w / 2)), y0 + album.y + (album.h / 2))
          //  Go one way
          for (let a = 0; a < 24; a++) {
            const x = Math.sin((startAngle + ((endAngle - startAngle) * a / 23)) * Math.PI / 180) * r1
            const y = Math.cos((startAngle + ((endAngle - startAngle) * a / 23)) * Math.PI / 180) * r1
            ctx.lineTo(w - (x + album.x + (album.w / 2)), y + album.y + (album.h / 2))
          }
          ctx.lineTo(w - (x3 + album.x + (album.w / 2)), y3 + album.y + (album.h / 2))
          //  Now go the other way
          for (let a = 23; a >= 0; a--) {
            const x = Math.sin((startAngle + ((endAngle - startAngle) * a / 23)) * Math.PI / 180) * r2
            const y = Math.cos((startAngle + ((endAngle - startAngle) * a / 23)) * Math.PI / 180) * r2
            ctx.lineTo(w - (x + album.x + (album.w / 2)), y + album.y + (album.h / 2))
          }
          ctx.closePath()
          ctx.fill()

          ctx.fillStyle = `hsl(${c1.h}, ${c1.s}%, ${c1.l}%)`
          ctx.beginPath()
          ctx.moveTo(w - (x1 + album.x + (album.w / 2)), y1 + album.y + (album.h / 2))
          //  Go one way
          for (let a = 0; a < 24; a++) {
            const x = Math.sin((startAngle + ((endAngle - startAngle) * a / 23)) * Math.PI / 180) * r2
            const y = Math.cos((startAngle + ((endAngle - startAngle) * a / 23)) * Math.PI / 180) * r2
            ctx.lineTo(w - (x + album.x + (album.w / 2)), y + album.y + (album.h / 2))
          }
          ctx.lineTo(w - (x2 + album.x + (album.w / 2)), y2 + album.y + (album.h / 2))
          //  Now go the other way
          for (let a = 23; a >= 0; a--) {
            const x = Math.sin((startAngle + ((endAngle - startAngle) * a / 23)) * Math.PI / 180) * r3
            const y = Math.cos((startAngle + ((endAngle - startAngle) * a / 23)) * Math.PI / 180) * r3
            ctx.lineTo(w - (x + album.x + (album.w / 2)), y + album.y + (album.h / 2))
          }
          ctx.closePath()
          ctx.fill()

          //  Now draw a line between them
          const x = Math.sin((startAngle + ((endAngle - startAngle) * 0 / 23)) * Math.PI / 180) * r2
          const y = Math.cos((startAngle + ((endAngle - startAngle) * 0 / 23)) * Math.PI / 180) * r2
          ctx.strokeStyle = 'black'
          ctx.lineWidth = album.w / 120
          ctx.beginPath()
          ctx.moveTo(w - (x + album.x + (album.w / 2)), y + album.y + (album.h / 2))
          for (let a = 1; a < 24; a++) {
            const x = Math.sin((startAngle + ((endAngle - startAngle) * a / 23)) * Math.PI / 180) * r2
            const y = Math.cos((startAngle + ((endAngle - startAngle) * a / 23)) * Math.PI / 180) * r2
            ctx.lineTo(w - (x + album.x + (album.w / 2)), y + album.y + (album.h / 2))
          }
          ctx.stroke()
        } else {
          ctx.fillStyle = `hsl(${c1.h}, ${c1.s}%, ${c1.l}%)`
          ctx.beginPath()
          ctx.moveTo(w - (x0 + album.x + (album.w / 2)), y0 + album.y + (album.h / 2))
          //  Go one way
          for (let a = 0; a < 24; a++) {
            const x = Math.sin((startAngle + ((endAngle - startAngle) * a / 23)) * Math.PI / 180) * r1
            const y = Math.cos((startAngle + ((endAngle - startAngle) * a / 23)) * Math.PI / 180) * r1
            ctx.lineTo(w - (x + album.x + (album.w / 2)), y + album.y + (album.h / 2))
          }
          ctx.lineTo(w - (x2 + album.x + (album.w / 2)), y2 + album.y + (album.h / 2))
          //  Now go the other way
          for (let a = 23; a >= 0; a--) {
            const x = Math.sin((startAngle + ((endAngle - startAngle) * a / 23)) * Math.PI / 180) * r3
            const y = Math.cos((startAngle + ((endAngle - startAngle) * a / 23)) * Math.PI / 180) * r3
            ctx.lineTo(w - (x + album.x + (album.w / 2)), y + album.y + (album.h / 2))
          }
          ctx.closePath()
          ctx.fill()

          //  If number set black dot
          if ('1234567890'.includes(hashLetter)) {
            const dx = Math.sin((startAngle + ((endAngle - startAngle) * 0.5)) * Math.PI / 180) * (r3 + ((r1 - r3) / 2))
            const dy = Math.cos((startAngle + ((endAngle - startAngle) * 0.5)) * Math.PI / 180) * (r3 + ((r1 - r3) / 2))
            ctx.fillStyle = 'black'
            ctx.beginPath()
            ctx.arc(w - (dx + album.x + (album.w / 2)), dy + album.y + (album.h / 2), album.w / 80, 0, 2 * Math.PI)
            ctx.fill()
          }
        }

        //  If lowercase set cut off corner
        if (isLowerCase && !'1234567890'.includes(hashLetter)) {
          ctx.fillStyle = 'black'

          const cx0 = Math.sin((startAngle - (outerAngleBorder / 4)) * Math.PI / 180) * (r1 * 1.01)
          const cy0 = Math.cos((startAngle - (outerAngleBorder / 4)) * Math.PI / 180) * (r1 * 1.01)
          const cx2 = Math.sin((startAngle - (outerAngleBorder / 4)) * Math.PI / 180) * (r1 * 0.95)
          const cy2 = Math.cos((startAngle - (outerAngleBorder / 4)) * Math.PI / 180) * (r1 * 0.95)

          ctx.beginPath()
          ctx.moveTo(w - (cx0 + album.x + (album.w / 2)), cy0 + album.y + (album.h / 2))
          //  Go one way
          for (let a = 0; a < 6 - loop; a++) {
            const x = Math.sin((startAngle + ((endAngle - startAngle) * a / 23)) * Math.PI / 180) * (r1 * 1.01)
            const y = Math.cos((startAngle + ((endAngle - startAngle) * a / 23)) * Math.PI / 180) * (r1 * 1.01)
            ctx.lineTo(w - (x + album.x + (album.w / 2)), y + album.y + (album.h / 2))
          }
          ctx.lineTo(w - (cx2 + album.x + (album.w / 2)), cy2 + album.y + (album.h / 2))
          ctx.closePath()
          ctx.fill()
        }

        hashPoints++
      }
      loop++
    }
  }

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  //
  // Below is code that is common to all the projects, there may be some
  // customisation for animated work or special cases

  // Try various methods to tell the parent window that we've drawn something
  if (!thumbnailTaken) {
    try {
      $fx.preview()
    } catch (e) {
      try {
        fxpreview()
      } catch (e) {
      }
    }
    thumbnailTaken = true
  }

  // If we are forcing download, then do that now
  if (dumpOutputs || ('forceDownload' in urlParams && forceDownloaded === false)) {
    forceDownloaded = 'forceDownload' in urlParams
    await autoDownloadCanvas()
    // Tell the parent window that we have downloaded
    window.parent.postMessage('forceDownloaded', '*')
  } else {
    //  We should wait for the next animation frame here
    // nextFrame = window.requestAnimationFrame(drawCanvas)
  }
  //
  // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
}

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
//
// These are the common functions that are used by the canvas that we use
// across all the projects, init sets up the resize event and kicks off the
// layoutCanvas function.
//
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

//  Call this to start everything off
const init = async () => {
  // Resize the canvas when the window resizes, but only after 100ms of no resizing
  window.addEventListener('resize', async () => {
    //  If we do resize though, work out the new size...
    clearTimeout(resizeTmr)
    resizeTmr = setTimeout(async () => {
      await layoutCanvas()
    }, 100)
  })

  //  Now layout the canvas
  await layoutCanvas()
}

//  This is where we layout the canvas, and redraw the textures
const layoutCanvas = async (windowObj = window, urlParamsObj = urlParams) => {
  //  Kill the next animation frame (note, this isn't always used, only if we're animating)
  windowObj.cancelAnimationFrame(nextFrame)

  //  Get the window size, and devicePixelRatio
  const { innerWidth: wWidth, innerHeight: wHeight, devicePixelRatio = 1 } = windowObj
  let dpr = devicePixelRatio
  let cWidth = wWidth
  let cHeight = cWidth * ratio

  if (cHeight > wHeight) {
    cHeight = wHeight
    cWidth = wHeight / ratio
  }

  // Grab any canvas elements so we can delete them
  const canvases = document.getElementsByTagName('canvas')
  Array.from(canvases).forEach(canvas => canvas.remove())

  // Now set the target width and height
  let targetHeight = highRes ? 4096 : cHeight
  let targetWidth = targetHeight / ratio

  //  If the alba params are forcing the width, then use that (only relevant for Alba)
  if (windowObj.alba?.params?.width) {
    targetWidth = window.alba.params.width
    targetHeight = Math.floor(targetWidth * ratio)
  }

  // If *I* am forcing the width, then use that, and set the dpr to 1
  // (as we want to render at the exact size)
  if ('forceWidth' in urlParams) {
    targetWidth = parseInt(urlParams.forceWidth)
    targetHeight = Math.floor(targetWidth * ratio)
    dpr = 1
  }

  // Update based on the dpr
  targetWidth *= dpr
  targetHeight *= dpr

  //  Set the canvas width and height
  const canvas = document.createElement('canvas')
  canvas.id = 'target'
  canvas.width = targetWidth
  canvas.height = targetHeight
  document.body.appendChild(canvas)

  canvas.style.position = 'absolute'
  canvas.style.width = `${cWidth}px`
  canvas.style.height = `${cHeight}px`
  canvas.style.left = `${(wWidth - cWidth) / 2}px`
  canvas.style.top = `${(wHeight - cHeight) / 2}px`

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  //
  // Custom code (for defining textures and buffer canvas goes here) if needed
  //

  //  Re-Create the paper pattern
  const paper1 = document.createElement('canvas')
  paper1.width = canvas.width / 2
  paper1.height = canvas.height / 2
  const paper1Ctx = paper1.getContext('2d')
  await paper1Ctx.drawImage(paper1Loaded, 0, 0, 1920, 1920, 0, 0, paper1.width, paper1.height)
  features.paper1Pattern = paper1Ctx.createPattern(paper1, 'repeat')

  const paper2 = document.createElement('canvas')
  paper2.width = canvas.width / (22 / 7)
  paper2.height = canvas.height / (22 / 7)
  const paper2Ctx = paper2.getContext('2d')
  await paper2Ctx.drawImage(paper1Loaded, 0, 0, 1920, 1920, 0, 0, paper2.width, paper2.height)
  features.paper2Pattern = paper2Ctx.createPattern(paper2, 'repeat')

  drawCanvas()
}

//  This allows us to download the canvas as a PNG
// If we are forcing the id then we add that to the filename
const autoDownloadCanvas = async () => {
  const canvas = document.getElementById('target')

  // Create a download link
  const element = document.createElement('a')
  const filename = 'forceId' in urlParams
    ? `${prefix}_${urlParams.forceId.toString().padStart(4, '0')}_${fxhash}`
    : `${prefix}_${fxhash}`
  element.setAttribute('download', filename)

  // Hide the link element
  element.style.display = 'none'
  document.body.appendChild(element)

  // Convert canvas to Blob and set it as the link's href
  const imageBlob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'))
  element.setAttribute('href', window.URL.createObjectURL(imageBlob))

  // Trigger the download
  element.click()

  // Clean up by removing the link element
  document.body.removeChild(element)

  // Reload the page if dumpOutputs is true
  if (dumpOutputs) {
    window.location.reload()
  }
}

//  KEY PRESSED OF DOOM
document.addEventListener('keypress', async (e) => {
  e = e || window.event
  // == Common controls ==
  // Save
  if (e.key === 's') autoDownloadCanvas()

  //   Toggle highres mode
  if (e.key === 'h') {
    highRes = !highRes
    console.log('Highres mode is now', highRes)
    await layoutCanvas()
  }

  // Custom controls
  if (e.key === 'f') {
    full = !full
    console.log('Highres mode is now', highRes)
    await layoutCanvas()
  }
})

//  This preloads the images so we can get access to them
// eslint-disable-next-line no-unused-vars
const preloadImages = () => {
  //  Normally we would have a test
  // if (true === true) {
  if (paper1Loaded && !drawStarted) {
    clearInterval(preloadImagesTmr)
    init()
  }
}

console.table(window.$fxhashFeatures)
