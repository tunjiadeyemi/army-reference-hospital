import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import Layout from '../../components/Layout';

import DisciplineIcon from '../../assets/navIcons/DisciplineIcon';
import DisciplineForm from '../../components/Discipline/DisciplineForm';
import DisciplineRecord from '../../components/Discipline/DisciplineRecord';

const Discipline = () => {
  const { active } = useParams<{ active?: string }>();
  const [activeTab, setActiveTab] = useState(active || 'add');

  const tabs = [
    {
      title: 'Add New Charge Sheet',
      slug: 'add',
      icon:
        activeTab === 'add' ? (
          <img src="/department/add-icon.svg" alt="Add" className="w-5 h-5" />
        ) : (
          <img src="/department/add-black-icon.svg" alt="Add" className="w-5 h-5" />
        )
    },
    {
      title: 'Discipline/Charge list',
      slug: 'list',
      icon:
        activeTab === 'list' ? <DisciplineIcon color="white" /> : <DisciplineIcon color="gray" />
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
    <Layout className="h-full">
      <section className="bg-white rounded-md p-6 pb-2">
        <h1 className="text-base font-semibold uppercase">Discipline/Charge Sheet</h1>

        <section className="bg-[#F5F5F5] p-2 rounded-md mt-4 flex items-center gap-4">
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
      </section>

      <section className="bg-white p-4">
        {activeTab === 'add' && <DisciplineForm />}
        {activeTab === 'list' && <DisciplineRecord />}
      </section>
    </Layout>
  );
};

export default Discipline;
