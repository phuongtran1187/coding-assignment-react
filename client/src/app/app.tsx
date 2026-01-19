
import { Routes, Route } from 'react-router-dom';

import { Tickets, TicketDetails } from '@/components/pages';
import { MainLayout } from '@/components/templates';

const App = () => {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Tickets />} />
        {/* Hint: Try `npx nx g component TicketDetails --project=client --no-export` to generate this component  */}
        <Route path="/:id" element={<TicketDetails />} />
      </Routes>
    </MainLayout>
  );
};

export default App;
