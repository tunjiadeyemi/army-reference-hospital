import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Layout from '../../components/Layout';

import OfficerBioDataForm from '../../components/UnitBible/OfficerBiodataForm';
import Bible from '../../components/UnitBible/Bible';
import UnitIcon from '../../assets/navIcons/UnitIcon';



const UnitBible = () => {
  const { active } = useParams<{ active?: string }>();
  const [activeTab, setActiveTab] = useState(active || 'add');
  

  const tabs = [
    {
      title: 'Add New',
      slug: 'add',
      icon:
        activeTab === 'add' ? (
          <img src="/department/add-icon.svg" alt="Add" className="w-5 h-5" />
        ) : (
          <img src="/department/add-black-icon.svg" alt="Add" className="w-5 h-5" />
        )
    },
    {
      title: 'Unit Bible list',
      slug: 'list',
      icon: activeTab === 'list' ? <UnitIcon color="white" /> : <UnitIcon color="gray" />
    }
  ];

  useEffect(() => {
    if (active === 'list') {
      setActiveTab('list');
    } else if (active === 'add') {
      setActiveTab('add');
    }
  }, [active]);

  const handleTabClick = (slug: string) => {
    setActiveTab(slug);
  };

  return (
    <Layout className="space-y-6 h-full">
      <section className="bg-white border border-[#D9D9D9] rounded-md p-6">
        <h1 className="text-base font-semibold uppercase">Unit Bible</h1>

        <section className="bg-[#F5F5F5] p-2 rounded-md my-4 flex items-center gap-4">
          {tabs.map((tab, index) => (
            <button
              key={index}
              type="button"
              className={`flex items-center gap-2 p-4 text-sm cursor-pointer transition-colors rounded-md ${
                activeTab === tab.slug
                  ? 'bg-[#22A08E] text-white'
                  : 'bg-white text-black hover:text-white hover:bg-[#1A7B6C]'
              }`}
              onClick={() => handleTabClick(tab.slug)}
            >
              {tab.icon}
              {tab.title}
            </button>
          ))}
        </section>

        {activeTab === 'add' ? <OfficerBioDataForm viewMode={false} /> : <Bible />}
      </section>
    </Layout>
  );
};

export default UnitBible;
