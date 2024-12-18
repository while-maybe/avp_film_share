import ListOfAuthors from "../components/ListOfAuthors";
import Layout from "../components/Layout";

import VideoList from "../components/VideoList";

function DashboardPage() {
  return (
    <Layout>
      <div className="flex align-top gap-10">
        <VideoList />
        <ListOfAuthors />
      </div>
    </Layout>
  );
}

export default DashboardPage;
