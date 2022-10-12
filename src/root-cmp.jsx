import { Route, Routes } from 'react-router-dom';
import { AppHeader } from './cmps/app-header';
import { Home } from './views/home';
import { ToysApp } from './views/toy-app';
// import '../src/assets/main.css';
import { About } from './views/about';
import { ToyEdit } from './views/toys-edit';
import { ToyDetails } from './views/toys-details';
import '../src/scss/main.scss';
import { LoginSignup } from './views/login-signup';
import { AdminApp } from './views/admin-app';
import { ReviewApp } from './views/review.app';
import { ReviewEdit } from './views/review-edit';

function App() {
  return (
    <section className='main-app main-layout'>
      <div className="App">
        <AppHeader />
      </div>
      <main className='main-app-container'>
        <Routes>
          <Route path='' element={<Home />} />
          <Route path='about' element={<About />} />
          <Route path='toy' element={<ToysApp />} />
          <Route path='toy/edit/:id' element={<ToyEdit />} />
          <Route path='toy/edit' element={<ToyEdit />} />
          <Route path='toy/:id' element={<ToyDetails />} />
          <Route path=':status' element={<LoginSignup />} />
          <Route path='admin' element={<AdminApp />} />
          <Route path='review' element={<ReviewApp />} />
          <Route path='toy/:id/review/edit' element={<ReviewEdit />} />
        </Routes>
      </main>
    </section>
  );
}

export default App;
