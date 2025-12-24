import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Layout from '../../components/Layout';

import TrialIcon from '../../assets/navIcons/TrialIcon';
import TrialForm from '../../components/Trial/TrialForm';
import TrialRecord from '../../components/Trial/TrialRecord';
import { useCreateTrialForm } from '../../hooks/dashboardhooks/useDasboardData';

const Trial = () => {
  const { active } = useParams<{ active?: string }>();
  const [activeTab, setActiveTab] = useState(active || 'add');
  const createTrialMutation = useCreateTrialForm();

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
      title: 'Filled Trial Form  list',
      slug: 'list',
      icon: activeTab === 'list' ? <TrialIcon color="white" /> : <TrialIcon color="gray" />
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

  const handleCreateTrialForm = async (data: any) => {
    try {
      console.log('[Trial Page] Creating trial form:', data);

      // Build payload with only required fields
      const payload = {
        officer_id: data.officer_id,
        unit: data.unit,
        q1: data.q1,
        q2: data.q2,
        q3: data.q3,
        q4: data.q4,
        q5: data.q5,
        q6: data.q6,
        q7: data.q7,
        finding: data.finding,
        award: data.award,
        date: data.date,
        rank_officer: data.rank_officer,
        appointment: data.appointment,
        upload: data.upload || null
      };

      await createTrialMutation.mutateAsync(payload);
      console.log('[Trial Page] Trial form created successfully');
      setActiveTab('list'); // Switch to list tab after successful creation
    } catch (error) {
      console.error('[Trial Page] Create failed:', error);
    }
  };

  return (
    <Layout className="h-full">
      <section className="bg-white rounded-md p-6 pb-2">
        <h1 className="text-base font-semibold uppercase">Trial</h1>

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
        {activeTab === 'add' && (
          <TrialForm
            isEdit={true}
            onSave={handleCreateTrialForm}
            isLoading={createTrialMutation.isPending}
          />
        )}
        {activeTab === 'list' && <TrialRecord />}
      </section>
    </Layout>
  );
};

export default Trial;
