// /team T3 groups — names verbatim from specs/PAGES_A.md T3; avatar files mapped by source hash (public/assets/pages/team/)
// [name, avatar file, optional RoleTag]
export const TEAM_GROUPS = [
  { label: "Co-founders", info: false, members: [
    ["Eli", "avatar-BPNHeI.png"],
    ["Elise", "avatar-kthOYp.jpg"],
    ["Harmen", "avatar-ziucpt.png"],
    ["Jelle", "avatar-YPCeqR.png"],
    ["Stef", "avatar-FJMp2R.png", "CEO"],
  ] },
  { label: "Bioengineering", info: true, members: [
    ["Angela", "avatar-6Atwel.jpg"],
    ["Cas", "avatar-Wfvd8P.jpg"],
    ["Catalina", "avatar-Ig1Bks.jpg"],
    ["Daan", "avatar-NgM8cF.jpg"],
    ["Daniëlle", "avatar-bLwfjv.jpg"],
    ["Emma", "avatar-Vx5iVi.jpg"],
    ["Jack", "avatar-AU1jd0.jpg"],
    ["Jinel", "avatar-NakClq.jpg"],
    ["Michelle", "avatar-S8iuyU.jpg"],
    ["Nicolò", "avatar-jDC7a4.jpg"],
  ] },
  { label: "Machine Learning", info: true, members: [
    ["Arthur", "avatar-qYlDKa.png"],
    ["Christian", "avatar-KtmGIT.jpg"],
    ["Constance", "avatar-dg4l8w.png"],
    ["David", "avatar-DhjHKH.jpg"],
    ["Fabian", "avatar-inho2w.jpg"],
    ["Franzi", "avatar-Dgp7sG.jpg"],
    ["Gino", "avatar-qPzuir.jpg"],
    ["Jonathan", "avatar-UmEieu.jpg"],
    ["Nicolas", "avatar-CUQuN2.jpg"],
    ["Noé", "avatar-SQQ0QJ.jpg"],
    ["Paula", "avatar-7Uxm2k.jpg"],
    ["Sebastian", "avatar-wyVeTN.jpg"],
    ["Shayan", "avatar-C1x6LI.jpg"],
  ] },
  { label: "Engineering / Product", info: true, members: [
    ["Adam", "avatar-aqSnzw.png"],
    ["Armin", "avatar-O5X2vv.jpg"],
    ["Daniel", "avatar-xuTsAL.jpg", "CTO"],
    ["David", "avatar-dBi96O.jpg"],
    ["David", "avatar-9sjXbA.png"],
    ["Elia", "avatar-HvtKip.jpg"],
    ["Ena", "avatar-qkhzXf.png"],
    ["Janosch", "avatar-G9lgWP.jpg"],
    ["Melanie", "avatar-IeYOqp.jpg"],
    ["Michael", "avatar-fw1eRg.jpg"],
    ["Michael", "avatar-xWvejW.jpg"],
    ["Robbert", "avatar-mmSUqB.jpg"],
    ["Tilke", "avatar-WjkUQ0.jpg"],
  ] },
  { label: "Design", info: true, members: [
    ["Gijs", "avatar-uIFHU0.jpg"],
    ["Sytske", "avatar-JUN0G5.jpg"],
    ["Vilem", "avatar-DsXq2x.jpg"],
  ] },
  { label: "Partnerships", info: true, members: [
    ["André", "avatar-uN7M9P.jpg"],
    ["Denise", "avatar-1iEn32.jpg"],
    ["Jarred", "avatar-q5EgW8.png"],
    ["Johan", "avatar-HJ65T1.jpg"],
    ["Luke", "avatar-StOHv1.jpg"],
    ["Mike", "avatar-U6QGkf.jpg"],
    ["Milind", "avatar-rd5Mgf.jpg"],
    ["Nadim", "avatar-PxBGIf.jpg"],
    ["Néstor", "avatar-Q5AEeH.png"],
    ["Paul", "avatar-dLRbza.png"],
    ["Ruben", "avatar-ENozUy.jpg"],
    ["Sam", "avatar-r2eetA.jpg", "CCO"],
    ["Sara", "avatar-Tte2Oo.png"],
    ["Thijs", "avatar-OWtK8c.jpg"],
    ["Toby", "avatar-w2A6Le.jpg"],
    ["Travis", "avatar-Wzsab7.png"],
    ["Wallis", "avatar-UykoKB.jpg"],
  ] },
  { label: "Customer Success", info: true, members: [
    ["Brian", "avatar-X2QgBU.jpg"],
    ["Catherine", "avatar-J3M0vG.jpg"],
    ["Dave", "avatar-4IK4tL.jpg"],
    ["Emanuele", "avatar-ZfB5PH.png"],
  ] },
  { label: "Operations", info: true, members: [
    ["Andi", "avatar-EF5uYE.jpg"],
    ["Claire", "avatar-ycUATx.jpg"],
    ["Devesh", "avatar-JnVlel.jpg"],
    ["Iana", "avatar-x27Ysx.jpg"],
    ["Irina", "avatar-tX1ayB.jpg"],
    ["Luba", "avatar-vKyTEH.jpg", "COO"],
    ["Max", "avatar-F3ceJk.jpg"],
  ] },
]

// T4 advisors (verbatim)
export const ADVISORS = [
  ['Emily Leproust', 'CEO at Twist Biosciences'],
  ['John Zimmer', 'CEO & Founder at Lyft'],
  ['Adriaan Mol', 'Founder at Mollie & Messagebird'],
  ['Patrick Hsu', 'Professor at UC Berkeley & Co-founder of Arc Institute'],
  ['Chris Gibson', 'Co-founder & CEO at Recursion'],
  ['Sylvain Gariel', 'Founder & COO at DNA Script'],
  ['Tom Glocer', 'Former CEO of Thomson Reuters and Lead Director at Merck'],
  ['Feike Sijbesma', 'Honorary Chairman and former CEO at Royal DSM'],
  ['Mehdi Ghissassi', 'Director of Product at Google Deepmind'],
  ['Tim Geistlinger', 'Chief Scientific Officer at Perfect Day'],
  ['Steve Crossan', 'SVP AI at GSK, ex Head of Product at Deepmind and co-founder of Alphafold'],
]

// T2 offices. Weather is a static stand-in for the live third-party widget (values at capture time).
// shortAddress: phone variant (live shows Brandschenkestrasse 150 for Boston — a bug; intended value used).
export const OFFICES = [
  { city: '🇨🇭 Zurich', address: 'Brandschenkestrasse 150, 8002, Zürich, Switzerland', short: 'Brandschenkestrasse 150', weather: ['🌫️', 6] },
  { city: '🇳🇱 Amsterdam', address: ['Radarweg 60, 1043 NT Amsterdam', 'Netherlands'], short: 'Radarweg 60', weather: ['⛅️', 9] },
  { city: '🇺🇸 Boston', address: '1 Broadway, Cambridge, MA 02142, USA', short: '1 Broadway', weather: ['🌧️', 11] },
]

// T1 molecule cluster: 30 bubbles, positions measured on live (px, relative to the 386.7×290 blue tile at 1440).
// Phone (175×191 tile): 18px bubbles, x' = 29.7 + (x − 76.7)/2, y' = 51.9 + (y − 58.8)/2.
export const BUBBLES = [
  [108.7, 108.8], [135.7, 90.8], [135.7, 108.8], [162.7, 100.8], [161.7, 126.5], [171.1, 58.8], [126.7, 126.5], [144.7, 141.8],
  [179.3, 108.8], [184.6, 76.8], [189.7, 136.8], [211.7, 154.8], [233.7, 136.8], [247.7, 112.8], [126.7, 162.8], [144.7, 187.8],
  [99.7, 169.8], [94.7, 90.8], [221.7, 169.8], [243.7, 154.8], [265.7, 136.8], [76.7, 108.8], [202.7, 119], [158.7, 76.8],
  [202.7, 131], [153.7, 162.8], [229.7, 195.8], [247.7, 177.8], [273.7, 112.8], [166.7, 186.8],
]
