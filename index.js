/* global preloadImagesTmr fxhash fxrand paper1Loaded */

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

const ratio = 1
// const startTime = new Date().getTime() // so we can figure out how long since the scene started
let drawn = false
let highRes = false // display high or low res
const features = {}
const nextFrame = null

window.$fxhashFeatures = {
  Release: 'mnml Ser I XTRA',
  rpm: '33.333',
  size: '12"'
}

//  Work out what all our features are
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
      colours: [9],
      split: null
    },
    k: {
      type: 'square',
      colours: [0, 0],
      split: 'horizontal'
    },
    l: {
      type: 'square',
      colours: [0, 1],
      split: 'horizontal'
    },
    m: {
      type: 'square',
      colours: [0, 2],
      split: 'horizontal'
    },
    n: {
      type: 'square',
      colours: [0, 3],
      split: 'horizontal'
    },
    o: {
      type: 'square',
      colours: [0, 4],
      split: 'horizontal'
    },
    p: {
      type: 'square',
      colours: [0, 5],
      split: 'horizontal'
    },
    q: {
      type: 'square',
      colours: [0, 6],
      split: 'horizontal'
    },
    r: {
      type: 'square',
      colours: [0, 7],
      split: 'horizontal'
    },
    s: {
      type: 'square',
      colours: [0, 8],
      split: 'horizontal'
    },
    t: {
      type: 'square',
      colours: [0, 9],
      split: 'horizontal'
    },
    u: {
      type: 'square',
      colours: [1, 0],
      split: 'horizontal'
    },
    v: {
      type: 'square',
      colours: [1, 1],
      split: 'horizontal'
    },
    w: {
      type: 'square',
      colours: [1, 2],
      split: 'horizontal'
    },
    x: {
      type: 'square',
      colours: [1, 3],
      split: 'horizontal'
    },
    y: {
      type: 'square',
      colours: [1, 4],
      split: 'horizontal'
    },
    z: {
      type: 'square',
      colours: [1, 5],
      split: 'horizontal'
    }
  }
  console.log(fxhash)
}

//  Call the above make features, so we'll have the window.$fxhashFeatures available
//  for fxhash
makeFeatures()
console.table(window.$fxhashFeatures)

const init = async () => {
  //  I should add a timer to this, but really how often to people who aren't
  //  the developer resize stuff all the time. Stick it in a digital frame and
  //  have done with it!
  window.addEventListener('resize', async () => {
    //  If we do resize though, work out the new size...
    await layoutCanvas()
    //  And redraw it
    drawCanvas()
  })

  //  Now layout the canvas
  await layoutCanvas()
}

const layoutCanvas = async () => {
  //  Kill the next animation frame
  window.cancelAnimationFrame(nextFrame)

  const wWidth = window.innerWidth
  const wHeight = window.innerHeight
  let cWidth = wWidth
  let cHeight = cWidth * ratio
  if (cHeight > wHeight) {
    cHeight = wHeight
    cWidth = wHeight / ratio
  }
  const canvas = document.getElementById('target')
  if (highRes) {
    canvas.height = 8192
    canvas.width = 8192 / ratio
  } else {
    canvas.width = Math.min((8192 / 2), cWidth * 2)
    canvas.height = Math.min((8192 / ratio / 2), cHeight * 2)
    //  Minimum size to be half of the high rez cersion
    if (Math.min(canvas.width, canvas.height) < 8192 / 2) {
      if (canvas.width < canvas.height) {
        canvas.height = 8192 / 2
        canvas.width = 8192 / 2 / ratio
      } else {
        canvas.width = 8192 / 2
        canvas.height = 8192 / 2 / ratio
      }
    }
  }

  canvas.style.position = 'absolute'
  canvas.style.width = `${cWidth}px`
  canvas.style.height = `${cHeight}px`
  canvas.style.left = `${(wWidth - cWidth) / 2}px`
  canvas.style.top = `${(wHeight - cHeight) / 2}px`

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

  //  And draw it!!
  drawCanvas()
}

const drawCanvas = async () => {
  //  Let the preloader know that we've hit this function at least once
  drawn = true
  //  Make sure there's only one nextFrame to be called
  window.cancelAnimationFrame(nextFrame)

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
  ctx.fillStyle = 'black'
  ctx.fillRect(album.x, album.y, album.w, album.h)

  const grd = ctx.createLinearGradient(album.x, album.y + album.h, album.x, album.y + album.h + h * 0.1)
  grd.addColorStop(0, 'rgba(0, 0, 0, 0.666)')
  grd.addColorStop(1, 'rgba(0, 0, 0, 0)')
  ctx.fillStyle = grd
  ctx.fillRect(album.x, album.y + album.h, album.w, h * 0.1)

  //  Now draw the squares
  const border = album.w / 49
  const subBorder = border / 4
  /*
  const squares = 7
  const squareSize = (album.w - (border * 8)) / squares
  for (let y = 0; y < squares; y++) {
    for (let x = 0; x < squares; x++) {
      const hashOffset = 2 + (y * squares) + x
      const hashLetter = fxhash[hashOffset].toLowerCase()
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
    }
  }
  */

  const circles = [{
    segments: 21,
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
    segments: 11,
    outerRadius: 0.56,
    innerRadius: 0.36,
    gap: 12
  }
  ]
  let hashPoints = 2
  for (const circle of circles) {
    const outerAngle = 360 / circle.segments
    const outerAngleBorder = outerAngle / circle.gap
    for (let segment = 0; segment < circle.segments; segment++) {
      //  Set radiuses
      const outerRadius = circle.outerRadius
      const innerRadius = circle.innerRadius
      const middleRadius = innerRadius + ((outerRadius - innerRadius) / 2)

      const hashLetter = fxhash[hashPoints].toLowerCase()
      console.log(hashPoints + ' >> ' + hashLetter)
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

        //  Set dot
        if ('1234567890'.includes(hashLetter)) {
          const dx = Math.sin((startAngle + ((endAngle - startAngle) * 0.5)) * Math.PI / 180) * (r3 + ((r1 - r3) / 2))
          const dy = Math.cos((startAngle + ((endAngle - startAngle) * 0.5)) * Math.PI / 180) * (r3 + ((r1 - r3) / 2))
          ctx.fillStyle = 'black'
          ctx.beginPath()
          ctx.arc(w - (dx + album.x + (album.w / 2)), dy + album.y + (album.h / 2), album.w / 80, 0, 2 * Math.PI)
          ctx.fill()
        }
      }

      hashPoints++
    }
  }

  //  Now do it all over again
  // nextFrame = window.requestAnimationFrame(drawCanvas)
}

const autoDownloadCanvas = async (showHash = false) => {
  const element = document.createElement('a')
  element.setAttribute('download', `33_333rpm-lp-cover_${fxhash}`)
  element.style.display = 'none'
  document.body.appendChild(element)
  let imageBlob = null
  imageBlob = await new Promise(resolve => document.getElementById('target').toBlob(resolve, 'image/png'))
  element.setAttribute('href', window.URL.createObjectURL(imageBlob, {
    type: 'image/png'
  }))
  element.click()
  document.body.removeChild(element)
}

//  KEY PRESSED OF DOOM
document.addEventListener('keypress', async (e) => {
  e = e || window.event
  // Save
  if (e.key === 's') autoDownloadCanvas()

  //   Toggle highres mode
  if (e.key === 'h') {
    highRes = !highRes
    await layoutCanvas()
  }
})
//  This preloads the images so we can get access to them
// eslint-disable-next-line no-unused-vars
const preloadImages = () => {
  //  If paper1 has loaded and we haven't draw anything yet, then kick it all off
  if (paper1Loaded !== null && !drawn) {
    clearInterval(preloadImagesTmr)
    init()
  }
}
