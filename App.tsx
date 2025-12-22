
import React, { useState } from 'react';
import { AppScreen } from './types';
import Welcome from './views/Welcome';
import Simulation from './views/Simulation';
import Activities from './views/Activities';
import Timeline from './views/Timeline';
import Layout from './components/Layout';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>(AppScreen.WELCOME);

  const renderScreen = () => {
    switch (currentScreen) {
      case AppScreen.WELCOME:
        return <Welcome onStart={() => setCurrentScreen(AppScreen.SIMULATION)} />;
      case AppScreen.SIMULATION:
        return (
          <Layout 
            activeScreen={AppScreen.SIMULATION} 
            onNavigate={setCurrentScreen} 
            title="محاكاة دورة الماء"
            showBack
          >
            <Simulation />
          </Layout>
        );
      case AppScreen.ACTIVITIES:
        return (
          <Layout 
            activeScreen={AppScreen.ACTIVITIES} 
            onNavigate={setCurrentScreen} 
            title="الأنشطة التفاعلية"
            showBack
          >
            <Activities />
          </Layout>
        );
      case AppScreen.TIMELINE:
        return (
          <Layout 
            activeScreen={AppScreen.TIMELINE} 
            onNavigate={setCurrentScreen} 
            title="رحلة قطرة الماء"
            showBack
          >
            <Timeline />
          </Layout>
        );
      default:
        return <Welcome onStart={() => setCurrentScreen(AppScreen.SIMULATION)} />;
    }
  };

  return (
    <div className="font-display">
      {renderScreen()}
    </div>
  );
};

export default App;
