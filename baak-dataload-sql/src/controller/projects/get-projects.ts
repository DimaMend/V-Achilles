import axios from "axios";
import { UserInterface } from "../../models/user";

interface UserData {
  user: UserInterface;
}
interface Project {
  ownerName: string;
  projectName: string;
  cloneUrl: string;
  privateProject: boolean;
}

interface ContributeProject {
  ownerName: string;
  projects: Project[];
}

const getProjects = async (req: UserData, res: any, _: any) => {
  try {
    const username = req.user.username;

    let page = 1;
    let allProjectsResponses: any[] = [];

    while (true) {
      const response = await requestProject(page++, req.user.access_token);
      allProjectsResponses = allProjectsResponses.concat(response.data);
      if (response.data.length < 100) break;
    }

    let allProjects: Project[] = [];
    let userProjects: Project[] = [];
    let contributeProjects: ContributeProject[] = [];

    allProjectsResponses.forEach((repo: any) => {
      let owner = repo.owner.login;

      const project = {
        ownerName: owner,
        projectName: repo.name,
        cloneUrl: repo.clone_url,
        privateProject: repo.private,
      };

      allProjects.push(project);

      if (owner === username) {
        // authenticated user projects
        userProjects.push(project);
      } else {
        if (
          !contributeProjects.some((item) => item.ownerName === owner) ||
          contributeProjects.length === 0
        ) {
          contributeProjects.push({
            ownerName: owner,
            projects: [project],
          });
        } else {
          // contributor projects
          const index = contributeProjects.findIndex(
            (item) => item.ownerName === owner
          );
          const currentProject = contributeProjects[index].projects;
          contributeProjects[index].projects = [...currentProject, project];
        }
      }
    });

    res.status(200).json({
      allProjects,
      userProjects,
      contributeProjects,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Oops! Something went wrong!" });
  }
};

const requestProject = async (page: number, access_token: string) => {
  return axios.get(
    `https://api.github.com/user/repos?per_page=100&page=${page}`,
    {
      headers: {
        Authorization: `token ${access_token}`,
        Accept: "application/vnd.github.v3+json",
      },
    }
  );
};

export default getProjects;
