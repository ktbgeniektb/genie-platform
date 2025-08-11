import {
  TabGroup,
  TabList,
  Tab,
  TabPanels,
  TabPanel
} from '@headlessui/react'

// タブの色バリエ（暫定カラー）
const variants = {
  lamp: {
    selected: 'bg-yellow-500 text-yellow-50 w-64',
    unselected: 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200',
    ring: 'focus:outline-none focus:ring-2 focus:ring-yellow-400',
  },
  atlas: {
    selected: 'bg-blue-700 text-white w-64',
    unselected: 'bg-blue-100 text-blue-700 hover:bg-blue-200',
    ring: 'focus:outline-none focus:ring-2 focus:ring-blue-400',
  },
  carpet: {
    selected: 'bg-orange-500 text-white w-64',
    unselected: 'bg-orange-100 text-orange-700 hover:bg-orange-200',
    ring: 'focus:outline-none focus:ring-2 focus:ring-orange-400',
  },
}

// 共通タブボタン
function TabButton({ children, variant }) {
  return (
    <Tab
      className={({ selected }) =>
        [
          'px-4 py-2 rounded-t-lg font-semibold transition',
          'border border-transparent',
          variants[variant].ring,
          selected ? variants[variant].selected : variants[variant].unselected,
        ].join(' ')
      }
    >
      {children}
    </Tab>
  )
}

// 共通タブセット（上でも下でも使える）
function BrandedTabs() {
  return (
    <TabGroup>
      <TabList className="flex gap-1 border-b border-black/10 justify-around">
        <TabButton variant="lamp">Lamp</TabButton>
        <TabButton variant="atlas">Atlas</TabButton>
        <TabButton variant="carpet">Carpet</TabButton>
      </TabList>

      <TabPanels className="rounded-b-lg bg-black/5 p-4 border border-white/10 p-5 md:p-6 shadow-lg shadow-black/10 transition">
        <TabPanel>
          <h3 className="text-lg font-bold mb-2">Lamp</h3>
          <p>「好き」やビジョンの可視化・生成ツール。</p>
        </TabPanel>
        <TabPanel>
          <h3 className="text-lg font-bold mb-2">Atlas</h3>
          <p>学生管理・ビジョンマッチング・KPI可視化。</p>
        </TabPanel>
        <TabPanel>
          <h3 className="text-lg font-bold mb-2">Carpet</h3>
          <p>教育機関向けの自己理解・教育DX支援。</p>
        </TabPanel>
      </TabPanels>
    </TabGroup>
  )
}

export default function WhatSection() {
  return (
    <div>
            <section className="relative py-20 text-yellow-100 bg-gradient-to-b from-black via-indigo-950 to-blue-950">

        <h2 className="text-center font-aladdin text-5xl md:text-6xl text-[#F6E05E] drop-shadow mb-4">
            What
        </h2>
    <div className="space-y-10">
      <BrandedTabs />
    </div>
    </section>
    </div>
  )
}
