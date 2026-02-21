import React, { useState } from 'react';
// ADD THIS LINE BELOW
import { translations } from './utils/translations'; 

import Navbar from './components/Navbar';
import Scanner from './components/Scanner';
import Dashboard from './components/Dashboard';
import History from './components/History';
import Alerts from './components/Alerts';

function App() {
  const [currentPage, setCurrentPage] = useState('scanner');
  const [lang, setLang] = useState('en');

  // This is line 11 where the error was happening
  const t = translations[lang]; 

  return (
    <div className="min-h-screen">
      <Navbar setPage={setCurrentPage} currentPage={currentPage} setLang={setLang} currentLang={lang} />
      <main>
        {currentPage === 'scanner' && <Scanner t={t} />}
        {currentPage === 'dashboard' && <Dashboard t={t} />}
        {currentPage === 'history' && <History t={t} />}
        {currentPage === 'alerts' && <Alerts t={t} />}
      </main>
    </div>
  );
}

export default App;