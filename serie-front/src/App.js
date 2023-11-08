import Header from "./components/Header/Header";
import Homepage from "./pages/Homepage/Homepage";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <div className="d-flex flex-column mh100">
      <Header />
      <Homepage />
      <Footer />
    </div>
  );
}

export default App;
