import Layout from "components/Layouts";
import { useState } from "react";
import ProjectCard from "components/Cards/ProjectCard";
import ListLoad from "components/ListLoad";
const Projects = (props) => {
  const [projects, setProjects] = useState(props.projects.slice(0, 6));
  const [moreProjects, setMoreProjects] = useState(true);

  const loadMore = () => {
    setProjects(props.projects);
    setMoreProjects(false);
  };
  return (
    <div className="w-full mt-10 md:mt-16">
      <ListLoad
        head={props.pageHead}
        data={projects}
        cols={3}
        Component={({ item }) => <ProjectCard project={item} light />}
        more={moreProjects}
        moreText={props.loadMoreText}
        loadMore={loadMore}
      />
    </div>
  );
};

export const getStaticProps = async () => {
  const staticData = await import("data/projects/data.json").then(
    (data) => data.default
  );

  return {
    props: {
      ...staticData,
    },
  };
};

Projects.layout = Layout;
export default Projects;
