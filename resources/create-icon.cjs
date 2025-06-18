
const child_process = require('child_process');
const fs = require('fs');

/// 大小与结果的映射
const retIconSizeFileMap = {
  16: ['icon.ico'],
  32: ['32x32.png'],
  128: ['128x128.png'],
  256: ['128x128@2x.png'],
  512: ['icon.png'],

  30: ['Square30x30Logo.png'],
  44: ['Square44x44Logo.png'],
  50: ['StoreLogo.png'],
  71: ['Square71x71Logo.png'],
  89: ['Square89x89Logo.png'],
  107: ['Square107x107Logo.png'],
  142: ['Square142x142Logo.png'],
  150: ['Square150x150Logo.png'],
  284: ['Square284x284Logo.png'],
  310: ['Square310x310Logo.png'],
}

/// mac
const macIcon = "icon.icns"
const macIconItemMap = {
  16: ['icon_16x16.png'],
  32: ['icon_16x16@2x.png', 'icon_32x32.png'],
  64: ['icon_32x32@2x.png'],
  128: ['icon_128x128.png'],
  256: ['icon_128x128@2x.png', 'icon_256x256.png'],
  512: ['icon_256x256@2x.png', 'icon_512x512.png', ],
  1024: ['icon_512x512@2x.png', ],
}

/// 源图片, 考虑是否使用参数传递进来
const originImg = "resources/img/biu biu 日记 圆角 240.png"
const outDir = "src-tauri/icons"

/// 仅 macOS 可用

/// mac图标
const macCreateIconDir = (iconDir) => {

  Object.entries(macIconItemMap).forEach(([size, items]) => {
    items.forEach((item) => {
      child_process.execSync(`sips -z ${size} ${size} "${originImg}" --out "${iconDir}"/"${item}"`)
    })
  })

}
const macCreateIcon = () => {
  const destDir = "icons.iconset"
  if (!fs.existsSync(destDir)) fs.mkdirSync(destDir)
  macCreateIconDir(destDir)
  child_process.execSync(`iconutil -c icns "${destDir}" -o "${outDir}/${macIcon}"`)
  fs.rmSync(destDir, {recursive: true})
}

/// 其它图片
const OtherIcon = () => {
  Object.entries(retIconSizeFileMap).forEach(([size, items]) => {
    items.forEach((item) => {
      child_process.execSync(`sips -z ${size} ${size} "${originImg}" --out "${outDir}/${item}"`)
    })
  })
}

const createIcon = () => {
  macCreateIcon()
  OtherIcon()
}

createIcon()





