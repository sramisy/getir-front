import React from 'react';

import styles from "./AddInvoice.module.css";
import { CorporateInvoice } from './CorporateInvoice';
import { IndividualInvoice } from './IndividualInvoice';

function AddInvoice() {
  const tabs = new Map([
    ['corporate', CorporateInvoice],
    ['individual', IndividualInvoice],
  ])

  const [activeTab, setActiveTab] = React.useState('corporate');

  const styleActiveTab = (tab) => {
    return {
      backgroundColor: activeTab === tab ? 'var(--color-primary)' : '',
      color: activeTab === tab ? 'var(--color-white)' : 'var(--color-primary)',
    }
  }

  return (
    <div>
      <div className={styles.tabs}>
        <button className={styles.tab} style={styleActiveTab('corporate')} onClick={() => setActiveTab('corporate')}>Corporate</button>
        <button className={styles.tab} style={styleActiveTab('individual')} onClick={() => setActiveTab('individual')}>Individual</button>
      </div>

      <div className="mt-8 mb-6 md:mb-8">
        {React.createElement(tabs.get(activeTab))}
      </div>
    </div>
  );
}

export default AddInvoice;
