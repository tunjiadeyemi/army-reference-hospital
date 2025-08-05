import { useEffect, useState } from 'react';
import OrdersIcon from '../../assets/navIcons/OrdersIcon';
import { useParams } from 'react-router';
import Layout from '../../components/Layout';
import PartOneOrder from '../../components/Order/PartOneOrder';
import OrderRecord from '../../components/Order/OrderRecord';
import PartTwoOrder from '../../components/Order/PartTwoOrder';
import OrderRecordTwo from '../../components/Order/OrderRecordTwo';

const Order = () => {
  const { active } = useParams<{ active?: string }>();
  const [activeTab, setActiveTab] = useState(active || 'add-new-p1');

  const tabs = [
    {
      title: 'Add New Part 1 Orders',
      slug: 'add-new-p1',
      icon:
        activeTab === 'add-new-p1' ? (
          <img src="/department/add-icon.svg" alt="Add" className="w-5 h-5" />
        ) : (
          <img src="/department/add-black-icon.svg" alt="Add" className="w-5 h-5" />
        )
    },
    {
      title: 'Part 1 Order List',
      slug: 'part-1-order-list',
      icon:
        activeTab === 'part-1-order-list' ? (
          <OrdersIcon color="white" />
        ) : (
          <OrdersIcon color="gray" />
        )
    },
    {
      title: 'Add New Part 2 Orders',
      slug: 'add-new-p2',
      icon:
        activeTab === 'add-new-p2' ? (
          <img src="/department/add-icon.svg" alt="Add" className="w-5 h-5" />
        ) : (
          <img src="/department/add-black-icon.svg" alt="Add" className="w-5 h-5" />
        )
    },
    {
      title: 'Part 1 Order List',
      slug: 'part-2-order-list',
      icon:
        activeTab === 'part-2-order-list' ? (
          <OrdersIcon color="white" />
        ) : (
          <OrdersIcon color="gray" />
        )
    }
  ];

  useEffect(() => {
    if (active === 'part-1-order-list') {
      setActiveTab('part-1-order-list');
    } else if (active === 'part-2-order-list') {
      setActiveTab('part-2-order-list');
    } else if (active === 'add-new-p2') {
      setActiveTab('add-new-p2');
    } else if (active === 'add-new-p1') {
      setActiveTab('add-new-p1');
    }
  }, [active]);

  const handleTabClick = (slug: string) => {
    setActiveTab(slug);
  };

  return (
    <Layout className="h-full">
      <section className="bg-white rounded-md p-6 pb-2">
        <h1 className="text-base font-semibold uppercase">Unit Bible</h1>

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
        {activeTab === 'add-new-p1' && <PartOneOrder />}
        {activeTab === 'part-1-order-list' && <OrderRecord />}
        {activeTab === 'add-new-p2' && <PartTwoOrder />}
        {activeTab === 'part-2-order-list' && <OrderRecordTwo />}
      </section>
    </Layout>
  );
};

export default Order;
