import satori from "satori"
import { Resvg } from "@resvg/resvg-js"
import { readFile, writeFile } from "node:fs/promises"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

const root = dirname(fileURLToPath(import.meta.url))
const serifData = await readFile(join(root, "assets/PlayfairDisplay.ttf"))
const sansData = await readFile(join(root, "assets/DMSans.ttf"))

const BG = "#2d5a4e"
const TITLE = "Niveau FR"
const DESC = "Тест французского по трём уровням (A1, A2, B1) с переводом и произношением, полностью в браузере"

const svg = await satori(
  {
    type: "div",
    props: {
      style: {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "0 110px",
        background: BG,
        fontFamily: "DM Sans",
      },
      children: [
        {
          type: "div",
          props: {
            style: { fontSize: 30, fontWeight: 700, color: "#bfe0d3", letterSpacing: 1, textTransform: "uppercase" },
            children: "monniveau.netlify.app",
          },
        },
        {
          type: "div",
          props: {
            style: { marginTop: 28, fontSize: 100, fontWeight: 700, color: "#ffffff", lineHeight: 1.05, fontFamily: "Playfair Display" },
            children: TITLE,
          },
        },
        {
          type: "div",
          props: {
            style: { marginTop: 32, fontSize: 34, fontWeight: 400, color: "#dcece6", lineHeight: 1.4, maxWidth: 900 },
            children: DESC,
          },
        },
      ],
    },
  },
  {
    width: 1200,
    height: 630,
    fonts: [
      { name: "DM Sans", data: sansData, weight: 400, style: "normal" },
      { name: "Playfair Display", data: serifData, weight: 700, style: "normal" },
    ],
  }
)

const png = new Resvg(svg).render().asPng()
await writeFile(join(root, "../og-image.png"), png)
console.log(`wrote og-image.png (${png.length} bytes)`)
