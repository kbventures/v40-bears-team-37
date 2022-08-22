import HelmetWrapper from "components/Helmet";
import RenderComponentWithSideBar from "components/WithSideBar";

function SettingsComponent() {
  return <p>Create your courses on Notum</p>
}
function Settings () {
  return (
    <HelmetWrapper title="Notum Settings">
      <RenderComponentWithSideBar Component={<SettingsComponent />} />
    </HelmetWrapper>
  );
}

export default Settings;