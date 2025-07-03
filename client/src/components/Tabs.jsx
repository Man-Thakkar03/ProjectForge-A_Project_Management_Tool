import { Tab } from "@headlessui/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Tabs({ tabs, setSelected, children }) {
  return (
    <div className='w-full px-1 sm:px-0'>
      <Tab.Group>
        <Tab.List className='flex space-x-3 sm:space-x-6 bg-white/5 backdrop-blur-md p-2 rounded-xl border border-white/10'>
          {tabs.map((tab, index) => (
            <Tab
              key={tab.title}
              onClick={() => setSelected(index)}
              className={({ selected }) =>
                classNames(
                  "flex items-center gap-2 px-4 py-2.5 text-sm sm:text-base font-medium rounded-md transition duration-200 ease-in-out outline-none",
                  selected
                    ? "text-blue-400 bg-blue-500/10 shadow-sm border border-blue-500/40"
                    : "text-white/80 hover:bg-white/10 hover:text-white/100"
                )
              }
            >
              {tab.icon}
              <span>{tab.title}</span>
            </Tab>
          ))}
        </Tab.List>

        <Tab.Panels className='mt-4 w-full'>{children}</Tab.Panels>
      </Tab.Group>
    </div>
  );
}
