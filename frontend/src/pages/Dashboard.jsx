import Layout from "../components/Layout";
import VideoList from "../components/VideoList";

function DashboardPage() {
  return (
    <Layout>
      <p>startlist</p>
      <VideoList />
      <p>endlist</p>
    </Layout>
  );
}

export default DashboardPage;
