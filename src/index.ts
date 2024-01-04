import { getInput } from '@actions/core';
import { create } from '@actions/glob';
const { Octokit } = require("@octokit/action");


(async () => {
  const files = getInput("files", { required: true, trimWhitespace: true });

  const glob = await create(files);

  // Find all releases
  const octokit = new Octokit();
  const [owner, repo] = process.env.GITHUB_REPOSITORY.split("/");
  const releases = await octokit.paginate(octokit.repos.listReleases, {
    owner,
    repo,
  });

  console.log(releases)

  for await (const file of glob.globGenerator()) {
    console.log(file);
  }
})();
