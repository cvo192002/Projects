import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer.jsx';
import MainPage from './components/MainPage';
import Detail from './components/Detail';
import CreateRecipe from './components/CreateRecipe';
import EditRecipe from './components/EditRecipe';
import { UpdateReview } from './components/UpdateReview';
import Navigation from './components/Navigation';
import './App.scss'; 




function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <main>
        <Routes>
          <Route exact path="/" element={<MainPage />} />
          <Route path="/recipes/:id" element={<Detail />} />
          <Route path="/create-recipe" element={<CreateRecipe />} />
          <Route path="/update-recipe/:id" element={<EditRecipe />} />
          <Route path="/update-review/:id" element={<UpdateReview />} />
        </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

