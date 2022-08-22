import CalendarView from "components/CalendarView";
import HelmetWrapper from "components/Helmet/HelmetWrapper";
import RenderComponentWithSideBar from "components/WithSideBar/WithSideBar";

function App() {
  return (
    <HelmetWrapper>
      <RenderComponentWithSideBar Component={<CalendarView />} />
    </HelmetWrapper>
  );
}

export default App;
